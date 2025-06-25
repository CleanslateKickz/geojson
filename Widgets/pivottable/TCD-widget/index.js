window.onerror = (err) => {
  console.trace();
  alert(String(err));
};

grist.ready({
  requiredAccess: 'read table'
});

let currentViewMode = 'pivot'; // Current display mode: 'pivot' (normal) or 'fullscreen'
let lastPivotData = null;  // Stores the raw table data received from Grist
let currentPivotConfig = {};  // Pivot table config (rows, cols, vals, aggregatorName, rendererName)
let pivotTableInitialized = false; // Tracks pivot widget initialization state

// Function to update the table when in fullscreen mode
function updateFullscreenTable() {
  const $pivotTableInUI = $('#table').find('table.pvtTable'); 
  const $fullscreenContainer = $('#fullscreen-table-container');
  $fullscreenContainer.empty(); 
  
  if ($pivotTableInUI.length) {
    const $clonedTable = $pivotTableInUI.clone(true, true);
    $fullscreenContainer.append($clonedTable);
    
    // Apply colors to the cloned table
    applyVariableColors();
    
  } else {
    // If we're in fullscreen and the table isn't ready, show a loading message instead of error
    if (currentViewMode === 'fullscreen' && !pivotTableInitialized) {
      $fullscreenContainer.html('<p style="text-align:center; padding-top:50px;">Loading table...</p>');
    } else {
      $fullscreenContainer.html('<p style="text-align:center; padding-top:50px; font-style:italic;">No table to display in fullscreen.</p>');
    }
  }
}

function applyViewMode() {
  const $pivotUIContainer = $('#table');
  const $fullscreenContainer = $('#fullscreen-table-container');
  const $body = $('body');
  // The original view selector and exit button are handled via CSS using the .fullscreen-active class

  if (currentViewMode === 'fullscreen') {
    updateFullscreenTable(); 
    $pivotUIContainer.hide();
    $fullscreenContainer.show();
    $body.addClass('fullscreen-active');
    $(window).trigger('resize'); 
  } else { // 'pivot' mode
    $fullscreenContainer.hide().empty();
    $pivotUIContainer.show();
    $body.removeClass('fullscreen-active');
    $(window).trigger('resize');
  }
}

function wavg (n) {
  if (!n) { return; }
  n = n.filter(([note]) => typeof (note) === 'number');
  if (n.length) { return n.map(([note, coef]) => note * coef).reduce((a, b) => a + b) / n.map(([_note, coef]) => coef).reduce((a, b) => a + b); }
}

function weightedAverage ([val, coef]) {
  return (_data, _rowKey, _colKey) => ({
    values: [],
    push: function (rec) { this.values.push([rec[val], rec[coef]]); },
    value: function () { return wavg(this.values); },
    format: function (x) { return (Math.round(x * 100) / 100).toFixed(2); },
    numInputs: 2
  });
}

// Math operation name translation to French
$.extend(
  $.pivotUtilities.aggregators,
  $.pivotUtilities.locales.fr.aggregators,
  { 'Moyenne pondérée': weightedAverage }
);

// Renderer type name translation to French
$.extend($.pivotUtilities.locales.fr.renderers,
         $.pivotUtilities.export_renderers);

// Function that waits until the pivot table is fully loaded and applies fullscreen if needed
function checkPivotTableAndApplyFullscreen() {
  const $pivotTable = $('#table').find('table.pvtTable');
  
  if ($pivotTable.length > 0) {
    // Table is ready, update fullscreen if needed
    if (currentViewMode === 'fullscreen') {
      updateFullscreenTable();
    }
    pivotTableInitialized = true;
    return true;
  }
  
  // If the table isn't ready yet, wait and retry
  return false;
}

