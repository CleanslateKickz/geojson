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
        case 'onMarket':
            return `Just Listed: ${propertyName} - ${data.capRate ? data.capRate + ' Cap' : 'Investment Opportunity'}`;
        case 'marketUpdate':
            return `Market Update: Trends in ${cityState || 'Commercial Real Estate'}`;
        case 'propertyFlyer':
            return `Property Flyer: ${propertyName}`;
        case 'executiveSummary':
            return `Executive Summary: ${propertyName}`;
        case 'quickSnapshot':
            return `Quick Snapshot: ${propertyName}`;
        case 'premiumHighlight':
            return `Featured Offering: ${propertyName}`;
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

    const baseTheme = {
        pageBg: '#f4f6fb',
        cardBg: '#ffffff',
        headerBg: 'rgb(0, 36, 81)',
        headerText: 'rgb(255, 255, 255)',
        accent: 'rgb(0, 86, 179)',
        calloutBg: 'rgb(248, 249, 250)',
        calloutBorder: 'rgb(0, 86, 179)',
        text: 'rgb(17, 24, 39)',
        muted: 'rgb(90, 90, 90)',
        tableBorder: '#dfe3ea',
        rowAlt: '#f7f9fc'
    };

    const themeByTemplate = {
        investment: { headerBg: '#002451', accent: '#0056b3', calloutBorder: '#0056b3' },
        onMarket: { headerBg: '#064e3b', accent: '#10b981', calloutBorder: '#10b981' },
        premiumHighlight: { headerBg: '#0b1f3a', accent: '#b88a2e', calloutBorder: '#b88a2e', calloutBg: '#fffbf2' },
        propertyFlyer: { headerBg: '#1f2937', accent: '#111827', calloutBorder: '#111827' },
        executiveSummary: { headerBg: '#0f172a', accent: '#2563eb', calloutBorder: '#2563eb' },
        quickSnapshot: { headerBg: '#111827', accent: '#0b5fff', calloutBorder: '#0b5fff' },
        followUp: { headerBg: '#0f172a', accent: '#0b5fff', calloutBorder: '#0b5fff' },
        marketUpdate: { headerBg: '#0f172a', accent: '#0b5fff', calloutBorder: '#0b5fff' }
    };

    const theme = { ...baseTheme, ...(themeByTemplate[templateType] || {}) };

    const font = `font-family: Arial, Helvetica, sans-serif;`;
    const bodyText = `font-size: 15px; line-height: 1.55; color: ${theme.text}; ${font}`;
    const helperText = `font-size: 13px; line-height: 1.5; color: ${theme.muted}; ${font}`;
    const sectionGap = `margin: 0 0 16px 0;`;

    const emailFrame = (innerHtml) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="${font} background-color: ${theme.pageBg};">
            <tbody>
                <tr>
                    <td align="center" style="padding: 18px 12px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width: 640px; max-width: 640px; background-color: ${theme.cardBg}; border: 1px solid ${theme.tableBorder};">
                            <tbody>
                                <tr>
                                    <td style="padding: 16px 18px 18px 18px;">
                                        ${innerHtml}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    const headerBar = (title) => `
        <table style="direction: ltr; text-align: left; background-color: rgb(255, 255, 255); margin-bottom: 14px; width: 100%; color: rgb(0, 0, 0); box-sizing: border-box; border-collapse: collapse; border-spacing: 0px;" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td style="direction: ltr; text-align: left; background-color: ${theme.headerBg}; padding: 16px 18px; color: ${theme.headerText};">
                        <div style="direction: ltr; text-align: left; margin: 0px; ${font} font-size: 17px;">
                            <b>${title}</b>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    const calloutBox = (titleHtml, bodyHtml) => `
        <table style="direction: ltr; text-align: left; background-color: rgb(255, 255, 255); margin-bottom: 16px; width: 100%; color: rgb(0, 0, 0); box-sizing: border-box; border-collapse: collapse; border-spacing: 0px;" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
                    <td style="direction: ltr; text-align: left; border-left: 4px solid ${theme.calloutBorder}; background-color: ${theme.calloutBg}; padding: 14px 14px; box-sizing: border-box;">
                        <div style="${bodyText}">
                            ${titleHtml ? `<b>${titleHtml}</b> ` : ''}${bodyHtml}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    const maybeImage = (url) => {
        if (!url) return '';
        return `
            <div style="${sectionGap}">
                <img src="${url}" alt="" style="width: 100%; height: auto; display: block; border: 0;" />
            </div>
        `;
    };

    const metricBox = (label, value, tone = 'default') => {
        const bg = tone === 'soft' ? theme.calloutBg : '#ffffff';
        return `
            <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; border: 1px solid ${theme.tableBorder}; background-color: ${bg};">
                <tbody>
                    <tr>
                        <td style="padding: 10px 12px 4px 12px; ${helperText}">${label}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0 12px 10px 12px; ${bodyText}"><b>${value || '—'}</b></td>
                    </tr>
                </tbody>
            </table>
        `;
    };

    const metricGrid = (pairs, tone = 'default') => {
        const bg = tone === 'soft' ? theme.calloutBg : '#ffffff';
        return `
            <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 0 0 16px 0; border: 1px solid ${theme.tableBorder}; background-color: ${bg};">
                <tbody>
                    ${pairs.map(([left, right], idx) => `
                        <tr style="background-color: ${idx % 2 === 1 ? theme.rowAlt : bg};">
                            <td style="width: 50%; padding: 10px 12px; border-right: 1px solid ${theme.tableBorder}; vertical-align: top;">
                                <div style="${helperText}">${left?.label || ''}</div>
                                <div style="${bodyText}"><b>${left?.value || '—'}</b></div>
                            </td>
                            <td style="width: 50%; padding: 10px 12px; vertical-align: top;">
                                <div style="${helperText}">${right?.label || ''}</div>
                                <div style="${bodyText}"><b>${right?.value || '—'}</b></div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };

    const kpiRow = (items) => `
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 0 0 16px 0;">
            <tbody>
                <tr>
                    ${items.map((it, idx) => `
                        <td style="width: ${Math.floor(100 / items.length)}%; padding: 0 ${idx === 0 ? '8px 0 0' : idx === items.length - 1 ? '0 0 0 8px' : '8px'}; vertical-align: top;">
                            ${metricBox(it.label, it.value, 'soft')}
                        </td>
                    `).join('')}
                </tr>
            </tbody>
        </table>
    `;

    const bodyWrap = (html) => `<div style="${bodyText}">${html}</div>`;
    const sectionLabel = (text) => `<div style="${helperText}; text-transform: uppercase; letter-spacing: 0.7px; font-weight: 700; margin: 0 0 8px 0;">${text}</div>`;

    const twoCol = (leftHtml, rightHtml) => `
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 0 0 16px 0;">
            <tbody>
                <tr>
                    <td style="width: 58%; padding: 0 10px 0 0; vertical-align: top;">
                        ${leftHtml}
                    </td>
                    <td style="width: 42%; padding: 0 0 0 10px; vertical-align: top;">
                        ${rightHtml}
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    if (templateType === 'investment') {
        const title = `${p.propertyName} — ${p.address}`;
        const pairs = [
            [{ label: 'Asking Price', value: p.askingPrice }, { label: 'Cap Rate', value: p.capRate }],
            [{ label: 'Lease Term Remaining', value: p.leaseTerm }, { label: 'Lease Expiration', value: p.leaseExpiration }],
            [{ label: 'Lease Type', value: p.leaseType }, { label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }],
            [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }]
        ];

        return emailFrame(`
            ${maybeImage(p.mainImageUrl)}
            ${headerBar(title)}
            ${kpiRow([
                { label: 'Asking Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm },
                { label: 'Tenant', value: p.tenant || '—' }
            ])}
            ${twoCol(
                `
                    ${calloutBox('Investment thesis:', `Clean <b>${p.leaseType || '—'}</b> structure with an institutional buyer profile. Reply with target cap / geography and I’ll send a short list of current offerings.`)}
                    ${sectionLabel('Highlights')}
                    ${bodyWrap(`
                        <ul style="margin: 0 0 0 18px; padding: 0;">
                            <li style="margin: 0 0 6px 0;">Lease security + straightforward diligence story</li>
                            <li style="margin: 0 0 6px 0;">Strong visibility / core retail corridor</li>
                            <li style="margin: 0;">Easy underwriting: clean metrics and terms</li>
                        </ul>
                    `)}
                `,
                `
                    ${sectionLabel('Key Facts')}
                    ${metricGrid(pairs, 'soft')}
                `
            )}
            ${p.description ? calloutBox('Notes:', p.description) : ''}
        `);
    }

    if (templateType === 'quickSnapshot') {
        const title = `Quick Snapshot — ${p.propertyName}`;
        return emailFrame(`
            ${headerBar(title)}
            ${calloutBox('', `<b>${p.propertyName}</b> in ${p.cityState || p.address}. Ideal for a quick “hit the list” message.`)}
            ${kpiRow([
                { label: 'Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm },
                { label: 'Lease Type', value: p.leaseType }
            ])}
            ${twoCol(
                `
                    ${sectionLabel('Positioning')}
                    ${bodyWrap(`
                        <p style="margin: 0 0 10px 0;">Clean diligence story and buyer-ready summary. Reply with target cap / geography and I’ll tailor additional options.</p>
                        <p style="margin: 0;">Happy to send underwriting support if helpful.</p>
                    `)}
                `,
                `
                    ${sectionLabel('Details')}
                    ${metricGrid([
                        [{ label: 'Location', value: p.cityState || p.address }, { label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }],
                        [{ label: 'Lease Expiration', value: p.leaseExpiration }, { label: 'Building Size', value: p.buildingSize }],
                        [{ label: 'Land Size', value: p.landSize }, { label: 'Lease Type', value: p.leaseType }]
                    ], 'soft')}
                `
            )}
        `);
    }

    if (templateType === 'premiumHighlight') {
        const title = `Featured Offering — ${p.propertyName}`;
        return emailFrame(`
            ${maybeImage(p.mainImageUrl)}
            ${headerBar(title)}
            ${calloutBox('Featured:', `<b>${p.propertyName}</b> at ${p.address}. Polished buyer-facing story with clean terms.`)}
            ${kpiRow([
                { label: 'Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm }
            ])}
            ${twoCol(
                `
                    ${sectionLabel('Why It Stands Out')}
                    ${bodyWrap(`
                        <ul style="margin: 0 0 0 18px; padding: 0;">
                            <li style="margin: 0 0 6px 0;">Buyer-ready diligence story and simple underwriting</li>
                            <li style="margin: 0 0 6px 0;">Lease structure emphasizes durability and predictability</li>
                            <li style="margin: 0;">Strong market fundamentals in ${p.cityState || 'the area'}</li>
                        </ul>
                    `)}
                    ${p.description ? calloutBox('Notes:', p.description) : ''}
                `,
                `
                    ${sectionLabel('Deal Summary')}
                    ${metricGrid([
                        [{ label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }, { label: 'Lease Type', value: p.leaseType }],
                        [{ label: 'Lease Expiration', value: p.leaseExpiration }, { label: 'Location', value: p.cityState || p.address }],
                        [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }]
                    ], 'soft')}
                `
            )}
        `);
    }

    if (templateType === 'followUp') {
        const title = `${p.propertyName} — ${p.address}`;
        const pairs = [
            [{ label: 'Asking Price', value: p.askingPrice }, { label: 'Cap Rate', value: p.capRate }],
            [{ label: 'Lease Term Remaining', value: p.leaseTerm }, { label: 'Lease Type', value: p.leaseType }],
            [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }]
        ];

        return emailFrame(`
            ${headerBar(title)}
            ${bodyWrap(`
                <p style="margin: 0 0 12px 0;">Hi [Name],</p>
                <p style="margin: 0 0 12px 0;">Following up on <b>${p.propertyName}</b>. Any interest in taking a quick look this week?</p>
                <p style="margin: 0;">If helpful, I can send a one-page underwriting snapshot or walk through the lease structure in 5 minutes.</p>
            `)}
            ${calloutBox('Quick recap:', `Asking <b>${p.askingPrice}</b> at <b>${p.capRate}</b>. Lease term remaining <b>${p.leaseTerm || '—'}</b>.`)}
            ${metricGrid(pairs, 'soft')}
        `);
    }

    if (templateType === 'onMarket') {
        const title = `JUST LISTED — ${p.propertyName}`;
        const pairs = [
            [{ label: 'Lease Type', value: p.leaseType }, { label: 'Lease Term Remaining', value: p.leaseTerm }],
            [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }],
            [{ label: 'Lease Expiration', value: p.leaseExpiration }, { label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }]
        ];

        return emailFrame(`
            ${maybeImage(p.mainImageUrl)}
            ${headerBar(title)}
            ${calloutBox('', `<b>${p.address}</b>. New exclusive listing — clean, buyer-ready story.`)}
            ${kpiRow([
                { label: 'Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm }
            ])}
            ${twoCol(
                `
                    ${sectionLabel('Buyer Notes')}
                    ${bodyWrap(`
                        <ul style="margin: 0 0 0 18px; padding: 0;">
                            <li style="margin: 0 0 6px 0;">Straightforward lease structure + diligence</li>
                            <li style="margin: 0 0 6px 0;">Strong visibility / trade area fundamentals</li>
                            <li style="margin: 0;">Fast underwriting: clean metrics and terms</li>
                        </ul>
                    `)}
                    ${calloutBox('Next step:', `Reply with target cap / geography and I’ll tailor additional options for your criteria.`)}
                `,
                `
                    ${sectionLabel('Key Facts')}
                    ${metricGrid(pairs, 'soft')}
                `
            )}
        `);
    }

    if (templateType === 'marketUpdate') {
        const title = p.cityState ? `Market Update — ${p.cityState}` : 'Market Update';
        return emailFrame(`
            ${headerBar(title)}
            ${twoCol(
                `
                    ${sectionLabel('What We’re Seeing')}
                    ${bodyWrap(`
                        <p style="margin: 0 0 10px 0;">A quick pulse-check you can tailor to your list:</p>
                        <ul style="margin: 0 0 0 18px; padding: 0;">
                            <li style="margin: 0 0 6px 0;">Best-in-class credits and locations continue to price at a premium.</li>
                            <li style="margin: 0 0 6px 0;">Buyers are prioritizing lease security and clean diligence.</li>
                            <li style="margin: 0;">Deals move fastest when the story is simple and financeable.</li>
                        </ul>
                    `)}
                    ${calloutBox('CTA:', `Send me your target cap range, market, and price range — I’ll respond with a short list of current offerings.`)}
                `,
                `
                    ${sectionLabel('Spotlight')}
                    ${calloutBox('', `<b>${p.propertyName}</b><br>${p.address}`)}
                    ${kpiRow([
                        { label: 'Price', value: p.askingPrice },
                        { label: 'Cap Rate', value: p.capRate },
                        { label: 'Lease Term', value: p.leaseTerm }
                    ])}
                `
            )}
        `);
    }

    if (templateType === 'propertyFlyer') {
        const title = `${p.propertyName} — ${p.address}`;
        const pairs = [
            [{ label: 'Asking Price', value: p.askingPrice }, { label: 'Cap Rate', value: p.capRate }],
            [{ label: 'Lease Type', value: p.leaseType }, { label: 'Lease Term Remaining', value: p.leaseTerm }],
            [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }],
            [{ label: 'Lease Expiration', value: p.leaseExpiration }, { label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }]
        ];

        return emailFrame(`
            ${maybeImage(p.mainImageUrl)}
            ${headerBar(title)}
            ${kpiRow([
                { label: 'Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm }
            ])}
            ${twoCol(
                `
                    ${sectionLabel('One-Page Narrative')}
                    ${bodyWrap(`
                        <p style="margin: 0 0 10px 0;"><b>${p.propertyName}</b> is a ${p.leaseType || '—'} opportunity positioned for streamlined underwriting and a clean diligence path.</p>
                        <p style="margin: 0 0 10px 0;">Ideal for buyers prioritizing lease security and straightforward execution.</p>
                        <p style="margin: 0;">Please reply if you’d like underwriting support or a quick walk-through.</p>
                    `)}
                    ${p.description ? calloutBox('Notes:', p.description) : ''}
                `,
                `
                    ${sectionLabel('Key Facts')}
                    ${metricGrid(pairs, 'soft')}
                `
            )}
        `);
    }

    if (templateType === 'executiveSummary') {
        const title = `Executive Summary — ${p.propertyName}`;
        const pairs = [
            [{ label: 'Location', value: p.cityState || p.address }, { label: 'Asking Price', value: p.askingPrice }],
            [{ label: 'Cap Rate', value: p.capRate }, { label: 'Lease Term Remaining', value: p.leaseTerm }],
            [{ label: 'Lease Type', value: p.leaseType }, { label: 'Tenant / Tenancy', value: p.tenant || p.tenancy }],
            [{ label: 'Building Size', value: p.buildingSize }, { label: 'Land Size', value: p.landSize }]
        ];

        return emailFrame(`
            ${headerBar(title)}
            ${calloutBox('', `<b>${p.propertyName}</b> at ${p.address}. Below is a clean, investor-friendly summary you can paste into an email.`)}
            ${sectionLabel('At A Glance')}
            ${kpiRow([
                { label: 'Price', value: p.askingPrice },
                { label: 'Cap Rate', value: p.capRate },
                { label: 'Lease Term', value: p.leaseTerm },
                { label: 'Lease Type', value: p.leaseType }
            ])}
            ${twoCol(
                `
                    ${sectionLabel('Summary')}
                    ${bodyWrap(`
                        <p style="margin: 0 0 10px 0;">This offering features a clean lease structure and a straightforward underwriting story suited for a broad buyer pool.</p>
                        <p style="margin: 0;">Please reply with your criteria if you’d like additional options in similar markets.</p>
                    `)}
                `,
                `
                    ${sectionLabel('Key Facts')}
                    ${metricGrid(pairs, 'soft')}
                `
            )}
            ${p.description ? calloutBox('Notes:', p.description) : ''}
        `);
    }

    return '';
}

// Helper: Normalize Data
function normalizeDataForTemplate(data) {
    const addressParts = (data.address || '').split(',');
    const cityState = addressParts.length >= 2 ? addressParts.slice(1).join(',').trim() : '';

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
            if (val > 1e12) d = new Date(val);
            else if (val > 1e9) d = new Date(val * 1000);
            else d = new Date(val * 86400000);
            if (isNaN(d.getTime())) return String(val);
            return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(d);
        }
        return String(val);
    };

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
        leaseExpiration: formatDate(data.leaseExpiration) || 'N/A',
        leaseType: data.leaseType || 'NNN',
        tenancy: data.tenancy || 'Single',
        tenant: data.tenant || '',
        mainImageUrl: data.mainImageUrl || 'https://via.placeholder.com/600x400.png?text=Property+Image'
    };

    return p;
}
