const fs = require('fs');

const routes = [
  { id: 'overview', file: 'dashboard.html', title: 'Boat Owner Dashboard', sub: 'Welcome back, James! Your next service is on June 18.' },
  { id: 'schedule', file: 'dashboard-schedule.html', title: 'Schedule a Service', sub: 'Book your next cleaning appointment at your marina.' },
  { id: 'history', file: 'dashboard-history.html', title: 'Service History', sub: 'View all past services, reports, and spending.' },
  { id: 'recurring', file: 'dashboard-recurring.html', title: 'Recurring Services', sub: 'Manage your automatic recurring service schedule.' },
  { id: 'boats', file: 'dashboard-boats.html', title: 'My Fleet', sub: 'Manage your registered vessels and their details.' },
  { id: 'profile', file: 'dashboard-profile.html', title: 'Profile Settings', sub: 'Update your account info, password, and preferences.' }
];

let base = fs.readFileSync('dashboard.html', 'utf8');

for(let route of routes) {
  let fileContent = base;

  const activeOverview = route.id === 'overview' ? 'active' : '';
  const activeSchedule = route.id === 'schedule' ? 'active' : '';
  const activeHistory = route.id === 'history' ? 'active' : '';
  const activeRecurring = route.id === 'recurring' ? 'active' : '';
  const activeBoats = route.id === 'boats' ? 'active' : '';
  const activeProfile = route.id === 'profile' ? 'active' : '';

  const newNav = `
    <span class="sidebar-section-label">Main</span>
    <a href="dashboard.html" class="${activeOverview}"><span class="nav-icon">📊</span>Overview</a>
    <a href="dashboard-schedule.html" class="${activeSchedule}"><span class="nav-icon">📅</span>Schedule Service</a>
    <a href="dashboard-history.html" class="${activeHistory}"><span class="nav-icon">🕒</span>Service History</a>
    <a href="dashboard-recurring.html" class="${activeRecurring}"><span class="nav-icon">🔄</span>Recurring Services</a>
    <span class="sidebar-section-label">My Fleet</span>
    <a href="dashboard-boats.html" class="${activeBoats}"><span class="nav-icon">⛵</span>My Boats</a>
    <span class="sidebar-section-label">Account</span>
    <a href="dashboard-profile.html" class="${activeProfile}"><span class="nav-icon">👤</span>Profile Settings</a>
  `;
  fileContent = fileContent.replace(/<span class="sidebar-section-label">Main<\/span>[\s\S]*?<a href="#profile".*?<\/a>/, newNav.trim());

  fileContent = fileContent.replace(/<h1 id="page-heading">.*?<\/h1>/, '<h1 id="page-heading">' + route.title + '</h1>');
  fileContent = fileContent.replace(/<p id="page-sub">.*?<\/p>/, '<p id="page-sub">' + route.sub + '</p>');

  for(let r of routes) {
    if (r.id === route.id) {
       fileContent = fileContent.replace(new RegExp('<section id="section-' + r.id + '" style="display:none">'), '<section id="section-' + r.id + '">');
    } else {
       fileContent = fileContent.replace(new RegExp('\\n\\s*<!-- ── ' + r.id.toUpperCase() + ' ── -->[\\\\s\\\\S]*?<section id="section-' + r.id + '"[\\\\s\\\\S]*?<\\/section>'), '');
    }
  }

  fileContent = fileContent.replace(/function showSection[\s\S]*?return false;\r?\n}/, '');

  fileContent = fileContent.replace(/<a href="#" onclick="showSection[^\>]*>/, '<a href="dashboard-history.html" style="font-size:.78rem;color:var(--accent);text-decoration:none;">');

  fs.writeFileSync(route.file, fileContent);
  console.log('Built ' + route.file);
}
