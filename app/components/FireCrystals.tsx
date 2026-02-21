"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FireCrystals() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        const mount = mountRef.current;

        // ── Renderer ──────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // ── Scene / Camera ─────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 200);
        camera.position.set(0, 0, 26);

        // ── Shader ─────────────────────────────────────────────
        function makeMat(c1: string, c2: string, c3: string) {
            return new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uColor1: { value: new THREE.Color(c1) },
                    uColor2: { value: new THREE.Color(c2) },
                    uColor3: { value: new THREE.Color(c3) },
                },
                vertexShader: /* glsl */`
          uniform float uTime;
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          varying float vPulse;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec3 p = position;
            float pulse = sin(uTime * 1.8 + p.y * 4.0 + p.x * 2.0) * 0.05;
            p += normal * pulse;
            vPulse = pulse;
            vWorldPos = (modelMatrix * vec4(p, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }
        `,
                fragmentShader: /* glsl */`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform vec3 cameraPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPos;
          varying float vPulse;
          void main() {
            vec3 viewDir = normalize(cameraPosition - vWorldPos);
            float fresnel = pow(1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0), 2.5);
            float t = mod((vWorldPos.y * 0.3) + uTime * 0.35, 1.0);
            vec3 col = mix(uColor1, uColor2, smoothstep(0.0, 0.5, t));
            col = mix(col, uColor3, smoothstep(0.5, 1.0, t));
            col += fresnel * uColor2 * 1.8;
            col += vPulse * 4.0 * uColor2;
            float alpha = mix(0.2, 0.9, fresnel);
            gl_FragColor = vec4(col, alpha);
          }
        `,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false,
            });
        }

        // ── Crystal geometry ───────────────────────────────────
        function makeGeo(scale: number, elongate: number) {
            const g = new THREE.OctahedronGeometry(scale, 0);
            const pos = g.attributes.position;
            for (let i = 0; i < pos.count; i++) pos.setY(i, pos.getY(i) * elongate);
            pos.needsUpdate = true;
            g.computeVertexNormals();
            return g;
        }

        // ── Place crystals ONLY on edges — avoid screen center ─
        type Crystal = { mesh: THREE.Mesh; mat: THREE.ShaderMaterial; spin: number; floatOffset: number; floatSpeed: number; };
        const crystals: Crystal[] = [];
        const N = 38;

        const palettes = [
            ["#ff4000", "#ffaa00", "#a855f7"],
            ["#ff6200", "#ffcc00", "#ff4500"],
            ["#c026d3", "#ff6200", "#ffcc00"],
        ];

        for (let i = 0; i < N; i++) {
            const scale = THREE.MathUtils.randFloat(0.7, 2.4);
            const elongate = THREE.MathUtils.randFloat(3.0, 7.0);
            const geo = makeGeo(scale, elongate);

            const pal = palettes[Math.floor(Math.random() * palettes.length)];
            const mat = makeMat(pal[0], pal[1], pal[2]);

            const mesh = new THREE.Mesh(geo, mat);

            // Position: push to left/right/top/bottom edges — keep center clear
            const side = Math.floor(Math.random() * 4); // 0=left,1=right,2=top,3=bottom
            let x = 0, y = 0;
            if (side === 0) {
                x = THREE.MathUtils.randFloat(-22, -10); // left edge
                y = THREE.MathUtils.randFloatSpread(16);
            } else if (side === 1) {
                x = THREE.MathUtils.randFloat(10, 22);   // right edge
                y = THREE.MathUtils.randFloatSpread(16);
            } else if (side === 2) {
                x = THREE.MathUtils.randFloatSpread(24);
                y = THREE.MathUtils.randFloat(10, 18);   // top edge
            } else {
                x = THREE.MathUtils.randFloatSpread(24);
                y = THREE.MathUtils.randFloat(-18, -10); // bottom edge
            }
            const z = THREE.MathUtils.randFloat(-14, -4); // pushed back in depth

            mesh.position.set(x, y, z);
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            scene.add(mesh);

            crystals.push({
                mesh, mat,
                spin: THREE.MathUtils.randFloat(-0.004, 0.004),
                floatOffset: Math.random() * Math.PI * 2,
                floatSpeed: THREE.MathUtils.randFloat(0.3, 0.9),
            });
        }

        // ── Point lights ───────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.2));
        const L1 = new THREE.PointLight(0xff5500, 3.5, 35);
        L1.position.set(-12, 5, 6); scene.add(L1);
        const L2 = new THREE.PointLight(0xffcc00, 2.5, 28);
        L2.position.set(12, -5, 5); scene.add(L2);
        const L3 = new THREE.PointLight(0xa855f7, 2, 30);
        L3.position.set(0, 10, -3); scene.add(L3);

        // ── Sparks ─────────────────────────────────────────────
        const SPARKS = 420;
        const sBuf = new Float32Array(SPARKS * 3);
        const sSpeeds = new Float32Array(SPARKS);
        for (let i = 0; i < SPARKS; i++) {
            sBuf[i * 3] = THREE.MathUtils.randFloatSpread(50);
            sBuf[i * 3 + 1] = THREE.MathUtils.randFloatSpread(30);
            sBuf[i * 3 + 2] = THREE.MathUtils.randFloat(-16, -3);
            sSpeeds[i] = THREE.MathUtils.randFloat(0.12, 1.0);
        }
        const sGeo = new THREE.BufferGeometry();
        sGeo.setAttribute('position', new THREE.BufferAttribute(sBuf, 3));
        const sMat = new THREE.PointsMaterial({
            color: 0xff9900, size: 0.32, transparent: true, opacity: 0.75,
            blending: THREE.AdditiveBlending, depthWrite: false,
        });
        scene.add(new THREE.Points(sGeo, sMat));

        // ── Animate ────────────────────────────────────────────
        let animId: number;
        const clock = new THREE.Clock();

        function animate() {
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            crystals.forEach(({ mesh, mat, spin, floatOffset, floatSpeed }) => {
                mesh.rotation.y += spin;
                mesh.rotation.x += spin * 0.5;
                mesh.position.y += Math.sin(t * floatSpeed + floatOffset) * 0.002;
                mat.uniforms.uTime.value = t;
            });

            // Sparks drift up
            const pa = sGeo.attributes.position as THREE.BufferAttribute;
            for (let i = 0; i < SPARKS; i++) {
                const ny = pa.getY(i) + sSpeeds[i] * 0.01;
                pa.setY(i, ny > 18 ? -18 : ny);
            }
            pa.needsUpdate = true;

            // Orbit lights
            L1.position.x = Math.sin(t * 0.4) * 14;
            L1.position.y = Math.cos(t * 0.3) * 7;
            L2.position.x = Math.cos(t * 0.5) * 14;
            L2.position.y = Math.sin(t * 0.28) * 7;
            L3.intensity = 2 + Math.sin(t * 1.4) * 0.8;

            renderer.render(scene, camera);
        }
        animate();

        // ── Resize ─────────────────────────────────────────────
        function onResize() {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        }
        window.addEventListener("resize", onResize);

        // ── Mouse parallax (subtle) ────────────────────────────
        let targetX = 0, targetY = 0;
        function onMouse(e: MouseEvent) {
            targetX = (e.clientX / window.innerWidth - 0.5) * 2.5;
            targetY = -(e.clientY / window.innerHeight - 0.5) * 1.5;
        }
        window.addEventListener("mousemove", onMouse);

        function lerpCamera() {
            camera.position.x += (targetX - camera.position.x) * 0.03;
            camera.position.y += (targetY - camera.position.y) * 0.03;
        }
        const lerpId = setInterval(lerpCamera, 16);

        return () => {
            cancelAnimationFrame(animId);
            clearInterval(lerpId);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouse);
            renderer.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed", inset: 0, zIndex: 0,
                pointerEvents: "none",
                /* dark vignette keeps center readable */
                background: "radial-gradient(ellipse at 50% 50%, rgba(5,5,8,0.35) 0%, rgba(5,5,8,0.70) 70%)",
            }}
        />
    );
}
