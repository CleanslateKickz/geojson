/**
 * Email Template Generator
 * Creates Outlook-compatible HTML for investment emails.
 */

export function generateSubjectLine(templateType, data) {
    const propertyName = data.propertyName || 'Property Name';
    const cityState = data.address ? data.address.split(',').slice(1, 3).join(',').trim() : '';

    switch (templateType) {
        case 'followUp':
            return `Following up - ${propertyName}`;
        case 'introduction':
            return `Introduction: Investment Opportunities in ${cityState || 'your area'}`;
        case 'onMarket':
            return `Just Listed: ${propertyName} - ${data.capRate ? data.capRate + ' Cap' : 'Investment Opportunity'}`;
        case 'marketUpdate':
            return `Market Update: Trends in ${cityState || 'Commercial Real Estate'}`;
        case 'investment':
        default:
            // "New Listing: Walgreens - Medford, OR | 9.00% Cap"
            const parts = ['New Listing:'];
            if (propertyName) parts.push(propertyName);
            if (cityState) parts.push(`- ${cityState}`);
            if (data.capRate) parts.push(`| ${data.capRate} Cap`);
            return parts.join(' ');
    }
}

export function generateEmailTemplate(templateType, data) {
    const p = normalizeDataForTemplate(data);

    // Common Table Styles
    const tableStyle = "border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; margin-top: 20px; width: 600px;";
    const cellPadding = "padding: 8px 0;";
    const labelStyle = "color: #555555; font-size: 14px;";
    const valueStyle = "font-weight: bold; font-size: 14px; text-align: right;";
    const btnStyle = "background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;";

    // Helper for table rows
    const createMetricRow = (label, value) => `
        <tr>
            <td style="${cellPadding} ${labelStyle}">${label}:</td>
            <td style="${cellPadding} ${valueStyle}">${value}</td>
        </tr>
    `;

    // 1. INVESTMENT DETAIL (The Full Table)
    if (templateType === 'investment') {
        return `
        <h2 style="margin: 0; color: #333;">${p.propertyName}</h2>
        <p style="margin: 5px 0 20px 0; color: #666;">${p.address}</p>
        
        <img src="${p.mainImageUrl}" alt="${p.propertyName}" width="600" style="display: block; border-radius: 4px; max-width: 100%; height: auto; margin-bottom: 20px;" />
        
        <div style="font-size: 16px; line-height: 1.6; color: #333;">
            ${p.description}
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />

        <h3>Investment Highlights</h3>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td width="48%" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        ${createMetricRow('Asking Price', p.askingPrice)}
                        ${createMetricRow('Cap Rate', p.capRate)}
                        ${createMetricRow('Lease Term', p.leaseTerm)}
                        ${createMetricRow('Lease Expiration', p.leaseExpiration)}
                    </table>
                </td>
                <td width="4%">&nbsp;</td>
                <td width="48%" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        ${createMetricRow('Building Size', p.buildingSize)}
                        ${createMetricRow('Land Size', p.landSize)}
                        ${createMetricRow('Lease Type', p.leaseType)}
                        ${createMetricRow('Tenancy', p.tenancy)}
                    </table>
                </td>
            </tr>
        </table>

        ${renderLinks(p.links, btnStyle)}
        `;
    }

    // 2. FOLLOW UP
    if (templateType === 'followUp') {
        return `
        <p>Hi [Name],</p>
        <p>I wanted to follow up on our previous conversation regarding <strong>${p.propertyName}</strong> located at ${p.address}.</p>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #007bff; padding: 15px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Quick Recap:</h4>
            <ul style="margin-bottom: 0; padding-left: 20px;">
                <li><strong>Price:</strong> ${p.askingPrice}</li>
                <li><strong>Cap Rate:</strong> ${p.capRate}</li>
                <li><strong>Lease Term:</strong> ${p.leaseTerm}</li>
            </ul>
        </div>

        <p>Are you still reviewing this opportunity? Let me know if you have any questions on the financials or lease structure.</p>
        
        <p>Best regards,</p>
        <p>[Your Name]</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">Property: ${p.propertyName}</p>
        `;
    }

    // 3. INTRODUCTION
    if (templateType === 'introduction') {
        return `
        <p>Hi [Name],</p>
        <p>My name is [Your Name] with [Company]. I specialize in net lease investment sales and wanted to introduce myself.</p>
        <p>I am currently marketing several properties in your area, including <strong>${p.propertyName}</strong> (${p.cityState}).</p>
        <p>If you are currently in the market for similar assets, I would love to connect and learn more about your acquisition criteria.</p>
        <p>Best regards,</p>
        <p>[Your Name]</p>
        `;
    }

    // 4. ON MARKET (Just Listed)
    if (templateType === 'onMarket') {
        return `
        <h2 style="color: #d9534f;">JUST LISTED</h2>
        <h1>${p.propertyName}</h1>
        <p style="font-size: 18px;">${p.address}</p>

        <img src="${p.mainImageUrl}" alt="${p.propertyName}" width="600" style="display: block; border-radius: 4px; margin: 20px 0;" />

        <p>We are pleased to present this new exclusive listing. <strong>${p.propertyName}</strong> is a ${p.leaseType} investment opportunity with ${p.leaseTerm} remaining on the lease.</p>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f3f5; padding: 20px; border-radius: 8px;">
            <tr>
                <td align="center"><strong>Price</strong><br/><span style="font-size: 18px;">${p.askingPrice}</span></td>
                <td align="center"><strong>Cap Rate</strong><br/><span style="font-size: 18px;">${p.capRate}</span></td>
                <td align="center"><strong>NOI</strong><br/><span style="font-size: 18px;">TBD</span></td>
            </tr>
        </table>

        <p>${p.description}</p>

        ${renderLinks(p.links, btnStyle)}
        `;
    }

    // 5. MARKET UPDATE
    if (templateType === 'marketUpdate') {
        return `
        <h2>Market Update: ${p.cityState || 'National Trends'}</h2>
        <p>The commercial real estate market in ${p.cityState} is seeing interesting shifts this quarter.</p>
        
        <h3>Key Trends</h3>
        <ul>
            <li>Trend 1: Cap rate compression/expansion...</li>
            <li>Trend 2: Transaction volume...</li>
            <li>Trend 3: Inventory levels...</li>
        </ul>

        <p>We recently listed <strong>${p.propertyName}</strong> which is a prime example of the high-quality assets currently trading.</p>

        <p>Call me to discuss how these trends impact your portfolio.</p>
        `;
    }

    return '';
}

