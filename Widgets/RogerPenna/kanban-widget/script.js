document.addEventListener('DOMContentLoaded', function () {
console.log("KANBAN WIDGET SCRIPT: DOMContentLoaded event fired.");

// --- START OF INTERNATIONALIZATION BLOCK (I18N) ---
const LANGUAGES = {
'pt': {
"tab_fields": "Fields by Lane", "tab_general": "General, WIP and Sorting", "tab_visual": "Visuals", "tab_rules": "Rules", "config_for_column": "Configure for Kanban Column (Lane):", "select_lane": "-- Select a lane --", "no_lane_defined": "-- No Kanban lane defined --", "select_column": "-- Select a column --", "rules_for_lane": "Rules for Lane: ", "add_rule": "+ Add Rule", "remove_rule": "Remove Rule", "rule_type_allow": "Only allow cards IF...", "rule_type_create": "IF card enters THEN create in another table...", "rule_type_move": "IF condition THEN automatically move to...", "rule_value_placeholder": "Value to compare", "field_current_table": "-- Current Table Field --", "operator": "-- Operator --", "target_table": "-- Select Target Table --", "relation_field": "Relation Field (Kanban Card ID):", "status_column_dest": "Status Column/Lane (in Target):", "initial_lane": "Starting Lane for New Card (in Target):", "condition_if": "Condition (IF):", "action_move": "Action (THEN Move To):", "select_target_lane": "-- Select Target Lane --", "na": "N/A", "ini": "Ini#", "field_name": "Field Name", "use_formatting": "Use Formatting (Card)", "on_card": "No Card", "card_position": "Card Pos#", "show_label": "Show Card Label", "visible_drawer": "Visible Drawer", "editable_drawer": "Editable Drawer", "drawer_position": "Drawer Pos#", "none": "-- None --", "asc": "Ascending", "desc": "Descending", "priority": "Priority (highlighted)", "due_date": "Due Date (highlighted)", "max_visible": "Max Visible Cards (Initial)", "max_allowed": "Max Cards Allowed (WIP Limit)", "all": "All", "no_limit": "No limit", "no_lanes_wip": "No lanes defined for configuring WIP. Select a 'Column for Kanban Lanes' in the 'General' tab.", "load_metadata": "Load table metadata to configure sorting.", "select_lane_to_config": "Select a lane to view/configure its fields.", "error_loading_fields": "Error loading fields.", "no_ref_table": "Referenced table ID not found.", "linked_columns_config": "Linked Table Column Configuration",
"config_button": "Config", "settings_title": "Kanban Settings", "main_kanban_column_mapping": "Main Kanban Column Mapping", "use_table_column_for_lanes": "Use column from the table to the Kanban Lanes:", "main_kanban_column_desc": "Defines which column from your Grist table will be used to create the Kanban columns (lanes).", "card_sorting_in_lanes": "Card Sorting Within Lanes", "card_sorting_desc": "Define up to three criteria to sort the cards within each lane.", "wip_limits": "Limits per Lane (WIP - Work In Progress)", "wip_limits_desc": "Set the maximum number of cards initially visible and the maximum limit of cards allowed for each lane. Leave blank or 0 for no limit.", "card_title_font_color": "Card Title Font Color (General):", "card_fields_font_color": "Card Fields Font Color (General):", "drawer_font_color": "Drawer Font Color (General):", "widget_background": "Widget Background", "movement_restrictions": "Movement Restrictions", "allow_adjacent_move_only": "Allow moving cards to adjacent lanes only", "center_columns": "Center Columns", "column_width_percent": "Column Width %:", "min_px": "min (px):", "max_px": "max (px):", "column_color": "Column Color:", "card_color": "Card Color:", "show_card_shadow": "Show shadow on cards", "background_type": "Background Type:", "solid_color": "Solid Color", "linear_gradient": "Linear Gradient", "radial_gradient": "Radial Gradient", "solid_bg_color": "Background Color (Solid):", "gradient_color_1": "Gradient Color 1:", "gradient_color_2": "Gradient Color 2:", "direction_linear": "Direction (Linear):", "dir_to_right": "Right", "dir_to_left": "Left", "dir_to_bottom": "Down", "dir_to_top": "Up", "dir_to_br": "To Bottom Right", "dir_to_bl": "To Bottom Left", "dir_to_tr": "To Top Right", "dir_to_tl": "To Top Left", "dir_45_deg": "45 Degrees", "dir_135_deg": "135 Degrees", "dir_225_deg": "225 Degrees (-135deg)", "dir_315_deg": "315 Degrees (-45deg)", "rules_tab_desc": "Configure rules for each Kanban lane. Rules are checked/executed when a card enters a lane.", "replicate_button": "Replicate", "cancel_button": "Cancel", "save_button": "Save", "save_settings_button": "Save Settings", "api_debug_title": "API Debug",
"language_settings": "Language Settings", "widget_language": "Widget Language:"
},
'en': {
"tab_fields": "Fields by Lane", "tab_general": "General, WIP & Sorting", "tab_visual": "Visuals", "tab_rules": "Rules", "config_for_column": "Configure for Kanban Column (Lane):", "select_lane": "-- Select a lane --", "no_lane_defined": "-- No Kanban lane defined --", "select_column": "-- Select a column --", "rules_for_lane": "Rules for Lane: ", "add_rule": "+ Add Rule", "remove_rule": "Remove Rule", "rule_type_allow": "Only allow cards IF...", "rule_type_create": "IF card enters THEN create in another table...", "rule_type_move": "IF condition THEN automatically moves to...", "rule_value_placeholder": "Value to compare", "field_current_table": "-- Current Table Field --", "operator": "-- Operator --", "target_table": "-- Select Target Table --", "relation_field": "Relation Field (Kanban card ID):", "status_column_dest": "Status/Lane Column (in Target):", "initial_lane": "Initial Lane for New Card (in Target):", "condition_if": "Condition (IF):", "action_move": "Action (THEN Move To):", "select_target_lane": "-- Select Target Lane --", "na": "N/A", "ini": "Init#", "field_name": "Field Name", "use_formatting": "Use Formatting (Card)", "on_card": "On Card", "card_position": "Card Pos#", "show_label": "Show Label Card", "visible_drawer": "Visible Drawer", "editable_drawer": "Editable Drawer", "drawer_position": "Drawer Pos#", "none": "-- None --", "asc": "Ascending", "desc": "Descending", "priority": "Priority (highlight)", "due_date": "Due Date (highlight)", "max_visible": "Max Visible Cards (Initial)", "max_allowed": "Max Allowed Cards (WIP Limit)", "all": "All", "no_limit": "No limit", "no_lanes_wip": "No lanes defined to configure WIP. Select a 'Kanban Lane Column' in the 'General' tab.", "load_metadata": "Load table metadata to configure sorting.", "select_lane_to_config": "Select a lane to view/configure its fields.", "error_loading_fields": "Error loading fields.", "no_ref_table": "Referenced table ID not found.", "linked_columns_config": "Linked Table Columns Configuration", 
"config_button": "Config", "settings_title": "Kanban Settings", "main_kanban_column_mapping": "Main Kanban Column Mapping", "use_table_column_for_lanes": "Use table column for Kanban Lanes:", "main_kanban_column_desc": "Defines which column from your Grist table will be used to create the Kanban columns (lanes).", "card_sorting_in_lanes": "Card Sorting Within Lanes", "card_sorting_desc": "Set up to three criteria to sort cards within each lane.", "wip_limits": "Limits per Lane (WIP - Work In Progress)", "wip_limits_desc": "Set the maximum number of initially visible cards and the maximum allowed cards for each lane. Leave blank or 0 for no limit.", "card_title_font_color": "Card Title Font Color (General):", "card_fields_font_color": "Card Fields Font Color (General):", "drawer_font_color": "Drawer Font Color (General):", "widget_background": "Widget Background", "movement_restrictions": "Movement Restrictions", "allow_adjacent_move_only": "Allow moving cards to adjacent lanes only", "center_columns": "Center columns", "column_width_percent": "Column width %:", "min_px": "min (px):", "max_px": "max (px):", "column_color": "Column Color:", "card_color": "Card Color:", "show_card_shadow": "Show shadow on cards", "background_type": "Background Type:", "solid_color": "Solid Color", "linear_gradient": "Linear Gradient", "radial_gradient": "Radial Gradient", "solid_bg_color": "Background Color (Solid):", "gradient_color_1": "Gradient Color 1:", "gradient_color_2": "Gradient Color 2:", "direction_linear": "Direction (Linear):", "dir_to_right": "To Right", "dir_to_left": "To Left", "dir_to_bottom": "To Bottom", "dir_to_top": "To Top", "dir_to_br": "To Bottom Right", "dir_to_bl": "To Bottom Left", "dir_to_tr": "To Top Right", "dir_to_tl": "To Top Left", "dir_45_deg": "45 Degrees", "dir_135_deg": "135 Degrees", "dir_225_deg": "225 Degrees (-135deg)", "dir_315_deg": "315 Degrees (-45deg)", "rules_tab_desc": "Configure rules for each Kanban lane. Rules are checked/executed when a card enters a lane.", "replicate_button": "Replicate", "cancel_button": "Cancel", "save_button": "Save", "save_settings_button": "Save Settings", "api_debug_title": "API Debug", 
"language_settings": "Language Settings", "widget_language": "Widget Language:" 
} 
}; 

let currentLang = 'pt'; 

function _(key) { 
const langPack = LANGUAGES[currentLang] || LANGUAGES['en']; 
return langPack[key] || key; 
} 

function translatePageContent() { 
document.querySelectorAll('[data-i18n]').forEach(element => { 
const key = element.dataset.i18n; 
const translation = _(key); 
const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()); 
if (textNode) { 
textNode.textContent = (element.nodeName === 'BUTTON' && (element.textContent.includes('⚙️') || element.querySelector('i, span'))) ? ' ' + translation : translation; 
} else { 
element.textContent = translation; 
} 
}); 
document.querySelectorAll('option[data-i18n]').forEach(opt => { 
opt.textContent = _(opt.dataset.i18n); 
}); 
} 
// --- END OF INTERNATIONALIZATION BLOCK (I18N) --- 

const CURRENT_CONFIG_KEY_FOR_GRIST = 'kanbanWidgetConfig_v18_reflist_manager'; 
const CARDS_PER_PAGE = 25; 

/***************************************************************** 
* 1. Reusable modules 
*****************************************************************/ 

window.GristDataManager = (function () { 
const state = { tables: null, columns: null, allTableMetas: {} }; 
async function loadMeta() { 
const p = []; 
try { 
if (!state.tables) { p.push(grist.docApi.fetchTable('_grist_Tables').then(d => state.tables = d).catch(e => { console.error("GDM: Error _grist_Tables", e); throw e; })); } 
if (!state.columns) { p.push(grist.docApi.fetchTable('_grist_Tables_column').then(d => state.columns = d).catch(e => { console.error("GDM: Error _grist_Tables_column", e); throw e; }));} 
if (p.length) { await Promise.all(p); } 
} catch (error) { console.error("GDM: loadMeta failed.", error); throw error; } 
} 
function numericId(tableId) { if (!state.tables || !state.tables.tableId) { console.error("GDM.numericId: state.tables not loaded."); return null; } const idx = state.tables.tableId.findIndex(t => String(t) === String(tableId)); return idx === -1 ? null : String(state.tables.id[idx]); } 
function columnsOf(numId) { 
if (!numId || !state.columns || !state.columns.colId) { console.warn("GDM.columnsOf: invalid numId or state.columns."); return []; } 
const cols = []; const m = state.columns; const tidKey = m.parentId ? 'parentId' : 'tableId'; const cidKey = m.colId ? 'colId' : 'columnId'; 
for (let i = 0; i < m[cidKey].length; i++) { 
if (String(m[tidKey][i]) !== String(numId)) { continue; } 
const colType = String(m.type[i]); let referencedTableId = null; 
if (colType.startsWith('Ref:') || colType.startsWith('RefList:')) { referencedTableId = colType.split(':')[1]; } 
const rawFormula = m.formula?.[i] ?? ''; const isFormula = String(rawFormula).trim() !== ''; 
let wopts = {}; if (m.widgetOptions?.[i]) { try { wopts = JSON.parse(m.widgetOptions[i]); } catch (e) { /* ignore */ } } 
let choices = []; 
if (Array.isArray(wopts.choices) && wopts.choices.length) { choices = wopts.choices.slice(); } 
else if (typeof wopts.choiceOptions === 'object') { choices = Object.keys(wopts.choiceOptions); } 
if (!choices.length && m.choices?.[i]) { const raw = m.choices[i]; if (Array.isArray(raw)) { choices = raw[0] === 'L' ? raw.slice(1) : raw; } else if (typeof raw === 'string' && raw.startsWith('L')) { choices = raw.substring(1).split(','); } } 
let displayColIdForSelf = null; 
if (m.displayCol?.[i] != null) { const dispNumId = m.displayCol[i]; const displayColIndex = m.id.findIndex(idVal => String(idVal) === String(dispNumId)); if (displayColIndex !== -1) { displayColIdForSelf = String(m[cidKey][displayColIndex]); } } 
cols.push({ id: String(m[cidKey][i]), label: String(m.label[i] || m[cidKey][i]), type: colType, referencedTableId: referencedTableId, isFormula, choices, widgetOptions: wopts, displayColId: displayColIdForSelf }); 
} 
return cols; 
} 
function colToRows(colData) { if (!colData || typeof colData.id === 'undefined' || colData.id === null) { console.warn("GDM.colToRows: invalid/null colData or colData.id."); return []; } const rows = []; const keys = Object.keys(colData); const n = colData.id.length; for (let i = 0; i < n; i++) { const r = {}; keys.forEach(k => r[k] = colData[k][i]); rows.push(r); } return rows; } 
async function fetchAll() { const defaultReturn = { mainTable: { nameId: null, numericId: null, columns: [] }, allData: {}, allTablesList: [] }; try { await loadMeta(); const tableId = await grist.selectedTable.getTableId(); if (!tableId) { console.warn("GDM.fetchAll: No table selected."); return defaultReturn; } const numId = numericId(tableId); if (!numId) { console.warn(`GDM.fetchAll: numId not found for '${tableId}'.`); return { ...defaultReturn, mainTable: { nameId: tableId, numericId: null, columns: [] }, allTablesList: getAllTableIdsAndNames() }; } const cols = columnsOf(numId); let data = []; try { const rawData = await grist.docApi.fetchTable(tableId); data = colToRows(rawData); } catch (fetchError) { console.error(`GDM.fetchAll: Error fetch data '${tableId}'.`, fetchError); } return { mainTable: { nameId: tableId, numericId: numId, columns: cols }, allData: { [tableId]: data }, allTablesList: getAllTableIdsAndNames() }; } catch (error) { console.error("GDM.fetchAll: Fetch error.", error); return defaultReturn; } } 
function getAllTableIdsAndNames() { if (!state.tables || !state.tables.tableId) { console.warn("GDM.getAllTableIdsAndNames: state.tables not loaded."); return []; } return state.tables.tableId.map((id, index) =>({ id: String(id), name: String(state.tables.label?.[index] || state.tables.tableId[index] || id) })).filter(t => !t.id.startsWith('_grist_')); } 
async function getTableSchema(tableId) { if (state.allTableMetas[tableId]) { return state.allTableMetas[tableId]; } await loadMeta(); const numTableId = numericId(tableId); if (!numTableId) { console.warn(`GDM.getTableSchema: Numeric ID not found for tableId: ${tableId}`); return { tableId: tableId, columns: [] }; } const cols = columnsOf(numTableId); const schema = { tableId: tableId, columns: cols }; state.allTableMetas[tableId] = schema; return schema; } 
return { fetchAll, getAllTableIdsAndNames, getTableSchema, colToRows, columnsOf }; 
})(); 

window.WidgetConfigManager = (function() { 
const KANBAN_DEFAULTS_INTERNAL = { 
kanbanDefiningColumnId: null, 
restrictAdjacentMove: false, 
laneWipLimits: {}, 
cardSortCriteria: [{ columnId: null, direction: 'asc', displayType: '' }, { columnId: null, direction: 'asc', displayType: '' }, { columnId: null, direction: 'asc', displayType: '' }], 
visual: { centerColumns: false, columnWidthPercent: 25, columnMinWidth: 200, columnMaxWidth: 400, columnColor: '#F8F9FA', cardColor: '#FFFFFF', cardShadow: true, backgroundType: 'solid', solidBackgroundColor: '#E9ECEF', gradientColor1: '#E9ECEF', gradientColor2: '#D8DCDF', gradientDirection: 'to right', drawerFontColor: '#333333', cardTitleFontColor: '#333333', cardFieldsFontColor: '#333333' }, 
rules: {} 
}; 
const FIELD_DEFAULTS_INTERNAL = { visible: true, editable: true, position: 0, card: false, cardPosition: 0, showLabel: true, useFormatting: false, refListFieldConfigs: {} }; 
let currentConfig = JSON.parse(JSON.stringify(KANBAN_DEFAULTS_INTERNAL)); 

return { 
loadConfig: async() => { 
const stored = await grist.getOption(CURRENT_CONFIG_KEY_FOR_GRIST); 
currentConfig = { 
...JSON.parse(JSON.stringify(KANBAN_DEFAULTS_INTERNAL)), 
...(stored || {}), 
laneConfigs: stored?.laneConfigs || {}, 
visual: { ...JSON.parse(JSON.stringify(KANBAN_DEFAULTS_INTERNAL.visual)), ...(stored?.visual || {}) }, 
rules: { ...JSON.parse(JSON.stringify(KANBAN_DEFAULTS_INTERNAL.rules)), ...(stored?.rules || {}) } 
}; 
if (stored?.visual && typeof stored.visual.cardShadow !== 'undefined') { currentConfig.visual.cardShadow = Boolean(stored.visual.cardShadow); } else { currentConfig.visual.cardShadow = KANBAN_DEFAULTS_INTERNAL.visual.cardShadow; } 
}, 
saveConfig: async () => { await grist.setOption(CURRENT_CONFIG_KEY_FOR_GRIST, currentConfig); }, 
getVisualConfig: () => ({ ...currentConfig.visual }), 
setVisualConfig: (vis) => { currentConfig.visual = { ...KANBAN_DEFAULTS_INTERNAL.visual, ...currentConfig.visual, ...vis }; if (typeof vis.cardShadow === 'boolean') { currentConfig.visual.cardShadow = vis.cardShadow; } }, 
getKanbanDefiningColumn: () => currentConfig.kanbanDefiningColumnId, 
setKanbanDefiningColumn: (colId) => { currentConfig.kanbanDefiningColumnId = colId; }, 
getRestrictAdjacentMove: () => currentConfig.restrictAdjacentMove, 
setRestrictAdjacentMove: (v) => { currentConfig.restrictAdjacentMove = Boolean(v); }, 
getLaneWipLimit: (lv) => ({maxVisible: 0,maxAllowed: 0,...currentConfig.laneWipLimits?.[String(lv)]}), 
setLaneWipLimit: (lv, lim) => { currentConfig.laneWipLimits = currentConfig.laneWipLimits || {}; currentConfig.laneWipLimits[String(lv)] = {maxVisible: parseInt(lim.maxVisible, 10) || 0, maxAllowed: parseInt(lim.maxAllowed, 10) || 0};}, 
getCardSortCriteria: () => currentConfig.cardSortCriteria.map(c => ({ ...c })), 
setCardSortCriteria: (crit) => { if (Array.isArray(crit) && crit.length === 3) currentConfig.cardSortCriteria = crit; else console.warn("invalid setCardSortCriteria"); }, 
getFieldConfigForLane: (t, lv, f) => { 
const laneCfg = currentConfig.laneConfigs?.[t]?.[String(lv)]?.[f] || {}; 
if (!laneCfg.refListFieldConfigs || typeof laneCfg.refListFieldConfigs !== 'object') { 
laneCfg.refListFieldConfigs = {}; 
} 
return { ...FIELD_DEFAULTS_INTERNAL, ...laneCfg }; 
}, 
updateFieldConfigForLane: (t, lv, f, cfg) => { if (!t||lv==null||!f) return; currentConfig.laneConfigs[t] = currentConfig.laneConfigs[t] || {}; currentConfig.laneConfigs[t][String(lv)] = currentConfig.laneConfigs[t][String(lv)] || {}; currentConfig.laneConfigs[t][String(lv)][f] = { ...FIELD_DEFAULTS_INTERNAL, ...currentConfig.laneConfigs[t][String(lv)][f], ...cfg }; }, 
getDefaults: () => ({ ...FIELD_DEFAULTS_INTERNAL }), 
getKanbanDefaults: () => JSON.parse(JSON.stringify(KANBAN_DEFAULTS_INTERNAL)), 
getAllRules: () => JSON.parse(JSON.stringify(currentConfig.rules)), 
getRulesForLane: laneValue => (currentConfig.rules[String(laneValue)] || []).map(r => ({ ...r })), 
setAllRules: rules => { currentConfig.rules = JSON.parse(JSON.stringify(rules)); }, 
}; 
})(); 

window.ConfigUIBuilder = (function () { 
let drawerEl, laneSelectEl, fieldsTableContainerEl, saveBtnEl, cancelBtnEl, closeBtnEl, replicateBtnEl, onSaveCallback, currentGristTableMeta, currentKanbanLanes, allGristTablesList, configSortState = { columnKey: 'iniOrder', direction: 'asc' }, tabBtnFields, tabBtnGeneral, tabBtnVisual, tabBtnRules, tabContentFields, tabContentGeneral, tabContentVisual, tabContentRules, definingColumnMapSelectEl, wipLimitsTableContainerEl, restrictAdjacentMoveCbEl, cardSortCriteriaContainerEl, centerColumnsCb, colWidthPercentInput, colMinWidthInput, colMaxWidthInput, colColorInput, cardColorInput, cardShadowInput, rulesConfigAreaEl, 
cfgBackgroundTypeSelect, cfgSolidColorSettingsDiv, cfgSolidBgColorInput, 
cfgGradientSettingsDiv, cfgGradientColor1Input, cfgGradientColor2Input, 
cfgGradientDirectionContainerDiv, cfgGradientDirectionSelect, 
cfgDrawerFontColorInput, cfgCardTitleFontColorInput, cfgCardFieldsFontColorInput; 

const RULE_OPERATORS = [ { value: '==', text: 'Equal to (==)' }, { value: '!=', text: 'Not equal to (!=)' }, { value: '>', text: 'Greater than (>)' }, { value: '<', text: 'Less than (<)' }, { value: '>=', text: 'Greater than or equal to (>=)' }, { value: '<=', text: 'Less than or equal to (<=)' }, { value: 'contains', text: 'Contains (text)' }, { value: 'not_contains', text: 'Does not contain (text)' }, { value: 'is_empty', text: 'Is empty' }, { value: 'is_not_empty', text: 'Is not empty' } ];

function init(options) {
drawerEl = options.drawerEl;
laneSelectEl = drawerEl.querySelector('#kanban-lane-select'); fieldsTableContainerEl = drawerEl.querySelector('#cfg-fields-table-container'); replicateBtnEl = drawerEl.querySelector('#cfg-replicate'); definingColumnMapSelectEl = drawerEl.querySelector('#kanban-defining-column-map-select'); wipLimitsTableContainerEl = drawerEl.querySelector('#wip-limits-table-container'); restrictAdjacentMoveCbEl = drawerEl.querySelector('#cfg-restrict-adjacent-move'); cardSortCriteriaContainerEl = drawerEl.querySelector('#card-sort-criteria-container'); tabBtnFields = drawerEl.querySelector('#cfg-tab-btn-fields'); tabBtnGeneral = drawerEl.querySelector('#cfg-tab-btn-general'); tabBtnVisual = drawerEl.querySelector('#cfg-tab-btn-visual'); tabBtnRules = drawerEl.querySelector('#cfg-tab-btn-rules'); tabContentFields = drawerEl.querySelector('#cfg-tab-content-fields'); tabContentGeneral = drawerEl.querySelector('#cfg-tab-content-general'); tabContentVisual = drawerEl.querySelector('#cfg-tab-content-visual'); tabContentRules = drawerEl.querySelector('#cfg-tab-content-rules'); rulesConfigAreaEl = drawerEl.querySelector('#rules-config-area'); centerColumnsCb = drawerEl.querySelector('#cfg-center-columns'); colWidthPercentInput = drawerEl.querySelector('#cfg-col-width-percent'); colMinWidthInput = drawerEl.querySelector('#cfg-col-min-width'); colMaxWidthInput = drawerEl.querySelector('#cfg-col-max-width'); colColorInput = drawerEl.querySelector('#cfg-col-color'); cardColorInput = drawerEl.querySelector('#cfg-card-color'); cardShadowInput = drawerEl.querySelector('#cfg-card-shadow'); 
cfgBackgroundTypeSelect = drawerEl.querySelector('#cfg-background-type'); 
cfgSolidColorSettingsDiv = drawerEl.querySelector('#cfg-solid-color-settings'); 
cfgSolidBgColorInput = drawerEl.querySelector('#cfg-solid-background-color'); 
cfgGradientSettingsDiv = drawerEl.querySelector('#cfg-gradient-settings'); 
cfgGradientColor1Input = drawerEl.querySelector('#cfg-gradient-color1'); 
cfgGradientColor2Input = drawerEl.querySelector('#cfg-gradient-color2'); 
cfgGradientDirectionContainerDiv = drawerEl.querySelector('#cfg-gradient-direction-container'); 
cfgGradientDirectionSelect = drawerEl.querySelector('#cfg-gradient-direction'); 
cfgDrawerFontColorInput = drawerEl.querySelector('#cfg-drawer-font-color'); 
cfgCardTitleFontColorInput = drawerEl.querySelector('#cfg-card-title-font-color'); 
cfgCardFieldsFontColorInput = drawerEl.querySelector('#cfg-card-fields-font-color'); 
saveBtnEl = options.saveBtnEl; cancelBtnEl = options.cancelBtnEl; closeBtnEl = options.closeBtnEl; onSaveCallback = options.onSave; if (replicateBtnEl) replicateBtnEl.onclick = handleReplicateSelection; if (tabBtnFields) tabBtnFields.onclick = e => { e.preventDefault(); switchTab('fields'); }; if (tabBtnGeneral) tabBtnGeneral.onclick = e => { e.preventDefault(); switchTab('general'); }; if (tabBtnVisual) tabBtnVisual.onclick = e => { e.preventDefault(); switchTab('visual'); }; if (tabBtnRules) tabBtnRules.onclick = e => { e.preventDefault(); switchTab('rules'); }; if (saveBtnEl) saveBtnEl.onclick = handleSaveConfiguration; if (cancelBtnEl) cancelBtnEl.onclick = closeDrawer; if (closeBtnEl) closeBtnEl.onclick = closeDrawer; if (laneSelectEl) laneSelectEl.onchange = handleLaneChanged; 

if (cfgBackgroundTypeSelect) {cfgBackgroundTypeSelect.onchange = function() { 
const type = this.value; 
cfgSolidColorSettingsDiv.style.display = (type === 'solid') ? 'block' : 'none'; 
cfgGradientSettingsDiv.style.display = (type === 'linear' || type === 'radial') ? 'block' : 'none'; 
cfgGradientDirectionContainerDiv.style.display = (type === 'linear') ? 'block' : 'none'; 
}; 
} 
} 

function handleLaneChanged() { 
const selectedLaneValue = laneSelectEl.value; 
configSortState = { columnKey: 'iniOrder', direction: 'asc' }; // Reset sort state for fields table 
if (typeof selectedLaneValue !== 'undefined' && selectedLaneValue !== "") { 
if (fieldsTableContainerEl) { 
fieldsTableContainerEl.style.display = 'block'; 
populateFieldsTableForLane(selectedLaneValue, true); 
} else { 
console.error("CUIB.handleLaneChanged: fieldsTableContainerEl not found."); 
} 
} else { 
if (fieldsTableContainerEl) { 
fieldsTableContainerEl.style.display = 'none'; 
fieldsTableContainerEl.innerHTML = ''; 
} 
} 
} 
function switchTab(tabName) { [tabBtnFields, tabBtnGeneral, tabBtnVisual, tabBtnRules].forEach(btn => btn?.classList.remove('active')); [tabContentFields, tabContentGeneral, tabContentVisual, tabContentRules].forEach(content => content?.classList.remove('active')); if (tabName === 'fields') { tabBtnFields.classList.add('active'); tabContentFields.classList.add('active'); } else if (tabName === 'general') { tabBtnGeneral.classList.add('active'); tabContentGeneral.classList.add('active'); } else if (tabName === 'visual') { tabBtnVisual.classList.add('active'); tabContentVisual.classList.add('active'); } else if (tabName === 'rules') { tabBtnRules.classList.add('active'); tabContentRules.classList.add('active'); } } 

function populateAndOpen(gristTableMetaIn, processedKanbanLanesIn, allTablesListIn) { 
currentGristTableMeta = gristTableMetaIn; currentKanbanLanes = processedKanbanLanesIn; allGristTablesList = allTablesListIn; if (fieldsTableContainerEl) { fieldsTableContainerEl.style.display = 'none'; fieldsTableContainerEl.innerHTML = ''; } configSortState = { columnKey: 'iniOrder', direction: 'asc' }; const laneSelectorDiv = drawerEl.querySelector('#kanban-lane-selector-div'); if (currentKanbanLanes && currentKanbanLanes.length > 0) { if (laneSelectorDiv) laneSelectorDiv.style.display = 'block'; if (laneSelectEl) laneSelectEl.innerHTML = `<option value="">${_('select_lane')}</option>`; currentKanbanLanes.forEach(lane => { if (lane.value === "_UNMATCHED_LANE_" || lane.isUnmatched) return; const option = document.createElement('option'); option.value = lane.value; option.textContent = lane.value || "[Vazio]"; if (laneSelectEl) laneSelectEl.appendChild(option); }); if (laneSelectEl) laneSelectEl.value = ""; } else { if (laneSelectorDiv) laneSelectorDiv.style.display = 'block'; if (laneSelectEl) laneSelectEl.innerHTML = `<option value="">${_('no_lane_defined')}</option>`; } if (definingColumnMapSelectEl) definingColumnMapSelectEl.innerHTML = `<option value="">${_('select_column')}</option>`; if (currentGristTableMeta && currentGristTableMeta.columns) { currentGristTableMeta.columns.forEach(col => { if (['Choice', 'ChoiceList', 'Text', 'Any', 'Date', 'DateTime', 'Numeric', 'Int', 'Ref', 'RefList'].includes(col.type.split(':')[0])) { const option = document.createElement('option'); option.value = col.id; option.textContent = `${col.label} (${col.id}) - ${_('column_type')} ${col.type}`; if (definingColumnMapSelectEl) definingColumnMapSelectEl.appendChild(option); } }); } const currentDefiningCol = WidgetConfigManager.getKanbanDefiningColumn(); if (currentDefiningCol && definingColumnMapSelectEl) { definingColumnMapSelectEl.value = currentDefiningCol; } else if (definingColumnMapSelectEl) { definingColumnMapSelectEl.value = ""; } populateCardSortCriteriaUI(); populateWipLimitsTable(); if (restrictAdjacentMoveCbEl) { restrictAdjacentMoveCbEl.checked = WidgetConfigManager.getRestrictAdjacentMove(); }
const vis = WidgetConfigManager.getVisualConfig(); 
const visDefaults = WidgetConfigManager.getKanbanDefaults().visual; 
centerColumnsCb.checked = vis.centerColumns; 
colWidthPercentInput.value = vis.columnWidthPercent; 
colMinWidthInput.value = vis.columnMinWidth; 
colMaxWidthInput.value = vis.columnMaxWidth; 
colColorInput.value = vis.columnColor || visDefaults.columnColor; 
cardColorInput.value = vis.cardColor || visDefaults.cardColor; 
cardShadowInput.checked = Boolean(vis.cardShadow); 
cfgDrawerFontColorInput.value = vis.drawerFontColor || visDefaults.drawerFontColor; 
cfgCardTitleFontColorInput.value = vis.cardTitleFontColor || visDefaults.cardTitleFontColor; 
cfgCardFieldsFontColorInput.value = vis.cardFieldsFontColor || visDefaults.cardFieldsFontColor; 
cfgBackgroundTypeSelect.value = vis.backgroundType || visDefaults.backgroundType; 
cfgSolidBgColorInput.value = vis.solidBackgroundColor || visDefaults.solidBackgroundColor; 
cfgGradientColor1Input.value = vis.gradientColor1 || visDefaults.gradientColor1; 
cfgGradientColor2Input.value = vis.gradientColor2 || visDefaults.gradientColor2; 
cfgGradientDirectionSelect.value = vis.gradientDirection || visDefaults.gradientDirection; 
if (cfgBackgroundTypeSelect.onchange) cfgBackgroundTypeSelect.onchange(); 
populateRulesUI(); switchTab('fields'); if (drawerEl) drawerEl.classList.add('visible'); else console.error("CUIB.populateAndOpen: drawerEl is null!"); 
} 

function populateRulesUI() { if (!rulesConfigAreaEl || !currentKanbanLanes || !currentGristTableMeta) { if (rulesConfigAreaEl) rulesConfigAreaEl.innerHTML = "<p><i>Lanes or main table metadata not available.</i></p>"; return; } rulesConfigAreaEl.innerHTML = ''; const allRules = WidgetConfigManager.getAllRules(); currentKanbanLanes.filter(lane => !lane.isUnmatched).forEach(lane => { const laneSection = document.createElement('div'); laneSection.className = 'rules-lane-section'; laneSection.dataset.laneValue = lane.value; const title = document.createElement('h4'); title.textContent = `${_('rules_for_lane')}"${lane.value || '[Empty]'}"`; laneSection.appendChild(title); const rulesContainer = document.createElement('div'); rulesContainer.className = 'rules-items-container'; allRules[String(lane.value)] || []; existingRulesForLane.forEach(ruleData => { rulesContainer.appendChild(createRuleItemElement(ruleData, String(lane.value))); }); const addRuleBtn = document.createElement('button'); addRuleBtn.textContent = _('add_rule'); addRuleBtn.className = 'add-rule-btn'; addRuleBtn.type = 'button'; addRuleBtn.onclick = () => { rulesContainer.appendChild(createRuleItemElement({}, String(lane.value))); }; laneSection.appendChild(addRuleBtn); rulesConfigAreaEl.appendChild(laneSection); }); } 
function createRuleItemElement(ruleData = {}, laneValue) { 
const ruleItemDiv = document.createElement('div'); ruleItemDiv.className = 'rule-item'; ruleItemDiv.dataset.ruleId = ruleData.id || `temp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`; 
const headerDiv = document.createElement('div'); headerDiv.className = 'rule-item-header'; 
const typeSelect = document.createElement('select'); typeSelect.className = 'rule-type'; 
[{value: 'allow', text: _('rule_type_allow')}, {value: 'create', text: _('rule_type_create')}, {value: 'move', text: _('rule_type_move')}].forEach(opt => { typeSelect.add(new Option(opt.text, opt.value)); }); 
typeSelect.value = ruleData.type || 'allow'; 
headerDiv.appendChild(typeSelect); 
const removeRuleBtn = document.createElement('button'); removeRuleBtn.textContent = _('remove_rule'); removeRuleBtn.className = 'rule-remove-btn'; removeRuleBtn.type = 'button'; removeRuleBtn.onclick = () => ruleItemDiv.remove(); 
headerDiv.appendChild(removeRuleBtn); ruleItemDiv.appendChild(headerDiv); 
const paramsDiv = document.createElement('div'); paramsDiv.className = 'rule-params'; ruleItemDiv.appendChild(paramsDiv); 

const renderParamsForType = async (selectedType) => { 
paramsDiv.innerHTML = ''; 
if (selectedType === 'allow') { const conditionDiv = document.createElement('div'); conditionDiv.style.display = 'flex'; conditionDiv.style.gap = '8px'; conditionDiv.style.alignItems = 'center'; const fieldSelect = document.createElement('select'); fieldSelect.className = 'rule-param-field'; fieldSelect.add(new Option(_('field_current_table'), '')); currentGristTableMeta.columns.forEach(col => fieldSelect.add(new Option(`${col.label || col.id} (${col.type.split(':')[0]})`, col.id))); if (ruleData.fieldId) fieldSelect.value = ruleData.fieldId; conditionDiv.appendChild(fieldSelect); const operatorSelect = document.createElement('select'); operatorSelect.className = 'rule-param-operator'; operatorSelect.add(new Option(_('operator'), '')); RULE_OPERATORS.forEach(op => operatorSelect.add(new Option(op.text, op.value))); if (ruleData.operator) operatorSelect.value = ruleData.operator; conditionDiv.appendChild(operatorSelect); const valueInput = document.createElement('input'); valueInput.type = 'text'; valueInput.className = 'rule-param-value'; valueInput.placeholder = _('rule_value_placeholder'); valueInput.value = ruleData.value || ''; conditionDiv.appendChild(valueInput); paramsDiv.appendChild(conditionDiv); } 
else if (selectedType === 'create') { 
const actionDiv = document.createElement('div'); actionDiv.style.display = 'flex'; actionDiv.style.flexDirection = 'column'; actionDiv.style.gap = '10px'; 
const createRow = (labelText, element) => { const rowDiv = document.createElement('div'); rowDiv.style.display = 'flex'; rowDiv.style.alignItems = 'center'; rowDiv.style.gap = '5px'; const label = document.createElement('label'); label.textContent = labelText; label.style.minWidth = '220px'; rowDiv.append(label, element); return rowDiv; }; 
const targetTableSelect = document.createElement('select'); targetTableSelect.className = 'rule-param-target-table'; targetTableSelect.style.flexGrow = '1'; 
targetTableSelect.add(new Option(_('target_table'), '')); 
allGristTablesList.forEach(tbl => { if (tbl.id !== currentGristTableMeta.nameId) { targetTableSelect.add(new Option(tbl.name || tbl.id, tbl.id)); } }); 
actionDiv.appendChild(createRow('Target Table:', targetTableSelect)); 
const relationFieldSelect = document.createElement('select'); relationFieldSelect.className = 'rule-param-relation-field'; relationFieldSelect.style.flexGrow = '1'; 
relationFieldSelect.add(new Option('-- Relation Field (in Target) --', '')); 
actionDiv.appendChild(createRow(_('relation_field'), relationFieldSelect)); 
const targetLaneColSelect = document.createElement('select'); targetLaneColSelect.className = 'rule-param-target-lane-column'; targetLaneColSelect.style.flexGrow = '1'; 
targetLaneColSelect.add(new Option('-- Status/Lane Column (in Target) --', '')); 
actionDiv.appendChild(createRow(_('status_column_dest'), targetLaneColSelect)); 
const initialLaneValueSelect = document.createElement('select'); initialLaneValueSelect.className = 'rule-param-initial-lane-value'; initialLaneValueSelect.style.flexGrow = '1'; 
initialLaneValueSelect.add(new Option('-- Initial Lane at Destination --', '')); 
actionDiv.appendChild(createRow(_('initial_lane'), initialLaneValueSelect)); 

const populateSelectWithOptions = async (selectElement, getOptionsAsync, currentValue, placeholder = '-- Select --') => { 
const originalValue = selectElement.value; selectElement.innerHTML = `<option value="">${placeholder}</option>`; 
try { 
const options = await getOptionsAsync(); 
if (!options || options.length === 0) { return; } 
options.forEach(opt => selectElement.add(new Option(opt.text, opt.value))); 
if (currentValue && Array.from(selectElement.options).some(opt => opt.value === currentValue)) { selectElement.value = currentValue; } 
else if (Array.from(selectElement.options).some(opt => opt.value === originalValue)) { selectElement.value = originalValue; } 
} catch (e) { console.error("Error in populateSelectWithOptions:", e); } 
}; 
targetTableSelect.onchange = async() => { 
const selectedTargetTableId = targetTableSelect.value; 
await populateSelectWithOptions(relationFieldSelect, async () => { if (!selectedTargetTableId) return []; const schema = await GristDataManager.getTableSchema(selectedTargetTableId); return schema.columns.map(c => ({ text: `${c.label || c.id} (${c.type.split(':')[0]})`, value: c.id })); }, ruleData.relationFieldIdInTarget, '-- Relation Field --'); 
await populateSelectWithOptions(targetLaneColSelect, async () => { if (!selectedTargetTableId) return []; const schema = await GristDataManager.getTableSchema(selectedTargetTableId); return schema.columns.filter(c => c.type === 'Choice' || c.type === 'ChoiceList').map(c => ({ text: `${c.label || c.id}`, value: c.id })); 
initialLaneValueSelect.innerHTML = '<option value="">-- Initial Lane --</option>'; 
if (targetLaneColSelect.value) { const schema = await GristDataManager.getTableSchema(selectedTargetTableId); const choiceCol = schema.columns.find(c => c.id === targetLaneColSelect.value); if (choiceCol && choiceCol.choices) { await populateSelectWithOptions(initialLaneValueSelect, async () => choiceCol.choices.map(ch => ({text: ch, value: ch})), ruleData.initialLaneValue, '-- Initial Lane --'); } } 
}; 
targetLaneColSelect.onchange = async() => { 
const selectedTargetTableId = targetTableSelect.value; 
const selectedLaneColumnId = targetLaneColSelect.value; 
if (selectedTargetTableId && selectedLaneColumnId) { const schema = await GristDataManager.getTableSchema(selectedTargetTableId); const choiceCol = schema.columns.find(c => c.id === selectedLaneColumnId); if (choiceCol && choiceCol.choices) { await populateSelectWithOptions(initialLaneValueSelect, async () => choiceCol.choices.map(ch => ({text: ch, value: ch})), ruleData.initialLaneValue, '-- Initial Lane --'); } else { in itialLaneValueSelect.innerHTML = '<option value="">-- No options --</option>'; } } else { initialLaneValueSelect.innerHTML = '<option value="">-- Select Lane Column --</option>'; } 
}; 
if (ruleData.targetTableId) { targetTableSelect.value = ruleData.targetTableId; await targetTableSelect.onchange(); } 
paramsDiv.appendChild(actionDiv); 
} else if (selectedType === 'move') { const moveParamsDiv = document.createElement('div'); moveParamsDiv.style.display = 'flex'; moveParamsDiv.style.flexDirection = 'column'; moveParamsDiv.style.gap = '10px'; const conditionTitle = document.createElement('strong'); conditionTitle.textContent = _('condition_if'); moveParamsDiv.appendChild(conditionTitle); const conditionLineDiv = document.createElement('div'); conditionLineDiv.style.display = 'flex'; conditionLineDiv.style.gap = '8px'; conditionLineDiv.style.alignItems = 'center'; const fieldSelectMove = document.createElement('select'); fieldSelectMove.className = 'rule-param-field-move'; fieldSelectMove.add(new Option(_('field_current_table'), '')); currentGristTableMeta.columns.forEach(col => fieldSelectMove.add(new Option(`${col.label || col.id} (${col.type.split(':')[0]})`, col.id))); if (ruleData.fieldId) fieldSelectMove.value = ruleData.fieldId; conditionLineDiv.appendChild(fieldSelectMove); const operatorSelectMove = document.createElement('select'); operatorSelectMove.className = 'rule-param-operator-move'; operatorSelectMove.add(new Option(_('operator'), '')); RULE_OPERATORS.forEach(op => operatorSelectMove.add(new Option(op.text, op.value))); if (ruleData.operator) operatorSelectMove.value = ruleData.operator; conditionLineDiv.appendChild(operatorSelectMove); const valueInputMove = document.createElement('input'); valueInputMove.type = 'text'; valueInputMove.className = 'rule-param-value-move'; valueInputMove.placeholder = _('rule_value_placeholder'); valueInputMove.value = ruleData.value || ''; conditionLineDiv.appendChild(valueInputMove); moveParamsDiv.appendChild(conditionLineDiv); const actionTitle = document.createElement('strong'); actionTitle.textContent = _('action_move'); actionTitle.style.marginTop = '10px'; moveParamsDiv.appendChild(actionTitle); const targetLaneSelect = document.createElement('select'); targetLaneSelect.className = 'rule-param-target-lane'; targetLaneSelect.add(new Option(_('select_target_lane'), '')); currentKanbanLanes.filter(l => !l.isUnmatched && l.value !== laneValue).forEach(kLane => { targetLaneSelect.add(new Option(kLane.value || '[Empty]', kLane.value)); }); if (ruleData.targetLaneValue) targetLaneSelect.value = ruleData.targetLaneValue; moveParamsDiv.appendChild(targetLaneSelect); paramsDiv.appendChild(moveParamsDiv); } 
}; 
typeSelect.onchange = () => renderParamsForType(typeSelect.value); 
renderParamsForType(typeSelect.value); 
return ruleItemDiv; 
} 
function populateWipLimitsTable() { 
if (!wipLimitsTableContainerEl || !currentKanbanLanes || currentKanbanLanes.length === 0) { if (wipLimitsTableContainerEl) { wipLimitsTableContainerEl.innerHTML = `<p><i>${_('no_lanes_wip')}</i></p>`; } return; } 
wipLimitsTableContainerEl.innerHTML = ''; 
const table = document.createElement('table'); table.className = 'wip-limit-table'; 
const thead = table.createTHead(); const headerRow = thead.insertRow(); 
["Lane", _('max_visible'), _('max_allowed')].forEach(text => { const th = document.createElement('th'); th.textContent = text; headerRow.appendChild(th); }); 
const tbody = table.createTBody(); 
currentKanbanLanes.filter(lane => !lane.isUnmatched).forEach(lane => { 
const row = tbody.insertRow(); row.insertCell().textContent = lane.value || "[Empty]"; 
const currentLimits = WidgetConfigManager.getLaneWipLimit(lane.value); 
let cellVisible = row.insertCell(); let inputVisible = document.createElement('input'); inputVisible.type = 'number'; inputVisible.min = '0'; inputVisible.placeholder = _('all'); inputVisible.dataset.laneValue = lane.value; inputVisible.dataset.limitType = 'maxVisible'; inputVisible.value = currentLimits.maxVisible > 0 ? currentLimits.maxVisible : ''; cellVisible.appendChild(inputVisible); 
let cellAllowed = row.insertCell(); let inputAllowed = document.createElement('input'); inputAllowed.type = 'number'; inputAllowed.min = '0'; inputAllowed.placeholder = _('no_limit'); inputAllowed.dataset.laneValue = lane.value; inputAllowed.dataset.limitType = 'maxAllowed'; inputAllowed.value = currentLimits.maxAllowed > 0 ? currentLimits.maxAllowed : ''; cellAllowed.appendChild(inputAllowed); 
}); 
wipLimitsTableContainerEl.appendChild(table); 
} 
function populateCardSortCriteriaUI() { 
if (!cardSortCriteriaContainerEl || !currentGristTableMeta || !currentGristTableMeta.columns) { if (cardSortCriteriaContainerEl) { cardSortCriteriaContainerEl.innerHTML = `<p><i>${_('load_metadata')}</i></p>`; } ret urn; } 
cardSortCriteriaContainerEl.innerHTML = ''; 
const currentSortCriteria = WidgetConfigManager.getCardSortCriteria(); 
for (let i = 0; i < 3; i++) { 
const criterionDiv = document.createElement('div'); criterionDiv.className = 'sort-criterion'; 
const label = document.createElement('label'); label.textContent = i === 0 ? "Sort by:" : (i === 1 ? "Then by:" : "And then by:"); criterionDiv.appendChild(label); 
const colSelect = document.createElement('select'); colSelect.id = `sort-col-${i}`; colSelect.innerHTML = `<option value="">${_('none')}</option>`; 
currentGristTableMeta.columns.forEach(col => colSelect.appendChild(Object.assign(document.createElement('option'), { value: col.id, textContent: `${col.label} (${col.type.split(':')[0]})` }))); 
colSelect.value = currentSortCriteria[i]?.columnId || ''; criterionDiv.appendChild(colSelect); 
const dirSelect = document.createElement('select'); dirSelect.id = `sort-dir-${i}`; dirSelect.className = 'direction'; 
[{value: 'asc', text: _('asc')}, {value: 'desc', text: _('desc')}].forEach(dir => dirSelect.appendChild(Object.assign(document.createElement('option'),{ value: dir.value, textContent: dir.text })));
dirSelect.value = currentSortCriteria[i]?.direction || 'asc'; criterionDiv.appendChild(dirSelect);
const typeSelect = document.createElement('select'); typeSelect.id = `sort-type-${i}`; typeSelect.title = "Defines how this field will be treated/displayed on the card if used for special sorting (e.g., priority, deadline)"; [{value: '', text: '-- Normal --'}, {value: 'priority', text: _('priority')}, {value: 'dueDate', text: _('due_date')}].forEach(tp => { const opt = document.createElement('option'); opt.value = tp.value; opt.textContent = tp.text; typeSelect.appendChild(opt); }); 
typeSelect.value = currentSortCriteria[i]?.displayType || ''; criterionDiv.appendChild(typeSelect); 
cardSortCriteriaContainerEl.appendChild(criterionDiv); 
} 
} 
function getColumnIndex(dataKey) { const headerMap = { 'iniOrder': 1, 'labelName': 2, 'useFormatting': 3, 'card': 4, 'cardPosition': 5, 'showLabel': 6, 'visible': 7, 'editable': 8, 'position': 9 }; return headerMap[dataKey] || -1; } 
function createSelectAllCheckbox(columnKey) { 
const selectAllCb = document.createElement('input'); selectAllCb.type = 'checkbox'; selectAllCb.title = `Mark/Unmark all for ${columnKey}`; 
selectAllCb.onclick = function (e) { 
e.stopPropagation(); const isChecked = e.target.checked; const tableBody = fieldsTableContainerEl.querySelector('tbody'); const colIdx = getColumnIndex(columnKey); if (!tableBody || colIdx < 0) return; 
tableBody.querySelectorAll(`tr td:nth-child(${colIdx}) input[type="checkbox"]`).forEach(cb => { cb.checked = isChecked; }); 
}; 
return selectAllCb; 
} 
function updateSelectAllCheckboxState(headerCheckbox, columnKey) { 
if (!headerCheckbox) return; 
const tableBody = fieldsTableContainerEl.querySelector('tbody'); const colIdx = getColumnIndex(columnKey); 
if (!tableBody || !tableBody.hasChildNodes() || colIdx < 0) { if (headerCheckbox) { headerCheckbox.checked = false; headerCheckbox.indeterminate = false; } return; } 
const checkboxes = tableBody.querySelectorAll(`tr td:nth-child(${colIdx}) input[type="checkbox"]`); 
if (checkboxes.length === 0) { if (headerCheckbox) { headerCheckbox.style.display = 'none'; headerCheckbox.checked = false; headerCheckbox.indeterminate = false; } return; } else { if (headerCheckbox) headerCheckbox.style.display = ''; } 
const total = checkboxes.length; const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length; 
if (!headerCheckbox) return; 
if (checkedCount === 0) { headerCheckbox.checked = false; headerCheckbox.indeterminate = false; } else if (checkedCount === total) { headerCheckbox.checked = true; headerCheckbox.indeterminate = false; } else { headerCheckbox.checked = false; headerCheckbox.indeterminate = true; } 
} 

async function populateRefListFieldsConfigTable(container, parentFieldData, laneValue) { 
if (!parentFieldData.referencedTableId) { 
container.innerHTML = `<em>${_('no_ref_table')}</em>`; 
return; 
} 
const refTableSchema = await GristDataManager.getTableSchema(parentFieldData.referencedTableId); 
container.innerHTML = `<h5>${_('linked_columns_config')} (${refTableSchema.tableId})</h5>`; 
const table = document.createElement('table'); 
const thead = table.createTHead(); 
const headerRow = thead.insertRow(); 
["Linked Field", _('on_card'), _('card_position'), _('visible_drawer'), _('editable_drawer'), _('drawer_position')].forEach(txt => { 
const th = document.createElement('th'); 
th.textContent = txt; 
headerRow.appendChild(th); 
}); 
const tbody = table.createTBody(); 
const parentFieldConfig = WidgetConfigManager.getFieldConfigForLane(currentGristTableMeta.nameId, laneValue, parentFieldData.id); 

refTableSchema.columns.filter(c => c.id !== 'manualSort').forEach(col => { 
const childConfig = parentFieldConfig.refListFieldConfigs?.[col.id] || {}; 
const row = tbody.insertRow(); 
row.dataset.refFieldId = col.id; 

row.insertCell().textContent = `${col.label} (${col.id})`; 

const createCb = (checked) => { const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!checked; return cb; }; 
const createNum = (value) => { const num = document.createElement('input'); num.type = 'number'; num.min = '0'; num.value = value || 0; return num; }; 

row.insertCell().appendChild(createCb(childConfig.card)).dataset.key = 'card'; 
row.insertCell().appendChild(createNum(childConfig.cardPosition)).dataset.key = 'cardPosition'; 
row.insertCell().appendChild(createCb(childConfig.visible === undefined ? true : childConfig.visible)).dataset.key = 'visible'; 
row.insertCell().appendChild(createCb(childConfig.editable === undefined ? true : childConfig.editable)).dataset.key = 'editable'; 
row.insertCell().appendChild(createNum(childConfig.position)).dataset.key = 'position'; 
}); 
container.appendChild(table); 
} 

function populateFieldsTableForLane(laneValue, fromSavedDataOnly = false) { 
if (!currentGristTableMeta || !fieldsTableContainerEl) { console.warn("populateFieldsTableForLane: Table or field table container metadata not available."); if (fieldsTableContainerEl) fieldsTableContainerEl.innerHTML = `<p><i>${_('error_loading_fields')}</i></p>`; return; } 
const tableId = currentGristTableMeta.nameId; 
const kanbanStatusDefiningColumnId = WidgetConfigManager.getKanbanDefiningColumn(); 
const defaults = WidgetConfigManager.getDefaults(); 
let fieldsData = currentGristTableMeta.columns.map((col, index) => { 
let currentDataFromUI = {}; 
if (!fromSavedDataOnly && fieldsTableContainerEl.querySelector('tbody')) { 
const rowInUI = fieldsTableContainerEl.querySelector(`tbody tr[data-field-id="${col.id}"]`); 
if (rowInUI) { 
try { 
currentDataFromUI.useFormatting = rowInUI.cells[getColumnIndex('useFormatting') - 1].querySelector('input').checked; 
currentDataFromUI.card = rowInUI.cells[getColumnIndex('card') - 1].querySelector('input').checked; 
currentDataFromUI.cardPosition = parseInt(rowInUI.cells[getColumnIndex('cardPosition') - 1].querySelector('input').value, 10); 
currentDataFromUI.showLabel = rowInUI.cells[getColumnIndex('showLabel') - 1].querySelector('input').checked; 
currentDataFromUI.visible = rowInUI.cells[getColumnIndex('visible') - 1].querySelector('input').checked; 
currentDataFromUI.editable = rowInUI.cells[getColumnIndex('editable') - 1].querySelector('input').checked; 
currentDataFromUI.position = parseInt(rowInUI.cells[getColumnIndex('position') - 1].querySelector('input').value, 10); 
} catch (e) { console.warn("Error reading UI for field (populateFieldsTableForLane):", col.id, e); } 
} 
} 
const savedConfig = WidgetConfigManager.getFieldConfigForLane(tableId, laneValue, col.id); 
return { 
id: col.id, label: col.label, type: col.type, referencedTableId: col.referencedTableId, 
config: { 
useFormatting: currentDataFromUI.hasOwnProperty('useFormatting') && !fromSavedDataOnly ? currentDataFromUI.useFormatting : (savedConfig.useFormatting !== undefined ? savedConfig.useFormatting : defaults.useFormatting), 
card: currentDataFromUI.hasOwnProperty('card') && !fromSavedDataOnly ? currentDataFromUI.card : savedConfig.card, 
cardPosition: currentDataFromUI.hasOwnProperty('cardPosition') && !isNaN(currentDataFromUI.cardPosition) && !fromSavedDataOnly ? currentDataFromUI.cardPosition : (savedConfig.cardPosition !== undefined ? savedConfig.cardPosition : defaults.cardPosition), 
showLabel: currentDataFromUI.hasOwnProperty('showLabel') && !fromSavedDataOnly ? currentDataFromUI.showLabel : (savedConfig.showLabel !== undefined ? savedConfig.showLabel : defaults.showLabel), 
visible: currentDataFromUI.hasOwnProperty('visible') && !fromSavedDataOnly ? currentDataFromUI.visible : savedConfig.visible, 
editable: currentDataFromUI.hasOwnProperty('editable') && !fromSavedDataOnly ? currentDataFromUI.editable : savedConfig.editable, 
position: currentDataFromUI.hasOwnProperty('position') && !isNaN(currentDataFromUI.position) && !fromSavedDataOnly ? currentDataFromUI.position : (savedConfig.position !== undefined ? savedConfig.position : defaults.position), 
refListFieldConfigs: savedConfig.refListFieldConfigs || {}, 
}, 
iniOrder: index 
}; 
}).filter(data => data.id !== kanbanStatusDefiningColumnId); 
fieldsTableContainerEl.innerHTML = ''; 
if (typeof laneValue === 'undefined' || laneValue === "") { fieldsTableContainerEl.innerHTML = `<p><i>${_('select_lane_to_config')}</i></p>`; return; } 
const table = document.createElement('table'); 
const thead = table.createTHead(); const headerRow = thead.insertRow(); 
const headers = [ 
{ text: _('ini'), dataKey: 'iniOrder', sortable: true }, { text: _('field_name'), dataKey: 'labelName', sortable: true }, 
{ text: _('use_formatting'), dataKey: 'useFormatting', sortable: true, hasSelectAll: true }, { text: _('on_card'), dataKey: 'card', sortable: true, hasSelectAll: true }, 
{ text: _('card_position'), dataKey: 'cardPosition', sortable: true }, { text: _('show_label'), dataKey: 'showLabel', sortable: true, hasSelectAll: true }, 
{ text: _('visible_drawer'), dataKey: 'visible', sortable: true, hasSelectAll: true }, { text: _('editable_drawer'), dataKey: 'editable', sortable: true, hasSelectAll: true }, 
{ text: _('drawer_position'), dataKey: 'position', sortable: true } 
]; 
headers.forEach(headerInfo => { 
const th = document.createElement('th'); const span = document.createElement('span'); span.textContent = headerInfo.text; th.appendChild(span); 
if (headerInfo.hasSelectAll) { th.appendChild(document.createElement('br')); th.appendChild(createSelectAllCheckbox(headerInfo.dataKey)); } 
if (headerInfo.sortable) { th.style.cursor = 'pointer'; th.onclick = (e) => { if (e.target.type === 'checkbox') return; const newDirection = (configSortState.columnKey === headerInfo.dataKey && configSortState.direction === 'asc') ? 'desc' : 'asc'; configSortState = { columnKey: headerInfo.dataKey, direction: newDirection }; populateFieldsTableForLane(laneValue, false); }; if (configSortState.columnKey === headerInfo.dataKey) { span.textContent += (configSortState.direction === 'asc' ? ' ▲' : ' ▼'); } } 
headerRow.appendChild(th); 
}); 
fieldsData.sort((a, b) => { 
let valA, valB; const key = configSortState.columnKey; 
if (key === 'iniOrder') { valA = a.iniOrder; valB = b.iniOrder; } else if (key === 'labelName') { valA = a.label.toLowerCase(); valB = b.label.toLowerCase(); } else if (key === 'cardPosition' || key === 'position') { valA = a.config[key]; valB = b.config[key];} else { valA = a.config[key]; valB = b.config[key];} 
if (typeof valA === 'boolean' && typeof valB === 'boolean') { valA = valA ? 1: 0; valB = valB ? 1 : 0; } 
if (valA < valB) return configSortState.direction === 'asc' ? -1 : 1; if (valA > valB) return configSortState.direction === 'asc' ? 1 : -1; if (key !== 'iniOrder') { return a.iniOrder - b.iniOrder; } return 0; 
}); 
const tbody = table.createTBody(); 
fieldsData.forEach(data => { 
const row = tbody.insertRow(); row.dataset.fieldId = data.id; 
row.insertCell().textContent = data.iniOrder; 
row.insertCell().textContent = `${data.label} (${data.id})`; 
let cell, cb, numInput; 
const createCb = (flagKey, checked, colKeyForSelectAll) => { cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = checked; cb.dataset.flagKey = flagKey; cb.onchange = () => { updateSelectAllCheckboxState(fieldsTableContainerEl.querySelector(`th input[type="checkbox"][title*="${colKeyForSelectAll}"]`), colKeyForSelectAll); }; return cb; }; 
cell = row.insertCell(); cell.appendChild(createCb('useFormatting', data.config.useFormatting, 'useFormatting')); 
cell = row.insertCell(); cell.appendChild(createCb('card', data.config.card, 'card')); 
cell = row.insertCell(); numInput = document.createElement('input'); numInput.type = 'number'; numInput.min = '0'; numInput.value = data.config.cardPosition; numInput.dataset.fieldKey = 'cardPosition'; cell.appendChild(numInput); 
cell = row.insertCell(); cell.appendChild(createCb('showLabel', data.config.showLabel, 'showLabel')); 
cell = row.insertCell(); cell.appendChild(createCb('visible', data.config.visible, 'visible')); 
cell = row.insertCell(); cell.appendChild(createCb('editable', data.config.editable, 'editable')); 
cell = row.insertCell(); numInput = document.createElement('input'); numInput.type = 'number'; numInput.min = '0'; numInput.value = data.config.position; numInput.dataset.fieldKey = 'position'; cell.appendChild(numInput); 

if (data.type.startsWith('RefList')) { 
const configRow = tbody.insertRow(); 
configRow.dataset.refConfigRowFor = data.id; 
const configCell = configRow.insertCell(); 
configCell.colSpan = headers.length; 
const configContainer = document.createElement('div'); 
configContainer.className = 'reflist-config-container'; 
configCell.appendChild(configContainer); 
populateRefListFieldsConfigTable(configContainer, data, laneValue); 
} 
}); 
fieldsTableContainerEl.appendChild(table); 
headers.forEach(headerInfo => { if (headerInfo.hasSelectAll) { const headerCheckbox = fieldsTableContainerEl.querySelector(`th input[type="checkbox"][title*="${headerInfo.dataKey}"]`); if (headerCheckbox) updateSelectAllCheckboxState(headerCheckbox, headerInfo.dataKey); } }); 
} 

function handleSaveConfiguration() { 
console.log("CUIB.handleSaveConfiguration: Starting save..."); if (!currentGristTableMeta) { console.warn("CUIB.handleSaveConfiguration: Attempted to save config without table metadata."); alert("Error: Table metadata not available for saving."); return; } const tableId = currentGristTableMeta.nameId; const selectedLaneValue = laneSelectEl.value; if (selectedLaneValue && fieldsTableContainerEl.querySelector('tbody')) { const tableRows = fieldsTableContainerEl.querySelectorAll('tbody tr[data-field-id]'); tableRows.forEach(row => { const fieldId = row.dataset.fieldId; if (!fieldId) return; const newFieldCfg = { useFormatting: row.cells[getColumnIndex('useFormatting') - 1].querySelector('input').checked, card: row.cells[getColumnIndex('card') - 1].querySelector('input').checked, cardPosition: parseInt(row.cells[getColumnIndex('cardPosition') - 1].querySelector('input').value, 10) || 0, showLabel: row.cells[getColumnIndex('showLabel') - 1].querySelector('input').checked, visible: row.cells[getColumnIndex('visible') - 1].querySelector('input').checked, editable: row.cells[getColumnIndex('editable') - 1].querySelector('input').checked, position: parseInt(row.cells[getColumnIndex('position') - 1].querySelector('input').value, 10) || 0, refListFieldConfigs: {} }; 
const refConfigRow = fieldsTableContainerEl.querySelector(`tbody tr[data-ref-config-row-for="${fieldId}"]`); 
if (refConfigRow) { 
refConfigRow.querySelectorAll('tbody tr[data-ref-field-id]').forEach(refRow => { 
const refFieldId = refRow.dataset.refFieldId; 
const refFieldConfig = { fieldId: refFieldId }; 
refRow.querySelectorAll('td[data-key]').forEach(cell => { 
const input = cell.querySelector('input'); 
const key = cell.dataset.key; 
refFieldConfig[key] = input.type === 'checkbox' ? input.checked : (parseInt(input.value, 10) || 0); 
}); 
newFieldCfg.refListFieldConfigs[refFieldId] = refFieldConfig; 
}); 
} 
WidgetConfigManager.updateFieldConfigForLane(tableId, selectedLaneValue, fieldId, newFieldCfg); }); } 
if (definingColumnMapSelectEl) WidgetConfigManager.setKanbanDefiningColumn(definingColumnMapSelectEl.value || null); if (restrictAdjacentMoveCbEl) WidgetConfigManager.setRestrictAdjacentMove(restrictAdjacentMoveCbEl.checked); if (wipLimitsTableContainerEl) { wipLimitsTableContainerEl.querySelectorAll('input[type="number"][data-lane-value]').forEach(input => { const laneVal = input.dataset.laneValue; const limitType = input.dataset.limitType; const val = parseInt(input.value, 10) || 0; const limits = WidgetConfigManager.getLaneWipLimit(laneVal); if (limitType === 'maxVisible') limits.maxVisible = val; else if (limitType === 'maxAllowed') limits.maxAllowed = val; } if (cardSortCriteriaContainerEl) { const newSortCriteria = []; for (let i = 0; i < 3; i++) { newSortCriteria.push({ columnId: cardSortCriteriaContainerEl.querySelector(`#sort-col-${i}`)?.value || null, direction: cardSortCriteriaContainerEl.querySelector(`#sort-dir-${i}`)?.value || 'asc', displayType: cardSortCriteriaContainerEl.querySelector(`#sort-type-${i}`)?.value || '' }); } WidgetConfigManager.setCardSortCriteria(newSortCriteria); } 
WidgetConfigManager.setVisualConfig({ centerColumns: centerColumnsCb.checked, columnWidthPercent: Number(colWidthPercentInput.value) || 0, columnMinWidth: Number(colMinWidthInput.value) || 0, columnMaxWidth: Number(colMaxWidthInput.value) || 0, columnColor: colColorInput.value, cardColor: cardColorInput.value, cardShadow: cardShadowInput.checked, backgroundType: cfgBackgroundTypeSelect.value, solidBackgroundColor: cfgSolidBgColorInput.value, gradientColor1: cfgGradientColor1Input.value, gradientColor2: cfgGradientColor2Input.value, gradientDirection: cfgGradientDirectionSelect.value, drawerFontColor: cfgDrawerFontColorInput.value, cardTitleFontColor: cfgCardTitleFontColorInput.value, cardFieldsFontColor: cfgCardFieldsFontColorInput.value }); 
const newRulesConfig = {}; 
if (rulesConfigAreaEl) { 
rulesConfigAreaEl.querySelectorAll('.rules-lane-section').forEach(laneSection => { 
const laneVal = laneSection.dataset.laneValue; 
newRulesConfig[laneVal] = [];
laneSection.querySelectorAll('.rule-item').forEach((ruleItem, ruleIndex) => { 
const ruleType = ruleItem.querySelector('.rule-type').value; const ruleId = ruleItem.dataset.ruleId || `rule_${laneVal}_${ruleIndex}`; let ruleData = { id: ruleId, type: ruleType }; 
if (ruleType === 'allow') { ruleData.fieldId = ruleItem.querySelector('.rule-param-field')?.value || null; ruleData.operator = ruleItem.querySelector('.rule-param-operator')?.value || null; ruleData.value = ruleItem.querySelector('.rule-param-value')?.value || ''; } 
else if (ruleType === 'create') { ruleData.targetTableId = ruleItem.querySelector('.rule-param-target-table')?.value || null; ruleData.relationFieldIdInTarget = ruleItem.querySelector('.rule-param-relation-field')?.value || null; ruleData.targetColumnIdForLane = ruleItem.querySelector('.rule-param-target-lane-column')?.value || null; ruleData.initialLaneValue = ruleItem.querySelector('.rule-param-initial-lane-value')?.value || null; } 
else if (ruleType === 'move') { ruleData.fieldId = ruleItem.querySelector('.rule-param-field-move')?.value || null; ruleData.operator = ruleItem.querySelector('.rule-param-operator-move')?.value || null; ruleData.value = ruleItem.querySelector('.rule-param-value-move')?.value || ''; ruleData.targetLaneValue = ruleItem.querySelector('.rule-param-target-lane')?.value || null; } 
if (ruleData.type && (ruleData.fieldId || ruleData.targetTableId || ruleData.targetLaneValue)) { newRulesConfig[laneVal].push(ruleData); } 
}); 
}); 
} 
WidgetConfigManager.setAllRules(newRulesConfig); 
console.log("CUIB.handleSaveConfiguration: Calling onSaveCallback..."); if (onSaveCallback) { onSaveCallback() .then(() => { console.log("CUIB.handleSaveConfiguration: onSaveCallback completed successfully."); alert("Settings saved and widget reloaded!"); }) .catch(err => { console.error("CUIB.handleSaveConfiguration: ERROR in onSaveCallback:", err); alert("Error saving or reloading: " + err.message); }); } else { console.error("CUIB.handleSaveConfiguration: onSaveCallback not defined!"); alert("ERROR: Main save function not found!"); }
}

function handleReplicateSelection() {
try {
const currentLane = laneSelectEl.value;
if (!currentLane || !fieldsTableContainerEl.querySelector('tbody tr')) {
alert("Please select a source lane that has a visible fields configuration before replicating.");
return;
}

const sourceConfig = {};
fieldsTableContainerEl.querySelectorAll('tbody tr[data-field-id]').forEach(row => { 
const fieldId = row.dataset.fieldId; 
if (!fieldId) return; 

const cfg = { 
useFormatting: row.cells[getColumnIndex('useFormatting') - 1].querySelector('input').checked, 
card: row.cells[getColumnIndex('card') - 1].querySelector('input').checked, 
cardPosition: parseInt(row.cells[getColumnIndex('cardPosition') - 1].querySelector('input').value, 10) || 0, 
showLabel: row.cells[getColumnIndex('showLabel') - 1].querySelector('input').checked, 
visible: row.cells[getColumnIndex('visible') - 1].querySelector('input').checked, 
editable: row.cells[getColumnIndex('editable') - 1].querySelector('input').checked, 
position: parseInt(row.cells[getColumnIndex('position') - 1].querySelector('input').value, 10) || 0, 
refListFieldConfigs: {} 
}; 

const refConfigRow = fieldsTableContainerEl.querySelector(`tbody tr[data-ref-config-row-for="${fieldId}"]`); 
if (refConfigRow) { 
refConfigRow.querySelectorAll('tbody tr[data-ref-field-id]').forEach(refRow => { 
const refFieldId = refRow.dataset.refFieldId; 
const refFieldConfig = { fieldId: refFieldId }; 
refRow.querySelectorAll('td[data-key]').forEach(cell => { 
const input = cell.querySelector('input'); 
const key = cell.dataset.key; 
refFieldConfig[key] = input.type === 'checkbox' ? input.checked : (parseInt(input.value, 10) || 0); 
}); 
cfg.refListFieldConfigs[refFieldId] = refFieldConfig; 
}); 
} 
sourceConfig[fieldId] = cfg; 
}); 

const modal = document.createElement('div'); 
modal.className = 'replicate-modal'; 
modal.innerHTML = ` <div class="replicate-content"> <h3>Replicate FIELD configuration for which lanes?</h3> <label><input type="checkbox" id="rep-all" /> Mark all</label> <div id="rep-list" style="margin:8px 0; max-height: 2 00px; overflow-y:auto;"></div> <button id="rep-ok">OK</button> <button id="rep-cancel">Cancel</button> </div>`; 
document.body.appendChild(modal); 

const list = modal.querySelector('#rep-list'); 
currentKanbanLanes.filter(l => !l.isUnmatched && l.value !== currentLane).forEach(lane => { 
const cbDiv = document.createElement('div'); 
const cb = document.createElement('input'); 
cb.type = 'checkbox'; 
cb.value = lane.value; 
cb.id = `rep-cb-${lane.value}`; 
cb.className = 'rep-cb'; 
const lbl = document.createElement('label'); 
lbl.htmlFor = `rep-cb-${lane.value}`; 
lbl.appendChild(document.createTextNode(` ${lane.value || "[Empty]"}`)); 
cbDiv.appendChild(cb); 
cbDiv.appendChild(lbl); 
list.appendChild(cbDiv); 
}); 

modal.querySelector('#rep-all').onchange = e => { list.querySelectorAll('input.rep-cb').forEach(cb => cb.checked = e.target.checked); }; 
modal.querySelector('#rep-cancel').onclick = () => document.body.removeChild(modal); 
modal.querySelector('#rep-ok').onclick = () => { 
const targets = Array.from(list.querySelectorAll('input.rep-cb:checked')).map(cb => cb.value);
if (targets.length === 0) {
alert("No lanes selected to replicate.");
return;
}
const tableId = currentGristTableMeta.nameId;
targets.forEach(lv => {
Object.entries(sourceConfig).forEach(([fid, cfg]) => {
WidgetConfigManager.updateFieldConfigForLane(tableId, lv, fid, cfg);
});
});
alert(`FIELD configuration for lane "${currentLane}" replicated to: ${targets.join(', ')}. Save the settings to persist.`);
document.body.removeChild(modal);
};
} catch (error) {
console.error("Error trying to replicate configuration:", error);
alert("An error occurred while trying to open the replication dialog. Make sure a source lane is selected and its configuration is visible.");
}
}
const closeDrawer = () => { if (drawerEl) drawerEl.classList.remove('visible'); };

return { init, populateAndOpen, close: closeDrawer };
})();

/*****************************************************************
* 2. Kanban Logic (Main)
*****************************************************************/
(async function main() {
let isInitialLoad = true;

const pal = ["#1E88E5", "#43A047", "#FB8C00", "#E53935", "#8E24AA", "#00838F", "#6D4C41", "#546E7A"]; 
const palette = i => pal[i % pal.length]; 
const dbg = document.getElementById('dbg'); 
const boardEl = document.getElementById('board'); 
const errEl = document.getElementById('errorMsg'); 
const editDrawerEl = document.getElementById('drawer'); 
const editDrawerTitleEl = document.getElementById('drawerTitle'); 
const editDrawerContentEl = document.getElementById('drawerContent'); 
const editDrawerSaveBtn = document.getElementById('saveBtn'); 
const editDrawerCloseBtn = document.getElementById('closeBtn'); 
const editDrawerCancelBtn = document.getElementById('cancelBtnDrawer'); 
const cfgBtn = document.getElementById('cfg-btn'); 
if (dbg) dbg.onclick = () => dbg.classList.toggle('collapsed'); 
const safe = (o, k, f = null) => (o && k in o && o[k] !== undefined && o[k] !== null) ? o[k] : f; 
let gristTableMeta = null, gristRows = [], allGristTables = [], gristTableOps = null, kanbanLanesStructure = [], currentEditingCardId = null, currentEditingCardData = null, currentVisibleCardsByLane = {}, refListCache = {}; 

function formatEpoch(val, type) { const num = Number(val); if (isNaN(num) || num === 0) { return val; } const dateObj = new Date(num * 1000); if (isNaN(dateObj.valueOf())) return val; return type === 'Date' ? dateObj.toLocaleDateString(undefined, { timeZone: 'UTC' }) : dateObj.toLocaleString(undefined, { timeZone: 'UTC' }); } 

async function findBackReferenceColumn(tableA_Id, tableB_Schema) { 
const expectedRefType = `Ref:${tableA_Id}`; 
const col = tableB_Schema.columns.find(c => c.type === expectedRefType); 
if (col) return col.id; 
throw new Error(`Could not find a column in table '${tableB_Schema.tableId}' that references '${tableA_Id}'. Is the link two-way?`); 
} 

async function populateRefListTable(containerEl, colDef, refListValue) { 
containerEl.innerHTML = '<p>Loading linked records...</p>'; 
try { 
const tableA_Id = gristTableMeta.nameId; 
const tableB_Id = colDef.referencedTableId; 
const linkedRecordIds = Array.isArray(refListValue) && refListValue[0] === 'L' ? refListValue.slice(1) : []; 
const [tableB_Schema, allRefTableRecords] = await Promise.all([ GristDataManager.getTableSchema(tableB_Id), GristDataManager.colToRows(await grist.docApi.fetchTable(tableB_Id)) ]); 
const backRefColId = await findBackReferenceColumn(tableA_Id, tableB_Schema); 
const linkedRecords = allRefTableRecords.filter(r => linkedRecordIds.includes(r.id)); 
containerEl.innerHTML = ''; 

const controlsDiv = document.createElement('div'); controlsDiv.style.marginBottom = '8px'; 
const addBtn = document.createElement('button'); addBtn.textContent = '+ Add New'; 
addBtn.onclick = () => handleRefListRecordAction(containerEl, colDef, tableB_Schema, backRefColId, null); 
controlsDiv.append(addBtn); 
containerEl.appendChild(controlsDiv); 

const table = document.createElement('table'); table.className = 'wip-limit-table'; containerEl.appendChild(table); 
const thead = table.createTHead(); const headerRow = thead.insertRow(); 

const laneValue = String(safe(currentEditingCardData, WidgetConfigManager.getKanbanDefiningColumn(), "")); 
const parentConfig = WidgetConfigManager.getFieldConfigForLane(gristTableMeta.nameId, laneValue, colDef.id); 

const columnsToShow = tableB_Schema.columns 
.filter(c => { 
const childConfig = parentConfig.refListFieldConfigs?.[c.id] || { visible: true }; 
return childConfig.visible !== false && c.id !== backRefColId && c.id !== 'manualSort'; 
}) 
.sort((a,b) => { 
const posA = parentConfig.refListFieldConfigs?.[a.id]?.position ?? 99; 
const posB = parentConfig.refListFieldConfigs?.[b.id]?.position ?? 99; 
return posA - posB; 
}); 

columnsToShow.forEach(c => { headerRow.insertCell().textContent = c.label; }); 
headerRow.insertCell().textContent = 'Actions'; 

const tbody = table.createTBody(); 
if (linkedRecords.length === 0) { 
const emptyRow = tbody.insertRow(); 
const emptyCell = emptyRow.insertCell(); 
emptyCell.colSpan = columnsToShow.length + 1; 
emptyCell.textContent = 'No records linked.'; 
emptyCell.style.textAlign = 'center'; emptyCell.style.fontStyle = 'italic'; 
} else { 
linkedRecords.forEach(rec => { 
const tr = tbody.insertRow(); tr.dataset.recordId = rec.id; 
columnsToShow.forEach(c => { 
const cell = tr.insertCell(); 
if (c.type === 'Bool') { 
const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!rec[c.id]; cb.disabled = true; cell.appendChild(cb); 
} else { 
cell.textContent = safe(rec, c.id, ''); 
} 
}); 
const cellActions = tr.insertCell(); 
const editBtn = document.createElement('button'); editBtn.className = 'reflist-action-btn'; editBtn.textContent = '✏️'; editBtn.title = 'Edit'; 
editBtn.onclick = () => handleRefListRecordAction(containerEl, colDef, tableB_Schema, backRefColId, rec); 
const unlinkBtn = document.createElement('button'); unlinkBtn.className = 'reflist-action-btn'; unlinkBtn.textContent = '🗑️'; unlinkBtn.title = 'Unlink'; 
unlinkBtn.onclick = () => handleRefListUnlink_Single(containerEl, colDef, tableB_Schema, backRefColId, rec.id); 
cellActions.append(editBtn, unlinkBtn); 
}); 
} 
} catch (err) { 
console.error("Failed to populate RefList table:", err); 
containerEl.innerHTML = `<p style="color:red;">Error loading list: ${err.message}</p>`; 
} 
} 

async function handleRefListRecordAction(containerEl, colDef, tableB_Schema, backRefColId, recordToEdit = null) { 
const isEditing = recordToEdit !== null; 
const modalTitle = isEditing ? `Edit in "${tableB_Schema.tableId}"` : `Add in "${tableB_Schema.tableId}"`; 
const modal = document.createElement('div'); modal.className = 'replicate-modal'; 
const content = document.createElement('div'); content.className = 'replicate-content'; content.style.width = '500px'; 
modal.appendChild(content); content.innerHTML = `<h3>${modalTitle}</h3>`; 
const form = document.createElement('div'); form.id = 'reflist-add-form'; content.appendChild(form); 

const laneValue = String(safe(currentEditingCardData, WidgetConfigManager.getKanbanDefiningColumn(), "")); 
const parentConfig = WidgetConfigManager.getFieldConfigForLane(gristTableMeta.nameId, laneValue, colDef.id); 

tableB_Schema.columns 
.filter(c => { 
const childConfig = parentConfig.refListFieldConfigs?.[c.id] || { visible: true }; 
return childConfig.visible !== false && !c.isFormula && c.id !== backRefColId && c.id !== 'id' && c.id !== 'manualSort'; 
}) 
.sort((a, b) => { 
const posA = parentConfig.refListFieldConfigs?.[a.id]?.position ?? 99; 
const posB = parentConfig.refListFieldConfigs?.[b.id]?.position ?? 99; 
return posA - posB; 
}) 
.forEach(c => { 
const childConfig = parentConfig.refListFieldConfigs?.[c.id] || { editable: true }; 
const fieldContainer = document.createElement('div'); fieldContainer.style.marginBottom = '10px'; 
const label = document.createElement('label'); label.textContent = c.label; label.style.display = 'block'; label.style.fontWeight = 'bold'; 

let input; 
const isEditable = childConfig.editable !== false; 

if (!isEditable) { 
input = document.createElement('div'); 
input.className = 'readonly-field'; 
input.textContent = isEditing ? (recordToEdit[c.id] || '') : '[Not editable]'; 
} else if (c.choices && c.choices.length > 0) { 
input = document.createElement('select'); input.add(new Option('-- Select --', '')); 
c.choices.forEach(ch => input.add(new Option(ch, ch))); 
if (isEditing) input.value = recordToEdit[c.id] || ''; 
} else if (c.type === 'Bool') { 
input = document.createElement('input'); input.type = 'checkbox'; 
if (isEditing) input.checked = recordToEdit[c.id] || false; 
} else { 
input = document.createElement('input'); input.type = 'text'; 
if (isEditing) input.value = recordToEdit[c.id] || ''; 
} 
input.dataset.colId = c.id; 
if(isEditable) { input.style.width = '100%'; input.style.padding = '4px'; } 
fieldContainer.append(label, input); 
form.appendChild(fieldContainer); 
}); 

const actions = document.createElement('div'); actions.style.marginTop = '15px'; 
const saveBtn = document.createElement('button'); saveBtn.textContent = 'Save'; 
const cancelBtn = document.createElement('button'); cancelBtn.textContent = 'Cancel'; cancelBtn.style.marginLeft = '8px'; 
actions.append(saveBtn, cancelBtn); content.appendChild(actions); 
document.body.appendChild(modal); 

cancelBtn.onclick = () => document.body.removeChild(modal); 
saveBtn.onclick = async() => { 
try { 
saveBtn.disabled = true; saveBtn.textContent = 'Saving...'; 
const fieldsToSave = {}; 
form.querySelectorAll('[data-col-id]').forEach(inp => { 
if (!inp.closest('.readonly-field')) { 
fieldsToSave[inp.dataset.colId] = (inp.type === 'checkbox') ? inp.checked : inp.value; 
} 
}); 

if (!isEditing) { fieldsToSave[backRefColId] = currentEditingCardId; } 
const tableB_Ops = grist.getTable(tableB_Schema.tableId); 
if (isEditing) { 
await tableB_Ops.update([{ id: recordToEdit.id, fields: fieldsToSave }]); 
} else { 
await tableB_Ops.create([{ fields: fieldsToSave }]); 
} 

const rawData = await grist.docApi.fetchTable(gristTableMeta.nameId, [currentEditingCardId]); 
const updatedRecords = GristDataManager.colToRows(rawData); 
if (updatedRecords.length > 0) { 
const updatedMainRecord = updatedRecords[0]; 
currentEditingCardData = updatedMainRecord; 
await populateRefListTable(containerEl, colDef, updatedMainRecord[colDef.id]); 
} 

document.body.removeChild(modal); 
} catch (err) {
alert(`Error saving: ${err.message}`);
console.error("Error saving RefList record:", err);
saveBtn.disabled = false; saveBtn.textContent = 'Save';
}
};
}

async function handleRefListUnlink_Single(containerEl, colDef, tableB_Schema, backRefColId, recordIdToUnlink) {
if (!confirm(`Are you sure you want to unlink this item? It will not be deleted, just unassociated with this card.`)) { return; }
try {
const tableB_Ops = grist.getTable(tableB_Schema.tableId);
await tableB_Ops.update([{ id: recordIdToUnlink, fields: { [backRefColId]: null } }]); 

const rawData = await grist.docApi.fetchTable(gristTableMeta.nameId, [currentEditingCardId]); 
const update dRecords = GristDataManager.colToRows(rawData); 
if (updatedRecords.length > 0) { 
const updatedMainRecord = updatedRecords[0]; 
currentEditingCardData = updatedMainRecord; 
await populateRefListTable(containerEl, colDef, updatedMainRecord[colDef.id]); 
} 

} catch (err) { 
alert(`Error unlinking: ${err.message}`); 
console.error("Error unlinking RefList record:", err); 
} 
} 

function getFieldDisplayConfig(gristFieldId, cardLaneValue) { if (!gristTableMeta || !gristFieldId || typeof cardLaneValue === 'undefined') { return { ...WidgetConfigManager.getDefaults(), visible: false, card: false }; } return WidgetConfigManager.getFieldConfigForLane(gristTableMeta.nameId, String(cardLaneValue), gristFieldId); } 
function applyStylesFromWidgetOptions(element, fieldDef, fieldValue, isLabel = false) { 
if (!element || !fieldDef || !fieldDef.widgetOptions) return; 
const wo = fieldDef.widgetOptions; let styleToApply = {}; 
if (isLabel) { if (wo.headerFillColor) styleToApply.backgroundColor = wo.headerFillColor; if (wo.headerTextColor) styleToApply.color = wo.headerTextColor; if (wo.headerFontBold) styleToApply.fontWeight = 'bold'; if (wo.headerFontItalic) styleToApply.fontStyle = 'italic'; if (wo.headerFontUnderline) styleToApply.textDecoration = 'underline'; 
} else { 
if (wo.fillColor) styleToApply.backgroundColor = wo.fillColor; if (wo.textColor) styleToApply.color = wo.textColor; if (wo.fontBold) styleToApply.fontWeight = 'bold'; if (wo.fontItalic) styleToApply.fontStyle = 'italic'; if (wo.fontUnderline) styleToApply.textDecoration = 'underline'; 
if ((fieldDef.type === 'Choice' || fieldDef.type === 'ChoiceList') && wo.choiceOptions && fieldValue && wo.choiceOptions[String(fieldValue)]) { const choiceStyle = wo.choiceOptions[String(fieldValue)]; if (choiceStyle.fillColor) styleToApply.backgroundColor = choiceStyle.fillColor; if (choiceStyle.textColor) styleToApply.color = choiceStyle.textColor; if (typeof choiceStyle.fontBold !== 'undefined') styleToApply.fontWeight = choiceStyle.fontBold ? 'bold' : (wo.fontBold ? 'bold' : 'normal'); if (typeof choiceStyle.fontItalic !== 'undefined') styleToApply.fontStyle = choiceStyle.fontItalic ? 'italic' : (wo.fontItalic ? 'italic' : 'normal'); if (typeof choiceStyle.fontUnderline !== 'undefined') styleToApply.textDecoration = choiceStyle.fontUnderline ? 'underline' : 'none'; 
} else if (fieldDef.type === 'Rules' && wo.rulesOptions && Array.isArray(wo.rulesOptions)) { const matchingRule = wo.rulesOptions.find(rule => { return false; }); if (matchingRule && matchingRule.style) { if (matchingRule.style.textColor) styleToApply.color = matchingRule.style.textColor; if (matchingRule.style.fillColor) styleToApply.backgroundColor = matchingRule.style.fillColor; } } 
} 
Object.assign(element.style, styleToApply); 
} 

function createCardElement(cardData, cardLaneValue) { 
const cardDiv = document.createElement('div'); cardDiv.className = 'card'; cardDiv.dataset.cardId = cardData.id; 
const vis = WidgetConfigManager.getVisualConfig(); 
if (vis.cardColor) cardDiv.style.background = vis.cardColor; 
if (vis.cardShadow) { cardDiv.classList.add('with-shadow'); } else { cardDiv.classList.remove('with-shadow'); cardDiv.style.boxShadow = 'none'; } 
if (vis.cardFieldsFontColor) { cardDiv.style.color = vis.cardFieldsFontColor; } 

const laneInfo = kanbanLanesStructure.find(l => l.value === cardLaneValue) || { color: "#ccc" }; cardDiv.style.setProperty('--card-status-color', laneInfo.color); const sortCrit = WidgetConfigManager.getCardSortCriteria(); const prioCrit = sortCrit.find(c => c.displayType === 'priority' && c.columnId); if (prioCrit) { const fieldDef = gristTableMeta.columns.find(c => c.id === prioCrit.columnId); const raw = safe(cardData, prioCrit.columnId, ''); const el = document.createElement('div'); el.className = 'card-priority'; el.textContent = raw ?? ''; if (fieldDef) applyStylesFromWidgetOptions(el, fieldDef, raw, false); cardDiv.appendChild(el); } const dueCrit = sortCrit.find(c => c.displayType === 'dueDate' && c.columnId); if (dueCrit) { const fieldDef = gristTableMeta.columns.find(c => c.id === dueCrit.columnId); let rawVal = safe(cardData, dueCrit.columnId, ''); let displayVal = rawVal; if (fieldDef && (fieldDef.type === 'Date' || fieldDef.type === 'DateTime')) { displayVal = formatEpoch(rawVal, fieldDef.type); } const el2 = document.createElement('div'); el2.className = 'card-dueDate'; el2.textContent = displayVal ?? ''; if (fieldDef) applyStylesFromWidgetOptions(el2, fieldDef, rawVal, false); cardDiv.appendChild(el2); } 
let fieldsOnCardRaw = gristTableMeta.columns.map(col => ({ colDef: col, config: getFieldDisplayConfig(col.id, cardLaneValue) })).filter(item => item.config.card && item.colDef.id !== WidgetConfigManager.getKanbanDefiningColumn()).sort((a, b) => (a.config.cardPosition ?? 999) - (b.config.cardPosition ?? 999)); 
let titleItemConfig = null; const idx0 = fieldsOnCardRaw.findIndex(i => i.config.cardPosition === 0); if (idx0 !== -1) titleItemConfig = fieldsOnCardRaw.splice(idx0, 1)[0]; else if (fieldsOnCardRaw.length > 0 && fieldsOnCardRaw[0].config.cardPosition > 0) titleItemConfig = fieldsOnCardRaw.shift(); 

const titleEl = document.createElement('div'); titleEl.className = 'card-title'; 
if (vis.cardTitleFontColor) { titleEl.style.color = vis.cardTitleFontColor; } 
if (titleItemConfig) { const colDef = titleItemConfig.colDef; let titleValueToDisplay = safe(cardData, colDef.id); if (colDef.type.startsWith('Ref') && colDef.displayColId) { titleValueToDisplay = safe(cardData, colDef.displayColId, ''); if (safe(cardData, colDef.id) === 0 || String(titleValueToDisplay).startsWith("E,Invalid")) { titleValueToDisplay = `[${colDef.label}]`; } } else if (!colDef.type.startsWith('Ref') && (colDef.type === 'Date' || colDef.type === 'DateTime')) { titleValueToDisplay = formatEpoch(safe(cardData, colDef.id), colDef.type); } titleEl.textContent = titleValueToDisplay ?? `[${colDef.label}]`; if (titleItemConfig.config.useFormatting) { applyStylesFromWidgetOptions(titleEl, colDef, safe(cardData, colDef.id), false); } } else { titleEl.textContent = `Card ${cardData.id}`; } 
cardDiv.appendChild(titleEl); 

fieldsOnCardRaw.forEach(item => { 
const fieldDiv = document.createElement('div'); fieldDiv.className = 'card-field'; 
const colDef = item.colDef; 
let rawValueFromGrist = safe(cardData, colDef.id); 
if (item.config.showLabel) { 
const lab = document.createElement('span'); 
lab.className = 'label'; 
lab.textContent = `${colDef.label}: `; 
if (item.config.useFormatting) { 
applyStylesFromWidgetOptions(lab, colDef, rawValueFromGrist, true); 
} 
fieldDiv.appendChild(lab); 
} 

let fieldEl; 
if (colDef.type.startsWith('RefList')) { 
fieldEl = document.createElement('div'); 
const linkedRecordIds = Array.isArray(rawValueFromGrist) && rawValueFromGrist[0] === 'L' ? rawValueFromGrist.slice(1) : []; 
const refTableId = colDef.referencedTableId; 
const linkedRecords = refListCache.data?.[refTableId]?.filter(r => linkedRecordIds.includes(r.id)) || []; 

if (item.config.useFormatting && linkedRecords.length > 0 && refListCache.schemas[refTableId]) { 
fieldEl.className = 'card-reflist-wrapper'; 
const table = document.createElement('table'); 
table.className = 'card-reflist-table'; 
const thead = table.createTHead(); 
const headerRow = thead.insertRow(); 

const refTableSchema = refListCache.schemas[refTableId]; 
const childColConfigs = item.config.refListFieldConfigs || {}; 
const childColsToShow = Object.values(childColConfigs) 
.filter(c => c.card) 
.sort((a, b) => (a.cardPosition || 99) - (b.cardPosition || 99)) 
.map(c => refTableSchema.columns.find(sc => sc.id === c.fieldId)) 
.filter(Boolean); 

if (childColsToShow.length > 0) { 
childColsToShow.forEach(cc => headerRow.insertCell().textContent = cc.label); 
const tbody = table.createTBody(); 
linkedRecords.forEach(rec => { 
const tr = tbody.insertRow(); 
childColsToShow.forEach(cc => tr.insertCell().textContent = safe(rec, cc.id, '')); 
}); 
fieldEl.appendChild(table); 
} else { 
fieldEl.textContent = `${linkedRecords.length} linked item(s)`; 
} 
} else { 
if (linkedRecords.length > 0 && refListCache.schemas[refTableId]) { 
const refTableSchema = refListCache.schemas[refTableId]; 
const displayCol = refTableSchema.columns.find(c => c.id === refTableSchema.primaryColId) || refTableSchema.columns.find(c => c.type === 'Text') || refTableSchema.columns[1] || { id: 'id' }; 
const names = linkedRecords.map(r => safe(r, displayCol.id, `ID ${r.id}`)).join(', '); 
fieldEl.textContent = names; 
} else { 
fieldEl.textContent = `[${_('none')}]`; 
fieldEl.style.fontStyle = 'italic'; 
} 
} 
} else { 
let displayValue = rawValueFromGrist; 
if (colDef.type.startsWith('Ref:') && colDef.displayColId) { displayValue = safe(cardData, colDef.displayColId, ''); if (rawValueFromGrist === 0 || String(displayValue).startsWith("E,Invalid")) { displayValue = `[${_('none')}]`; } } 
else if (colDef.type.startsWith('Ref:') && !colDef.displayColId) { displayValue = (rawValueFromGrist && rawValueFromGrist !== 0) ? `[Ref ID: ${rawValueFromGrist}]` : `[${_('none')}]`; } 
else if (colDef.type === 'Date' || colDef.type === 'DateTime') { displayValue = formatEpoch(rawValueFromGrist, colDef.type); } 

if (colDef.type === 'Bool') { fieldEl = document.createElement('input'); fieldEl.type = 'checkbox'; fieldEl.disabled = true; fieldEl.checked = Boolean(rawValueFromGrist); } 
else if (colDef.type === 'ChoiceList') { fieldEl = document.createElement('div'); const choicesSelected = Array.isArray(rawValueFromGrist) && rawValueFromGrist[0] === 'L' ? rawValueFromGrist.slice(1) : []; if (choicesSelected.length > 0) { choicesSelected.forEach(opt => { const chip = document.createElement('span'); chip.className = 'choice-chip'; chip.textContent = opt; if (item.config.useFormatting && colDef.widgetOptions?.choiceOptions?.[opt]) { const cs = colDef.widgetOptions.choiceOptions[opt]; if (cs.fillColor) chip.style.backgroundColor = cs.fillColor; if (cs.textColor) chip.style.color = cs.textColor; } else { fieldEl.textContent = `[${_('none')}]`; fieldEl.style.fontStyle = 'italic'; fieldEl.style.color = '#757575'; } } 
else { fieldEl = document.createElement('span'); fieldEl.className = 'value'; fieldEl.textContent = displayValue ?? ''; if (displayValue === `[${_('none')}]`) { fieldEl.style.fontStyle = 'italic'; fieldEl.style.color = '#757575'; } } 
if (item.config.useFormatting && colDef.type !== 'ChoiceList') { applyStylesFromWidgetOptions(fieldEl, colDef, rawValueFromGrist, false); } 
} 
fieldDiv.appendChild(fieldEl); 
cardDiv.appendChild(fieldDiv); 
}); 
cardDiv.onclick = () => openCardEditDrawer(cardData.id, cardLaneValue, cardData); return cardDiv; 
} 

async function renderKanbanView() { 
const vis = WidgetConfigManager.getVisualConfig(); boardEl.style.display = 'flex'; boardEl.style.justifyContent = vis.centerColumns ? 'center' : 'flex-start'; boardEl.innerHTML = ''; currentVisibleCardsByLane = {}; 
if (!gristTableMeta || !WidgetConfigManager.getKanbanDefiningColumn()) { errEl.textContent = "Configure the Kanban column in ⚙️ Config > General > Mapping."; boardEl.innerHTML = `<p>${errEl.textContent}</p>`; return; } 
if (kanbanLanesStructure.length === 0) { errEl.textContent = "No lane found for the defined Kanban column."; boardEl.innerHTML = `<p>${errEl.textContent}</p>`; return; } 

refListCache = { schemas: {}, data: {} }; 
const refListsToFetch = new Set(); 
gristTableMeta.columns.forEach(col => { if(col.type.startsWith('RefList:')) refListsToFetch.add(col.referencedTableId); }); 

const promises = []; 
for (const tableId of refListsToFetch) { 
promises.push(GristDataManager.getTableSchema(tableId).then(s => refListCache.schemas[tableId] = s)); 
promises.push((async() => { 
const data = await grist.docApi.fetchTable(tableId); 
refListCache.data[tableId] = GristDataManager.colToRows(data); 
})()); 
} 
await Promise.all(promises); 

const definingColId = WidgetConfigManager.getKanbanDefiningColumn(); const cardsByLane = {}; kanbanLanesStructure.forEach(l => cardsByLane[l.value] = []); gristRows.forEach(row => { const laneValue = String(safe(row, definingColId, "")); if (cardsByLane.hasOwnProperty(laneValue)) { cardsByLane[laneValue].push(row); } else { if (!cardsByLane["_UNMATCHED_LANE_"]) cardsByLane["_UNMATCHED_LANE_"] = []; cardsByLane["_UNMATCHED_LANE_"].push(row); const sortCriteria = WidgetConfigManager.getCardSortCriteria(); if (sortCriteria.some(c => c.columnId)) { for (const lv in cardsByLane) { if (lv === "_UNMATCHED_LANE_") continue; cardsByLane[lv].sort((A, B) => { for (const c of sortCriteria) { if (!c.columnId) continue; const colMeta = gristTableMeta.columns.find(x => x.id === c.columnId); const vA = safe(A, c.columnId), vB = safe(B, c.columnId); let cmp = 0; if (vA == null && vB != null) cmp = 1; else if (vB == null && vA != null) cmp = -1; else if (vA == null && vB == null) cmp = 0; || colMeta.type === 'DateTime')) { cmp = parseFloat(vA) - parseFloat(vB); } else { cmp = String(vA).localeCompare(String(vB), undefined, { sensitivity: 'base' }); } if (cmp !== 0) return c.direction === 'asc' ? cmp : -cmp; } return 0; }); } } 
kanbanLanesStructure.filter(l => !l.isUnmatched).forEach((lane, laneIndex) => { const columnDiv = document.createElement('div'); columnDiv.className = 'column'; columnDiv.dataset.laneValue = lane.value; columnDiv.style.flex = `0 0 ${vis.columnWidthPercent || 25}%`; columnDiv.style.minWidth = `${vis.columnMinWidth || 200}px`; columnDiv.style.maxWidth = `${vis.columnMaxWidth || 400}px`; 'column-header'; headerDiv.style.backgroundColor = lane.color; headerDiv.style.color = lane.textColor; if (lane.fontBold) headerDiv.style.fontWeight = 'bold'; const totalInLane = (cardsByLane[lane.value] || []).length; const limits = WidgetConfigManager.getLaneWipLimit(lane.value); let headerText = `${lane.value || "[Empty]"} (${totalInLane}`; if (limits.maxAllowed > 0) { headerText += `/${limits.maxAllowed}`; if (totalInLane >= limits.maxAllowed) { headerDiv.classList.add('wip-limit-exceeded'); headerDiv.title = `WIP limit of ${limits.maxAllowed} reached/exceeded!`; } } headerText += ")"; headerDiv.textContent = headerText; columnDiv.appendChild(headerDiv); const addBtn = document.createElement('button'); addBtn.className = 'add-btn'; addBtn.textContent = '+ New card'; addBtn.onclick = () => { if (limits.maxAllowed > 0 && totalInLane >= limits.maxAllowed) { alert(`A lane "${lane.value}" has reached the maximum limit of ${limits.maxAllowed} cards.`); return; } addNewCardToLane(lane.value); }; columnDiv.appendChild(addBtn); const bodyDiv = document.createElement('div'); bodyDiv.className = 'column-body'; const cardsInThisLane = cardsByLane[lane.value] || []; currentVisibleCardsByLane[lane.value] = 0; const initiallyVisible = limits.maxVisible > 0 ? limits.maxVisible: CARDS_PER_PAGE; for (let i = 0; i < Math.min(cardsInThisLane.length, initiallyVisible); i++) { bodyDiv.appendChild(createCardElement(cardsInThisLane[i], lane.value)); currentVisibleCardsByLane[lane.value]++; } columnDiv.appendChild(bodyDiv); const pagDiv = document.createElement('div'); pagDiv.className = 'column-pagination-controls'; columnDiv.appendChild(pagDiv); 
function updatePaginationControls() { pagDiv.innerHTML = ''; const visibleCount = currentVisibleCardsByLane[lane.value]; const totalCount = cardsInThisLane.length; if (totalCount <= initiallyVisible && totalCount <= CARDS_PER_PAGE && limits.maxVisible === 0) { return; } if (totalCount > 0) { const showLessBtn = document.createElement('button'); showLessBtn.innerHTML = '▲'; showLessBtn.title = 'Show less'; showLessBtn.disabled = visibleCount <= (limits.maxVisible > 0 ? limits.maxVisible : CARDS_PER_PAGE); showLessBtn.onclick = () => { const targetVisible = limits.maxVisible > 0 ? limits.maxVisible: CARDS_PER_PAGE; Array.from(bodyDiv.querySelectorAll('.card')).slice(targetVisible).forEach(n => n.remove()); currentVisibleCardsByLane[lane.value] = Math.min(visibleCount, targetVisible); updatePaginationControls(); }; pagDiv.appendChild(showLessBtn); const countSpan = document.createElement('span'); countSpan.textContent = `(${visibleCount}/${totalCount})`; pagDiv.appendChild(countSpan); const showMoreBtn = document.createElement('button'); showMoreBtn.innerHTML = '▼'; showMoreBtn.title = 'Show more'; showMoreBtn.disabled = visibleCount >= totalCount; showMoreBtn.onclick = () => { const nextBatchStart = visibleCount; const nextBatchEnd = Math.min(totalCount, visibleCount + CARDS_PER_PAGE); for (let i = nextBatchStart; i < nextBatchEnd; i++) { bodyDiv.appendChild(createCardElement(cardsInThisLane[i], lane.value)); currentVisibleCardsByLane[lane.value]++; } updatePaginationControls(); }; pagDiv.appendChild(showMoreBtn); } } 
updatePaginationControls(); 
new Sortable(bodyDiv, { 
group: 'kanban-cards', animation: 150, 
onMove: evt => { const toLaneValue = evt.to.closest('.column').dataset.laneValue; const fromLaneValue = evt.from.closest('.column').dataset.laneValue; const toLaneLimits = WidgetConfigManager.getLaneWipLimit(toLaneValue); const cardsInToLane = (cardsByLane[toLaneValue] || []).length; if (evt.from !== evt.to && toLaneLimits.maxAllowed > 0 && cardsInToLane >= toLaneLimits.maxAllowed) { console.log(`WIP Limit block: ${toLaneValue} has ${cardsInToLane}/${toLaneLimits.maxAllowed}`); return false; } if (WidgetConfigManager.getRestrictAdjacentMove()) { const fromLaneIdx = kanbanLanesStructure.findIndex(l => l.value === fromLaneValue); const toLaneIdx = kanbanLanesStructure.findIndex(l => l.value === toLaneValue); if (Math.abs(toLaneIdx - fromLaneIdx) > 1) { console.log("Adjacent move block"); return false; } } const fromLaneRules = WidgetConfigManager.getRulesForLane(fromLaneValue); const hasCreateRuleInFromLane = fromLaneRules.some(r => r.type === 'create'); if (hasCreateRuleInFromLane) { const fromIdx = kanbanLanesStructure.findIndex(l => l.value === fromLaneValue); const toIdx = kanbanLanesStructure.findIndex(l => l.value === toLaneValue); if (toIdx< fromIdx) { console.log("Cannot move back: 'create' rule exists in source lane."); return false; } } return true; }, 
onEnd: async evt => { const cardId = parseInt(evt.item.dataset.cardId, 10); let destinationLaneValue = evt.to.closest('.column').dataset.laneValue; const sourceLaneValue = evt.from.closest('.column').dataset.laneValue; if (destinationLaneValue === sourceLaneValue && evt.oldIndex === evt.newIndex) return; const cardData = gristRows.find(r => r.id === cardId); if (!cardData) { console.error("Card data not found for ID:", cardId); evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex]); return; } const allowRulesManual = WidgetConfigManager.getRulesForLane(destinationLaneValue).filter(r => r.type === 'allow'); for (const rule of allowRulesManual) { if (!rule.fieldId || !rule.operator) continue; const actualValue = cardData[rule.fieldId]; const fieldDef = gristTableMeta.columns.find(c => c.id === rule.fieldId); const fieldType = fieldDef ? fieldDef.type: 'Text'; if (!evaluateCondition(actualValue, rule.operator, rule.value, fieldType)) { alert(`Not allowed to move to "${destinationLaneValue}":\nCondition not satisfied: Field "${fieldDef?.label || rule.fieldId}" ${rule.operator} "${rule.value}"`); evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex]); return; } } let cardMovedAutomatically = false; const moveRules = WidgetConfigManager.getRulesForLane(destinationLaneValue).filter(r => r.type === 'move'); for (const rule of moveRules) { if (!rule.fieldId || !rule.operator || !rule.targetLaneValue) continue; const actualValue = cardData[rule.fieldId]; const fieldDef = gristTableMeta.columns.find(c => c.id === rule.fieldId); const fieldType = fieldDef ? fieldDef.type: 'Text'; if (evaluateCondition(actualValue, rule.operator, rule.value, fieldType)) { console.log(`Rule 'move' fired: moving from ${destinationLaneValue} to ${rule.targetLaneValue}`); const allowRulesAutoMoveTarget = WidgetConfigManager.getRulesForLane(rule.targetLaneValue).filter(r => r.type === 'allow'); let autoMoveAllowed = true; for (const allowRuleTarget of allowRulesAutoMoveTarget) { if (!allowRuleTarget.fieldId || !allowRuleTarget.operator) continue; const valTarget = cardData[allowRuleTarget.fieldId]; const fdTarget = gristTableMeta.columns.find(c => c.id === allowRuleTarget.fieldId); const ftTarget = fdTarget ? fdTarget.type : 'Text'; if (!evaluateCondition(valTarget, allowRuleTarget.operator, allowRuleTarget.value, ftTarget)) { alert(`Automatic movement to "${rule.targetLaneValue}" blocked by the 'allow' rule for this lane:\nCondition: ${fdTarget?.label || allowRuleTarget.fieldId} ${allowRuleTarget.operator} "${allowRuleTarget.value}"`); autoMoveAllowed = false; break; } } if (autoMoveAllowed) { destinationLaneValue = rule.targetLaneValue; cardMovedAutomatically = true; } else { console.log(`Automatic movement to ${rule.targetLaneValue} was blocked by an 'allow' rule for the destination lane.`); } } } const definingColId = WidgetConfigManager.getKanbanDefiningColumn(); if (destinationLaneValue !== sourceLaneValue || cardMovedAutomatically) { try { console.log(`Updating Grist: Card ${cardId} for lane ${destinationLaneValue}`); await gristTableOps.update([{ id: cardId, fields: { [definingColId]: destinationLaneValue } }]); } catch (err) { console.error("Error moving card (final Grist update):", err); alert("Error moving card: " + err.message); evt.from.insertBefore(evt.item, evt.from.children[evt.oldIndex]); return; } } else if (destinationLaneValue === sourceLaneValue && evt.oldIndex !== evt.newIndex) { console.log("Card reordered within the same lane. No lane update for Grist."); } 
if (destinationLaneValue !== sourceLaneValue) { 
const createRules = WidgetConfigManager.getRulesForLane(destinationLaneValue).filter(r => r.type === 'create'); 
for (const rule of createRules) { 
if (!rule.targetTableId || !rule.relationFieldIdInTarget || !rule.targetColumnIdForLane || rule.initialLaneValue === null || rule.initialLaneValue === undefined) { console.warn("Rule 'create' (simplified) misconfigured or initial lane not defined:", rule); continue; } 
try { const targetTable = grist.getTable(rule.targetTableId); if (!targetTable) { console.error(`Target table "${rule.targetTableId}" not found for rule 'create'.`); continue; } const newRecordFields = { [rule.relationFieldIdInTarget]: cardId, [rule.targetColumnIdForLane]: rule.initialLaneValue }; console.log("Creating record (simplified) in subprocess:", rule.targetTableId, newRecordFields); await targetTable.create([{ fields: newRecordFields }]); } catch (err) { console.error(`Error executing rule 'create' (simplified) for lane "${destinationLaneValue}":`, err); alert(`Error creating record in subprocess for table "${rule.targetTableId}": ${err.message}`); }
}
}
}
}); 
boardEl.appendChild(columnDiv); 
}); 
} 

function openCardEditDrawer(cardId, cardLaneValue, preloadedCardData = null) { 
currentEditingCardId = cardId; 
const cardData = preloadedCardData || gristRows.find(r => r.id === cardId); 
if (!cardData) { console.warn(`openCardEditDrawer: Data not found for cardId ${cardId}`); return; } 
currentEditingCardData = { ...cardData }; 
const drawerContent = editDrawerContentEl; drawerContent.innerHTML = ''; 
const visualConfig = WidgetConfigManager.getVisualConfig(); 
if (visualConfig.drawerFontColor) { drawerContent.style.color = visualConfig.drawerFontColor; } 
let cardTitle = `Edit Card ${cardId}`; 
const fieldsOnCard = gristTableMeta.columns.map(col => ({ colDef: col, config: getFieldDisplayConfig(col.id, cardLaneValue) })).filter(item => item.config.card).sort((a, b) => (a.config.cardPosition ?? 999) - (b.config.cardPosition ?? 999)); 
const titleFieldConfiguredOnCard = fieldsOnCard.find(item => item.config.cardPosition === 0); 
if (titleFieldConfiguredOnCard) { const colDefForTitle = titleFieldConfiguredOnCard.colDef; let titleValue = safe(cardData, colDefForTitle.id); if (String(colDefForTitle.type).startsWith('Ref') && colDefForTitle.displayColId) { titleValue = safe(cardData, colDefForTitle.displayColId, `[Ref ${colDefForTitle.id}]`); } else if (!String(colDefForTitle.type).startsWith('Ref') && (colDefForTitle.type === 'Date' || colDefForTitle.type === 'DateTime')) { titleValue = formatEpoch(titleValue, colDefForTitle.type); } cardTitle = titleValue || `[${colDefForTitle.label}]`; } else if (fieldsOnCard.length > 0) { const firstFieldOnCard = fieldsOnCard[0].colDef; let titleValue = safe(cardData, firstFieldOnCard.id); if (String(firstFieldOnCard.type).startsWith('Ref') && firstFieldOnCard.displayColId) { titleValue = safe(cardData, firstFieldOnCard.displayColId, `[Ref ${firstFieldOnCard.id}]`); } else if (!String(firstFieldOnCard.type).startsWith('Ref') && (firstFieldOnCard.type === 'Date' || firstFieldOnCard.type === 'DateTime')) { titleValue = formatEpoch(titleValue, firstFieldOnCard.type); } cardTitle = titleValue || `[${firstFieldOnCard.label}]`;} 
editDrawerTitleEl.textContent = cardTitle; 
const fieldsForDrawer = gristTableMeta.columns.map(col => ({ colDef: col, config: getFieldDisplayConfig(col.id, cardLaneValue) })).filter(item => item.config.visible).sort((a, b) => (a.config.position || 999) - (b.config.position || 999)); 
fieldsForDrawer.forEach(item => { 
const col = item.colDef; const cfg = item.config; let val = safe(currentEditingCardData, col.id, ''); 
const label = document.createElement('label'); label.htmlFor = `field-${col.id}`; label.textContent = col.label; label.classList.add('formatted'); applyStylesFromWidgetOptions(label, col, val, true); drawerContent.appendChild(label); 
let inputEl; let displayValueForReadonly = val; 
if (col.type.startsWith('Ref:') && col.displayColId && cardData[col.displayColId] !== undefined) { displayValueForReadonly = safe(cardData, col.displayColId, ''); if (val === 0 || String(displayValueForReadonly).startsWith("E,Invalid")) { displayValueForReadonly = `[${_('none')}]`; }} 
else if (col.type.startsWith('Ref:') && !col.displayColId) { displayValueForReadonly = (val && val !== 0) ? `[Ref ID: ${val}]` : `[${_('none')}]`; } 
else if (col.type.startsWith('RefList') && col.displayColId && cardData[col.displayColId] !== undefined) { displayValueForReadonly = safe(cardData, col.displayColId, ''); const ids = Array.isArray(val) && val[0] === 'L' ? val.slice(1) : []; if (ids.length === 0) displayValueForReadonly = `[${_('none')}]`; } 
else if (col.type.startsWith('RefList') && !col.displayColId) { const ids = Array.isArray(val) && val[0] === 'L' ? val.slice(1) : []; displayValueForReadonly = ids.length > 0 ? ids.map(id => `[Ref ID: ${id}]`).join(', ') : `[${_('none')}]`; } 
else if (col.type === 'Date' || col.type === 'DateTime') { displayValueForReadonly = formatEpoch(val, col.type); } 
if (!cfg.editable || col.isFormula || col.id === WidgetConfigManager.getKanbanDefiningColumn()) { 
inputEl = document.createElement('div'); inputEl.className = 'readonly-field'; 
if (col.type === 'ChoiceList') { const choices = Array.isArray(val) && val[0] === 'L' ? val.slice(1) : []; if(choices.length > 0) { choices.forEach(opt => { const chip = document.createElement('span'); chip.className = 'choice-chip'; chip.textContent = opt; if (col.widgetOptions?.choiceOptions?.[opt]) { const cs = col.widgetOptions.choiceOptions[opt]; if (cs.fillColor) chip.style.backgroundColor = cs.fillColor; if (cs.textColor) chip.style.color = cs.textColor; } inputEl.appendChild(chip); }); } else { inputEl.textContent = `[${_('none')}]`; inputEl.style.fontStyle="italic"; inputEl.style.color="#777";}
} 
else if (col.type === 'Bool') { inputEl.textContent = Boolean(val) ? 'Yes' : 'No'; } 
else if (col.type.startsWith('Ref')) { inputEl.textContent = displayValueForReadonly; if (displayValueForReadonly === `[${_('none')}]` || String(displayValueForReadonly).startsWith("[Ref ID:")) { inputEl.style.color = '#757575'; inputEl.style.fontStyle = 'italic'; } } 
else { inputEl.textContent = displayValueForReadonly ?? ''; } 
applyStylesFromWidgetOptions(inputEl, col, val, false); 
} else { 
if (col.type.startsWith('Ref:') && col.referencedTableId && !col.type.startsWith('RefList')) { inputEl = document.createElement('select'); inputEl.add(new Option('-- Select --', '')); inputEl.dataset.currentRefValue = (val === 0 ? "" : String(val)); const populateRefSelect = async (selectElement, refTableId, currentRefId) => { selectElement.options[0].text = 'Loading...'; try { const rawRefTableData = await grist.docApi.fetchTable(refTableId); const refTableRecords = GristDataManager.colToRows(rawRefTableData); const refTableSchema = await GristDataManager.getTableSchema(refTableId); let displayRefColId = null; if (refTableSchema && refTableSchema.columns) { const commonDisplayNames = ['name', 'name', 'title', 'title', 'label', 'rotulo', 'descricao', 'description']; let bestCandidate = refTableSchema.columns.find(c => commonDisplayNames.includes(c.label.toLowerCase()) && c.id.toLowerCase() !== 'id' && !c.id.startsWith('gristHelper_')); if (!bestCandidate) { bestCandidate = refTableSchema.columns.find(c => c.type === 'Text' && !c.isFormula && c.id.toLowerCase() !== 'id' && !c.id.startsWith('gristHelper_')); } if (!bestCandidate) { bestCandidate = refTableSchema.columns.find(c => !c.isFormula && c.id.toLowerCase() !== 'id' && !c.id.startsWith('gristHelper_')); } if (!bestCandidate && refTableSchema.columns.length > 0) { bestCandidate = refTableSchema.columns.find(c => c.id.toLowerCase() !== 'id' && !c.id.startsWith('gristHelper_')) || refTableSchema.columns[0]; } if (bestCandidate) { displayRefColId = bestCandidate.id; } else if (refTableRecords.length > 0 && Object.keys(refTableRecords[0]).length > 0) { displayRefColId = Object.keys(refTableRecords[0])[0]; } } selectElement.options[0].text = '-- Select --'; refTableRecords.forEach(refRec => { const optionText = displayRefColId ? (safe(refRec, displayRefColId) ?? `ID ${refRec.id}`) : `ID ${refRec.id}`; selectElement.add(new Option(optionText, String(refRec.id))); }); selectElement.value = currentRefId || ""; } catch (err) { console.error(`Error when popular select reference for table ${refTableId}:`, err); selectElement.options[0].text = 'Error loading'; } }; populateRefSelect(inputEl, col.referencedTableId, inputEl.dataset.currentRefValue); } 
else if (col.type === 'ChoiceList') { inputEl = document.createElement('select'); inputEl.multiple = true; inputEl.size = Math.min(Math.max(3, (col.choices || []).length), 6); const currentValues = Array.isArray(val) && val[0] === 'L' ? val.slice(1) : []; (col.choices || []).forEach(choice => { const option = new Option(choice, choice); if (currentValues.includes(choice)) { option.selected = true; } applyStylesFromWidgetOptions(option, col, choice, false); inputEl.add(option); }); } 
else if (col.type.startsWith('RefList')) { inputEl = document.createElement('div'); inputEl.className = 'reflist-container'; inputEl.id = `reflist-container-${col.id}`; populateRefListTable(inputEl, col, val); } 
else if (col.type === 'Date' || col.type === 'DateTime') { inputEl = document.createElement('input'); inputEl.type = col.type === 'DateTime' ? 'datetime-local' : 'date'; if (val) { const dateObj = new Date(Number(val) * 1000); if (!isNaN(dateObj.valueOf())) { if (col.type === 'Date') { inputEl.value = dateObj.toISOString().split('T')[0]; } else { const localDate = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)); inputEl.value = localDate.toISOString().slice(0,16); } } else { inputEl.value = ''; } } else { inputEl.value = ''; } applyStylesFromWidgetOptions(inputEl, col, val, false); } 
else if (col.type === 'Choice') { 
inputEl = document.createElement('select'); inputEl.add(new Option(`-- ${_('none')} --`, '')); 
(col.choices || []).forEach(choice => { const option = new Option(choice, choice); applyStylesFromWidgetOptions(option, col, choice, false); inputEl.add(option); }); 
inputEl.value = val; if (val) { applyStylesFromWidgetOptions(inputEl, col, val, false); } 
inputEl.onchange = function() { if (this.value) { applyStylesFromWidgetOptions(this, col, this.value, false); } else { this.style.backgroundColor = ''; this.style.color = ''; } }; 
} 
else if (col.type === 'Bool') { inputEl = document.createElement('input'); inputEl.type = 'checkbox'; inputEl.checked = Boolean(val); } 
else if (col.type === 'Int' || col.type === 'Numeric') { inputEl = document.createElement('input'); inputEl.type = 'number'; if (col.type === 'Numeric') inputEl.step = 'any'; inputEl.value = val; applyStylesFromWidgetOptions(inputEl, col, val, false); } 
else { inputEl = document.createElement('textarea'); inputEl.value = val; applyStylesFromWidgetOptions(inputEl, col, val, false); } 
} 
inputEl.id = `field-${col.id}`; if (!col.type.startsWith('RefList')) { inputEl.dataset.colId = col.id; } 
drawerContent.appendChild(inputEl); 
}); 
editDrawerEl.classList.add('visible'); 
} 

editDrawerSaveBtn.onclick = async () => { if (!currentEditingCardId || !currentEditingCardData || !gristTableOps) return; const fieldsToUpdate = {}; const definingColId = WidgetConfigManager.getKanbanDefiningColumn(); const currentLaneValueForDrawer = String(safe(currentEditingCardData, definingColId, "")); 
editDrawerContentEl.querySelectorAll('[data-col-id]').forEach(inputEl => { 
const colId = inputEl.dataset.colId; const colMeta = gristTableMeta.columns.find(c => c.id === colId); const cfg = getFieldDisplayConfig(colId, currentLaneValueForDrawer); 
if (cfg.editable && colMeta && !colMeta.isFormula && colId !== definingColId) { 
let newValue; const originalValue = currentEditingCardData[colId]; 
if (inputEl.tagName === 'SELECT' && colMeta.type.startsWith('Ref:') && !colMeta.type.startsWith('RefList:')) { newValue = inputEl.value === "" ? 0 : Number(inputEl.value); } 
else if (inputEl.tagName === 'SELECT' && colMeta.type === 'ChoiceList' && inputEl.multiple) { const selectedOptions = Array.from(inputEl.selectedOptions).map(opt => opt.value); newValue = selectedOptions.length > 0 ? ['L', ...selectedOptions] : null; } 
else if (inputEl.type === 'checkbox' && inputEl.tagName === 'INPUT') { newValue = inputEl.checked; } 
else if (inputEl.type === 'number') { newValue = inputEl.value === '' ? null : parseFloat(inputEl.value); } 
else if (inputEl.type === 'date') { if (inputEl.value === '') { newValue = null; } else { const [year, month, day] = inputEl.value.split('-').map(Number); newValue = Date.UTC(year, month - 1, day) / 1000; } } 
else if (inputEl.type === 'datetime-local') { if (inputEl.value === '') { newValue = null; } else { newValue = new Date(inputEl.value).getTime() / 1000; } } 
else { newValue = (inputEl.value === '' && colMeta.type !== 'Text' && colMeta.type !== 'Any') ? null : inputEl.value; } 
let changed = false; 
if (colMeta.type === 'ChoiceList') { const originalArray = (Array.isArray(originalValue) && originalValue[0]==='L' ? originalValue.slice(1) : []).sort(); const newArray = (Array.isArray(newValue) && newValue[0]==='L' ? newValue.slice(1) : []).sort(); if (originalArray.join(',') !== newArray.join(',')) changed = true; } 
else if (colMeta.type.startsWith('Ref:')) { const origRefVal = originalValue === 0 ? null : Number(originalValue); const newRefVal = newValue === 0 ? null : Number(newValue); if (newRefVal !== origRefVal) changed = true; } 
else if (newValue !== originalValue && !(newValue == null && (originalValue == null || originalValue === ''))) { changed = true; } 
if (changed) { fieldsToUpdate[colId] = newValue; } 
} 
}); 
if (Object.keys(fieldsToUpdate).length > 0) { console.log("Saving fields to Grist:", fieldsToUpdate); try { await gristTableOps.update([{ id: currentEditingCardId, fields: fieldsToUpdate }]); } catch (err) { console.error("Error saving card:", err); alert("Error saving card: " + err.message); } } 
editDrawerEl.classList.remove('visible'); currentEditingCardId = null; currentEditingCardData = null; }; 
editDrawerCloseBtn.onclick = () => { editDrawerEl.classList.remove('visible'); currentEditingCardId = null; currentEditingCardData = null; }; 
editDrawerCancelBtn.onclick = () => { editDrawerEl.classList.remove('visible'); currentEditingCardId = null; currentEditingCardData = null; }; 

async function addNewCardToLane(laneValue) { if (!gristTableOps || !gristTableMeta) return; const definingColId = WidgetConfigManager.getKanbanDefiningColumn(); if (!definingColId) { alert("Kanban column (status/lane) is not defined in the settings."); return; } const newCardFields = { [definingColId]: laneValue }; const titleFieldCand = gristTableMeta.columns.find(c => !c.isFormula && (c.label.toLowerCase() === 'title' || c.label.toLowerCase() === 'title' || c.label.toLowerCase() === 'name')); if (titleFieldCand) { newCardFields[titleFieldCand.id] = "New Card"; } gristTableMeta.columns.forEach(col => { if (!newCardFields.hasOwnProperty(col.id) && !col.isFormula && col.id !== definingColId) { newCardFields[col.id] = (col.type.startsWith('Ref:') || col.type.startsWith('RefList:')) ? 0 : null; } }); try { await gristTableOps.create([{ fields: newCardFields }]); } catch (err) { console.error("Error creating new card:", err); alert("Error creating new card: " + err.message); } } 

ConfigUIBuilder.init({ drawerEl: document.getElementById('cfg-drawer'), saveBtnEl: document.getElementById('cfg-save'), cancelBtnEl: document.getElementById('cfg-cancel'), closeBtnEl: document.getElementById('cfg-close'), onSave: async () => { await WidgetConfigManager.saveConfig(); await loadGristDataAndSetupKanban(); 

if (cfgBtn) { 
cfgBtn.onclick = async() => { 
const drawer = document.getElementById('cfg-drawer'); 
if(drawer.classList.contains('visible')){ 
ConfigUIBuilder.close(); 
return; 
} 
console.log("CFG Button: Clicked."); 
await WidgetConfigManager.loadConfig(); 
console.log("CFG Button: Config loaded."); 
if (!gristTableMeta || (gristRows.length === 0 && gristTableMeta?.nameId) || allGristTables.length === 0) { 
console.log("CFG Button: Fetching table meta, data, and all tables list..."); 
const dataPack = await GristDataManager.fetchAll(); 
if (!dataPack?.mainTable?.nameId) { 
alert("No Grist table selected or failed to load data."); 
console.error("CFG Button: invalid dataPack or no mainTable."); return; 
} 
gristTableMeta = dataPack.mainTable; 
gristRows = dataPack.allData[gristTableMeta.nameId] || []; 
allGristTables = dataPack.allTablesList || []; 
console.log("CFG Button: Table meta, data, and all tables list fetched."); 
} 
let definingColIdFromConfig = WidgetConfigManager.getKanbanDefiningColumn(); 
kanbanLanesStructure = []; 
if (definingColIdFromConfig && gristTableMeta && gristTableMeta.columns.find(c => c.id === definingColIdFromConfig)) { 
const definingColMeta = gristTableMeta.columns.find(c => c.id === definingColIdFromConfig); 
if (definingMetaCol) { 
let orderedLaneValues = definingColMeta.choices || []; 
if (orderedLaneValues.length === 0 && gristRows.length > 0) { 
const uniqueValuesFromData = new Set(); 
gristRows.forEach(r => { 
const v = r[definingColIdFromConfig]; 
if (v != null && v !== '') uniqueValuesFromData.add(String(v)); 
}); 
orderedLaneValues = Array.from(uniqueValuesFromData).sort(); 
} 
kanbanLanesStructure = orderedLaneValues.map((valStr, index) => { 
let laneColor = palette(index); 
let laneTextColor = '#fff'; 
let fontBold = false; 
if (definingColMeta.widgetOptions?.choiceOptions?.[valStr]) { 
const co = definingColMeta.widgetOptions.choiceOptions[valStr]; 
if (co.fillColor) laneColor = co.fillColor; 
if (co.textColor) laneTextColor = co.textColor; 
if (co.fontBold) fontBold = co.fontBold; 
} 
return { value: valStr, color: laneColor, textColor: laneTextColor, fontBold: fontBold, isUnmatched: false }; 
}); 
}
}
if (gristTableMeta) {
ConfigUIBuilder.populateAndOpen(gristTableMeta, kanbanLanesStructure, allGristTables);
} else {
alert("Could not open configuration: main table metadata not available.");
}
};
} else {
console.error("#cfg-btn button not found in DOM.");
if (errEl) errEl.textContent = "CRITICAL ERROR: Configuration button missing.";
}

grist.ready({ requiredAccess: 'full', columns: [] });

function applyWidgetVisualSettings() {
const visualConfig = WidgetConfigManager.getVisualConfig(); const bodyStyle = document.body.style;
if (visualConfig.backgroundType === 'linear' && visualConfig.gradientColor1 && visualConfig.gradientColor2) { bodyStyle.backgroundImage = `linear-gradient(${visualConfig.gradientDirection || 'to right'}, ${visualConfig.gradientColor1}, ${visualConfig.gradientColor2})`; bodyStyle.backgroundColor = visualConfig.gradientColor1; } 
else if (visualConfig.backgroundType === 'radial' && visualConfig.gradientColor1 && visualConfig.gradientColor2) { bodyStyle.backgroundImage = `radial-gradient(circle, ${visualConfig.gradientColor1}, ${visualConfig.gradientColor2})`; bodyStyle.backgroundColor = visualConfig.gradientColor1; } 
else { bodyStyle.backgroundImage = 'none'; bodyStyle.backgroundColor = visualConfig.solidBackgroundColor || WidgetConfigManager.getKanbanDefaults().visual.solidBackgroundColor; } 
const drawerElement = document.getElementById('drawer'); if (drawerElement && visualConfig.drawerFontColor) { drawerElement.style.color = visualConfig.drawerFontColor; } 
} 

async function loadGristDataAndSetupKanban() { 
console.log("MAIN.loadGristDataAndSetupKanban: Starting..."); 
if (errEl) errEl.textContent = ''; if (boardEl) boardEl.innerHTML = '<p>Loading data and settings...</p>'; 
try { 
await WidgetConfigManager.loadConfig(); 
applyWidgetVisualSettings(); 
const dataPack = await GristDataManager.fetchAll(); 
if (!dataPack?.mainTable?.nameId) { if (errEl) errEl.textContent = "Failed to fetch data from Grist table. Check if a table is selected."; if (boardEl) boardEl.innerHTML = ''; gristTableMeta = null; gristRows = []; allGristTables = []; return; } 
gristTableMeta = dataPack.mainTable; gristRows = dataPack.allData[gristTableMeta.nameId] || []; allGristTables = dataPack.allTablesList || []; gristTableOps = grist.getTable(gristTableMeta.nameId); 
let definingColId = WidgetConfigManager.getKanbanDefiningColumn(); 
const currentFullConfig = await grist.getOption(CURRENT_CONFIG_KEY_FOR_GRIST); 
if (definingColId === null && gristTableMeta?.columns && typeof currentFullConfig === 'undefined') { const guessedStatusCol = gristTableMeta.columns.find(c => (c.label.toLowerCase() === 'status' || c.label.toLowerCase() === 'state') && (c.type === 'Choice' || c.type === 'ChoiceList')); if (guessedStatusCol) { definingColId = guessedStatusCol.id; WidgetConfigManager.setKanbanDefiningColumn(definingColId); console.log(`PRESUGGESTED Kanban Column (first use or reset config): ${definingColId}. User needs to save in the Config UI to persist.`); } } 

kanbanLanesStructure = []; 
if (definingColId && gristTableMeta.columns.find(c => c.id === definingColId)) { 
const definingColMeta = gristTableMeta.columns.find(c => c.id === definingColId); 
let orderedLaneValues = definingColMeta.choices || []; 
if (orderedLaneValues.length === 0 && gristRows.length > 0) { const uniqueValuesFromData = new Set(); gristRows.forEach(r => { const v = r[definingColId]; if (v != null && String(v).trim() !== '') uniqueValuesFromData.add(String(v)); }); orderedLaneValues = Array.from(uniqueValuesFromData).sort((a,b) => String(a).localeCompare(String(b))); if (orderedLaneValues.length > 0) { console.warn("Lanes derived from DATA VALUES (column without defined 'choices'). The order may not be optimal. Define 'choices' in the Grist column to control the order of the lanes."); } }
if (orderedLaneValues.length === 0 && definingColMeta.type.startsWith("Ref")) { console.warn(`Lane column '${definingColMeta.label}' is of type Ref without 'choices'. Lanes may not display correctly without data or explicit choices configuration.`); }

const uniqueLaneValues = [...new Set(orderedLaneValues)];
uniqueLaneValues.forEach((laneValueStr, index) => { 
let laneColor = palette(index); let laneTextColor = '#fff'; let fontBold = false; 
if (definingColMeta.widgetOptions?.choiceOptions?.[laneValueStr]) { const co = definingColMeta.widgetOptions.choiceOptions[laneValueStr]; if (co.fillColor) laneColor = co.fillColor; if (co.textColor) laneTextColor = co.textColor; if (co.fontBold) fontBold = co.fontBold; } 
kanbanLanesStructure.push({ value: String(laneValueStr), color: laneColor, textColor: laneTextColor, fontBold: fontBold, isUnmatched: false }); 
}); 
if (kanbanLanesStructure.length === 0 && definingColMeta) { if(errEl) errEl.textContent = `The Kanban column "${definingColMeta.label}" (${definingColId}) has no choices defined in the column options in Grist, nor is there any data in this column to derive lanes. Add choices or populate some cards with statuses.`; }
} else if (definingColId) { if (errEl) errEl.textContent = `The configured Kanban column ('${definingColId}') was not found in the table "${gristTableMeta.nameId}". Reconfigure it in the 'General' tab.`;
} else { if (errEl) errEl.textContent = "Main Kanban column not configured. Go to '⚙️ Config' > 'General' > 'Main Column Mapping'."; }

await renderKanbanView();
isInitialLoad = false;
} catch (error) {
console.error("CRITICAL error in loadGristDataAndSetupKanban:", error);
if (errEl) errEl.textContent = `Error loading: ${error.message}. Check the console for details.`;
if (boardEl) boardEl.innerHTML = ''; 
} 
console.log("MAIN.loadGristDataAndSetupKanban: Completed."); 
} 

grist.onRecords(async (newRecords, oldRecords, summaryOrTableId) => { 
if (isInitialLoad) { 
console.log("grist.onRecords: Skipping initial call."); 
return; 
} 
console.log("grist.onRecords triggered. Reloading Kanban."); 
await loadGristDataAndSetupKanban(); 
}); 

grist.onRecord(async (updatedRec, oldRec, summaryOrTableId) => { 
let tableId = null; 
if (summaryOrTableId && typeof summaryOrTableId === 'object' && summaryOrTableId.tableId) { tableId = summaryOrTableId.tableId; } 
else if (typeof summaryOrTableId === 'string') { tableId = summaryOrTableId; } 
else if (updatedRec && gristTableMeta && gristTableMeta.nameId) { tableId = gristTableMeta.nameId; } 

if (gristTableMeta && tableId === gristTableMeta.nameId && updatedRec) { 
if (currentEditingCardId === updatedRec.id && editDrawerEl.classList.contains('visible')) { 
const definingColId = WidgetConfigManager.getKanbanDefiningColumn(); 
const currentLaneValueForDrawer = String(safe(updatedRec, definingColId, "")); 
try { 
const rawFullData = await grist.docApi.fetchTable(gristTableMeta.nameId, [updatedRec.id]); 
const fullCardDataArr = GristDataManager.colToRows(rawFullData); 
if (fullCardDataArr.length > 0) { 
openCardEditDrawer(fullCardDataArr[0].id, currentLaneValueForDrawer, fullCardDataArr[0]); 
} 
} catch (fetchErr) { 
console.error(`GRIST.ONRECORD: Error fetching complete data for card ${updatedRec.id}:`, fetchErr); 
} 
}
}
});

// Initial load call
loadGristDataAndSetupKanban();

// --- LANGUAGE SWITCHING LOGIC ---
const langSelect = document.getElementById('cfg-lang-select');

// Function to set the language and reload the interface
function setLanguageAndReload(langCode) {
if (LANGUAGES[langCode]) {
currentLang = langCode;
console.log(`Language changed to: ${langCode}`);

// Set the select value to the current language
if (langSelect) {
langSelect.value = currentLang;
}

// Translate the static content of the page again
translatePageContent();

// Reload the main view and the config drawer if it is open
loadGristDataAndSetupKanban();

const configDrawer = document.getElementById('cfg-drawer');
if (configDrawer && configDrawer.classList.contains('visible')) {
// Redraws the dynamic contents of the config drawer
// The simplest way is to force a click to close and reopen
cfgBtn.click(); // Simulates a click to close
setTimeout(() => cfgBtn.click(), 10); // and reopen, now with the new language
}
} else {
console.error(`Language not found: ${langCode}`);
}
}

// Ensures the select displays the current language when the config is opened
grist.on('pageLoaded', () => {
if (langSelect) {
langSelect.value = currentLang;
}
});

// Add the listener for when the user changes the select value
if (langSelect) {
langSelect.onchange = (event) => setLanguageAndReload(event.target.value);
}
// --- END OF LANGUAGE CHANGE LOGIC ---

})(); // End of main() function

// Translate the page content for the first time upon loading.
translatePageContent();
});
