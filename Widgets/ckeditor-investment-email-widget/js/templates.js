/**
 * Email Template Generator
 * Creates Outlook-compatible HTML for investment emails.
 */

export function generateSubjectLine(data) {
    // E.g., "New Listing: Walgreens - Medford, OR | 9.00% Cap"
    const parts = ['New Listing:'];
    if (data.propertyName) parts.push(data.propertyName);
    
    // Extract City/State from address if possible
    if (data.address) {
        const addressParts = data.address.split(',');
        if (addressParts.length >= 2) {
            // City, State
            parts.push(`- ${addressParts[1].trim()}, ${addressParts[2]?.trim().split(' ')[0] || ''}`);
        }
    }
    
    if (data.capRate) parts.push(`| ${data.capRate} Cap`);
    
    return parts.join(' ');
}

export function generateEmailTemplate(templateType, data) {
    // We currently only support one main 'investment' template, 
    // but structure allows for more.
    
    const p = {
        propertyName: data.propertyName || 'Property Name',
        address: data.address || 'Address, City, State Zip',
        description: data.description ? data.description.replace(/\n/g, '<br>') : 'No description provided.',
        askingPrice: data.askingPrice || 'Call for Price',
        capRate: data.capRate || 'N/A',
        leaseTerm: data.leaseTerm || 'N/A',
        buildingSize: data.buildingSize || 'N/A',
        landSize: data.landSize || 'N/A',
        leaseExpiration: data.leaseExpiration || 'N/A',
        mainImageUrl: data.mainImageUrl || 'https://via.placeholder.com/600x400.png?text=Property+Image',
        links: []
    };

    // Build links array
    if (data.omLink) p.links.push({ label: 'Download OM', url: data.omLink });
    if (data.costarLink) p.links.push({ label: 'View on CoStar', url: data.costarLink });
    if (data.crexiLink) p.links.push({ label: 'View on Crexi', url: data.crexiLink });

    // Helper for table rows
    const createMetricRow = (label, value) => `
        <tr>
            <td style="padding: 8px 0; color: #555555; font-size: 14px;">${label}:</td>
            <td style="padding: 8px 0; font-weight: bold; font-size: 14px; text-align: right;">${value}</td>
        </tr>
    `;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${p.propertyName}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border: 1px solid #dddddd; margin-top: 20px;">
            
            <!-- Header -->
            <tr>
                <td align="center" style="padding: 30px 20px;">
                    <h1 style="font-size: 24px; margin: 0; color: #333333;">${p.propertyName}</h1>
                    <p style="font-size: 16px; margin: 5px 0 0 0; color: #666666;">${p.address}</p>
                </td>
            </tr>

            <!-- Main Image -->
            <tr>
                <td align="center" style="padding: 0 20px;">
                    <img src="${p.mainImageUrl}" alt="${p.propertyName}" width="560" style="display: block; border-radius: 4px; max-width: 100%; height: auto;" />
                </td>
            </tr>

            <!-- Content -->
            <tr>
                <td bgcolor="#ffffff" style="padding: 30px 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        
                        <!-- Description -->
                        <tr>
                            <td style="color: #333333; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;">
                                ${p.description}
                            </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                            <td style="padding: 30px 0;">
                                <hr style="border: 0; border-top: 1px solid #eeeeee;" />
                            </td>
                        </tr>

                        <!-- Investment Highlights (2 Columns) -->
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <!-- Left Column -->
                                        <td width="250" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                ${createMetricRow('Asking Price', p.askingPrice)}
                                                ${createMetricRow('Cap Rate', p.capRate)}
                                                ${createMetricRow('Lease Term', p.leaseTerm)}
                                                ${createMetricRow('Lease Expiration', p.leaseExpiration)}
                                            </table>
                                        </td>
                                        
                                        <!-- Spacer -->
                                        <td width="20" style="font-size: 0; line-height: 0;">&nbsp;</td>
                                        
                                        <!-- Right Column -->
                                        <td width="250" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                ${createMetricRow('Building Size', p.buildingSize)}
                                                ${createMetricRow('Land Size', p.landSize)}
                                                ${createMetricRow('Lease Type', data.leaseType || 'N/A')}
                                                ${createMetricRow('Tenancy', data.tenancy || 'N/A')}
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Links Section -->
                        ${p.links.length > 0 ? `
                        <tr>
                            <td style="padding-top: 30px; text-align: center;">
                                <table border="0" cellpadding="0" cellspacing="0" align="center">
                                    <tr>
                                        ${p.links.map(link => `
                                            <td style="padding: 0 10px;">
                                                <a href="${link.url}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; display: inline-block;">${link.label}</a>
                                            </td>
                                        `).join('')}
                                    </tr>
                                </table>
                            </td>
                        ` : ''}
                        </tr>

                    </table>
                </td>
            </tr>
            
            <!-- Footer -->
            <tr>
                <td bgcolor="#f8f9fa" style="padding: 20px; text-align: center; color: #999999; font-size: 12px; border-top: 1px solid #eeeeee;">
                    <p style="margin: 0;">Sent via Investment Email Generator</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}
