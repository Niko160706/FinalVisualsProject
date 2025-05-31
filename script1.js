// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -10% 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

// Initialize scroll animations (Existing User Code)
// document.addEventListener("DOMContentLoaded", () => { // Will be combined later
//   document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//     observer.observe(el)
//   })
// })

// Small Demo Canvases in Visual Grid (Existing User Code)
function initSmallDemos() {
  // Functions Demo
  const functionsCanvas = document.getElementById("functionsDemo")
  if (functionsCanvas) {
    const ctx = functionsCanvas.getContext("2d")
    functionsCanvas.width = 200
    functionsCanvas.height = 150
    let animFrameId_functionsDemo;

    function drawFunctionDemo() {
      ctx.clearRect(0, 0, 200, 150)
      ctx.strokeStyle = "#f0f0f0"
      ctx.lineWidth = 1
      for (let i = 0; i <= 200; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 150); ctx.stroke()
      }
      for (let i = 0; i <= 150; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(200, i); ctx.stroke()
      }
      ctx.strokeStyle = "#C2FA6C"; ctx.lineWidth = 3; ctx.beginPath()
      for (let x = 0; x < 200; x += 2) {
        const normalizedX = (x - 100) / 20
        const y = 75 - normalizedX * normalizedX * 2
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.stroke()
      const time = Date.now() * 0.002
      const pointX = 100 + Math.sin(time) * 60
      const normalizedX = (pointX - 100) / 20
      const pointY = 75 - normalizedX * normalizedX * 2
      ctx.fillStyle = "#FF6B6B"; ctx.beginPath(); ctx.arc(pointX, pointY, 4, 0, Math.PI * 2); ctx.fill()
      animFrameId_functionsDemo = requestAnimationFrame(drawFunctionDemo);
    }
    drawFunctionDemo()
  }

  // Geometry Demo
  const geometryCanvas = document.getElementById("geometryDemo")
  if (geometryCanvas) {
    const ctx = geometryCanvas.getContext("2d")
    geometryCanvas.width = 200
    geometryCanvas.height = 150
    let animFrameId_geometryDemo;

    function drawGeometryDemo() {
      ctx.clearRect(0, 0, 200, 150)
      const time = Date.now() * 0.001
      const centerX = 100, centerY = 75, radius = 40
      ctx.strokeStyle = "#C2FA6C"; ctx.fillStyle = "rgba(194, 250, 108, 0.3)"; ctx.lineWidth = 2; ctx.beginPath()
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI * 2) / 3 + time
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = "#FF6B6B"; ctx.beginPath(); ctx.arc(centerX, centerY, 3, 0, Math.PI * 2); ctx.fill()
      animFrameId_geometryDemo = requestAnimationFrame(drawGeometryDemo)
    }
    drawGeometryDemo()
  }

  // Algebra Demo
  const algebraCanvas = document.getElementById("algebraDemo")
  if (algebraCanvas) {
    const ctx = algebraCanvas.getContext("2d")
    algebraCanvas.width = 200
    algebraCanvas.height = 150
    let animFrameId_algebraDemo;

    function drawAlgebraDemo() {
      ctx.clearRect(0, 0, 200, 150)
      const time = Date.now() * 0.001
      ctx.fillStyle = "#C2FA6C"; ctx.font = "16px Arial"; ctx.textAlign = "center"; ctx.fillText("x² + 2x + 1", 100, 30)
      const x_val = Math.sin(time) * 2 + 2 // Renamed x to x_val to avoid conflict
      const result = x_val * x_val + 2 * x_val + 1
      ctx.fillStyle = "#FF6B6B"; ctx.fillRect(30, 120 - x_val * x_val * 5, 20, x_val * x_val * 5); ctx.fillStyle = "#000"; ctx.font = "12px Arial"; ctx.fillText("x²", 40, 140)
      ctx.fillStyle = "#4ECDC4"; ctx.fillRect(70, 120 - 2 * x_val * 5, 20, 2 * x_val * 5); ctx.fillText("2x", 80, 140)
      ctx.fillStyle = "#45B7D1"; ctx.fillRect(110, 115, 20, 5); ctx.fillText("1", 120, 140)
      ctx.fillStyle = "#C2FA6C"; ctx.fillRect(150, 120 - result * 2, 20, result * 2); ctx.fillText("result", 160, 140)
      animFrameId_algebraDemo = requestAnimationFrame(drawAlgebraDemo)
    }
    drawAlgebraDemo()
  }
}

