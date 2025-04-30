"use strict";

let amap;
let countyLayer = null;
let currentSearchMarker = null; // Marker for the search result
let miniMap = null; // Variable to hold the minimap control
let zoomDisplayControl = null; // Variable to hold the zoom display control
let copyModeControl = null; // Variable to hold the copy mode toggle control

// County and State info card elements (defined globally for access across functions)
let countyInfo = null;
let countyNameElement = null;
let taxButton = null;
let gisButton = null;
let stateInfo = null;
let stateNameElement = null;
let sosButton = null;

// Variable to track the state of the right-click copy mode
let rightClickCopyMode = 'coords'; // 'coords' or 'address'

// Helper function to show toast notification
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('active'), 10);

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => {
      if (toast.parentNode) {
        document.body.removeChild(toast);
      }
    }, 300); // Wait for fade out animation
  }, 3000);
}

// Helper function to show loading indicator
function showLoading(message = 'Loading...') {
  const indicator = document.getElementById('loading-indicator');
  const textElement = indicator?.querySelector('.loading-text');
  if (indicator) {
    indicator.style.display = 'flex';
    if (textElement) textElement.textContent = message;
  }
}

// Helper function to hide loading indicator
function hideLoading() {
  const indicator = document.getElementById('loading-indicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
}

// Helper function to generate a Google search URL for a missing GIS URL
function generateGoogleSearchUrl(countyName, stateName) {
  if (!countyName) {
    console.error('Missing county name for Google search URL');
    return 'https://www.google.com/';
  }
  
  // Format the search query with site:.gov and no extra plus signs, exactly as the user wants
  const searchTerm = `site:.gov ${countyName} County ${stateName || ''} Tax Assessor GIS Parcel Owner`;
  
  // Log the exact query for debugging
  console.log('Google search term (unencoded):', searchTerm);
  
  // Encode the search term for use in a URL - this will handle spaces and special characters
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  
  // Construct the final URL
  const googleUrl = `https://www.google.com/search?q=${encodedSearchTerm}`;
  
  // Log the final URL for debugging
  console.log('Google search URL (encoded):', googleUrl);
  
  return googleUrl;
}

// --- Extract county name and state name from GeoJSON properties ---
function extractCountyAndStateNames(properties) {
  // Initialize with empty strings
  let countyName = '';
  let stateName = '';
  
  // Try extracting county name using the known property names
  if (properties.coty_name !== undefined && properties.coty_name !== null) {
    // This is the correct property from the GeoJSON
    countyName = String(properties.coty_name);
    console.log('Found county name from coty_name:', countyName);
  } else if (properties.name !== undefined && properties.name !== null) {
    countyName = String(properties.name);
    console.log('Found county name from name:', countyName);
  } else if (properties.NAME !== undefined && properties.NAME !== null) {
    countyName = String(properties.NAME);
    console.log('Found county name from NAME:', countyName);
  } else if (properties.COUNTY_NAME !== undefined && properties.COUNTY_NAME !== null) {
    countyName = String(properties.COUNTY_NAME);
    console.log('Found county name from COUNTY_NAME:', countyName);
  } else {
    // Log all properties if we can't find a county name to help debug
    console.log('Could not find county name. Available properties:', properties);
  }
  
  // Try extracting state name using the known property names
  if (properties.ste_name !== undefined && properties.ste_name !== null) {
    // This is the correct property from the GeoJSON
    stateName = String(properties.ste_name);
    console.log('Found state name from ste_name:', stateName);
  } else if (properties.state !== undefined && properties.state !== null) {
    stateName = String(properties.state);
    console.log('Found state name from state:', stateName);
  } else if (properties.STATE_NAME !== undefined && properties.STATE_NAME !== null) {
    stateName = String(properties.STATE_NAME);
    console.log('Found state name from STATE_NAME:', stateName);
  } else if (properties.STATE !== undefined && properties.STATE !== null) {
    stateName = String(properties.STATE);
    console.log('Found state name from STATE:', stateName);
  } else {
    // Log all properties if we can't find a state name to help debug
    console.log('Could not find state name. Available properties:', properties);
  }
  
  // Ensure countyName is properly converted to string
  countyName = String(countyName || '').trim();
  
  // Clean up county name - remove " County" suffix if present
  countyName = countyName.replace(/ County$/i, '');
  
  // Special case for Denver which is a city and county
  if (countyName.toUpperCase() === 'DENVER' && 
      stateName.toUpperCase() === 'COLORADO') {
    countyName = 'Denver';
  }
  
  // Ensure stateName is a string
  stateName = String(stateName || '').trim();
  
  return { countyName, stateName };
}

// --- Map Initialization ---
function initializeMap() {
  // Replace the custom CSS styles
  const customStyles = document.createElement('style');
  customStyles.textContent = `
    /* Absolutely hide anything with counties text */
    .counties-label,
    #counties-label,
    .county-toggle-label,
    #county-toggle-label,
    [id*="counties"],
    [class*="counties"],
    .leaflet-control-minimap::before,
    .leaflet-control-minimap::after,
    .leaflet-bottom.leaflet-left::before,
    .leaflet-bottom.leaflet-left::after {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
      position: absolute !important;
      left: -9999px !important;
    }
    
    /* Reset styles */
    .leaflet-control-boundary {
      margin-top: 10px !important;
      clear: both !important;
    }
    
    /* Boundary toggle button styling - match zoom button size */
    .boundary-button {
      width: 26px !important;
      height: 26px !important;
      border-radius: 4px;
      background-color: white;
      border: 1px solid rgba(0,0,0,0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
    }
    
    .boundary-button.active {
      background-color: #f4f4f4;
      color: #0078A8;
    }
    
    /* Style for popup content */
    .coords-popup {
      font-size: 12px;
      text-align: center;
    }
    
    /* Copy mode button style - keep in top right */
    .copy-mode-button {
      position: absolute;
      right: 10px !important;
      bottom: 3px !important;
      padding: 4px 8px;
      background: white;
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 4px;
      font-weight: bold;
      font-size: 12px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4);
      z-index: 1000;
      cursor: pointer;
    }
    
    .copy-mode-button.active {
      background: #f4f4f4;
    }
    
    /* Fix z-index for minimap */
    .leaflet-control-minimap {
      z-index: 900 !important;
      clear: both !important;
    }
    
    /* Clean up the minimap container */
    .leaflet-control-minimap-container {
      position: relative;
      overflow: hidden !important;
    }
    
    /* Completely hide any bottom-left controls except minimap */
    .leaflet-bottom.leaflet-left > *:not(.leaflet-control-minimap),
    .bottom-left-controls-container,
    .county-boundary-control:not(.leaflet-control-boundary),
    .leaflet-control-copy-mode:not(.copy-mode-button) {
      display: none !important;
    }
    
    /* More specific bottom-right corner adjustments */
    .leaflet-bottom.leaflet-right {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-end;
      margin-bottom: 10px !important;
    }
    
    /* Force layer control positioning */
    .leaflet-control-layers {
      margin-bottom: 20px !important;
      clear: both !important;
      display: block !important;
      background: white !important;
      box-shadow: 0 1px 5px rgba(0,0,0,0.4) !important;
      border-radius: 4px !important;
      border: 1px solid rgba(0,0,0,0.2) !important;
    }
    
    /* Fix zoom display positioning */
    .leaflet-control-zoom-display {
      margin-bottom: 130px !important;
      background: white;
      padding: 6px 12px;
      border-radius: 2px;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      clear: both !important;
      display: block !important;
    }
    
    /* Fix attribution control spacing */
    .leaflet-control-attribution {
      position: absolute !important;
      bottom: 0 !important;
      right: 0 !important;
      margin: 0 !important;
      clear: none !important;
      background: rgba(255, 255, 255, 0.7) !important;
      padding: 0 5px !important;
      font-size: 10px !important;
    }
  `;
  document.head.appendChild(customStyles);

  // Define base map layers
  // Use Google Maps layers for main map and minimap
  const streetLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });
  const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });
  const hybridLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });

  // Initialize the map centered on USA
  amap = L.map('map', {
    layers: [hybridLayer], // Start with hybrid layer
    center: [39.8, -98.5], // Center on USA
    zoom: 4, // Initial zoom level for entire USA view
    wheelPxPerZoomLevel: 90, // Adjust mouse wheel zoom speed
    maxZoom: 20,
    zoomSnap: 0.5,
    zoomDelta: 0.5,
    // Disable default context menu so we can use our own right-click handler
    contextmenu: false
  });
  
  // --- Boundary Toggle Control (near zoom controls) ---
  const boundaryControl = L.control({ position: 'topleft' });
  
  boundaryControl.onAdd = function(map) {
    const container = L.DomUtil.create('div', 'leaflet-control-boundary leaflet-bar');
    const button = L.DomUtil.create('a', 'boundary-button', container);
    button.id = 'boundary-toggle';
    button.innerHTML = '🗺️'; // Map emoji
    button.href = '#';
    button.title = 'Toggle county boundaries';
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', 'Toggle county boundaries');
    
    // Add click event for the button
    L.DomEvent.on(button, 'click', function(e) {
      L.DomEvent.stop(e); // Stop propagation
      toggleBoundaryVisibility();
    });
    
    L.DomEvent.disableClickPropagation(container);
    
    return container;
  };
  
  // Add the boundary control to the map
  boundaryControl.addTo(amap);
  
  // --- Copy Mode Button (top right instead of bottom) ---
  const copyModeButton = document.createElement('button');
  copyModeButton.className = 'copy-mode-button';
  copyModeButton.textContent = `Copy: ${rightClickCopyMode === 'coords' ? 'Coords' : 'Address'}`;
  copyModeButton.title = 'Toggle right-click copy mode (Coordinates/Address)';
  document.getElementById('map').appendChild(copyModeButton);
  
  // Add click event for the copy mode button
  copyModeButton.addEventListener('click', function() {
    // Toggle the mode
    rightClickCopyMode = (rightClickCopyMode === 'coords') ? 'address' : 'coords';
    // Update button text
    copyModeButton.textContent = `Copy: ${rightClickCopyMode === 'coords' ? 'Coords' : 'Address'}`;
    showToast(`Right-click copy mode set to: ${rightClickCopyMode === 'coords' ? 'Coordinates' : 'Address'}`, 'info');
  });
  
  // --- Minimap Setup ---
  // Use a duplicate of the main layer for minimap to ensure proper rendering
  const minimapLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { 
    maxZoom: 20, 
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: ''
  });
  
  miniMap = new L.Control.MiniMap(minimapLayer, {
    position: 'bottomleft',
    toggleDisplay: true,
    minimized: true,
    width: 150,
    height: 150,
    zoomLevelOffset: -5,
    zoomAnimation: true,
    aimingRectOptions: { color: '#ff7800', weight: 1, interactive: false },
    shadowRectOptions: { color: '#000', weight: 1, opacity: 0.5, interactive: false },
    autoToggleDisplay: true
  });
  
  // Add the minimap control to the map
  miniMap.addTo(amap);
  
  // --- Zoom Level Display Setup ---
  // Position in bottom-right, above layer controls
  zoomDisplayControl = L.control({ position: 'bottomright' });

  zoomDisplayControl.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'leaflet-control-custom leaflet-control-zoom-display');
    this.update(map.getZoom()); // Set initial zoom level
    // Prevent map interaction clicks/scrolls on this control
    L.DomEvent.disableClickPropagation(this._div);
    L.DomEvent.on(this._div, 'wheel', L.DomEvent.stopPropagation);
    return this._div;
  };

  zoomDisplayControl.update = function(zoom) {
    // Round to 1 decimal place if zoom is not an integer
    const displayZoom = Number.isInteger(zoom) ? zoom : zoom.toFixed(1);
    this._div.innerHTML = `Zoom: <b>${displayZoom}</b>`;
  };

  zoomDisplayControl.addTo(amap);

  // Update zoom display on 'zoomend' event
  amap.on('zoomend', function() {
    if(zoomDisplayControl) zoomDisplayControl.update(amap.getZoom());
  });
  
  // Create a new MutationObserver to watch for and remove unwanted text nodes
  function setupCountiesTextObserver() {
    // Target elements that might contain the unwanted text
    const targetElements = [
      document.getElementById('map'),
      document.querySelector('.leaflet-control-container'),
      document.querySelector('.leaflet-bottom.leaflet-left')
    ];
    
    // Filter out null elements
    const validTargets = targetElements.filter(el => el !== null);
    
    if (validTargets.length === 0) {
      console.warn('No valid targets found for the MutationObserver');
      return;
    }
    
    // Create a new observer
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Check for added nodes
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            
            // Check if it's a text node with "Counties"
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'Counties') {
              console.log('Observer found and removed text node:', node.textContent);
              node.parentNode.removeChild(node);
            }
            
            // Check if it's an element with "Counties" in text content or class/id
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.textContent.trim() === 'Counties' || 
                  (node.id && node.id.includes('counties')) || 
                  (node.className && node.className.includes('counties'))) {
                console.log('Observer found and removed element:', node);
                node.parentNode.removeChild(node);
              }
            }
          }
        }
      });
    });
    
    // Observe each valid target
    const config = { childList: true, subtree: true };
    validTargets.forEach(target => {
      observer.observe(target, config);
    });
    
    console.log('MutationObserver set up to watch for "Counties" text');
    
    // Return the observer so it can be disconnected if needed
    return observer;
  }
  
  // Function to directly remove any "Counties" text node
  function removeCountiesText() {
    // Directly target the map container and search for text nodes
    const containers = [
      document.getElementById('map'),
      document.querySelector('.leaflet-control-container'),
      document.querySelector('.leaflet-bottom.leaflet-left'),
      document.querySelector('.leaflet-control-minimap'),
      document.querySelector('.leaflet-control-minimap-container')
    ];
    
    containers.forEach(container => {
      if (!container) return;
      
      // First check all direct child text nodes
      const childNodes = container.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.TEXT_NODE && 
            childNodes[i].textContent.trim() === 'Counties') {
          console.log('Removing direct text node:', childNodes[i].textContent);
          container.removeChild(childNodes[i]);
          i--; // Adjust for removed node
        }
      }
      
      // Then check for elements that might contain the text
      const elements = container.querySelectorAll('*');
      elements.forEach(el => {
        // Check for direct text content match
        if (el.childNodes) {
          for (let i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === Node.TEXT_NODE && 
                el.childNodes[i].textContent.trim() === 'Counties') {
              console.log('Removing element text node:', el.childNodes[i].textContent);
              el.removeChild(el.childNodes[i]);
              i--; // Adjust for removed node
            }
          }
        }
        
        // Check for class/id with "counties"
        if ((el.id && el.id.toLowerCase().includes('counties')) || 
            (el.className && typeof el.className === 'string' && el.className.toLowerCase().includes('counties'))) {
          console.log('Removing element with counties class/id:', el);
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        }
      });
    });
    
    // Explicitly check the minimap container
    const minimapContainer = document.querySelector('.leaflet-control-minimap');
    if (minimapContainer) {
      // Create an overlay div to cover any text that might be hard to select
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'transparent';
      overlay.style.zIndex = '1000';
      overlay.style.pointerEvents = 'none';
      
      // Append it to the minimap container
      minimapContainer.style.position = 'relative';
      minimapContainer.appendChild(overlay);
    }
  }

  // Function for comprehensive control cleanup
  function cleanupControls() {
    // First run the counties text removal
    removeCountiesText();
    
    // Setup the observer for future changes
    const observer = setupCountiesTextObserver();
    
    // Remove old controls
    const oldControls = document.querySelectorAll('.bottom-left-controls-container, .leaflet-control-container .leaflet-control-copy-mode, .county-toggle-label, #counties-label');
    oldControls.forEach(control => {
      if (control && control.parentNode) {
        console.log('Removing old control:', control);
        control.parentNode.removeChild(control);
      }
    });
    
    // Fix z-index and positioning issues
    const mapControls = [
      document.querySelector('.leaflet-control-layers'),
      document.querySelector('.leaflet-control-zoom-display'),
      document.querySelector('.leaflet-control-attribution')
    ];
    
    mapControls.forEach(control => {
      if (control) {
        control.style.clear = 'both';
        control.style.display = 'block';
      }
    });
    
    return observer;
  }
  
  // Run initial cleanup
  let countyTextObserver;
  
  // Run cleanup after map setup with multiple attempts
  setTimeout(() => {
    countyTextObserver = cleanupControls();
    removeCountiesText();
  }, 200);
  
  setTimeout(() => {
    removeCountiesText();
  }, 1000);
  
  setTimeout(() => {
    removeCountiesText();
  }, 2000);
  
  // Also run cleanup when minimap state changes (expanded/collapsed)
  if (miniMap) {
    const minimapContainer = document.querySelector('.leaflet-control-minimap');
    if (minimapContainer) {
      minimapContainer.addEventListener('click', () => {
        setTimeout(removeCountiesText, 100);
        setTimeout(removeCountiesText, 500);
      });
    }
  }
  
  // Function to toggle boundary visibility
  function toggleBoundaryVisibility() {
    const boundaryButton = document.getElementById('boundary-toggle');
    
    if (countyLayer) {
      if (amap.hasLayer(countyLayer)) {
        amap.removeLayer(countyLayer);
        if (boundaryButton) boundaryButton.classList.remove('active');
      } else {
        amap.addLayer(countyLayer);
        if (boundaryButton) boundaryButton.classList.add('active');
      }
    }
  }
  
  // Layer Controls Setup (map type buttons)
  const layerButtons = { street: document.getElementById('street-layer'), satellite: document.getElementById('satellite-layer'), hybrid: document.getElementById('hybrid-layer') };
  const baseLayers = { street: streetLayer, satellite: satelliteLayer, hybrid: hybridLayer };

  function setActiveLayer(layerName) {
    // Update main map layers
    Object.values(baseLayers).forEach(layer => amap.removeLayer(layer));
    Object.values(layerButtons).forEach(button => button.classList.remove('active'));
    if (baseLayers[layerName]) {
      amap.addLayer(baseLayers[layerName]);
      if (layerButtons[layerName]) {
        layerButtons[layerName].classList.add('active');
      }
    }
    
    // Also update the minimap layer to match if possible
    if (miniMap) {
      const newMinimapLayer = L.tileLayer(baseLayers[layerName]._url, baseLayers[layerName].options);
      miniMap.changeLayer(newMinimapLayer);
    }
  }

  layerButtons.street.addEventListener('click', () => setActiveLayer('street'));
  layerButtons.satellite.addEventListener('click', () => setActiveLayer('satellite'));
  layerButtons.hybrid.addEventListener('click', () => setActiveLayer('hybrid'));

  // Set initial active layer style
  setActiveLayer('hybrid');

  // Also remove any existing state boundary toggle button
  const stateBoundaryToggle = document.getElementById('state-boundary-toggle');
  if (stateBoundaryToggle && stateBoundaryToggle.parentElement) {
    stateBoundaryToggle.parentElement.removeChild(stateBoundaryToggle);
  }

  // County Info Card Setup - get references to elements but keep the function global
  countyInfo = document.getElementById('county-info');
  countyNameElement = document.getElementById('county-name');
  taxButton = document.getElementById('tax-button');
  gisButton = document.getElementById('gis-button');

  // State Info Card Setup
  stateInfo = document.getElementById('state-info');
  stateNameElement = document.getElementById('state-name');
  sosButton = document.getElementById('sos-button');

  // Load county boundaries for all U.S. counties
  showLoading("Loading county boundaries...");
  fetch('https://raw.githubusercontent.com/CleanslateKickz/geojson/main/geojson/US-States-County.geojson')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load county data: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.features || !data.features.length) {
        throw new Error('Invalid or empty county GeoJSON data');
      }

      // Debug: Log the first feature to see the actual property structure
      if (data.features[0]) {
        console.log('First county feature properties sample:', data.features[0].properties);
      }

      countyLayer = L.geoJSON(data, {
        style: { 
          fillColor: 'transparent', 
          weight: 1.5, 
          opacity: 0.8, 
          color: '#1e40af', 
          fillOpacity: 0 
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            // Extract the county and state names from properties using the helper function
            const { countyName, stateName } = extractCountyAndStateNames(feature.properties);
            
            // Debug log
            console.log(`Layer county: ${countyName}, state: ${stateName}`);
            
            // Store county and state info in the layer for later use
            layer.countyName = countyName;
            layer.stateName = stateName;
            
            layer.on('mouseover', (e) => {
              e.target.setStyle({ weight: 3, color: '#0056b3' }); // Darker blue on hover
            });
            
            layer.on('mouseout', (e) => {
              e.target.setStyle({ weight: 1.5, color: '#1e40af' }); // Original blue
            });
            
            layer.on('click', (e) => {
              L.DomEvent.stop(e); // Prevent map click event below
              // Show both county and state info together
              showCountyAndStateInfo(e.target.countyName, e.target.stateName);
            });
          }
        }
      }).addTo(amap);

      // Set the active state on the boundary button since boundaries are showing by default
      const boundaryButton = document.getElementById('boundary-toggle');
      if (boundaryButton) {
        boundaryButton.classList.add('active');
      }

      // Click on map anywhere else hides the county and state info cards
      amap.on('click', (e) => {
        // Only hide the cards if the click was not on a boundary feature or the cards themselves
        if (e.originalEvent.target) {
          let clickedElement = e.originalEvent.target;
          let clickedOnInfoOrLayer = false;

          // Check if click is inside either info card
          if ((countyInfo && countyInfo.contains(clickedElement)) || 
              (stateInfo && stateInfo.contains(clickedElement))) {
            clickedOnInfoOrLayer = true;
          } else {
            // Check if click is on a county boundary layer path
            if (countyLayer && amap.hasLayer(countyLayer)) {
              countyLayer.eachLayer(layer => {
                if (layer._path && (layer._path === clickedElement || layer._path.contains(clickedElement))) {
                  clickedOnInfoOrLayer = true;
                  return false; // Break the loop early
                }
              });
            }
          }

          if (!clickedOnInfoOrLayer) {
            // Hide both cards simultaneously
            if (countyInfo) countyInfo.classList.add('hidden');
            if (stateInfo) stateInfo.classList.add('hidden');
          }
        }
      });

      // Hide loading indicator when done
      hideLoading();
      showToast('County boundaries loaded successfully!', 'success');
    })
    .catch(error => {
      console.error('Error loading county data:', error);
      hideLoading();
      showToast('Error loading county boundaries.', 'error');
    });

  // Address Search Control Setup (Prominent & Central)
  const searchInput = document.getElementById('address-search-input');
  const searchButton = document.getElementById('search-button');

  // Call the search function when button is clicked or Enter key is pressed
  if (searchButton) {
    searchButton.addEventListener('click', performAddressSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        performAddressSearch();
      }
    });

    // Focus the search input on page load
    setTimeout(() => searchInput.focus(), 500);
  }

  // Right-click on map to copy coordinates
  amap.on('contextmenu', onMapRightClick);

  // Disable right-click context menu on map to use our own
  document.getElementById('map').addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Add resize event listener if needed
  window.addEventListener('resize', function() {
    // No additional handling needed now
  });
}

