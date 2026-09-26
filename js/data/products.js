/**
 * Product catalogue data (10 products)
 * Fulfills rules:
 * - Always generate dummy data if not provided (10 products total)
 * - Maximum 2-word shortTagline for mobile reels feed
 */

function generatePosterDataUri(name, shortTagline, accentColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280" width="100%" height="100%">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.32" />
        <stop offset="60%" stop-color="#1B1512" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#0a0706" stop-opacity="1" />
      </radialGradient>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGlow)" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    <circle cx="360" cy="560" r="160" fill="none" stroke="${accentColor}" stroke-width="2" stroke-dasharray="8 8" opacity="0.4"/>
    <circle cx="360" cy="560" r="90" fill="${accentColor}" fill-opacity="0.12" stroke="${accentColor}" stroke-width="2"/>
    <text x="360" y="555" fill="#ffffff" font-family="system-ui, sans-serif" font-size="34" font-weight="800" text-anchor="middle" letter-spacing="-0.5">${name}</text>
    <text x="360" y="595" fill="${accentColor}" font-family="system-ui, sans-serif" font-size="18" font-weight="600" text-anchor="middle" letter-spacing="1">${shortTagline}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PRODUCTS = [
  {
    id: 'aura-ai',
    name: 'Aura AI',
    version: 'v2.0',
    category: 'Agent Orchestration',
    userCount: '35,000+',
    rating: '4.97/5',
    uptime: '99.99%',
    speed: '< 60ms',
    shortTagline: 'Autonomous AI',
    tagline: 'Autonomous multi-agent pipeline with contextual semantic memory',
    description: 'Deploy swarms of collaborative AI agents that research, code, write, and execute complex workflows without manual supervision.',
    iconType: 'ai',
    accentColor: '#c084fc',
    categoryTag: 'ai',
    videoPreview: './assets/previews/aura-ai.webm',
    posterImage: generatePosterDataUri('Aura AI', 'Autonomous AI', '#c084fc'),
    features: ['Multi-agent Consensus', 'Vector Memory Store', 'Live Code Sandbox', 'Self-correcting Loops', 'Zero Hallucination Guard'],
    dashboard: {
      brandTitle: 'Aura Orchestrator',
      menuItems: [
        { label: 'Agent Graph', icon: 'share-2', active: true },
        { label: 'Swarm Monitor', icon: 'cpu', active: false },
        { label: 'Memory Bank', icon: 'hard-drive', active: false },
        { label: 'Prompt Canvas', icon: 'terminal', active: false }
      ],
      searchPlaceholder: 'Dispatch new agent swarm command...',
      col1Title: 'Active Agents',
      tasks: [
        { text: 'Architect Agent: Schema design', status: 'Active', color: '#10b981' },
        { text: 'Coder Agent: Unit test suites', status: 'Generating', color: '#c084fc' },
        { text: 'Auditor Agent: Security scan', status: 'Verifying', color: '#38bdf8' }
      ],
      col2Title: 'Token Throughput & Latency',
      ganttBars: [
        { label: 'Context Retrieval', offset: '5%', width: '25%', color: '#c084fc' },
        { label: 'Parallel Reasoning Step', offset: '20%', width: '55%', color: '#38bdf8' },
        { label: 'Sandbox Execution Check', offset: '60%', width: '25%', color: '#10b981' }
      ],
      col3Title: 'Active Models',
      team: ['Claude Opus', 'GPT-4o', 'Gemini Pro']
    }
  },
  {
    id: 'pulse-ecommerce',
    name: 'Pulse Commerce',
    version: 'v4.1',
    category: 'Headless Commerce',
    userCount: '42,000+',
    rating: '4.88/5',
    uptime: '100%',
    speed: '< 35ms',
    shortTagline: 'eCommerce Platform',
    tagline: 'Ultra-fast edge checkout and global inventory orchestration',
    description: 'Built for modern lifestyle and streetwear brands needing sub-second edge checkouts with zero flash-sale crashes.',
    iconType: 'ecommerce',
    accentColor: '#34d399',
    categoryTag: 'commerce',
    videoPreview: './assets/previews/pulse-ecommerce.webm',
    posterImage: generatePosterDataUri('Pulse Commerce', 'eCommerce Platform', '#34d399'),
    features: ['Edge Cached Cart', 'Multi-currency Global', '1-Tap Apple/Google Pay', 'Fraud Guard AI', 'Inventory Sync'],
    dashboard: {
      brandTitle: 'Pulse Store',
      menuItems: [
        { label: 'Overview', icon: 'shopping-bag', active: true },
        { label: 'Orders', icon: 'package', active: false },
        { label: 'Catalog', icon: 'tag', active: false },
        { label: 'Discounts', icon: 'percent', active: false }
      ],
      searchPlaceholder: 'Search orders, SKUs or customers...',
      col1Title: 'Live Orders ($84,920 today)',
      tasks: [
        { text: 'Order #9824 — Cyber Moss Tee', status: 'Packed', color: '#10b981' },
        { text: 'Order #9825 — ProductZero Ceramic Mug', status: 'Shipped', color: '#3b82f6' },
        { text: 'Order #9826 — Mechanical Keycap', status: 'Transit', color: '#8b5cf6' }
      ],
      col2Title: 'Flash Sale Performance',
      ganttBars: [
        { label: 'Early Access Drop', offset: '5%', width: '30%', color: '#ec4899' },
        { label: 'Main VIP Checkout Peak', offset: '25%', width: '50%', color: '#10b981' },
        { label: 'Restock Notifications', offset: '60%', width: '35%', color: '#3b82f6' }
      ],
      col3Title: 'Gateways',
      team: ['Stripe 3D', 'Apple Pay', 'PayPal']
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
    shortTagline: 'Project Management',
    tagline: 'Multiplayer roadmap builder with synchronous canvas & milestones',
    description: 'Experience fluid collaborative canvas management where engineering, design, and product management sync in real-time.',
    iconType: 'projects',
    accentColor: '#38d374',
    categoryTag: 'saas',
    videoPreview: './assets/previews/terra-projects.webm',
    posterImage: generatePosterDataUri('Terra Projects', 'Project Management', '#38d374'),
    features: ['Multiplayer Cursor Canvas', 'Automated GitHub Sync', 'Markdown Docs Native', 'Linear Two-way Sync', 'Figma Embeds'],
    dashboard: {
      brandTitle: 'Terra Projects',
      menuItems: [
        { label: 'Roadmap', icon: 'map', active: true },
        { label: 'Backlog', icon: 'list', active: false },
        { label: 'Sprint 24', icon: 'zap', active: false },
        { label: 'Docs', icon: 'book', active: false }
      ],
      searchPlaceholder: 'Search roadmaps, epics, pull requests...',
      col1Title: 'Active Epics',
      tasks: [
        { text: 'Mobile Gestures & Physics Engine', status: 'Priority', color: '#ef4444' },
        { text: 'Wasm Compute Worker Integration', status: 'Building', color: '#3b82f6' },
        { text: 'Dark Mode HSL Color Tokens', status: 'Approved', color: '#10b981' }
      ],
      col2Title: 'Q3 Product Milestones',
      ganttBars: [
        { label: 'Alpha Private Rollout', offset: '10%', width: '40%', color: '#38d374' },
        { label: 'Public Beta Announcement', offset: '35%', width: '35%', color: '#06b6d4' },
        { label: 'Enterprise Security Tier', offset: '50%', width: '40%', color: '#f59e0b' }
      ],
      col3Title: 'Collaborators',
      team: ['Devin S.', 'Chloe M.', 'Marcus W.']
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
    shortTagline: 'Dashboard Analytics',
    tagline: 'Instant cohort queries and ML-powered conversion forecasts',
    description: 'Transform petabytes of user telemetry into beautiful interactive cohort maps, heatmaps, and churn predictions in seconds.',
    iconType: 'analytics',
    accentColor: '#818cf8',
    categoryTag: 'analytics',
    videoPreview: './assets/previews/nova-analytics.webm',
    posterImage: generatePosterDataUri('Nova Analytics', 'Dashboard Analytics', '#818cf8'),
    features: ['Anomaly Detection AI', 'Sub-second OLAP Query', 'Visual SQL Canvas', 'Custom Webhooks', 'GDPR/HIPAA Certified'],
    dashboard: {
      brandTitle: 'Nova Analytics',
      menuItems: [
        { label: 'Live Metrics', icon: 'activity', active: true },
        { label: 'Cohorts', icon: 'users', active: false },
        { label: 'Funnels', icon: 'filter', active: false },
        { label: 'Predictions', icon: 'cpu', active: false }
      ],
      searchPlaceholder: 'Query metrics, event streams, cohorts...',
      col1Title: 'Live Ingestion',
      tasks: [
        { text: 'Global event stream: 12.4k req/s', status: 'Healthy', color: '#10b981' },
        { text: 'Retention anomaly model #4', status: 'Trained', color: '#3b82f6' },
        { text: 'Checkout abandonment alert', status: 'Resolved', color: '#10b981' }
      ],
      col2Title: 'Traffic & Conversion Wave',
      ganttBars: [
        { label: 'Organic Search (+34%)', offset: '5%', width: '75%', color: '#3b82f6' },
        { label: 'Direct Referral Viral', offset: '20%', width: '60%', color: '#10b981' },
        { label: 'Paid Retargeting Ad', offset: '40%', width: '45%', color: '#f59e0b' }
      ],
      col3Title: 'Top Regions',
      team: ['Tokyo', 'San Francisco', 'Berlin']
    }
  },
  {
    id: 'apex-crm',
    name: 'Apex CRM',
    version: 'v3.0',
    category: 'Project Management',
    userCount: '15,000+',
    rating: '4.9/5',
    uptime: '99.98%',
    speed: '< 80ms',
    shortTagline: 'HRIS Absensi',
    tagline: 'Hyper-scalable customer relations & sprint execution engine',
    description: 'Unified CRM and project timeline platform designed for agile teams who crave zero bloat and high velocity delivery.',
    iconType: 'crm',
    accentColor: '#38bdf8',
    categoryTag: 'saas',
    videoPreview: './assets/previews/apex-crm.webm',
    posterImage: generatePosterDataUri('Apex CRM', 'HRIS Absensi', '#38bdf8'),
    features: ['Real-time Gantt Sync', 'Automated Lead Routing', 'Client Portal 2.0', 'One-click Invoicing', 'End-to-end Encryption'],
    dashboard: {
      brandTitle: 'Apex CRM',
      menuItems: [
        { label: 'Dashboard', icon: 'grid', active: true },
        { label: 'Projects', icon: 'folder', active: false },
        { label: 'Management', icon: 'users', active: false },
        { label: 'Tasks', icon: 'check-square', active: false }
      ],
      searchPlaceholder: 'Search leads, tasks or sprints...',
      col1Title: 'Active Tasks',
      tasks: [
        { text: 'Merchant clearance API', status: 'In Review', color: '#10b981' },
        { text: 'Revamp bio-stations UI', status: 'In Progress', color: '#3b82f6' },
        { text: 'Database geo-indexing', status: 'Pending', color: '#f59e0b' }
      ],
      col2Title: 'Live Gantt Timeline',
      ganttBars: [
        { label: 'Sprint Planning', offset: '10%', width: '35%', color: '#10b981' },
        { label: 'Core Integration', offset: '30%', width: '45%', color: '#ef4444' },
        { label: 'QA Regression', offset: '55%', width: '30%', color: '#8b5cf6' }
      ],
      col3Title: 'Team Pulse',
      team: ['Alex M.', 'Sasha K.', 'Jordan L.']
    }
  },
  {
    id: 'zenith-cloud',
    name: 'Zenith Cloud',
    version: 'v1.5',
    category: 'Cloud Infrastructure',
    userCount: '11,200+',
    rating: '4.89/5',
    uptime: '99.999%',
    speed: '< 20ms',
    shortTagline: 'Cloud Monitor',
    tagline: 'Multi-region Kubernetes telemetry & edge latency mesh',
    description: 'Autonomous cloud observability platform providing real-time distributed tracing, instant autoscaling signals, and automated disaster failover.',
    iconType: 'analytics',
    accentColor: '#f59e0b',
    categoryTag: 'analytics',
    videoPreview: './assets/previews/nova-analytics.webm',
    posterImage: generatePosterDataUri('Zenith Cloud', 'Cloud Monitor', '#f59e0b'),
    features: ['Distributed Tracing', 'Kernel eBPF Probes', 'Zero-downtime Rollouts', 'Automated Failover', 'Cost Optimizer'],
    dashboard: {
      brandTitle: 'Zenith Mesh',
      menuItems: [
        { label: 'Clusters', icon: 'cpu', active: true },
        { label: 'Nodes', icon: 'grid', active: false },
        { label: 'Traces', icon: 'activity', active: false }
      ],
      searchPlaceholder: 'Query cluster metrics...',
      col1Title: 'Cluster Health',
      tasks: [
        { text: 'Asia-East-1 Ingress Node', status: 'Healthy', color: '#10b981' },
        { text: 'US-West-2 Worker Autoscaled', status: 'Optimal', color: '#3b82f6' }
      ],
      col2Title: 'Network Latency',
      ganttBars: [
        { label: 'Global Edge Sync', offset: '10%', width: '30%', color: '#f59e0b' },
        { label: 'Cross-DC Replicate', offset: '40%', width: '40%', color: '#10b981' }
      ],
      col3Title: 'Regions',
      team: ['Singapore', 'Tokyo', 'Frankfurt']
    }
  },
  {
    id: 'vortex-db',
    name: 'Vortex DB',
    version: 'v2.1',
    category: 'Vector Database',
    userCount: '9,800+',
    rating: '4.94/5',
    uptime: '99.99%',
    speed: '< 15ms',
    shortTagline: 'Vector Database',
    tagline: 'Sub-millisecond semantic search engine for billions of embeddings',
    description: 'Native Rust vector database engineered for real-time HNSW indexing, hybrid lexical filtering, and high-concurrency LLM memory retrieval.',
    iconType: 'crm',
    accentColor: '#ec4899',
    categoryTag: 'ai',
    videoPreview: './assets/previews/apex-crm.webm',
    posterImage: generatePosterDataUri('Vortex DB', 'Vector Database', '#ec4899'),
    features: ['HNSW GPU Indexing', 'Hybrid Sparse-Dense', 'Instant Snapshot Restore', 'ACID Raft Consensus', 'Multi-tenant Isolation'],
    dashboard: {
      brandTitle: 'Vortex DB',
      menuItems: [
        { label: 'Indexes', icon: 'database', active: true },
        { label: 'Queries', icon: 'activity', active: false },
        { label: 'Snapshots', icon: 'hard-drive', active: false }
      ],
      searchPlaceholder: 'Query vector space...',
      col1Title: 'Index Metrics',
      tasks: [
        { text: 'Image Embeddings: 4.8M vectors', status: 'Indexed', color: '#10b981' },
        { text: 'Text Embeddings: 12.2M vectors', status: 'Indexed', color: '#ec4899' }
      ],
      col2Title: 'Search Throughput',
      ganttBars: [
        { label: 'Recall Rate 99.4%', offset: '5%', width: '70%', color: '#ec4899' },
        { label: 'Quantized Scan', offset: '35%', width: '45%', color: '#3b82f6' }
      ],
      col3Title: 'Nodes',
      team: ['Node A-1', 'Node A-2', 'Node B-1']
    }
  },
  {
    id: 'prism-design',
    name: 'Prism Design',
    version: 'v3.2',
    category: 'Design Systems',
    userCount: '21,500+',
    rating: '4.91/5',
    uptime: '99.96%',
    speed: '< 40ms',
    shortTagline: 'UI Generator',
    tagline: 'Generative design tokens and production React/Vue component bridge',
    description: 'Connect design Figma tokens directly to production code with automated visual regression tests and AI component variations.',
    iconType: 'projects',
    accentColor: '#06b6d4',
    categoryTag: 'saas',
    videoPreview: './assets/previews/aura-ai.webm',
    posterImage: generatePosterDataUri('Prism Design', 'UI Generator', '#06b6d4'),
    features: ['Figma 2-Way Sync', 'Design Token Linter', 'Visual Regression Bot', 'W3C Standard Output', 'Micro-interaction Canvas'],
    dashboard: {
      brandTitle: 'Prism Engine',
      menuItems: [
        { label: 'Components', icon: 'grid', active: true },
        { label: 'Tokens', icon: 'tag', active: false },
        { label: 'Theme Preview', icon: 'eye', active: false }
      ],
      searchPlaceholder: 'Search components, styles, variants...',
      col1Title: 'Design System',
      tasks: [
        { text: 'Button variants v3.2', status: 'Published', color: '#10b981' },
        { text: 'Dark Mode tokens patch', status: 'Reviewing', color: '#06b6d4' }
      ],
      col2Title: 'Token Coverage',
      ganttBars: [
        { label: 'Core Color Scales', offset: '5%', width: '85%', color: '#06b6d4' },
        { label: 'Typography Scale', offset: '20%', width: '65%', color: '#8b5cf6' }
      ],
      col3Title: 'Auditors',
      team: ['Sarah L.', 'Kenji M.', 'Rachel T.']
    }
  },
  {
    id: 'echo-voice',
    name: 'Echo Voice',
    version: 'v1.2',
    category: 'Audio Intelligence',
    userCount: '16,400+',
    rating: '4.87/5',
    uptime: '99.98%',
    speed: '< 70ms',
    shortTagline: 'Voice Agent',
    tagline: 'Ultra-low latency conversational AI with emotional inflection',
    description: 'Transform customer support and voice interfaces with sub-100ms conversational turn-taking, noise cancellation, and lifelike natural timbre.',
    iconType: 'ai',
    accentColor: '#10b981',
    categoryTag: 'ai',
    videoPreview: './assets/previews/pulse-ecommerce.webm',
    posterImage: generatePosterDataUri('Echo Voice', 'Voice Agent', '#10b981'),
    features: ['Sub-100ms Turn-taking', 'Emotional Tone Modulation', 'Real-time Phoneme Stream', 'Noise Filtering DSP', 'Multi-lingual Accent Sync'],
    dashboard: {
      brandTitle: 'Echo Engine',
      menuItems: [
        { label: 'Conversations', icon: 'mic', active: true },
        { label: 'Voice Models', icon: 'cpu', active: false },
        { label: 'Analytics', icon: 'activity', active: false }
      ],
      searchPlaceholder: 'Search voice streams...',
      col1Title: 'Active Calls',
      tasks: [
        { text: 'Call #4910 — German Support', status: 'Live', color: '#10b981' },
        { text: 'Call #4911 — Sales Booking', status: 'Live', color: '#10b981' }
      ],
      col2Title: 'Turn Latency',
      ganttBars: [
        { label: 'ASR Transcription (30ms)', offset: '5%', width: '30%', color: '#10b981' },
        { label: 'LLM Reasoning (28ms)', offset: '35%', width: '35%', color: '#3b82f6' }
      ],
      col3Title: 'Synthesizers',
      team: ['Echo-Natural', 'Echo-Studio', 'Echo-Warm']
    }
  },
  {
    id: 'lumina-docs',
    name: 'Lumina Docs',
    version: 'v2.8',
    category: 'Knowledge Base',
    userCount: '24,300+',
    rating: '4.93/5',
    uptime: '99.99%',
    speed: '< 30ms',
    shortTagline: 'Knowledge Base',
    tagline: 'Collaborative living documentation with automated API drift tracking',
    description: 'Keep developer docs and product specifications permanently in sync with codebases through automated git-hook schema validation.',
    iconType: 'projects',
    accentColor: '#a855f7',
    categoryTag: 'saas',
    videoPreview: './assets/previews/terra-projects.webm',
    posterImage: generatePosterDataUri('Lumina Docs', 'Knowledge Base', '#a855f7'),
    features: ['Automated Drift Detection', 'OpenAPI/GraphQL Native', 'Interactive Code Playgrounds', 'Version Branching', 'Semantic Search AI'],
    dashboard: {
      brandTitle: 'Lumina Docs',
      menuItems: [
        { label: 'Guides', icon: 'book', active: true },
        { label: 'API Specs', icon: 'code', active: false },
        { label: 'Changelog', icon: 'file-text', active: false }
      ],
      searchPlaceholder: 'Search docs, API endpoints, guides...',
      col1Title: 'Sync Status',
      tasks: [
        { text: 'Checkout API spec v4.2', status: 'Synced', color: '#10b981' },
        { text: 'Auth JWT endpoints drift check', status: 'Verified', color: '#a855f7' }
      ],
      col2Title: 'Readership Velocity',
      ganttBars: [
        { label: 'Getting Started Guide', offset: '5%', width: '80%', color: '#a855f7' },
        { label: 'Webhook Handlers', offset: '25%', width: '55%', color: '#38bdf8' }
      ],
      col3Title: 'Maintainers',
      team: ['Daniel H.', 'Priya N.', 'Marcus C.']
    }
  }
];