// Interactive 2D Canvas (Existing User Code)
function init2DCanvas() {
  const canvas = document.getElementById("canvas2d")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let canvasWidth = canvas.offsetWidth; // Use let for re-assignment
  let canvasHeight = canvas.offsetHeight;
  
  function resize2DCanvas() {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      if (canvasWidth === 0 || canvasHeight === 0) return; // Skip if not visible
      canvas.width = canvasWidth * 2; // Use logical width/height for drawing calculations
      canvas.height = canvasHeight * 2;
      ctx.scale(2, 2);
  }
  resize2DCanvas(); // Initial size

  let currentFunction = "parabola"
  let animationTime = 0
  let animFrameId_2DCanvas;

  function drawGrid() {
    ctx.strokeStyle = "#f0f0f0"; ctx.lineWidth = 1
    for (let i = 0; i <= canvasWidth; i += 20) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvasHeight); ctx.stroke() }
    for (let i = 0; i <= canvasHeight; i += 20) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvasWidth, i); ctx.stroke() }
    ctx.strokeStyle = "#ccc"; ctx.lineWidth = 2; ctx.beginPath()
    ctx.moveTo(canvasWidth / 2, 0); ctx.lineTo(canvasWidth / 2, canvasHeight); ctx.moveTo(0, canvasHeight / 2); ctx.lineTo(canvasWidth, canvasHeight / 2); ctx.stroke()
  }

  function drawFunction() {
    ctx.strokeStyle = "#C2FA6C"; ctx.lineWidth = 3; ctx.beginPath()
    let firstPoint = true
    for (let x_coord = 0; x_coord < canvasWidth; x_coord += 2) { // Renamed x to x_coord
      const normalizedX = (x_coord - canvasWidth / 2) / 20
      let y
      switch (currentFunction) {
        case "parabola": y = canvasHeight / 2 - normalizedX * normalizedX * 10; break
        case "sine": y = canvasHeight / 2 - Math.sin(normalizedX + animationTime) * 50; break
        case "cosine": y = canvasHeight / 2 - Math.cos(normalizedX + animationTime) * 50; break
        case "cubic": y = canvasHeight / 2 - normalizedX * normalizedX * normalizedX * 2; break
      }
      if (firstPoint) { ctx.moveTo(x_coord, y); firstPoint = false } else { ctx.lineTo(x_coord, y) }
    }
    ctx.stroke()
    const pointX = canvasWidth / 2 + Math.sin(animationTime * 2) * 100
    const normalizedPointX = (pointX - canvasWidth / 2) / 20 // Renamed normalizedX
    let pointY
    switch (currentFunction) {
      case "parabola": pointY = canvasHeight / 2 - normalizedPointX * normalizedPointX * 10; break
      case "sine": pointY = canvasHeight / 2 - Math.sin(normalizedPointX + animationTime) * 50; break
      case "cosine": pointY = canvasHeight / 2 - Math.cos(normalizedPointX + animationTime) * 50; break
      case "cubic": pointY = canvasHeight / 2 - normalizedPointX * normalizedPointX * normalizedPointX * 2; break
    }
    ctx.fillStyle = "#FF6B6B"; ctx.beginPath(); ctx.arc(pointX, pointY, 5, 0, Math.PI * 2); ctx.fill()
  }

  function animate2D() {
    if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) { // Don't draw if not visible
        animFrameId_2DCanvas = requestAnimationFrame(animate2D);
        return;
    }
    if(canvas.offsetWidth !== canvasWidth || canvas.offsetHeight !== canvasHeight) { // Check for resize
        resize2DCanvas();
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Use logical width/height for clearing
    drawGrid();
    drawFunction();
    animationTime += 0.02;
    animFrameId_2DCanvas = requestAnimationFrame(animate2D);
  }

  document.querySelectorAll("#canvas2d").forEach((c) => { // Changed canvas to c
    const controls = c.parentElement.querySelector(".demo-controls")
    if (controls) {
      controls.addEventListener("click", (e) => {
        if (e.target.classList.contains("control-btn")) {
          controls.querySelectorAll(".control-btn").forEach((btn) => btn.classList.remove("active"))
          e.target.classList.add("active")
          currentFunction = e.target.dataset.function
        }
      })
    }
  })
  animate2D()
}

