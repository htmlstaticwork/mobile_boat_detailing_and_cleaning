/* ── SHARED NAV + FOOTER INJECT ── */
const NAV_HTML=`
<div class="cursor"></div>
<div class="cursor-ring"></div>
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-icon">⚓</div>
      <span class="nav-logo-text">CleanWave</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="home2.html">Home 2</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="dashboard.html" class="nav-dashboard">Dashboard</a></li>
    </ul>
    <div class="nav-right">
      <button class="nav-btn rtl-btn" aria-label="RTL toggle" title="Toggle RTL">⇄ <span class="rtl-lbl" style="font-size:.6rem;font-family:'Space Mono',monospace;">RTL</span></button>
      <button class="nav-btn theme-btn" aria-label="Theme toggle">☀️</button>
      <a href="login.html" class="nav-cta nav-cta-secondary">Login</a>
      <a href="services.html" class="nav-cta nav-cta-primary">Book Now</a>
      <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>
<div class="drawer-overlay"></div>
<div class="drawer">
  <button class="drawer-close">✕</button>
  <div class="drawer-links">
    <a href="index.html">Home</a>
    <a href="home2.html">Home 2</a>
    <a href="services.html">Services</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>
    <a href="dashboard.html">Dashboard</a>
    <a href="login.html">Login</a>
  </div>
  <div class="drawer-bottom">
    <button class="nav-btn rtl-btn-drawer" style="width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:none;color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;" aria-label="RTL">⇄<span class="rtl-lbl" style="font-size:.55rem;font-family:Space Mono,monospace;margin-left:2px;">RTL</span></button>
    <button class="nav-btn theme-btn-drawer" style="width:38px;height:38px;border-radius:50%;border:1px solid var(--border);background:none;color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;" aria-label="Theme">☀️</button>
  </div>
</div>`;

const FOOTER_HTML=`
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="nav-logo" style="text-decoration:none;display:inline-flex;align-items:center;gap:.6rem;">
          <div class="nav-logo-icon" style="width:32px;height:32px;background:var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;">⚓</div>
          <span style="font-family:'DM Serif Display',serif;font-size:1.2rem;color:var(--secondary);">CleanWave</span>
        </a>
        <p>Premium mobile boat detailing & cleaning at your marina. We come to you — pristine results guaranteed.</p>
        <div class="social-row">
          <a href="#" class="si si-fb" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="si si-ig" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" class="si si-tw" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>
          <a href="#" class="si si-li" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      <div class="footer-col"><h4>Services</h4><ul>
        <li><a href="services.html">Exterior Wash</a></li>
        <li><a href="services.html">Full Detail</a></li>
        <li><a href="services.html">Teak Treatment</a></li>
        <li><a href="services.html">Interior Clean</a></li>
        <li><a href="services.html">Antifoul Polish</a></li>
      </ul></div>
      <div class="footer-col"><h4>Company</h4><ul>
        <li><a href="index.html">About Us</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="dashboard.html">Dashboard</a></li>
      </ul></div>
      <div class="footer-col"><h4>Contact</h4><ul>
        <li><a href="#">hello@cleanwave.co</a></li>
        <li><a href="#">+1 (888) 204-BOAT</a></li>
        <li><a href="#">Marina Bay, CA 94107</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 CleanWave Marine Detailing. All rights reserved.</p>
      <p>Crafted with 🌊 & precision.</p>
    </div>
  </div>
</footer>
<button class="btt" aria-label="Back to top">↑</button>`;

document.addEventListener('DOMContentLoaded',()=>{
  const navTarget=document.querySelector('#nav-inject');
  if(navTarget)navTarget.outerHTML=NAV_HTML;
  const footerTarget=document.querySelector('#footer-inject');
  if(footerTarget)footerTarget.outerHTML=FOOTER_HTML;
});
