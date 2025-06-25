window.onerror = (err) => {
  console.trace();
  alert(String(err));
};

grist.ready({
  requiredAccess: 'read table'
});

let currentViewMode = 'pivot'; // Current display mode: 'pivot' (normal) or 'fullscreen'
let lastPivotData = null;      // Stores the raw table data received from Grist
let currentPivotConfig = {};   // Pivot table config (rows, cols, vals, aggregatorName, rendererName)
let pivotTableInitialized = false; // Tracks pivot widget initialization state

// Updates the table when in fullscreen mode
function updateFullscreenTable() {
  const $pivotTableInUI = $('#table').find('table.pvtTable'); 
  const $fullscreenContainer = $('#fullscreen-table-container');
  $fullscreenContainer.empty(); 
  
  if ($pivotTableInUI.length) {
    const $clonedTable = $pivotTableInUI.clone(true, true);
    $fullscreenContainer.append($clonedTable);
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

// Translation of math operation names to English
$.extend(
  $.pivotUtilities.aggregators,
  $.pivotUtilities.locales.fr.aggregators,
  { 'Weighted Average': weightedAverage }
);

// Translation of renderer types to English
$.extend($.pivotUtilities.locales.fr.renderers,
         $.pivotUtilities.export_renderers);

// Wait until the pivot table is fully loaded, apply fullscreen if needed
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

// Lightweight rendering of pivot table (no alternative visualizations) + translation of Weighted Average
grist.onRecords(async rec => {
  lastPivotData = rec;  // Save received data globally
  pivotTableInitialized = false; // Reset initialization state

  // Retrieve previous config options saved in Grist
  let settings = await grist.getOption('settings') ?? {};
  let { rows, cols, vals, aggregatorName, rendererName } = settings;

  // Centralized storage for config to make updates easier
  currentPivotConfig = { rows, cols, vals, aggregatorName, rendererName };

  // The old label was in French, map it to English
  const mapFrToEn = { 'Moyenne pondérée': 'Weighted Average' };
  if (aggregatorName in mapFrToEn) {
    aggregatorName = mapFrToEn[aggregatorName];
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
      },

      aggregatorName: currentPivotConfig.aggregatorName,
      rendererName: currentPivotConfig.rendererName,
    },
    false,  // overwrite = false, don't replace everything, retain what's there
    'en'    // English locale for default labels
  );

  // Dynamically create "Columns" "Rows" "Values" labels
  PivotLabels.init(); 
  
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
    $('#view-mode-select').val('pivot'); // Sync the original dropdown
    grist.setOption('viewMode', currentViewMode).catch(err => {
        console.error("Failed to save viewMode:", err);
    });
    applyViewMode();
  });
});
