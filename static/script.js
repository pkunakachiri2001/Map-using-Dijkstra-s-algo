// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. REAL CITY COORDINATES (52 City List) ---
    const cityCoordinates = {
        // Main Cities
        'Mumbai': [19.0760, 72.8777], 'Pune': [18.5204, 73.8567], 'Nashik': [19.9975, 73.7898],
        'Aurangabad': [19.8762, 75.3433], 'Nagpur': [21.1458, 79.0882], 'Kolhapur': [16.7050, 74.2433],
        'Ratnagiri': [16.9944, 73.3003], 'Solapur': [17.6797, 75.9064], 'Amravati': [20.9374, 77.7796],
        'Igatpuri': [19.7047, 73.5593], 'Sinnar': [19.8491, 74.0054], 'Jalna': [19.8354, 75.8839],
        'Akola': [20.7009, 77.0081],

        // Route 1 (Mumbai-Nashik)
        'Thane': [19.2183, 72.9781], 'Kalyan': [19.2403, 73.1305], 'Shahapur': [19.4532, 73.3330],
        'Kasara': [19.6583, 73.4839], 'Deolali': [19.8986, 73.8242],
        
        // Route 2 (Mumbai-Pune)
        'Panvel': [18.9894, 73.1175], 'Khandala': [18.7717, 73.3831], 'Lonavala': [18.7551, 73.4080],
        'Pimpri-Chinchwad': [18.6276, 73.8009],
        
        // Route 3 (Mumbai-Ratnagiri)
        'Pen': [18.7390, 73.0852], 'Kolad': [18.4239, 73.2192], 'Mangaon': [18.2394, 73.2750],
        'Mahad': [18.0772, 73.4222], 'Khed': [17.7145, 73.3902], 'Chiplun': [17.5302, 73.5150],
        'Sangameshwar': [17.1770, 73.5519],
        
        // Route 4 (Mumbai-Kolhapur)
        'Satara': [17.6833, 74.0000], 'Karad': [17.2845, 74.1852],
        
        // Route 5 (Mumbai-Aurangabad NH160)
        'Vaijapur': [19.9234, 74.7303],
        
        // Route 6 (Samruddhi Mahamarg)
        'Shirdi': [19.7645, 74.4762], 'Mehkar': [20.1550, 76.5756], 'Washim': [20.1005, 77.1352],
        'Wardha': [20.7453, 78.6022], 'Karanja Lad': [20.4795, 77.4830],

        // Route 7 (Pune-Solapur)
        'Indapur': [18.1090, 75.0298], 'Tembhurni': [17.8868, 75.1843],

        // Route 8 (Pune-Nashik)
        'Chakan': [18.7516, 73.8519], 'Rajgurunagar (Khed)': [18.8576, 73.8841],
        'Manchar': [19.0031, 73.9351], 'Narayangaon': [19.1235, 73.9754],
        'Alephata': [19.1764, 74.0768], 'Sangamner': [19.5714, 74.2081],
        
        // Route 9 (Pune-Aurangabad)
        'Shikrapur': [18.6366, 74.1332], 'Shirur': [18.8249, 74.3780], 'Ahmednagar': [19.0940, 74.7485],
        
        // Route 10 (Pune-Ratnagiri)
        'Patan': [17.3719, 73.9015],
        
        // --- NEW CITIES ADDED ---
        'Amba': [17.0601, 73.7753],
        'Sakharpa': [17.0673, 73.6338],
        'Miraj': [16.8291, 74.6397],
        'Pandharpur': [17.6745, 75.3235]
    };

    // --- 2. GET HTML ELEMENTS ---
    const startSelect = document.getElementById('start-city-select');
    const endSelect = document.getElementById('end-city-select');
    const findPathBtn = document.getElementById('find-path-btn');
    const distanceEl = document.getElementById('result-distance');
    const pathListEl = document.getElementById('result-path-list');

    // --- 3. INITIALIZE THE MAP & MARKERS ---
    let map = null;
    let currentPathLayer = null;
    let cityMarkers = {}; 
    let tomSelectStart = null;
    let tomSelectEnd = null;
    
    map = L.map('map').setView([19.7515, 75.7139], 7); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // --- 4. POPULATE DROPDOWNS & INITIALIZE SEARCH ---
    fetch('/get_cities')
        .then(response => response.json())
        .then(cities => {
            
            cities.sort(); // Sort cities alphabetically
            
            let cityOptions = cities.map(city => ({ value: city, text: city }));

            tomSelectStart = new TomSelect("#start-city-select", {
                options: cityOptions,
                placeholder: "Select a start city...",
                create: false,
                sortField: { field: "text", direction: "asc" }
            });
            
            tomSelectEnd = new TomSelect("#end-city-select", {
                options: cityOptions,
                placeholder: "Select an end city...",
                create: false,
                sortField: { field: "text", direction: "asc" }
            });
        });

    // --- 5. ADD CLICK EVENT TO BUTTON ---
    findPathBtn.addEventListener('click', () => {
        const startCity = startSelect.value;
        const endCity = endSelect.value;
        
        clearResults(); 

        if (startCity) {
            let coords = cityCoordinates[startCity];
            if (coords) {
                let marker = L.marker(coords).addTo(map)
                    .bindPopup(`<b>Start: ${startCity}</b>`).openPopup();
                cityMarkers[startCity] = marker;
            }
        }
        if (endCity && endCity !== startCity) {
            let coords = cityCoordinates[endCity];
            if (coords) {
                let marker = L.marker(coords).addTo(map)
                    .bindPopup(`<b>End: ${endCity}</b>`).openPopup();
                cityMarkers[endCity] = marker;
            }
        }

        if (!startCity || !endCity) {
            displayError("Please select a start and end city.");
            return;
        }
        if (startCity === endCity) {
            displayError("Start and end cities cannot be the same.");
            return;
        }

        // --- 6. CALL THE PYTHON BACKEND ---
        fetch('/calculate_path', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start: startCity, end: endCity })
        })
        .then(response => response.json())
        .then(result => {
            if (result.distance === "Infinity" || result.distance === Infinity) {
                displayError(`No path found from ${startCity} to ${endCity}.`);
            } else {
                distanceEl.textContent = `${result.distance} km`;
                displayPath(result.path);
            }
        });
    });

    // --- HELPER FUNCTIONS ---
    function clearResults() {
        distanceEl.textContent = '-- km';
        pathListEl.innerHTML = '';
        
        if (currentPathLayer) {
            map.removeLayer(currentPathLayer);
        }

        for (let city in cityMarkers) {
            map.removeLayer(cityMarkers[city]);
        }
        cityMarkers = {};
    }

    function displayError(message) {
        pathListEl.innerHTML = `
            <li class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <span class="material-symbols-outlined">error</span>
                </div>
                <span class="font-medium text-red-600">${message}</span>
            </li>
        `;
    }

    function displayPath(path) {
        let latLngs = []; 
        path.forEach((city, index) => {
            let icon;
            if (index === 0) icon = 'place';
            else if (index === path.length - 1) icon = 'flag';
            else icon = 'route';
            
            pathListEl.innerHTML += `
                <li class="flex items-center gap-3">
                    <div class="flex h-8 w-8 items-center justify-center rounded-full ${icon === 'route' ? 'bg-surface-light dark:bg-surface-dark ring-2 ring-inset ring-border-light dark:ring-border-dark' : 'bg-primary/20 text-primary'}">
                        <span class="material-symbols-outlined">${icon}</span>
                    </div>
                    <span class="font-medium">${city}</span>
                </li>
            `;
            
            if (index < path.length - 1) {
                pathListEl.innerHTML += `
                    <li class="flex items-center gap-3">
                        <div class="flex h-8 w-8 items-center justify-center">
                            <span class="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">more_vert</span>
                        </div>
                    </li>
                `;
            }

            if (cityCoordinates[city]) {
                latLngs.push(cityCoordinates[city]);
            } else {
                 console.warn(`No coordinates found for path city: ${city}`);
            }
        });

        currentPathLayer = L.polyline(latLngs, {
            color: '#019863',
            weight: 5,
            opacity: 0.8
        }).addTo(map).addTo(map);

        map.fitBounds(currentPathLayer.getBounds().pad(0.5));
    }
});