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
export function normalizeRecord(rec) {
    // Helper to format currency
    const formatCurrency = (val) => {
        if (val === undefined || val === null) return '';
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    // Helper to format percentage
    const formatPercent = (val) => {
        if (val === undefined || val === null) return '';
        const num = typeof val === 'number' ? val : Number(val);
        if (!Number.isFinite(num)) return '';
        const pct = num <= 1 ? num * 100 : num;
        return pct.toFixed(2) + '%';
    };
    
    // Helper to format date
    const formatDate = (val) => {
        if (val === undefined || val === null || val === '') return '';
        if (val instanceof Date) {
            if (isNaN(val.getTime())) return '';
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(val);
        }

        if (typeof val === 'string') {
            const d = new Date(val);
            if (isNaN(d.getTime())) return val;
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(d);
        }

        if (typeof val === 'number') {
            let d;
            if (val > 1e12) {
                d = new Date(val);
            } else if (val > 1e9) {
                d = new Date(val * 1000);
            } else {
                d = new Date(val * 86400000);
            }
            if (isNaN(d.getTime())) return String(val);
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(d);
        }

        return String(val);
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
