import {
    ClassicEditor,
    Bold,
    Italic,
    Underline,
    Link,
    Paragraph,
    Heading,
    List,
    Table,
    Image,
    ImageInsert,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    SourceEditing,
    Essentials
} from 'ckeditor5';

/**
 * Simplified CKEditor configuration optimized for email creation
 */
export const getEmailEditorConfig = {
    toolbar: {
        items: [
            'undo', 'redo', '|',
            'heading', '|',
            'bold', 'italic', 'underline', '|',
            'link', 'insertImage', '|',
            'bulletedList', 'numberedList', '|',
            'insertTable', '|',
            'sourceEditing'
        ],
        shouldNotGroupWhenFull: false
    },
    
    plugins: [
        Bold,
        Italic,
        Underline,
        Link,
        Paragraph,
        Heading,
        List,
        Table,
        Image,
        ImageInsert,
        ImageCaption,
        ImageStyle,
        ImageToolbar,
        SourceEditing,
        Essentials
    ],
    
    heading: {
        options: [
            {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph'
            },
            {
                model: 'heading1',
                view: 'h2',
                title: 'Heading 1',
                class: 'ck-heading_heading1'
            },
            {
                model: 'heading2',
                view: 'h3',
                title: 'Heading 2',
                class: 'ck-heading_heading2'
            }
        ]
    },
    
    image: {
        toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:block',
            '|',
            'toggleImageCaption'
        ]
    },
    
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://'
    },
    
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    
    placeholder: 'Compose your investment email here...',
    
    // Ensure HTML output is email-friendly
    htmlSupport: {
        allow: [
            {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true
            }
        ]
    }
};

/**
 * Initialize CKEditor with email-optimized configuration
 */
export function initializeEmailEditor(elementId) {
    return ClassicEditor
        .create(document.getElementById(elementId), getEmailEditorConfig)
        .catch(error => {
            console.error('Error initializing CKEditor:', error);
        });
}