// --- Find county from coordinates ---
function findCountyFromCoordinates(lat, lng) {
  // Make sure the county layer is loaded
  if (!countyLayer) {
    console.warn('County layer not loaded, cannot determine county');
    return null;
  }

  console.log('Checking coordinates for county:', lat, lng);
  let foundCounty = null;
  const point = L.latLng(lat, lng);

  // Check each county polygon to see if it contains the point
  countyLayer.eachLayer(function(layer) {
    if (layer.getBounds && layer.getBounds().contains(point)) {
      console.log('Found county layer containing point:', { 
        countyName: layer.countyName, 
        stateName: layer.stateName 
      });
      
      foundCounty = {
        countyName: layer.countyName, 
        stateName: layer.stateName
      };
      
      // Show both county and state info when we find a match
      if (foundCounty.countyName && foundCounty.stateName) {
        showCountyAndStateInfo(foundCounty.countyName, foundCounty.stateName);
      }
      
      return false; // Stop iteration
    }
  });

  // If we still don't have a county, try falling back to the point bounds check
  if (!foundCounty) {
    console.log('No exact county match, trying spatial query...');
    
    // Find the closest county by checking distance
    let closestDistance = Infinity;
    let closestCounty = null;
    
    countyLayer.eachLayer(function(layer) {
      if (layer.getBounds) {
        const layerCenter = layer.getBounds().getCenter();
        const distance = point.distanceTo(layerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCounty = {
            countyName: layer.countyName,
            stateName: layer.stateName,
            distance: distance
          };
        }
      }
    });
    
    if (closestCounty && closestDistance < 50000) { // within 50km
      console.log('Found closest county:', closestCounty);
      foundCounty = {
        countyName: closestCounty.countyName,
        stateName: closestCounty.stateName
      };
      
      // Show both county and state info for the closest county
      if (foundCounty.countyName && foundCounty.stateName) {
        showCountyAndStateInfo(foundCounty.countyName, foundCounty.stateName);
      }
    }
  }

  return foundCounty;
}

