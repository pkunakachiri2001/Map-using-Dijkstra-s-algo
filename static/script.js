// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. PAN-INDIA CITY COORDINATES ---
    const cityCoordinates = {
        // Maharashtra Cities (Original)
        'Mumbai': [19.0760, 72.8777], 'Pune': [18.5204, 73.8567], 'Nashik': [19.9975, 73.7898],
        'Aurangabad': [19.8762, 75.3433], 'Nagpur': [21.1458, 79.0882], 'Kolhapur': [16.7050, 74.2433],
        'Ratnagiri': [16.9944, 73.3003], 'Solapur': [17.6797, 75.9064], 'Amravati': [20.9374, 77.7796],
        'Igatpuri': [19.7047, 73.5593], 'Sinnar': [19.8491, 74.0054], 'Jalna': [19.8354, 75.8839],
        'Akola': [20.7009, 77.0081], 'Thane': [19.2183, 72.9781], 'Kalyan': [19.2403, 73.1305], 
        'Shahapur': [19.4532, 73.3330], 'Kasara': [19.6583, 73.4839], 'Deolali': [19.8986, 73.8242],
        'Panvel': [18.9894, 73.1175], 'Khandala': [18.7717, 73.3831], 'Lonavala': [18.7551, 73.4080],
        'Pimpri-Chinchwad': [18.6276, 73.8009], 'Pen': [18.7390, 73.0852], 'Kolad': [18.4239, 73.2192], 
        'Mangaon': [18.2394, 73.2750], 'Mahad': [18.0772, 73.4222], 'Khed': [17.7145, 73.3902], 
        'Chiplun': [17.5302, 73.5150], 'Sangameshwar': [17.1770, 73.5519], 'Satara': [17.6833, 74.0000], 
        'Karad': [17.2845, 74.1852], 'Vaijapur': [19.9234, 74.7303], 'Shirdi': [19.7645, 74.4762], 
        'Mehkar': [20.1550, 76.5756], 'Washim': [20.1005, 77.1352], 'Wardha': [20.7453, 78.6022], 
        'Karanja Lad': [20.4795, 77.4830], 'Indapur': [18.1090, 75.0298], 'Tembhurni': [17.8868, 75.1843],
        'Chakan': [18.7516, 73.8519], 'Rajgurunagar (Khed)': [18.8576, 73.8841], 'Manchar': [19.0031, 73.9351], 
        'Narayangaon': [19.1235, 73.9754], 'Alephata': [19.1764, 74.0768], 'Sangamner': [19.5714, 74.2081],
        'Shikrapur': [18.6366, 74.1332], 'Shirur': [18.8249, 74.3780], 'Ahmednagar': [19.0940, 74.7485],
        'Patan': [17.3719, 73.9015], 'Amba': [17.0601, 73.7753], 'Sakharpa': [17.0673, 73.6338],
        'Miraj': [16.8291, 74.6397], 'Pandharpur': [17.6745, 75.3235],
        
        // Delhi & NCR
        'Delhi': [28.7041, 77.1025], 'Gurgaon': [28.4595, 77.0266], 'Noida': [28.5355, 77.3910],
        'Faridabad': [28.4089, 77.3178], 'Ghaziabad': [28.6692, 77.4538],
        
        // North India - Punjab, Haryana, Himachal Pradesh, J&K, Uttarakhand
        'Chandigarh': [30.7333, 76.7794], 'Amritsar': [31.6340, 74.8723], 'Ludhiana': [30.9010, 75.8573],
        'Jalandhar': [31.3260, 75.5762], 'Patiala': [30.3398, 76.3869], 'Shimla': [31.1048, 77.1734],
        'Manali': [32.2396, 77.1887], 'Dharamshala': [32.2190, 76.3234], 'Srinagar': [34.0837, 74.7973],
        'Jammu': [32.7266, 74.8570], 'Dehradun': [30.3165, 78.0322], 'Haridwar': [29.9457, 78.1642],
        'Rishikesh': [30.0869, 78.2676], 'Nainital': [29.3803, 79.4636], 'Mussoorie': [30.4598, 78.0644],
        'Ambala': [30.3782, 76.7767], 'Karnal': [29.6857, 76.9905], 'Panipat': [29.3909, 76.9635],
        'Rohtak': [28.8955, 76.6066],
        
        // Rajasthan
        'Jaipur': [26.9124, 75.7873], 'Udaipur': [24.5854, 73.7125], 'Jodhpur': [26.2389, 73.0243],
        'Ajmer': [26.4499, 74.6399], 'Kota': [25.2138, 75.8648], 'Bikaner': [28.0229, 73.3119],
        'Jaisalmer': [26.9157, 70.9083], 'Alwar': [27.5530, 76.6346], 'Bhilwara': [25.3470, 74.6401],
        'Mount Abu': [24.5926, 72.7156],
        
        // Uttar Pradesh
        'Lucknow': [26.8467, 80.9462], 'Kanpur': [26.4499, 80.3319], 'Agra': [27.1767, 78.0081],
        'Varanasi': [25.3176, 82.9739], 'Allahabad': [25.4358, 81.8463], 'Meerut': [28.9845, 77.7064],
        'Bareilly': [28.3670, 79.4304], 'Aligarh': [27.8974, 78.0880], 'Mathura': [27.4924, 77.6737],
        'Gorakhpur': [26.7606, 83.3732],
        
        // Madhya Pradesh
        'Bhopal': [23.2599, 77.4126], 'Indore': [22.7196, 75.8577], 'Gwalior': [26.2183, 78.1828],
        'Jabalpur': [23.1815, 79.9864], 'Ujjain': [23.1765, 75.7885], 'Ratlam': [23.3315, 75.0367],
        'Sagar': [23.8388, 78.7378], 'Satna': [24.6005, 80.8322],
        
        // Gujarat
        'Ahmedabad': [23.0225, 72.5714], 'Surat': [21.1702, 72.8311], 'Vadodara': [22.3072, 73.1812],
        'Rajkot': [22.3039, 70.8022], 'Gandhinagar': [23.2156, 72.6369], 'Bhavnagar': [21.7645, 72.1519],
        'Jamnagar': [22.4707, 70.0577], 'Junagadh': [21.5222, 70.4579], 'Dwarka': [22.2394, 68.9678],
        'Porbandar': [21.6417, 69.6293],
        
        // Goa
        'Panaji': [15.4909, 73.8278], 'Margao': [15.2708, 73.9606], 'Vasco da Gama': [15.3989, 73.8152],
        
        // Karnataka
        'Bengaluru': [12.9716, 77.5946], 'Mysuru': [12.2958, 76.6394], 'Mangaluru': [12.9141, 74.8560],
        'Hubballi': [15.3647, 75.1240], 'Belagavi': [15.8497, 74.4977], 'Davangere': [14.4644, 75.9218],
        'Ballari': [15.1394, 76.9214], 'Vijayapura': [16.8302, 75.7100], 'Shivamogga': [13.9299, 75.5681],
        'Tumakuru': [13.3392, 77.1006], 'Hampi': [15.3350, 76.4600], 'Hospet': [15.2695, 76.3870],
        
        // Tamil Nadu
        'Chennai': [13.0827, 80.2707], 'Coimbatore': [11.0168, 76.9558], 'Madurai': [9.9252, 78.1198],
        'Tiruchirappalli': [10.7905, 78.7047], 'Salem': [11.6643, 78.1460], 'Tirunelveli': [8.7139, 77.7567],
        'Vellore': [12.9165, 79.1325], 'Erode': [11.3410, 77.7172], 'Kanyakumari': [8.0883, 77.5385],
        'Thanjavur': [10.7870, 79.1378], 'Ooty': [11.4102, 76.6950], 'Kodaikanal': [10.2381, 77.4892],
        'Kanchipuram': [12.8342, 79.7036],
        
        // Kerala
        'Thiruvananthapuram': [8.5241, 76.9366], 'Kochi': [9.9312, 76.2673], 'Kozhikode': [11.2588, 75.7804],
        'Thrissur': [10.5276, 76.2144], 'Kollam': [8.8932, 76.6141], 'Kottayam': [9.5916, 76.5222],
        'Alappuzha': [9.4981, 76.3388], 'Palakkad': [10.7867, 76.6548], 'Munnar': [10.0889, 77.0595],
        'Wayanad': [11.6854, 76.1320],
        
        // Andhra Pradesh & Telangana
        'Hyderabad': [17.3850, 78.4867], 'Vijayawada': [16.5062, 80.6480], 'Visakhapatnam': [17.6868, 83.2185],
        'Guntur': [16.3067, 80.4365], 'Tirupati': [13.6288, 79.4192], 'Warangal': [17.9689, 79.5941],
        'Nellore': [14.4426, 79.9865], 'Kurnool': [15.8281, 78.0373], 'Rajahmundry': [17.0005, 81.8040],
        'Kadapa': [14.4674, 78.8241],
        
        // Odisha
        'Bhubaneswar': [20.2961, 85.8245], 'Cuttack': [20.5152, 85.8829], 'Puri': [19.8135, 85.8312],
        'Rourkela': [22.2604, 84.8536], 'Berhampur': [19.3150, 84.7941], 'Sambalpur': [21.4669, 83.9812],
        'Konark': [19.8876, 86.0977],
        
        // West Bengal
        'Kolkata': [22.5726, 88.3639], 'Siliguri': [26.7271, 88.3953], 'Darjeeling': [27.0360, 88.2627],
        'Durgapur': [23.5204, 87.3119], 'Asansol': [23.6839, 86.9523], 'Howrah': [22.5958, 88.2636],
        'Kalimpong': [27.0594, 88.4678],
        
        // Bihar & Jharkhand
        'Patna': [25.5941, 85.1376], 'Gaya': [24.7955, 85.0002], 'Muzaffarpur': [26.1225, 85.3906],
        'Bhagalpur': [25.2425, 86.9842], 'Bodh Gaya': [24.6952, 84.9914], 'Ranchi': [23.3441, 85.3096],
        'Jamshedpur': [22.8046, 86.2029], 'Dhanbad': [23.7957, 86.4304], 'Bokaro': [23.6693, 86.1511],
        
        // Chhattisgarh
        'Raipur': [21.2514, 81.6296], 'Bhilai': [21.2095, 81.3792], 'Bilaspur': [22.0797, 82.1409],
        'Korba': [22.3595, 82.7501],
        
        // Northeast India
        'Guwahati': [26.1445, 91.7362], 'Shillong': [25.5788, 91.8933], 'Imphal': [24.8170, 93.9368],
        'Agartala': [23.8315, 91.2868], 'Aizawl': [23.7271, 92.7176], 'Kohima': [25.6747, 94.1086],
        'Itanagar': [27.0844, 93.6053], 'Gangtok': [27.3389, 88.6065], 'Dibrugarh': [27.4728, 94.9120],
        'Tezpur': [26.6338, 92.8000]
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
    
    // Center map on India with zoom level to show entire country
    map = L.map('map').setView([22.5, 79.0], 5); 

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

    // --- DEFINE FIND ROUTE FUNCTION ---
    window.findRoute = function(start, end) {
        console.log(`Finding route from: ${start} to: ${end}`); // Diagnostic log
        fetch('/calculate_path', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // Backend expects keys 'start' and 'end'
            body: JSON.stringify({ start: start, end: end })
        })
        .then(response => {
            console.log('Received response from server:', response); // Diagnostic log
            return response.json();
        })
        .then(data => {
            console.log('Parsed data:', data); // Diagnostic log
            if (data.distance && data.path) {
                // --- UPDATE UI WITH NEW DATA ---
                // No longer using a single 'result' div. Update individual elements instead.
                
                // Update the main distance display
                const distanceEl = document.getElementById('result-distance');
                if(distanceEl) {
                    distanceEl.innerHTML = `${data.distance} <span class="text-2xl">km</span>`;
                }

                // Display the detailed path steps
                displayPath(data.path);

                // Calculate and display all other stats (time, cost, etc.)
                updateStats(data.distance, data.path);
                
                // Enable save and share buttons
                const saveBtn = document.getElementById('save-route-btn');
                const shareBtn = document.getElementById('share-route-btn');
                if (saveBtn) saveBtn.disabled = false;
                if (shareBtn) shareBtn.disabled = false;

            } else if (data.error) {
                displayError(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-3xl text-red-500">error</span>
                    <p class="text-red-500 font-bold">An error occurred. Please try again.</p>
                </div>
            `;
        });
    };

    // --- 5. ADD CLICK EVENT TO BUTTON ---
    findPathBtn.addEventListener('click', () => {
        // Use the TomSelect instances bound to #start-city-select and #end-city-select
        const startCity = tomSelectStart ? tomSelectStart.getValue() : null;
        const endCity = tomSelectEnd ? tomSelectEnd.getValue() : null;
        
        console.log('Find Path button clicked.'); // Diagnostic log
        console.log('Start City selected:', startCity); // Diagnostic log
        console.log('End City selected:', endCity); // Diagnostic log

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

        // --- 6. CALL THE ENHANCED FIND ROUTE FUNCTION ---
        findRoute(startCity, endCity);
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const icon = themeToggle.querySelector('.material-symbols-outlined');
        if (htmlElement.classList.contains('dark')) {
            icon.textContent = 'light_mode';
        } else {
            icon.textContent = 'dark_mode';
        }
    });

    // --- HELPER FUNCTIONS ---
    function clearResults() {
        distanceEl.textContent = '-- km';
        pathListEl.innerHTML = '<li class="text-sm text-text-muted-light dark:text-text-muted-dark text-center py-8">Select cities and find a route to see the path here</li>';
        document.getElementById('city-count').textContent = '0 cities';
        
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
            <li class="path-card flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
                    <span class="material-symbols-outlined">error</span>
                </div>
                <span class="font-medium text-red-700 dark:text-red-300 text-sm">${message}</span>
            </li>
        `;
        document.getElementById('city-count').textContent = '0 cities';
    }

    function displayPath(path) {
        let latLngs = [];
        pathListEl.innerHTML = '';
        
        // Update city count with animation
        const cityCount = document.getElementById('city-count');
        cityCount.style.transform = 'scale(1.2)';
        cityCount.textContent = `${path.length} cities`;
        setTimeout(() => {
            cityCount.style.transform = 'scale(1)';
        }, 200);
        
        path.forEach((city, index) => {
            let icon, bgClass, textClass, badge;
            if (index === 0) {
                icon = 'rocket_launch';
                bgClass = 'bg-gradient-to-br from-primary via-purple-600 to-primary-dark shadow-lg shadow-primary/50';
                textClass = 'text-white';
                badge = '🚀';
            } else if (index === path.length - 1) {
                icon = 'celebration';
                bgClass = 'bg-gradient-to-br from-accent via-emerald-600 to-accent-dark shadow-lg shadow-accent/50';
                textClass = 'text-white';
                badge = '🎯';
            } else {
                icon = 'trip_origin';
                bgClass = 'bg-gradient-to-br from-primary/20 to-purple-500/20 border-2 border-primary/40';
                textClass = 'text-primary';
                badge = '📍';
            }
            
            pathListEl.innerHTML += `
                <li class="path-card flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300 border border-transparent hover:border-primary/20 shadow-sm hover:shadow-lg" style="animation: slideIn 0.3s ease-out ${index * 0.05}s both;">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl ${bgClass} ${textClass} flex-shrink-0 transform hover:scale-110 hover:rotate-12 transition-all duration-300">
                        <span class="material-symbols-outlined text-xl">${icon}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="text-lg">${badge}</span>
                            <span class="font-bold text-text-light dark:text-text-dark block truncate">${city}</span>
                        </div>
                        ${index === 0 ? '<span class="text-xs font-semibold text-primary uppercase tracking-wider">Starting point</span>' : 
                          index === path.length - 1 ? '<span class="text-xs font-semibold text-accent uppercase tracking-wider">Final destination</span>' : 
                          `<span class="text-xs font-semibold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">Checkpoint ${index}</span>`}
                    </div>
                    ${index === 0 || index === path.length - 1 ? `
                        <div class="flex items-center justify-center h-8 w-8 rounded-xl ${index === 0 ? 'bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30' : 'bg-gradient-to-br from-accent/20 to-emerald-500/20 border border-accent/30'} shadow-sm">
                            <span class="material-symbols-outlined text-base ${index === 0 ? 'text-primary' : 'text-accent'}">${index === 0 ? 'north' : 'verified'}</span>
                        </div>
                    ` : `
                        <div class="flex items-center justify-center h-8 w-8 rounded-xl bg-primary/5 border border-primary/20">
                            <span class="text-xs font-black text-primary">${index}</span>
                        </div>
                    `}
                </li>
            `;
            
            if (index < path.length - 1) {
                pathListEl.innerHTML += `
                    <li class="flex items-center justify-center py-1">
                        <div class="flex flex-col items-center gap-1">
                            <div class="w-0.5 h-3 bg-gradient-to-b from-primary to-purple-500 rounded-full"></div>
                            <div class="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                            <div class="w-0.5 h-3 bg-gradient-to-b from-purple-500 to-primary/40 rounded-full"></div>
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

        // Create enhanced custom markers
        if (latLngs.length > 0) {
            const startIcon = L.divIcon({
                html: `<div style="position: relative;">
                    <div style="position: absolute; inset: -8px; background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%); border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5), 0 0 0 4px white; border: 3px solid white; position: relative;">
                        <span style="font-size: 22px;">🚀</span>
                    </div>
                </div>`,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });
            
            const endIcon = L.divIcon({
                html: `<div style="position: relative;">
                    <div style="position: absolute; inset: -8px; background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%); border-radius: 50%; animation: pulse 2s infinite;"></div>
                    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.5), 0 0 0 4px white; border: 3px solid white; position: relative;">
                        <span style="font-size: 22px;">🏁</span>
                    </div>
                </div>`,
                className: 'custom-marker',
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });
            
            // Add intermediate markers
            latLngs.forEach((coords, idx) => {
                if (idx === 0) {
                    L.marker(coords, {icon: startIcon})
                        .bindPopup(`<div style="font-weight: 700; color: #6366f1; font-size: 14px; padding: 4px;">🚀 <strong>START:</strong> ${path[idx]}</div>`, {
                            className: 'custom-popup'
                        })
                        .addTo(map);
                } else if (idx === latLngs.length - 1) {
                    L.marker(coords, {icon: endIcon})
                        .bindPopup(`<div style="font-weight: 700; color: #10b981; font-size: 14px; padding: 4px;">🎯 <strong>END:</strong> ${path[idx]}</div>`, {
                            className: 'custom-popup'
                        })
                        .addTo(map);
                } else {
                    const midIcon = L.divIcon({
                        html: `<div style="background: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); border: 2px solid #6366f1; font-weight: 800; font-size: 10px; color: #6366f1;">${idx}</div>`,
                        className: 'custom-marker',
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    });
                    L.marker(coords, {icon: midIcon})
                        .bindPopup(`<div style="font-weight: 600; font-size: 13px; padding: 4px;">📍 <strong>Stop ${idx}:</strong> ${path[idx]}</div>`)
                        .addTo(map);
                }
            });
        }

        // Animate the path drawing
        currentPathLayer = L.polyline(latLngs, {
            color: '#6366f1',
            weight: 5,
            opacity: 0.9,
            smoothFactor: 1,
            lineCap: 'round',
            lineJoin: 'round'
        }).addTo(map);
        
        map.fitBounds(currentPathLayer.getBounds().pad(0.15));
    }

    // --- TRANSPORT MODE FUNCTIONALITY ---
    const transportModes = document.querySelectorAll('.transport-mode-btn');
    let selectedMode = 'car'; // default
    transportModes.forEach(btn => {
        btn.addEventListener('click', () => {
            transportModes.forEach(b => {
                b.classList.remove('active', 'bg-primary/10', 'text-primary', 'border-primary/30');
                b.classList.add('bg-surface-light', 'text-text-muted-light', 'border-border-light');
            });
            btn.classList.remove('bg-surface-light', 'text-text-muted-light', 'border-border-light');
            btn.classList.add('active', 'bg-primary/10', 'text-primary', 'border-primary/30');
            selectedMode = btn.dataset.mode;
            // Recalculate if route exists
            if (currentPathLayer) {
                const startCity = tomSelectStart ? tomSelectStart.getValue() : null;
                const endCity = tomSelectEnd ? tomSelectEnd.getValue() : null;
                if (startCity && endCity) {
                    findRoute(startCity, endCity);
                }
            }
        });
    });

    // --- SWAP CITIES BUTTON ---
    document.getElementById('swap-cities-btn').addEventListener('click', () => {
        const startVal = tomSelectStart ? tomSelectStart.getValue() : null;
        const endVal = tomSelectEnd ? tomSelectEnd.getValue() : null;
        if (tomSelectStart) tomSelectStart.setValue(endVal);
        if (tomSelectEnd) tomSelectEnd.setValue(startVal);
    });

    // --- CLEAR ROUTE BUTTON ---
    document.getElementById('clear-route-btn').addEventListener('click', () => {
        if (tomSelectStart) tomSelectStart.clear();
        if (tomSelectEnd) tomSelectEnd.clear();
        
        // Reset all stats and UI elements
        clearResults();
        resetStats();

        // Disable buttons that require a route
        const saveBtn = document.getElementById('save-route-btn');
        const shareBtn = document.getElementById('share-route-btn');
        const downloadBtn = document.getElementById('download-route-btn');
        const speakBtn = document.getElementById('speak-route-btn');
        if(saveBtn) saveBtn.disabled = true;
        if(shareBtn) shareBtn.disabled = true;
        if(downloadBtn) downloadBtn.disabled = true;
        if(speakBtn) speakBtn.disabled = true;

        // Hide map overlay
        const mapOverlay = document.getElementById('map-info-overlay');
        if(mapOverlay) mapOverlay.classList.add('hidden');
        
        // Stop any ongoing speech
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    });

    // --- SAVE ROUTE FUNCTIONALITY ---
    document.getElementById('save-route-btn').addEventListener('click', () => {
        const startCity = tomSelectStart ? tomSelectStart.getValue() : null;
        const endCity = tomSelectEnd ? tomSelectEnd.getValue() : null;
        const distanceText = distanceEl.textContent;
        
        if (!startCity || !endCity || !distanceText.includes('km')) {
            alert('Please calculate a route first!');
            return;
        }
        
        const route = {
            id: Date.now(),
            start: startCity,
            end: endCity,
            distance: parseFloat(distanceText),
            mode: selectedMode,
            timestamp: new Date().toISOString()
        };
        
        let savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
        savedRoutes.unshift(route);
        if (savedRoutes.length > 10) savedRoutes = savedRoutes.slice(0, 10); // Keep max 10
        localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
        
        displaySavedRoutes();
        alert('Route saved successfully!');
    });

    // --- DISPLAY SAVED ROUTES ---
    function displaySavedRoutes() {
        const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
        const container = document.getElementById('saved-routes-list');
        
        if (savedRoutes.length === 0) {
            container.innerHTML = '<p class="text-text-muted-light dark:text-text-muted-dark text-center py-8">No saved routes yet</p>';
            return;
        }
        
        container.innerHTML = savedRoutes.map(route => `
            <div class="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/10 hover:border-primary/30 transition-all group mb-2">
                <div class="flex items-start justify-between mb-2">
                    <div>
                        <p class="font-bold text-text-light dark:text-text-dark">${route.start} → ${route.end}</p>
                        <p class="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">${new Date(route.timestamp).toLocaleDateString()}</p>
                    </div>
                    <span class="text-xs font-bold px-2 py-1 bg-accent/20 text-accent rounded-lg">${route.distance} km</span>
                </div>
                <div class="flex items-center gap-2 mt-3">
                    <button onclick="loadSavedRoute('${route.start}', '${route.end}', '${route.mode}')" class="flex-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all text-xs font-bold flex items-center justify-center gap-1">
                        <span class="material-symbols-outlined text-sm">play_arrow</span> Load
                    </button>
                    <button onclick="deleteSavedRoute(${route.id})" class="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all text-xs font-bold flex items-center justify-center gap-1">
                        <span class="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // --- LOAD SAVED ROUTE ---
    window.loadSavedRoute = function(start, end, mode) {
        if (tomSelectStart) tomSelectStart.setValue(start);
        if (tomSelectEnd) tomSelectEnd.setValue(end);
        
        document.querySelectorAll('.transport-mode-btn').forEach(btn => {
            const isActive = btn.dataset.mode === mode;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('bg-primary/10', isActive);
            btn.classList.toggle('text-primary', isActive);
            btn.classList.toggle('border-primary/30', isActive);
            
            btn.classList.toggle('bg-surface-light', !isActive);
            btn.classList.toggle('text-text-muted-light', !isActive);
            btn.classList.toggle('border-border-light', !isActive);
        });
        selectedMode = mode;
        findRoute(start, end);
    };

    // --- DELETE SAVED ROUTE ---
    window.deleteSavedRoute = function(id) {
        let savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
        savedRoutes = savedRoutes.filter(r => r.id !== id);
        localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
        displaySavedRoutes();
    };

    // --- CLEAR ALL SAVED ROUTES ---
    const clearSavedBtn = document.getElementById('clear-saved-btn');
    if(clearSavedBtn) {
        clearSavedBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all saved routes?')) {
                localStorage.removeItem('savedRoutes');
                displaySavedRoutes();
            }
        });
    }


    // --- SHARE ROUTE ---
    const shareRouteBtn = document.getElementById('share-route-btn');
    if (shareRouteBtn) {
        shareRouteBtn.addEventListener('click', () => {
            const startCity = tomSelectStart ? tomSelectStart.getValue() : null;
            const endCity = tomSelectEnd ? tomSelectEnd.getValue() : null;
        
        if (!startCity || !endCity) {
            alert('Please calculate a route first!');
            return;
        }
        
        const shareUrl = `${window.location.origin}?start=${encodeURIComponent(startCity)}&end=${encodeURIComponent(endCity)}&mode=${selectedMode}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'India Route Map',
                text: `Check out this route from ${startCity} to ${endCity}!`,
                url: shareUrl
            });
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert('Route link copied to clipboard!');
        }
        });
    }

    // --- POPULAR ROUTES ---
    window.loadPopularRoute = function(start, end) {
        if (tomSelectStart) tomSelectStart.setValue(start);
        if (tomSelectEnd) tomSelectEnd.setValue(end);
        findRoute(start, end);
    };

    // --- MAP CONTROLS ---
    document.getElementById('recenter-map-btn').addEventListener('click', () => {
        map.setView([22.5, 79.0], 5); 
    });

    let isFullscreen = false;
    document.getElementById('fullscreen-map-btn').addEventListener('click', () => {
        const mapContainer = document.querySelector('.lg\\:col-span-8'); // Target the container of the map
        if (!document.fullscreenElement) {
            mapContainer.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    document.getElementById('download-route-btn').addEventListener('click', () => {
        const startCity = tomSelectStart ? tomSelectStart.getValue() : null;
        const endCity = tomSelectEnd ? tomSelectEnd.getValue() : null;
        const distanceText = distanceEl.textContent;
        const pathText = Array.from(pathListEl.querySelectorAll('li .font-bold')).map(el => el.textContent).join(' -> ');
        
        if (!startCity || !endCity) return;
        
        const routeData = `Route Details\n===============\nFrom: ${startCity}\nTo: ${endCity}\nDistance: ${distanceText}\nMode: ${selectedMode}\nPath: ${pathText}\n\nGenerated: ${new Date().toLocaleString()}\n\nProduced by Panashe Kunaka`;
        const blob = new Blob([routeData], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `route_${startCity}_${endCity}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    });

    // --- UPDATE STATS WITH TRANSPORT MODE ---
    function updateStats(distance, path) {
        const speeds = {car: 80, bus: 60, bike: 50};
        const fuelCosts = {car: 6, bus: 4, bike: 3}; // ₹ per km
        
        const speed = speeds[selectedMode] || speeds['car'];
        const fuelCost = fuelCosts[selectedMode] || fuelCosts['car'];
        const time = (distance / speed);
        const hours = Math.floor(time);
        const minutes = Math.round((time - hours) * 60);

        const timeFormatted = `${hours}h ${minutes}m`;
        const cost = (distance * fuelCost).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
        const miles = (distance * 0.621371).toFixed(1);
        
        // Count unique states (simplified - would need state mapping)
        const states = new Set(path.map(city => city.substring(0, 2).toUpperCase()));
        
        document.getElementById('est-time').innerText = timeFormatted;
        document.getElementById('fuel-cost').innerText = cost;
        document.getElementById('states-count').innerText = states.size || '--';
        document.getElementById('distance-miles').innerText = `${miles} mi`;
        
        // Enable download and speak buttons
        document.getElementById('download-route-btn').disabled = false;
        document.getElementById('speak-route-btn').disabled = false;
        
        // Show map overlay
        const overlayName = document.getElementById('overlay-route-name');
        overlayName.innerText = `${path[0]} → ${path[path.length - 1]}`;
        document.getElementById('map-info-overlay').classList.remove('hidden');
    }

    // --- KEYBOARD SHORTCUTS ---
    document.addEventListener('keydown', (e) => {
        const helpModal = document.getElementById('help-modal');
        
        // Close help modal with Escape
        if (e.key === 'Escape' && helpModal && helpModal.style.display !== 'none') {
            helpModal.style.display = 'none';
            return;
        }
        
        // Prevent shortcuts while typing in inputs
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.classList.contains('ts-control')) {
            return;
        }

        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            if (tomSelectStart) {
                tomSelectStart.focus();
            }
        }
        if (e.key === 'Escape') {
            const clearBtn = document.getElementById('clear-route-btn');
            if (clearBtn) clearBtn.click();
        }
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            const saveBtn = document.getElementById('save-route-btn');
            if (saveBtn && !saveBtn.disabled) saveBtn.click();
        }
    });

    // --- LOAD ROUTE FROM URL PARAMETERS ---
    const urlParams = new URLSearchParams(window.location.search);
    const startParam = urlParams.get('start');
    const endParam = urlParams.get('end');
    const modeParam = urlParams.get('mode');
    
    if (startParam && endParam) {
        setTimeout(() => {
            if (tomSelectStart) tomSelectStart.setValue(startParam);
            if (tomSelectEnd) tomSelectEnd.setValue(endParam);

            if (modeParam) {
                document.querySelectorAll('.transport-mode-btn').forEach(btn => {
                    const isActive = btn.dataset.mode === modeParam;
                    btn.classList.toggle('active', isActive);
                    btn.classList.toggle('bg-primary/10', isActive);
                    btn.classList.toggle('text-primary', isActive);
                    btn.classList.toggle('border-primary/30', isActive);
                    
                    btn.classList.toggle('bg-surface-light', !isActive);
                    btn.classList.toggle('text-text-muted-light', !isActive);
                    btn.classList.toggle('border-border-light', !isActive);
                });
                selectedMode = modeParam;
            }
            findRoute(startParam, endParam);
        }, 500); // Delay to ensure TomSelect is ready
    }

    // --- TEXT-TO-SPEECH ROUTE NARRATION ---
    let currentSpeechPath = [];
    const speakRouteBtn = document.getElementById('speak-route-btn');
    const speakStatus = document.getElementById('speak-status');
    
    if (speakRouteBtn) {
        speakRouteBtn.addEventListener('click', () => {
            // Check if speech synthesis is supported
            if (!('speechSynthesis' in window)) {
                alert('Sorry, your browser does not support text-to-speech!');
                return;
            }
            
            // If already speaking, stop it
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                speakStatus.classList.add('hidden');
                speakRouteBtn.innerHTML = '<span class="material-symbols-outlined text-sm sm:text-base">volume_up</span><span>Speak Route</span><span id="speak-status" class="hidden text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full">Speaking...</span>';
                return;
            }
            
            // Get current route path
            const pathList = document.getElementById('result-path-list');
            const pathItems = pathList.querySelectorAll('li.flex');
            
            if (pathItems.length === 0) {
                alert('Please calculate a route first!');
                return;
            }
            
            // Extract city names from the path
            const cities = [];
            pathItems.forEach(item => {
                const cityNameElement = item.querySelector('.font-bold');
                if (cityNameElement) {
                    cities.push(cityNameElement.textContent.trim());
                }
            });
            
            if (cities.length === 0) return;
            
            // Get route statistics
            const distance = document.getElementById('result-distance').textContent.trim();
            const estTime = document.getElementById('est-time').textContent.trim();
            const fuelCost = document.getElementById('fuel-cost').textContent.trim();
            
            // Build the speech text
            let speechText = `Your route from ${cities[0]} to ${cities[cities.length - 1]} has been calculated. `;
            speechText += `Total distance is ${distance}. `;
            speechText += `Estimated travel time is ${estTime}. `;
            speechText += `Estimated fuel cost is ${fuelCost}. `;
            speechText += `\n\nYour route has ${cities.length} stops. `;
            speechText += `Starting from ${cities[0]}. `;
            
            // Add intermediate cities
            if (cities.length > 2) {
                speechText += 'Then passing through: ';
                for (let i = 1; i < cities.length - 1; i++) {
                    speechText += `${cities[i]}, `;
                }
            }
            
            speechText += `And finally arriving at ${cities[cities.length - 1]}. `;
            speechText += 'Have a safe journey!';
            
            // Create speech synthesis utterance
            const utterance = new SpeechSynthesisUtterance(speechText);
            utterance.rate = 0.9; // Slightly slower for clarity
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            utterance.lang = 'en-IN'; // Indian English
            
            // Show speaking status
            speakStatus.classList.remove('hidden');
            speakRouteBtn.innerHTML = '<span class="material-symbols-outlined text-sm sm:text-base">volume_off</span><span>Stop Speaking</span><span id="speak-status" class="text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full">Speaking...</span>';
            
            // Handle speech end
            utterance.onend = () => {
                speakStatus.classList.add('hidden');
                speakRouteBtn.innerHTML = '<span class="material-symbols-outlined text-sm sm:text-base">volume_up</span><span>Speak Route</span><span id="speak-status" class="hidden text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full">Speaking...</span>';
            };
            
            // Handle speech error
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event);
                speakStatus.classList.add('hidden');
                speakRouteBtn.innerHTML = '<span class="material-symbols-outlined text-sm sm:text-base">volume_up</span><span>Speak Route</span><span id="speak-status" class="hidden text-[10px] px-2 py-0.5 bg-purple-500/20 rounded-full">Speaking...</span>';
                alert('Error speaking the route. Please try again.');
            };
            
            // Speak it!
            window.speechSynthesis.speak(utterance);
        });
    }

    // --- HELP MODAL ---
    const helpModal = document.getElementById('help-modal');
    const helpBtn = document.getElementById('help-btn');
    const closeHelpBtn = document.getElementById('close-help-btn');
    
    if (helpBtn && helpModal) {
        helpBtn.addEventListener('click', () => {
            helpModal.style.display = 'flex';
            setTimeout(() => helpModal.classList.remove('hidden'), 10); // For transition
        });
    }
    
    if (closeHelpBtn && helpModal) {
        closeHelpBtn.addEventListener('click', () => {
            helpModal.classList.add('hidden');
            setTimeout(() => helpModal.style.display = 'none', 300); // Match animation
        });
    }
    
    if (helpModal) {
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) {
                helpModal.classList.add('hidden');
                setTimeout(() => helpModal.style.display = 'none', 300);
            }
        });
    }

    // --- VOICE SEARCH ---
    const voiceBtn = document.getElementById('voice-search-btn');
    if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceBtn.addEventListener('click', () => {
            voiceBtn.classList.add('animate-pulse');
            voiceBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Voice input:', transcript);
            
            // Parse voice command: "find route from [city1] to [city2]"
            const fromMatch = transcript.match(/from\s+([a-z\s]+?)(?:\s+to|$)/i);
            const toMatch = transcript.match(/to\s+([a-z\s]+?)$/i);
            
            if (fromMatch && toMatch) {
                const startCity = fromMatch[1].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                const endCity = toMatch[1].trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                
                if(tomSelectStart) tomSelectStart.setValue(startCity);
                if(tomSelectEnd) tomSelectEnd.setValue(endCity);
                
                setTimeout(() => {
                    findRoute(startCity, endCity);
                }, 500);
            } else {
                alert('Please say: "Find route from [city] to [city]"');
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            voiceBtn.classList.remove('animate-pulse');
            voiceBtn.style.background = '';
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('animate-pulse');
            voiceBtn.style.background = '';
        };
    } else if (voiceBtn) {
        voiceBtn.disabled = true;
        voiceBtn.title = 'Voice search not supported';
    }

    // --- Add a function to reset stats ---
    function resetStats() {
        document.getElementById('result-distance').innerHTML = '-- km';
        document.getElementById('est-time').innerText = '--';
        document.getElementById('fuel-cost').innerText = '--';
        document.getElementById('states-count').innerText = '--';
        document.getElementById('distance-miles').innerText = '--';
    }

    // --- INITIALIZE ---
    displaySavedRoutes();
});