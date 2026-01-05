/**
 * Test data for Walgreens property example
 * This can be used to test the widget without connecting to Grist
 */

export const walgreensTestData = {
    id: 1,
    Property_Name: "Walgreens",
    Address: "2280 W Main St, Medford, OR 97501",
    Price: 5300000,
    Cap_Rate: 0.09,
    RBA: 14820,
    Land_Size: 1.37,
    Notes: "Assumable Loan: 5.85%",
    Lease_Term: "9.7 Years",
    Lease_Commencement: null,
    Lease_Expiration: "2035-08-30",
    Date_Listed: "2026-01-05",
    Property_Type: "Big Box",
    photo_url: "https://ahprd1cdn.csgpimgs.com/i2/Xq0etu5MkJbI3zYt0UyRb4Ev5ANpt8Dk82wpT4Q05vY/116/image.jpg https://images.crexi.com/assets/2312272/b15b8a26035140bda6c94b68479e7a35_3000x2000_resize.jpg https://images.crexi.com/assets/2312272/bceca346f6124dc89a43b0b3247ca427_3000x2000_resize.jpg https://images.crexi.com/assets/2312272/662e5141a217498bb7b8b5d9c8421d3e_3000x2000_resize.jpg",
    CoStar: "https://product.costar.com/detail/lookup/7889569/sale",
    Crexi: "https://www.crexi.com/properties/2312272/oregon-walgreens-investment-property-medford-or",
    OM: "file:///C:/Users/Admin/Documents/Other/GRIST/Tenant's%20OCR/%F0%9F%9B%92%20Supermarket%20%F0%9F%9B%92/Walgreen's/(Walgreens)%202280%20W%20Main%20St,%20Medford,%20OR.pdf",
    FileName: "(Walgreens) 2280 W Main St, Medford, OR 97501",
    Lease_Options: "Up To (50) 1-Year Options",
    Rent_Bumps: "Flat",
    Tenancy: "STNL",
    Tenant_s_: ["Walgreens"],
    For_Sale_Status: true,
    Last_Sale_Date: "2010-12-17",
    Last_Sale_Price: 6686750,
    Lease_Type: "NNN"
};

/**
 * Function to simulate Grist data for testing
 */
export function simulateGristData() {
    // Override grist.onRecord for testing
    if (typeof window !== 'undefined') {
        window.grist = window.grist || {};
        window.grist.onRecord = (callback) => {
            // Simulate initial load with test data
            setTimeout(() => {
                callback(walgreensTestData);
            }, 100);
        };
        
        window.grist.ready = (options) => {
            console.log('Grist ready simulated with options:', options);
            return Promise.resolve();
        };
    }
}