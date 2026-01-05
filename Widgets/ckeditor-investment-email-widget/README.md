# Grist CKEditor Investment Email Widget

A custom widget for Grist that generates rich-text investment property emails using CKEditor 5. This widget connects to your Grist Properties table and creates Outlook-ready emails with property details, images, and links.

## Features

- **Multiple Email Templates**: Choose from Net Lease, QSR (Quick Service Restaurant), or Big Box templates
- **Rich Text Editing**: Full CKEditor 5 interface for customizing emails
- **One-Click Copy**: Copy subject line and email body directly to clipboard
- **Outlook-Compatible**: Generates HTML that works seamlessly with Outlook
- **Dynamic Content**: Automatically populates with property data from Grist
- **Logic-Based Highlights**: Emphasizes key features like high cap rates, long leases, and assumable loans

## Setup Instructions

### 1. Deploy to GitHub Pages

1. Clone or download this repository
2. Create a new repository on GitHub
3. Upload all files to the repository
4. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Click Save

Your widget will be available at: `https://[username].github.io/grist-ckeditor-investment-email-widget/`

### 2. Add to Grist

1. Open your Grist document
2. Click "Add Widget" in the bottom right
3. Select "Custom" from the widget options
4. Enter the GitHub Pages URL in the "Widget URL" field
5. Set Access Level to "Full"
6. Select the columns you want to include (or select "All")
7. Click "Add to document"

### 3. Required Grist Columns

The widget expects the following columns in your Properties table:

- `Property_Name` (Text)
- `Address` (Text)
- `Price` (Numeric)
- `Cap_Rate` (Numeric)
- `RBA` (Numeric) - Rentable Building Area
- `Lease_Expiration` (Date)
- `Lease_Type` (Choice)
- `Tenancy` (Choice)
- `Tenant_s_` (ChoiceList)
- `photo_url` (Text) - Space-separated URLs
- `CoStar` (Text)
- `Crexi` (Text)
- `OM` (Text) - Offering Memorandum URL
- `Notes` (Text)

Optional columns:
- `City` (Text) - Extracted from Address if not provided
- `State` (Text) - Extracted from Address if not provided
- `Zip` (Text) - Extracted from Address if not provided
- `Land_Size` (Numeric)
- `Lease_Term` (Text)
- `Lease_Commencement` (Date)
- `Date_Listed` (Date)
- `Property_Type` (Choice)
- `Lease_Options` (Text)
- `Rent_Bumps` (Text)
- `For_Sale_Status` (Bool)
- `Last_Sale_Date` (Date)
- `Last_Sale_Price` (Numeric)

## Usage

1. Select a property row in your Grist table
2. Choose the appropriate email template from the dropdown
3. Review and customize the generated email in the editor
4. Click "Copy Subject" to copy the subject line
5. Click "Copy Email Body" to copy the email content
6. Paste both into Outlook to send

## Customization

### Adding New Templates

To add a new email template:

1. Open `js/templates.js`
2. Add a new function `generate[TemplateName]Template(data)`
3. Add the template to the `generateEmailTemplate()` function
4. Add an option to the dropdown in `index.html`

### Modifying Styling

The widget uses Outlook-safe HTML styling. To modify:

1. Edit `css/widget.css` for the widget interface
2. Modify template functions in `js/templates.js` for email content styling

### CKEditor Configuration

To customize the editor:

1. Edit `js/ckeditor-config.js`
2. Add or remove plugins as needed
3. Modify toolbar items to suit your needs

## File Structure

```
grist-ckeditor-investment-email-widget/
├── index.html              # Main widget page
├── css/
│   └── widget.css          # Widget styling
├── js/
│   ├── main.js             # Main application logic
│   ├── ckeditor-config.js  # CKEditor configuration
│   ├── grist-handler.js    # Grist data handling
│   └── templates.js        # Email templates
├── README.md               # This file
├── copy-ckeditor.js        # Script to copy CKEditor files
└── ckeditor5/              # CKEditor 5 files (copy from parent directory)
```

### Copying CKEditor Files

Before deploying, you need to copy CKEditor 5 files from the parent directory:

1. Run the provided script: `node copy-ckeditor.js`
2. Or manually copy the entire `ckeditor5` folder from the parent directory

The widget requires these CKEditor 5 files to function properly.

## Troubleshooting

### Widget Not Loading

- Ensure all files are uploaded to GitHub Pages
- Check browser console for error messages
- Verify the widget URL in Grist is correct

### Data Not Appearing

- Check that column names match exactly (case-sensitive)
- Ensure the selected row has data in all required fields
- Verify Grist access permissions are set to "Full"

### Copy to Clipboard Not Working

- Ensure you're using a modern browser with clipboard API support
- Try refreshing the page and selecting the property again
- Check browser permissions for clipboard access

## Support

For issues or feature requests, please create an issue in the GitHub repository.
## License

This project is licensed under the GPL License - see the CKEditor license files for detail
