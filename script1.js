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

// Initialize scroll animations
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })
})

// Small Demo Canvases in Visual Grid
function initSmallDemos() {
  // Functions Demo
  const functionsCanvas = document.getElementById("functionsDemo")
  if (functionsCanvas) {
    const ctx = functionsCanvas.getContext("2d")
    functionsCanvas.width = 200
    functionsCanvas.height = 150

    function drawFunctionDemo() {
      ctx.clearRect(0, 0, 200, 150)

      // Draw grid
      ctx.strokeStyle = "#f0f0f0"
      ctx.lineWidth = 1
      for (let i = 0; i <= 200; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 150)
        ctx.stroke()
      }
      for (let i = 0; i <= 150; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(200, i)
        ctx.stroke()
      }

      // Draw parabola
      ctx.strokeStyle = "#C2FA6C"
      ctx.lineWidth = 3
      ctx.beginPath()
      for (let x = 0; x < 200; x += 2) {
        const normalizedX = (x - 100) / 20
        const y = 75 - normalizedX * normalizedX * 2
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Animate a point along the curve
      const time = Date.now() * 0.002
      const pointX = 100 + Math.sin(time) * 60
      const normalizedX = (pointX - 100) / 20
      const pointY = 75 - normalizedX * normalizedX * 2

      ctx.fillStyle = "#FF6B6B"
      ctx.beginPath()
      ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(drawFunctionDemo)
    }
    drawFunctionDemo()
  }

  // Geometry Demo
  const geometryCanvas = document.getElementById("geometryDemo")
  if (geometryCanvas) {
    const ctx = geometryCanvas.getContext("2d")
    geometryCanvas.width = 200
    geometryCanvas.height = 150

    function drawGeometryDemo() {
      ctx.clearRect(0, 0, 200, 150)

      const time = Date.now() * 0.001
      const centerX = 100
      const centerY = 75
      const radius = 40

      // Draw rotating triangle
      ctx.strokeStyle = "#C2FA6C"
      ctx.fillStyle = "rgba(194, 250, 108, 0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()

      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI * 2) / 3 + time
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Draw center point
      ctx.fillStyle = "#FF6B6B"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(drawGeometryDemo)
    }
    drawGeometryDemo()
  }

  // Algebra Demo
  const algebraCanvas = document.getElementById("algebraDemo")
  if (algebraCanvas) {
    const ctx = algebraCanvas.getContext("2d")
    algebraCanvas.width = 200
    algebraCanvas.height = 150

    function drawAlgebraDemo() {
      ctx.clearRect(0, 0, 200, 150)

      const time = Date.now() * 0.001

      // Draw equation visualization
      ctx.fillStyle = "#C2FA6C"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.fillText("x² + 2x + 1", 100, 30)

      // Draw animated bars representing values
      const x = Math.sin(time) * 2 + 2
      const result = x * x + 2 * x + 1

      // x² term
      ctx.fillStyle = "#FF6B6B"
      ctx.fillRect(30, 120 - x * x * 5, 20, x * x * 5)
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText("x²", 40, 140)

      // 2x term
      ctx.fillStyle = "#4ECDC4"
      ctx.fillRect(70, 120 - 2 * x * 5, 20, 2 * x * 5)
      ctx.fillText("2x", 80, 140)

      // constant term
      ctx.fillStyle = "#45B7D1"
      ctx.fillRect(110, 115, 20, 5)
      ctx.fillText("1", 120, 140)

      // result
      ctx.fillStyle = "#C2FA6C"
      ctx.fillRect(150, 120 - result * 2, 20, result * 2)
      ctx.fillText("result", 160, 140)

      requestAnimationFrame(drawAlgebraDemo)
    }
    drawAlgebraDemo()
  }
}

