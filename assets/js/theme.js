/* Theme picker. Five palettes live as [data-theme="..."] blocks in
   styles.css; picking one sets data-theme on <html>, persists it, and reveals
   the change with a circular view transition that grows out of the chosen
   card (a plain colour fade when the View Transitions API or motion is
   unavailable). The active colours are published as window.GhostPalette plus
   a 'ghost-theme' event so the three.js backdrop and callout emblems can
   follow the theme too. */
(function () {
    'use strict';

    var KEY = 'ghostide-docs-theme';
    var root = document.documentElement;

    var THEMES = [
        { id: 'ghost', fa: 'گوست', en: 'Ghost', noteFa: 'پیش‌فرض', noteEn: 'Default' },
        { id: 'tokyo-night', fa: 'شب‌های توکیو', en: 'Tokyo Night', noteFa: 'شب نئونی', noteEn: 'Neon night' },
        { id: 'vscode-dark', fa: 'وی‌اس‌کد تاریک', en: 'VS Code Dark+', noteFa: 'خنثی و کلاسیک', noteEn: 'Neutral & classic' },
        { id: 'dracula', fa: 'دراکولا', en: 'Dracula', noteFa: 'بنفش پرانرژی', noteEn: 'Vivid purple' },
        { id: 'nord', fa: 'نورد', en: 'Nord', noteFa: 'سرد و آرام', noteEn: 'Cool & calm' },
        { id: 'gold', fa: 'مشکی طلایی', en: 'Black & Gold', noteFa: 'لوکس', noteEn: 'Luxury' },
        { id: 'catppuccin', fa: 'کتفوچین موکا', en: 'Catppuccin Mocha', noteFa: 'پستلی مدرن', noteEn: 'Modern pastel' },
        { id: 'gruvbox', fa: 'گرووباکس', en: 'Gruvbox Dark', noteFa: 'گرم و رترو', noteEn: 'Warm retro' },
        { id: 'monokai', fa: 'مونوکای', en: 'Monokai', noteFa: 'کلاسیک پرانرژی', noteEn: 'Classic vivid' },
        { id: 'rose-pine', fa: 'رز پاین', en: 'Rosé Pine', noteFa: 'ملایم و شیک', noteEn: 'Muted & elegant' },
        { id: 'ghost-light', fa: 'گوست روشن', en: 'Ghost Light', noteFa: 'حالت روشن', noteEn: 'Light mode' }
    ];
    var IDS = THEMES.map(function (t) { return t.id; });
    var TICK = '<span class="themecard__tick"><svg viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="3" stroke-linecap="round" ' +
        'stroke-linejoin="round"><polyline points="4 12.5 9.5 18 20 6"/></svg></span>';

    var dialog, grid, dekEl, titleEl;

    function lang() {
        return (root.getAttribute('lang') || 'fa').slice(0, 2) === 'en' ? 'en' : 'fa';
    }

    function validId(id) {
        return IDS.indexOf(id) >= 0 ? id : 'ghost';
    }

    function currentId() {
        return validId(root.getAttribute('data-theme'));
    }

    function readPalette() {
        var cs = getComputedStyle(root);
        return {
            accent: cs.getPropertyValue('--accent').trim(),
            mint: cs.getPropertyValue('--mint').trim(),
            bg: cs.getPropertyValue('--bg').trim()
        };
    }

    function publish() {
        window.GhostPalette = readPalette();
        window.dispatchEvent(new CustomEvent('ghost-theme', { detail: window.GhostPalette }));
    }

    function withFade(update) {
        root.classList.add('theme-transition');
        update();
        window.setTimeout(function () { root.classList.remove('theme-transition'); }, 360);
    }

    function commit(id) {
        root.setAttribute('data-theme', id);
        try { localStorage.setItem(KEY, id); } catch (e) { /* storage unavailable */ }
        syncActive();
        publish();
    }

    function apply(id, x, y) {
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || reduce || x == null) {
            withFade(function () { commit(id); });
            return;
        }
        var transition = document.startViewTransition(function () { commit(id); });
        transition.ready.then(function () {
            var reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
            root.animate({
                clipPath: [
                    'circle(0px at ' + x + 'px ' + y + 'px)',
                    'circle(' + reach + 'px at ' + x + 'px ' + y + 'px)'
                ]
            }, {
                duration: 520,
                easing: 'ease-in-out',
                pseudoElement: '::view-transition-new(root)'
            });
        });
    }

    function card(theme, index) {
        var L = lang();
        var el = document.createElement('button');
        el.type = 'button';
        el.className = 'themecard';
        el.setAttribute('data-theme', theme.id);
        el.setAttribute('aria-pressed', 'false');
        el.style.setProperty('--i', index);
        el.title = L === 'en' ? theme.noteEn : theme.noteFa;
        el.innerHTML =
            '<span class="themecard__preview">' +
                '<span class="themecard__bar"></span>' +
                '<span class="themecard__swatches">' +
                    '<span class="themecard__swatch themecard__swatch--a"></span>' +
                    '<span class="themecard__swatch themecard__swatch--m"></span>' +
                    '<span class="themecard__swatch themecard__swatch--r"></span>' +
                    '<span class="themecard__swatch themecard__swatch--t"></span>' +
                '</span>' +
                '<span class="themecard__line themecard__line--w"></span>' +
                '<span class="themecard__line themecard__line--s"></span>' +
            '</span>' +
            '<span class="themecard__meta">' +
                '<span class="themecard__name">' + (L === 'en' ? theme.en : theme.fa) + '</span>' +
                TICK +
            '</span>';
        el.addEventListener('click', function () {
            var r = el.getBoundingClientRect();
            apply(theme.id, r.left + r.width / 2, r.top + r.height / 2);
        });
        return el;
    }

    function syncActive() {
        if (!grid) return;
        var active = currentId();
        grid.querySelectorAll('.themecard').forEach(function (el) {
            var on = el.getAttribute('data-theme') === active;
            el.classList.toggle('is-active', on);
            el.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }

    function render() {
        var L = lang();
        titleEl.textContent = L === 'en' ? 'Choose a theme' : 'انتخاب تم';
        dekEl.textContent = L === 'en'
            ? 'Eleven palettes for the whole site — code highlighting, the animated backdrop and the callouts all follow along.'
            : 'یازده پوسته برای کل سایت — رنگ کد، پس‌زمینه‌ی متحرک و باکس‌ها همه هماهنگ می‌شوند.';
        grid.innerHTML = '';
        THEMES.forEach(function (theme, i) { grid.appendChild(card(theme, i)); });
        syncActive();
    }

    function open() {
        render();
        if (typeof dialog.showModal === 'function') {
            if (!dialog.open) dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
    }

    function close() {
        if (!dialog.open && !dialog.hasAttribute('open')) return;
        dialog.classList.add('is-closing');
        window.setTimeout(function () {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');
            dialog.classList.remove('is-closing');
        }, 170);
    }

    function init() {
        var trigger = document.getElementById('themeBtn');
        dialog = document.getElementById('themeDialog');
        if (!trigger || !dialog) return;
        grid = document.getElementById('themeGrid');
        dekEl = document.getElementById('themeDek');
        titleEl = document.getElementById('themeDialogTitle');

        if (root.getAttribute('data-theme') !== currentId()) {
            root.setAttribute('data-theme', currentId());
        }

        trigger.addEventListener('click', open);
        document.getElementById('themeClose').addEventListener('click', close);
        dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
        dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

        publish();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
