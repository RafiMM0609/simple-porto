/**
 * Product DOM renderer module
 * Renders the laptop screen dashboard, product info pill, and card states
 */

export function getIconSvg(type) {
  switch (type) {
    case 'crm':
      return `
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="24" width="7" height="18" rx="2" fill="#38bdf8"/>
          <rect x="17" y="14" width="7" height="28" rx="2" fill="#10b981"/>
          <rect x="28" y="8" width="7" height="34" rx="2" fill="#3b82f6"/>
          <circle cx="39" cy="18" r="5" fill="#34d399"/>
          <path d="M33 34c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      `;
    case 'analytics':
      return `
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 32l10-12 9 8 13-16" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="8" cy="32" r="3" fill="#38bdf8"/>
          <circle cx="18" cy="20" r="3" fill="#34d399"/>
          <circle cx="27" cy="28" r="3" fill="#818cf8"/>
          <circle cx="40" cy="12" r="3.5" fill="#38d374"/>
          <rect x="7" y="38" width="4" height="6" rx="1.5" fill="#64748b"/>
          <rect x="16" y="38" width="4" height="6" rx="1.5" fill="#64748b"/>
          <rect x="25" y="38" width="4" height="6" rx="1.5" fill="#64748b"/>
          <rect x="34" y="38" width="4" height="6" rx="1.5" fill="#64748b"/>
        </svg>
      `;
    case 'ecommerce':
      return `
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="39" r="4" fill="#38d374"/>
          <circle cx="34" cy="39" r="4" fill="#38d374"/>
          <path d="M7 11h6l4.5 18h18l4-13H15" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24 16l8-4-8-4v3H16v2h8v3z" fill="#34d399"/>
        </svg>
      `;
    case 'projects':
      return `
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="10" width="22" height="12" rx="4" stroke="#f59e0b" stroke-width="3" fill="rgba(245, 158, 11, 0.15)"/>
          <circle cx="14" cy="16" r="2" fill="#f59e0b"/>
          <rect x="18" y="14" width="8" height="4" rx="1" fill="#f59e0b"/>
          <rect x="18" y="26" width="22" height="12" rx="4" stroke="#38bdf8" stroke-width="3" fill="rgba(56, 189, 248, 0.15)"/>
          <circle cx="24" cy="32" r="2" fill="#38bdf8"/>
          <rect x="28" y="30" width="8" height="4" rx="1" fill="#38bdf8"/>
          <path d="M19 22v6h-4" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    case 'ai':
    default:
      return `
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="8" fill="#c084fc" opacity="0.3"/>
          <circle cx="24" cy="24" r="5" fill="#c084fc"/>
          <circle cx="10" cy="15" r="3.5" fill="#38bdf8"/>
          <circle cx="38" cy="15" r="3.5" fill="#34d399"/>
          <circle cx="12" cy="34" r="3.5" fill="#f43f5e"/>
          <circle cx="36" cy="34" r="3.5" fill="#f59e0b"/>
          <path d="M13 17l7 5m8 0l7-5M15 32l6-5m6 0l6 5" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
  }
}

/**
 * Render laptop screen HTML for a given product (WebM video preview or fallback live dashboard)
 */
export function renderLaptopScreen(product) {
  if (product.videoPreview) {
    return `
      <div class="screen-video-wrapper">
        <video 
          class="screen-video" 
          src="${product.videoPreview}" 
          autoplay 
          loop 
          muted 
          playsinline 
          preload="auto"
          aria-label="${product.name} interactive demo preview">
        </video>
        <div class="screen-video-overlay" aria-hidden="true"></div>
      </div>
    `;
  }

  return renderLiveDashboardHtml(product.dashboard);
}

/**
 * Render fallback live dashboard HTML
 */
