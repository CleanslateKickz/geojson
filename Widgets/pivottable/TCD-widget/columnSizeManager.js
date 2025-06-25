/**
 * Gestionnaire de taille des colonnes pour tableaux pivot
 * @fileoverview Permet de redimensionner dynamiquement les colonnes avec multiplicateurs
 * @version 1.0.0
 */

/**
 * Change la taille des colonnes avec un multiplicateur
 * @param {string|number} multiplier - Facteur de multiplication (ex: "0.8", 0.8)
 */
function changeColumnSize(multiplier) {
    const factor = parseFloat(multiplier);
    
    // Tailles de base (1.0x)
    const baseFontSize = 16;
    const baseHeaderFontSize = 16; 
    const baseValFontSize = 17;
    const baseTotalFontSize = 17;
    const basePaddingVertical = 14;
    const basePaddingHorizontal = 20;
    const baseHeaderPaddingVertical = 16;
    const baseHeaderPaddingHorizontal = 20;
    const baseTotalPaddingVertical = 14;
    const baseTotalPaddingHorizontal = 20;
    
    // Calcul des nouvelles tailles avec limites minimales
    const newFontSize = Math.max(8, Math.round(baseFontSize * factor));
    const newHeaderFontSize = Math.max(8, Math.round(baseHeaderFontSize * factor));
    const newValFontSize = Math.max(8, Math.round(baseValFontSize * factor));
    const newTotalFontSize = Math.max(8, Math.round(baseTotalFontSize * factor));
    const newPaddingV = Math.max(2, Math.round(basePaddingVertical * factor));
    const newPaddingH = Math.max(4, Math.round(basePaddingHorizontal * factor));
    const newHeaderPaddingV = Math.max(2, Math.round(baseHeaderPaddingVertical * factor));
    const newHeaderPaddingH = Math.max(4, Math.round(baseHeaderPaddingHorizontal * factor));
    const newTotalPaddingV = Math.max(2, Math.round(baseTotalPaddingVertical * factor));
    const newTotalPaddingH = Math.max(4, Math.round(baseTotalPaddingHorizontal * factor));
    
    // Créer ou mettre à jour les styles dynamiques
    let styleElement = document.getElementById('dynamic-column-styles');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'dynamic-column-styles';
        document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
        /* Styles dynamiques pour tableaux normaux */
        table.pvtTable {
            font-size: ${newFontSize}px !important;
        }
        
        table.pvtTable thead tr th, 
        table.pvtTable tbody tr th {
            font-size: ${newHeaderFontSize}px !important;
            padding: ${newHeaderPaddingV}px ${newHeaderPaddingH}px !important;
        }
        
        table.pvtTable tbody tr td {
            padding: ${newPaddingV}px ${newPaddingH}px !important;
            font-size: ${newFontSize}px !important;
        }
        
        table.pvtTable .pvtVal {
            font-size: ${newValFontSize}px !important;
        }
        
        .pvtTotal, .pvtTotalLabel, .pvtGrandTotal {
            font-size: ${newTotalFontSize}px !important;
            padding: ${newTotalPaddingV}px ${newTotalPaddingH}px !important;
        }
        
        /* Styles dynamiques pour mode plein écran */
        #fullscreen-table-container table.pvtTable {
            font-size: ${newFontSize}px !important;
        }
        
        #fullscreen-table-container table.pvtTable thead tr th, 
        #fullscreen-table-container table.pvtTable tbody tr th {
            font-size: ${newHeaderFontSize}px !important;
            padding: ${newHeaderPaddingV}px ${newHeaderPaddingH}px !important;
        }
        
        #fullscreen-table-container table.pvtTable tbody tr td {
            font-size: ${newFontSize}px !important;
            padding: ${newPaddingV}px ${newPaddingH}px !important;
        }
        
        #fullscreen-table-container table.pvtTable .pvtVal {
            font-size: ${newValFontSize}px !important;
        }
        
        #fullscreen-table-container .pvtTotal, 
        #fullscreen-table-container .pvtTotalLabel, 
        #fullscreen-table-container .pvtGrandTotal {
            font-size: ${newTotalFontSize}px !important;
            padding: ${newTotalPaddingV}px ${newTotalPaddingH}px !important;
        }
    `;
}

/**
 * Réinitialise la taille des colonnes à la valeur par défaut
 */
function resetColumnSize() {
    changeColumnSize('1.0');
}

/**
 * Obtient la taille actuelle des colonnes depuis le sélecteur
 * @returns {string} Valeur du multiplicateur actuel
 */
function getCurrentColumnSize() {
    const selector = document.getElementById('column-size-select');
    return selector ? selector.value : '1.0';
}

/**
 * Définit la taille des colonnes et met à jour le sélecteur
 * @param {string|number} size - Taille à appliquer
 */
function setColumnSize(size) {
    const selector = document.getElementById('column-size-select');
    if (selector) {
        selector.value = size.toString();
    }
    changeColumnSize(size);
}

// Exports pour différents environnements
if (typeof module !== 'undefined' && module.exports) {
    // Environment Node.js/CommonJS
    module.exports = {
        changeColumnSize,
        resetColumnSize,
        getCurrentColumnSize,
        setColumnSize
    };
} else if (typeof window !== 'undefined') {
    // Environment Browser - Exposition globale
    window.ColumnSizeManager = {
        changeColumnSize,
        resetColumnSize,
        getCurrentColumnSize,
        setColumnSize
    };
}
