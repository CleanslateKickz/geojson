export const crmData = [
  {
    name: "Corteza",
    url: "https://cortezaproject.org",
    pricingUrl: "https://cortezaproject.org/pricing/",
    repoUrl: "https://github.com/cortezaproject",
    description: "A powerful, 100% open-source, low-code application development platform designed as a Salesforce alternative. It provides a unified environment for building CRM, enterprise messaging, and custom business applications with an API-first architecture.",
    visuals: [
      { src: "https://i0.wp.com/www.planetcrust.com/wp-content/uploads/2021/04/Corteza-2021-3-CRM-Dashboard-1.png?ssl=1", alt: "Dashboard view of Corteza" },
      { src: "https://i0.wp.com/cortezaproject.org/wp-content/uploads/2020/12/Corteza-Low-Code-Service-Solution-dashboard.png?fit=1920%2C1001&ssl=1", alt: "Corteza low-code solution dashboard" },
      { src: "https://i1.wp.com/cortezaproject.org/wp-content/uploads/2020/12/Corteza-Low-Code-Service-Solution-cases.png?fit=1920%2C1001&ssl=1", alt: "Case management in Corteza" },
      { src: "https://i2.wp.com/cortezaproject.org/wp-content/uploads/2023/01/Planet-Crust-Screenshot-23.png?fit=1717%2C1063&ssl=1", alt: "Corteza application builder" },
    ],
    features: [
      "Build unlimited custom apps with low-code, block-based tools.",
      "Enterprise-grade automation and robust workflows.",
      "Modern tech stack (Go backend, Vue.js frontend).",
      "API-first architecture with REST APIs for all components.",
      "Cloud-native design, ready for Docker deployment.",
      "Permissive Apache v2.0 license for full use and modification.",
    ],
    freeTierLimitations: "The platform is perpetually free and open-source to self-host. There are no licensing fees or artificial caps on users or features. Costs are related to hosting and optional paid support.",
    uxUiAspects: "Features a modern, clean, dashboard-driven interface. The low-code nature emphasizes a visual, drag-and-drop experience for building applications, making it accessible for both developers and business users.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '❌', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '❌'
    }
  },
  {
    name: "EspoCRM",
    url: "https://www.espocrm.com",
    pricingUrl: "https://www.espocrm.com/prices/",
    repoUrl: null, // Not explicitly provided
    description: "A lightweight, fast, and highly extensible open-source CRM. It features a modern Single Page Application (SPA) interface and is built for developers needing a flexible, intuitive solution that can be easily customized.",
    visuals: [
      { src: "https://www.espocrm.com/wp-content/uploads/pic1.png", alt: "EspoCRM dashboard overview" },
      { src: "https://opensource.com/sites/default/files/espocrm-1.png", alt: "Lead management in EspoCRM" },
      { src: "https://www.espocrm.com/wp-content/uploads/reports.png", alt: "Reporting features in EspoCRM" },
      { src: "https://www.espocrm.com/wp-content/uploads/Portal-User.png", alt: "EspoCRM customer portal view" }
    ],
    features: [
      "Lightweight and fast Single Page Application design.",
      "Core CRM features for contacts, companies, and sales.",
      "Highly extensible via REST API and custom modules.",
      "Intuitive and clean user interface.",
      "Advanced features available as paid extensions.",
    ],
    freeTierLimitations: "The core CRM software is free and open-source with no user limits. Costs are related to self-hosting and optional paid extensions (e.g., advanced project management).",
    uxUiAspects: "The UI is a modern, minimalist Single Page Application. It is praised for being clean and intuitive, with configurable dashboards composed of various 'dashlets' (charts, lists) for a customized overview.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '❌', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '❌', aiTools: '❌'
    }
  },
  {
    name: "SuiteCRM",
    url: "https://suitecrm.com",
    pricingUrl: "https://suitecrm.com/download/",
    repoUrl: "https://suitecrm.com/download/", // Main download link serves as repo
    description: "A mature, enterprise-grade open-source CRM forked from SugarCRM. It offers a comprehensive suite of features for sales, marketing, and customer service automation, backed by a large community.",
    visuals: [
      { src: "https://suitecrm.com/wp-content/uploads/2021/01/Dashboard.1.png", alt: "SuiteCRM main dashboard" },
      { src: "https://store.suitecrm.com/assets/img/addonassets/dynamicboards/test%20test%20test.png", alt: "Kanban board view in SuiteCRM" },
      { src: "https://store.suitecrm.com/assets/img/blog/how-to-articles/Sales%20Dashboard%20Text.png", alt: "Sales dashboard in SuiteCRM" },
      { src: "https://installatron.com/images/remote/ss1_suitecrm.png", alt: "SuiteCRM accounts list view" }
    ],
    features: [
      "Full sales pipeline management with templated quotations.",
      "Advanced workflow automation for business processes.",
      "Customer self-service portal for issue management.",
      "Highly customizable with numerous add-ons available.",
      "Integrations for mobile access and Microsoft Outlook.",
    ],
    freeTierLimitations: "Genuinely free and open source. No restrictions on users, features, or modules in the self-hosted version. Costs are only for hosting and optional enterprise support.",
    uxUiAspects: "The interface is functional and data-rich. It offers customizable dashboards with various dashlets. Newer versions include more visual tools like Kanban-style pipeline views to enhance user experience.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '✅', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '❌'
    }
  },
  {
    name: "Odoo CRM",
    url: "https://www.odoo.com",
    pricingUrl: "https://www.odoo.com/pricing",
    repoUrl: "https://github.com/odoo/odoo",
    description: "The customer relationship management module within the comprehensive Odoo open-source ERP suite. It is perfect for businesses seeking a deeply integrated system that connects sales with inventory, accounting, and more.",
    visuals: [
      { src: "https://odoocdn.com/openerp_website/static/src/img/apps/crm/hero_image.webp", alt: "Odoo CRM pipeline view" },
      { src: "https://www.images.cybrosys.com/blog/Uploads/BlogImage/what-are-the-features-and-benefits-of-odoo-17-dynamic-dashboard-1.png", alt: "Dynamic dashboard in Odoo 17" },
      { src: "https://miro.medium.com/v2/resize:fit:1400/0*RQxQwZAmAFvpiaEO.png", alt: "Odoo CRM contact form" },
      { src: "https://miro.medium.com/v2/resize:fit:1400/0*a2P9vanON-rvcWf-.png", alt: "Reporting and analytics in Odoo CRM" },
    ],
    features: [
      "Highly visual, drag-and-drop Kanban pipeline.",
      "Lead management with acquisition, nurturing, and AI scoring.",
      "Integrated tools for calls, meetings, and emails.",
      "Quick creation of professional quotes.",
      "Powerful automation for lead assignment and tasks.",
      "Seamless integration with other Odoo business apps.",
    ],
    freeTierLimitations: "The Odoo CRM app is free with unlimited users via the self-hosted Community Edition or Odoo's 'One App Free' cloud plan. Using additional Odoo apps requires a paid subscription.",
    uxUiAspects: "Renowned for its modern, clean, and highly intuitive UI. The primary view is a visual Kanban board, complemented by easily digestible dashboards with colorful charts and KPIs.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '✅', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '✅'
    }
  },
  {
    name: "Monica",
    url: "https://www.monicahq.com",
    pricingUrl: "https://www.monicahq.com/pricing",
    repoUrl: "https://github.com/monicahq/monica",
    description: "A unique, open-source Personal Relationship Management (PRM) system. Instead of focusing on sales leads, it helps individuals organize interactions with friends and family to strengthen relationships. It's privacy-focused and ideal for personal use.",
    visuals: [
      { src: "https://www.monicahq.com/img/contacts.png", alt: "Monica contact management" },
      { src: "https://medevel.com/content/images/2021/11/main-app.png", alt: "Monica dashboard view" },
      { src: "https://itsfoss.com/content/images/wordpress/2022/11/dashboard.png", alt: "Detailed contact view in Monica" },
      { src: "https://docs.pikapods.com/tutorials/productivity/monica-1-basics/3-log-conversations.webp", alt: "Logging conversations in Monica" }
    ],
    features: [
      "Manage contacts and define relationships.",
      "Automatic reminders for important events.",
      "Log activities, conversations, and notes.",
      "Personal journal/diary feature.",
      "Upload documents and photos for contacts.",
      "Highly customizable with custom fields and labels.",
    ],
    freeTierLimitations: "The self-hosted open-source version is completely free and full-featured. The official SaaS has a very limited free plan (10 contacts).",
    uxUiAspects: "The interface is minimalist, clean, and person-centric. It feels less like a corporate tool and more like a private digital journal, designed for clarity and ease of use.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '❌', pipelineView: '❌', kanban: '❌', apiWebhooks: '✅', customFields: '✅', automations: '❌', aiTools: '❌'
    }
  },
  {
    name: "Lark Suite",
    url: "https://www.larksuite.com",
    pricingUrl: "https://www.larksuite.com/en_us/plans",
    repoUrl: null,
    description: "An all-in-one collaboration suite that integrates CRM functionalities with chat, video conferencing, documents, and project management. Its free tier is exceptionally generous, making it a strong entry point for small teams.",
    visuals: [
      { src: "https://framerusercontent.com/images/pkSoKBaY1Ax5csl9lpbbibK5qk.png", alt: "Lark Suite Base as a CRM" },
      { src: "https://framerusercontent.com/images/uhhX1yF92CE6hTunS4Ow549ZvDE.png", alt: "Lark Docs and collaboration" },
      { src: "https://framerusercontent.com/images/8otjE5ZyL9fqVUwSG8fiUG7jlYk.png", alt: "Lark dashboard and integrations" },
      { src: "https://framerusercontent.com/images/FxHrJfjq0gMOzZ4yqofSGAUFEc.gif", alt: "Lark interface animation" }
    ],
    features: [
      "Fully integrated suite: Messenger, Email, Calendar, Docs.",
      "'Base': A powerful no-code workflow automation tool.",
      "OKR (Objectives and Key Results) management.",
      "Unlimited AI-powered translations.",
      "Built-in approval workflows and video conferencing.",
      "Enterprise-wide search across all apps.",
    ],
    freeTierLimitations: "Free 'Starter' plan is for up to 20 users, with 100 GB total storage, 18 months of message history, and 1,000 monthly workflow executions.",
    uxUiAspects: "Provides a modern and highly polished unified interface. It allows for seamless switching between its various tools, creating a cohesive workflow that minimizes context switching.",
    comparison: {
      openSource: '❌', freeTier: '✅', selfHosting: '❌', mobileApp: '✅', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '✅'
    }
  },
  {
    name: "Teamsale CRM",
    url: "https://teamsale.com/en/",
    pricingUrl: "https://teamsale.com/en/pricing/",
    repoUrl: null,
    description: "A completely free cloud-based CRM offered by the VoIP provider Zadarma. It is specifically designed for sales teams and features deep integration with telephony services for call tracking, recording, and automation.",
    visuals: [
      { src: "https://zadarma.com/image-assets/content/2023/08/16/CRM1.png", alt: "Teamsale CRM dashboard" },
      { src: "https://zadarma.com/image-assets/content/2023/08/16/CRM3.png", alt: "Kanban pipeline in Teamsale" },
      { src: "https://teamsale.com/images/pages/blog/en/dashboard_1600_900.jpg", alt: "Teamsale analytics and reporting" },
      { src: "https://zadarma.com/image-assets/content/2024/03/16/4en.png", alt: "Client card in Teamsale CRM" }
    ],
    features: [
      "Deep integration with Zadarma PBX for telephony.",
      "One-click calling, call recording, and speech-to-text.",
      "Automatic lead creation from calls.",
      "Integrated video conferencing for up to 100 participants.",
      "Dynamic and static call tracking.",
      "Two-way Google Calendar synchronization.",
    ],
    freeTierLimitations: "Free for up to 5 users on the condition that the linked Zadarma account is topped up with any amount at least once every 3 months. Otherwise, it switches to a paid plan.",
    uxUiAspects: "The UI is functional and data-driven, with a clear focus on sales and telephony activities. Dashboards provide practical overviews of key metrics, deals, and client communications.",
    comparison: {
      openSource: '❌', freeTier: '✅', selfHosting: '❌', mobileApp: '❌', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '❌', automations: '✅', aiTools: '❌'
    }
  },
  {
    name: "Vtiger CRM",
    url: "https://www.vtiger.com",
    pricingUrl: "https://www.vtiger.com/open-source-crm/",
    repoUrl: "https://www.vtiger.com/open-source-crm/", // Main info page
    description: "A long-standing CRM that offers both a free, self-hosted open-source edition and a cloud-based suite. It provides comprehensive tools for sales, marketing, and help desk support, backed by a large community.",
    visuals: [
      { src: "https://images.prismic.io/vtiger-website/52464288-7f9a-4f6f-ab1a-2da668b9b9e7_Hero+image+3.png?auto=compress,format", alt: "Vtiger CRM dashboard" },
      { src: "https://vtiger-website.cdn.prismic.io/vtiger-website/3d94147c-7f61-45ec-adc2-79960de4f4cd_Pipeline+Management.svg", alt: "Vtiger pipeline management view" },
      { src: "https://www.vtexperts.com/wp-content/uploads/2016/12/VTiger-7-open-source.png", alt: "Vtiger 7 open source interface" },
      { src: "https://vtiger-website.cdn.prismic.io/vtiger-website/b988fa3f-60b2-413c-ac4c-15291c49771e_Reports.svg", alt: "Vtiger reporting feature illustration" }
    ],
    features: [
      "Centralized contact, lead, and pipeline management.",
      "Integrated Help Desk with email-to-ticket conversion.",
      "Inventory management for products and services.",
      "Powerful workflow automation engine.",
      "Multi-channel communication support (Phone, Email, SMS).",
      "REST APIs and an extensive marketplace for add-ons.",
    ],
    freeTierLimitations: "Two free offerings: 1) A completely free, unlimited open-source edition for self-hosting. 2) A free-forever cloud tier ('Vtiger One Pilot') with a limited feature set for startups.",
    uxUiAspects: "Provides a clean, modern UI with well-organized modules. It features visual tools like pipeline Kanban boards and customizable dashboards, making it easy to navigate.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '✅', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '❌'
    }
  },
  {
    name: "Dolibarr",
    url: "https://www.dolibarr.org",
    pricingUrl: "https://www.dolistore.com/",
    repoUrl: "https://github.com/Dolibarr/dolibarr",
    description: "A highly modular open-source ERP & CRM software package for small to medium-sized businesses. Users can enable only the modules they need, resulting in a tailored, lightweight system for managing sales, invoicing, inventory, HR, and more.",
    visuals: [
      { src: "https://wiki.dolibarr.org/images/archive/e/e0/20190916230150%21Dolibarr_screenshot1.png", alt: "Dolibarr dashboard overview" },
      { src: "https://wiki.dolibarr.org/images/6/60/Screenshot_orderlist_1.png", alt: "Dolibarr order list view" },
      { src: "https://medevel.com/content/images/2021/09/1-5.png", alt: "Dolibarr user interface" },
      { src: "https://unboxerp.com/wp-content/uploads/2020/04/inicio_web_dolibarr.png", alt: "Dolibarr homepage widgets" }
    ],
    features: [
      "Extremely modular: enable only the features you need.",
      "Core functions: invoicing, accounting, inventory, POS.",
      "Integrated project, task, and document management.",
      "Supports multi-user, multi-language, multi-currency.",
      "REST API and a vast marketplace (Dolistore) for add-ons.",
    ],
    freeTierLimitations: "The self-hosted version is exceptionally generous, with no software-imposed limits on users or records. The only limitations are the performance of the hosting server. Costs are for hosting and optional paid modules.",
    uxUiAspects: "Dolibarr's UI is functional and straightforward, prioritizing utility over modern aesthetics. It uses a classic web application layout with a left-hand navigation menu.",
    comparison: {
      openSource: '✅', freeTier: '✅', selfHosting: '✅', mobileApp: '❌', pipelineView: '✅', kanban: '❌', apiWebhooks: '✅', customFields: '✅', automations: '❌', aiTools: '❌'
    }
  },
  {
    name: "Bitrix24",
    url: "https://www.bitrix24.com",
    pricingUrl: "https://www.bitrix24.com/prices/",
    repoUrl: null,
    description: "An expansive business platform combining CRM, collaboration, communication, and project management. It's famous for its free plan that supports an unlimited number of users, making it a popular choice for teams.",
    visuals: [
      { src: "https://www.bitrix24.com/upload/optimizer/converted/images/content_en/screens/main/header_banner/crm.png.webp?1752248140782", alt: "Bitrix24 CRM interface" },
      { src: "https://helpdesk.bitrix24.com/upload/medialibrary/8d9/ng5u2o3sqkgxxfzx2y25sz28hwtqzze3/CRM_automation.jpg", alt: "CRM automation rules in Bitrix24" },
      { src: "https://d57439wlqx3vo.cloudfront.net/iblock/9c0/9c036b27ab6f51fef274b1eaf30b14a5/b0ae506aba5d7743cae9be56c92af921.jpg", alt: "Bitrix24 deal pipeline" },
      { src: "https://helpdesk.bitrix24.com/upload/medialibrary/c0e/ekv3coib28bxb4u6i50lttl0hhnnxq63/create_activity.jpg", alt: "Creating an activity in Bitrix24" }
    ],
    features: [
      "Core CRM functionality (leads, contacts, deals).",
      "Integrated task and project management.",
      "Extensive collaboration tools (social feed, messenger).",
      "Built-in website builder and basic online store.",
      "A paid on-premise edition is available with source code.",
    ],
    freeTierLimitations: "Free plan allows unlimited users but is limited to 5 GB storage, 100 total tasks, and lacks advanced features like sales automation and CRM analytics. Accounts may be deleted after 50 days of inactivity.",
    uxUiAspects: "The interface is dense and feature-packed, which can be overwhelming. It consolidates a vast number of tools into one platform, featuring Kanban boards for deals and comprehensive forms for data entry.",
    comparison: {
      openSource: '❌', freeTier: '✅', selfHosting: '❌', mobileApp: '✅', pipelineView: '✅', kanban: '✅', apiWebhooks: '✅', customFields: '✅', automations: '✅', aiTools: '❌'
    }
  },
];
