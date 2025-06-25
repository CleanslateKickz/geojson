/**
 * Gestionnaire de couleurs automatiques pour les variables
 * @fileoverview Assigne automatiquement des couleurs aux variables d'un pivot table
 * @version 1.1.0
 */

// Palette de couleurs pour les variables
const colorPalette = [
    'tag-blue', 'tag-purple', 'tag-pink', 'tag-green', 
    'tag-yellow', 'tag-teal', 'tag-indigo', 'tag-red', 
    'tag-orange', 'tag-cyan', 'tag-emerald', 'tag-violet', 'tag-rose'
];

let variableColorMap = {};
let colorIndex = 0;

/**
 * Assigne une couleur à une variable
 * @param {string} variableName - Nom de la variable
 * @returns {string} Classe CSS de couleur assignée
 */
function getVariableColor(variableName) {
    if (!variableColorMap[variableName]) {
        variableColorMap[variableName] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
    }
    return variableColorMap[variableName];
}

/**
 * Applique les couleurs aux éléments de variables dans le DOM
 * Utilise jQuery pour sélectionner et modifier les éléments .pvtAttr
 */
function applyVariableColors() {
    // Vérifier si jQuery est disponible
    if (typeof $ === 'undefined') {
        console.warn('ColorManager: jQuery non disponible pour applyVariableColors');
        return;
    }
    
    // Attendre que les éléments soient rendus
    setTimeout(() => {
        $('.pvtAttr').each(function() {
            const variableName = $(this).text().trim();
            if (variableName) {
                const colorClass = getVariableColor(variableName);
                // Supprimer toutes les anciennes classes de couleur du pvtAttr
                $(this).removeClass(colorPalette.join(' '));
                // Ajouter la nouvelle classe de couleur au pvtAttr
                $(this).addClass(colorClass);
            }
        });
    }, 100);
}

/**
 * Réinitialise le mapping des couleurs et l'index
 * Utile pour recommencer l'attribution des couleurs
 */
function resetColors() {
    variableColorMap = {};
    colorIndex = 0;
}

/**
 * Retourne une copie de la palette de couleurs
 * @returns {Array<string>} Copie de la palette de couleurs
 */
function getColorPalette() {
    return [...colorPalette];
}

/**
 * Retourne une copie du mapping actuel variable -> couleur
 * @returns {Object} Copie du mapping des couleurs
 */
function getVariableColorMap() {
    return { ...variableColorMap };
}

/**
 * Retourne le nombre de variables actuellement mappées
 * @returns {number} Nombre de variables avec couleurs assignées
 */
function getVariableCount() {
    return Object.keys(variableColorMap).length;
}

/**
 * Vérifie si une variable a déjà une couleur assignée
 * @param {string} variableName - Nom de la variable à vérifier
 * @returns {boolean} True si la variable a une couleur assignée
 */
function hasVariableColor(variableName) {
    return variableName in variableColorMap;
}

// Exports pour différents environnements (Node.js, Browser, AMD)
if (typeof module !== 'undefined' && module.exports) {
    // Environment Node.js/CommonJS
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
    // Environment Browser - Exposition globale
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
