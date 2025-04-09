document.addEventListener('DOMContentLoaded', function() {
    // Sample categories - you can modify these based on your needs
    const categories = [
        {
            name: 'Administrative Boundaries',
            description: 'Country, state, and city boundaries',
            icon: 'fa-earth-americas'
        },
        {
            name: 'Transportation',
            description: 'Roads, railways, and transit routes',
            icon: 'fa-road'
        },
        {
            name: 'Natural Features',
            description: 'Rivers, lakes, and terrain',
            icon: 'fa-tree'
        },
        {
            name: 'Points of Interest',
            description: 'Landmarks and important locations',
            icon: 'fa-location-dot'
        }
    ];

    // Sample recent files - you can modify these based on your needs
    const recentFiles = [
        {
            name: 'us-states.geojson',
            date: '2025-04-09',
            size: '2.3 MB'
        },
        {
            name: 'major-rivers.geojson',
            date: '2025-04-08',
            size: '1.8 MB'
        },
        {
            name: 'city-points.geojson',
            date: '2025-04-07',
            size: '956 KB'
        }
    ];

    // Render categories
    const categoryGrid = document.getElementById('categoryGrid');
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-card';
        categoryElement.innerHTML = `
            <h3><i class="fas ${category.icon}"></i> ${category.name}</h3>
            <p>${category.description}</p>
        `;
        categoryGrid.appendChild(categoryElement);
    });

    // Render recent files
    const recentFilesList = document.getElementById('recentFiles');
    recentFiles.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-item';
        fileElement.innerHTML = `
            <i class="fas fa-file-code"></i>
            <div class="file-info">
                <strong>${file.name}</strong>
                <span>${file.date} - ${file.size}</span>
            </div>
        `;
        recentFilesList.appendChild(fileElement);
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add your search logic here
    });
});