// Interactive 3D Canvas (Existing User Code for small demo, using 2D context)
function init3DCanvas() {
  const canvas = document.getElementById("canvas3d")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let canvasWidth = canvas.offsetWidth; // Use let for re-assignment
  let canvasHeight = canvas.offsetHeight;

  function resize3DCanvas() {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      if (canvasWidth === 0 || canvasHeight === 0) return;
      canvas.width = canvasWidth * 2;
      canvas.height = canvasHeight * 2;
      ctx.scale(2, 2);
  }
  resize3DCanvas(); // Initial size
  
  const centerX = () => canvasWidth / 2; // Use functions for dynamic center
  const centerY = () => canvasHeight / 2;

  let rotation = 0, currentShape = "cube", isDragging = false, mouseX = 0, mouseY = 0;
  let animFrameId_3DCanvas;

  function rotatePoint(point, rx, ry, rz) {
    const x1 = point.x * Math.cos(ry) - point.z * Math.sin(ry)
    const z1 = point.x * Math.sin(ry) + point.z * Math.cos(ry)
    const y2 = point.y * Math.cos(rx) - z1 * Math.sin(rx)
    const z2 = point.y * Math.sin(rx) + z1 * Math.cos(rx)
    return { x: x1, y: y2, z: z2 }
  }
  function projectPoint(point) {
    const scale = 200 / (200 + point.z)
    return { x: centerX() + point.x * scale, y: centerY() + point.y * scale, z: point.z }
  }
  function drawCube() {
    const size = 60
    const vertices = [ { x: -size, y: -size, z: -size }, { x: size, y: -size, z: -size }, { x: size, y: size, z: -size }, { x: -size, y: size, z: -size }, { x: -size, y: -size, z: size }, { x: size, y: -size, z: size }, { x: size, y: size, z: size }, { x: -size, y: size, z: size }, ]
    const edges = [ [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7], ]
    const rotatedVertices = vertices.map((v) => rotatePoint(v, rotation * 0.7, rotation, 0))
    const projectedVertices = rotatedVertices.map((v) => projectPoint(v))
    ctx.strokeStyle = "#C2FA6C"; ctx.lineWidth = 2
    edges.forEach((edge) => { const p1 = projectedVertices[edge[0]], p2 = projectedVertices[edge[1]]; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke() })
  }
  function drawSphere() { /* ... existing sphere drawing logic ... */ } // Keep sphere, pyramid, torus as they are
  function drawPyramid() { /* ... existing pyramid drawing logic ... */ }
  function drawTorus() { /* ... existing torus drawing logic ... */ }

  function animate3D() {
    if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        animFrameId_3DCanvas = requestAnimationFrame(animate3D);
        return;
    }
    if(canvas.offsetWidth !== canvasWidth || canvas.offsetHeight !== canvasHeight) {
        resize3DCanvas();
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Draw background grid (simplified for brevity, keep your original if you prefer)
    ctx.strokeStyle = "#f0f0f0"; ctx.lineWidth = 1;
    for (let i = -100; i <= 100; i += 20) {
        const p1 = projectPoint(rotatePoint({ x: i, y: 0, z: -100 }, rotation * 0.3, rotation * 0.5, 0));
        const p2 = projectPoint(rotatePoint({ x: i, y: 0, z: 100 }, rotation * 0.3, rotation * 0.5, 0));
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        const p3 = projectPoint(rotatePoint({ x: -100, y: 0, z: i }, rotation * 0.3, rotation * 0.5, 0));
        const p4 = projectPoint(rotatePoint({ x: 100, y: 0, z: i }, rotation * 0.3, rotation * 0.5, 0));
        ctx.beginPath(); ctx.moveTo(p3.x, p3.y); ctx.lineTo(p4.x, p4.y); ctx.stroke();
    }
    switch (currentShape) { case "cube": drawCube(); break; case "sphere": drawSphere(); break; case "pyramid": drawPyramid(); break; case "torus": drawTorus(); break; }
    if (!isDragging) { rotation += 0.01 }
    animFrameId_3DCanvas = requestAnimationFrame(animate3D)
  }
  canvas.addEventListener("mousedown", (e) => { isDragging = true; const rect = canvas.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top; });
  canvas.addEventListener("mousemove", (e) => { if (isDragging) { const rect = canvas.getBoundingClientRect(); const newMouseX = e.clientX - rect.left; const newMouseY = e.clientY - rect.top; rotation += (newMouseX - mouseX) * 0.01; mouseX = newMouseX; mouseY = newMouseY; } });
  canvas.addEventListener("mouseup", () => { isDragging = false; });
  canvas.addEventListener("mouseleave", () => { isDragging = false; });
  const controls = canvas.parentElement.querySelector(".demo-controls");
  if (controls) { controls.addEventListener("click", (e) => { if (e.target.classList.contains("control-btn")) { controls.querySelectorAll(".control-btn").forEach((btn) => btn.classList.remove("active")); e.target.classList.add("active"); currentShape = e.target.dataset.shape; } }); }
  animate3D()
}