// Interactive 2D Canvas
function init2DCanvas() {
  const canvas = document.getElementById("canvas2d")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = canvas.offsetWidth * 2
  canvas.height = canvas.offsetHeight * 2
  ctx.scale(2, 2)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  let currentFunction = "parabola"
  let animationTime = 0

  function drawGrid() {
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1

    for (let i = 0; i <= width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }

    for (let i = 0; i <= height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }

  function drawFunction() {
    ctx.strokeStyle = "#C2FA6C"
    ctx.lineWidth = 3
    ctx.beginPath()

    let firstPoint = true
    for (let x = 0; x < width; x += 2) {
      const normalizedX = (x - width / 2) / 20
      let y

      switch (currentFunction) {
        case "parabola":
          y = height / 2 - normalizedX * normalizedX * 10
          break
        case "sine":
          y = height / 2 - Math.sin(normalizedX + animationTime) * 50
          break
        case "cosine":
          y = height / 2 - Math.cos(normalizedX + animationTime) * 50
          break
        case "cubic":
          y = height / 2 - normalizedX * normalizedX * normalizedX * 2
          break
      }

      if (firstPoint) {
        ctx.moveTo(x, y)
        firstPoint = false
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw animated point
    const pointX = width / 2 + Math.sin(animationTime * 2) * 100
    const normalizedX = (pointX - width / 2) / 20
    let pointY

    switch (currentFunction) {
      case "parabola":
        pointY = height / 2 - normalizedX * normalizedX * 10
        break
      case "sine":
        pointY = height / 2 - Math.sin(normalizedX + animationTime) * 50
        break
      case "cosine":
        pointY = height / 2 - Math.cos(normalizedX + animationTime) * 50
        break
      case "cubic":
        pointY = height / 2 - normalizedX * normalizedX * normalizedX * 2
        break
    }

    ctx.fillStyle = "#FF6B6B"
    ctx.beginPath()
    ctx.arc(pointX, pointY, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  function animate() {
    ctx.clearRect(0, 0, width, height)
    drawGrid()
    drawFunction()
    animationTime += 0.02
    requestAnimationFrame(animate)
  }

  // Function control buttons
  document.querySelectorAll("#canvas2d").forEach((canvas) => {
    const controls = canvas.parentElement.querySelector(".demo-controls")
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

  animate()
}

// Interactive 3D Canvas
function init3DCanvas() {
  const canvas = document.getElementById("canvas3d")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = canvas.offsetWidth * 2
  canvas.height = canvas.offsetHeight * 2
  ctx.scale(2, 2)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  const centerX = width / 2
  const centerY = height / 2

  let rotation = 0
  let currentShape = "cube"
  let isDragging = false
  let mouseX = 0
  let mouseY = 0

  function rotatePoint(point, rx, ry, rz) {
    // Rotation around Y axis
    const x1 = point.x * Math.cos(ry) - point.z * Math.sin(ry)
    const z1 = point.x * Math.sin(ry) + point.z * Math.cos(ry)

    // Rotation around X axis
    const y2 = point.y * Math.cos(rx) - z1 * Math.sin(rx)
    const z2 = point.y * Math.sin(rx) + z1 * Math.cos(rx)

    return { x: x1, y: y2, z: z2 }
  }

  function projectPoint(point) {
    const scale = 200 / (200 + point.z)
    return {
      x: centerX + point.x * scale,
      y: centerY + point.y * scale,
      z: point.z,
    }
  }

  function drawCube() {
    const size = 60
    const vertices = [
      { x: -size, y: -size, z: -size },
      { x: size, y: -size, z: -size },
      { x: size, y: size, z: -size },
      { x: -size, y: size, z: -size },
      { x: -size, y: -size, z: size },
      { x: size, y: -size, z: size },
      { x: size, y: size, z: size },
      { x: -size, y: size, z: size },
    ]

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]

    const rotatedVertices = vertices.map((v) => rotatePoint(v, rotation * 0.7, rotation, 0))
    const projectedVertices = rotatedVertices.map((v) => projectPoint(v))

    ctx.strokeStyle = "#C2FA6C"
    ctx.lineWidth = 2

    edges.forEach((edge) => {
      const p1 = projectedVertices[edge[0]]
      const p2 = projectedVertices[edge[1]]
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    })
  }

  function drawSphere() {
    const radius = 60
    const rings = 8
    const segments = 12

    ctx.strokeStyle = "#C2FA6C"
    ctx.lineWidth = 2

    // Draw latitude lines
    for (let i = 0; i <= rings; i++) {
      const lat = (i / rings) * Math.PI - Math.PI / 2
      const y = Math.sin(lat) * radius
      const ringRadius = Math.cos(lat) * radius

      ctx.beginPath()
      for (let j = 0; j <= segments; j++) {
        const lon = (j / segments) * Math.PI * 2
        const x = Math.cos(lon) * ringRadius
        const z = Math.sin(lon) * ringRadius

        const rotated = rotatePoint({ x, y, z }, rotation * 0.7, rotation, 0)
        const projected = projectPoint(rotated)

        if (j === 0) ctx.moveTo(projected.x, projected.y)
        else ctx.lineTo(projected.x, projected.y)
      }
      ctx.stroke()
    }

    // Draw longitude lines
    for (let j = 0; j < segments; j++) {
      const lon = (j / segments) * Math.PI * 2

      ctx.beginPath()
      for (let i = 0; i <= rings; i++) {
        const lat = (i / rings) * Math.PI - Math.PI / 2
        const y = Math.sin(lat) * radius
        const ringRadius = Math.cos(lat) * radius
        const x = Math.cos(lon) * ringRadius
        const z = Math.sin(lon) * ringRadius

        const rotated = rotatePoint({ x, y, z }, rotation * 0.7, rotation, 0)
        const projected = projectPoint(rotated)

        if (i === 0) ctx.moveTo(projected.x, projected.y)
        else ctx.lineTo(projected.x, projected.y)
      }
      ctx.stroke()
    }
  }

  function drawPyramid() {
    const size = 60
    const vertices = [
      { x: 0, y: -size, z: 0 }, // top
      { x: -size, y: size, z: -size }, // base corners
      { x: size, y: size, z: -size },
      { x: size, y: size, z: size },
      { x: -size, y: size, z: size },
    ]

    const edges = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4], // top to base
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 1], // base edges
    ]

    const rotatedVertices = vertices.map((v) => rotatePoint(v, rotation * 0.7, rotation, 0))
    const projectedVertices = rotatedVertices.map((v) => projectPoint(v))

    ctx.strokeStyle = "#C2FA6C"
    ctx.lineWidth = 2

    edges.forEach((edge) => {
      const p1 = projectedVertices[edge[0]]
      const p2 = projectedVertices[edge[1]]
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
    })
  }

  function drawTorus() {
    const majorRadius = 50
    const minorRadius = 20
    const majorSegments = 16
    const minorSegments = 8

    ctx.strokeStyle = "#C2FA6C"
    ctx.lineWidth = 2

    // Draw major circles
    for (let i = 0; i < majorSegments; i++) {
      const majorAngle = (i / majorSegments) * Math.PI * 2

      ctx.beginPath()
      for (let j = 0; j <= minorSegments; j++) {
        const minorAngle = (j / minorSegments) * Math.PI * 2

        const x = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.cos(majorAngle)
        const y = minorRadius * Math.sin(minorAngle)
        const z = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.sin(majorAngle)

        const rotated = rotatePoint({ x, y, z }, rotation * 0.7, rotation, 0)
        const projected = projectPoint(rotated)

        if (j === 0) ctx.moveTo(projected.x, projected.y)
        else ctx.lineTo(projected.x, projected.y)
      }
      ctx.stroke()
    }

    // Draw minor circles
    for (let j = 0; j < minorSegments; j++) {
      const minorAngle = (j / minorSegments) * Math.PI * 2

      ctx.beginPath()
      for (let i = 0; i <= majorSegments; i++) {
        const majorAngle = (i / majorSegments) * Math.PI * 2

        const x = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.cos(majorAngle)
        const y = minorRadius * Math.sin(minorAngle)
        const z = (majorRadius + minorRadius * Math.cos(minorAngle)) * Math.sin(majorAngle)

        const rotated = rotatePoint({ x, y, z }, rotation * 0.7, rotation, 0)
        const projected = projectPoint(rotated)

        if (i === 0) ctx.moveTo(projected.x, projected.y)
        else ctx.lineTo(projected.x, projected.y)
      }
      ctx.stroke()
    }
  }

  function animate3D() {
    ctx.clearRect(0, 0, width, height)

    // Draw background grid
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1
    for (let i = -100; i <= 100; i += 20) {
      const p1 = projectPoint(rotatePoint({ x: i, y: 0, z: -100 }, rotation * 0.3, rotation * 0.5, 0))
      const p2 = projectPoint(rotatePoint({ x: i, y: 0, z: 100 }, rotation * 0.3, rotation * 0.5, 0))
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()

      const p3 = projectPoint(rotatePoint({ x: -100, y: 0, z: i }, rotation * 0.3, rotation * 0.5, 0))
      const p4 = projectPoint(rotatePoint({ x: 100, y: 0, z: i }, rotation * 0.3, rotation * 0.5, 0))
      ctx.beginPath()
      ctx.moveTo(p3.x, p3.y)
      ctx.lineTo(p4.x, p4.y)
      ctx.stroke()
    }

    // Draw current shape
    switch (currentShape) {
      case "cube":
        drawCube()
        break
      case "sphere":
        drawSphere()
        break
      case "pyramid":
        drawPyramid()
        break
      case "torus":
        drawTorus()
        break
    }

    if (!isDragging) {
      rotation += 0.01
    }

    requestAnimationFrame(animate3D)
  }

  // Mouse interaction
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  })

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect()
      const newMouseX = e.clientX - rect.left
      const newMouseY = e.clientY - rect.top

      rotation += (newMouseX - mouseX) * 0.01

      mouseX = newMouseX
      mouseY = newMouseY
    }
  })

  canvas.addEventListener("mouseup", () => {
    isDragging = false
  })

  canvas.addEventListener("mouseleave", () => {
    isDragging = false
  })

  // Shape control buttons
  const controls = canvas.parentElement.querySelector(".demo-controls")
  if (controls) {
    controls.addEventListener("click", (e) => {
      if (e.target.classList.contains("control-btn")) {
        controls.querySelectorAll(".control-btn").forEach((btn) => btn.classList.remove("active"))
        e.target.classList.add("active")
        currentShape = e.target.dataset.shape
      }
    })
  }

  animate3D()
}

