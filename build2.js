const fs = require('fs');

const idToData = {
  'overview': { file: 'dashboard.html', title: 'Boat Owner Dashboard', sub: 'Welcome back, James! Your next appointment is on June 18.' },
  'schedule': { file: 'dashboard-schedule.html', title: 'Schedule', sub: 'Book your next cleaning appointment at your marina.' },
  'history':  { file: 'dashboard-history.html', title: 'History-D', sub: 'View all past services, reports, and spending.' },
  'recurring':{ file: 'dashboard-recurring.html', title: 'Recurring', sub: 'Manage your automatic recurring service schedule.' },
  'boats':    { file: 'dashboard-boats.html', title: 'My Fleet', sub: 'Manage your registered vessels and their details.' },
  'profile':  { file: 'dashboard-profile.html', title: 'Profile-D', sub: 'Update your account info, password, and preferences.' }
};

const LOGO_HTML = `
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon"><i class="fas fa-anchor" style="color:var(--primary);"></i></div>
      <span class="nav-logo-text">CleanWave</span>
    </a>
`;

const TOGGLES_HTML = `
    <div class="sidebar-toggles">
      <button class="nav-btn rtl-btn" title="Toggle RTL">⇄</button>
      <button class="nav-btn theme-btn" title="Toggle Theme">☀️</button>
    </div>
`;

// Helper to extract section content
function getSection(allHtml, id) {
  const match = allHtml.match(new RegExp(`<section id="section-${id}"[^>]*>([\\s\\S]*?)</section>`));
  return match ? `<section id="section-${id}">${match[1]}</section>` : '';
}

// Read all possible files to find sections
const files = fs.readdirSync('.');
const dashboardFiles = files.filter(f => f.startsWith('dashboard') && f.endsWith('.html'));
const allHtml = dashboardFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const sections = {};
for (const id in idToData) {
  sections[id] = getSection(allHtml, id);
}

const sidebarTemplate = `
  <div class="sidebar-logo">
    ${LOGO_HTML}
  </div>
  <nav class="sidebar-nav">
    <span class="sidebar-section-label">Main</span>
    {{MAIN_NAV}}
    <span class="sidebar-section-label">My Fleet</span>
    {{FLEET_NAV}}
    <span class="sidebar-section-label">Account</span>
    {{ACCOUNT_NAV}}
  </nav>
  <div class="sidebar-bottom">
    ${TOGGLES_HTML}
    <div class="sidebar-user">
      <div class="user-avatar">JW</div>
      <div class="user-info"><h4>James Whitfield</h4><p>Boat Owner</p></div>
    </div>
    <button class="logout-btn" onclick="window.location.href='index.html'">
      <i class="fas fa-sign-out-alt"></i> Sign Out
    </button>
  </div>
`;

for (const activeId in idToData) {
  const data = idToData[activeId];
  
  let mainNav = [
    { id: 'overview', file: 'dashboard.html', icon: '📊', label: 'Overview' },
    { id: 'schedule', file: 'dashboard-schedule.html', icon: '📅', label: 'Schedule' },
    { id: 'history', file: 'dashboard-history.html', icon: '🕒', label: 'History-D' },
    { id: 'recurring', file: 'dashboard-recurring.html', icon: '🔄', label: 'Recurring' }
  ].map(n => `<a href="${n.file}" ${n.id === activeId ? 'class="active"' : ''}><span class="nav-icon">${n.icon}</span>${n.label}</a>`).join('\n    ');

  let fleetNav = `<a href="dashboard-boats.html" ${activeId === 'boats' ? 'class="active"' : ''}><span class="nav-icon">⛵</span>My Fleet</a>`;
  let accountNav = `<a href="dashboard-profile.html" ${activeId === 'profile' ? 'class="active"' : ''}><span class="nav-icon">👤</span>Profile-D</a>`;

  let sidebar = sidebarTemplate
    .replace('{{MAIN_NAV}}', mainNav)
    .replace('{{FLEET_NAV}}', fleetNav)
    .replace('{{ACCOUNT_NAV}}', accountNav);

  let pageHtml = `<!DOCTYPE html>
<html lang="en" data-theme="dark" dir="ltr">
<head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${data.title} · CleanWave</title>
<link rel="stylesheet" href="style.css"/>
<link rel="stylesheet" href="dashboard.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚓</text></svg>"/>
</head>
<body>
<div class="cursor"></div><div class="cursor-ring"></div>

<div class="dash-layout">
  <aside class="dash-sidebar" id="dash-sidebar">
    ${sidebar}
  </aside>

  <main class="dash-main">
    <div class="dash-topbar">
      <div class="topbar-left" style="display:flex;align-items:center;gap:1.2rem;">
        <button class="sidebar-toggle" id="sidebar-toggle">☰</button>
        <div>
          <h1 id="page-heading">${data.title}</h1>
          <p id="page-sub">${data.sub}</p>
        </div>
      </div>
      <div class="topbar-right">
        <div class="topbar-btn" title="Notifications"><i class="fas fa-bell"></i><div class="badge">3</div></div>
        <div class="topbar-btn" style="background:var(--accent);color:var(--primary);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;">JW</div>
      </div>
    </div>

    <div class="dash-content">
      ${sections[activeId] || ''}
    </div>
  </main>
</div>

<script src="main.js"></script>
<script>
const sbt=document.getElementById('sidebar-toggle'),dsb=document.getElementById('dash-sidebar');
if(sbt) sbt.addEventListener('click',()=>dsb&&dsb.classList.toggle('open'));
document.querySelectorAll('.toggle-switch').forEach(t=>t.addEventListener('click',()=>t.classList.toggle('on')));
</script>
</body>
</html>`;

  fs.writeFileSync(data.file, pageHtml);
  console.log('Saved ' + data.file);
}
