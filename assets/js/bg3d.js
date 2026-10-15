/* Decorative three.js backdrop: a drifting particle field with faint
   constellation lines and slow wireframe shells. Purely visual — it never
   blocks input and silently does nothing when WebGL or three.js is missing. */
(function () {
    'use strict';

    var canvas = document.getElementById('bg3d');
    if (!canvas || !window.THREE) return;

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var ACCENT = 0x8fa3ff;
    var MINT = 0x7fe7c4;
    var BG = 0x0b0e14;
    var COUNT = 130;
    var MAX_LINKS = 200;
    var LINK_DISTANCE_SQ = 9;

    var renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas: canvas, alpha: true, antialias: true, powerPreference: 'low-power'
        });
    } catch (e) {
        return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.05);

    var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 14);

    var field = new THREE.Group();
    scene.add(field);

    var positions = new Float32Array(COUNT * 3);
    var velocities = new Float32Array(COUNT * 2);
    for (var i = 0; i < COUNT; i++) {
        var p = i * 3;
        positions[p] = (Math.random() - 0.5) * 30;
        positions[p + 1] = (Math.random() - 0.5) * 18;
        positions[p + 2] = (Math.random() - 0.5) * 20 - 4;
        velocities[i * 2] = (Math.random() - 0.5) * 0.006;
        velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.006;
    }

    var pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var pointsMat = new THREE.PointsMaterial({
        color: ACCENT, size: 0.11, sizeAttenuation: true, transparent: true,
        opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, fog: true
    });
    field.add(new THREE.Points(pointsGeo, pointsMat));

    var linkPositions = new Float32Array(MAX_LINKS * 6);
    var linksGeo = new THREE.BufferGeometry();
    linksGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    var linksMat = new THREE.LineBasicMaterial({
        color: ACCENT, transparent: true, opacity: 0.16, depthWrite: false,
        blending: THREE.AdditiveBlending, fog: true
    });
    field.add(new THREE.LineSegments(linksGeo, linksMat));

    var shellAMat = new THREE.LineBasicMaterial({
        color: ACCENT, transparent: true, opacity: 0.34, depthWrite: false,
        blending: THREE.AdditiveBlending, fog: false
    });
    var shellA = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.2, 1)), shellAMat);
    shellA.position.set(-6.5, 3.4, -3);
    field.add(shellA);

    var shellBMat = new THREE.LineBasicMaterial({
        color: MINT, transparent: true, opacity: 0.26, depthWrite: false,
        blending: THREE.AdditiveBlending, fog: false
    });
    var shellB = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.OctahedronGeometry(2.4, 0)), shellBMat);
    shellB.position.set(7.5, -3.2, -2);
    field.add(shellB);

    /* follow the active site theme */
    function toHex(value, fallback) {
        if (typeof value !== 'string') return fallback;
        var hex = value.trim().replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return fallback;
        var num = parseInt(hex, 16);
        return isNaN(num) ? fallback : num;
    }

    function luminance(hex) {
        var r = (hex >> 16) & 255, g = (hex >> 8) & 255, b = hex & 255;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }

    function setPalette(palette) {
        if (!palette) return;
        var accent = toHex(palette.accent, ACCENT);
        var mint = toHex(palette.mint, MINT);
        var bg = toHex(palette.bg, BG);
        /* additive light on a light page is invisible, so switch to normal
           blending and stronger lines for light themes */
        var light = luminance(bg) > 0.6;
        var blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;

        pointsMat.color.setHex(accent);
        linksMat.color.setHex(accent);
        shellAMat.color.setHex(accent);
        shellBMat.color.setHex(mint);
        scene.fog.color.setHex(bg);

        pointsMat.opacity = light ? 0.7 : 0.9;
        linksMat.opacity = light ? 0.25 : 0.16;
        shellAMat.opacity = light ? 0.5 : 0.34;
        shellBMat.opacity = light ? 0.38 : 0.26;

        [pointsMat, linksMat, shellAMat, shellBMat].forEach(function (mat) {
            mat.blending = blending;
            mat.needsUpdate = true;
        });
    }

    window.GhostBackdrop = { setPalette: setPalette };
    setPalette(window.GhostPalette);
    window.addEventListener('ghost-theme', function (e) { setPalette(e.detail); });

    var pointer = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };
    var clock = new THREE.Clock();

    /* keep the two shells inside the frustum on every aspect ratio — on a
       narrow phone the fixed x offsets would otherwise sit off-screen */
    function frameShells() {
        var halfAngle = Math.tan(camera.fov * Math.PI / 360);
        var limitA = halfAngle * (camera.position.z - shellA.position.z) * camera.aspect * 0.6;
        var limitB = halfAngle * (camera.position.z - shellB.position.z) * camera.aspect * 0.6;
        shellA.position.x = -Math.min(6.5, Math.abs(limitA));
        shellB.position.x = Math.min(7.5, Math.abs(limitB));
    }

    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        frameShells();
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('pointermove', function (e) {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function rebuildLinks() {
        var n = 0;
        for (var a = 0; a < COUNT && n < MAX_LINKS; a++) {
            var ia = a * 3;
            for (var b = a + 1; b < COUNT && n < MAX_LINKS; b++) {
                var ib = b * 3;
                var dx = positions[ia] - positions[ib];
                var dy = positions[ia + 1] - positions[ib + 1];
                var dz = positions[ia + 2] - positions[ib + 2];
                if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE_SQ) {
                    var o = n * 6;
                    linkPositions[o] = positions[ia];
                    linkPositions[o + 1] = positions[ia + 1];
                    linkPositions[o + 2] = positions[ia + 2];
                    linkPositions[o + 3] = positions[ib];
                    linkPositions[o + 4] = positions[ib + 1];
                    linkPositions[o + 5] = positions[ib + 2];
                    n++;
                }
            }
        }
        linksGeo.setDrawRange(0, n * 2);
        linksGeo.attributes.position.needsUpdate = true;
    }

    function render(dt) {
        for (var i = 0; i < COUNT; i++) {
            var p = i * 3;
            positions[p] += velocities[i * 2];
            positions[p + 1] += velocities[i * 2 + 1];
            if (positions[p] > 15 || positions[p] < -15) velocities[i * 2] *= -1;
            if (positions[p + 1] > 9 || positions[p + 1] < -9) velocities[i * 2 + 1] *= -1;
        }
        pointsGeo.attributes.position.needsUpdate = true;
        rebuildLinks();

        shellA.rotation.x += dt * 0.08;
        shellA.rotation.y += dt * 0.12;
        shellB.rotation.y -= dt * 0.10;
        shellB.rotation.z += dt * 0.07;

        pointer.x += (target.x - pointer.x) * 0.04;
        pointer.y += (target.y - pointer.y) * 0.04;
        field.rotation.y = pointer.x * 0.12 + Math.sin(clock.elapsedTime * 0.05) * 0.03;
        field.rotation.x = pointer.y * 0.10;
        camera.position.x = pointer.x * 0.8;
        camera.position.y = -pointer.y * 0.6;
        camera.lookAt(0, 0, -2);

        renderer.render(scene, camera);
    }

    if (reduceMotion) {
        rebuildLinks();
        renderer.render(scene, camera);
        return;
    }

    (function loop() {
        requestAnimationFrame(loop);
        render(Math.min(clock.getDelta(), 0.05));
    })();
})();
