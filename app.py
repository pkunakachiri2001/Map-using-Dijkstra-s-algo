from flask import Flask, render_template, request, jsonify
import heapq
import sys

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Define our Graph (52 Node Version - FINAL)
# This graph is built from all the routes you provided.

# Initialize all nodes first
graph = {
    # Main Cities
    'Mumbai': {}, 'Pune': {}, 'Nashik': {}, 'Aurangabad': {}, 'Nagpur': {},
    'Kolhapur': {}, 'Ratnagiri': {}, 'Solapur': {}, 'Amravati': {},
    
    # Old Junctions
    'Igatpuri': {}, 'Sinnar': {}, 'Jalna': {}, 'Akola': {},
    
    # Route 1 (Mumbai-Nashik)
    'Thane': {}, 'Kalyan': {}, 'Shahapur': {}, 'Kasara': {}, 'Deolali': {},
    
    # Route 2 (Mumbai-Pune)
    'Panvel': {}, 'Khandala': {}, 'Lonavala': {}, 'Pimpri-Chinchwad': {},
    
    # Route 3 (Mumbai-Ratnagiri)
    'Pen': {}, 'Kolad': {}, 'Mangaon': {}, 'Mahad': {}, 'Khed': {},
    'Chiplun': {}, 'Sangameshwar': {},
    
    # Route 4 (Mumbai-Kolhapur)
    'Satara': {}, 'Karad': {},
    
    # Route 5 (Mumbai-Aurangabad NH160)
    'Vaijapur': {},
    
    # Route 6 (Samruddhi Mahamarg)
    'Shirdi': {}, 'Mehkar': {}, 'Washim': {}, 'Wardha': {}, 'Karanja Lad': {},
    
    # Route 7 (Pune-Solapur)
    'Indapur': {}, 'Tembhurni': {},
    
    # Route 8 (Pune-Nashik)
    'Chakan': {}, 'Rajgurunagar (Khed)': {}, 'Manchar': {}, 'Narayangaon': {}, 
    'Alephata': {}, 'Sangamner': {},
    # Route 9 (Pune-Aurangabad)
    'Shikrapur': {}, 'Shirur': {}, 'Ahmednagar': {},
    # Route 10 (Pune-Ratnagiri)
    'Patan': {},
    
    # --- NEW CITIES FROM LATEST DATA ---
    'Amba': {}, 'Sakharpa': {}, 'Miraj': {}, 'Pandharpur': {}
}

# --- Helper function to add a two-way edge ---
def add_edge(u, v, distance):
    if u in graph and v in graph:
        graph[u][v] = distance
        graph[v][u] = distance
    else:
        print(f"Warning: Could not add edge between {u} and {v}.")


# --- Build Connections (Two-way) ---

# Route 1: Mumbai to Nashik (Old NH 160 path)
add_edge('Mumbai', 'Thane', 35)
add_edge('Thane', 'Kalyan', 20) 
add_edge('Kalyan', 'Shahapur', 18) 
add_edge('Shahapur', 'Kasara', 41) 
add_edge('Kasara', 'Igatpuri', 6) 
add_edge('Igatpuri', 'Deolali', 40) 
add_edge('Deolali', 'Nashik', 7) 

# Route 2: Mumbai to Pune (Expressway)
add_edge('Mumbai', 'Panvel', 35)
add_edge('Panvel', 'Khandala', 45) 
add_edge('Khandala', 'Lonavala', 5) 
add_edge('Lonavala', 'Pimpri-Chinchwad', 53)
add_edge('Pimpri-Chinchwad', 'Pune', 12) 

# Route 3: Mumbai to Ratnagiri (NH 66)
add_edge('Panvel', 'Pen', 25) 
add_edge('Pen', 'Kolad', 62) 
add_edge('Kolad', 'Mangaon', 26) 
add_edge('Mangaon', 'Mahad', 21) 
add_edge('Mahad', 'Khed', 46) 
add_edge('Khed', 'Chiplun', 30) 

# Route 4: Pune to Kolhapur (NH 48)
add_edge('Pune', 'Satara', 115)
add_edge('Satara', 'Karad', 55) 
add_edge('Karad', 'Kolhapur', 65) 

# Route 5: Pune to Ratnagiri
add_edge('Karad', 'Patan', 40) 
add_edge('Patan', 'Chiplun', 40) 
add_edge('Chiplun', 'Sangameshwar', 25) 
add_edge('Sangameshwar', 'Ratnagiri', 30) 

# Route 6: Pune to Solapur (NH 65)
add_edge('Pune', 'Indapur', 145)
add_edge('Indapur', 'Tembhurni', 40)
add_edge('Tembhurni', 'Solapur', 70)

