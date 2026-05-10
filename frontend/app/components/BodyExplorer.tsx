'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

const BodyExplorer = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [selectedPart, setSelectedPart] = useState<string | null>(null);

    const partsInfo: Record<string, { title: string; desc: string; stats: string }> = {
        head: {
            title: "거북목 및 VDT 증후군",
            desc: "장시간 PC 사용으로 인한 경추 불균형을 AI로 스캐닝합니다. 맞춤형 스트레칭과 자세 교정 솔루션을 제공합니다.",
            stats: "임직원 통증 94% 완화 경험"
        },
        back: {
            title: "요추 및 골반 불균형",
            desc: "코어 근력 약화로 인한 허리 통증의 근본 원인을 분석합니다. 기능적 가동술(MCT)을 통해 즉각적인 컨디션 회복을 돕습니다.",
            stats: "누적 1만 건 이상의 임상 데이터"
        },
        knee: {
            title: "하체 정렬 및 보행 분석",
            desc: "성장기 학생들의 X/O다리 변형과 무릎 정렬을 진단합니다. 바른 보행을 위한 특수 트레이닝 프로그램을 연계합니다.",
            stats: "성장기 학생 재도입률 97%"
        },
        shoulder: {
            title: "라운드 숄더 및 회전근개",
            desc: "말린 어깨와 견갑골 가동 범위를 정밀 측정합니다. 1:1 피지컬케어로 신체 가동 범위를 정상화합니다.",
            stats: "만족도 99% 달성"
        }
    };

    useEffect(() => {
        if (!canvasRef.current) {
            console.log("3D Canvas ref not found yet.");
            return;
        }

        console.log("Initializing 3D Body Explorer...");
        let renderer: THREE.WebGLRenderer;
        
        try {
            // 1. Scene Setup
            const scene = new THREE.Scene();
            const width = canvasRef.current.clientWidth || 500;
            const height = canvasRef.current.clientHeight || 600;
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            
            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);
            canvasRef.current.appendChild(renderer.domElement);

        // 2. Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0x2b8a3e, 2);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // 3. Create "AI Mannequin" (Geometric Humanoid)
        const group = new THREE.Group();
        
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x2b8a3e, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.3 
        });

        // Head
        const headGeo = new THREE.SphereGeometry(0.5, 16, 16);
        const head = new THREE.Mesh(headGeo, material);
        head.position.y = 2.5;
        head.userData = { id: 'head' };
        group.add(head);

        // Torso
        const torsoGeo = new THREE.CylinderGeometry(0.7, 0.5, 2, 16);
        const torso = new THREE.Mesh(torsoGeo, material);
        torso.position.y = 1.2;
        torso.userData = { id: 'back' };
        group.add(torso);

        // Arms
        const armGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
        const lArm = new THREE.Mesh(armGeo, material);
        lArm.position.set(-1, 1.5, 0);
        lArm.rotation.z = Math.PI / 4;
        lArm.userData = { id: 'shoulder' };
        group.add(lArm);
        const rArm = new THREE.Mesh(armGeo, material);
        rArm.position.set(1, 1.5, 0);
        rArm.rotation.z = -Math.PI / 4;
        rArm.userData = { id: 'shoulder' };
        group.add(rArm);

        // Legs
        const legGeo = new THREE.CylinderGeometry(0.3, 0.2, 2, 8);
        const lLeg = new THREE.Mesh(legGeo, material);
        lLeg.position.set(-0.4, -0.8, 0);
        lLeg.userData = { id: 'knee' };
        group.add(lLeg);
        const rLeg = new THREE.Mesh(legGeo, material);
        rLeg.position.set(0.4, -0.8, 0);
        rLeg.userData = { id: 'knee' };
        group.add(rLeg);

        scene.add(group);

        // 4. Glow Points (Interactive Hotspots)
        const hotspotGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const hotspotMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        
        const hotspots = [
            { pos: [0, 2.5, 0.5], id: 'head' },
            { pos: [0, 1.2, 0.6], id: 'back' },
            { pos: [0.8, 1.8, 0.3], id: 'shoulder' },
            { pos: [-0.4, -1, 0.4], id: 'knee' }
        ].map(h => {
            const mesh = new THREE.Mesh(hotspotGeo, hotspotMat);
            mesh.position.set(h.pos[0], h.pos[1], h.pos[2]);
            mesh.userData = { id: h.id };
            group.add(mesh);
            return mesh;
        });

        camera.position.z = 7;

        // 5. Raycaster for Interaction
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(group.children);

            if (intersects.length > 0) {
                const id = intersects[0].object.userData.id;
                if (id) setSelectedPart(id);
            }
        };

        window.addEventListener('click', onMouseClick);

        // 6. Animation
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            group.rotation.y += 0.005;
            
            // Pulse hotspots
            hotspots.forEach(h => {
                const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
                h.scale.set(scale, scale, scale);
            });

            renderer.render(scene, camera);
        };
        animate();

        // 7. Handle Resize
        const handleResize = () => {
            if (!canvasRef.current) return;
            camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        } catch (error) {
            console.error("Three.js initialization failed:", error);
        }

        return () => {
            window.removeEventListener('click', onMouseClick);
            window.removeEventListener('resize', handleResize);
            if (frameId) cancelAnimationFrame(frameId);
            if (canvasRef.current && renderer) {
                try {
                    canvasRef.current.removeChild(renderer.domElement);
                } catch (e) {}
            }
        };
    }, []);

    return (
        <section className="body-explorer-section reveal active" style={{ padding: '120px 0', background: '#0b0c10', overflow: 'hidden', position: 'relative', opacity: 1, visibility: 'visible' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
                
                {/* 3D Canvas Area */}
                <div style={{ flex: '1', minWidth: '400px', height: '600px', position: 'relative' }}>
                    <div ref={canvasRef} style={{ width: '100%', height: '100%' }}></div>
                    <div className="explorer-hint" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', color: '#00ff00', fontSize: '14px', fontWeight: 'bold', animation: 'fadeInOut 2s infinite' }}>
                        💡 모델의 빛나는 부위를 클릭해 보세요
                    </div>
                </div>

                {/* Info Display Area */}
                <div style={{ flex: '1', minWidth: '350px' }}>
                    <span className="section-kicker" style={{ background: 'rgba(0,255,0,0.1)', color: '#00ff00', border: '1px solid rgba(0,255,0,0.2)' }}>INTERACTIVE DX</span>
                    <h2 className="section-title" style={{ color: '#fff', textAlign: 'left', marginBottom: '30px' }}>
                        FaWW의 정밀 분석,<br />지금 <span style={{ color: '#00ff00' }}>체험</span>해 보세요
                    </h2>

                    <div className={`explorer-card ${selectedPart ? 'active' : ''}`} style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        backdropFilter: 'blur(10px)', 
                        padding: '40px', 
                        borderRadius: '24px', 
                        border: '1px solid rgba(255,255,255,0.1)',
                        minHeight: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        transition: 'all 0.5s ease'
                    }}>
                        {selectedPart ? (
                            <>
                                <h3 style={{ color: '#00ff00', fontSize: '28px', marginBottom: '15px' }}>{partsInfo[selectedPart].title}</h3>
                                <p style={{ color: '#ccc', fontSize: '18px', lineHeight: '1.6', marginBottom: '25px' }}>{partsInfo[selectedPart].desc}</p>
                                <div style={{ background: 'rgba(0,255,0,0.1)', padding: '15px 20px', borderRadius: '12px', border: '1px solid rgba(0,255,0,0.2)' }}>
                                    <span style={{ color: '#00ff00', fontWeight: 'bold' }}>📊 {partsInfo[selectedPart].stats}</span>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', color: '#888' }}>
                                <div style={{ fontSize: '50px', marginBottom: '20px' }}>👆</div>
                                <p style={{ fontSize: '18px' }}>분석이 필요한 신체 부위를<br />좌측 모델에서 선택해 주세요</p>
                            </div>
                        )}
                    </div>

                    <button 
                        className="btn-primary" 
                        style={{ marginTop: '40px', width: '100%', background: '#00ff00', color: '#000', fontSize: '18px' }}
                        onClick={() => (window as any).openModal('modal-proposal')}
                    >
                        우리 조직 정밀 진단 문의하기
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInOut {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }
                .explorer-card.active {
                    border-color: rgba(0, 255, 0, 0.3);
                    box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
                }
            `}</style>
        </section>
    );
};

export default BodyExplorer;
