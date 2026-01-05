/**
 * Grist Integration Handler
 * Maps Grist columns to the widget's internal data structure.
 */

// Define the required/optional columns for the widget
const REQUIRED_ACCESS = 'read table';

export function initializeGrist() {
    return new Promise((resolve) => {
        grist.ready({
            columns: [
                { name: "Property_Name", type: "Text", optional: true },
                { name: "Address", type: "Text", optional: true },
                { name: "Price", type: "Numeric", optional: true },
                { name: "Cap_Rate", type: "Numeric", optional: true },
                { name: "Lease_Term", type: "Text", optional: true },
                { name: "RBA", type: "Numeric", optional: true },
                { name: "Notes", type: "Text", optional: true },
                { name: "photo_url", type: "Text", optional: true },
                { name: "Land_Size", type: "Numeric", optional: true },
                { name: "Lease_Expiration", type: "Date", optional: true },
                { name: "Lease_Type", type: "Choice", optional: true },
                { name: "Tenancy", type: "Choice", optional: true },
                { name: "Tenant_s_", type: "ChoiceList", optional: true },
                { name: "CoStar", type: "Text", optional: true },
                { name: "Crexi", type: "Text", optional: true },
                { name: "OM", type: "Text", optional: true },
                { name: "For_Sale_Status", type: "Bool", optional: true }
            ],
            requiredAccess: REQUIRED_ACCESS
        });
        resolve();
    });
}

export function onRecordChange(callback) {
    grist.onRecord((record) => {
        if (!record) return;
        const mappedData = normalizeRecord(record);
        callback(mappedData);
    });
}

/**
 * Maps raw Grist record to a normalized object.
 * Handles formatting (currency, percentages, dates) where possible.
 */
function normalizeRecord(rec) {
    // Helper to format currency
    const formatCurrency = (val) => {
        if (val === undefined || val === null) return '';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Helper to format percentage
    const formatPercent = (val) => {
        if (val === undefined || val === null) return '';
        // If it's 0.09, return 9.00%. If it's 9, return 9%. 
        // Grist usually sends raw numbers. Assuming 0.09 for 9%.
        // Wait, prompt says "9.00%", which might be a formatted string or raw number 0.09.
        // Let's assume raw number.
        return (val * 100).toFixed(2) + '%';
    };
    
    // Helper to format date
    const formatDate = (val) => {
        if (!val) return '';
        // Grist sends dates as seconds since epoch or formatted string depending on config.
        // But usually in JS API it comes as a timestamp or object.
        // Safe check:
        const d = new Date(val * 1000); // Grist dates are seconds
        if (isNaN(d.getTime())) return String(val); // Fallback if it's a string
        return d.toLocaleDateString('en-US');
    };

    // Helper for arrays (ChoiceList)
    const formatList = (val) => {
        if (Array.isArray(val)) {
            // Filter out 'L' codes if Grist sends ['L', 'Label'] format (unlikely in mapping mode, but possible)
            // Usually mapped records give the values directly.
            return val.join(', ');
        }
        return val || '';
    };

    return {
        propertyName: rec.Property_Name || '',
        address: rec.Address || '',
        askingPrice: formatCurrency(rec.Price),
        capRate: typeof rec.Cap_Rate === 'number' ? formatPercent(rec.Cap_Rate) : (rec.Cap_Rate || ''),
        leaseTerm: rec.Lease_Term || '',
        buildingSize: rec.RBA ? `${rec.RBA.toLocaleString()} SF` : '',
        description: rec.Notes || '',
        mainImageUrl: (rec.photo_url || '').split(' ')[0], // Take first image if multiple
        landSize: rec.Land_Size ? `${rec.Land_Size} Acres` : '',
        leaseExpiration: formatDate(rec.Lease_Expiration),
        leaseType: rec.Lease_Type || '',
        tenancy: rec.Tenancy || '',
        tenant: formatList(rec.Tenant_s_),
        costarLink: rec.CoStar || '',
        crexiLink: rec.Crexi || '',
        omLink: rec.OM || '',
        // Raw values for logic if needed
        _rawPrice: rec.Price,
        _rawCap: rec.Cap_Rate
    };
}