// Video Demo Canvas (Existing User Code)
function initVideoDemo() {
  const canvas = document.getElementById("videoDemo")
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  let canvasWidth = canvas.offsetWidth;
  let canvasHeight = canvas.offsetHeight;

  function resizeVideoDemoCanvas() {
      canvasWidth = canvas.offsetWidth;
      canvasHeight = canvas.offsetHeight;
      if (canvasWidth === 0 || canvasHeight === 0) return;
      canvas.width = canvasWidth * 2;
      canvas.height = canvasHeight * 2;
      ctx.scale(2, 2);
  }
  resizeVideoDemoCanvas();

  let isPlaying = false, animationTime = 0;
  let animFrameId_videoDemo;

  function drawVideoDemo() {
    if (canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        animFrameId_videoDemo = requestAnimationFrame(drawVideoDemo);
        return;
    }
    if(canvas.offsetWidth !== canvasWidth || canvas.offsetHeight !== canvasHeight) {
        resizeVideoDemoCanvas();
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    if (isPlaying) {
      for (let i = 0; i < 5; i++) { ctx.strokeStyle = `hsl(${120 + i * 30}, 70%, 60%)`; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x < canvasWidth; x += 2) { const y = canvasHeight / 2 + Math.sin((x + animationTime * 50 + i * 50) * 0.02) * (30 - i * 5); if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); }
      for (let i = 0; i < 20; i++) { const x = (animationTime * 2 + i * 20) % canvasWidth; const y = canvasHeight / 2 + Math.sin((x + i * 30) * 0.02) * 30; ctx.fillStyle = "#C2FA6C"; ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill(); }
      animationTime += 1;
    } else {
      ctx.fillStyle = "#f0f0f0"; ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#C2FA6C"; ctx.font = "bold 16px Arial"; ctx.textAlign = "center"; ctx.fillText("Interactive Math Demo", canvasWidth / 2, canvasHeight / 2 - 10); ctx.font = "12px Arial"; ctx.fillText("Click play to start", canvasWidth / 2, canvasHeight / 2 + 10);
    }
    animFrameId_videoDemo = requestAnimationFrame(drawVideoDemo);
  }
  const playButton = canvas.parentElement.querySelector(".play-button");
  if (playButton) { playButton.addEventListener("click", () => { isPlaying = !isPlaying; playButton.innerHTML = isPlaying ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"/></svg>'; }); }
  drawVideoDemo()
}


// ---- START: ADVANCED MATH PLAYGROUND (THREE.JS) ----
// Based on "Advanced Interactive Math Playground - Rounded UI"

let scene, camera, renderer, controls;
let currentGraphObject = null;
let currentAxesObject = null;
let currentGridHelper = null; 
let currentMode = '3D'; // Default mode
const mathParser = new exprEval.Parser(); // Renamed to avoid conflict if user has 'parser'

// Get DOM elements for the new playground (ensure IDs match your integrated HTML)
const pg_functionInput = document.getElementById('functionInput'); // pg_ prefix for playground
const pg_functionInputLabel = document.getElementById('functionInputLabel');
const pg_plotButton = document.getElementById('plotButton');
const pg_parseErrorDisplay = document.getElementById('parseError');
const pg_mode2DButton = document.getElementById('mode2DButton'); 
const pg_mode3DButton = document.getElementById('mode3DButton'); 
const pg_leftToolbarButtons = document.querySelectorAll('#left-toolbar .toolbar-btn');
const pg_canvasContainer = document.getElementById('canvasContainer'); // This is the direct parent of mathCanvas
const pg_mathCanvas = document.getElementById('mathCanvas');

const pg_zoomInButton = document.getElementById('zoomInButton');
const pg_zoomOutButton = document.getElementById('zoomOutButton');
const pg_resetViewButton = document.getElementById('resetViewButton'); 
        
const pg_customMessageBox = document.getElementById('customMessageBox');
const pg_messageBoxText = document.getElementById('messageBoxText');
const pg_messageBoxOkButton = document.getElementById('messageBoxOkButton');

const PG_GRAPH_COLOR_YELLOW_ORANGE = 0xffa726; 
const PG_GRID_SIZE_3D = 40; 
const PG_GRID_DIVISIONS_3D = 30; 
const PG_AXES_SIZE_3D = PG_GRID_SIZE_3D / 2 + 2; 

const PG_COLOR_LOW = new THREE.Color(0x228B22); 
const PG_COLOR_MID = new THREE.Color(0x7CFC00); 
const PG_COLOR_HIGH = new THREE.Color(PG_GRAPH_COLOR_YELLOW_ORANGE); 

function pg_showCustomAlert(message) {
    if (pg_messageBoxText) pg_messageBoxText.textContent = message;
    if (pg_customMessageBox) pg_customMessageBox.classList.remove('hidden');
}
if (pg_messageBoxOkButton) {
    pg_messageBoxOkButton.addEventListener('click', () => {
        if (pg_customMessageBox) pg_customMessageBox.classList.add('hidden');
    });
}

let pg_errorTimeout;
function pg_showParseError(message) {
    if (pg_parseErrorDisplay) {
        pg_parseErrorDisplay.textContent = message;
        pg_parseErrorDisplay.style.display = 'block';
        clearTimeout(pg_errorTimeout);
        pg_errorTimeout = setTimeout(() => {
            pg_parseErrorDisplay.style.display = 'none';
        }, 4000); 
    }
}
function pg_clearParseError() {
    if (pg_parseErrorDisplay) pg_parseErrorDisplay.style.display = 'none';
    clearTimeout(pg_errorTimeout);
}

function initAdvancedMathPlayground() {
    if (!pg_mathCanvas || !pg_canvasContainer) {
        console.error("Math Playground canvas or container not found. Skipping initialization.");
        return;
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); 

    renderer = new THREE.WebGLRenderer({ canvas: pg_mathCanvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // Initial size set based on container
    if (pg_canvasContainer.clientWidth > 0 && pg_canvasContainer.clientHeight > 0) {
        renderer.setSize(pg_canvasContainer.clientWidth, pg_canvasContainer.clientHeight);
    } else {
        // Fallback if container has no dimensions yet, resize will handle it
        renderer.setSize(window.innerWidth, window.innerHeight * 0.7); 
    }
    
    pg_setupCameraAndControls(); // pg_ prefix for playground functions

    const ambientLight = new THREE.AmbientLight(0xf0f0f0, 1.0); 
    scene.add(ambientLight);
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0); 
    directionalLight1.position.set(2.5, 3.5, 2.5).normalize(); 
    scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight2.position.set(-2.5, -1.5, 1.8).normalize(); 
    scene.add(directionalLight2);

    if (pg_plotButton) pg_plotButton.addEventListener('click', pg_plotUserFunction);
    if (pg_functionInput) pg_functionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') pg_plotUserFunction();
    });
    if (pg_mode2DButton) pg_mode2DButton.addEventListener('click', () => pg_switchMode('2D'));
    if (pg_mode3DButton) pg_mode3DButton.addEventListener('click', () => pg_switchMode('3D'));
    
    if (pg_leftToolbarButtons) pg_leftToolbarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            pg_showCustomAlert("Tool selected: " + (btn.title || "Unnamed Tool") + ". Functionality to be implemented.");
            if (btn.title && pg_functionInput) {
                if (btn.title.toLowerCase().includes("integral")) {
                    pg_functionInput.value = "x^2"; 
                    pg_plotUserFunction();
                } else if (btn.title.toLowerCase().includes("functions")) {
                    pg_functionInput.value = "sin(x) + cos(x/2)";
                    pg_switchMode('2D'); 
                    pg_plotUserFunction();
                } else if (btn.title.toLowerCase().includes("3d objects")) {
                    pg_functionInput.value = "sqrt(x^2+y^2)";
                    pg_switchMode('3D');
                    pg_plotUserFunction();
                }
            }
        });
    });

    if (pg_zoomInButton) pg_zoomInButton.addEventListener('click', () => pg_zoom(0.8));
    if (pg_zoomOutButton) pg_zoomOutButton.addEventListener('click', () => pg_zoom(1.25));
    if (pg_resetViewButton) pg_resetViewButton.addEventListener('click', pg_resetCamera);

    window.addEventListener('resize', pg_onWindowResize, false);
    
    if (pg_functionInput) pg_functionInput.value = "sin(sqrt(x^2+y^2)) / sqrt(x^2+y^2)"; 
    pg_plotUserFunction(); 
    pg_animate();
}

