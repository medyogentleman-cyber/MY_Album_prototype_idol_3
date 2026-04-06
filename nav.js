document.addEventListener("DOMContentLoaded", function() {
    // Determine active path
    let currentPath = window.location.pathname.split('/').pop() || 'home.html';
    
    // Inject Styles once
    if (!document.getElementById('nav-styles')) {
        const style = document.createElement('style');
        style.id = 'nav-styles';
        style.innerHTML = `
            .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background-color: rgba(255,255,255,0.95); backdrop-filter: blur(10px); height: var(--nav-height, 80px); display: flex; justify-content: space-around; align-items: center; border-top: 1px solid var(--border-color, #EAE8F2); z-index: 100; padding-bottom: env(safe-area-inset-bottom, 0px); }
            .nav-item { display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-sub, #8E8E93); text-decoration: none; transition: 0.2s; width: 60px; height: 100%; }
            .nav-item.active { color: var(--primary-color, #FF6B00); }
            .nav-item svg { width: 28px; height: 28px; fill: currentColor; }
            .nav-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 2px solid transparent; }
            .nav-item.active .nav-avatar { border-color: var(--primary-color, #FF6B00); }
        `;
        document.head.appendChild(style);
    }

    // Determine active links
    const isHome = currentPath === 'home.html' || currentPath === 'home_other.html' ? 'active' : '';
    const isSearch = currentPath === 'search.html' ? 'active' : '';
    const isAlbum = currentPath === 'my_albums.html' || currentPath.startsWith('followed_album_') || currentPath === 'album_view.html' ? 'active' : '';
    const isStorage = currentPath === 'storage.html' || currentPath === 'storage_purchase.html' ? 'active' : '';
    const isPayment = currentPath === 'payment.html' || currentPath === 'payment_history.html' ? 'active' : '';
    const isProfile = currentPath === 'profile.html' ? 'active' : '';

    const navHTML = `
        <a href="home.html" class="nav-item ${isHome}">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </a>
        <a href="search.html" class="nav-item ${isSearch}">
            <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.90L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        </a>
        <a href="my_albums.html" class="nav-item ${isAlbum}">
            <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/></svg>
        </a>

        <a href="storage.html" class="nav-item ${isStorage}">
            <svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.36 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>
        </a>
        <a href="payment.html" class="nav-item ${isPayment}">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
        </a>
        <a href="profile.html" class="nav-item ${isProfile}">
            <img src="images/avatar.png" alt="Profile" class="nav-avatar">
        </a>
    `;

    // Remove old nav if any
    const existingNavs = document.querySelectorAll('.bottom-nav');
    existingNavs.forEach(n => n.remove());

    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.innerHTML = navHTML;
    
    // Append to app-container if it exists, otherwise to body
    const container = document.querySelector('.app-container');
    if (container) {
        container.appendChild(nav);
    } else {
        document.body.appendChild(nav);
    }
});
