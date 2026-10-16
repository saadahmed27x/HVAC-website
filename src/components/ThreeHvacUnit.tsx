import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Pre-allocated math objects to prevent GC in animation loop
const _vec3 = new THREE.Vector3();
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

export interface ComponentInspection {
  name: string;
  category: string;
  spec: string;
  floridaRelevance: string;
}

export default function ThreeHvacUnit() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [explodedAmount, setExplodedAmount] = useState(0);
  const [activeMode, setActiveMode] = useState<'standard' | 'exploded' | 'airflow'>('standard');
  const [operationCycle, setOperationCycle] = useState<'cooling' | 'heating'>('cooling');
  const [autoRotate, setAutoRotate] = useState(true);
  const [fanSpeedRpm, setFanSpeedRpm] = useState(650);
  const [selectedPart, setSelectedPart] = useState<ComponentInspection | null>(null);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);

  // Mutable refs for animation loop
  const stateRef = useRef({
    explodedAmount: 0,
    targetExploded: 0,
    activeMode: 'standard',
    operationCycle: 'cooling',
    autoRotate: true,
    fanSpeedRpm: 650,
    fanAngle: 0,
    cameraAngle: 0.8,
    cameraHeight: 2.2,
    cameraRadius: 4.8,
    isInteracting: false,
    prevPointerX: 0,
    prevPointerY: 0
  });

  useEffect(() => {
    stateRef.current.targetExploded = explodedAmount;
  }, [explodedAmount]);

  useEffect(() => {
    stateRef.current.activeMode = activeMode;
    if (activeMode === 'exploded') {
      stateRef.current.targetExploded = 1.0;
      setExplodedAmount(1.0);
    } else if (activeMode === 'standard') {
      stateRef.current.targetExploded = 0.0;
      setExplodedAmount(0.0);
    }
  }, [activeMode]);

  useEffect(() => {
    stateRef.current.operationCycle = operationCycle;
  }, [operationCycle]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    stateRef.current.fanSpeedRpm = fanSpeedRpm;
  }, [fanSpeedRpm]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Deep slate background matching navy identity
    scene.fog = new THREE.FogExp2(0x0f172a, 0.08);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(3.5, 2.5, 4.0);
    camera.lookAt(0, 0.9, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment Map via PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x1e293b, 0.7);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    keyLight.position.set(4, 8, 5);
    if (!isHeadless) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.camera.left = -3;
      keyLight.shadow.camera.right = 3;
      keyLight.shadow.camera.top = 3;
      keyLight.shadow.camera.bottom = -3;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Procedural Louver Texture for Condenser Side Panels
    function createLouverTexture(): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      // Base gray
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, 512, 512);

      // Louver horizontal stamped slots
      ctx.fillStyle = '#090d16';
      for (let y = 16; y < 500; y += 18) {
        // Left column
        ctx.fillRect(24, y, 210, 8);
        // Highlight lip
        ctx.fillStyle = '#475569';
        ctx.fillRect(24, y + 8, 210, 2);
        // Right column
        ctx.fillStyle = '#090d16';
        ctx.fillRect(278, y, 210, 8);
        ctx.fillStyle = '#475569';
        ctx.fillRect(278, y + 8, 210, 2);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 1);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    }

    const louverTexture = createLouverTexture();

    // Procedural Radial Contact Shadow Texture
    function createContactShadowTexture(): THREE.CanvasTexture {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;

      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    }

    // Ground Plane with contact shadow
    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.005;
    scene.add(shadowMesh);

    // ==========================================
    // 3D Procedural Composite HVAC Unit (Group)
    // ==========================================
    const unitRoot = new THREE.Group();
    scene.add(unitRoot);

    // 1. Hurricane Mounting Pad (Ground-anchored base)
    const padGeo = new THREE.BoxGeometry(2.1, 0.1, 2.1);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.85,
      metalness: 0.1
    });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.position.set(0, 0.05, 0);
    padMesh.receiveShadow = true;
    unitRoot.add(padMesh);

    // Hurricane Tie-Down Brackets (Florida Building Code 175 MPH compliance)
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.3,
      metalness: 0.85
    });
    const bracketGeo = new THREE.BoxGeometry(0.12, 0.16, 0.12);
    [
      [-0.98, 0.08, -0.98],
      [0.98, 0.08, -0.98],
      [-0.98, 0.08, 0.98],
      [0.98, 0.08, 0.98]
    ].forEach(([x, y, z]) => {
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.position.set(x, y, z);
      unitRoot.add(bracket);
    });

    // 2. Base Pan
    const basePanGeo = new THREE.BoxGeometry(1.9, 0.12, 1.9);
    const basePanMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.45,
      metalness: 0.6
    });
    const basePanMesh = new THREE.Mesh(basePanGeo, basePanMat);
    basePanMesh.position.set(0, 0.16, 0);
    basePanMesh.castShadow = true;
    unitRoot.add(basePanMesh);

    // 3. Condenser Coils (Microchannel Aluminum Heat Exchanger)
    // Sits inside perimeter
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.35,
      metalness: 0.75
    });
    const coilGeo = new THREE.BoxGeometry(1.72, 1.3, 1.72);
    const coilMesh = new THREE.Mesh(coilGeo, coilMat);
    coilMesh.position.set(0, 0.86, 0);
    unitRoot.add(coilMesh);

    // 4. Exterior Cabinet Louvered Corner Columns & Panels
    // Louver side panels with procedural texture
    const louverMat = new THREE.MeshStandardMaterial({
      map: louverTexture,
      roughness: 0.4,
      metalness: 0.5
    });

    const louverPanelGroup = new THREE.Group();
    unitRoot.add(louverPanelGroup);

    // 4 side panels
    const panelGeo = new THREE.BoxGeometry(1.68, 1.32, 0.04);
    // North
    const panelN = new THREE.Mesh(panelGeo, louverMat);
    panelN.position.set(0, 0.86, 0.88);
    panelN.castShadow = true;
    louverPanelGroup.add(panelN);

    // South
    const panelS = new THREE.Mesh(panelGeo, louverMat);
    panelS.position.set(0, 0.86, -0.88);
    panelS.rotation.y = Math.PI;
    panelS.castShadow = true;
    louverPanelGroup.add(panelS);

    // East
    const panelE = new THREE.Mesh(panelGeo, louverMat);
    panelE.position.set(0.88, 0.86, 0);
    panelE.rotation.y = Math.PI / 2;
    panelE.castShadow = true;
    louverPanelGroup.add(panelE);

    // West
    const panelW = new THREE.Mesh(panelGeo, louverMat);
    panelW.position.set(-0.88, 0.86, 0);
    panelW.rotation.y = -Math.PI / 2;
    panelW.castShadow = true;
    louverPanelGroup.add(panelW);

    // 4 Heavy-duty corner post extrusions
    const cornerPostMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7
    });
    const cornerGeo = new THREE.BoxGeometry(0.12, 1.35, 0.12);
    [
      [0.88, 0.86, 0.88],
      [-0.88, 0.86, 0.88],
      [0.88, 0.86, -0.88],
      [-0.88, 0.86, -0.88]
    ].forEach(([x, y, z]) => {
      const corner = new THREE.Mesh(cornerGeo, cornerPostMat);
      corner.position.set(x, y, z);
      corner.castShadow = true;
      unitRoot.add(corner);
    });

    // 5. Internal Scroll Compressor (Variable-speed Inverter)
    const compressorGroup = new THREE.Group();
    compressorGroup.position.set(-0.35, 0.65, -0.3);
    unitRoot.add(compressorGroup);

    // Compressor cylindrical shell
    const compCylinderGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.75, 24);
    const compMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // Distinctive professional blue
      roughness: 0.2,
      metalness: 0.8
    });
    const compBody = new THREE.Mesh(compCylinderGeo, compMat);
    compBody.castShadow = true;
    compressorGroup.add(compBody);

    // Compressor top cap (dome)
    const compDomeGeo = new THREE.SphereGeometry(0.24, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const compDome = new THREE.Mesh(compDomeGeo, compMat);
    compDome.position.y = 0.375;
    compressorGroup.add(compDome);

    // Acoustic sound-dampening blanket band
    const blanketGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.45, 24);
    const blanketMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.9,
      metalness: 0.05
    });
    const compBlanket = new THREE.Mesh(blanketGeo, blanketMat);
    compressorGroup.add(compBlanket);

    // 6. Refrigerant Copper Tubing & 4-Way Reversing Valve (Heat Pump)
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Polished copper
      roughness: 0.25,
      metalness: 0.95
    });

    // Reversing valve body (horizontal cylinder with 3 bottom pipes and 1 top inlet)
    const valveGroup = new THREE.Group();
    valveGroup.position.set(-0.15, 0.85, -0.2);
    unitRoot.add(valveGroup);

    const valveBodyGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.32, 16);
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.3,
      metalness: 0.88
    });
    const valveBody = new THREE.Mesh(valveBodyGeo, brassMat);
    valveBody.rotation.z = Math.PI / 2;
    valveGroup.add(valveBody);

    // Reversing valve solenoid coil
    const solenoidGeo = new THREE.BoxGeometry(0.09, 0.12, 0.09);
    const solenoidMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.4
    });
    const solenoid = new THREE.Mesh(solenoidGeo, solenoidMat);
    solenoid.position.set(0.2, 0, 0);
    valveGroup.add(solenoid);

    // Copper discharge pipe from compressor to valve
    const dischargeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 1.05, -0.3),
      new THREE.Vector3(-0.3, 1.15, -0.25),
      new THREE.Vector3(-0.15, 1.0, -0.2)
    ]);
    const pipeGeo = new THREE.TubeGeometry(dischargeCurve, 16, 0.03, 8, false);
    const dischargePipe = new THREE.Mesh(pipeGeo, copperMat);
    unitRoot.add(dischargePipe);

    // 7. Service Valve Brass Ports (Liquid & Suction Lines at exterior)
    const serviceGroup = new THREE.Group();
    serviceGroup.position.set(0.92, 0.32, -0.6);
    unitRoot.add(serviceGroup);

    // Liquid line port (3/8")
    const liqPort = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 12), brassMat);
    liqPort.rotation.z = Math.PI / 2;
    liqPort.position.set(0, 0.08, 0);
    serviceGroup.add(liqPort);

    // Suction line port (3/4") with black thermal armaflex insulation wrap
    const suctionPort = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.14, 12), new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.95,
      metalness: 0.05
    }));
    suctionPort.rotation.z = Math.PI / 2;
    suctionPort.position.set(0, -0.06, 0);
    serviceGroup.add(suctionPort);

    // 8. Inverter VFD Digital Control Board Enclosure
    const inverterBox = new THREE.Group();
    inverterBox.position.set(0.85, 0.95, -0.2);
    unitRoot.add(inverterBox);

    const boxGeo = new THREE.BoxGeometry(0.08, 0.45, 0.4);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.8
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    inverterBox.add(boxMesh);

    // LED diagnostic status readout
    const ledGeo = new THREE.PlaneGeometry(0.06, 0.03);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0.045, 0.12, 0);
    ledMesh.rotation.y = Math.PI / 2;
    inverterBox.add(ledMesh);

    // 9. Top Assembly (Fan Cowl Orifice, Motor, Fan Blades, Safety Grille)
    // Sits on top of the cabinet (Y = 1.54)
    const topAssemblyGroup = new THREE.Group();
    topAssemblyGroup.position.set(0, 1.54, 0);
    unitRoot.add(topAssemblyGroup);

    // Aerodynamic bellmouth fan orifice cowl
    const cowlGeo = new THREE.CylinderGeometry(0.72, 0.82, 0.14, 32, 1, true);
    const cowlMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.7,
      side: THREE.DoubleSide
    });
    const cowlMesh = new THREE.Mesh(cowlGeo, cowlMat);
    cowlMesh.position.y = 0.07;
    topAssemblyGroup.add(cowlMesh);

    // Top safety wire grille (Concentric wire rings and radial spokes)
    const grilleGroup = new THREE.Group();
    grilleGroup.position.y = 0.14;
    topAssemblyGroup.add(grilleGroup);

    const wireMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.9
    });

    // 4 concentric guard rings
    [0.2, 0.38, 0.55, 0.72].forEach(radius => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 8, 36);
      ringGeo.rotateX(Math.PI / 2);
      const ring = new THREE.Mesh(ringGeo, wireMat);
      grilleGroup.add(ring);
    });

    // 8 radial wire spokes
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const spokeGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.72, 8);
      const spoke = new THREE.Mesh(spokeGeo, wireMat);
      spoke.rotation.z = Math.PI / 2;
      spoke.rotation.y = angle;
      spoke.position.set(Math.cos(angle) * 0.36, 0, Math.sin(angle) * 0.36);
      grilleGroup.add(spoke);
    }

    // High-Efficiency ECM Fan Motor
    const motorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.18, 16);
    const motorMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.6
    });
    const motorMesh = new THREE.Mesh(motorGeo, motorMat);
    motorMesh.position.y = -0.05;
    topAssemblyGroup.add(motorMesh);

    // 3-Blade Swept-Wing Airfoil Fan Assembly
    const fanAssemblyGroup = new THREE.Group();
    fanAssemblyGroup.position.y = -0.12;
    topAssemblyGroup.add(fanAssemblyGroup);

    // Fan Hub
    const hubGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.08, 16);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.3,
      metalness: 0.7
    });
    const hubMesh = new THREE.Mesh(hubGeo, hubMat);
    fanAssemblyGroup.add(hubMesh);

    // 3 Swept Aerodynamic Blades
    const bladeGeo = new THREE.BoxGeometry(0.18, 0.02, 0.55);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.25,
      metalness: 0.5
    });

    for (let b = 0; b < 3; b++) {
      const bladeAngle = (b * Math.PI * 2) / 3;
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.y = bladeAngle;
      blade.rotation.x = 0.25; // Pitch angle of 14 degrees for air suction
      blade.position.set(Math.sin(bladeAngle) * 0.35, 0, Math.cos(bladeAngle) * 0.35);
      blade.castShadow = true;
      fanAssemblyGroup.add(blade);
    }

    // ==========================================
    // Airflow Particle Simulation (Instanced)
    // ==========================================
    const particleCount = 45;
    const particleGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    });
    const particleInstanced = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particleInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(particleInstanced);

    // Pre-calculate initial particle trajectories
    const particleData = Array.from({ length: particleCount }, (_, idx) => {
      const angle = (idx / particleCount) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 0.6 + Math.random() * 0.8;
      return {
        angle,
        radius,
        y: 0.4 + (idx / particleCount) * 2.2,
        speed: 0.015 + Math.random() * 0.012
      };
    });

    // ==========================================
    // Interactive Raycasting for Inspection
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const interactiveParts: { mesh: THREE.Object3D; data: ComponentInspection }[] = [
      {
        mesh: compBody,
        data: {
          name: 'Twin-Rotary Inverter Scroll Compressor',
          category: 'Core Refrigeration',
          spec: 'Variable-Speed Inverter (1,200 – 6,500 RPM), R-410A / R-32, Soft-Start Under 15A',
          floridaRelevance: 'Adjusts output smoothly from 30% to 100% capacity to continuously dehumidify muggy Florida air without high starting-amp power surges.'
        }
      },
      {
        mesh: coilMesh,
        data: {
          name: 'All-Aluminum Microchannel Condenser Coil',
          category: 'Heat Transfer',
          spec: 'Extruded Multi-Port Aluminum Flat Tubes with Zinc-Infused Anti-Corrosion Coating',
          floridaRelevance: 'Provides 40% greater heat transfer surface than copper-fin coils while resisting coastal salt-air pitting and formicary corrosion.'
        }
      },
      {
        mesh: valveBody,
        data: {
          name: '4-Way Reversing Valve & Solenoid',
          category: 'Heat Pump Cycle',
          spec: 'High-Temperature Brass Slide Valve with Low-Draw 24V Solenoid Pilot',
          floridaRelevance: 'Enables reverse-cycle heating for chilly winter cold snaps, extracting free ambient heat from outdoor air without costly electric strip heater draw.'
        }
      },
      {
        mesh: fanAssemblyGroup,
        data: {
          name: 'Swept-Wing Airfoil Fan & ECM Motor',
          category: 'Airflow Delivery',
          spec: 'Brushless DC Electronically Commutated Motor, 45 dB Sound Rating, 3,400 CFM',
          floridaRelevance: 'Whisper-quiet acoustic profile allows installation right next to patio lanais and bedroom windows while pulling high CFM through hot afternoons.'
        }
      },
      {
        mesh: padMesh,
        data: {
          name: 'Engineered Hurricane Anchor Foundation',
          category: 'Structural Safety',
          spec: 'Heavy Composite Pad with 4x Stainless Brackets, 175 MPH Wind Rating',
          floridaRelevance: 'Meets strict Florida Building Code (FBC) wind-load requirements, keeping equipment grounded and secure during tropical storms.'
        }
      }
    ];

    function onPointerDown(e: PointerEvent) {
      stateRef.current.isInteracting = true;
      stateRef.current.prevPointerX = e.clientX;
      stateRef.current.prevPointerY = e.clientY;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const testMeshes = interactiveParts.map(p => p.mesh);
      const intersects = raycaster.intersectObjects(testMeshes, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const found = interactiveParts.find(p => p.mesh === hit || p.mesh.children.includes(hit));
        if (found) {
          setSelectedPart(found.data);
        }
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!stateRef.current.isInteracting) return;
      const dx = e.clientX - stateRef.current.prevPointerX;
      const dy = e.clientY - stateRef.current.prevPointerY;
      stateRef.current.prevPointerX = e.clientX;
      stateRef.current.prevPointerY = e.clientY;

      stateRef.current.cameraAngle -= dx * 0.008;
      stateRef.current.cameraHeight = Math.max(0.6, Math.min(3.8, stateRef.current.cameraHeight - dy * 0.008));
    }

    function onPointerUp() {
      stateRef.current.isInteracting = false;
    }

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ==========================================
    // 60 FPS Render Loop with Exponential Damping
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();
    const dummyMat = new THREE.Matrix4();
    const dummyColor = new THREE.Color();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const state = stateRef.current;

      // Smooth camera rotation
      if (state.autoRotate && !state.isInteracting) {
        state.cameraAngle += dt * 0.35;
      }

      // Camera position with smooth exponential damping
      const camX = Math.sin(state.cameraAngle) * state.cameraRadius;
      const camZ = Math.cos(state.cameraAngle) * state.cameraRadius;
      _targetPos.set(camX, state.cameraHeight, camZ);
      camera.position.lerp(_targetPos, 1 - Math.exp(-6 * dt));
      _targetLook.set(0, 0.9, 0);
      camera.lookAt(_targetLook);

      // Smooth Exploded View Layer Separation
      state.explodedAmount = THREE.MathUtils.damp(state.explodedAmount, state.targetExploded, 5, dt);

      // Separate Top Assembly upward
      topAssemblyGroup.position.y = 1.54 + state.explodedAmount * 0.85;

      // Separate Louver Side Panels outward
      panelN.position.z = 0.88 + state.explodedAmount * 0.45;
      panelS.position.z = -0.88 - state.explodedAmount * 0.45;
      panelE.position.x = 0.88 + state.explodedAmount * 0.45;
      panelW.position.x = -0.88 - state.explodedAmount * 0.45;

      // Separate compressor & valve upward/outward
      compressorGroup.position.set(-0.35 - state.explodedAmount * 0.25, 0.65 + state.explodedAmount * 0.3, -0.3);

      // Rotate Condenser Fan
      const fanSpeedRad = (state.fanSpeedRpm / 60) * Math.PI * 2;
      state.fanAngle += fanSpeedRad * dt;
      fanAssemblyGroup.rotation.y = state.fanAngle;

      // Airflow Particles Animation
      const showAirflow = state.activeMode === 'airflow' || state.activeMode === 'standard';
      particleInstanced.visible = showAirflow;

      if (showAirflow) {
        const isCooling = state.operationCycle === 'cooling';
        const particleBaseColor = isCooling ? 0x38bdf8 : 0xf97316; // Sky blue for cooling, amber for heating

        for (let i = 0; i < particleCount; i++) {
          const p = particleData[i];
          p.y += p.speed * (state.fanSpeedRpm / 650) * 1.5;

          // Recirculate
          if (p.y > 3.0) {
            p.y = 0.35;
          }

          // In cooling mode, air is pulled inward through the coil, then shoots out top
          let r = p.radius;
          if (p.y < 1.4) {
            // Sucking into coil
            r = THREE.MathUtils.lerp(1.2, 0.5, (p.y - 0.35) / 1.05);
          } else {
            // Discharging out top
            r = THREE.MathUtils.lerp(0.5, 0.8, (p.y - 1.4) / 1.6);
          }

          const px = Math.sin(p.angle) * r;
          const pz = Math.cos(p.angle) * r;

          dummyMat.makeTranslation(px, p.y, pz);
          // Scale fades at extremes
          const scale = Math.sin(((p.y - 0.35) / 2.65) * Math.PI);
          dummyMat.scale(_vec3.set(scale, scale, scale));
          particleInstanced.setMatrixAt(i, dummyMat);

          // Color gradient from cool blue to warm orange as heat is expelled
          if (isCooling) {
            dummyColor.setHSL(0.55 - (p.y / 3.0) * 0.45, 0.9, 0.6);
          } else {
            dummyColor.setHSL(0.08 + (p.y / 3.0) * 0.45, 0.9, 0.6);
          }
          particleInstanced.setColorAt(i, dummyColor);
        }
        particleInstanced.instanceMatrix.needsUpdate = true;
        if (particleInstanced.instanceColor) particleInstanced.instanceColor.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      cancelAnimationFrame(animationFrameId);

      // Thorough WebGL disposal
      renderer.dispose();
      envTexture.dispose();
      louverTexture.dispose();
      shadowTex.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        data-testid="three-canvas-container"
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        title="Click & drag to rotate 3D heat pump model"
      />

      {/* Top Spec Badges & Header Overlay (Unobtrusive) */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-wrap items-start justify-between gap-3 pointer-events-none">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 shadow-lg backdrop-blur-none pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Interactive 3D Equipment Studio
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            15.2+ SEER2 Inverter Heat Pump • Florida Coastal Spec
          </p>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
              autoRotate
                ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {autoRotate ? 'Auto-Rotate ON' : 'Rotate Paused'}
          </button>
        </div>
      </div>

      {/* Selected Component Inspection Card (Dismissible) */}
      {selectedPart && (
        <div className="relative z-10 mx-4 sm:mx-6 mb-2 bg-slate-900/95 border border-sky-500/40 rounded-xl p-4 shadow-2xl max-w-lg pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                {selectedPart.category}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">{selectedPart.name}</h4>
            </div>
            <button
              onClick={() => setSelectedPart(null)}
              className="text-slate-400 hover:text-white text-sm p-1 rounded-md"
              aria-label="Close component details"
            >
              ✕
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-300 space-y-1.5">
            <p>
              <strong className="text-slate-200">Specifications:</strong> {selectedPart.spec}
            </p>
            <p>
              <strong className="text-amber-400">Florida Climate Factor:</strong>{' '}
              {selectedPart.floridaRelevance}
            </p>
          </div>
        </div>
      )}

      {/* Unified Ergonomic Bottom Control Dock (Collapsible, <= 15% Viewport footprint) */}
      <div className="relative z-10 px-4 pb-4 w-full flex flex-col items-center pointer-events-auto">
        {/* Collapse / Expand Toggle */}
        <button
          onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
          className="mb-1 text-[11px] font-medium tracking-wide uppercase px-3 py-1 bg-slate-800/90 border border-slate-700 text-slate-300 rounded-t-lg hover:text-white transition-colors"
          aria-label={isControlsCollapsed ? 'Show 3D controls' : 'Hide 3D controls'}
        >
          {isControlsCollapsed ? '▲ Expand Controls' : '▼ Collapse Controls'}
        </button>

        {!isControlsCollapsed && (
          <div className="w-full max-w-3xl bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-4">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setActiveMode('standard')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                  activeMode === 'standard'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Standard View
              </button>
              <button
                onClick={() => setActiveMode('exploded')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                  activeMode === 'exploded'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Exploded View
              </button>
              <button
                onClick={() => setActiveMode('airflow')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-all ${
                  activeMode === 'airflow'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Airflow Stream
              </button>
            </div>

            {/* Cycle Mode: Cooling vs Heating (Florida Summer vs Winter) */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 hidden sm:inline">Cycle:</span>
              <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setOperationCycle('cooling')}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    operationCycle === 'cooling'
                      ? 'bg-blue-500/20 text-blue-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Summer Cooling
                </button>
                <button
                  onClick={() => setOperationCycle('heating')}
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    operationCycle === 'heating'
                      ? 'bg-amber-500/20 text-amber-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  Winter Heat Pump
                </button>
              </div>
            </div>

            {/* Fan Sound / Speed Simulation */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Fan RPM:</span>
              <select
                value={fanSpeedRpm}
                onChange={e => setFanSpeedRpm(Number(e.target.value))}
                className="bg-slate-950 text-xs text-slate-200 border border-slate-700 rounded-md px-2 py-1 font-mono focus:border-sky-500 focus:outline-none"
              >
                <option value={400}>400 RPM (Ultra-Quiet 42 dB)</option>
                <option value={650}>650 RPM (Standard 49 dB)</option>
                <option value={850}>850 RPM (High Florida Peak)</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
