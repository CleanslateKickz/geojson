/**
 * Email templates for different property types
 */

/**
 * Generate subject line for email
 * @param {Object} data - Normalized property data
 * @returns {string} Email subject line
 */
export function generateSubjectLine(data) {
    if (!data) return 'New Investment Opportunity';
    
    const location = data.city ? data.city : '';
    const capRate = data.formattedCapRate;
    const tenant = data.primaryTenant || data.propertyName;
    
    return `New ${capRate} Cap | ${tenant} | ${location}`;
}

/**
 * Generate opening paragraph based on property type and characteristics
 * @param {Object} data - Normalized property data
 * @returns {string} Opening paragraph HTML
 */
export function generateOpeningParagraph(data) {
    if (!data) return '';
    
    const { propertyName, primaryTenant, city, state, formattedCapRate, isSTNL, isNetLease } = data;
    
    let paragraph = `<p>We have a new opportunity in ${city}, ${state} - `;
    
    if (isSTNL) {
        paragraph += `a Single Tenant Net Lease (STNL) `;
    } else if (isNetLease) {
        paragraph += `a net lease `;
    }
    
    paragraph += `investment with ${primaryTenant}. `;
    
    // Add key selling points
    if (data.isHighCapRate) {
        paragraph += `This property offers an attractive ${formattedCapRate} cap rate. `;
    }
    
    if (data.isLongLease) {
        paragraph += `With ${data.yearsRemaining} years remaining on the lease, this provides stable, long-term income. `;
    }
    
    if (data.hasAssumableLoan) {
        paragraph += `The property features an assumable loan, providing financing advantages. `;
    }
    
    paragraph += `Please see details below.</p>`;
    
    return paragraph;
}

/**
 * Generate hero image HTML
 * @param {Object} data - Normalized property data
 * @returns {string} Hero image HTML
 */
export function generateHeroImage(data) {
    if (!data || !data.primaryImage) return '';
    
    return `
        <div style="text-align: center; margin: 20px 0;">
            <img src="${data.primaryImage}" alt="${data.propertyName}" style="max-width: 100%; height: auto; border: 1px solid #ddd;" />
            <p style="font-size: 12px; color: #666; margin-top: 5px;">${data.propertyName} - ${data.fullAddress}</p>
        </div>
    `;
}

/**
 * Generate deal callout box with key highlights
 * @param {Object} data - Normalized property data
 * @returns {string} Deal callout HTML
 */
export function generateDealCallout(data) {
    if (!data) return '';
    
    let highlights = [];
    
    if (data.isHighCapRate) {
        highlights.push(`<strong>High Cap Rate:</strong> ${data.formattedCapRate}`);
    }
    
    if (data.isLongLease) {
        highlights.push(`<strong>Long Lease:</strong> ${data.yearsRemaining} years remaining`);
    }
    
    if (data.isSTNL) {
        highlights.push(`<strong>Single Tenant:</strong> ${data.primaryTenant}`);
    }
    
    if (data.hasAssumableLoan) {
        highlights.push(`<strong>Assumable Loan</strong> available`);
    }
    
    if (data.leaseTerm) {
        highlights.push(`<strong>Lease Term:</strong> ${data.leaseTerm}`);
    }
    
    if (highlights.length === 0) {
        highlights.push(`<strong>Investment Opportunity:</strong> ${data.propertyName}`);
    }
    
    return `
        <div style="border-left: 4px solid #003A8F; background-color: #f6f8fb; padding: 12px; margin: 16px 0;">
            <h3 style="margin-top: 0;">Deal Highlights</h3>
            ${highlights.map(h => `<p style="margin-bottom: 5px;">${h}</p>`).join('')}
        </div>
    `;
}

/**
 * Generate recap table with property details
 * @param {Object} data - Normalized property data
 * @returns {string} Recap table HTML
 */
export function generateRecapTable(data) {
    if (!data) return '';
    
    return `
        <h3>Property Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Property</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.propertyName}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Tenant</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.primaryTenant}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Address</td>
                <td style="border: 1px solid #ddd; padding: 8px;" colspan="3">${data.fullAddress}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Price</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.formattedPrice}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Cap Rate</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.formattedCapRate}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Building Size</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.formattedRBA} SF</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Price/SF</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.formattedPricePerSF}</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Lease Type</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.leaseType}</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; background-color: #f2f2f2;">Lease Expiration</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${data.leaseExpiration || 'N/A'}</td>
            </tr>
        </table>
    `;
}

/**
 * Generate links section
 * @param {Object} data - Normalized property data
 * @returns {string} Links section HTML
 */
