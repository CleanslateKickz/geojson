# GeoJSON Repository 🗺️

![Last Updated](https://img.shields.io/badge/Last%20Updated-2025--04--09-blue)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, clean interface for hosting and organizing GeoJSON files for Leaflet map projects. This repository provides an easy-to-navigate web interface for accessing and managing GeoJSON data.

## 🌟 Features

- **Clean, Modern Design**: Professional and user-friendly interface
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smart Organization**: Category-based file structure
- **Search Functionality**: Quick access to files
- **Recent Files Section**: Easy access to latest updates
- **Mobile-Friendly**: Optimized for all screen sizes

## 📁 Repository Structure

```
geojson-repository/
├── index.html              # Main landing page
├── css/
│   └── styles.css         # Styling definitions
├── js/
│   └── main.js           # JavaScript functionality
├── geojson/              # GeoJSON file storage
│   ├── administrative/   # Administrative boundaries
│   ├── transportation/   # Transportation networks
│   ├── natural/         # Natural features
│   └── poi/             # Points of interest
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- A GitHub account
- Basic knowledge of Git (for updates)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/CleanslateKickz/geojson-repository.git
   ```

2. **Configure GitHub Pages**
   - Navigate to repository Settings
   - Scroll to "GitHub Pages" section
   - Set source to main branch
   - Save settings

3. **Adding GeoJSON Files**
   - Place files in appropriate category folders under `/geojson`
   - Update `main.js` with new file entries
   - Commit and push changes

## 🎨 Customization

### Adding New Categories
Edit `main.js` to add new categories:
```javascript
const categories = [
    {
        name: 'Your New Category',
        description: 'Category description',
        icon: 'fa-icon-name'
    },
    // ...
];
```

### Modifying Styles
- Edit `css/styles.css` to change colors, layouts, and animations
- Current theme uses a clean, professional color scheme:
  - Primary: `#2c3e50`
  - Secondary: `#3498db`
  - Background: `#f5f6fa`

## 💻 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome Icons
- GitHub Pages

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🔄 Updates and Maintenance

- Regular updates recommended for file organization
- Keep `main.js` file list current
- Test responsiveness when adding new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**CleanslateKickz**
- GitHub: [@CleanslateKickz](https://github.com/CleanslateKickz)
- Created: 2025-04-09
- Last Updated: 2025-04-09 18:11:17 UTC

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- Open an issue for support requests
- Submit feature requests through issues
- Check existing issues before submitting new ones

---
