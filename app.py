from flask import Flask, render_template, request, jsonify
import heapq
import sys

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Define our Graph (Pan-India Network)
# This graph covers major cities across all regions of India

# Initialize all nodes first
graph = {
    # Maharashtra Cities (Original)
    'Mumbai': {}, 'Pune': {}, 'Nashik': {}, 'Aurangabad': {}, 'Nagpur': {},
    'Kolhapur': {}, 'Ratnagiri': {}, 'Solapur': {}, 'Amravati': {},
    'Igatpuri': {}, 'Sinnar': {}, 'Jalna': {}, 'Akola': {},
    'Thane': {}, 'Kalyan': {}, 'Shahapur': {}, 'Kasara': {}, 'Deolali': {},
    'Panvel': {}, 'Khandala': {}, 'Lonavala': {}, 'Pimpri-Chinchwad': {},
    'Pen': {}, 'Kolad': {}, 'Mangaon': {}, 'Mahad': {}, 'Khed': {},
    'Chiplun': {}, 'Sangameshwar': {}, 'Satara': {}, 'Karad': {},
    'Vaijapur': {}, 'Shirdi': {}, 'Mehkar': {}, 'Washim': {}, 'Wardha': {}, 
    'Karanja Lad': {}, 'Indapur': {}, 'Tembhurni': {},
    'Chakan': {}, 'Rajgurunagar (Khed)': {}, 'Manchar': {}, 'Narayangaon': {}, 
    'Alephata': {}, 'Sangamner': {}, 'Shikrapur': {}, 'Shirur': {}, 'Ahmednagar': {},
    'Patan': {}, 'Amba': {}, 'Sakharpa': {}, 'Miraj': {}, 'Pandharpur': {},
    
    # Delhi & NCR
    'Delhi': {}, 'Gurgaon': {}, 'Noida': {}, 'Faridabad': {}, 'Ghaziabad': {},
    
    # North India - Punjab, Haryana, Himachal Pradesh, J&K, Uttarakhand
    'Chandigarh': {}, 'Amritsar': {}, 'Ludhiana': {}, 'Jalandhar': {}, 'Patiala': {},
    'Shimla': {}, 'Manali': {}, 'Dharamshala': {}, 'Srinagar': {}, 'Jammu': {},
    'Dehradun': {}, 'Haridwar': {}, 'Rishikesh': {}, 'Nainital': {}, 'Mussoorie': {},
    'Ambala': {}, 'Karnal': {}, 'Panipat': {}, 'Rohtak': {},
    
    # Rajasthan
    'Jaipur': {}, 'Udaipur': {}, 'Jodhpur': {}, 'Ajmer': {}, 'Kota': {},
    'Bikaner': {}, 'Jaisalmer': {}, 'Alwar': {}, 'Bhilwara': {}, 'Mount Abu': {},
    
    # Uttar Pradesh
    'Lucknow': {}, 'Kanpur': {}, 'Agra': {}, 'Varanasi': {}, 'Allahabad': {},
    'Meerut': {}, 'Bareilly': {}, 'Aligarh': {}, 'Mathura': {}, 'Gorakhpur': {},
    
    # Madhya Pradesh
    'Bhopal': {}, 'Indore': {}, 'Gwalior': {}, 'Jabalpur': {}, 'Ujjain': {},
    'Ratlam': {}, 'Sagar': {}, 'Satna': {},
    
    # Gujarat
    'Ahmedabad': {}, 'Surat': {}, 'Vadodara': {}, 'Rajkot': {}, 'Gandhinagar': {},
    'Bhavnagar': {}, 'Jamnagar': {}, 'Junagadh': {}, 'Dwarka': {}, 'Porbandar': {},
    
    # Goa
    'Panaji': {}, 'Margao': {}, 'Vasco da Gama': {},
    
    # Karnataka
    'Bengaluru': {}, 'Mysuru': {}, 'Mangaluru': {}, 'Hubballi': {}, 'Belagavi': {},
    'Davangere': {}, 'Ballari': {}, 'Vijayapura': {}, 'Shivamogga': {}, 'Tumakuru': {},
    'Hampi': {}, 'Hospet': {},
    
    # Tamil Nadu
    'Chennai': {}, 'Coimbatore': {}, 'Madurai': {}, 'Tiruchirappalli': {}, 'Salem': {},
    'Tirunelveli': {}, 'Vellore': {}, 'Erode': {}, 'Kanyakumari': {}, 'Thanjavur': {},
    'Ooty': {}, 'Kodaikanal': {}, 'Kanchipuram': {},
    
    # Kerala
    'Thiruvananthapuram': {}, 'Kochi': {}, 'Kozhikode': {}, 'Thrissur': {}, 'Kollam': {},
    'Kottayam': {}, 'Alappuzha': {}, 'Palakkad': {}, 'Munnar': {}, 'Wayanad': {},
    
    # Andhra Pradesh & Telangana
    'Hyderabad': {}, 'Vijayawada': {}, 'Visakhapatnam': {}, 'Guntur': {}, 'Tirupati': {},
    'Warangal': {}, 'Nellore': {}, 'Kurnool': {}, 'Rajahmundry': {}, 'Kadapa': {},
    
    # Odisha
    'Bhubaneswar': {}, 'Cuttack': {}, 'Puri': {}, 'Rourkela': {}, 'Berhampur': {},
    'Sambalpur': {}, 'Konark': {},
    
    # West Bengal
    'Kolkata': {}, 'Siliguri': {}, 'Darjeeling': {}, 'Durgapur': {}, 'Asansol': {},
    'Howrah': {}, 'Kalimpong': {},
    
    # Bihar & Jharkhand
    'Patna': {}, 'Gaya': {}, 'Muzaffarpur': {}, 'Bhagalpur': {}, 'Bodh Gaya': {},
    'Ranchi': {}, 'Jamshedpur': {}, 'Dhanbad': {}, 'Bokaro': {},
    
    # Chhattisgarh
    'Raipur': {}, 'Bhilai': {}, 'Bilaspur': {}, 'Korba': {},
    
    # Northeast India
    'Guwahati': {}, 'Shillong': {}, 'Imphal': {}, 'Agartala': {}, 'Aizawl': {},
    'Kohima': {}, 'Itanagar': {}, 'Gangtok': {}, 'Dibrugarh': {}, 'Tezpur': {}
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

# --- Other Maharashtra Connections ---
add_edge('Aurangabad', 'Solapur', 305)
add_edge('Amravati', 'Nagpur', 156)
add_edge('Amravati', 'Akola', 95)
add_edge('Washim', 'Akola', 70)
add_edge('Jalna', 'Mehkar', 95)
add_edge('Mehkar', 'Washim', 65)
add_edge('Mehkar', 'Akola', 150)
add_edge('Nashik', 'Igatpuri', 33)

# === PAN-INDIA CONNECTIONS ===

# --- North India: Delhi & NCR ---
add_edge('Delhi', 'Gurgaon', 30)
add_edge('Delhi', 'Noida', 25)
add_edge('Delhi', 'Faridabad', 35)
add_edge('Delhi', 'Ghaziabad', 30)

# --- Delhi to Major Cities (Golden Quadrilateral & Major Highways) ---
add_edge('Delhi', 'Jaipur', 280)
add_edge('Delhi', 'Agra', 230)
add_edge('Delhi', 'Chandigarh', 250)
add_edge('Delhi', 'Lucknow', 550)
add_edge('Delhi', 'Amritsar', 450)

# --- Punjab & Chandigarh ---
add_edge('Chandigarh', 'Ambala', 45)
add_edge('Ambala', 'Karnal', 60)
add_edge('Karnal', 'Panipat', 50)
add_edge('Panipat', 'Delhi', 90)
add_edge('Chandigarh', 'Amritsar', 230)
add_edge('Chandigarh', 'Ludhiana', 100)
add_edge('Ludhiana', 'Jalandhar', 75)
add_edge('Jalandhar', 'Amritsar', 85)
add_edge('Amritsar', 'Patiala', 180)
add_edge('Patiala', 'Chandigarh', 65)

# --- Himachal Pradesh & J&K ---
add_edge('Chandigarh', 'Shimla', 115)
add_edge('Shimla', 'Manali', 250)
add_edge('Manali', 'Dharamshala', 230)
add_edge('Dharamshala', 'Amritsar', 200)
add_edge('Amritsar', 'Jammu', 210)
add_edge('Jammu', 'Srinagar', 260)

# --- Uttarakhand ---
add_edge('Delhi', 'Dehradun', 250)
add_edge('Dehradun', 'Haridwar', 55)
add_edge('Haridwar', 'Rishikesh', 25)
add_edge('Rishikesh', 'Dehradun', 45)
add_edge('Dehradun', 'Mussoorie', 35)
add_edge('Haridwar', 'Nainital', 230)

# --- Rajasthan Network ---
add_edge('Jaipur', 'Ajmer', 135)
add_edge('Ajmer', 'Udaipur', 270)
add_edge('Udaipur', 'Mount Abu', 165)
add_edge('Jaipur', 'Alwar', 150)
add_edge('Alwar', 'Delhi', 160)
add_edge('Jaipur', 'Jodhpur', 335)
add_edge('Jodhpur', 'Jaisalmer', 285)
add_edge('Jodhpur', 'Bikaner', 250)
add_edge('Bikaner', 'Jaipur', 330)
add_edge('Jaipur', 'Kota', 240)
add_edge('Kota', 'Bhopal', 345)
add_edge('Ajmer', 'Bhilwara', 110)
add_edge('Bhilwara', 'Udaipur', 150)

# --- Uttar Pradesh Network ---
add_edge('Agra', 'Mathura', 60)
add_edge('Mathura', 'Delhi', 180)
add_edge('Agra', 'Lucknow', 335)
add_edge('Lucknow', 'Kanpur', 80)
add_edge('Kanpur', 'Allahabad', 200)
add_edge('Allahabad', 'Varanasi', 130)
add_edge('Varanasi', 'Gorakhpur', 230)
add_edge('Delhi', 'Meerut', 70)
add_edge('Meerut', 'Bareilly', 250)
add_edge('Bareilly', 'Lucknow', 250)
add_edge('Agra', 'Aligarh', 90)
add_edge('Aligarh', 'Delhi', 130)
add_edge('Varanasi', 'Gaya', 240)
add_edge('Gaya', 'Bodh Gaya', 15)

# --- Madhya Pradesh Network ---
add_edge('Bhopal', 'Indore', 195)
add_edge('Indore', 'Ujjain', 55)
add_edge('Indore', 'Ratlam', 130)
add_edge('Bhopal', 'Gwalior', 420)
add_edge('Gwalior', 'Agra', 120)
add_edge('Bhopal', 'Jabalpur', 330)
add_edge('Jabalpur', 'Nagpur', 260)
add_edge('Bhopal', 'Sagar', 175)
add_edge('Jabalpur', 'Satna', 250)
add_edge('Satna', 'Allahabad', 215)

# --- Gujarat Network ---
add_edge('Ahmedabad', 'Gandhinagar', 30)
add_edge('Ahmedabad', 'Vadodara', 110)
add_edge('Vadodara', 'Surat', 140)
add_edge('Surat', 'Mumbai', 280)
add_edge('Ahmedabad', 'Rajkot', 220)
add_edge('Rajkot', 'Jamnagar', 90)
add_edge('Rajkot', 'Junagadh', 100)
add_edge('Junagadh', 'Dwarka', 230)
add_edge('Dwarka', 'Jamnagar', 135)
add_edge('Rajkot', 'Bhavnagar', 180)
add_edge('Rajkot', 'Porbandar', 110)
add_edge('Ahmedabad', 'Udaipur', 260)
add_edge('Vadodara', 'Indore', 330)

# --- Maharashtra to Karnataka & Goa ---
add_edge('Kolhapur', 'Belagavi', 100)
add_edge('Belagavi', 'Hubballi', 90)
add_edge('Hubballi', 'Davangere', 140)
add_edge('Pune', 'Kolhapur', 230)
add_edge('Kolhapur', 'Panaji', 130)
add_edge('Panaji', 'Margao', 35)
add_edge('Margao', 'Vasco da Gama', 30)
add_edge('Panaji', 'Mangaluru', 360)

# --- Karnataka Network ---
add_edge('Bengaluru', 'Mysuru', 145)
add_edge('Mysuru', 'Ooty', 125)
add_edge('Bengaluru', 'Chennai', 350)
add_edge('Bengaluru', 'Hyderabad', 570)
add_edge('Bengaluru', 'Mangaluru', 350)
add_edge('Mangaluru', 'Kozhikode', 235)
add_edge('Bengaluru', 'Tumakuru', 70)
add_edge('Tumakuru', 'Davangere', 200)
add_edge('Davangere', 'Shivamogga', 80)
add_edge('Hubballi', 'Vijayapura', 200)
add_edge('Vijayapura', 'Solapur', 150)
add_edge('Hubballi', 'Ballari', 240)
add_edge('Ballari', 'Hospet', 15)
add_edge('Hospet', 'Hampi', 13)
add_edge('Ballari', 'Hyderabad', 310)

# --- Tamil Nadu Network ---
add_edge('Chennai', 'Vellore', 140)
add_edge('Vellore', 'Bengaluru', 215)
add_edge('Chennai', 'Kanchipuram', 75)
add_edge('Chennai', 'Tiruchirappalli', 320)
add_edge('Tiruchirappalli', 'Madurai', 135)
add_edge('Madurai', 'Kanyakumari', 245)
add_edge('Kanyakumari', 'Thiruvananthapuram', 90)
add_edge('Chennai', 'Coimbatore', 505)
add_edge('Coimbatore', 'Ooty', 85)
add_edge('Coimbatore', 'Salem', 165)
add_edge('Salem', 'Bengaluru', 180)
add_edge('Coimbatore', 'Erode', 90)
add_edge('Erode', 'Salem', 65)
add_edge('Madurai', 'Tirunelveli', 150)
add_edge('Tiruchirappalli', 'Thanjavur', 60)
add_edge('Madurai', 'Kodaikanal', 120)
add_edge('Coimbatore', 'Kochi', 190)

# --- Kerala Network ---
add_edge('Thiruvananthapuram', 'Kollam', 70)
add_edge('Kollam', 'Alappuzha', 85)
add_edge('Alappuzha', 'Kottayam', 65)
add_edge('Kottayam', 'Kochi', 75)
add_edge('Kochi', 'Thrissur', 75)
add_edge('Thrissur', 'Palakkad', 80)
add_edge('Palakkad', 'Coimbatore', 55)
add_edge('Thrissur', 'Kozhikode', 120)
add_edge('Kozhikode', 'Wayanad', 90)
add_edge('Wayanad', 'Mysuru', 120)
add_edge('Kottayam', 'Munnar', 110)
add_edge('Munnar', 'Madurai', 140)

# --- Andhra Pradesh & Telangana Network ---
add_edge('Hyderabad', 'Warangal', 145)
add_edge('Warangal', 'Vijayawada', 260)
add_edge('Vijayawada', 'Guntur', 32)
add_edge('Vijayawada', 'Rajahmundry', 190)
add_edge('Rajahmundry', 'Visakhapatnam', 195)
add_edge('Visakhapatnam', 'Bhubaneswar', 445)
add_edge('Vijayawada', 'Chennai', 430)
add_edge('Hyderabad', 'Kurnool', 215)
add_edge('Kurnool', 'Ballari', 140)
add_edge('Kurnool', 'Tirupati', 330)
add_edge('Tirupati', 'Chennai', 135)
add_edge('Tirupati', 'Nellore', 175)
add_edge('Nellore', 'Vijayawada', 280)
add_edge('Hyderabad', 'Kadapa', 345)
add_edge('Kadapa', 'Tirupati', 150)
add_edge('Hyderabad', 'Nagpur', 500)

# --- Odisha Network ---
add_edge('Bhubaneswar', 'Cuttack', 30)
add_edge('Cuttack', 'Puri', 75)
add_edge('Puri', 'Konark', 35)
add_edge('Bhubaneswar', 'Berhampur', 170)
add_edge('Berhampur', 'Visakhapatnam', 275)
add_edge('Bhubaneswar', 'Sambalpur', 260)
add_edge('Sambalpur', 'Rourkela', 150)
add_edge('Rourkela', 'Ranchi', 170)

# --- West Bengal Network ---
add_edge('Kolkata', 'Howrah', 10)
add_edge('Kolkata', 'Bhubaneswar', 445)
add_edge('Kolkata', 'Asansol', 210)
add_edge('Asansol', 'Durgapur', 40)
add_edge('Durgapur', 'Ranchi', 230)
add_edge('Kolkata', 'Siliguri', 570)
add_edge('Siliguri', 'Darjeeling', 65)
add_edge('Darjeeling', 'Kalimpong', 50)
add_edge('Siliguri', 'Gangtok', 115)
add_edge('Siliguri', 'Guwahati', 415)

# --- Bihar & Jharkhand Network ---
add_edge('Patna', 'Gaya', 100)
add_edge('Gaya', 'Varanasi', 240)
add_edge('Patna', 'Muzaffarpur', 75)
add_edge('Muzaffarpur', 'Gorakhpur', 165)
add_edge('Patna', 'Bhagalpur', 230)
add_edge('Patna', 'Ranchi', 330)
add_edge('Ranchi', 'Jamshedpur', 130)
add_edge('Jamshedpur', 'Kolkata', 270)
add_edge('Ranchi', 'Dhanbad', 165)
add_edge('Dhanbad', 'Asansol', 100)
add_edge('Ranchi', 'Bokaro', 110)
add_edge('Bokaro', 'Dhanbad', 50)

# --- Chhattisgarh Network ---
add_edge('Raipur', 'Bhilai', 30)
add_edge('Raipur', 'Bilaspur', 120)
add_edge('Bilaspur', 'Korba', 90)
add_edge('Raipur', 'Nagpur', 290)
add_edge('Raipur', 'Bhubaneswar', 520)
add_edge('Bilaspur', 'Ranchi', 380)

# --- Northeast India Network ---
add_edge('Guwahati', 'Tezpur', 175)
add_edge('Tezpur', 'Dibrugarh', 360)
add_edge('Guwahati', 'Shillong', 100)
add_edge('Shillong', 'Gangtok', 450)
add_edge('Guwahati', 'Imphal', 535)
add_edge('Guwahati', 'Agartala', 600)
add_edge('Guwahati', 'Aizawl', 485)
add_edge('Guwahati', 'Kohima', 340)
add_edge('Kohima', 'Imphal', 215)
add_edge('Guwahati', 'Itanagar', 350)
add_edge('Siliguri', 'Gangtok', 115)


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
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)