import { initializeGrist, onRecordChange } from './grist-handler.js';

const {
    BalloonEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Link,
    Table,
    TableToolbar,
    Heading,
    List,
    Alignment,
    Autoformat,
    BlockQuote,
    GeneralHtmlSupport,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar
} = window.CKEDITOR;

const STORAGE_KEY = 'gristEmailTemplates.v1';
const STORAGE_ACTIVE_ID_KEY = 'gristEmailTemplates.activeId.v1';

const editorConfig = {
    toolbar: {
        items: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', 'link', '|',
            'bulletedList', 'numberedList', '|',
            'insertTable', 'blockQuote', '|',
            'alignment'
        ],
        shouldNotGroupWhenFull: false
    },
    balloonToolbar: [
        'bold', 'italic', 'link', '|',
        'bulletedList', 'numberedList'
    ],
    plugins: [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Link,
        Table,
        TableToolbar,
        Heading,
        List,
        Alignment,
        Autoformat,
        BlockQuote,
        GeneralHtmlSupport,
        Image,
        ImageCaption,
        ImageStyle,
        ImageToolbar
    ].filter(Boolean),
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
        ]
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    htmlSupport: {
        allow: [
            {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
            }
        ]
    },
    licenseKey: 'GPL',
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://'
    },
    placeholder: 'Select a template to generate email content...'
};

let editorInstance = null;
let currentGristData = null;
let lastRecordSignature = null;
let templates = [];
let activeTemplateId = null;
let mode = 'email';
let isDirty = false;

const demoData = {
    propertyName: 'Walgreens',
    address: '2280 W Main St, Medford, OR 97501',
    askingPrice: '$5,300,000',
    capRate: '9.00%',
    leaseTerm: '9.7 Years',
    buildingSize: '14,820 SF',
    description: 'Assumable Loan: 5.85%',
    mainImageUrl: 'https://ahprd1cdn.csgpimgs.com/i2/Xq0etu5MkJbI3zYt0UyRb4Ev5ANpt8Dk82wpT4Q05vY/116/image.jpg',
    landSize: '1.37 Acres',
    leaseExpiration: '08/30/2035',
    leaseType: 'NNN',
    tenancy: 'STNL',
    tenant: 'Walgreens',
    costarLink: 'https://product.costar.com/detail/lookup/7889569/sale',
    crexiLink: 'https://www.crexi.com/properties/2312272/oregon-walgreens-investment-property-medford-or',
    omLink: '',
    _rawPrice: 5300000,
    _rawCap: 0.09
};

const ui = {
    subject: document.getElementById('emailSubject'),
    copySubjectBtn: document.getElementById('copySubjectBtn'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    status: document.getElementById('statusMessage'),
    templateCategories: document.getElementById('templateCategories'),
    newTemplateBtn: document.getElementById('newTemplateBtn'),
    renameTemplateBtn: document.getElementById('renameTemplateBtn'),
    duplicateTemplateBtn: document.getElementById('duplicateTemplateBtn'),
    deleteTemplateBtn: document.getElementById('deleteTemplateBtn'),
    exportTemplatesBtn: document.getElementById('exportTemplatesBtn'),
    importTemplatesBtn: document.getElementById('importTemplatesBtn'),
    modeBadge: document.getElementById('modeBadge'),
    fieldInsertSelect: document.getElementById('fieldInsertSelect'),
    insertFieldBtn: document.getElementById('insertFieldBtn'),
    refreshFromTemplateBtn: document.getElementById('refreshFromTemplateBtn'),
    editTemplateBtn: document.getElementById('editTemplateBtn'),
    saveTemplateBtn: document.getElementById('saveTemplateBtn'),
    cancelTemplateEditBtn: document.getElementById('cancelTemplateEditBtn'),
    saveAsTemplateBtn: document.getElementById('saveAsTemplateBtn')
};

const placeholderFields = [
    { key: 'propertyName', label: 'Property Name', token: '{{propertyName}}' },
    { key: 'address', label: 'Address', token: '{{address}}' },
    { key: 'cityState', label: 'City / State', token: '{{cityState}}' },
    { key: 'askingPrice', label: 'Asking Price', token: '{{askingPrice}}' },
    { key: 'capRate', label: 'Cap Rate', token: '{{capRate}}' },
    { key: 'leaseTerm', label: 'Lease Term', token: '{{leaseTerm}}' },
    { key: 'leaseExpiration', label: 'Lease Expiration', token: '{{leaseExpiration}}' },
    { key: 'leaseType', label: 'Lease Type', token: '{{leaseType}}' },
    { key: 'tenancy', label: 'Tenancy', token: '{{tenancy}}' },
    { key: 'tenant', label: 'Tenant(s)', token: '{{tenant}}' },
    { key: 'buildingSize', label: 'Building Size', token: '{{buildingSize}}' },
    { key: 'landSize', label: 'Land Size', token: '{{landSize}}' },
    { key: 'mainImageUrl', label: 'Main Image URL', token: '{{mainImageUrl}}' },
    { key: 'costarLink', label: 'CoStar Link', token: '{{costarLink}}' },
    { key: 'crexiLink', label: 'Crexi Link', token: '{{crexiLink}}' },
    { key: 'omLink', label: 'OM Link', token: '{{omLink}}' },
    { key: 'description_html', label: 'Description (HTML)', token: '{{description_html}}' },
    { key: 'today', label: 'Today', token: '{{today}}' }
];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function computeData(raw) {
    const address = raw?.address || '';
    const parts = address.split(',').map((p) => p.trim()).filter(Boolean);
    const cityState = parts.length >= 2 ? parts.slice(1, 3).join(', ') : '';
    const description = raw?.description || '';
    const descriptionHtml = description ? escapeHtml(description).replace(/\n/g, '<br>') : '';
    const today = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date());

    return {
        ...raw,
        address,
        cityState,
        description_html: descriptionHtml,
        today
    };
}