// Video Demo Canvas
function initVideoDemo() {
  const canvas = document.getElementById("videoDemo")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = canvas.offsetWidth * 2
  canvas.height = canvas.offsetHeight * 2
  ctx.scale(2, 2)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  let isPlaying = false
  let animationTime = 0

  function drawVideoDemo() {
    ctx.clearRect(0, 0, width, height)

    if (isPlaying) {
      // Draw animated mathematical visualization
      const centerX = width / 2
      const centerY = height / 2

      // Draw multiple sine waves
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = `hsl(${120 + i * 30}, 70%, 60%)`
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let x = 0; x < width; x += 2) {
          const y = centerY + Math.sin((x + animationTime * 50 + i * 50) * 0.02) * (30 - i * 5)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // Draw particles
      for (let i = 0; i < 20; i++) {
        const x = (animationTime * 2 + i * 20) % width
        const y = centerY + Math.sin((x + i * 30) * 0.02) * 30

        ctx.fillStyle = "#C2FA6C"
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()
      }

      animationTime += 1
    } else {
      // Draw static preview
      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = "#C2FA6C"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Interactive Math Demo", width / 2, height / 2 - 10)
      ctx.font = "12px Arial"
      ctx.fillText("Click play to start", width / 2, height / 2 + 10)
    }

    requestAnimationFrame(drawVideoDemo)
  }

  // Play button interaction
  const playButton = canvas.parentElement.querySelector(".play-button")
  if (playButton) {
    playButton.addEventListener("click", () => {
      isPlaying = !isPlaying
      playButton.innerHTML = isPlaying
        ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5,3 19,12 5,21"/></svg>'
    })
  }

  drawVideoDemo()
}