export function generateLinksSection(data) {
    if (!data) return '';
    
    let links = [];
    
    if (data.costarUrl) {
        links.push(`<a href="${data.costarUrl}" style="color: #007bff; text-decoration: none;">CoStar Listing</a>`);
    }
    
    if (data.crexiUrl) {
        links.push(`<a href="${data.crexiUrl}" style="color: #007bff; text-decoration: none;">Crexi Listing</a>`);
    }
    
    if (data.omUrl) {
        links.push(`<a href="${data.omUrl}" style="color: #007bff; text-decoration: none;">Offering Memorandum</a>`);
    }
    
    if (links.length === 0) return '';
    
    return `
        <h3>Additional Information</h3>
        <p>${links.join(' | ')}</p>
    `;
}

/**
 * Generate closing paragraph
 * @param {Object} data - Normalized property data
 * @returns {string} Closing paragraph HTML
 */
export function generateClosingParagraph(data) {
    if (!data) return '';
    
    return `
        <p>Please let me know if you would like to review underwriting, rent schedules, or schedule a site visit. This property represents a solid investment opportunity with strong fundamentals.</p>
        <p>Best regards,<br>Your Investment Team</p>
    `;
}

/**
 * Generate Net Lease email template
 * @param {Object} data - Normalized property data
 * @returns {string} Complete email HTML
 */
export function generateNetLeaseTemplate(data) {
    if (!data) return '';
    
    return `
        ${generateOpeningParagraph(data)}
        ${generateHeroImage(data)}
        ${generateDealCallout(data)}
        ${generateRecapTable(data)}
        ${generateLinksSection(data)}
        ${generateClosingParagraph(data)}
    `;
}

/**
 * Generate QSR (Quick Service Restaurant) email template
 * @param {Object} data - Normalized property data
 * @returns {string} Complete email HTML
 */
export function generateQSRTemplate(data) {
    if (!data) return '';
    
    // Add QSR-specific highlights
    let qsrHighlights = '';
    if (data.primaryTenant) {
        qsrHighlights = `
            <div style="border-left: 4px solid #003A8F; background-color: #f6f8fb; padding: 12px; margin: 16px 0;">
                <h3 style="margin-top: 0;">QSR Investment Highlights</h3>
                <p style="margin-bottom: 5px;"><strong>Brand Recognition:</strong> ${data.primaryTenant} provides strong brand recognition and customer traffic</p>
                <p style="margin-bottom: 5px;"><strong>Drive-Thru Presence:</strong> Property features drive-thru capabilities for enhanced revenue</p>
                <p style="margin-bottom: 5px;"><strong>Prime Location:</strong> Strategically located with high visibility and traffic counts</p>
            </div>
        `;
    }
    
    return `
        ${generateOpeningParagraph(data)}
        ${generateHeroImage(data)}
        ${qsrHighlights}
        ${generateDealCallout(data)}
        ${generateRecapTable(data)}
        ${generateLinksSection(data)}
        ${generateClosingParagraph(data)}
    `;
}

/**
 * Generate Big Box email template
 * @param {Object} data - Normalized property data
 * @returns {string} Complete email HTML
 */
export function generateBigBoxTemplate(data) {
    if (!data) return '';
    
    // Add Big Box-specific highlights
    let bigBoxHighlights = '';
    if (data.rba && data.rba > 25000) {
        bigBoxHighlights = `
            <div style="border-left: 4px solid #003A8F; background-color: #f6f8fb; padding: 12px; margin: 16px 0;">
                <h3 style="margin-top: 0;">Big Box Investment Highlights</h3>
                <p style="margin-bottom: 5px;"><strong>Large Format:</strong> ${data.formattedRBA} SF provides multiple redevelopment or re-tenanting options</p>
                <p style="margin-bottom: 5px;"><strong>Premium Location:</strong> High-traffic retail corridor with strong demographics</p>
                <p style="margin-bottom: 5px;"><strong>Anchor Potential:</strong> Property serves as an anchor tenant for the retail center</p>
            </div>
        `;
    }
    
    return `
        ${generateOpeningParagraph(data)}
        ${generateHeroImage(data)}
        ${bigBoxHighlights}
        ${generateDealCallout(data)}
        ${generateRecapTable(data)}
        ${generateLinksSection(data)}
        ${generateClosingParagraph(data)}
    `;
}

/**
 * Template selector function
 * @param {string} templateType - Type of template to generate
 * @param {Object} data - Normalized property data
 * @returns {string} Complete email HTML
 */
export function generateEmailTemplate(templateType, data) {
    if (!data) return '';
    
    switch (templateType) {
        case 'net-lease':
            return generateNetLeaseTemplate(data);
        case 'qsr':
            return generateQSRTemplate(data);
        case 'big-box':
            return generateBigBoxTemplate(data);
        default:
            return generateNetLeaseTemplate(data);
    }
}