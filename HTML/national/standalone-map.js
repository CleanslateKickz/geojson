"use strict";

let amap;
let countyLayer = null;
let searchResultMarker = null; // Marker for the search result

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


// --- Map Initialization ---
function initializeMap() {
  // Define base map layers
  const streetLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });
  const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });
  const hybridLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', { maxZoom: 20, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], attribution: '' });

  // Initialize the map centered on the PNW region
  amap = L.map('map', {
    layers: [hybridLayer], // Start with hybrid layer
    center: [44.0, -120.5], // Center around Oregon/Idaho/Washington border region
    zoom: 7, // Initial zoom level
    wheelPxPerZoomLevel: 90, // Adjust mouse wheel zoom speed
    maxZoom: 20,
    zoomSnap: 0.5,
    zoomDelta: 0.5
  });

  // Layer Controls Setup
  const layerButtons = { street: document.getElementById('street-layer'), satellite: document.getElementById('satellite-layer'), hybrid: document.getElementById('hybrid-layer') };
  const baseLayers = { street: streetLayer, satellite: satelliteLayer, hybrid: hybridLayer };

  function setActiveLayer(layerName) {
    Object.values(baseLayers).forEach(layer => amap.removeLayer(layer));
    Object.values(layerButtons).forEach(button => button.classList.remove('active'));
    if (baseLayers[layerName]) {
      amap.addLayer(baseLayers[layerName]);
      if (layerButtons[layerName]) {
        layerButtons[layerName].classList.add('active');
      }
    }
  }

  layerButtons.street.addEventListener('click', () => setActiveLayer('street'));
  layerButtons.satellite.addEventListener('click', () => setActiveLayer('satellite'));
  layerButtons.hybrid.addEventListener('click', () => setActiveLayer('hybrid'));

  // Set initial active layer style
  setActiveLayer('hybrid');


  // County Info Card Setup
  const countyInfo = document.getElementById('county-info');
  const countyNameElement = document.getElementById('county-name');
  const taxButton = document.getElementById('tax-button');
  const gisButton = document.getElementById('gis-button');

  // showCountyInfo populates and shows the fixed card
  function showCountyInfo(countyName) {
    if (!countyInfo || !countyNameElement || !taxButton || !gisButton) return;

    const formattedCountyName = countyName.toUpperCase(); // Ensure lookup uses uppercase
    countyNameElement.textContent = formattedCountyName + ' County';

    const urls = typeof countyUrls !== 'undefined' && countyUrls[formattedCountyName] ? countyUrls[formattedCountyName] : { taxUrl: '', gisUrl: '' };

    taxButton.href = urls.taxUrl || '#';
    taxButton.classList.toggle('disabled', !urls.taxUrl);
    taxButton.title = urls.taxUrl ? `Open Tax Records for ${formattedCountyName} County` : 'No Tax Records URL available';

    gisButton.href = urls.gisUrl || '#';
    gisButton.classList.toggle('disabled', !urls.gisUrl);
    gisButton.title = urls.gisUrl ? `Open GIS Map for ${formattedCountyName} County` : 'No GIS URL available';

    countyInfo.classList.remove('hidden');
  }

  // Load county boundaries for Oregon, California, and Idaho
  showLoading("Loading county boundaries...");
  Promise.all([
    fetch('https://services1.arcgis.com/KbxwQRRfWyEYLgp4/arcgis/rest/services/BLM_OR_County_Boundaries_Polygon_Hub/FeatureServer/1/query?outFields=COUNTY_NAME&where=1%3D1&f=geojson'), // Oregon
    fetch('https://gis.water.ca.gov/arcgis/rest/services/Boundaries/i03_CaliforniaCounties/FeatureServer/0/query?outFields=COUNTY_NAME&where=1%3D1&f=geojson'), // California
    fetch('https://services1.arcgis.com/3Q1c8zPZkOnyhrAo/arcgis/rest/services/IPNF_Central_Zone_Stands_Over_250_WFL1/FeatureServer/10/query?outFields=NAME&where=1%3D1&f=geojson') // Idaho
  ])
  .then(responses => {
      return Promise.all(
          responses.map(async (response, index) => {
              if (!response.ok) {
                  console.warn(`Failed to load county data for source #${index + 1}: ${response.status} ${response.statusText}`);
                  return { type: 'FeatureCollection', features: [] };
              }
              try {
                  return await response.json();
              } catch (error) {
                  console.warn(`Error parsing county data for source #${index + 1}:`, error);
                  return { type: 'FeatureCollection', features: [] };
              }
          })
      );
  })
  .then(dataArray => {
      let combinedFeatures = [];

      // Process Oregon (COUNTY_NAME)
      if (dataArray[0] && dataArray[0].features) {
          combinedFeatures = combinedFeatures.concat(dataArray[0].features.filter(f => f.properties?.COUNTY_NAME));
      }
      // Process California (COUNTY_NAME)
      if (dataArray[1] && dataArray[1].features) {
          combinedFeatures = combinedFeatures.concat(dataArray[1].features.filter(f => f.properties?.COUNTY_NAME));
      }
      // Process Idaho (NAME needs renaming to COUNTY_NAME)
      if (dataArray[2] && dataArray[2].features) {
          const idFeatures = dataArray[2].features.map(feature => {
              if (feature.properties && feature.properties.NAME) {
                  feature.properties.COUNTY_NAME = feature.properties.NAME;
              }
              return feature;
          }).filter(feature => feature.properties?.COUNTY_NAME); // Filter out features without a county name
          combinedFeatures = combinedFeatures.concat(idFeatures);
      }

      const combinedData = { type: 'FeatureCollection', features: combinedFeatures };

      countyLayer = L.geoJSON(combinedData, {
          style: { fillColor: 'transparent', weight: 1.5, opacity: 0.8, color: '#1e40af', fillOpacity: 0 }, // Blue border
          onEachFeature: (feature, layer) => {
              if (feature.properties?.COUNTY_NAME) {
                  const countyName = feature.properties.COUNTY_NAME;
                  layer.on('mouseover', (e) => {
                      e.target.setStyle({ weight: 3, color: '#0056b3' }); // Darker blue on hover
                  });
                  layer.on('mouseout', (e) => {
                       e.target.setStyle({ weight: 1.5, color: '#1e40af' }); // Original blue
                  });
                  layer.on('click', (e) => {
                      L.DomEvent.stop(e); // Prevent map click event below
                      showCountyInfo(countyName); // Show fixed info card
                  });
              }
          }
      }).addTo(amap);

      // Click on map anywhere else hides the county info card
      amap.on('click', (e) => {
          // Check if the click was on a county feature path or the county info card itself
           if (e.originalEvent.target && countyInfo && !countyInfo.classList.contains('hidden')) {
               let clickedElement = e.originalEvent.target;
               let clickedOnCountyOrCard = false;

               // Check if click is inside the county info card
               if (countyInfo.contains(clickedElement)) {
                   clickedOnCountyOrCard = true;
               } else if (countyLayer) {
                   // Check if click is on a county boundary layer path
                    countyLayer.eachLayer(layer => {
                        if (layer._path && layer._path === clickedElement) {
                            clickedOnCountyOrCard = true;
                            return; // Exit loop early
                        }
                    });
               }

               if (!clickedOnCountyOrCard) {
                    countyInfo.classList.add('hidden');
                }
          }
      });
      hideLoading();
  })
  .catch(error => {
    console.error('Error fetching county data:', error);
    if (!countyLayer) { // Ensure layer exists even if empty
        countyLayer = L.geoJSON(null, {
           style: { fillColor: 'transparent', weight: 1.5, opacity: 0.8, color: '#1e40af', fillOpacity: 0 }
        }).addTo(amap);
    }
    hideLoading();
    showToast('Error loading county boundaries. County lookup may not work.', 'error');
  });


  // Address Search Control Setup (Prominent & Central)
  const searchInput = document.getElementById('address-search-input');
  const searchButton = document.getElementById('search-button');

  if (searchButton && searchInput) {
      searchButton.addEventListener('click', performAddressSearch);
      searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
              e.preventDefault(); // Prevent default form submission if applicable
              performAddressSearch();
          }
      });
  }

  // Custom icon for the search result marker
  const searchIcon = L.divIcon({
      className: 'search-marker-icon', // Custom CSS class
      html: '<div class="marker-pin"></div><div class="marker-pulse"></div>',
      iconSize: [30, 30], // Size of the icon
      iconAnchor: [15, 30] // Point of the icon which will correspond to marker's location
  });


  function performAddressSearch() {
      const query = searchInput.value.trim();
      if (!query) {
          showToast('Please enter an address to search.', 'warning');
          return;
      }

      // Clear previous search result marker
      if (searchResultMarker) {
          amap.removeLayer(searchResultMarker);
          searchResultMarker = null;
      }
      // Hide county info card
      countyInfo.classList.add('hidden');


      showLoading(`Searching for "${query}"...`);

      // Use Nominatim for geocoding
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`) // Added addressdetails=1
          .then(response => {
              if (!response.ok) {
                  if (response.status === 429) { // Too many requests
                     showToast('Too many search requests. Please wait a moment and try again.', 'warning');
                  } else {
                     showToast(`Search error: ${response.status} ${response.statusText}`, 'error');
                  }
                  throw new Error(`HTTP error! ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              hideLoading();
              if (data && data.length > 0) {
                  const result = data[0];
                  const lat = parseFloat(result.lat);
                  const lon = parseFloat(result.lon);

                  if (isNaN(lat) || isNaN(lon)) {
                       showToast('Invalid coordinates received for the address.', 'error');
                       return;
                  }

                  const resultLatLng = L.latLng(lat, lon);

                  // Add a simple marker at the found location
                  searchResultMarker = L.marker(resultLatLng, { icon: searchIcon }).addTo(amap);

                   // --- Simplified Popup Content ---
                  let namePart = result.address?.amenity || result.address?.building || result.address?.shop || result.address?.office || result.address?.commercial || result.address?.tourism || result.address?.historic || result.address?.leisure || result.address?.place || result.address?.suburb || result.address?.city_district || result.address?.hamlet || result.address?.village || result.address?.town || result.address?.city || 'Location';

                  const addressComponents = [];
                  if (result.address?.house_number) addressComponents.push(result.address.house_number);
                  if (result.address?.road) addressComponents.push(result.address.road);
                  if (result.address?.neighbourhood && !addressComponents.length) addressComponents.push(result.address.neighbourhood); // Add neighborhood if no street/number
                  if (result.address?.suburb && addressComponents.length <= 1) addressComponents.push(result.address.suburb); // Add suburb if address is short
                  const cityTownVillage = result.address?.city || result.address?.town || result.address?.village;
                  if (cityTownVillage) addressComponents.push(cityTownVillage);
                   if (result.address?.state) addressComponents.push(result.address.state);
                   if (result.address?.postcode) addressComponents.push(result.address.postcode);

                  let addressPart = addressComponents.join(', ');

                  // Fallback if structured address is sparse or name extraction failed
                  if (addressPart.length < 10 || namePart === 'Location') { // If constructed address is very short or name is default
                      const parts = result.display_name.split(',');
                       // Use the first non-empty part as name, the rest as address
                      let potentialName = parts.find(p => p.trim().length > 0);
                      if(potentialName) namePart = potentialName.trim();

                      // Reconstruct address from the rest of display_name
                      let remainingParts = parts.slice(parts.indexOf(potentialName) + 1).map(p => p.trim()).filter(p => p.length > 0);
                      addressPart = remainingParts.join(', ');

                       // Final fallback if address is still empty or contains unwanted parts like "United States"
                      if (!addressPart || addressPart.includes('United States')) {
                          addressPart = result.display_name.replace(namePart, '').trim();
                          if(addressPart.startsWith(',')) addressPart = addressPart.substring(1).trim();
                           addressPart = addressPart.replace(/, United States$/, '').trim();
                      }
                  }
                    // Final cleanup
                    addressPart = addressPart.replace(/, United States$/, '').trim();
                    namePart = namePart.replace(/, United States$/, '').trim(); // Clean name too if it somehow includes it


                  const popupContent = `
                      <div class="search-popup-content">
                        <div class="search-popup-name">${namePart}</div>
                        <div class="search-popup-address">${addressPart}</div>
                      </div>
                  `;

                  searchResultMarker.bindPopup(popupContent, { autoPanPadding: L.point(40, 40), minWidth: 180 }).openPopup();
                   // --- End Simplified Popup Content ---


                  // Fly to the location with a higher zoom level
                  amap.flyTo(resultLatLng, 18, { duration: 1.5, easeLinearity: 0.25 });


              } else {
                  showToast('Address not found. Please try a different search term.', 'warning');
              }
          })
          .catch(error => {
              hideLoading();
              console.error('Address search error:', error);
              showToast('Error during address search. Please try again.', 'error');
          });
  }

    // --- Right-Click Coordinate Copy Functionality ---
    function onMapRightClick(e) {
        // Prevent default browser context menu
        e.originalEvent.preventDefault();

        // Format coordinates to 6 decimal places
        const coordText = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;

        // Copy coordinates to clipboard
        navigator.clipboard.writeText(coordText)
            .then(() => {
                // Show a temporary popup near the click location
                L.popup({
                    closeButton: false, // Make it a temporary notification popup
                    autoClose: true,
                    closeOnClick: true, // Close on click anywhere
                    className: 'coords-popup', // Custom class for styling
                    offset: L.point(0, -15) // Position above the click point
                })
                    .setLatLng(e.latlng)
                    .setContent(`Copied:<br><b>${coordText}</b>`)
                    .openOn(amap);

                // Optional: Show a toast notification as well/instead
                // showToast(`Coordinates copied: ${coordText}`, 'success'); // Choose one or both
            })
            .catch(err => {
                console.error('Failed to copy coordinates: ', err);
                showToast('Failed to copy coordinates.', 'error');
            });
    }

    // Add the right-click event listener to the map
    amap.on('contextmenu', onMapRightClick);
    // --- End Right-Click Functionality ---


  return amap;
} // End of initializeMap


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
});