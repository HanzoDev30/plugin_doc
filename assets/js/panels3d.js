/* 3D polish for raised surfaces on the site:
   - the home hero's mock editor window tilts toward the pointer (ambient), and
   - every docs code panel (.codeblock) and callout (.note) tilts while the
     pointer is over it.
   three.js supplies only the rotation math; the DOM and its syntax highlighting
   are never modified — a CSS transform and a sheen position variable are all
   that gets written. Silently does nothing without WebGL / three.js. */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !window.THREE) return;

    var PERSPECTIVE = 1100;
    var EASE = 0.11;
    var HERO_TILT = THREE.MathUtils.degToRad(8);
    var CODE_TILT = THREE.MathUtils.degToRad(6);

    /* ---------- home hero window: ambient, window-centred ---------- */
    var model = new THREE.Object3D();
    var pointer = new THREE.Vector2(0, 0);
    var heroNow = new THREE.Vector2(0, 0);
    var heroNode = null;

    function hero() {
        var next = document.querySelector('.mockwin');
        if (next !== heroNode) {
            heroNode = next;
            pointer.set(0, 0);
            heroNow.set(0, 0);
        }
        return heroNode;
    }

    /* ---------- docs code panels: tilt the panel under the pointer ---------- */
    var panels = [];
    var hovered = null;

    function state(el) {
        if (el.__tilt3d) return el.__tilt3d;
        var rec = { el: el, tx: 0, ty: 0, cx: 0, cy: 0 };
        el.__tilt3d = rec;
        el.style.transformOrigin = 'center center';
        panels.push(rec);
        return rec;
    }

    function rest(el) {
        if (!el || !el.isConnected) return;
        var rec = state(el);
        rec.tx = 0;
        rec.ty = 0;
    }

    window.addEventListener('pointermove', function (e) {
        if (hero()) {
            pointer.set(
                (e.clientX / window.innerWidth - 0.5) * 2,
                (e.clientY / window.innerHeight - 0.5) * 2
            );
        }

        var block = e.target && e.target.closest
            ? e.target.closest('.codeblock, .note')
            : null;
        if (block !== hovered) {
            rest(hovered);
            hovered = block;
        }
        if (block) {
            var rec = state(block);
            var r = block.getBoundingClientRect();
            rec.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
            rec.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
            block.style.willChange = 'transform';
        }
    }, { passive: true });

    document.addEventListener('pointerleave', function () {
        pointer.set(0, 0);
        rest(hovered);
        hovered = null;
    });

    function apply(el, rx, ry) {
        el.style.transform =
            'perspective(' + PERSPECTIVE + 'px) rotateX(' + rx.toFixed(4) + 'rad) ' +
            'rotateY(' + ry.toFixed(4) + 'rad)';
    }

    function frame() {
        requestAnimationFrame(frame);

        var win = hero();
        if (win) {
            heroNow.x += (pointer.x - heroNow.x) * EASE;
            heroNow.y += (pointer.y - heroNow.y) * EASE;
            model.rotation.y = heroNow.x * HERO_TILT;
            model.rotation.x = -heroNow.y * HERO_TILT;
            apply(win, model.rotation.x, model.rotation.y);
            win.style.setProperty('--mx', ((heroNow.x + 1) * 50).toFixed(1) + '%');
            win.style.setProperty('--my', ((heroNow.y + 1) * 50).toFixed(1) + '%');
        }

        for (var i = panels.length - 1; i >= 0; i--) {
            var rec = panels[i];
            if (!rec.el.isConnected) {
                panels.splice(i, 1);
                continue;
            }
            var moving = rec.tx !== 0 || rec.ty !== 0 ||
                Math.abs(rec.cx) > 0.0005 || Math.abs(rec.cy) > 0.0005;
            if (!moving) continue;
            rec.cx += (rec.tx - rec.cx) * EASE;
            rec.cy += (rec.ty - rec.cy) * EASE;
            apply(rec.el, -rec.cy * CODE_TILT, rec.cx * CODE_TILT);
            rec.el.style.setProperty('--mx', ((rec.cx + 1) * 50).toFixed(1) + '%');
            rec.el.style.setProperty('--my', ((rec.cy + 1) * 50).toFixed(1) + '%');
            if (rec.tx === 0 && rec.ty === 0 &&
                Math.abs(rec.cx) < 0.001 && Math.abs(rec.cy) < 0.001) {
                rec.cx = 0;
                rec.cy = 0;
                rec.el.style.transform = '';
                rec.el.style.willChange = '';
            }
        }
    }

    frame();
})();
