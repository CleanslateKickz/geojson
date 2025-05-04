document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'CleanslateKickz';
    const repoName = 'geojson';
    
    // Configure NProgress
    NProgress.configure({ showSpinner: false });

    // Initialize repository information
    async function initializeRepo() {
        NProgress.start();
        try {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
            const repoData = await response.json();
            
            // Update repository stats
            document.querySelector('#repoStars span').textContent = repoData.stargazers_count;
            document.querySelector('#repoForks span').textContent = repoData.forks_count;
            document.querySelector('#lastUpdate span').textContent = 
                new Date(repoData.updated_at).toLocaleDateString();
        } catch (error) {
            console.error('Error fetching repo data:', error);
            document.querySelector('#apiStatus').innerHTML = 
                '<i class="fas fa-circle" style="color: #dc3545;"></i> API Status: Error';
        }
        NProgress.done();
    }

    // Widget handling
    function initializeWidgets() {
        const widgetModal = document.getElementById('widgetModal');
        const widgetFrame = document.getElementById('widgetFrame');
        const widgetTitle = document.getElementById('widgetTitle');
        const closeButtons = document.querySelectorAll('.close-modal');

        // Launch widget buttons
        document.querySelectorAll('.launch-widget').forEach(button => {
            button.addEventListener('click', function() {
                const widgetCard = this.closest('.widget-card');
                const widgetFile = widgetCard.dataset.widget;
                const widgetName = widgetCard.querySelector('h3').textContent;
                
                // Set the widget title
                widgetTitle.textContent = widgetName;
                
                // Load the widget in the iframe
                widgetFrame.src = `Widgets/${widgetFile}`;
                
                // Show the modal
                widgetModal.style.display = 'block';
            });
        });

        // Close modal functionality
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.widget-modal, .preview-modal');
                if (modal) {
                    modal.style.display = 'none';
                    if (modal.id === 'widgetModal') {
                        widgetFrame.src = 'about:blank';
                    }
                }
            });
        });

        // Click outside to close
        window.addEventListener('click', function(event) {
            if (event.target === widgetModal) {
                widgetModal.style.display = 'none';
                widgetFrame.src = 'about:blank';
            }
        });
    }

    // Search and filter functionality
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const contentTypeFilter = document.getElementById('contentTypeFilter');
        
        function filterContent() {
            const searchTerm = searchInput.value.toLowerCase();
            const contentType = contentTypeFilter.value;
            
            // Filter widgets
            document.querySelectorAll('.widget-card').forEach(widget => {
                const title = widget.querySelector('h3').textContent.toLowerCase();
                const description = widget.querySelector('p').textContent.toLowerCase();
                const isMatchingSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const isMatchingType = contentType === 'all' || contentType === 'widgets';
                
                widget.style.display = isMatchingSearch && isMatchingType ? 'block' : 'none';
            });
            
            // Filter files
            document.querySelectorAll('.file-item').forEach(file => {
                const fileName = file.querySelector('.file-info strong').textContent.toLowerCase();
                const isMatchingSearch = fileName.includes(searchTerm);
                const isMatchingType = contentType === 'all' || 
                                     (contentType === 'geojson' && fileName.endsWith('.geojson'));
                
                file.style.display = isMatchingSearch && isMatchingType ? 'flex' : 'none';
            });
        }
        
        searchInput.addEventListener('input', filterContent);
        contentTypeFilter.addEventListener('change', filterContent);
    }

    // Keep your existing functions (fetchFiles, fetchGeoJSONFiles, renderRecentFiles)

    // Example implementation for listing GeoJSON files in the repo root
async function fetchGeoJSONFiles() {
    const url = "https://api.github.com/repos/CleanslateKickz/geojson/contents/";
    const response = await fetch(url);
    const files = await response.json();
    // Only keep .geojson files
    return files.filter(file => file.name.endsWith('.geojson'));
}

async function renderRecentFiles() {
    NProgress.start();
    const recentFilesContainer = document.getElementById('recentFiles');
    recentFilesContainer.innerHTML = '<div class="loading-placeholder">Loading repository contents...</div>';
    try {
        const files = await fetchGeoJSONFiles();
        if (files.length === 0) {
            recentFilesContainer.innerHTML = '<div>No GeoJSON files found in the repository.</div>';
            return;
        }
        recentFilesContainer.innerHTML = '';
        files.forEach(file => {
            const el = document.createElement('div');
            el.className = 'file-item';
            el.innerHTML = `
                <div class="file-info">
                    <strong>${file.name}</strong>
                    <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <div class="file-actions">
                    <a href="${file.download_url}" target="_blank" class="btn-preview">Download</a>
                    <button class="btn-preview" data-url="${file.download_url}">Preview</button>
                </div>
            `;
            recentFilesContainer.appendChild(el);
        });
        // Add preview modal behavior
        document.querySelectorAll('.btn-preview').forEach(btn => {
            btn.addEventListener('click', function() {
                const url = this.dataset.url;
                if (url) {
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            document.getElementById('previewContent').textContent = JSON.stringify(data, null, 2);
                            document.getElementById('previewModal').style.display = 'block';
                        })
                        .catch(err => {
                            document.getElementById('previewContent').textContent = 'Error loading file: ' + err;
                            document.getElementById('previewModal').style.display = 'block';
                        });
                }
            });
        });
    } catch (err) {
        recentFilesContainer.innerHTML = '<div>Error loading files.</div>';
    }
    NProgress.done();
}

    // Initialize everything
    initializeRepo();
    initializeWidgets();
    initializeSearch();
    renderRecentFiles();

    // Categories remain the same
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
});
