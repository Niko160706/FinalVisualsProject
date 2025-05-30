document.addEventListener("DOMContentLoaded", () => {
  // Function Playground
  initFunctionPlayground()

  // Example buttons
  const exampleButtons = document.querySelectorAll(".example-button")
  const functionInput = document.getElementById("function-input")

  exampleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      exampleButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Update function input
      functionInput.value = this.dataset.function

      // Update visualization
      updateFunctionVisualization(this.dataset.function)
    })
  })

  // Play button
  const playButton = document.getElementById("play-function")
  playButton.addEventListener("click", () => {
    updateFunctionVisualization(functionInput.value)
  })

  // Initialize with default function
  updateFunctionVisualization("x²")

  // Button event listeners
  const getStartedButton = document.querySelector(".get-started-button")
  const watchDemoButton = document.querySelector(".watch-demo-button")

  if (getStartedButton) {
    getStartedButton.addEventListener("click", () => {
      console.log("Get Started clicked")
      // Add your navigation logic here
    })
  }

  if (watchDemoButton) {
    watchDemoButton.addEventListener("click", () => {
      console.log("Watch Demo clicked")
      // Add your demo logic here
    })
  }
})

// Three.js Function Visualization
let scene, camera, renderer, controls
let functionMesh, gridHelper

function initFunctionPlayground() {
  const container = document.getElementById("function-canvas")

  // Create scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf9fafb)

  // Create camera
  camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  camera.position.set(0, 0, 5)

  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  container.appendChild(renderer.domElement)

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(10, 10, 10)
  scene.add(pointLight)

  // Add grid
  gridHelper = new THREE.GridHelper(20, 20, 0xc2fa6c, 0xc2fa6c)
  gridHelper.material.opacity = 0.5
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // Add controls
  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // Handle window resize
  window.addEventListener("resize", onWindowResize)

  // Start animation loop
  animate()
}

function onWindowResize() {
  const container = document.getElementById("function-canvas")
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

function updateFunctionVisualization(functionStr) {
  // Remove previous function mesh if it exists
  if (functionMesh) {
    scene.remove(functionMesh)
  }

  // Create new function visualization based on the input
  const points = []

  if (functionStr.includes("x²")) {
    // Parabola
    for (let i = -50; i <= 50; i++) {
      const x = i / 10
      const y = x * x
      points.push(new THREE.Vector3(x, y, 0))
    }
  } else if (functionStr.includes("sin")) {
    // Sine wave
    for (let i = -50; i <= 50; i++) {
      const x = i / 5
      const y = Math.sin(x)
      points.push(new THREE.Vector3(x, y, 0))
    }
  } else if (functionStr.includes("cos")) {
    // Cosine wave
    for (let i = -50; i <= 50; i++) {
      const x = i / 5
      const y = Math.cos(x)
      points.push(new THREE.Vector3(x, y, 0))
    }
  } else if (functionStr.includes("x³")) {
    // Cubic function
    for (let i = -50; i <= 50; i++) {
      const x = i / 10
      const y = x * x * x
      points.push(new THREE.Vector3(x, y, 0))
    }
  } else if (functionStr.includes("x² + 2*x + 1")) {
    // Quadratic function
    for (let i = -50; i <= 50; i++) {
      const x = i / 10
      const y = x * x + 2 * x + 1
      points.push(new THREE.Vector3(x, y, 0))
    }
  } else {
    // Default to x²
    for (let i = -50; i <= 50; i++) {
      const x = i / 10
      const y = x * x
      points.push(new THREE.Vector3(x, y, 0))
    }
  }

  // Create line geometry
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
  functionMesh = new THREE.Line(geometry, material)
  scene.add(functionMesh)

  // Add some 3D objects for reference
  if (!scene.getObjectByName("box")) {
    const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.set(-2, -1, 0)
    box.name = "box"
    scene.add(box)
  }

  if (!scene.getObjectByName("sphere")) {
    const sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16)
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      wireframe: true,
    })
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphere.position.set(2, -1, 0)
    sphere.name = "sphere"
    scene.add(sphere)
  }

  // Reset camera position for better view
  camera.position.set(0, 0, 5)
  controls.update()
}

// Add scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".stat-card, .course-card, .topic-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize scroll animations
animateOnScroll()
