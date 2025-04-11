document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'CleanslateKickz';
    const repoName = 'geojson';

    // Function to fetch GeoJSON files from the repository
    async function fetchGeoJSONFiles() {
        const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;

        try {
            const response = await fetch(apiUrl);
            const files = await response.json();

            // Filter GeoJSON files
            const geojsonFiles = files.filter(file => file.name.endsWith('.geojson'));
            return geojsonFiles;
        } catch (error) {
            console.error('Error fetching GeoJSON files:', error);
            return [];
        }
    }

    // Function to render recent files
    async function renderRecentFiles() {
        const recentFilesList = document.getElementById('recentFiles');
        recentFilesList.innerHTML = ''; // Clear existing content

        const geojsonFiles = await fetchGeoJSONFiles();

        geojsonFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'file-item';

            const rawFileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${file.name}`;

            fileElement.innerHTML = `
                <i class="fas fa-file-code"></i>
                <div class="file-info">
                    <strong>${file.name}</strong>
                </div>
                <button class="copy-button" data-url="${rawFileUrl}">
                    <i class="fas fa-copy"></i> Copy URL
                </button>
            `;

            recentFilesList.appendChild(fileElement);
        });

        // Add event listeners to copy buttons
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const url = event.target.dataset.url || event.target.parentNode.dataset.url;
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert('URL copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy URL: ', err);
                        alert('Failed to copy URL. Please try again.');
                    });
            });
        });
    }

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

    // Initial rendering of recent files
    renderRecentFiles();

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add your search logic here
    });
});
