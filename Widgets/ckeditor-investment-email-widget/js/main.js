import { initializeGrist, onRecordChange } from './grist-handler.js';
import { generateSubjectLine, generateEmailTemplate } from './templates.js';

// Access CKEditor from the global window object (loaded via CDN)
const { BalloonEditor, Essentials, Paragraph, Bold, Italic, Link, Table, TableToolbar, Heading, List, Alignment, Autoformat, BlockQuote } = window.CKEDITOR;

const LICENSE_KEY = 'GPL'; // Use your license key if you have one

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
    plugins: [
        Essentials, Paragraph, Bold, Italic, Link, Table, TableToolbar, 
        Heading, List, Alignment, Autoformat, BlockQuote
    ],
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
    licenseKey: LICENSE_KEY,
    placeholder: 'Select a template to generate email content...'
};

// Global State
let editorInstance = null;
let currentGristData = null;
let currentTemplate = 'followUp'; // Default template

// UI Elements
const ui = {
    subject: document.getElementById('emailSubject'),
    copySubjectBtn: document.getElementById('copySubjectBtn'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    status: document.getElementById('statusMessage'),
    templateButtons: document.querySelectorAll('.template-item')
};

// Application Initialization
async function init() {
    try {
        // 1. Initialize Balloon Editor
        editorInstance = await BalloonEditor.create(document.querySelector('#editor'), editorConfig);
        
        // 2. Initialize Grist
        await initializeGrist();
        
        // 3. Setup Grist Listener
        onRecordChange((data) => {
            currentGristData = data;
            regenerateTemplate(); 
            showStatus('Loaded record: ' + (data.propertyName || 'New Property'), 'info');
        });

        // 4. Setup UI Listeners
        setupEventListeners();

    } catch (error) {
        console.error('Initialization Error:', error);
        showStatus('Error initializing widget. Check console.', 'error');
    }
}

function regenerateTemplate() {
    if (!editorInstance || !currentGristData) return;
    
    // Update Subject
    ui.subject.value = generateSubjectLine(currentTemplate, currentGristData);
    
    // Update Editor Content
    const html = generateEmailTemplate(currentTemplate, currentGristData);
    editorInstance.setData(html);
}

function setupEventListeners() {
    // Template Switching
    ui.templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            ui.templateButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            
            // Set current template
            currentTemplate = btn.dataset.template;
            
            // Regenerate content
            regenerateTemplate();
            showStatus(`Switched to ${currentTemplate} template`, 'success');
        });
    });

    // Copy Subject
    ui.copySubjectBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ui.subject.value).then(() => {
            showStatus('Subject copied!', 'success');
        });
    });

    // Copy Email Body
    ui.copyEmailBtn.addEventListener('click', () => {
        if (!editorInstance) return;
        const data = editorInstance.getData();
        navigator.clipboard.writeText(data).then(() => {
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