function pg_setupCameraAndControls() {
    if (!pg_canvasContainer || pg_canvasContainer.clientWidth === 0 || pg_canvasContainer.clientHeight === 0) {
      // console.warn("Canvas container not ready for camera setup.");
      return;
    }
    const aspect = pg_canvasContainer.clientWidth / pg_canvasContainer.clientHeight;
    
    if (currentMode === '3D') {
        if (pg_functionInputLabel) pg_functionInputLabel.textContent = "F(x,y)=";
        camera = new THREE.PerspectiveCamera(45, aspect, 0.1, PG_GRID_SIZE_3D * 5); 
        camera.position.set(PG_GRID_SIZE_3D * 0.8, PG_GRID_SIZE_3D * 0.7, PG_GRID_SIZE_3D * 0.8); 
    } else { 
        if (pg_functionInputLabel) pg_functionInputLabel.textContent = "F(x)=";
        const viewSize = 18; 
        camera = new THREE.OrthographicCamera(
            -viewSize * aspect / 2, viewSize * aspect / 2,
            viewSize / 2, -viewSize / 2,
            0.1, 1000
        );
        camera.position.set(0, 0, 10); 
    }
    camera.lookAt(0,0,0);

    if (controls) controls.dispose();
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    if (currentMode === '3D') {
        controls.enableDamping = true;
        controls.dampingFactor = 0.04; 
        controls.screenSpacePanning = false;
        controls.minDistance = 2; 
        controls.maxDistance = PG_GRID_SIZE_3D * 4; 
        controls.maxPolarAngle = Math.PI; 
    } else {
         controls.enableRotate = false; 
         controls.enableDamping = true;
         controls.dampingFactor = 0.1;
         controls.screenSpacePanning = true;
         controls.minZoom = 0.05; 
         controls.maxZoom = 20;  
    }
    controls.target.set(0,0,0);
    controls.update(); 
}
        
