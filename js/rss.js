const FEED_URL = 'https://api.paragraph.com/blogs/rss/@wibtal.com';

async function fetchFeed() {
    // Try direct fetch first
    try {
        const res = await fetch(FEED_URL);
        if (res.ok) {
            const text = await res.text();
            if (text.includes('<rss') || text.includes('<feed')) return text;
        }
    } catch (e) { /* CORS likely, try proxies */ }

    // Proxy 1: allorigins
    try {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(FEED_URL)}`);
        if (res.ok) return await res.text();
    } catch (e) { /* try next */ }

    // Proxy 2: corsproxy
    try {
        const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(FEED_URL)}`);
        if (res.ok) return await res.text();
    } catch (e) { /* all failed */ }

    return null;
}

function parseItems(xml) {
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const items = doc.querySelectorAll('item');
    const posts = [];

    items.forEach(item => {
        const title = item.querySelector('title')?.textContent?.trim() || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent?.trim() || '';
        const date = pubDate ? new Date(pubDate) : null;

        if (title) {
            posts.push({ title, link, date });
        }
    });

    return posts;
}

function formatDate(date) {
    if (!date || isNaN(date)) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderPostList(posts, container) {
    const ul = document.createElement('ul');
    ul.className = 'post-list';

    posts.forEach(post => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = post.link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = `
            <span class="post-title">${post.title}</span>
            <span class="post-date">${formatDate(post.date)}</span>
        `;
        li.appendChild(a);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function renderFallback(container, message) {
    container.innerHTML = `<p class="loading">${message} <a href="https://wibtal.com" target="_blank">Read on wibtal.com &rarr;</a></p>`;
}

// Home page: 5 recent posts
async function loadHomePage() {
    const recentEl = document.getElementById('recent-posts');
    if (!recentEl) return;

    recentEl.innerHTML = '<p class="loading">Loading...</p>';

    const xml = await fetchFeed();
    if (!xml) {
        renderFallback(recentEl, 'Unable to load posts.');
        return;
    }

    const posts = parseItems(xml);
    if (posts.length === 0) {
        renderFallback(recentEl, 'No posts found.');
        return;
    }

    recentEl.innerHTML = '';
    renderPostList(posts.slice(0, 5), recentEl);
}

// Writing page: full archive grouped by year
async function loadWritingPage() {
    const archiveEl = document.getElementById('writing-archive');
    if (!archiveEl) return;

    archiveEl.innerHTML = '<p class="loading">Loading posts...</p>';

    const xml = await fetchFeed();
    if (!xml) {
        renderFallback(archiveEl, 'Unable to load posts.');
        return;
    }

    const posts = parseItems(xml);
    if (posts.length === 0) {
        renderFallback(archiveEl, 'No posts found.');
        return;
    }

    // Group by year
    const groups = {};
    posts.forEach(post => {
        const year = post.date ? post.date.getFullYear() : 'Unknown';
        if (!groups[year]) groups[year] = [];
        groups[year].push(post);
    });

    archiveEl.innerHTML = '';

    // Sort years descending
    const years = Object.keys(groups).sort((a, b) => b - a);
    years.forEach(year => {
        const section = document.createElement('div');
        section.className = 'year-group';

        const h2 = document.createElement('h2');
        h2.textContent = year;
        section.appendChild(h2);

        renderPostList(groups[year], section);
        archiveEl.appendChild(section);
    });
}