export function renderLiveDashboardHtml(dashboard) {
  if (!dashboard) return '';

  const menuHtml = dashboard.menuItems
    .map(
      item => `
      <div class="dash-menu-item ${item.active ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="4"/>
        </svg>
        <span>${item.label}</span>
      </div>
    `
    )
    .join('');

  const tasksHtml = dashboard.tasks
    .map(
      task => `
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 7.8px; padding: 2px 0; border-bottom: 1px dashed #e2e8f0;">
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 65%; color: #334155;">
          ${task.text}
        </span>
        <span style="font-size: 7px; font-weight: 700; color: ${task.color}; background: ${task.color}15; padding: 1px 4px; border-radius: 3px;">
          ${task.status}
        </span>
      </div>
    `
    )
    .join('');

  const ganttHtml = dashboard.ganttBars
    .map(
      bar => `
      <div class="gantt-bar-item">
        <div style="display: flex; justify-content: space-between; font-size: 7px; color: #64748b;">
          <span>${bar.label}</span>
        </div>
        <div class="gantt-line">
          <div class="gantt-fill" style="left: ${bar.offset}; width: ${bar.width}; background: ${bar.color};"></div>
        </div>
      </div>
    `
    )
    .join('');

  const teamHtml = dashboard.team
    .map(
      member => `
      <div style="display: flex; align-items: center; gap: 4px; font-size: 7.5px; color: #475569;">
        <span style="width: 14px; height: 14px; border-radius: 50%; background: #e2e8f0; display: inline-flex; align-items: center; justify-content: center; font-size: 7px; font-weight: 700;">
          ${member.charAt(0)}
        </span>
        <span>${member}</span>
      </div>
    `
    )
    .join('');

  return `
    <div class="screen-content">
      <!-- Mini Left Sidebar -->
      <aside class="dash-sidebar">
        <div class="dash-brand">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>${dashboard.brandTitle}</span>
        </div>
        <nav style="display: flex; flex-direction: column; gap: 2px;">
          ${menuHtml}
        </nav>
      </aside>

      <!-- Main Dashboard Canvas -->
      <section class="dash-main">
        <div class="dash-topbar">
          <div class="dash-search-box">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <span>${dashboard.searchPlaceholder}</span>
          </div>
          <div class="dash-user-row">
            <div class="dash-avatar">K</div>
          </div>
        </div>

        <div class="dash-body">
          <!-- Col 1: Tasks / Ingestion -->
          <div class="dash-col-card">
            <div class="dash-col-title">
              <span>${dashboard.col1Title}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              ${tasksHtml}
            </div>
          </div>

          <!-- Col 2: Gantt Chart / Timeline -->
          <div class="dash-col-card">
            <div class="dash-col-title">
              <span>${dashboard.col2Title}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px; padding-top: 2px;">
              ${ganttHtml}
            </div>
          </div>

          <!-- Col 3: Team / Nodes -->
          <div class="dash-col-card">
            <div class="dash-col-title">
              <span>${dashboard.col3Title}</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              ${teamHtml}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/**
 * Update the bottom info pill
 */
export function updateInfoPill(container, product) {
  if (!container) return;
  const titleEl = container.querySelector('.pill-title');
  const metaEl = container.querySelector('.pill-meta');

  if (titleEl) {
    titleEl.textContent = `${product.name} ${product.version}`;
  }
  if (metaEl) {
    metaEl.innerHTML = `
      <span>${product.category}</span>
      <span class="meta-divider">•</span>
      <span>User Count: ${product.userCount}</span>
    `;
  }
}

/**
 * Render Mini Show Page with WebM video component & Orbital Node coordinate badge
 */
export function renderMiniPageHtml(product, viewTitle, urlSlug, nodeLabel = '') {
  const videoSrc = product.videoPreview || '';
  const badgeHtml = nodeLabel
    ? `<span class="orbital-node-badge"><span class="orbital-node-pulse-dot"></span>${nodeLabel}</span>`
    : '';

  return `
    ${badgeHtml}
    <div class="mini-page-header">
      <div class="mini-window-dots">
        <span class="dot dot--red"></span>
        <span class="dot dot--yellow"></span>
        <span class="dot dot--green"></span>
      </div>
      <span class="mini-page-url">productzero.io/${product.id}/${urlSlug}</span>
    </div>
    <div class="mini-page-video-body">
      <div class="mini-video-frame">
        <video 
          class="mini-webm-video" 
          src="${videoSrc}" 
          autoplay 
          loop 
          muted 
          playsinline 
          preload="auto"
          aria-label="${product.name} ${viewTitle} WebM demo">
        </video>
        <div class="mini-video-overlay">
          <span class="mini-zoom-pill">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            Klik untuk Zoom
          </span>
          <div class="mini-video-caption">
            <span class="mini-video-title">${viewTitle}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Mini Show Page 1: Core Flow WebM (Alpha Orbit Node)
 */
export function renderMiniPage1Html(product) {
  return renderMiniPageHtml(product, `${product.name} Core Flow`, 'overview', 'ORBIT α-01');
}

/**
 * Render Mini Show Page 2: Timeline WebM (Beta Orbit Node)
 */
export function renderMiniPage2Html(product) {
  return renderMiniPageHtml(product, `${product.name} Timeline`, 'timeline', 'ORBIT β-02');
}

/**
 * Render Mini Show Page 3: Telemetry WebM (Gamma Orbit Node)
 */
export function renderMiniPage3Html(product) {
  return renderMiniPageHtml(product, `${product.name} Telemetry`, 'telemetry', 'ORBIT γ-03');
}

/**
 * Render Mini Show Page 4: Modules WebM (Delta Orbit Node)
 */
export function renderMiniPage4Html(product) {
  return renderMiniPageHtml(product, `${product.name} Modules`, 'modules', 'ORBIT δ-04');
}

/**
 * Update the 4 mini show pages for the currently active product
 */
export function updateMiniShowPages(product, isInitial = false) {
  const p1 = document.getElementById('mini-page-1');
  const p2 = document.getElementById('mini-page-2');
  const p3 = document.getElementById('mini-page-3');
  const p4 = document.getElementById('mini-page-4');

  if (isInitial) {
    if (p1) p1.innerHTML = renderMiniPage1Html(product);
    if (p2) p2.innerHTML = renderMiniPage2Html(product);
    if (p3) p3.innerHTML = renderMiniPage3Html(product);
    if (p4) p4.innerHTML = renderMiniPage4Html(product);
    return;
  }

  const pages = [p1, p2, p3, p4].filter(Boolean);
  pages.forEach(p => p.classList.add('updating'));

  setTimeout(() => {
    if (p1) p1.innerHTML = renderMiniPage1Html(product);
    if (p2) p2.innerHTML = renderMiniPage2Html(product);
    if (p3) p3.innerHTML = renderMiniPage3Html(product);
    if (p4) p4.innerHTML = renderMiniPage4Html(product);
    pages.forEach(p => p.classList.remove('updating'));
  }, 100);
}

