'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

function evalVar(file, varName) {
    const ctx = {};
    vm.createContext(ctx);
    vm.runInContext(read(file), ctx, { filename: file });
    return ctx[varName];
}

const NAV = evalVar('assets/js/nav.js', 'NAV_STRUCTURE');
const CONTENT = {
    fa: evalVar('assets/js/content.fa.js', 'CONTENT_FA'),
    en: evalVar('assets/js/content.en.js', 'CONTENT_EN')
};

const META = {
    title: 'Ghost IDE Plugin Docs',
    summaryFa: 'سایت مستندات پلاگین‌نویسی Ghost IDE — API سه‌بخشی (plugin-api، ide-api، ide-ui-api)، سیستم اکستنشن/سرویس، یکپارچه‌سازی LSP، رابط کاربری و بسته‌بندی .gpl.',
    summaryEn: "Developer documentation for building Ghost IDE plugins — the three-module API (plugin-api, ide-api, ide-ui-api), extension/service system, LSP integration, UI screens and the .gpl package format.",
    repo: 'https://github.com/HanzoDev1375/GhostIdes',
    sourceDir: 'https://github.com/HanzoDev1375/GhostIdes/tree/main/docs'
};

function inlineText(s) {
    return String(s || '')
        .replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');
}

function renderBlock(b) {
    switch (b.type) {
        case 'p':
            return inlineText(b.text) + '\n';
        case 'h2':
            return '\n## ' + inlineText(b.text) + '\n';
        case 'h3':
            return '\n### ' + inlineText(b.text) + '\n';
        case 'code': {
            const lang = b.lang || '';
            const head = b.filename
                ? '```' + lang + ' — ' + b.filename + '\n'
                : '```' + lang + '\n';
            return '\n' + head + String(b.code || '').replace(/\n$/, '') + '\n```\n';
        }
        case 'note': {
            const v = (b.variant || 'info').toUpperCase();
            return '\n> **[' + v + ']** ' + inlineText(b.text) + '\n';
        }
        case 'table': {
            const esc = (c) => String(c).replace(/\|/g, '\\|');
            const head = b.headers.map(esc).join(' | ');
            const sep = b.headers.map(() => '---').join(' | ');
            const rows = b.rows.map((r) => r.map(esc).join(' | '));
            return '\n| ' + head + ' |\n| ' + sep + ' |\n' +
                rows.map((r) => '| ' + r + ' |').join('\n') + '\n';
        }
        case 'list': {
            const items = b.items.map(inlineText);
            if (b.ordered) {
                return '\n' + items.map((it, i) => (i + 1) + '. ' + it).join('\n') + '\n';
            }
            return '\n' + items.map((it) => '- ' + it).join('\n') + '\n';
        }
        case 'modulemap':
            return '\n' + b.items.map((it) => '- **' + it.name + '** — ' + inlineText(it.desc)).join('\n') + '\n';
        default:
            return '';
    }
}

function renderPage(lang, slug) {
    const c = CONTENT[lang];
    const page = c.pages[slug];
    if (!page) return null;
    const group = NAV.find((g) => g.slugs.includes(slug));
    const groupLabel = group ? c.nav.groups[group.id] : '';
    const word = lang === 'fa'
        ? { group: 'گروه', file: 'فایل', module: 'ماژول', toc: 'فهرست مطالب' }
        : { group: 'Group', file: 'File', module: 'Module', toc: 'Table of contents' };

    const metaBits = [
        word.group + ': ' + groupLabel,
        word.file + ': ' + (page.filename || slug + '.java'),
        page.module ? (word.module + ': ' + page.module) : null
    ].filter(Boolean);

    const body = [
        '# ' + page.title,
        '> ' + metaBits.join(' · '),
        page.dek ? '\n' + inlineText(page.dek) + '\n' : '',
        page.blocks.map(renderBlock).join('\n')
    ].join('\n');

    return body.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function renderToc(lang) {
    const c = CONTENT[lang];
    let out = '';
    NAV.forEach((g) => {
        out += '\n## ' + c.nav.groups[g.id] + '\n';
        g.slugs.forEach((slug) => {
            out += '- ' + (c.nav.pages[slug] || slug) + ' — `' + slug + '`';
            const p = c.pages[slug];
            if (p && p.module) out += ' (' + p.module + ')';
            out += '\n';
        });
    });
    return out;
}

function renderFull(lang) {
    const c = CONTENT[lang];
    const isFa = lang === 'fa';
    const meta = [
        '# Ghost IDE Plugin Docs — ' + (isFa ? 'فارسی' : 'English'),
        '',
        isFa ? META.summaryFa : META.summaryEn,
        '',
        '- Repository: ' + META.repo,
        '- Version: plugin-api 0.1.0',
        '- Pages: ' + NAV.reduce((n, g) => n + g.slugs.length, 0),
        '- Generated from the real module source (no build step).',
        ''
    ].join('\n');

    const toc = '# ' + (isFa ? 'فهرست مطالب' : 'Table of contents') + '\n' + renderToc(lang);

    const pages = [];
    NAV.forEach((g) => {
        g.slugs.forEach((slug) => {
            const r = renderPage(lang, slug);
            if (r) pages.push(r);
        });
    });

    return meta + '\n' + toc + '\n\n' + pages.join('\n\n---\n\n') + '\n';
}

const faText = renderFull('fa');
const enText = renderFull('en');

fs.writeFileSync(path.join(ROOT, 'llms-full.fa.txt'), faText);
fs.writeFileSync(path.join(ROOT, 'llms-full.en.txt'), enText);

const idx = [
    '# Ghost IDE Plugin Docs',
    '',
    META.summaryFa,
    META.summaryEn,
    '',
    '> Ghost IDE is a Java/Android IDE. Plugins are plain Java classes implementing the `GhostPlugin` interface, packaged as `.gpl` files, loaded at runtime with DexClassLoader.',
    '',
    '## Full documentation',
    '',
    '- [Ghost IDE Plugin Docs — فارسی (همه‌ی صفحات، یک فایل)](llms-full.fa.txt)',
    '- [Ghost IDE Plugin Docs — English (all pages, single file)](llms-full.en.txt)',
    '- [README](README.md)',
    '',
    '## Source & deploy',
    '',
    '- Repository: ' + META.repo,
    '- GitHub Pages: this site (root of the repo)',
    '',
    '## How to fetch fast',
    '',
    '- One webfetch of `llms-full.fa.txt` or `llms-full.en.txt` returns the entire documentation — no JS rendering needed.',
    '- `llms.txt` (this file) is a short index LLMs can read first.',
    ''
].join('\n');

fs.writeFileSync(path.join(ROOT, 'llms.txt'), idx);

console.log('Generated:');
console.log('  llms.txt            (%d bytes)', fs.statSync(path.join(ROOT, 'llms.txt')).size);
console.log('  llms-full.fa.txt    (%d bytes)', fs.statSync(path.join(ROOT, 'llms-full.fa.txt')).size);
console.log('  llms-full.en.txt    (%d bytes)', fs.statSync(path.join(ROOT, 'llms-full.en.txt')).size);