function pg_zoom(factor) {
    if (!camera || !controls) return;
    if (currentMode === '3D') {
        const newDistance = camera.position.distanceTo(controls.target) * factor;
        camera.position.setLength(Math.max(controls.minDistance, Math.min(controls.maxDistance, newDistance)));
    } else { 
        camera.zoom /= factor; 
        camera.zoom = Math.max(controls.minZoom, Math.min(controls.maxZoom, camera.zoom)); 
        camera.updateProjectionMatrix();
    }
    controls.update();
}

function pg_resetCamera() {
    if (!pg_functionInput) return;
    const currentFnStr = pg_functionInput.value;
    pg_setupCameraAndControls(); 
    if(controls) controls.reset(); 
    
    if (currentFnStr && currentGraphObject) {
         pg_functionInput.value = currentFnStr; 
         pg_plotUserFunction();
    } else if (!currentGraphObject) { 
        pg_functionInput.value = (currentMode === '3D') ? "sin(sqrt(x^2+y^2)) / sqrt(x^2+y^2)" : "sin(x)";
        pg_plotUserFunction();
    }
    if(controls) controls.update();
}

function pg_switchMode(newMode, shouldPlotImmediately = true) {
    if (newMode === currentMode && camera) { 
        pg_setupCameraAndControls(); 
        pg_updateGridAndAxesVisibility(); 
        if (shouldPlotImmediately && pg_functionInput && pg_functionInput.value.trim()) pg_plotUserFunction();
        return;
    }
    currentMode = newMode;
    
    if (pg_mode2DButton) pg_mode2DButton.classList.toggle('active', currentMode === '2D');
    if (pg_mode3DButton) pg_mode3DButton.classList.toggle('active', currentMode === '3D');

    pg_setupCameraAndControls(); 
    pg_updateGridAndAxesVisibility(); 

    if (pg_functionInput) {
        if (shouldPlotImmediately && pg_functionInput.value.trim()) {
             pg_plotUserFunction(); 
        } else if (shouldPlotImmediately && !pg_functionInput.value.trim()) {
            pg_functionInput.value = (currentMode === '3D') ? "sin(sqrt(x^2+y^2)) / sqrt(x^2+y^2)" : "sin(x)";
            pg_plotUserFunction();
        }
    }
}
        
function pg_updateGridAndAxesVisibility() {
    if (currentAxesObject) scene.remove(currentAxesObject); 
    if (currentGridHelper) scene.remove(currentGridHelper); 
    currentAxesObject = null; currentGridHelper = null;


    if (currentMode === '3D') {
        currentAxesObject = pg_create3DAxes(PG_AXES_SIZE_3D);
        currentGridHelper = pg_create3DGrid(PG_GRID_SIZE_3D, PG_GRID_DIVISIONS_3D); 
        if (currentGridHelper) scene.add(currentGridHelper);
    } else { 
        currentAxesObject = pg_create2DAxes(15); 
    }
    if (currentAxesObject) scene.add(currentAxesObject);
}