// Enhanced Playground Canvas
function initPlaygroundCanvas() {
  const canvas = document.getElementById("playgroundCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  canvas.width = canvas.offsetWidth * 2
  canvas.height = canvas.offsetHeight * 2
  ctx.scale(2, 2)

  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  const centerX = width / 2
  const centerY = height / 2

  let rotationX = 0.5
  let rotationY = 0.3
  let zoom = 1
  let isDragging = false
  let lastMouseX = 0
  let lastMouseY = 0
  let currentFunction = "paraboloid"

  function evaluateFunction(x, z, func) {
    switch (func) {
      case "paraboloid":
        return (x * x + z * z) * 0.01
      case "saddle":
        return (x * x - z * z) * 0.01
      case "wave":
        return Math.sin(x * 0.1) * Math.cos(z * 0.1) * 30
      case "ripple":
        return Math.cos(Math.sqrt(x * x + z * z) * 0.1) * 20
      default:
        return x * x + z * z
    }
  }

  function rotatePoint(point, rx, ry) {
    // Rotation around Y axis
    const x1 = point.x * Math.cos(ry) - point.z * Math.sin(ry)
    const z1 = point.x * Math.sin(ry) + point.z * Math.cos(ry)

    // Rotation around X axis
    const y2 = point.y * Math.cos(rx) - z1 * Math.sin(rx)
    const z2 = point.y * Math.sin(rx) + z1 * Math.cos(rx)

    return { x: x1, y: y2, z: z2 }
  }

  function projectPoint(point) {
    const perspective = 400
    const scale = (zoom * perspective) / (perspective + point.z * 2)

    return {
      x: centerX + point.x * scale,
      y: centerY - point.y * scale,
      z: point.z,
    }
  }

  function drawPlayground() {
    ctx.clearRect(0, 0, width, height)

    // Draw background grid
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1

    for (let i = -200; i <= 200; i += 40) {
      for (let j = -200; j <= 200; j += 40) {
        const p1 = rotatePoint({ x: i, y: 0, z: j }, rotationX, rotationY)
        const p2 = rotatePoint({ x: i + 40, y: 0, z: j }, rotationX, rotationY)
        const p3 = rotatePoint({ x: i, y: 0, z: j + 40 }, rotationX, rotationY)

        const proj1 = projectPoint(p1)
        const proj2 = projectPoint(p2)
        const proj3 = projectPoint(p3)

        ctx.beginPath()
        ctx.moveTo(proj1.x, proj1.y)
        ctx.lineTo(proj2.x, proj2.y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(proj1.x, proj1.y)
        ctx.lineTo(proj3.x, proj3.y)
        ctx.stroke()
      }
    }

    // Draw 3D surface
    const step = 20
    for (let x = -100; x < 100; x += step) {
      for (let z = -100; z < 100; z += step) {
        const y1 = evaluateFunction(x, z, currentFunction)
        const y2 = evaluateFunction(x + step, z, currentFunction)
        const y3 = evaluateFunction(x + step, z + step, currentFunction)
        const y4 = evaluateFunction(x, z + step, currentFunction)

        const p1 = projectPoint(rotatePoint({ x, y: y1, z }, rotationX, rotationY))
        const p2 = projectPoint(rotatePoint({ x: x + step, y: y2, z }, rotationX, rotationY))
        const p3 = projectPoint(rotatePoint({ x: x + step, y: y3, z: z + step }, rotationX, rotationY))
        const p4 = projectPoint(rotatePoint({ x, y: y4, z: z + step }, rotationX, rotationY))

        // Color based on height
        const avgY = (y1 + y2 + y3 + y4) / 4
        const normalizedY = Math.min(Math.max((avgY + 50) / 100, 0), 1)
        const r = Math.floor(194 + normalizedY * 61)
        const g = Math.floor(250 - normalizedY * 50)
        const b = Math.floor(108 - normalizedY * 108)

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.strokeStyle = "#333"
        ctx.lineWidth = 0.5

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.lineTo(p3.x, p3.y)
        ctx.lineTo(p4.x, p4.y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }

    // Draw axes
    ctx.lineWidth = 3

    // X axis (red)
    ctx.strokeStyle = "#FF5555"
    const xAxis1 = projectPoint(rotatePoint({ x: -150, y: 0, z: 0 }, rotationX, rotationY))
    const xAxis2 = projectPoint(rotatePoint({ x: 150, y: 0, z: 0 }, rotationX, rotationY))
    ctx.beginPath()
    ctx.moveTo(xAxis1.x, xAxis1.y)
    ctx.lineTo(xAxis2.x, xAxis2.y)
    ctx.stroke()

    // Y axis (green)
    ctx.strokeStyle = "#55FF55"
    const yAxis1 = projectPoint(rotatePoint({ x: 0, y: -100, z: 0 }, rotationX, rotationY))
    const yAxis2 = projectPoint(rotatePoint({ x: 0, y: 100, z: 0 }, rotationX, rotationY))
    ctx.beginPath()
    ctx.moveTo(yAxis1.x, yAxis1.y)
    ctx.lineTo(yAxis2.x, yAxis2.y)
    ctx.stroke()

    // Z axis (blue)
    ctx.strokeStyle = "#5555FF"
    const zAxis1 = projectPoint(rotatePoint({ x: 0, y: 0, z: -150 }, rotationX, rotationY))
    const zAxis2 = projectPoint(rotatePoint({ x: 0, y: 0, z: 150 }, rotationX, rotationY))
    ctx.beginPath()
    ctx.moveTo(zAxis1.x, zAxis1.y)
    ctx.lineTo(zAxis2.x, zAxis2.y)
    ctx.stroke()

    // Draw function info
    ctx.fillStyle = "#000"
    ctx.font = "bold 16px Arial"
    ctx.fillText(`f(x,z) = ${currentFunction}`, 20, 30)
    ctx.font = "12px Arial"
    ctx.fillText("Drag to rotate | Use controls to zoom", 20, 50)

    requestAnimationFrame(drawPlayground)
  }

  // Mouse interaction
  canvas.addEventListener("mousedown", (e) => {
    isDragging = true
    const rect = canvas.getBoundingClientRect()
    lastMouseX = e.clientX - rect.left
    lastMouseY = e.clientY - rect.top
  })

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      const dx = mouseX - lastMouseX
      const dy = mouseY - lastMouseY

      rotationY += dx * 0.01
      rotationX += dy * 0.01

      lastMouseX = mouseX
      lastMouseY = mouseY
    }
  })

  canvas.addEventListener("mouseup", () => {
    isDragging = false
  })

  canvas.addEventListener("mouseleave", () => {
    isDragging = false
  })

  // Touch support
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault()
    isDragging = true
    const rect = canvas.getBoundingClientRect()
    lastMouseX = e.touches[0].clientX - rect.left
    lastMouseY = e.touches[0].clientY - rect.top
  })

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault()
    if (isDragging) {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.touches[0].clientX - rect.left
      const mouseY = e.touches[0].clientY - rect.top

      const dx = mouseX - lastMouseX
      const dy = mouseY - lastMouseY

      rotationY += dx * 0.01
      rotationX += dy * 0.01

      lastMouseX = mouseX
      lastMouseY = mouseY
    }
  })

  canvas.addEventListener("touchend", () => {
    isDragging = false
  })

  // Control buttons
  document.getElementById("rotateLeft")?.addEventListener("click", () => {
    rotationY -= 0.2
  })

  document.getElementById("rotateRight")?.addEventListener("click", () => {
    rotationY += 0.2
  })

  document.getElementById("zoomIn")?.addEventListener("click", () => {
    zoom = Math.min(zoom + 0.1, 2)
  })

  document.getElementById("zoomOut")?.addEventListener("click", () => {
    zoom = Math.max(zoom - 0.1, 0.5)
  })

  document.getElementById("resetView")?.addEventListener("click", () => {
    rotationX = 0.5
    rotationY = 0.3
    zoom = 1
  })

  // Function selector buttons
  document.querySelectorAll(".function-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".function-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentFunction = btn.dataset.func
    })
  })

  // Custom function input
  document.getElementById("plotFunction")?.addEventListener("click", () => {
    const input = document.getElementById("functionInput")
    if (input && input.value) {
      // For demo purposes, we'll just switch to a predefined function
      // In a real implementation, you'd parse and evaluate the custom function
      currentFunction = "wave"
    }
  })

  drawPlayground()
}