function renderTextTemplate(text, data) {
    const ctx = computeData(data || {});
    return String(text || '').replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, key) => {
        const val = ctx[key];
        return val === undefined || val === null ? '' : String(val);
    });
}

function renderHtmlTemplate(html, data) {
    const ctx = computeData(data || {});
    const rawKeys = new Set(['description_html']);
    return String(html || '').replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, key) => {
        const val = ctx[key];
        if (val === undefined || val === null) return '';
        if (rawKeys.has(key)) return String(val);
        return escapeHtml(val);
    });
}

function createId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getDefaultTemplates() {
    const blankBody = `
        <p style="margin: 0 0 12px 0;">Paste your Outlook draft here, then replace details with placeholders like {{propertyName}}.</p>
        <p style="margin: 0;">Example: {{askingPrice}} | {{capRate}} | {{leaseTerm}}</p>
    `.trim();

    const richFrame = (innerHtml) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; table-layout: fixed; background-color: #f4f6fb; font-family: Arial, Helvetica, sans-serif;">
            <tbody>
                <tr>
                    <td align="center" style="padding: 18px 12px;">
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width: 640px; max-width: 640px; table-layout: fixed; background-color: #ffffff; border: 1px solid #dfe3ea;">
                            <tbody>
                                <tr>
                                    <td style="padding: 18px 20px;">
                                        ${innerHtml}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    `.trim();

    const richHeader = (title, subtitle) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; min-width: 100%; table-layout: fixed; border-collapse: collapse; margin: 0 0 16px 0;">
            <tbody>
                <tr>
                    <td style="background-color: #002451; padding: 16px 18px; color: #ffffff;">
                        <div style="font-size: 18px; font-weight: 700; line-height: 1.2;">${title}</div>
                        ${subtitle ? `<div style="font-size: 13px; opacity: 0.92; margin-top: 6px;">${subtitle}</div>` : ''}
                    </td>
                </tr>
            </tbody>
        </table>
    `.trim();

    const richCallout = (label, body) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; min-width: 100%; table-layout: fixed; border-collapse: collapse; margin: 0 0 16px 0;">
            <tbody>
                <tr>
                    <td style="border-left: 4px solid #0b5fff; background-color: #e7f1ff; padding: 12px 14px;">
                        <div style="font-size: 14px; line-height: 1.55; color: #111827;">
                            ${label ? `<span style="font-weight: 700;">${label}</span> ` : ''}${body}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    `.trim();

    const richFactGrid = (rows) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; min-width: 100%; table-layout: fixed; border-collapse: collapse; margin: 0 0 16px 0; border: 1px solid #dfe3ea;">
            <tbody>
                ${rows.map((row, idx) => `
                    <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f7f9fc'};">
                        <td style="width: 50%; padding: 10px 12px; border-right: 1px solid #dfe3ea; vertical-align: top;">
                            <div style="font-size: 12px; color: #6c757d; letter-spacing: 0.3px; text-transform: uppercase; font-weight: 700;">${row.leftLabel}</div>
                            <div style="font-size: 14px; color: #111827; font-weight: 700; margin-top: 4px;">${row.leftValue || '—'}</div>
                        </td>
                        <td style="width: 50%; padding: 10px 12px; vertical-align: top;">
                            <div style="font-size: 12px; color: #6c757d; letter-spacing: 0.3px; text-transform: uppercase; font-weight: 700;">${row.rightLabel}</div>
                            <div style="font-size: 14px; color: #111827; font-weight: 700; margin-top: 4px;">${row.rightValue || '—'}</div>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `.trim();

    const richKeyValueTable = (rows) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100%; min-width: 100%; table-layout: fixed; border-collapse: collapse; margin: 0 0 16px 0; background-color: #f9fafb; border: 1px solid #e5e7eb;">
            <tbody>
                ${rows.map((row) => `
                    <tr>
                        <td style="width: 160px; padding: 12px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827; font-weight: 700; vertical-align: top;">
                            ${row.label}
                        </td>
                        <td style="padding: 12px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827; vertical-align: top;">
                            ${row.value || '—'}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `.trim();

    const richSectionTitle = (text) => `
        <div style="font-size: 16px; line-height: 1.35; font-weight: 800; color: #0b5fff; margin: 14px 0 10px 0;">
            ${text}
        </div>
    `.trim();

    const richDivider = () => `
        <div style="height: 1px; background-color: #e5e7eb; margin: 16px 0;"></div>
    `.trim();

    const richHeroImage = (url) => `
        ${url ? `<img src="${url}" alt="" style="width: 100%; height: auto; display: block; border: 0; margin: 0 0 16px 0;" />` : ''}
    `.trim();

    const richButtons = (items) => `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin: 0 0 8px 0;">
            <tbody>
                <tr>
                    ${items.map((it, idx) => `
                        <td style="padding-right: ${idx === items.length - 1 ? '0' : '10px'};">
                            <a href="${it.href}" style="display: inline-block; padding: 10px 14px; border-radius: 6px; background-color: ${it.tone === 'primary' ? '#0b5fff' : '#f3f4f6'}; color: ${it.tone === 'primary' ? '#ffffff' : '#111827'}; text-decoration: none; font-size: 13px; font-weight: 700;">
                                ${it.label}
                            </a>
                        </td>
                    `).join('')}
                </tr>
            </tbody>
        </table>
    `.trim();

    const followUpBody = richFrame(`
        ${richHeader('Following Up', '{{propertyName}} • {{cityState}}')}
        <div style="font-size: 14px; line-height: 1.65; color: #111827;">
            <p style="margin: 0 0 12px 0;">Hi [Name],</p>
            <p style="margin: 0 0 12px 0;">Following up on <b>{{propertyName}}</b>. Would you like me to send a quick underwriting snapshot?</p>
        </div>
        ${richCallout('Key terms:', `<b>{{capRate}}</b> cap • <b>{{leaseTerm}}</b> remaining • <b>{{leaseType}}</b> lease`)}
        <div style="font-size: 14px; line-height: 1.65; color: #111827;">
            <p style="margin: 0;">Thanks,</p>
        </div>
    `);

    const newListingBody = richFrame(`
        ${richHeader('New Listing — {{propertyName}}', '{{address}}')}
        ${richCallout('Quick take:', 'Strong credit + clean story. Reply with target cap / geography and I’ll send a short list.')}
        ${richKeyValueTable([
            { label: 'Asking Price:', value: '{{askingPrice}}' },
            { label: 'Cap Rate:', value: '{{capRate}}' },
            { label: 'Lease Term:', value: '{{leaseTerm}}' },
            { label: 'Lease Expiration:', value: '{{leaseExpiration}}' },
            { label: 'Tenant:', value: '{{tenant}}' },
            { label: 'Lease Type:', value: '{{leaseType}}' },
            { label: 'Building Size:', value: '{{buildingSize}}' },
            { label: 'Land Size:', value: '{{landSize}}' }
        ])}
        <div style="font-size: 14px; line-height: 1.65; color: #111827; margin: 0 0 14px 0;">
            <p style="margin: 0 0 10px 0; font-weight: 700;">Highlights</p>
            <ul style="margin: 0 0 0 18px; padding: 0;">
                <li style="margin: 0 0 6px 0;">Clear underwriting, institutional profile</li>
                <li style="margin: 0 0 6px 0;">Simple diligence story, clean terms</li>
                <li style="margin: 0;">Fast read: summary + key links below</li>
            </ul>
        </div>
        ${richButtons([
            { label: 'View CoStar', href: '{{costarLink}}', tone: 'primary' },
            { label: 'View Crexi', href: '{{crexiLink}}', tone: 'secondary' },
            { label: 'View OM', href: '{{omLink}}', tone: 'secondary' }
        ])}
    `);

    const executiveSummaryBody = richFrame(`
        ${richHeader('Executive Summary', '{{propertyName}} • {{cityState}}')}
        <div style="font-size: 14px; line-height: 1.65; color: #111827; margin: 0 0 14px 0;">
            <p style="margin: 0 0 12px 0;">Hi [Name],</p>
            <p style="margin: 0;">Sharing an executive summary for <b>{{propertyName}}</b>. If helpful, I can send underwriting assumptions and a comp set.</p>
        </div>
        ${richKeyValueTable([
            { label: 'Property:', value: '{{propertyName}}' },
            { label: 'Location:', value: '{{address}}' },
            { label: 'Asking Price:', value: '{{askingPrice}}' },
            { label: 'Cap Rate:', value: '{{capRate}}' },
            { label: 'Lease Term:', value: '{{leaseTerm}}' },
            { label: 'Tenant(s):', value: '{{tenant}}' }
        ])}
        ${richCallout('Notes:', '{{description_html}}')}
        ${richButtons([
            { label: 'Listing Link', href: '{{crexiLink}}', tone: 'primary' },
            { label: 'CoStar', href: '{{costarLink}}', tone: 'secondary' }
        ])}
        <div style="font-size: 14px; line-height: 1.65; color: #111827;">
            <p style="margin: 12px 0 0 0;">Best,</p>
        </div>
    `);

    const marketUpdateBody = richFrame(`
        ${richHeader('Market Update', '{{today}}')}
        ${richCallout('Format:', 'Keep this short and punchy. Paste bullet insights, then swap in placeholders as needed.')}
        <div style="font-size: 14px; line-height: 1.65; color: #111827;">
            <p style="margin: 0 0 10px 0; font-weight: 700;">This week’s notes</p>
            <ul style="margin: 0 0 0 18px; padding: 0;">
                <li style="margin: 0 0 6px 0;">Cap rates: {{capRate}} (example placeholder)</li>
                <li style="margin: 0 0 6px 0;">New deal: {{propertyName}} in {{cityState}}</li>
                <li style="margin: 0;">Buy-boxes: term, credit, and markets driving demand</li>
            </ul>
        </div>
    `);

    const quickRecapBody = richFrame(`
        <div style="font-size: 14px; line-height: 1.75; color: #111827;">
            <p style="margin: 0 0 14px 0;">Dear [Name],</p>
            <p style="margin: 0 0 14px 0;">I wanted to follow up on our previous conversation regarding <b>{{propertyName}}</b> at {{address}}.</p>
        </div>
        ${richSectionTitle('Quick Recap:')}
        ${richKeyValueTable([
            { label: 'Property:', value: '{{propertyName}}' },
            { label: 'Location:', value: '{{address}}' },
            { label: 'Asking Price:', value: '{{askingPrice}}' },
            { label: 'Cap Rate:', value: '{{capRate}}' }
        ])}
        <div style="font-size: 14px; line-height: 1.75; color: #111827;">
            <p style="margin: 0 0 16px 0;">Looking forward to hearing from you.</p>
            <p style="margin: 0;">Best regards,</p>
            <p style="margin: 0;">[Your Name]</p>
        </div>
        <div style="margin-top: 16px;">
            ${richCallout('', 'Additional property details')}
        </div>
    `);

    const propertyFlyerBody = richFrame(`
        ${richHeroImage('{{mainImageUrl}}')}
        <div style="font-size: 24px; line-height: 1.25; font-weight: 900; color: #111827; margin: 0 0 6px 0;">
            {{propertyName}}
        </div>
        <div style="font-size: 14px; line-height: 1.5; color: #0b5fff; font-weight: 700; margin: 0 0 14px 0;">
            {{address}}
        </div>
        <div style="font-size: 13px; line-height: 1.7; color: #111827; margin: 0 0 10px 0;">
            {{description_html}}
        </div>
        ${richDivider()}
        ${richKeyValueTable([
            { label: 'Offering Price:', value: '{{askingPrice}}' },
            { label: 'Cap Rate:', value: '{{capRate}}' },
            { label: 'Leasable Area:', value: '{{buildingSize}}' },
            { label: 'Tenancy:', value: '{{tenant}}' }
        ])}
        <div style="font-size: 14px; line-height: 1.65; color: #111827; margin: 0 0 8px 0; font-weight: 800;">
            Investment Highlights:
        </div>
        <div style="font-size: 13px; line-height: 1.65; color: #111827;">
            <ul style="margin: 0 0 0 18px; padding: 0;">
                <li style="margin: 0 0 6px 0;">Core location and strong visibility</li>
                <li style="margin: 0 0 6px 0;">Clean underwriting story with simple diligence</li>
                <li style="margin: 0;">Attractive term remaining and stable tenancy</li>
            </ul>
        </div>
    `);

    return [
        {
            id: 'default_blank_outlook',
            name: 'Blank (Paste from Outlook)',
            category: 'Custom',
            icon: '✉️',
            description: 'Start from your own rich draft',
            subject: '{{propertyName}}',
            bodyHtml: blankBody
        },
        {
            id: 'default_follow_up',
            name: 'Follow-up',
            category: 'Communication',
            icon: '📞',
            description: 'Simple follow-up with placeholders',
            subject: 'Following up — {{propertyName}}',
            bodyHtml: followUpBody
        },
        {
            id: 'default_new_listing_rich',
            name: 'New Listing (Rich)',
            category: 'Listings',
            icon: '🟦',
            description: 'Modern header + facts grid + buttons',
            subject: 'New Listing: {{propertyName}} | {{capRate}} Cap',
            bodyHtml: newListingBody
        },
        {
            id: 'default_exec_summary_rich',
            name: 'Executive Summary (Rich)',
            category: 'Listings',
            icon: '📄',
            description: 'Summary format with callouts',
            subject: 'Executive Summary — {{propertyName}}',
            bodyHtml: executiveSummaryBody
        },
        {
            id: 'default_market_update_rich',
            name: 'Market Update (Rich)',
            category: 'Communication',
            icon: '📰',
            description: 'Bullet update with consistent styling',
            subject: 'Market Update — {{today}}',
            bodyHtml: marketUpdateBody
        },
        {
            id: 'default_quick_recap_rich',
            name: 'Quick Recap (Rich)',
            category: 'Communication',
            icon: '🧾',
            description: 'Recap layout with shaded table',
            subject: 'Following up — {{propertyName}}',
            bodyHtml: quickRecapBody
        },
        {
            id: 'default_property_flyer_hero',
            name: 'Property Flyer (Hero)',
            category: 'Listings',
            icon: '🖼️',
            description: 'Hero image + facts list + highlights',
            subject: '{{propertyName}} — Flyer',
            bodyHtml: propertyFlyerBody
        }
    ];
}

function loadTemplates() {
    try {
        const defaults = getDefaultTemplates();
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaults;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) return defaults;

        const keyFor = (t) => `${String(t?.category || '').trim().toLowerCase()}\u0000${String(t?.name || '').trim().toLowerCase()}`;
        const existingKeys = new Set(parsed.map(keyFor));
        const merged = [...parsed];
        for (const def of defaults) {
            if (!existingKeys.has(keyFor(def))) merged.push(def);
        }
        return merged;
    } catch {
        return getDefaultTemplates();
    }
}

function saveTemplates(next) {
    templates = Array.isArray(next) ? next : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

function getActiveTemplateId() {
    const raw = localStorage.getItem(STORAGE_ACTIVE_ID_KEY);
    return raw || null;
}

function setActiveTemplateId(id) {
    activeTemplateId = id;
    localStorage.setItem(STORAGE_ACTIVE_ID_KEY, id || '');
}

function getActiveTemplate() {
    return templates.find((t) => t.id === activeTemplateId) || templates[0] || null;
}

function setMode(nextMode) {
    mode = nextMode;
    if (!ui.modeBadge) return;
    if (mode === 'template') {
        ui.modeBadge.textContent = 'Template';
        ui.modeBadge.classList.add('template');
        ui.saveTemplateBtn.style.display = '';
        ui.cancelTemplateEditBtn.style.display = '';
        ui.editTemplateBtn.style.display = 'none';
        ui.refreshFromTemplateBtn.style.display = 'none';
        ui.saveAsTemplateBtn.style.display = 'none';
    } else {
        ui.modeBadge.textContent = 'Email';
        ui.modeBadge.classList.remove('template');
        ui.saveTemplateBtn.style.display = 'none';
        ui.cancelTemplateEditBtn.style.display = 'none';
        ui.editTemplateBtn.style.display = '';
        ui.refreshFromTemplateBtn.style.display = '';
        ui.saveAsTemplateBtn.style.display = '';
    }
}

function renderTemplateList() {
    if (!ui.templateCategories) return;
    ui.templateCategories.innerHTML = '';

    const groups = new Map();
    for (const t of templates) {
        const cat = t.category || 'Templates';
        if (!groups.has(cat)) groups.set(cat, []);
        groups.get(cat).push(t);
    }

    for (const [category, items] of groups.entries()) {
        const section = document.createElement('div');
        section.className = 'template-category';

        const heading = document.createElement('h3');
        heading.textContent = category;
        section.appendChild(heading);

        const list = document.createElement('div');
        list.className = 'template-list';

        for (const t of items) {
            const btn = document.createElement('button');
            btn.className = 'template-item';
            btn.type = 'button';
            btn.dataset.templateId = t.id;
            if (t.id === activeTemplateId) btn.classList.add('active');

            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = t.icon || '📄';
            btn.appendChild(icon);

            const info = document.createElement('div');
            info.className = 'info';

            const name = document.createElement('span');
            name.className = 'name';
            name.textContent = t.name || 'Template';
            info.appendChild(name);

            const desc = document.createElement('span');
            desc.className = 'desc';
            desc.textContent = t.description || '';
            info.appendChild(desc);

            btn.appendChild(info);

            btn.addEventListener('click', () => {
                if (mode === 'template') {
                    showStatus('Finish saving or cancel template edits first.', 'error');
                    return;
                }
                switchTemplate(t.id);
            });

            list.appendChild(btn);
        }

        section.appendChild(list);
        ui.templateCategories.appendChild(section);
    }
}

function populateFieldSelect() {
    if (!ui.fieldInsertSelect) return;
    ui.fieldInsertSelect.innerHTML = '';
    for (const f of placeholderFields) {
        const opt = document.createElement('option');
        opt.value = f.token;
        opt.textContent = f.label;
        ui.fieldInsertSelect.appendChild(opt);
    }
}

function insertToken(token) {
    if (!token) return;
    const activeEl = document.activeElement;
    if (activeEl === ui.subject) {
        const start = ui.subject.selectionStart ?? ui.subject.value.length;
        const end = ui.subject.selectionEnd ?? ui.subject.value.length;
        ui.subject.value = ui.subject.value.slice(0, start) + token + ui.subject.value.slice(end);
        ui.subject.focus();
        ui.subject.setSelectionRange(start + token.length, start + token.length);
        return;
    }

    if (!editorInstance) return;
    editorInstance.model.change((writer) => {
        const selection = editorInstance.model.document.selection;
        const pos = selection.getFirstPosition();
        writer.insertText(token, pos);
    });
    editorInstance.editing.view.focus();
}

function regenerateEmailFromTemplate() {
    const tpl = getActiveTemplate();
    if (!tpl || !editorInstance) return;
    const subject = renderTextTemplate(tpl.subject, currentGristData);
    const body = renderHtmlTemplate(tpl.bodyHtml, currentGristData);
    ui.subject.value = subject;
    editorInstance.setData(body);
    isDirty = false;
}

function switchTemplate(id) {
    setActiveTemplateId(id);
    renderTemplateList();
    regenerateEmailFromTemplate();
    showStatus('Template applied.', 'success');
}

function enterTemplateEdit() {
    const tpl = getActiveTemplate();
    if (!tpl || !editorInstance) return;
    ui.subject.value = tpl.subject || '';
    editorInstance.setData(tpl.bodyHtml || '');
    setMode('template');
    showStatus('Editing template. Save to persist changes.', 'info');
}

function cancelTemplateEdit() {
    setMode('email');
    regenerateEmailFromTemplate();
    showStatus('Template edit cancelled.', 'info');
}

function saveTemplateEdit() {
    const tpl = getActiveTemplate();
    if (!tpl || !editorInstance) return;
    const next = templates.map((t) => {
        if (t.id !== tpl.id) return t;
        return {
            ...t,
            subject: ui.subject.value || '',
            bodyHtml: editorInstance.getData() || ''
        };
    });
    saveTemplates(next);
    setMode('email');
    renderTemplateList();
    regenerateEmailFromTemplate();
    showStatus('Template saved.', 'success');
}

function saveAsNewTemplate() {
    if (!editorInstance) return;
    const name = prompt('Template name', 'New Template');
    if (!name) return;
    const category = prompt('Category', 'Custom') || 'Custom';
    const next = [
        ...templates,
        {
            id: createId(),
            name: String(name),
            category: String(category),
            icon: '⭐',
            description: 'Saved from current email',
            subject: ui.subject.value || '',
            bodyHtml: editorInstance.getData() || ''
        }
    ];
    saveTemplates(next);
    setActiveTemplateId(next[next.length - 1].id);
    renderTemplateList();
    showStatus('Saved as new template.', 'success');
}

function newTemplate() {
    const name = prompt('Template name', 'New Template');
    if (!name) return;
    const category = prompt('Category', 'Custom') || 'Custom';
    const next = [
        ...templates,
        {
            id: createId(),
            name: String(name),
            category: String(category),
            icon: '🧩',
            description: 'Custom template',
            subject: '{{propertyName}}',
            bodyHtml: ''
        }
    ];
    saveTemplates(next);
    setActiveTemplateId(next[next.length - 1].id);
    renderTemplateList();
    enterTemplateEdit();
}

function renameTemplate() {
    const tpl = getActiveTemplate();
    if (!tpl) return;
    const name = prompt('Rename template', tpl.name || '');
    if (!name) return;
    const next = templates.map((t) => (t.id === tpl.id ? { ...t, name: String(name) } : t));
    saveTemplates(next);
    renderTemplateList();
    showStatus('Template renamed.', 'success');
}

function duplicateTemplate() {
    const tpl = getActiveTemplate();
    if (!tpl) return;
    const nextTpl = {
        ...tpl,
        id: createId(),
        name: `${tpl.name || 'Template'} (Copy)`
    };
    const next = [...templates, nextTpl];
    saveTemplates(next);
    setActiveTemplateId(nextTpl.id);
    renderTemplateList();
    showStatus('Template duplicated.', 'success');
}

function deleteTemplate() {
    const tpl = getActiveTemplate();
    if (!tpl) return;
    const ok = confirm(`Delete template "${tpl.name || 'Template'}"?`);
    if (!ok) return;
    const next = templates.filter((t) => t.id !== tpl.id);
    saveTemplates(next);
    setActiveTemplateId(next[0]?.id || null);
    renderTemplateList();
    regenerateEmailFromTemplate();
    showStatus('Template deleted.', 'success');
}

async function exportTemplates() {
    const json = JSON.stringify(templates, null, 2);
    try {
        await navigator.clipboard.writeText(json);
        showStatus('Templates exported to clipboard.', 'success');
    } catch {
        showStatus('Copy failed. Try again in a secure context.', 'error');
    }
}

function importTemplates() {
    const input = prompt('Paste templates JSON');
    if (!input) return;
    try {
        const parsed = JSON.parse(input);
        if (!Array.isArray(parsed)) throw new Error('Invalid JSON');
        const cleaned = parsed
            .filter((t) => t && typeof t === 'object')
            .map((t) => ({
                id: t.id || createId(),
                name: String(t.name || 'Template'),
                category: String(t.category || 'Templates'),
                icon: String(t.icon || '📄'),
                description: String(t.description || ''),
                subject: String(t.subject || ''),
                bodyHtml: String(t.bodyHtml || '')
            }));
        saveTemplates(cleaned);
        setActiveTemplateId(cleaned[0]?.id || null);
        renderTemplateList();
        regenerateEmailFromTemplate();
        showStatus('Templates imported.', 'success');
    } catch {
        showStatus('Invalid templates JSON.', 'error');
    }
}

async function init() {
    try {
        editorInstance = await BalloonEditor.create(document.querySelector('#editor'), editorConfig);

        templates = loadTemplates();
        const preferredActiveId = getActiveTemplateId();
        activeTemplateId = templates.some((t) => t.id === preferredActiveId) ? preferredActiveId : (templates[0]?.id || null);
        setActiveTemplateId(activeTemplateId);
        populateFieldSelect();
        renderTemplateList();
        setupEventListeners();

        editorInstance.model.document.on('change:data', () => {
            if (mode === 'email') isDirty = true;
        });

        if (window.parent === window) {
            currentGristData = demoData;
            regenerateEmailFromTemplate();
            showStatus('Test mode: loaded sample record', 'info');
            return;
        }

        await initializeGrist();

        onRecordChange((data) => {
            const signature = JSON.stringify(data);
            if (signature === lastRecordSignature) return;
            lastRecordSignature = signature;
            currentGristData = data;

            if (mode === 'template') {
                showStatus('Record changed while editing template.', 'info');
                return;
            }

            if (isDirty) {
                showStatus('Record changed. Click Refresh to update the email.', 'info');
                return;
            }

            regenerateEmailFromTemplate();
            showStatus('Loaded record: ' + (data.propertyName || 'New Property'), 'info');
        });
    } catch (error) {
        console.error('Initialization Error:', error);
        showStatus('Error initializing widget. Check console.', 'error');
    }
}

function setupEventListeners() {
    ui.newTemplateBtn.addEventListener('click', newTemplate);
    ui.renameTemplateBtn.addEventListener('click', renameTemplate);
    ui.duplicateTemplateBtn.addEventListener('click', duplicateTemplate);
    ui.deleteTemplateBtn.addEventListener('click', deleteTemplate);
    ui.exportTemplatesBtn.addEventListener('click', exportTemplates);
    ui.importTemplatesBtn.addEventListener('click', importTemplates);

    ui.insertFieldBtn.addEventListener('click', () => {
        insertToken(ui.fieldInsertSelect.value);
    });

    ui.refreshFromTemplateBtn.addEventListener('click', () => {
        if (mode !== 'email') return;
        regenerateEmailFromTemplate();
        showStatus('Email refreshed from template.', 'success');
    });

    ui.editTemplateBtn.addEventListener('click', () => {
        if (mode !== 'email') return;
        enterTemplateEdit();
    });

    ui.saveTemplateBtn.addEventListener('click', () => {
        if (mode !== 'template') return;
        saveTemplateEdit();
    });

    ui.cancelTemplateEditBtn.addEventListener('click', () => {
        if (mode !== 'template') return;
        cancelTemplateEdit();
    });

    ui.saveAsTemplateBtn.addEventListener('click', () => {
        if (mode !== 'email') return;
        saveAsNewTemplate();
    });

    ui.copySubjectBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ui.subject.value).then(() => {
            showStatus('Subject copied!', 'success');
        });
    });

    ui.copyEmailBtn.addEventListener('click', () => {
        if (!editorInstance) return;
        const html = editorInstance.getData();
        const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
        const htmlBlob = new Blob([html], { type: 'text/html' });
        const textBlob = new Blob([text], { type: 'text/plain' });

        if (navigator.clipboard?.write && window.ClipboardItem) {
            navigator.clipboard.write([new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })]).then(() => {
                showStatus('Email body copied! Paste into Outlook.', 'success');
            }).catch(() => {
                navigator.clipboard.writeText(html).then(() => {
                    showStatus('Email body copied! Paste into Outlook.', 'success');
                });
            });
            return;
        }

        navigator.clipboard.writeText(html).then(() => {
            showStatus('Email body copied! Paste into Outlook.', 'success');
        });
    });
}

function showStatus(msg, type) {
    ui.status.textContent = msg;
    ui.status.className = `status-message ${type}`;
    setTimeout(() => {
        ui.status.className = 'status-message';
        ui.status.textContent = '';
    }, 4000);
}

// Start
init();