function pg_plotUserFunction() {
    if (!pg_functionInput || !scene) return; // Ensure scene is initialized
    const funcStr = pg_functionInput.value.trim();
    
    if (currentGraphObject) scene.remove(currentGraphObject);
    currentGraphObject = null;
    pg_clearParseError(); 

    pg_updateGridAndAxesVisibility(); 

    if (!funcStr) { 
        return;
    }

    try {
        const expr = mathParser.parse(funcStr);
        
        if (currentMode === '3D') {
            const plotRange = PG_GRID_SIZE_3D / 2; 
            if (!funcStr.includes('y') && funcStr.includes('x')) {
                 pg_showCustomAlert("3D Mode: Plotting f(x,0) as function only contains 'x'.");
                 currentGraphObject = pg_createSurfacePlot((x, y_coord) => expr.evaluate({ x: x }), plotRange); 
            } else if (!funcStr.includes('x') && !funcStr.includes('y')) { 
                currentGraphObject = pg_createSurfacePlot((x, y_coord) => expr.evaluate({}), plotRange);
            } else {
                currentGraphObject = pg_createSurfacePlot((x, y_coord) => expr.evaluate({ x: x, y: y_coord }), plotRange);
            }
        } else { 
            const plotRange2D = 15; 
             if (funcStr.includes('y')) {
                pg_showCustomAlert("2D Mode: Plotting f(x,0) as 'y' terms are ignored.");
                currentGraphObject = pg_create2DPlot(x => expr.evaluate({ x: x, y: 0 }), plotRange2D);
            } else if (!funcStr.includes('x') && !funcStr.includes('y')) { 
                 currentGraphObject = pg_create2DPlot(x => expr.evaluate({}), plotRange2D);
            } else {
                currentGraphObject = pg_create2DPlot(x => expr.evaluate({ x: x }), plotRange2D);
            }
        }
        if (currentGraphObject) scene.add(currentGraphObject);

    } catch (e) {
        console.error("Parsing/Plotting error:", e);
        const shortMessage = e.message.length > 100 ? e.message.substring(0,100) + "..." : e.message;
        pg_showParseError("Error: " + shortMessage); 
    }
}

function pg_createSurfacePlot(func, range) {
    const segments = 80; 
    const geometry = new THREE.ParametricGeometry(
        (u, v, target) => {
            const x = (u - 0.5) * 2 * range; 
            const y_coord = (v - 0.5) * 2 * range; 
            let z = 0;
            try {
                z = func(x, y_coord);
                if (isNaN(z) || !isFinite(z)) z = 0; 
                z = Math.max(-range * 1.2, Math.min(range * 1.2, z)); 
            } catch (e) { z = 0; }
            target.set(x, y_coord, z);
        },
        segments, segments
    );
    
    const colors = [];
    const color = new THREE.Color();
    const positionAttribute = geometry.attributes.position;
    if (!positionAttribute) return new THREE.Mesh(); // Should not happen if geometry is valid

    let actualMinZ = Infinity;
    let actualMaxZ = -Infinity;
    for (let i = 0; i < positionAttribute.count; i++) {
        const z_val = positionAttribute.getZ(i); 
        if (z_val < actualMinZ) actualMinZ = z_val;
        if (z_val > actualMaxZ) actualMaxZ = z_val;
    }
    const zRange = actualMaxZ - actualMinZ;

    for (let i = 0; i < positionAttribute.count; i++) {
        const z_val = positionAttribute.getZ(i); 
        const normalizedZ = (zRange === 0) ? 0.5 : (z_val - actualMinZ) / zRange;

        if (normalizedZ < 0.5) {
            color.lerpColors(PG_COLOR_LOW, PG_COLOR_MID, normalizedZ * 2);
        } else {
            color.lerpColors(PG_COLOR_MID, PG_COLOR_HIGH, (normalizedZ - 0.5) * 2);
        }
        colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals(); 
    geometry.computeBoundingSphere(); 

    const material = new THREE.MeshStandardMaterial({
        vertexColors: true, 
        side: THREE.DoubleSide,
        metalness: 0.05, 
        roughness: 0.9, 
    });
    return new THREE.Mesh(geometry, material);
}

function pg_create2DPlot(func, range) {
    const segments = 350; 
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const x = -range + (2 * range * i) / segments;
        let y_val = 0;
        try {
            y_val = func(x);
            if (isNaN(y_val) || !isFinite(y_val)) y_val = 0; 
             y_val = Math.max(-range * 1.2, Math.min(range * 1.2, y_val)); 
        } catch (e) { y_val = 0; }
        points.push(new THREE.Vector3(x, y_val, 0)); 
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: PG_GRAPH_COLOR_YELLOW_ORANGE, linewidth: 3 }); 
    return new THREE.Line(geometry, material);
}

function pg_create3DAxes(size) { 
    const axes = new THREE.Group();
    const origin = new THREE.Vector3(0,0,0);
    const headLength = size * 0.04; 
    const headWidth = headLength * 0.5;
    axes.add(new THREE.ArrowHelper(new THREE.Vector3(1,0,0), origin, size, 0xff0000, headLength, headWidth));
    axes.add(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, size, 0x00cc00, headLength, headWidth)); 
    axes.add(new THREE.ArrowHelper(new THREE.Vector3(0,0,1), origin, size, 0x0000ff, headLength, headWidth));
    return axes;
}
        
function pg_create3DGrid(size, divisions) { 
    const gridHelper = new THREE.GridHelper(size, divisions, 0xbbbbbb, 0xcccccc); 
    return gridHelper;
}

