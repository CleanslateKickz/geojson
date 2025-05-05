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

    // Widget handling remains the same
    function initializeWidgets() {
        const widgetModal = document.getElementById('widgetModal');
        const widgetFrame = document.getElementById('widgetFrame');
        const widgetTitle = document.getElementById('widgetTitle');
        const closeButtons = document.querySelectorAll('.close-modal');

        document.querySelectorAll('.launch-widget').forEach(button => {
            button.addEventListener('click', function() {
                const widgetCard = this.closest('.widget-card');
                const widgetFile = widgetCard.dataset.widget;
                const widgetName = widgetCard.querySelector('h3').textContent;
                
                widgetTitle.textContent = widgetName;
                widgetFrame.src = `Widgets/${widgetFile}`;
                widgetModal.style.display = 'block';
            });
        });

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

        window.addEventListener('click', function(event) {
            if (event.target === widgetModal) {
                widgetModal.style.display = 'none';
                widgetFrame.src = 'about:blank';
            }
        });
    }

    // Search functionality remains the same
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        const contentTypeFilter = document.getElementById('contentTypeFilter');
        
        function filterContent() {
            const searchTerm = searchInput.value.toLowerCase();
            const contentType = contentTypeFilter.value;
            
            document.querySelectorAll('.widget-card').forEach(widget => {
                const title = widget.querySelector('h3').textContent.toLowerCase();
                const description = widget.querySelector('p').textContent.toLowerCase();
                const isMatchingSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const isMatchingType = contentType === 'all' || contentType === 'widgets';
                
                widget.style.display = isMatchingSearch && isMatchingType ? 'block' : 'none';
            });
            
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

    // Updated GeoJSON file fetching function
    async function fetchGeoJSONFiles() {
        try {
            const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;
            const headers = {
                'Accept': 'application/vnd.github.v3+json'
            };
            
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const files = await response.json();
            // Filter for .geojson files and return relevant information
            return files.filter(file => 
                file.name.toLowerCase().endsWith('.geojson')
            ).map(file => ({
                name: file.name,
                size: file.size,
                download_url: file.download_url,
                html_url: file.html_url
            }));
        } catch (error) {
            console.error('Error fetching GeoJSON files:', error);
            throw error;
        }
    }

    // Updated rendering function with better error handling and preview functionality
    async function renderRecentFiles() {
        NProgress.start();
        const recentFilesContainer = document.getElementById('recentFiles');
        recentFilesContainer.innerHTML = '<div class="loading-placeholder">Loading repository contents...</div>';
        
        try {
            const files = await fetchGeoJSONFiles();
            
            if (files.length === 0) {
                recentFilesContainer.innerHTML = '<div class="no-files">No GeoJSON files found in the repository.</div>';
                return;
            }

            recentFilesContainer.innerHTML = '';
            files.forEach(file => {
                const fileSize = file.size < 1024 ? 
                    `${file.size} B` : 
                    `${(file.size / 1024).toFixed(1)} KB`;

                const el = document.createElement('div');
                el.className = 'file-item';
                el.innerHTML = `
                    <div class="file-info">
                        <strong>${file.name}</strong>
                        <span class="file-size">${fileSize}</span>
                    </div>
                    <div class="file-actions">
                        <a href="${file.download_url}" class="btn-download" download="${file.name}">
                            <i class="fas fa-download"></i> Download
                        </a>
                        <button class="btn-preview" data-url="${file.download_url}">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    </div>
                `;
                recentFilesContainer.appendChild(el);
            });

            // Add preview functionality
            document.querySelectorAll('.btn-preview').forEach(btn => {
                btn.addEventListener('click', async function() {
                    const url = this.dataset.url;
                    const previewModal = document.getElementById('previewModal');
                    const previewContent = document.getElementById('previewContent');
                    
                    if (!url) return;

                    try {
                        previewContent.innerHTML = '<div class="loading-placeholder">Loading preview...</div>';
                        previewModal.style.display = 'block';
                        
                        const response = await fetch(url);
                        if (!response.ok) throw new Error('Failed to load file');
                        
                        const data = await response.json();
                        previewContent.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                    } catch (err) {
                        previewContent.innerHTML = `<div class="error">Error loading preview: ${err.message}</div>`;
                    }
                });
            });

            // Close preview modal when clicking outside
            const previewModal = document.getElementById('previewModal');
            window.addEventListener('click', function(event) {
                if (event.target === previewModal) {
                    previewModal.style.display = 'none';
                }
            });

        } catch (err) {
            recentFilesContainer.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-circle"></i>
                    Error loading files: ${err.message}
                </div>
            `;
        }
        NProgress.done();
    }

    // Initialize everything
    initializeRepo();
    initializeWidgets();
    initializeSearch();
    renderRecentFiles();

    // Categories section remains the same
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