// Helper: Normalize Data
function normalizeDataForTemplate(data) {
    const addressParts = (data.address || '').split(',');
    const cityState = addressParts.length >= 2 ? addressParts.slice(1).join(',').trim() : '';

    const p = {
        propertyName: data.propertyName || 'Property Name',
        address: data.address || 'Address, City, State Zip',
        cityState: cityState,
        description: data.description ? data.description.replace(/\n/g, '<br>') : 'No description provided.',
        askingPrice: data.askingPrice || 'Call for Price',
        capRate: data.capRate || 'N/A',
        leaseTerm: data.leaseTerm || 'N/A',
        buildingSize: data.buildingSize || 'N/A',
        landSize: data.landSize || 'N/A',
        leaseExpiration: data.leaseExpiration || 'N/A',
        leaseType: data.leaseType || 'NNN',
        tenancy: data.tenancy || 'Single',
        mainImageUrl: data.mainImageUrl || 'https://via.placeholder.com/600x400.png?text=Property+Image',
        links: []
    };

    if (data.omLink) p.links.push({ label: 'Download OM', url: data.omLink });
    if (data.costarLink) p.links.push({ label: 'View on CoStar', url: data.costarLink });
    if (data.crexiLink) p.links.push({ label: 'View on Crexi', url: data.crexiLink });

    return p;
}

// Helper: Render Links
function renderLinks(links, btnStyle) {
    if (!links || links.length === 0) return '';
    return `
    <div style="text-align: center; margin-top: 30px;">
        ${links.map(link => `<a href="${link.url}" style="${btnStyle} margin: 0 10px;">${link.label}</a>`).join('')}
    </div>
    `;
}
