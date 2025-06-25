// Module for managing pivot table labels
const PivotLabels = (function() {
    // Function to add labels to the pivot table UI
    function addPivotTableLabels() {
        // 1. Add the "Value Σ" label next to the SECOND dropdown (the bottom one)
        // Specifically look for the second dropdown in the pvtVals cell
        const pvtValsCell = document.querySelector('.pvtVals.pvtUiCell');
        if (pvtValsCell) {
            // Look for all select elements in this cell
            const selects = pvtValsCell.querySelectorAll('select');
            
            // If there are at least 2 selects, we target the second
            if (selects.length >= 2) {
                const secondSelect = selects[1]; // The second select (index 1)
                
                // Check if the label already exists
                if (!document.getElementById('sum-value-label')) {
                    const sumLabel = document.createElement('span');
                    sumLabel.id = 'sum-value-label';
                    sumLabel.textContent = 'Value Σ';
                    sumLabel.style.fontWeight = '600';
                    sumLabel.style.marginRight = '8px';
                    sumLabel.style.color = 'var(--primary-color)';
                    sumLabel.style.display = 'inline-block';
                    sumLabel.style.verticalAlign = 'middle';
                    
                    // Insert the label before the second dropdown
                    secondSelect.parentNode.insertBefore(sumLabel, secondSelect);
                }
            } 
            // If there's only one dropdown, look for the second one after <br>
            else if (selects.length === 1) {
                // Look for a <br> before this select (might indicate it's the second)
                const br = pvtValsCell.querySelector('br');
                if (br) {
                    // Find the select following the br
                    let nextElement = br.nextElementSibling;
                    while (nextElement && nextElement.tagName !== 'SELECT') {
                        nextElement = nextElement.nextElementSibling;
                    }
                    
                    if (nextElement && nextElement.tagName === 'SELECT' && !document.getElementById('sum-value-label')) {
                        const sumLabel = document.createElement('span');
                        sumLabel.id = 'sum-value-label';
                        sumLabel.textContent = 'Value Σ';
                        sumLabel.style.fontWeight = '600';
                        sumLabel.style.marginRight = '8px';
                        sumLabel.style.color = 'var(--primary-color)';
                        sumLabel.style.display = 'inline-block';
                        sumLabel.style.verticalAlign = 'middle';
                        
                        // Insert the label before this select
                        nextElement.parentNode.insertBefore(sumLabel, nextElement);
                    }
                }
            }
        }
        
        // 2. Add the "Rows" label above the row zone, centered
        const rowsContainer = document.querySelector('.pvtRows');
        if (rowsContainer && !document.getElementById('rows-label')) {
            // Remove existing label if it exists
            const existingLabel = document.getElementById('rows-label');
            if (existingLabel) {
                existingLabel.remove();
            }
            
            const rowsLabel = document.createElement('div');
            rowsLabel.id = 'rows-label';
            rowsLabel.textContent = 'Rows';
            rowsLabel.style.fontWeight = '600';
            rowsLabel.style.color = 'var(--primary-color)';
            rowsLabel.style.padding = '5px 0';
            rowsLabel.style.textAlign = 'center'; // Centered
            rowsLabel.style.fontSize = '14px';
            rowsLabel.style.marginBottom = '5px';
            rowsLabel.style.pointerEvents = 'none'; // Don't interfere with drag & drop
            rowsLabel.style.position = 'absolute'; // Absolute positioning
            rowsLabel.style.width = '100%'; // Full width for centering
            rowsLabel.style.top = '5px'; // Some space at the top
            rowsLabel.style.left = '0'; // Align left of container
            
            // Ensure the container is relatively positioned for absolute positioning
            if (getComputedStyle(rowsContainer).position === 'static') {
                rowsContainer.style.position = 'relative';
            }
            
            // Add some space above the first element
            rowsContainer.style.paddingTop = '30px';
            
            // Insert the label at the start of the rows container
            rowsContainer.insertBefore(rowsLabel, rowsContainer.firstChild);
        }
        
        // 3. Add the "Columns" label with a stable reserved space
        // First, add a global style to reserve the space
        if (!document.getElementById('cols-space-reservation-style')) {
            const colsSpaceStyle = document.createElement('style');
            colsSpaceStyle.id = 'cols-space-reservation-style';
            colsSpaceStyle.textContent = `
                /* Reserve space for the Columns label */
                .pvtCols {
                    position: relative !important;
                    padding-top: 25px !important; /* Space for the label */
                }
                
                /* Ensure compatibility with fullscreen mode */
                #fullscreen-table-container .pvtCols {
                    padding-top: 25px !important;
                }
            `;
            document.head.appendChild(colsSpaceStyle);
        }
        
        const colsContainer = document.querySelector('.pvtCols');
        if (colsContainer && !document.getElementById('cols-label')) {
            // Remove existing label if it exists
            const existingLabel = document.getElementById('cols-label');
            if (existingLabel) {
                existingLabel.remove();
            }
            
            const colsLabel = document.createElement('div');
            colsLabel.id = 'cols-label';
            colsLabel.textContent = 'Columns';
            colsLabel.style.fontWeight = '600';
            colsLabel.style.color = 'var(--primary-color)';
            colsLabel.style.padding = '3px 8px';
            colsLabel.style.fontSize = '14px';
            colsLabel.style.pointerEvents = 'none'; // Don't interfere with drag & drop
            colsLabel.style.position = 'absolute'; // Absolute positioning
            colsLabel.style.left = '10px'; // Slightly offset from the left
            colsLabel.style.top = '3px'; // At the top of the reserved zone
            colsLabel.style.zIndex = '5'; // Make sure it's above other elements
            
            // Insert the label at the start of the columns container
            colsContainer.insertBefore(colsLabel, colsContainer.firstChild);
        }
        
        // Add styles for dark mode if not already present
        if (!document.getElementById('pivot-labels-dark-mode-styles')) {
            const darkModeStyles = document.createElement('style');
            darkModeStyles.id = 'pivot-labels-dark-mode-styles';
            darkModeStyles.textContent = `
                @media (prefers-color-scheme: dark) {
                    #sum-value-label, #rows-label, #cols-label {
                        color: var(--primary-light) !important;
                    }
                }
            `;
            document.head.appendChild(darkModeStyles);
        }
    }

    // Observe DOM changes to add labels as needed
    function setupLabelsObserver() {
        // Create an observer to watch for DOM changes
        const observer = new MutationObserver((mutations) => {
            // For each mutation, check for new nodes
            let shouldAddLabels = false;
            
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    // Check if pivot UI structure elements are present
                    const pivotUI = document.querySelector('.pvtUi');
                    if (pivotUI) {
                        shouldAddLabels = true;
                        break;
                    }
                }
                
                // Also check if any label got accidentally removed
                if (mutation.removedNodes.length) {
                    if ((!document.getElementById('cols-label') && document.querySelector('.pvtCols')) ||
                        (!document.getElementById('rows-label') && document.querySelector('.pvtRows')) ||
                        (!document.getElementById('sum-value-label') && document.querySelector('.pvtVals'))) {
                        shouldAddLabels = true;
                        break;
                    }
                }
            }
            
            if (shouldAddLabels) {
                // Apply labels with a short delay to ensure DOM is stable
                setTimeout(addPivotTableLabels, 100);
            }
        });
        
        // Observe both containers (normal and fullscreen)
        const containers = ['table', 'fullscreen-table-container'];
        
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                observer.observe(container, {
                    childList: true,
                    subtree: true
                });
            }
        });
    }

    // Listen for interactions that might change the table
    function setupInteractionListeners() {
        // 1. On view change
        const viewModeSelect = document.getElementById('view-mode-select');
        if (viewModeSelect) {
            viewModeSelect.addEventListener('change', () => {
                setTimeout(addPivotTableLabels, 200);
            });
        }
        
        // 2. On exiting fullscreen
        const fullscreenExitButton = document.getElementById('fullscreen-exit-button');
        if (fullscreenExitButton) {
            fullscreenExitButton.addEventListener('click', () => {
                setTimeout(addPivotTableLabels, 200);
            });
        }
        
        // 3. Monitor drag & drop interactions more robustly
        document.addEventListener('mouseup', (event) => {
            // After drag & drop, check if labels are still present
            setTimeout(() => {
                const needsUpdate = (!document.getElementById('cols-label') && document.querySelector('.pvtCols')) ||
                                  (!document.getElementById('rows-label') && document.querySelector('.pvtRows')) ||
                                  (!document.getElementById('sum-value-label') && document.querySelector('.pvtVals select:nth-child(2)'));
                
                if (needsUpdate) {
                    addPivotTableLabels();
                }
            }, 200);
        });
        
        // 4. Observe live style changes
        const styleObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    // If a container's style changes, check if labels are correctly positioned
                    setTimeout(addPivotTableLabels, 100);
                    break;
                }
            }
        });
        
        // Observe main containers for style changes
        const containers = ['.pvtCols', '.pvtRows', '.pvtVals'];
        containers.forEach(selector => {
            const container = document.querySelector(selector);
            if (container) {
                styleObserver.observe(container, { attributes: true, attributeFilter: ['style'] });
            }
        });
    }

    // Main initialization function
    function initializePivotTableLabels() {
        // Try to add labels immediately
        addPivotTableLabels();
        
        // Set up the observer for future changes
        setupLabelsObserver();
        
        // Set up event listeners
        setupInteractionListeners();
        
        // Double-check after a short delay to ensure everything is in place
        setTimeout(addPivotTableLabels, 500);
        setTimeout(addPivotTableLabels, 1000); // Double-check after a longer delay
    }

    // Public module interface
    return {
        init: initializePivotTableLabels,
        addLabels: addPivotTableLabels
    };
})();

// Export for compatibility
function addValueSumLabel() {
    PivotLabels.addLabels();
}