# Route 7: Pune to Nashik (NH 60)
add_edge('Pune', 'Chakan', 30)
add_edge('Chakan', 'Rajgurunagar (Khed)', 12)
add_edge('Rajgurunagar (Khed)', 'Manchar', 16)
add_edge('Manchar', 'Narayangaon', 17)
add_edge('Narayangaon', 'Alephata', 18)
add_edge('Alephata', 'Sangamner', 49)
add_edge('Sangamner', 'Sinnar', 43)
add_edge('Nashik', 'Sinnar', 27) 

# Route 8: Pune to Aurangabad (NH 753F)
add_edge('Pune', 'Shikrapur', 35)
add_edge('Shikrapur', 'Shirur', 25)
add_edge('Shirur', 'Ahmednagar', 62)
add_edge('Ahmednagar', 'Aurangabad', 113)

# Route 9: Nashik to Aurangabad (NH 160)
add_edge('Sinnar', 'Vaijapur', 93) 
add_edge('Vaijapur', 'Aurangabad', 64) 

# Route 10: Nashik to Nagpur (Samruddhi Mahamarg)
add_edge('Sinnar', 'Aurangabad', 140) 
add_edge('Aurangabad', 'Jalna', 60) 
add_edge('Jalna', 'Amravati', 250) 
add_edge('Amravati', 'Nagpur', 135) 

# Route 11: Nashik to Amravati (Samruddhi Mahamarg)
add_edge('Jalna', 'Karanja Lad', 140) 
add_edge('Karanja Lad', 'Amravati', 140) 

# Route 12: Nashik to Akola (Samruddhi Mahamarg)
add_edge('Karanja Lad', 'Akola', 100) 

# --- NEW ROUTE: Kolhapur to Ratnagiri (NH 166) ---
add_edge('Kolhapur', 'Amba', 65)
add_edge('Amba', 'Sakharpa', 30)
add_edge('Sakharpa', 'Ratnagiri', 31)

# --- NEW ROUTE: Kolhapur to Solapur ---
add_edge('Kolhapur', 'Miraj', 50)
add_edge('Miraj', 'Pandharpur', 110)
add_edge('Pandharpur', 'Solapur', 75)

# --- Other Connections ---
add_edge('Aurangabad', 'Solapur', 305) # A different route
add_edge('Amravati', 'Nagpur', 156) # The non-Samruddhi route
add_edge('Amravati', 'Akola', 95)
add_edge('Washim', 'Akola', 70) # A separate route
add_edge('Jalna', 'Mehkar', 95)
add_edge('Mehkar', 'Washim', 65)
add_edge('Mehkar', 'Akola', 150)
add_edge('Nashik', 'Igatpuri', 33)


# 3. Dijkstra's Algorithm in Python
def dijkstra_py(start_node, end_node):
    if start_node not in graph or end_node not in graph:
        return {'distance': float('inf'), 'path': []}
    
    if start_node == end_node:
        return {'distance': 0, 'path': [start_node]}
        
    pq = [(0, start_node)]
    distances = {node: float('inf') for node in graph}
    distances[start_node] = 0
    previous = {node: None for node in graph}

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_distance > distances[current_node]:
            continue
        
        if current_node == end_node:
            break 

        if current_node in graph:
            for neighbor, weight in graph.get(current_node, {}).items():
                if neighbor in distances:
                    distance = current_distance + weight
                    
                    if distance < distances[neighbor]:
                        distances[neighbor] = distance
                        previous[neighbor] = current_node
                        heapq.heappush(pq, (distance, neighbor))

    if distances[end_node] == float('inf'):
        return {
            'distance': float('inf'),
            'path': []
        }

    path = []
    current = end_node
    while current is not None:
        path.append(current)
        current = previous.get(current) 
    
    path.reverse()
    
    if path and path[0] == start_node:
        return {
            'distance': distances[end_node],
            'path': path
        }
    else:
        return {
            'distance': float('inf'),
            'path': []
        }


# 4. Define Flask Routes (Our API)
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/calculate_path', methods=['POST'])
def calculate_path():
    data = request.get_json()
    start_city = data.get('start')
    end_city = data.get('end')
    
    result = dijkstra_py(start_city, end_city)
    
    if result['distance'] == float('inf'):
        result['distance'] = "Infinity"

    return jsonify(result)


@app.route('/get_cities')
def get_cities():
    cities = list(graph.keys())
    return jsonify(cities)


# 5. Run the App
if __name__ == '__main__':
    app.run(debug=True, port=5000)