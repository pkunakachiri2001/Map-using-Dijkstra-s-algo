# India Path Finder 🗺️

A stunning web application that finds the shortest path between 180+ Indian cities using Dijkstra's algorithm with real-time visualization on an interactive map.

![India Path Finder](https://img.shields.io/badge/Cities-180%2B-blue) ![Algorithm](https://img.shields.io/badge/Algorithm-Dijkstra-green) ![Status](https://img.shields.io/badge/Status-Live-success)

## ✨ Features

- 🌍 **180+ Cities Coverage** - Comprehensive network across all Indian states
- 🚀 **Dijkstra's Algorithm** - Optimized shortest path calculation
- 🗺️ **Interactive Map** - Real-time route visualization with Leaflet.js
- 🎨 **Premium UI/UX** - Modern glassmorphism design with smooth animations
- 🌓 **Dark Mode** - Beautiful theme toggle
- ⚡ **Real-Time Results** - Instant path calculation and visualization
- 📱 **Responsive Design** - Works seamlessly on all devices

## 🛠️ Technologies

- **Backend**: Flask (Python)
- **Frontend**: Tailwind CSS, Leaflet.js
- **Algorithm**: Dijkstra's Shortest Path
- **Deployment**: Render

## 🚀 Live Demo

[View Live Application](#) *(Add your Render deployment URL here)*

## 📦 Installation

### Prerequisites
- Python 3.11+
- pip

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tanvi-Patil-03/Dijkstra-Map-Visualizer.git
   cd Dijkstra-Map-Visualizer
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## 🌐 Deploy to Render

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: india-path-finder (or your choice)
     - **Environment**: Python
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `gunicorn app:app`
     - **Instance Type**: Free

3. **Deploy** - Render will automatically deploy your app!

## 📊 Coverage

### Regions Covered
- **North India**: Delhi NCR, Punjab, Haryana, Himachal Pradesh, J&K, Uttarakhand
- **South India**: Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, Telangana
- **West India**: Maharashtra, Gujarat, Rajasthan, Goa
- **East India**: West Bengal, Odisha, Bihar, Jharkhand
- **Central India**: Madhya Pradesh, Chhattisgarh, Uttar Pradesh
- **Northeast**: All 7 sister states + Sikkim

## 🎯 Algorithm Details

The application uses **Dijkstra's Shortest Path Algorithm** with:
- Priority Queue (heap) implementation
- Time Complexity: O((V + E) log V)
- Real highway distances between cities
- Bidirectional graph representation

## 👨‍💻 Author

**Panashe Kunaka**

- Crafted with excellence and attention to detail
- Modern UI/UX design principles
- Optimized performance and user experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Original concept inspiration from Tanvi Patil
- Enhanced and transformed by Panashe Kunaka
- Leaflet.js for mapping functionality
- OpenStreetMap for map tiles
- Tailwind CSS for styling

## 📸 Screenshots

### Home Page
*Beautiful glassmorphism UI with gradient effects*

### Route Calculation
*Real-time path calculation with detailed breakdown*

### Interactive Map
*Live visualization with custom markers and animated paths*

---

**Made with ❤️ by Panashe Kunaka**