// Lightweight rendering of pivot table (no alternative visualizations) + French translation of Weighted Average
grist.onRecords(async rec => {
  lastPivotData = rec;  // Save received data globally
  pivotTableInitialized = false; // Reset initialization state

  // Retrieve previous config options saved in Grist
  let settings = await grist.getOption('settings') ?? {};
  let { rows, cols, vals, aggregatorName, rendererName } = settings;

  // // Retrieve saved column size
  try {
    const savedColumnSize = await grist.getOption('columnSize');
    if (savedColumnSize) {
      $('#column-size-select').val(savedColumnSize);
      changeColumnSize(savedColumnSize);
    } else {
      changeColumnSize('1.0');
    }
  } catch (e) {
    console.error("Error loading columnSize from Grist options:", e);
    changeColumnSize('1.0');
  }

  // Centralized storage for config to make updates easier
  currentPivotConfig = { rows, cols, vals, aggregatorName, rendererName };

  // The old label was in English, map it to French
  const mapEnToFr = { 'Weighted Average': 'Moyenne pondérée' };
  if (aggregatorName in mapEnToFr) {
    aggregatorName = mapEnToFr[aggregatorName];
    currentPivotConfig.aggregatorName = aggregatorName;  // Update in central config
  }

  let firstRefresh = true; // Avoid writing to Grist on initial load

  $('#table').pivotUI(
    rec,
    {
      rows: currentPivotConfig.rows,
      cols: currentPivotConfig.cols,
      vals: currentPivotConfig.vals,

      // On user edit
      onRefresh(config) {
        if (firstRefresh) { 
          firstRefresh = false; 
          
          // Apply colors on first initialization
          setTimeout(() => {
            applyVariableColors();
          }, 150);
          
          return; 
        }
        currentPivotConfig = {
          rows: config.rows,
          cols: config.cols,
          vals: config.vals,
          aggregatorName: config.aggregatorName,
          rendererName: config.rendererName,
        };

        // Save updated options in Grist
        grist.setOption('settings', currentPivotConfig);

        // If in fullscreen, update the cloned table
        if (currentViewMode === 'fullscreen') {
          updateFullscreenTable();
        }
        // Re-apply colors after modification
        applyVariableColors();
      },

      aggregatorName: currentPivotConfig.aggregatorName,
      rendererName: currentPivotConfig.rendererName,
    },
    false,  // overwrite = false, don't replace everything, retain what's there
    'fr'    // French locale for default labels
  );

  // Dynamically create "Columns" "Rows" "Values" labels
  PivotLabels.init(); 

  // Apply colors after full initialization
  setTimeout(() => {
    applyVariableColors();
  }, 200);
  
  try {
    const savedViewMode = await grist.getOption('viewMode');
    if (savedViewMode && (savedViewMode === 'pivot' || savedViewMode === 'fullscreen')) {
      currentViewMode = savedViewMode;
      $('#view-mode-select').val(currentViewMode);
    }
  } catch (e) {
    console.error("Error loading viewMode from Grist options:", e);
  }
  applyViewMode();

  // Periodically check if the table is loaded for fullscreen mode
  if (currentViewMode === 'fullscreen') {
    const checkInterval = setInterval(() => {
      if (checkPivotTableAndApplyFullscreen()) {
        clearInterval(checkInterval);
      }
    }, 200);
    
    // Stop checking after 5 seconds regardless
    setTimeout(() => clearInterval(checkInterval), 5000);
  }
});
$(document).ready(function() {
  // Handler for the main view selector
  $('#view-mode-select').on('change', function() {
    currentViewMode = $(this).val();
    grist.setOption('viewMode', currentViewMode).catch(err => {
        console.error("Failed to save viewMode:", err);
    });
    applyViewMode();
  });

  // Handler for the "Exit fullscreen" button
  $('#fullscreen-exit-button').on('click', function() {
    currentViewMode = 'pivot';
    $('#view-mode-select').val('pivot');
    grist.setOption('viewMode', currentViewMode).catch(err => {
        console.error("Failed to save viewMode:", err);
    });
    applyViewMode();
  });

  // Handler for column size
  $('#column-size-select').on('change', function() {
    const selectedSize = $(this).val();
    
    // Save in Grist
    grist.setOption('columnSize', selectedSize).catch(err => {
      console.error("Failed to save columnSize:", err);
    });
    
    // Apply new size
    changeColumnSize(selectedSize);
    
    // If in fullscreen, update the content
    if (currentViewMode === 'fullscreen') {
      setTimeout(() => {
        updateFullscreenTable();
      }, 100);
    }
    
    // Re-apply colors after size change
    setTimeout(() => {
      applyVariableColors();
    }, 150);
  });

  // Observer to reapply colors automatically
  // Observe DOM mutations to reapply colors as needed
  const observer = new MutationObserver(function(mutations) {
    let shouldReapplyColors = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if .pvtAttr elements were added
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            if ($(node).find('.pvtAttr').length > 0 || $(node).hasClass('pvtAttr')) {
              shouldReapplyColors = true;
            }
          }
        });
      }
    });
    
    if (shouldReapplyColors) {
      applyVariableColors();
    }
  });
  
  // Observe changes in the pivot containers
  const targetNode = document.getElementById('table');
  if (targetNode) {
    observer.observe(targetNode, { 
      childList: true, 
      subtree: true 
    });
  }
  
  const fullscreenNode = document.getElementById('fullscreen-table-container');
  if (fullscreenNode) {
    observer.observe(fullscreenNode, { 
      childList: true, 
      subtree: true 
    });
  }
  
});
