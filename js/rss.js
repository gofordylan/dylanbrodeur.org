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
        const content = item.getElementsByTagNameNS('http://purl.org/rss/1.0/modules/content/', 'encoded')[0]?.textContent?.trim() || '';
        const slug = link.split('/').pop() || '';

        if (title) {
            posts.push({ title, link, date, content, slug });
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
        a.href = '/writing.html?post=' + encodeURIComponent(post.slug);
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

function renderArticle(post, container) {
    container.innerHTML = `
        <article class="article">
            <a href="/writing.html" class="back-link">&larr; All posts</a>
            <h1 class="article-title">${post.title}</h1>
            <p class="article-date">${formatDate(post.date)}</p>
            <div class="article-body">${post.content}</div>
            <a href="${post.link}" target="_blank" class="article-source">Read on wibtal.com &rarr;</a>
        </article>
    `;
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

// Writing page: archive or single post
async function loadWritingPage() {
    const archiveEl = document.getElementById('writing-archive');
    if (!archiveEl) return;

    const params = new URLSearchParams(window.location.search);
    const postSlug = params.get('post');

    archiveEl.innerHTML = '<p class="loading">Loading...</p>';

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

    // Single post view
    if (postSlug) {
        const post = posts.find(p => p.slug === postSlug);
        if (post) {
            document.title = post.title + ' - Dylan Brodeur';
            // Hide the page header
            const header = document.querySelector('.writing-header');
            if (header) header.style.display = 'none';
            const pageTitle = document.querySelector('main > h1');
            if (pageTitle) pageTitle.style.display = 'none';
            const viewMore = document.querySelector('.view-all');
            if (viewMore) viewMore.style.display = 'none';

            archiveEl.innerHTML = '';
            renderArticle(post, archiveEl);
            window.scrollTo(0, 0);
            return;
        }
    }

    // Archive view: group by year
    const groups = {};
    posts.forEach(post => {
        const year = post.date ? post.date.getFullYear() : 'Unknown';
        if (!groups[year]) groups[year] = [];
        groups[year].push(post);
    });

    archiveEl.innerHTML = '';

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
