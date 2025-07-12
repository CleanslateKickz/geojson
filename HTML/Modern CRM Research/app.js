import { crmData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const tableHead = document.querySelector('#crm-comparison-table thead');
    const tableBody = document.querySelector('#crm-comparison-table tbody');
    const crmGrid = document.getElementById('crm-grid');

    const headers = ['CRM', 'Open Source', 'Free Tier', 'Self-Hosting', 'Mobile App', 'Pipeline View', 'Kanban', 'API/Webhooks', 'Custom Fields', 'Automations', 'AI Tools'];
    

    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);


    crmData.forEach(crm => {

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50';
        
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap" data-label="CRM">
                <a href="${crm.url}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-sky-600 hover:text-sky-800">${crm.name}</a>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Open Source">${crm.comparison.openSource}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Free Tier">${crm.comparison.freeTier}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Self-Hosting">${crm.comparison.selfHosting}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Mobile App">${crm.comparison.mobileApp}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Pipeline View">${crm.comparison.pipelineView}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Kanban">${crm.comparison.kanban}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="API/Webhooks">${crm.comparison.apiWebhooks}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Custom Fields">${crm.comparison.customFields}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="Automations">${crm.comparison.automations}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center table-cell-icon" data-label="AI Tools">${crm.comparison.aiTools}</td>
        `;
        tableBody.appendChild(tr);


        const card = document.createElement('div');
        card.className = 'crm-card bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden';
        card.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-bold text-slate-900">${crm.name}</h3>
                <div class="flex items-center space-x-4 mt-2 mb-4 text-sm">
                    <a href="${crm.url}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sky-600 hover:text-sky-800 font-medium">
                        Website <i data-lucide="arrow-up-right" class="w-4 h-4 ml-1"></i>
                    </a>
                    <a href="${crm.pricingUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sky-600 hover:text-sky-800 font-medium">
                        Pricing <i data-lucide="arrow-up-right" class="w-4 h-4 ml-1"></i>
                    </a>
                    ${crm.repoUrl ? `
                    <a href="${crm.repoUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center text-sky-600 hover:text-sky-800 font-medium">
                        Repository <i data-lucide="arrow-up-right" class="w-4 h-4 ml-1"></i>
                    </a>
                    ` : ''}
                </div>
                <p class="text-slate-600 leading-relaxed">${crm.description}</p>
            </div>
            
            <div class="px-6 mb-6">
                <h4 class="font-semibold text-slate-800 mb-3">Visuals</h4>
                <div class="visuals-gallery flex overflow-x-auto space-x-4 pb-2">
                    ${crm.visuals.map(visual => `
                        <a href="${visual.src}" target="_blank" class="flex-shrink-0">
                           <img src="${visual.src}" alt="${visual.alt}" class="h-40 w-auto rounded-md border border-slate-200 object-cover hover:opacity-90 transition-opacity">
                        </a>
                    `).join('')}
                </div>
            </div>

            <div class="px-6 mb-6">
                <h4 class="font-semibold text-slate-800 mb-3">Key Features</h4>
                <ul class="space-y-2 list-disc list-inside text-slate-600">
                    ${crm.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="px-6 mb-6">
                <h4 class="font-semibold text-slate-800 mb-3">Free Tier Limitations</h4>
                <div class="prose prose-sm max-w-none p-3 bg-slate-100 rounded-md border border-slate-200 text-slate-700">
                    <p>${crm.freeTierLimitations}</p>
                </div>
            </div>

            <div class="px-6 pb-6">
                <h4 class="font-semibold text-slate-800 mb-3">UX/UI Aspects</h4>
                <p class="text-slate-600 leading-relaxed">${crm.uxUiAspects}</p>
            </div>
        `;
        crmGrid.appendChild(card);
    });
    

    lucide.createIcons();
});
