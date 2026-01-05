import {
	ClassicEditor,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	Bold,
	CloudServices,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	FullPage,
	Fullscreen,
	GeneralHtmlSupport,
	Heading,
	HorizontalLine,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageEditing,
	ImageInline,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	ImageUtils,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	PlainTableOutput,
	RemoveFormat,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableLayout,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Underline
} from 'ckeditor5';

import { initializeGrist, onRecordChange } from './grist-handler.js';
import { generateSubjectLine, generateEmailTemplate } from './templates.js';

const LICENSE_KEY = 'GPL';

const editorConfig = {
	toolbar: {
		items: [
			'undo', 'redo', '|',
			'sourceEditing', '|',
			'heading', 'style', '|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
			'bold', 'italic', 'underline', '|',
			'link', 'insertTable', '|',
			'alignment', '|',
			'bulletedList', 'numberedList', 'outdent', 'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Alignment, Autoformat, AutoImage, AutoLink, Autosave, Bold, CloudServices, Essentials,
		FindAndReplace, FontBackgroundColor, FontColor, FontFamily, FontSize, FullPage, Fullscreen,
		GeneralHtmlSupport, Heading, HorizontalLine, HtmlEmbed, ImageBlock, ImageCaption, ImageEditing,
		ImageInline, ImageInsertViaUrl, ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar,
		ImageUpload, ImageUtils, Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties,
		MediaEmbed, PageBreak, Paragraph, PasteFromOffice, PlainTableOutput, RemoveFormat, SourceEditing,
		SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
		SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText, Strikethrough,
		Style, Table, TableCaption, TableCellProperties, TableColumnResize, TableLayout, TableProperties,
		TableToolbar, TextTransformation, Underline
	],
	fontFamily: { supportAllValues: true },
	fontSize: { options: [10, 12, 14, 'default', 18, 20, 22], supportAllValues: true },
	heading: {
		options: [
			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
			{ model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
			{ model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
			{ model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
		]
	},
	htmlSupport: {
		allow: [
			{ name: /^.*$/, styles: true, attributes: true, classes: true }
		]
	},
	image: {
		toolbar: [
			'toggleImageCaption', 'imageTextAlternative', '|',
			'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
			'resizeImage'
		]
	},
	licenseKey: LICENSE_KEY,
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://'
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
	}
};

// Global State
let editorInstance = null;
let currentGristData = null;

// UI Elements
const ui = {
    inputs: {
        propertyName: document.getElementById('propertyName'),
        address: document.getElementById('address'),
        askingPrice: document.getElementById('askingPrice'),
        capRate: document.getElementById('capRate'),
        leaseTerm: document.getElementById('leaseTerm'),
        leaseExpiration: document.getElementById('leaseExpiration'),
        buildingSize: document.getElementById('buildingSize'),
        landSize: document.getElementById('landSize'),
        leaseType: document.getElementById('leaseType'),
        description: document.getElementById('description'),
        mainImageUrl: document.getElementById('mainImageUrl')
    },
    subject: document.getElementById('emailSubject'),
    resetBtn: document.getElementById('resetTemplateBtn'),
    copySubjectBtn: document.getElementById('copySubjectBtn'),
    copyEmailBtn: document.getElementById('copyEmailBtn'),
    status: document.getElementById('statusMessage')
};

// Application Initialization
async function init() {
    try {
        // 1. Initialize Editor
        editorInstance = await ClassicEditor.create(document.querySelector('#editor'), editorConfig);
        
        // 2. Initialize Grist
        await initializeGrist();
        
        // 3. Setup Grist Listener
        onRecordChange((data) => {
            currentGristData = data;
            populateInputs(data);
            
            // Only auto-update editor if it's empty or user hasn't heavily edited?
            // For now, we always regenerate on record switch to show the new property.
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

function populateInputs(data) {
    for (const [key, el] of Object.entries(ui.inputs)) {
        if (el && data[key] !== undefined) {
            el.value = data[key];
        }
    }
}

function getFormData() {
    const data = {};
    for (const [key, el] of Object.entries(ui.inputs)) {
        if (el) data[key] = el.value;
    }
    // Preserve links from original Grist data as they aren't in inputs
    if (currentGristData) {
        data.omLink = currentGristData.omLink;
        data.costarLink = currentGristData.costarLink;
        data.crexiLink = currentGristData.crexiLink;
        data.tenancy = currentGristData.tenancy;
    }
    return data;
}

function regenerateTemplate() {
    if (!editorInstance) return;
    
    const data = getFormData();
    
    // Update Subject
    ui.subject.value = generateSubjectLine(data);
    
    // Update Editor
    const html = generateEmailTemplate('default', data);
    editorInstance.setData(html);
}

function setupEventListeners() {
    // Reset Button
    ui.resetBtn.addEventListener('click', () => {
        regenerateTemplate();
        showStatus('Template reset to current inputs.', 'success');
    });

    // Inputs Change -> Optional: Could auto-update subject or wait for reset?
    // Let's auto-update Subject, but NOT the body to avoid overwriting edits.
    Object.values(ui.inputs).forEach(input => {
        input.addEventListener('input', () => {
            ui.subject.value = generateSubjectLine(getFormData());
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
