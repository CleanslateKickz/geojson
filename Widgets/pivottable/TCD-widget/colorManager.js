/**
 * Automatic color manager for variables
 * @fileoverview Automatically assigns colors to pivot table variables
 * @version 1.1.0
 */

// Color palette for variables
const colorPalette = [
    'tag-blue', 'tag-purple', 'tag-pink', 'tag-green', 
    'tag-yellow', 'tag-teal', 'tag-indigo', 'tag-red', 
    'tag-orange', 'tag-cyan', 'tag-emerald', 'tag-violet', 'tag-rose'
];

let variableColorMap = {};
let colorIndex = 0;

/**
 * Assigns a color to a variable
 * @param {string} variableName - Name of the variable
 * @returns {string} Assigned CSS color class
 */
function getVariableColor(variableName) {
    if (!variableColorMap[variableName]) {
        variableColorMap[variableName] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
    }
    return variableColorMap[variableName];
}

/**
 * Applies colors to variable elements in the DOM
 * Uses jQuery to select and modify .pvtAttr elements
 */
function applyVariableColors() {
    // Check if jQuery is available
    if (typeof $ === 'undefined') {
        console.warn('ColorManager: jQuery not available for applyVariableColors');
        return;
    }
    
    // Wait until the elements are rendered
    setTimeout(() => {
        $('.pvtAttr').each(function() {
            const variableName = $(this).text().trim();
            if (variableName) {
                const colorClass = getVariableColor(variableName);
                // Remove all old color classes from pvtAttr
                $(this).removeClass(colorPalette.join(' '));
                // Add the new color class to pvtAttr
                $(this).addClass(colorClass);
            }
        });
    }, 100);
}

/**
 * Resets the color mapping and index
 * Useful to restart color assignment
 */
function resetColors() {
    variableColorMap = {};
    colorIndex = 0;
}

/**
 * Returns a copy of the color palette
 * @returns {Array<string>} Copy of the color palette
 */
function getColorPalette() {
    return [...colorPalette];
}

/**
 * Returns a copy of the current variable -> color mapping
 * @returns {Object} Copy of the color mapping
 */
function getVariableColorMap() {
    return { ...variableColorMap };
}

/**
 * Returns the number of currently mapped variables
 * @returns {number} Number of variables with assigned colors
 */
function getVariableCount() {
    return Object.keys(variableColorMap).length;
}

/**
 * Checks if a variable already has an assigned color
 * @param {string} variableName - Name of the variable to check
 * @returns {boolean} True if the variable has an assigned color
 */
function hasVariableColor(variableName) {
    return variableName in variableColorMap;
}

// Exports for different environments (Node.js, Browser, AMD)
if (typeof module !== 'undefined' && module.exports) {
    // Node.js/CommonJS Environment
    module.exports = {
        getVariableColor,
        applyVariableColors,
        resetColors,
        getColorPalette,
        getVariableColorMap,
        getVariableCount,
        hasVariableColor
    };
} else if (typeof window !== 'undefined') {
    // Browser Environment - Global exposure
    window.ColorManager = {
        getVariableColor,
        applyVariableColors,
        resetColors,
        getColorPalette,
        getVariableColorMap,
        getVariableCount,
        hasVariableColor
    };
}
