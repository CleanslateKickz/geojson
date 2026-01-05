import { initializeEmailEditor } from './ckeditor-config.js';
import { initializeGrist, onRecordChange } from './grist-handler.js';
import { generateSubjectLine, generateEmailTemplate } from './templates.js';

/**
 * Main application logic for the Investment Email Widget
 */
class InvestmentEmailWidget {
    constructor() {
        this.editor = null;
        this.currentData = null;
        this.currentTemplate = 'net-lease';
        
        this.init();
    }
    
    /**
     * Initialize the widget
     */
    async init() {
        try {
            // Initialize CKEditor
            this.editor = await initializeEmailEditor('editor');
            
            // Initialize Grist integration
            await initializeGrist();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Listen for record changes
            onRecordChange((data) => {
                this.currentData = data;
                this.updateEmailContent();
            });
            
            // Show notification that widget is ready
            this.showNotification('Widget loaded successfully. Select a property to get started.');
        } catch (error) {
            console.error('Error initializing widget:', error);
            this.showNotification('Error loading widget. Please refresh the page.', 'error');
        }
    }
    
    /**
     * Set up event listeners for UI elements
     */
    setupEventListeners() {
        // Template selection
        const templateSelect = document.getElementById('template-select');
        if (templateSelect) {
            templateSelect.addEventListener('change', (e) => {
                this.currentTemplate = e.target.value;
                this.updateEmailContent();
            });
        }
        
        // Copy subject button
        const copySubjectBtn = document.getElementById('copy-subject');
        if (copySubjectBtn) {
            copySubjectBtn.addEventListener('click', () => {
                this.copySubjectToClipboard();
            });
        }
        
        // Copy email body button
        const copyEmailBtn = document.getElementById('copy-email');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', () => {
                this.copyEmailToClipboard();
            });
        }
        
        // Refresh template button
        const refreshBtn = document.getElementById('refresh-template');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.updateEmailContent();
                this.showNotification('Template refreshed');
            });
        }
    }
    
    /**
     * Update email content based on current data and template
     */
    updateEmailContent() {
        if (!this.currentData) {
            this.setPlaceholderContent();
            return;
        }
        
        // Update subject line
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
            subjectInput.value = generateSubjectLine(this.currentData);
        }
        
        // Generate email body based on selected template
        const emailContent = generateEmailTemplate(this.currentTemplate, this.currentData);
        
        // Update CKEditor content
        if (this.editor) {
            this.editor.setData(emailContent);
        }
    }
    
    /**
     * Set placeholder content when no data is available
     */
    setPlaceholderContent() {
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
            subjectInput.value = 'Select a property to generate email';
        }
        
        if (this.editor) {
            this.editor.setData(`
                <h2>Investment Email Generator</h2>
                <p>Please select a property from your Grist table to generate an investment email.</p>
                <p>The email will include:</p>
                <ul>
                    <li>Property details and financial metrics</li>
                    <li>Key investment highlights</li>
                    <li>Property images</li>
                    <li>Links to listings and documents</li>
                </ul>
                <p>Choose a template type from the dropdown above to customize the email for different property types.</p>
            `);
        }
    }
    
    /**
     * Copy subject line to clipboard
     */
    async copySubjectToClipboard() {
        const subjectInput = document.getElementById('subject');
        if (!subjectInput || !subjectInput.value) {
            this.showNotification('No subject to copy', 'warning');
            return;
        }
        
        try {
            await navigator.clipboard.writeText(subjectInput.value);
            this.showNotification('Subject copied to clipboard');
        } catch (error) {
            console.error('Error copying subject:', error);
            this.showNotification('Failed to copy subject', 'error');
        }
    }
    
    /**
     * Copy email body to clipboard
     */
    async copyEmailToClipboard() {
        if (!this.editor) {
            this.showNotification('Editor not ready', 'warning');
            return;
        }
        
        try {
            // Get HTML content from CKEditor
            const htmlContent = this.editor.getData();
            
            if (!htmlContent || htmlContent.trim() === '') {
                this.showNotification('No content to copy', 'warning');
                return;
            }
            
            // Copy HTML to clipboard
            await navigator.clipboard.writeText(htmlContent);
            this.showNotification('Email body copied to clipboard. Paste into Outlook.');
        } catch (error) {
            console.error('Error copying email:', error);
            this.showNotification('Failed to copy email body', 'error');
        }
    }
    
    /**
     * Show notification message
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, warning)
     */
    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');
        
        if (!notification || !notificationText) return;
        
        // Set message
        notificationText.textContent = message;
        
        // Set background color based on type
        switch (type) {
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ffc107';
                notification.style.color = '#212529';
                break;
            default:
                notification.style.backgroundColor = '#28a745';
                notification.style.color = 'white';
        }
        
        // Show notification
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the widget when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InvestmentEmailWidget();
});