// Try to extract county and state from a geocoded address
function extractCountyStateFromAddress(addressString) {
  console.log('Trying to extract county and state from address:', addressString);
  
  if (!addressString) return null;
  
  // Common patterns for address formats
  // Note: this is a simple implementation and might need refinement
  const statePattern = /\b([A-Z]{2})\b/; // Matches two-letter state abbreviations
  const countyPattern = /\b([A-Za-z]+)\s+County\b/; // Matches "X County"
  
  // Try to find the state
  const stateMatch = addressString.match(statePattern);
  let state = stateMatch ? stateMatch[1] : null;
  
  // Try to find the county
  const countyMatch = addressString.match(countyPattern);
  let county = countyMatch ? countyMatch[1] : null;
  
  if (county || state) {
    console.log('Extracted from address:', { county, state });
    return { countyName: county, stateName: state };
  }
  
  return null;
}

// --- Address Search Function ---
function performAddressSearch() {
  // Get address from input
  const addressInput = document.getElementById('address-search-input');
  if (!addressInput) {
    console.error('Address input element not found');
    return;
  }
  
  const address = addressInput.value.trim();
  if (!address) {
    showToast('Please enter an address to search', 'warning');
    return;
  }

  // Show loading indicator
  showLoading('Searching for address...');
  
  // Clear previous marker if exists
  if (currentSearchMarker) {
    amap.removeLayer(currentSearchMarker);
    currentSearchMarker = null;
  }
  
  // First try with Nominatim (OpenStreetMap)
  console.log('Attempting Nominatim geocoding for:', address);
  
  // Include a valid user agent with app name
  const headers = new Headers({
    'User-Agent': 'NationalPropertyMap/1.0'
  });

  // Add a cache-busting parameter to avoid caching issues
  const timestamp = new Date().getTime();
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&addressdetails=1&limit=1&_=${timestamp}`;
  
  fetch(nominatimUrl, { headers, mode: 'cors' })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && data.length > 0) {
        const result = data[0];
        handleGeocodeResult(result, 'nominatim');
      } else {
        // No results from Nominatim, try Census
        throw new Error('No results found with Nominatim');
      }
    })
    .catch(nominatimError => {
      console.error('Nominatim geocoding error:', nominatimError);
      
      // Nominatim failed, try US Census Geocoder as a fallback
      console.log('Nominatim failed. Attempting US Census Geocoding for:', address);
      const censusUrl = `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${encodeURIComponent(address)}&benchmark=Public_AR_Current&format=json`;

      fetch(censusUrl)
        .then(censusResponse => {
          if (!censusResponse.ok) {
            throw new Error(`Census API error: ${censusResponse.status}`);
          }
          return censusResponse.json();
        })
        .then(censusData => {
          if (censusData && censusData.result && censusData.result.addressMatches && censusData.result.addressMatches.length > 0) {
            // Use the first match from Census
            const censusResult = censusData.result.addressMatches[0];
            handleGeocodeResult(censusResult, 'census');
          } else {
            // Both Nominatim and Census failed or returned no results
            throw new Error('No results found with Census Geocoder either.');
          }
        })
        .catch(censusError => {
          console.error('Census geocoding error:', censusError);
          showToast('Error searching for address with both providers. Please try again.', 'error');
          hideLoading();

          // Final fallback: Offer Google Maps search
          const googleSearchUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
          const toast = document.createElement('div');
          toast.className = 'toast-notification warning';
          toast.innerHTML = `
            Address search failed. <a href="${googleSearchUrl}" target="_blank" style="color:white;text-decoration:underline;">Try on Google Maps</a>
          `;
          document.body.appendChild(toast);
          
          setTimeout(() => toast.classList.add('active'), 100);
          setTimeout(() => {
            toast.classList.remove('active');
            setTimeout(() => {
              if (toast.parentNode) document.body.removeChild(toast);
            }, 300);
          }, 8000);
        });
    });
}

// --- Right-Click Coordinates Function ---
function onMapRightClick(e) {
  const lat = e.latlng.lat.toFixed(6);
  const lng = e.latlng.lng.toFixed(6);
  
  if (rightClickCopyMode === 'coords') {
    // Copy coordinates to clipboard
    const coordsText = `${lat}, ${lng}`;
    navigator.clipboard.writeText(coordsText)
      .then(() => {
        // Create a small popup to confirm the copy
        L.popup({
          className: 'coords-popup',
          offset: [0, -5],
          closeButton: false,
          autoClose: true,
          closeOnEscapeKey: true,
          closeOnClick: true,
          autoPan: false,
          autoClose: 2000, // Auto close after 2 seconds
        })
        .setLatLng(e.latlng)
        .setContent(`<b>Coordinates copied:</b><br>${coordsText}`)
        .openOn(amap);
      })
      .catch(err => {
        console.error('Error copying coordinates:', err);
        // Show error popup
        L.popup({
          className: 'coords-popup error',
          offset: [0, -5],
          closeButton: true,
          autoClose: true,
          closeOnEscapeKey: true,
          closeOnClick: true,
          autoPan: false,
        })
        .setLatLng(e.latlng)
        .setContent(`<b>Error copying coordinates</b><br>Please try again`)
        .openOn(amap);
      });
  } else if (rightClickCopyMode === 'address') {
    // Show loading popup
    const loadingPopup = L.popup({ 
      className: 'coords-popup',
      offset: [0, -5],
      closeButton: false,
      closeOnEscapeKey: false,
      closeOnClick: false,
      autoPan: false,
    })
    .setLatLng(e.latlng)
    .setContent(`<b>Looking up address...</b>`)
    .openOn(amap);
    
    // Convert coordinates to address using Nominatim reverse geocoding
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    
    fetch(geocodingUrl, {
      headers: {
        'User-Agent': 'Property Lookup Map Application'
      }
    })
    .then(response => response.json())
    .then(data => {
      amap.closePopup(loadingPopup);
      
      if (!data || data.error) {
        throw new Error(data.error || 'Address lookup failed');
      }
      
      const address = data.display_name;
      
      // Copy address to clipboard
      navigator.clipboard.writeText(address)
        .then(() => {
          // Create a popup to confirm the copy
          L.popup({
            className: 'coords-popup',
            offset: [0, -5],
            closeButton: true,
            closeOnEscapeKey: true,
            closeOnClick: true,
            autoPan: false,
          })
          .setLatLng(e.latlng)
          .setContent(`<b>Address copied:</b><br>${address}`)
          .openOn(amap);
        })
        .catch(err => {
          console.error('Error copying address:', err);
          throw new Error('Failed to copy address');
        });
    })
    .catch(error => {
      amap.closePopup(loadingPopup);
      console.error('Error looking up address:', error);
      
      // Show error popup
      L.popup({
        className: 'coords-popup error',
        offset: [0, -5],
        closeButton: true,
        autoClose: true,
        closeOnEscapeKey: true,
        closeOnClick: true,
        autoPan: false,
      })
      .setLatLng(e.latlng)
      .setContent(`<b>Error looking up address</b><br>Please try again`)
      .openOn(amap);
    });
  }
}

// Helper function to handle geocode results from any provider
function handleGeocodeResult(result, provider) {
  hideLoading();
  
  let lat, lon, displayName;

  if (provider === 'nominatim') {
    // Handle Nominatim result
    if (!result || !result.lat || !result.lon) {
      console.error('Invalid Nominatim result:', result);
      showToast('Could not determine location from Nominatim result.', 'error');
      return;
    }
    lat = parseFloat(result.lat);
    lon = parseFloat(result.lon);
    displayName = result.display_name || 'Address Found';
    
    console.log('Nominatim result:', result);

  } else if (provider === 'census') {
    // Handle US Census Geocoder result
    if (!result || !result.coordinates || !result.coordinates.y || !result.coordinates.x) {
      console.error('Invalid Census result:', result);
      showToast('Could not determine location from Census result.', 'error');
      return;
    }
    lat = parseFloat(result.coordinates.y); // Latitude is y
    lon = parseFloat(result.coordinates.x); // Longitude is x
    displayName = result.matchedAddress || 'Address Found';
    
    console.log('Census result:', result);

  } else {
    console.error('Unknown geocoding provider:', provider);
    showToast('Internal error processing geocode result.', 'error');
    return;
  }

  // Check if lat/lon are valid numbers
  if (isNaN(lat) || isNaN(lon)) {
    console.error('Invalid coordinates after parsing:', { lat, lon });
    showToast('Failed to parse coordinates from geocoder.', 'error');
    return;
  }

  // Center map on the result
  amap.setView([lat, lon], 15); // Zoom to a reasonable level

  // Add a marker at the location
  currentSearchMarker = L.marker([lat, lon]).addTo(amap);
  
  // Add a popup to the marker
  currentSearchMarker.bindPopup(`<b>${displayName}</b><br>Lat: ${lat.toFixed(5)}, Lon: ${lon.toFixed(5)}`).openPopup();
  
  // Show success toast
  showToast('Address found and map centered.', 'success');
}

// New function to show both county and state info together
function showCountyAndStateInfo(countyName, stateName) {
  // Don't proceed if we don't have either a county or state name
  if (!countyName && !stateName) {
    console.error('Missing both county and state names');
    return;
  }

  // First show the county info if we have a county name
  if (countyName) {
    showCountyInfo(countyName, stateName);
  }
  
  // Then show the state info, but don't let it hide the county info
  if (stateInfo && stateNameElement && sosButton && stateName) {
    const formattedStateName = stateName.toUpperCase();
    stateNameElement.textContent = formattedStateName;

    // Try to get state URL if stateUrls is defined
    let stateUrl = { sosUrl: '' };
    if (typeof stateUrls !== 'undefined' && stateUrls[formattedStateName]) {
      stateUrl = stateUrls[formattedStateName];
    }

    // Configure the SOS button
    sosButton.href = stateUrl.sosUrl || '#';
    sosButton.classList.toggle('disabled', !stateUrl.sosUrl);
    sosButton.title = stateUrl.sosUrl ? 
      `Open Secretary of State for ${formattedStateName}` : 
      'No Secretary of State URL available';

    // Show the state info card
    stateInfo.classList.remove('hidden');
    
    // Position the state info card below the county info card
    if (countyInfo && !countyInfo.classList.contains('hidden')) {
      // Apply CSS to position state info card appropriately
      // This assumes your county and state info cards are positioned with absolute positioning
      // The exact positioning may need to be adjusted based on your CSS
      const countyHeight = countyInfo.offsetHeight;
      if (countyHeight > 0) {
        // Add a margin to create space between cards
        stateInfo.style.top = (countyInfo.offsetTop + countyHeight + 10) + 'px';
      }
    }
  }
}

// Modify the showCountyInfo function to not hide state info card
function showCountyInfo(countyName, stateName) {
  if (!countyInfo || !countyNameElement || !taxButton || !gisButton) {
    console.error('County info elements not initialized');
    return;
  }

  console.log('Showing county info for:', { countyName, stateName });
  
  // Validate inputs - if either is missing, we can't proceed properly
  if (!countyName) {
    console.error('Missing county name');
    countyNameElement.textContent = 'County Information';
    return;
  }

  // Format county name to match the keys in countyUrls object
  // We need to ensure it's all uppercase for consistent lookup
  const formattedCountyName = countyName.toUpperCase().trim();
  console.log(`Showing county info for: ${countyName}, ${stateName} (formatted: ${formattedCountyName})`);
  
  // Set the county name in the display
  countyNameElement.textContent = countyName + ' County';

  // Debug: Check if countyUrls is defined and what type it is
  console.log('County URLs object type:', typeof countyUrls);
  console.log('County URLs variable exists:', typeof countyUrls !== 'undefined');
  
  if (typeof countyUrls !== 'undefined') {
    console.log('Available county keys:', Object.keys(countyUrls).length);
    console.log('Looking up county key:', formattedCountyName);
    console.log('County exists in data:', countyUrls.hasOwnProperty(formattedCountyName));
  }

  // Check if countyUrls is defined and look up the URLs
  let urls = { taxUrl: '', gisUrl: '' };
  
  if (typeof countyUrls !== 'undefined') {
    if (countyUrls[formattedCountyName]) {
      urls = countyUrls[formattedCountyName];
      console.log(`Found URLs for ${formattedCountyName}:`, urls);
    } else {
      console.log(`No URLs found for ${formattedCountyName} in county data`);
      
      // Try to find case-insensitive match if exact match fails
      const matchingKey = Object.keys(countyUrls).find(
        key => key.toUpperCase() === formattedCountyName
      );
      
      if (matchingKey) {
        urls = countyUrls[matchingKey];
        console.log(`Found URLs with case-insensitive match for ${matchingKey}:`, urls);
      }
    }
  } else {
    console.warn('countyUrls is not defined');
  }

  // Set up the Tax button
  taxButton.href = urls.taxUrl || '#';
  taxButton.classList.toggle('disabled', !urls.taxUrl);
  taxButton.title = urls.taxUrl ? `Open Tax Records for ${countyName} County` : 'No Tax Records URL available';

  // Always generate a Google search URL as fallback for GIS
  // This ensures we have a GIS URL even if it's not in our database
  const googleSearchUrl = generateGoogleSearchUrl(countyName, stateName);
  console.log('Generated Google search URL:', googleSearchUrl);
  
  // Use the GIS URL from our database if available, otherwise use the Google search URL
  const finalGisUrl = urls.gisUrl || googleSearchUrl;
  console.log(`Using GIS URL for ${countyName}:`, finalGisUrl);
  
  gisButton.href = finalGisUrl;
  gisButton.classList.remove('disabled'); // Always enable since we have at least the Google search fallback
  gisButton.title = urls.gisUrl 
    ? `Open GIS Map for ${countyName} County` 
    : `Search for ${countyName} County GIS information`;

  // Show the county info card (but don't hide state info)
  countyInfo.classList.remove('hidden');
}

// Keep the showStateInfo function for compatibility, but modify it to not hide county info
function showStateInfo(stateName) {
  showCountyAndStateInfo('', stateName); // Just show state info with empty county name
}

// Initialize Map When DOM is Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Delay to avoid white flash
  setTimeout(() => {
    initializeMap();
    hideLoading();
  }, 100);
});