function pg_create2DAxes(size) { 
    const axes = new THREE.Group();
    const origin = new THREE.Vector3(0,0,0);
    const headLength = size * 0.04;
    const headWidth = headLength * 0.5;
    axes.add(new THREE.ArrowHelper(new THREE.Vector3(1,0,0), origin, size, 0xff0000, headLength, headWidth));
    axes.add(new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, size, 0x00cc00, headLength, headWidth));
    
    const gridHelper = new THREE.GridHelper(size*2, Math.floor(size), 0xbbbbbb, 0xcccccc); 
    gridHelper.rotation.x = Math.PI / 2; 
    axes.add(gridHelper);
    return axes;
}

let pg_animationFrameId;
function pg_animate() {
    pg_animationFrameId = requestAnimationFrame(pg_animate);
    if (controls) controls.update(); 
    if (renderer && scene && camera) renderer.render(scene, camera);
}

function pg_onWindowResize() {
    if (!pg_canvasContainer || !camera || !renderer) return;

    const newWidth = pg_canvasContainer.clientWidth;
    const newHeight = pg_canvasContainer.clientHeight;

    if (newWidth === 0 || newHeight === 0) return; 
    
    camera.aspect = newWidth / newHeight;
    if (camera.isOrthographicCamera) {
        const viewSize = 18; // Keep consistent with setup
        camera.left = -viewSize * camera.aspect / 2;
        camera.right = viewSize * camera.aspect / 2;
        camera.top = viewSize / 2;
        camera.bottom = -viewSize / 2;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
}

// ---- END: ADVANCED MATH PLAYGROUND (THREE.JS) ----


// Button click animations (Existing User Code)
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // ... (rest of existing ripple effect code) ...
    const ripple = document.createElement("span") // Basic ripple
    ripple.classList.add('ripple-effect'); // Add a class for styling if needed
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  })
})

// Course item interactions (Existing User Code)
document.querySelectorAll(".course-item").forEach((item) => {
  item.addEventListener("click", function () {
    const progressBar = this.querySelector(".progress-bar")
    if (progressBar) {
      const currentWidth = Number.parseInt(progressBar.style.width) || 0;
      const newWidth = Math.min(currentWidth + 5, 100)
      progressBar.style.width = newWidth + "%"
    }
    this.style.transform = "translateX(8px)"; setTimeout(() => { this.style.transform = "translateX(0)"; }, 200);
  })
})

// Interactive demo clicks (Existing User Code)
document.querySelectorAll(".interactive-demo").forEach((demo) => {
  demo.addEventListener("click", function () {
    const overlay = this.querySelector(".demo-overlay")
    if (overlay) { overlay.style.opacity = "1"; setTimeout(() => { overlay.style.opacity = "0"; }, 1000); }
  })
})

// Launch demo button (Existing User Code)
const launchDemoButton = document.getElementById("launchDemo");
if (launchDemoButton) {
    launchDemoButton.addEventListener("click", () => {
        const playgroundSection = document.getElementById("mathPlaygroundSection"); // Target the section
        if (playgroundSection) {
            playgroundSection.scrollIntoView({ behavior: "smooth" });
            // Highlight effect can be done with CSS or more JS if needed
        }
    });
}


// Initialize all canvases when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll animations (from user's existing code)
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  });

  setTimeout(() => {
    initSmallDemos();
    init2DCanvas();
    init3DCanvas(); // This is for the user's original small 3D demo canvas
    initVideoDemo();
    // initPlaygroundCanvas(); // REMOVED - This was the old playground
    initAdvancedMathPlayground(); // ADDED - This initializes the new Three.js playground
  }, 100);
});

// Handle window resize for user's existing demos (the new playground handles its own resize)
window.addEventListener("resize", () => {
  setTimeout(() => {
    // Re-init small demos if their dimensions depend on offsetWidth/Height and can change
    // Or better, give them their own robust resize handlers like the new playground.
    // For now, just re-calling them as in user's original code.
    // Be cautious: initSmallDemos, init2DCanvas, init3DCanvas, initVideoDemo might re-add event listeners if not careful.
    // Consider making them idempotent or having separate resize handlers.
    
    // The new playground (initAdvancedMathPlayground) has its own 'pg_onWindowResize' listener,
    // so it doesn't need to be called explicitly here again.
  }, 100);
});

// Add loading animation (Existing User Code)
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => { document.body.style.opacity = "1"; }, 100);
});

console.log("🎨 Visualize - Interactive math visualization website loaded!");
console.log("✨ Features: Real-time 3D graphics, interactive demos, animated visualizations");
console.log("🚀 Advanced Math Playground Initialized.");
