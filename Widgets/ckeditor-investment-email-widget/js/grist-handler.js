/**
 * Grist data handling and normalization for the investment email widget
 */

/**
 * Initialize Grist integration
 */
export function initializeGrist() {
    return new Promise((resolve) => {
        grist.ready({
            requiredAccess: 'read table',
            columns: [
                'Property_Name',
                'Address',
                'City',
                'State',
                'Zip',
                'Price',
                'Cap_Rate',
                'RBA',
                'Land_Size',
                'Notes',
                'Lease_Term',
                'Lease_Commencement',
                'Lease_Expiration',
                'Date_Listed',
                'Property_Type',
                'photo_url',
                'CoStar',
                'Crexi',
                'OM',
                'Lease_Options',
                'Rent_Bumps',
                'Tenancy',
                'Tenant_s_',
                'For_Sale_Status',
                'Last_Sale_Date',
                'Last_Sale_Price',
                'Lease_Type',
                'Price_SF'
            ]
        });
        
        grist.onRecord(resolve);
    });
}

/**
 * Normalize Grist record data for template use
 * @param {Object} record - Grist record object
 * @returns {Object} Normalized property data
 */
export function normalizeRecord(record) {
    if (!record) return null;
    
    // Extract city, state, zip from address if not provided separately
    const addressParts = record.Address ? record.Address.split(', ') : ['', '', ''];
    const city = record.City || (addressParts[1] || '');
    const stateZip = addressParts[2] || '';
    const state = record.State || (stateZip.split(' ')[0] || '');
    const zip = record.Zip || (stateZip.split(' ')[1] || '');
    
    // Format currency values
    const formatCurrency = (value) => {
        if (!value) return '$0';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };
    
    // Format percentage
    const formatPercent = (value) => {
        if (!value) return '0.0%';
        return `${(value * 100).toFixed(2)}%`;
    };
    
    // Format numbers with commas
    const formatNumber = (value) => {
        if (!value) return '0';
        return new Intl.NumberFormat('en-US').format(value);
    };
    
    // Parse photo URLs
    const photoUrls = record.photo_url ? 
        (typeof record.photo_url === 'string' ? record.photo_url.split(' ') : [record.photo_url]) 
        : [];
    
    // Parse tenants
    const tenants = record.Tenant_s_ ? 
        (Array.isArray(record.Tenant_s_) ? record.Tenant_s_ : [record.Tenant_s_]) 
        : [];
    
    // Parse lease options
    const leaseOptions = record.Lease_Options || '';
    
    // Check for assumable loan in notes
    const hasAssumableLoan = record.Notes && 
        (record.Notes.toLowerCase().includes('assumable') || 
         record.Notes.toLowerCase().includes('assumable loan'));
    
    // Calculate years remaining on lease
    const today = new Date();
    const leaseExpiration = record.Lease_Expiration ? new Date(record.Lease_Expiration) : null;
    const yearsRemaining = leaseExpiration ? 
        Math.max(0, Math.floor((leaseExpiration - today) / (365.25 * 24 * 60 * 60 * 1000))) : 0;
    
    return {
        // Basic property info
        propertyName: record.Property_Name || '',
        address: record.Address || '',
        city: city,
        state: state,
        zip: zip,
        fullAddress: record.Address || '',
        
        // Financial details
        price: record.Price || 0,
        formattedPrice: formatCurrency(record.Price),
        capRate: record.Cap_Rate || 0,
        formattedCapRate: formatPercent(record.Cap_Rate),
        pricePerSF: record.Price_SF || (record.Price && record.RBA ? record.Price / record.RBA : 0),
        formattedPricePerSF: formatCurrency(record.Price_SF || (record.Price && record.RBA ? record.Price / record.RBA : 0)),
        
        // Physical details
        rba: record.RBA || 0,
        formattedRBA: formatNumber(record.RBA),
        landSize: record.Land_Size || 0,
        formattedLandSize: formatNumber(record.Land_Size),
        propertyType: record.Property_Type || '',
        tenancy: record.Tenancy || '',
        
        // Lease details
        leaseTerm: record.Lease_Term || '',
        leaseCommencement: record.Lease_Commencement,
        leaseExpiration: record.Lease_Expiration,
        yearsRemaining: yearsRemaining,
        leaseType: record.Lease_Type || '',
        leaseOptions: leaseOptions,
        rentBumps: record.Rent_Bumps || '',
        
        // Images
        photoUrls: photoUrls,
        primaryImage: photoUrls.length > 0 ? photoUrls[0] : '',
        
        // Links
        costarUrl: record.CoStar || '',
        crexiUrl: record.Crexi || '',
        omUrl: record.OM || '',
        
        // Additional info
        notes: record.Notes || '',
        tenants: tenants.join(', '),
        primaryTenant: tenants.length > 0 ? tenants[0] : '',
        forSaleStatus: record.For_Sale_Status || false,
        lastSaleDate: record.Last_Sale_Date,
        lastSalePrice: record.Last_Sale_Price || 0,
        formattedLastSalePrice: formatCurrency(record.Last_Sale_Price),
        dateListed: record.Date_Listed,
        
        // Computed flags for template logic
        hasAssumableLoan: hasAssumableLoan,
        isHighCapRate: record.Cap_Rate && record.Cap_Rate > 0.07, // 7%+ is considered high
        isLongLease: yearsRemaining > 10, // 10+ years is considered long
        isNetLease: record.Lease_Type && record.Lease_Type.toLowerCase().includes('n'),
        isSTNL: record.Tenancy && record.Tenancy.toLowerCase().includes('stnl')
    };
}

/**
 * Listen for record changes in Grist
 * @param {Function} callback - Function to call when record changes
 */
export function onRecordChange(callback) {
    grist.onRecord((record) => {
        const normalizedData = normalizeRecord(record);
        callback(normalizedData);
    });
}