/* Replaces each callout's flat status glyph with a live three.js emblem: a
   slowly tumbling wireframe solid whose shape and colour follow the variant
   (info = icosahedron/accent, tip = octahedron/mint, warn = tetrahedron/rose).
   Emblems are created only while their callout is on screen and destroyed when
   it scrolls away, so at most a handful of WebGL contexts exist at once. If
   WebGL or three.js is unavailable — or motion is reduced — the original SVG
   icon is left in place untouched. */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !window.THREE) return;

    var COLORS = { info: 0x8fa3ff, tip: 0x7fe7c4, warn: 0xf4879a };
    var live = [];

    function toHex(value, fallback) {
        if (typeof value !== 'string') return fallback;
        var hex = value.trim().replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return fallback;
        var num = parseInt(hex, 16);
        return isNaN(num) ? fallback : num;
    }

    /* info follows the accent, tip the mint, warn the rose of the active theme */
    function paletteColor(variant) {
        var p = window.GhostPalette || {};
        var key = variant === 'tip' ? p.mint : (variant === 'warn' ? p.rose : p.accent);
        return toHex(key, COLORS[variant] || COLORS.info);
    }

    function themeLuminance() {
        var bg = toHex((window.GhostPalette || {}).bg, 0x0b0e14);
        var r = (bg >> 16) & 255, g = (bg >> 8) & 255, b = bg & 255;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }

    /* additive light vanishes on a light background — use normal blending there */
    function themeBlending() {
        return themeLuminance() > 0.6 ? THREE.NormalBlending : THREE.AdditiveBlending;
    }

    function makeSolid(variant) {
        var geo;
        switch (variant) {
            case 'tip': geo = new THREE.OctahedronGeometry(1.0, 0); break;
            case 'warn': geo = new THREE.TetrahedronGeometry(1.1, 0); break;
            default: geo = new THREE.IcosahedronGeometry(1.05, 0);
        }
        var color = paletteColor(variant);
        var light = themeLuminance() > 0.6;
        var blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        var group = new THREE.Group();

        var coreEdges = new THREE.EdgesGeometry(geo);
        geo.dispose();
        var core = new THREE.LineSegments(coreEdges, new THREE.LineBasicMaterial({
            color: color, transparent: true, opacity: 0.95,
            blending: blending, depthWrite: false
        }));
        group.add(core);

        var haloGeo = new THREE.IcosahedronGeometry(1.5, 0);
        var halo = new THREE.LineSegments(new THREE.EdgesGeometry(haloGeo), new THREE.LineBasicMaterial({
            color: color, transparent: true, opacity: light ? 0.32 : 0.20,
            blending: blending, depthWrite: false
        }));
        haloGeo.dispose();
        group.add(halo);

        group.userData.core = core;
        group.userData.halo = halo;
        return group;
    }

    function measure(host) {
        var rect = host.getBoundingClientRect();
        return Math.max(Math.round(Math.min(rect.width, rect.height)) || 20, 12);
    }

    function start(host) {
        if (host.__emblem) return;
        /* hard cap on simultaneous contexts so the backdrop's context is never
           evicted on a page full of callouts — the rest keep their SVG icon */
        if (live.length >= 6) return;

        var size = measure(host);
        var renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                alpha: true, antialias: true, powerPreference: 'low-power'
            });
        } catch (e) {
            return;
        }
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(size, size, false);

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(40, 1, 0.1, 10);
        camera.position.z = 4.6;

        var mesh = makeSolid(host.getAttribute('data-variant'));
        scene.add(mesh);

        host.appendChild(renderer.domElement);
        host.classList.add('has-3d');

        var emblem = {
            host: host, renderer: renderer, scene: scene, camera: camera,
            mesh: mesh, size: size, startedAt: performance.now() / 1000
        };
        host.__emblem = emblem;
        live.push(emblem);
    }

    function stop(host) {
        var emblem = host.__emblem;
        if (!emblem) return;
        var canvas = emblem.renderer.domElement;
        if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
        emblem.renderer.dispose();
        if (emblem.renderer.forceContextLoss) emblem.renderer.forceContextLoss();
        host.classList.remove('has-3d');
        host.__emblem = null;
        var i = live.indexOf(emblem);
        if (i >= 0) live.splice(i, 1);
    }

    var observer = 'IntersectionObserver' in window
        ? new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) start(entry.target);
                else stop(entry.target);
            });
        }, { rootMargin: '180px' })
        : null;

    function scan(root) {
        (root || document).querySelectorAll('.note__emblem').forEach(function (host) {
            if (observer) observer.observe(host);
            else start(host);
        });
    }

    function tick() {
        requestAnimationFrame(tick);
        var now = performance.now() / 1000;
        for (var i = live.length - 1; i >= 0; i--) {
            var emblem = live[i];
            if (!emblem.host.isConnected) {
                stop(emblem.host);
                continue;
            }
            var size = measure(emblem.host);
            if (size !== emblem.size) {
                emblem.size = size;
                emblem.renderer.setSize(size, size, false);
            }
            var t = now - emblem.startedAt;
            var core = emblem.mesh.userData.core;
            var halo = emblem.mesh.userData.halo;
            core.rotation.x = t * 0.55;
            core.rotation.y = t * 0.85;
            halo.rotation.x = -t * 0.34;
            halo.rotation.y = -t * 0.5;
            emblem.mesh.position.y = Math.sin(t * 1.7) * 0.08;
            emblem.renderer.render(emblem.scene, emblem.camera);
        }
    }

    /* recolor + reblend every live emblem when the site theme changes */
    window.addEventListener('ghost-theme', function () {
        var light = themeLuminance() > 0.6;
        var blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        live.forEach(function (emblem) {
            var color = paletteColor(emblem.host.getAttribute('data-variant'));
            var core = emblem.mesh.userData.core.material;
            var halo = emblem.mesh.userData.halo.material;
            core.color.setHex(color);
            core.blending = blending;
            core.needsUpdate = true;
            halo.color.setHex(color);
            halo.blending = blending;
            halo.opacity = light ? 0.32 : 0.20;
            halo.needsUpdate = true;
        });
    });

    var content = document.getElementById('mainContent') || document.body;
    /* the router swaps innerHTML on every navigation, so re-scan for emblems */
    new MutationObserver(function () { scan(content); })
        .observe(content, { childList: true, subtree: true });

    scan(content);
    tick();
})();
