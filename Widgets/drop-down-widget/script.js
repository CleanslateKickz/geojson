function showError(msg) {
  let el = document.getElementById('error');
  if (!msg) {
    el.style.display = 'none';
  } else {
    el.innerHTML = msg;
    el.style.display = 'block';
  }
}

function updateDropdown(options) {
  const dropdown = document.getElementById('dropdown');
  dropdown.innerHTML = '';
  if (options.length === 0) {
    const optionElement = document.createElement('option');
    optionElement.textContent = 'No options available';
    dropdown.appendChild(optionElement);
  } else {
    // Add a "Show All" option at the beginning
    const allOption = document.createElement('option');
    allOption.value = '-1';
    allOption.textContent = 'Show All';
    dropdown.appendChild(allOption);
    
    options.forEach((option, index) => {
      const optionElement = document.createElement('option');
      optionElement.value = String(index);
      optionElement.textContent = String(option);
      dropdown.appendChild(optionElement);
    });    
  }
}

function saveOption() {
  const sid = document.getElementById("sessionid").value;
  grist.widgetApi.setOption('sessionid', sid);
}

function initGrist() {
  let allRecords = [];
  let sessionID = "";

  grist.ready({
    columns: [{ name: "OptionsToSelect", title: 'Options to select', type: 'Any' }],
    requiredAccess: 'read table',
    allowSelectBy: true,
    onEditOptions() {
      document.getElementById("container").style.display = 'none';
      document.getElementById("config").style.display = '';
      document.getElementById("sessionid").value = sessionID;
    },
  });

  grist.onOptions((customOptions, _) => {
    customOptions = customOptions || {};
    sessionID = customOptions.sessionid || "";   

    document.getElementById("container").style.display = '';
    document.getElementById("config").style.display = 'none';
  });

  grist.onRecords(function (records, mappings) {
    if (!records || records.length === 0) {
      showError("No records received");
      updateDropdown([]);
      return;
    }
    
    allRecords = records;
    const mapped = records.map(r => grist.mapColumnNames(r));

    showError("");
    const options = Array.from(new Set(
      mapped.map(record => record.OptionsToSelect).filter(option => option !== null && option !== undefined)
    ));
    
    if (options.length === 0) {
      showError("No valid options found");
    }
    updateDropdown(options);

    if (sessionID.length > 0) {
      const selection = sessionStorage.getItem(sessionID + "_Dropdown_Item");
      if (selection) {
        const dropdown = document.getElementById('dropdown');
        dropdown.value = selection;
        dropdown.dispatchEvent(new Event('change'));
      }
    }    
  });

  grist.onRecord(function (record) {
    const mapped = grist.mapColumnNames(record);
    const dropdown = document.getElementById('dropdown');
    const index = allRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      dropdown.value = String(index);
    }
  });

  document.getElementById('dropdown').addEventListener('change', function(event) {    
    const selectedIndex = parseInt(event.target.value);
    
    // If "Show All" is selected
    if (selectedIndex === -1) {
      grist.clearSelection();
      return;
    }

    const selectedRecord = allRecords[selectedIndex];
    if (selectedRecord) {
      const mapped = grist.mapColumnNames(selectedRecord);
      const selectedValue = mapped.OptionsToSelect;
      
      // Set cursor to the selected record
      grist.setCursorPos({rowId: selectedRecord.id});
      
      // Filter to show only records matching the selected value
      const matchingIds = allRecords
        .filter(record => grist.mapColumnNames(record).OptionsToSelect === selectedValue)
        .map(record => record.id);
      
      // Apply the filter
      grist.setSelectedRows(matchingIds);
      
      // Save selection if we have a session ID
      if (sessionID.length > 0) {
        sessionStorage.setItem(sessionID + "_Dropdown_Item", selectedIndex);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initGrist);
