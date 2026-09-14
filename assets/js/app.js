(function() {
    'use strict';

    var SITE = {
        githubUrl: 'https://github.com/HanzoDev1375/GhostIdes',
        version: 'plugin-api 0.1.0'
    };

    var ICONS = {
        menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>',
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><line x1="20" y1="20" x2="15.8" y2="15.8"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 5 16 12 9 19"/></svg>',
        copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6"/></svg>',
        external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/><path d="M14 4h6v6"/><path d="M20 4 10.5 13.5"/></svg>',
        compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z"/></svg>',
        box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5Z"/><path d="M4 7.5 12 11l8-3.5"/><path d="M12 11v9"/></svg>',
        plug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v5"/><path d="M15 3v5"/><path d="M6.5 8h11v3a5.5 5.5 0 0 1-5.5 5.5A5.5 5.5 0 0 1 6.5 11Z"/><path d="M12 16.5V21"/></svg>',
        server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4.5" width="16" height="5.5" rx="1.4"/><rect x="4" y="14" width="16" height="5.5" rx="1.4"/><circle cx="7.6" cy="7.25" r=".9" fill="currentColor" stroke="none"/><circle cx="7.6" cy="16.75" r=".9" fill="currentColor" stroke="none"/></svg>',
        terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><polyline points="7.5 10 11 13 7.5 16"/><line x1="12.5" y1="16" x2="16.5" y2="16"/></svg>',
        layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><line x1="9" y1="4.5" x2="9" y2="19.5"/></svg>',
        package: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z"/><path d="M4 7.5v9l8 3.5 8-3.5v-9"/><line x1="12" y1="11" x2="12" y2="20"/></svg>',
        code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 8 4.5 12 9 16"/><polyline points="15 8 19.5 12 15 16"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r=".9" fill="currentColor" stroke="none"/></svg>',
        tip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a5.5 5.5 0 0 0-3 10.1c.6.4 1 1.1 1 1.9h4c0-.8.4-1.5 1-1.9A5.5 5.5 0 0 0 12 3Z"/></svg>',
        warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 21 19.5H3Z" stroke-linejoin="round"/><line x1="12" y1="10" x2="12" y2="14.2"/><circle cx="12" cy="16.8" r=".9" fill="currentColor" stroke="none"/></svg>'
    };

    var PRISM_LANG_MAP = { java: 'java', json: 'json', bash: 'bash', sh: 'bash', gradle: 'groovy', groovy: 'groovy', text: null, none: null };

    var state = {
        lang: 'fa',
        openGroups: {},
        codeRegistry: []
    };

    function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { } }

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function slugify(str) {
        return String(str).toLowerCase().replace(/[^a-z0-9\u0600-\u06FF]+/g, '-').replace(/(^-|-$)/g, '');
    }

    function inline(str) {
        var s = escapeHtml(str);
        s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
        s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(m, text, url) {
            var external = /^https?:\/\//.test(url);
            return '<a href="' + url + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' + text + '</a>';
        });
        return s;
    }

    function t(lang, key) {
        var dict = {
            fa: {
                searchPlaceholder: 'جست‌وجو در مستندات…', onThisPage: 'شروع', prev: 'قبلی', next: 'بعدی',
                editSource: 'مبتنی بر کد واقعی ماژول', noResults: 'نتیجه‌ای پیدا نشد', home: 'خانه',
                notFoundTitle: 'صفحه پیدا نشد', notFoundBody: 'این صفحه وجود ندارد یا جابه‌جا شده.', backHome: 'برگشت به خانه'
            },
            en: {
                searchPlaceholder: 'Search documentation…', onThisPage: 'Start', prev: 'Previous', next: 'Next',
                editSource: 'Generated from the real module source', noResults: 'No results found', home: 'Home',
                notFoundTitle: 'Page not found', notFoundBody: "This page doesn't exist or has moved.", backHome: 'Back home'
            }
        };
        return dict[lang][key];
    }

    function flatPages() {
        var out = [];
        NAV_STRUCTURE.forEach(function(g) {
            g.slugs.forEach(function(slug) { out.push({ group: g.id, slug: slug }); });
        });
        return out;
    }

    function findPage(slug) {
        var flat = flatPages();
        for (var i = 0; i < flat.length; i++) { if (flat[i].slug === slug) return flat[i]; }
        return null;
    }

    function parseHash() {
        var h = (location.hash || '').replace(/^#\/?/, '');
        if (!h) return { route: 'home' };
        var parts = h.split('/').filter(Boolean);
        if (parts.length >= 2) return { route: 'page', group: parts[0], slug: parts[1] };
        if (parts.length === 1) {
            var found = findPage(parts[0]);
            if (found) return { route: 'page', group: found.group, slug: found.slug };
        }
        return { route: 'notfound' };
    }

    function badgeClass(mod) {
        if (mod === 'plugin-api') return 'module-plugin';
        if (mod === 'ide-api') return 'module-ide';
        if (mod === 'ide-ui-api') return 'module-ui';
        return '';
    }

    function renderCodeBlock(block) {
        var lang = block.lang || 'text';
        var prismLang = PRISM_LANG_MAP.hasOwnProperty(lang) ? PRISM_LANG_MAP[lang] : lang;
        var raw = (block.code || '').replace(/\n$/, '');
        var html;
        if (prismLang && window.Prism && Prism.languages[prismLang]) {
            html = Prism.highlight(raw, Prism.languages[prismLang], prismLang);
        } else {
            html = escapeHtml(raw);
        }
        var lines = raw.split('\n');
        var gutter = '';
        for (var i = 0; i < lines.length; i++) gutter += '<div>' + (i + 1) + '</div>';
        var idx = state.codeRegistry.length;
        state.codeRegistry.push(raw);
        var bar = '<div class="codeblock__bar">' +
            (block.filename ? '<span class="fname">' + escapeHtml(block.filename) + '</span>' : '') +
            '<span class="lang">' + escapeHtml(lang === 'text' ? '' : lang) + '</span>' +
            '<button class="codeblock__copy" type="button" data-idx="' + idx + '" aria-label="copy">' + ICONS.copy + '</button>' +
            '</div>';
        return '<div class="codeblock">' + bar +
            '<div class="codeblock__body"><div class="codeblock__gutter">' + gutter + '</div>' +
            '<pre class="codeblock__code"><code class="language-' + lang + '">' + html + '</code></pre></div></div>';
    }

    function renderNote(block) {
        var variant = block.variant || 'info';
        return '<div class="note ' + variant + '">' + ICONS[variant] + '<div>' + inline(block.text) + '</div></div>';
    }

    function renderTable(block) {
        var head = '<tr>' + block.headers.map(function(h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr>';
        var rows = block.rows.map(function(r) {
            return '<tr>' + r.map(function(c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        }).join('');
        return '<table class="apitable"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>';
    }

    function renderModuleMap(block) {
        return '<div class="modulemap">' + block.items.map(function(it) {
            return '<div class="modulemap__card"><b>' + escapeHtml(it.name) + '</b><span>' + inline(it.desc) + '</span></div>';
        }).join('') + '</div>';
    }

    function renderBlocks(blocks) {
        return blocks.map(function(b) {
            switch (b.type) {
                case 'p': return '<p>' + inline(b.text) + '</p>';
                case 'h2': return '<h2 id="' + slugify(b.text) + '">' + inline(b.text) + '</h2>';
                case 'h3': return '<h3 id="' + slugify(b.text) + '">' + inline(b.text) + '</h3>';
                case 'code': return renderCodeBlock(b);
                case 'note': return renderNote(b);
                case 'table': return renderTable(b);
                case 'list':
                    var tag = b.ordered ? 'ol' : 'ul';
                    return '<' + tag + '>' + b.items.map(function(i) { return '<li>' + inline(i) + '</li>'; }).join('') + '</' + tag + '>';
                case 'modulemap': return renderModuleMap(b);
                default: return '';
            }
        }).join('');
    }

    function renderBreadcrumbs(lang, groupId, pageTitle) {
        var c = CONTENT[lang];
        var groupLabel = c.nav.groups[groupId];
        return '<div class="breadcrumbs">' +
            '<a href="#/">' + t(lang, 'home') + '</a><span class="sep">/</span>' +
            '<span>' + escapeHtml(groupLabel) + '</span><span class="sep">/</span>' +
            '<span>' + escapeHtml(pageTitle) + '</span></div>';
    }

    function renderPager(lang, currentSlug) {
        var flat = flatPages();
        var idx = -1;
        for (var i = 0; i < flat.length; i++) { if (flat[i].slug === currentSlug) { idx = i; break; } }
        if (idx === -1) return '';
        var prev = flat[idx - 1];
        var next = flat[idx + 1];
        var c = CONTENT[lang];
        var html = '<div class="pagernav">';
        if (prev) {
            html += '<a class="prev" href="#/' + prev.group + '/' + prev.slug + '"><span class="dir">' + t(lang, 'prev') + '</span><span class="title">' + escapeHtml(c.nav.pages[prev.slug]) + '</span></a>';
        } else { html += '<span></span>'; }
        if (next) {
            html += '<a class="next" href="#/' + next.group + '/' + next.slug + '"><span class="dir">' + t(lang, 'next') + '</span><span class="title">' + escapeHtml(c.nav.pages[next.slug]) + '</span></a>';
        }
        html += '</div>';
        return html;
    }

    function renderPage(lang, groupId, slug) {
        var c = CONTENT[lang];
        var page = c.pages[slug];
        var validPair = flatPages().some(function(f) { return f.group === groupId && f.slug === slug; });
        if (!page || !validPair) return renderNotFound(lang);
        state.codeRegistry = [];
        var kind = page.module ? '<span class="filehead__kind ' + badgeClass(page.module) + '">' + escapeHtml(page.module) + '</span>' : '';
        var html = '<div class="content__inner">';
        html += renderBreadcrumbs(lang, groupId, c.nav.pages[slug]);
        html += '<div class="filehead"><span class="filehead__dot"></span><span class="filehead__name">' + escapeHtml(page.filename || (slug + '.java')) + '</span>' + kind + '</div>';
        html += '<div class="pagebox">';
        html += '<div class="eyebrow">' + escapeHtml(c.nav.groups[groupId]) + '</div>';
        html += '<h1 class="page-title">' + escapeHtml(page.title) + '</h1>';
        if (page.dek) html += '<p class="page-dek">' + inline(page.dek) + '</p>';
        html += '<div class="prose">' + renderBlocks(page.blocks) + '</div>';
        html += '</div>';
        html += renderPager(lang, slug);
        html += '</div>';
        document.title = page.title + ' · Ghost IDE Plugin Docs';
        return html;
    }

    function renderNotFound(lang) {
        document.title = t(lang, 'notFoundTitle') + ' · Ghost IDE Plugin Docs';
        return '<div class="content__inner"><div class="pagebox" style="margin-top:60px;text-align:center;">' +
            '<h1 class="page-title">404</h1><p class="page-dek">' + t(lang, 'notFoundBody') + '</p>' +
            '<a class="btn btn-primary" href="#/" style="margin-top:10px;">' + t(lang, 'backHome') + '</a></div></div>';
    }

    function renderHome(lang) {
        var h = CONTENT[lang].home;
        state.codeRegistry = [];
        document.title = h.title.replace(/\*\*/g, '') + ' · Ghost IDE Plugin Docs';
        var mockLines = h.mock.lines.map(function(l) { return escapeHtml(l); });
        var mockHtml = mockLines.join('\n');
        var gutter = mockLines.map(function(_, i) { return '<div>' + (i + 1) + '</div>'; }).join('');
        var cards = h.cards.map(function(card) {
            return '<a class="homecard" href="#/' + card.group + '/' + card.slug + '">' +
                '<div class="homecard__icon">' + ICONS[card.icon] + '</div>' +
                '<h3>' + escapeHtml(card.title) + '</h3><p>' + escapeHtml(card.desc) + '</p></a>';
        }).join('');
        var html = '<div class="content__inner">';
        html += '<section class="hero">';
        html += '<div><div class="hero__eyebrow">' + escapeHtml(h.eyebrow) + '</div>';
        html += '<h1>' + inline(h.title).replace(/<strong>/g, '<em>').replace(/<\/strong>/g, '</em>') + '</h1>';
        html += '<p class="lead">' + escapeHtml(h.lead) + '</p>';
        html += '<div class="hero__cta"><a class="btn btn-primary" href="#/' + h.ctaPrimary.group + '/' + h.ctaPrimary.slug + '">' + escapeHtml(h.ctaPrimary.label) + '</a>';
        html += '<a class="btn btn-ghost" href="' + SITE.githubUrl + '" target="_blank" rel="noopener">' + escapeHtml(h.ctaSecondary) + ' ' + ICONS.external + '</a></div>';
        html += '<div class="hero__stats">' + h.stats.map(function(s) { return '<div><b>' + escapeHtml(s.value) + '</b><span>' + escapeHtml(s.label) + '</span></div>'; }).join('') + '</div>';
        html += '</div>';
        html += '<div class="mockwin"><div class="mockwin__tabs"><div class="mockwin__tab is-active"><span class="dot"></span>' + escapeHtml(h.mock.filename) + '</div></div>';
        html += '<div class="mockwin__body"><div class="mockwin__gutter">' + gutter + '</div><div class="mockwin__code">' + mockHtml + '<span class="mockwin__cursor"></span></div></div></div>';
        html += '</section>';
        html += '<div class="homegrid">' + cards + '</div>';
        html += '</div>';
        return html;
    }

    function renderSidebar(lang, activeGroup, activeSlug) {
        var c = CONTENT[lang];
        var html = '';
        NAV_STRUCTURE.forEach(function(g) {
            var isOpen = state.openGroups.hasOwnProperty(g.id) ? state.openGroups[g.id] : (g.id === activeGroup);
            if (g.id === activeGroup) isOpen = true;
            html += '<div class="navgroup' + (isOpen ? ' is-open' : '') + '" data-group="' + g.id + '">';
            html += '<button type="button" class="navgroup__head"><span class="navgroup__icon">' + ICONS[g.icon] + '</span>' + escapeHtml(c.nav.groups[g.id]) + '<span class="navgroup__chev">' + ICONS.chevron + '</span></button>';
            html += '<ul class="navgroup__list">';
            g.slugs.forEach(function(slug) {
                var active = (g.id === activeGroup && slug === activeSlug);
                html += '<li><a class="navlink' + (active ? ' is-active' : '') + '" href="#/' + g.id + '/' + slug + '"><span class="dot"></span>' + escapeHtml(c.nav.pages[slug]) + '</a></li>';
            });
            html += '</ul></div>';
        });
        return html;
    }

    function attachCopyHandlers(root) {
        root.querySelectorAll('.codeblock__copy').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var idx = parseInt(btn.getAttribute('data-idx'), 10);
                var text = state.codeRegistry[idx] || '';
                var done = function() {
                    btn.innerHTML = ICONS.check;
                    setTimeout(function() { btn.innerHTML = ICONS.copy; }, 1300);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done, done);
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
                    document.body.appendChild(ta); ta.select();
                    try { document.execCommand('copy'); } catch (e) { }
                    document.body.removeChild(ta);
                    done();
                }
            });
        });
    }

    function setupReveal(root) {
        var targets = root.querySelectorAll('.prose > *');
        if (!targets.length) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        targets.forEach(function(el, i) {
            el.classList.add('reveal');
            el.style.transitionDelay = (Math.min(i, 6) * 50) + 'ms';
        });
        if (!('IntersectionObserver' in window)) {
            targets.forEach(function(el) { el.classList.add('is-visible'); });
            return;
        }
        var io = new IntersectionObserver(function(entries) {
            entries.forEach(function(en) {
                if (en.isIntersecting) {
                    en.target.classList.add('is-visible');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
        targets.forEach(function(el) { io.observe(el); });
    }

    function buildSearchIndex(lang) {
        var c = CONTENT[lang];
        var idx = [];
        NAV_STRUCTURE.forEach(function(g) {
            g.slugs.forEach(function(slug) {
                var page = c.pages[slug];
                if (!page) return;
                idx.push({ group: g.id, slug: slug, groupLabel: c.nav.groups[g.id], title: c.nav.pages[slug], dek: page.dek || '' });
            });
        });
        return idx;
    }

    function renderShell() {
        var lang = state.lang;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
        document.body.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');

        document.getElementById('searchInput').setAttribute('placeholder', t(lang, 'searchPlaceholder'));
        document.getElementById('langFa').classList.toggle('is-active', lang === 'fa');
        document.getElementById('langEn').classList.toggle('is-active', lang === 'en');
        document.getElementById('sidebarVersion').textContent = SITE.version;

        var route = parseHash();
        var group = route.group, slug = route.slug;
        document.getElementById('sidebarNav').innerHTML = renderSidebar(lang, group, slug);

        var main = document.getElementById('mainContent');
        if (route.route === 'home') main.innerHTML = renderHome(lang);
        else if (route.route === 'page') main.innerHTML = renderPage(lang, group, slug);
        else main.innerHTML = renderNotFound(lang);

        attachCopyHandlers(main);
        setupReveal(main);
        window.scrollTo(0, 0);
        closeSidebar();
        closeSearch();
    }

    function openSidebar() { document.getElementById('sidebar').classList.add('is-open'); document.getElementById('overlay').classList.add('is-open'); }
    function closeSidebar() { document.getElementById('sidebar').classList.remove('is-open'); document.getElementById('overlay').classList.remove('is-open'); }

    function closeSearch() {
        var box = document.getElementById('searchResults');
        box.classList.remove('is-open');
        box.innerHTML = '';
    }

    function runSearch(query) {
        var box = document.getElementById('searchResults');
        if (!query || !query.trim()) { closeSearch(); return; }
        var q = query.trim().toLowerCase();
        var idx = buildSearchIndex(state.lang);
        var results = idx.filter(function(it) {
            return it.title.toLowerCase().indexOf(q) !== -1 ||
                it.dek.toLowerCase().indexOf(q) !== -1 ||
                it.groupLabel.toLowerCase().indexOf(q) !== -1;
        }).slice(0, 8);
        if (!results.length) {
            box.innerHTML = '<div class="sr-empty">' + t(state.lang, 'noResults') + '</div>';
        } else {
            box.innerHTML = results.map(function(r) {
                return '<a href="#/' + r.group + '/' + r.slug + '"><div class="sr-group">' + escapeHtml(r.groupLabel) + '</div><div class="sr-title">' + escapeHtml(r.title) + '</div></a>';
            }).join('');
        }
        box.classList.add('is-open');
    }

    function setLang(lang) {
        if (state.lang === lang) return;
        state.lang = lang;
        safeSet('ghostide-docs-lang', lang);
        renderShell();
    }

    function init() {
        var savedLang = safeGet('ghostide-docs-lang');
        if (savedLang === 'fa' || savedLang === 'en') state.lang = savedLang;

        document.getElementById('githubLink').href = SITE.githubUrl;

        document.getElementById('topbarMenu').addEventListener('click', function() {
            var sb = document.getElementById('sidebar');
            if (sb.classList.contains('is-open')) closeSidebar(); else openSidebar();
        });
        document.getElementById('overlay').addEventListener('click', closeSidebar);
        document.getElementById('langFa').addEventListener('click', function() { setLang('fa'); });
        document.getElementById('langEn').addEventListener('click', function() { setLang('en'); });

        document.getElementById('sidebarNav').addEventListener('click', function(e) {
            var head = e.target.closest('.navgroup__head');
            if (!head) return;
            var group = head.parentElement;
            var id = group.getAttribute('data-group');
            var isOpen = group.classList.toggle('is-open');
            state.openGroups[id] = isOpen;
        });

        var searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() { runSearch(searchInput.value); });
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') { searchInput.blur(); closeSearch(); }
            if (e.key === 'Enter') {
                var first = document.querySelector('#searchResults a');
                if (first) { location.hash = first.getAttribute('href'); closeSearch(); searchInput.blur(); }
            }
        });
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.topbar__search')) closeSearch();
        });

        document.getElementById('mainContent').addEventListener('click', function(e) {
            var a = e.target.closest('a[href^="#/"]');
            if (a) closeSidebar();
        });

        window.addEventListener('hashchange', renderShell);
        renderShell();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
