/**
 * Product dummy data catalogue
 * Fulfills rule: "Always generate dummy data if not provided"
 */

export const PRODUCTS = [
  {
    id: 'apex-crm',
    name: 'Apex CRM',
    version: 'v3.0',
    category: 'Project Management',
    userCount: '15,000+',
    rating: '4.9/5',
    uptime: '99.98%',
    speed: '< 80ms',
    tagline: 'Hyper-scalable customer relations & sprint execution engine',
    description: 'Unified CRM and project timeline platform designed for agile teams who crave zero bloat and high velocity delivery.',
    iconType: 'crm',
    accentColor: '#38bdf8',
    categoryTag: 'saas',
    videoPreview: './assets/previews/apex-crm.webm',
    features: ['Real-time Gantt Sync', 'Automated Lead Routing', 'Client Portal 2.0', 'One-click Invoicing', 'End-to-end Encryption'],
    dashboard: {
      brandTitle: 'Apex CRM',
      menuItems: [
        { label: 'Dashboard', icon: 'grid', active: true },
        { label: 'Projects', icon: 'folder', active: false },
        { label: 'Management', icon: 'users', active: false },
        { label: 'Customers', icon: 'briefcase', active: false },
        { label: 'Tasks', icon: 'check-square', active: false },
        { label: 'Analytics', icon: 'bar-chart', active: false },
        { label: 'Settings', icon: 'settings', active: false }
      ],
      searchPlaceholder: 'Search leads, tasks or sprints...',
      col1Title: 'Active Tasks',
      tasks: [
        { text: 'Merchant clearance API', status: 'In Review', color: '#10b981' },
        { text: 'Revamp bio-stations UI', status: 'In Progress', color: '#3b82f6' },
        { text: 'Database geo-indexing', status: 'Pending', color: '#f59e0b' },
        { text: 'Client demo presentation', status: 'Done', color: '#10b981' }
      ],
      col2Title: 'Live Gantt Timeline',
      ganttBars: [
        { label: 'Sprint Planning', offset: '10%', width: '35%', color: '#10b981' },
        { label: 'Core Integration', offset: '30%', width: '45%', color: '#ef4444' },
        { label: 'QA Regression', offset: '55%', width: '30%', color: '#8b5cf6' },
        { label: 'Staging Deploy', offset: '70%', width: '25%', color: '#06b6d4' }
      ],
      col3Title: 'Team Pulse',
      team: ['Alex M.', 'Sasha K.', 'Jordan L.', 'Elena R.']
    }
  },
  {
    id: 'nova-analytics',
    name: 'Nova Analytics',
    version: 'v2.4',
    category: 'Predictive Intelligence',
    userCount: '28,000+',
    rating: '4.95/5',
    uptime: '99.99%',
    speed: '< 45ms',
    tagline: 'Instant cohort queries and ML-powered conversion forecasts',
    description: 'Transform petabytes of user telemetry into beautiful interactive cohort maps, heatmaps, and churn predictions in seconds.',
    iconType: 'analytics',
    accentColor: '#818cf8',
    categoryTag: 'analytics',
    videoPreview: './assets/previews/nova-analytics.webm',
    features: ['Anomaly Detection AI', 'Sub-second OLAP Query', 'Visual SQL Canvas', 'Custom Webhooks', 'GDPR/HIPAA Certified'],
    dashboard: {
      brandTitle: 'Nova Analytics',
      menuItems: [
        { label: 'Live Metrics', icon: 'activity', active: true },
        { label: 'Cohorts', icon: 'users', active: false },
        { label: 'Funnels', icon: 'filter', active: false },
        { label: 'Predictions', icon: 'cpu', active: false },
        { label: 'Reports', icon: 'file-text', active: false },
        { label: 'Data Sources', icon: 'database', active: false }
      ],
      searchPlaceholder: 'Query metrics, event streams, cohorts...',
      col1Title: 'Live Ingestion',
      tasks: [
        { text: 'Global event stream: 12.4k req/s', status: 'Healthy', color: '#10b981' },
        { text: 'Retention anomaly model #4', status: 'Trained', color: '#3b82f6' },
        { text: 'Checkout abandonment alert', status: 'Resolved', color: '#10b981' },
        { text: 'Kafka bridge consumer latency', status: '2ms', color: '#06b6d4' }
      ],
      col2Title: 'Traffic & Conversion Wave',
      ganttBars: [
        { label: 'Organic Search (+34%)', offset: '5%', width: '75%', color: '#3b82f6' },
        { label: 'Direct Referral Viral', offset: '20%', width: '60%', color: '#10b981' },
        { label: 'Paid Retargeting Ad', offset: '40%', width: '45%', color: '#f59e0b' },
        { label: 'In-app Referral Loop', offset: '15%', width: '80%', color: '#a855f7' }
      ],
      col3Title: 'Top Regions',
      team: ['Tokyo', 'San Francisco', 'Berlin', 'Singapore']
    }
  },
  {
    id: 'pulse-ecommerce',
    name: 'Pulse eCommerce',
    version: 'v4.1',
    category: 'Headless Commerce',
    userCount: '42,000+',
    rating: '4.88/5',
    uptime: '100%',
    speed: '< 35ms',
    tagline: 'Ultra-fast edge checkout and global inventory orchestration',
    description: 'Built for modern lifestyle and streetwear brands needing sub-second edge checkouts with zero flash-sale crashes.',
    iconType: 'ecommerce',
    accentColor: '#34d399',
    categoryTag: 'commerce',
    videoPreview: './assets/previews/pulse-ecommerce.webm',
    features: ['Edge Cached Cart', 'Multi-currency Global', '1-Tap Apple/Google Pay', 'Fraud Guard AI', 'Inventory Sync'],
    dashboard: {
      brandTitle: 'Pulse Store',
      menuItems: [
        { label: 'Overview', icon: 'shopping-bag', active: true },
        { label: 'Orders', icon: 'package', active: false },
        { label: 'Catalog', icon: 'tag', active: false },
        { label: 'Discounts', icon: 'percent', active: false },
        { label: 'Customers', icon: 'user-check', active: false },
        { label: 'Payments', icon: 'credit-card', active: false }
      ],
      searchPlaceholder: 'Search orders, SKUs or customers...',
      col1Title: 'Live Orders ($84,920 today)',
      tasks: [
        { text: 'Order #9824 — Cyber Moss Tee', status: 'Packed', color: '#10b981' },
        { text: 'Order #9825 — ProductZero Ceramic Mug', status: 'Shipped', color: '#3b82f6' },
        { text: 'Order #9826 — Mechanical Keycap', status: 'Transit', color: '#8b5cf6' },
        { text: 'Order #9827 — Obsidian Desk Mat', status: 'Delivered', color: '#10b981' }
      ],
      col2Title: 'Flash Sale Performance',
      ganttBars: [
        { label: 'Early Access Drop', offset: '5%', width: '30%', color: '#ec4899' },
        { label: 'Main VIP Checkout Peak', offset: '25%', width: '50%', color: '#10b981' },
        { label: 'Restock Notifications', offset: '60%', width: '35%', color: '#3b82f6' },
        { label: 'Fulfillment Batching', offset: '45%', width: '50%', color: '#f59e0b' }
      ],
      col3Title: 'Gateways',
      team: ['Stripe 3D', 'Apple Pay', 'PayPal', 'Crypto/Sol']
    }
  },
  {
    id: 'terra-projects',
    name: 'Terra Projects',
    version: 'v1.8',
    category: 'Collaborative Workspaces',
    userCount: '19,000+',
    rating: '4.92/5',
    uptime: '99.95%',
    speed: '< 55ms',
    tagline: 'Multiplayer roadmap builder with synchronous canvas & milestones',
    description: 'Experience fluid collaborative canvas management where engineering, design, and product management sync in real-time.',
    iconType: 'projects',
    accentColor: '#38d374',
    categoryTag: 'saas',
    videoPreview: './assets/previews/terra-projects.webm',
    features: ['Multiplayer Cursor Canvas', 'Automated GitHub Sync', 'Markdown Docs Native', 'Linear Two-way Sync', 'Figma Embeds'],
    dashboard: {
      brandTitle: 'Terra Projects',
      menuItems: [
        { label: 'Roadmap', icon: 'map', active: true },
        { label: 'Backlog', icon: 'list', active: false },
        { label: 'Sprint 24', icon: 'zap', active: false },
        { label: 'Docs', icon: 'book', active: false },
        { label: 'Whiteboard', icon: 'edit-3', active: false },
        { label: 'Archive', icon: 'archive', active: false }
      ],
      searchPlaceholder: 'Search roadmaps, epics, pull requests...',
      col1Title: 'Active Epics',
      tasks: [
        { text: 'Mobile Gestures & Physics Engine', status: 'Priority', color: '#ef4444' },
        { text: 'Wasm Compute Worker Integration', status: 'Building', color: '#3b82f6' },
        { text: 'Dark Mode HSL Color Tokens', status: 'Approved', color: '#10b981' },
        { text: 'Security Audit & Pen-testing', status: 'Scheduled', color: '#8b5cf6' }
      ],
      col2Title: 'Q3 Product Milestones',
      ganttBars: [
        { label: 'Alpha Private Rollout', offset: '10%', width: '40%', color: '#38d374' },
        { label: 'Public Beta Announcement', offset: '35%', width: '35%', color: '#06b6d4' },
        { label: 'Enterprise Security Tier', offset: '50%', width: '40%', color: '#f59e0b' },
        { label: 'Global Hackathon Launch', offset: '65%', width: '30%', color: '#ec4899' }
      ],
      col3Title: 'Collaborators',
      team: ['Devin S.', 'Chloe M.', 'Marcus W.', 'Yuki T.']
    }
  },
  {
    id: 'aura-ai',
    name: 'Aura AI',
    version: 'v2.0',
    category: 'Agent Orchestration',
    userCount: '35,000+',
    rating: '4.97/5',
    uptime: '99.99%',
    speed: '< 60ms',
    tagline: 'Autonomous multi-agent pipeline with contextual semantic memory',
    description: 'Deploy swarms of collaborative AI agents that research, code, write, and execute complex workflows without manual supervision.',
    iconType: 'ai',
    accentColor: '#c084fc',
    categoryTag: 'ai',
    videoPreview: './assets/previews/aura-ai.webm',
    features: ['Multi-agent Consensus', 'Vector Memory Store', 'Live Code Sandbox', 'Self-correcting Loops', 'Zero Hallucination Guard'],
    dashboard: {
      brandTitle: 'Aura Orchestrator',
      menuItems: [
        { label: 'Agent Graph', icon: 'share-2', active: true },
        { label: 'Swarm Monitor', icon: 'cpu', active: false },
        { label: 'Memory Bank', icon: 'hard-drive', active: false },
        { label: 'Prompt Canvas', icon: 'terminal', active: false },
        { label: 'Evaluations', icon: 'check-circle', active: false },
        { label: 'Key Vault', icon: 'shield', active: false }
      ],
      searchPlaceholder: 'Dispatch new agent swarm command...',
      col1Title: 'Active Agents (4 Running)',
      tasks: [
        { text: 'Architect Agent: Schema design', status: 'Active', color: '#10b981' },
        { text: 'Coder Agent: Unit test suites', status: 'Generating', color: '#c084fc' },
        { text: 'Auditor Agent: Security scan', status: 'Verifying', color: '#38bdf8' },
        { text: 'Writer Agent: Release notes', status: 'Complete', color: '#10b981' }
      ],
      col2Title: 'Token Throughput & Latency',
      ganttBars: [
        { label: 'Context Retrieval (1.2k tokens)', offset: '5%', width: '25%', color: '#c084fc' },
        { label: 'Parallel Reasoning Step', offset: '20%', width: '55%', color: '#38bdf8' },
        { label: 'Sandbox Execution Check', offset: '60%', width: '25%', color: '#10b981' },
        { label: 'Safety Alignment Verification', offset: '70%', width: '25%', color: '#f59e0b' }
      ],
      col3Title: 'Active Models',
      team: ['Claude Opus', 'GPT-4o', 'Gemini Pro', 'DeepSeek']
    }
  }
];