// Button click animations
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(255, 255, 255, 0.3)"
    ripple.style.transform = "scale(0)"
    ripple.style.animation = "ripple 0.6s linear"
    ripple.style.pointerEvents = "none"

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Course item interactions
document.querySelectorAll(".course-item").forEach((item) => {
  item.addEventListener("click", function () {
    // Animate progress bar
    const progressBar = this.querySelector(".progress-bar")
    if (progressBar) {
      const currentWidth = Number.parseInt(progressBar.style.width)
      const newWidth = Math.min(currentWidth + 5, 100)
      progressBar.style.width = newWidth + "%"
    }

    // Add completion effect
    this.style.transform = "translateX(8px)"
    setTimeout(() => {
      this.style.transform = "translateX(0)"
    }, 200)
  })
})

// Interactive demo clicks
document.querySelectorAll(".interactive-demo").forEach((demo) => {
  demo.addEventListener("click", function () {
    const overlay = this.querySelector(".demo-overlay")
    if (overlay) {
      overlay.style.opacity = "1"
      setTimeout(() => {
        overlay.style.opacity = "0"
      }, 1000)
    }
  })
})

// Launch demo button
document.getElementById("launchDemo")?.addEventListener("click", () => {
  const playground = document.querySelector(".playground")
  if (playground) {
    playground.scrollIntoView({ behavior: "smooth" })

    // Add highlight effect
    playground.style.boxShadow = "0 0 20px rgba(194, 250, 108, 0.5)"
    setTimeout(() => {
      playground.style.boxShadow = "none"
    }, 2000)
  }
})

// Initialize all canvases when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initSmallDemos()
    init2DCanvas()
    init3DCanvas()
    initVideoDemo()
    initPlaygroundCanvas()
  }, 100)
})

// Handle window resize
window.addEventListener("resize", () => {
  setTimeout(() => {
    initSmallDemos()
    init2DCanvas()
    init3DCanvas()
    initVideoDemo()
    initPlaygroundCanvas()
  }, 100)
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})

console.log("🎨 Visualize - Interactive math visualization website loaded!")
console.log("✨ Features: Real-time 3D graphics, interactive demos, animated visualizations")
