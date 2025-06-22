// Application State
let currentView = "catalog"
let currentCourse = null
let currentLesson = null

// Course Data
const courseData = {
  "solving-equations": {
    title: "Solving Equations",
    description: "Master the art of solving mathematical equations step by step",
    lessons: [
      { id: 1, title: "Basic Addition", type: "lesson", status: "completed" },
      { id: 2, title: "Subtraction", type: "lesson", status: "completed" },
      { id: 3, title: "Practice: +/-", type: "practice", status: "completed" },
      { id: 4, title: "Multiplication Basics", type: "lesson", status: "current" },
      { id: 5, title: "Division", type: "lesson", status: "locked" },
      { id: 6, title: "Test: Basic Ops", type: "test", status: "locked" },
      { id: 7, title: "Bonus: Speed Math", type: "bonus", status: "locked" },
    ],
  },
  "visual-algebra": {
    title: "Visual Algebra",
    description: "Learn algebra through visual representations and interactive examples",
    lessons: [
      { id: 1, title: "Variables Introduction", type: "lesson", status: "completed" },
      { id: 2, title: "Linear Equations", type: "lesson", status: "current" },
      { id: 3, title: "Graphing Lines", type: "lesson", status: "locked" },
      { id: 4, title: "Systems of Equations", type: "lesson", status: "locked" },
      { id: 5, title: "Quadratic Functions", type: "lesson", status: "locked" },
    ],
  },
}

// Level data for learning path (from original script)
const mathLevels = [
  { id: 1, title: "Basic Addition", type: "lesson", status: "completed", position: { x: 50, y: 90 } },
  { id: 2, title: "Subtraction", type: "lesson", status: "completed", position: { x: 20, y: 75 } },
  { id: 3, title: "Practice: +/-", type: "practice", status: "completed", position: { x: 80, y: 60 } },
  { id: 4, title: "Multiplication Basics", type: "lesson", status: "current", position: { x: 30, y: 45 } },
  { id: 5, title: "Division", type: "lesson", status: "locked", position: { x: 70, y: 30 } },
  { id: 6, title: "Test: Basic Ops", type: "test", status: "locked", position: { x: 50, y: 15 } },
  { id: 7, title: "Bonus: Speed Math", type: "bonus", status: "locked", position: { x: 20, y: 5 } },
  { id: 8, title: "Advanced Addition", type: "lesson", status: "locked", position: { x: 60, y: -10 } },
  { id: 9, title: "Advanced Subtraction", type: "lesson", status: "locked", position: { x: 30, y: -25 } },
  { id: 10, title: "Complex Operations", type: "test", status: "locked", position: { x: 70, y: -40 } },
]

// Lesson data
const lessonData = {
  "multiplication-basics": {
    title: "Multiplication Basics",
    subtitle: "Learn the fundamentals of multiplication with visual examples",
    number: 4,
    type: "Interactive",
    course: "solving-equations",
  },
  "lesson-1": {
    title: "Basic Addition",
    subtitle: "Understanding addition operations",
    number: 1,
    type: "Lesson",
    course: "solving-equations",
  },
  "lesson-2": {
    title: "Subtraction",
    subtitle: "Learning subtraction methods",
    number: 2,
    type: "Lesson",
    course: "solving-equations",
  },
  "lesson-3": {
    title: "Practice: +/-",
    subtitle: "Practice addition and subtraction",
    number: 3,
    type: "Practice",
    course: "solving-equations",
  },
}

// Navigation Functions
function navigateTo(view, param = null) {
  currentView = view

  switch (view) {
    case "catalog":
      renderCatalogView()
      break
    case "learning-path":
      currentCourse = param
      renderLearningPathView()
      break
    case "lesson":
      currentLesson = param
      renderLessonView()
      break
  }
}

function getCurrentCourse() {
  return currentCourse
}

function navigateToPreviousLesson() {
  // Implementation for previous lesson navigation
  console.log("Navigate to previous lesson")
}

function navigateToNextLesson() {
  // Implementation for next lesson navigation
  console.log("Navigate to next lesson")
}

// Render Functions
function renderCatalogView() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("catalog-template")
  const clone = template.content.cloneNode(true)

  appContent.innerHTML = ""
  appContent.appendChild(clone)
}

function renderLearningPathView() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("learning-path-template")
  const clone = template.content.cloneNode(true)

  // Update course information
  if (currentCourse && courseData[currentCourse]) {
    const course = courseData[currentCourse]
    clone.getElementById("course-title").textContent = course.title
    clone.getElementById("course-description").textContent = course.description

    // Find current lesson
    const currentLessonData = course.lessons.find((lesson) => lesson.status === "current")
    if (currentLessonData) {
      clone.getElementById("current-lesson-title").textContent = currentLessonData.title
    }
  }

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Initialize learning path functionality
  initializeLearningPath()
}

function renderLessonView() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("lesson-template")
  const clone = template.content.cloneNode(true)

  // Update lesson information
  if (currentLesson && lessonData[currentLesson]) {
    const lesson = lessonData[currentLesson]
    clone.getElementById("lesson-title").textContent = lesson.title

    // Update lesson meta
    const lessonNumber = clone.querySelector(".lesson-number")
    if (lessonNumber) lessonNumber.textContent = `Lesson ${lesson.number}`
  }

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Populate lesson navigation immediately after DOM is ready
  populateLessonNavigation()
}

function populateLessonNavigation() {
  const lessonNav = document.getElementById("lesson-nav")
  if (!lessonNav) {
    console.log("lesson-nav not found")
    return
  }

  // Use default course data if currentCourse is not set
  const courseKey = currentCourse || "solving-equations"
  const course = courseData[courseKey]

  if (!course) {
    console.log("Course data not found for:", courseKey)
    return
  }

  lessonNav.innerHTML = ""

  course.lessons.forEach((lesson, index) => {
    const navItem = document.createElement("a")
    navItem.className = `lesson-nav-item ${lesson.status === "current" ? "active" : ""} ${lesson.status}`
    navItem.href = "#"
    navItem.onclick = (e) => {
      e.preventDefault()
      if (lesson.status !== "locked") {
        // Navigate to lesson
        navigateTo("lesson", `lesson-${lesson.id}`)
      }
    }

    navItem.innerHTML = `
      <div class="lesson-nav-icon">
        ${getNavIcon(lesson)}
      </div>
      <div>
        <div style="font-weight: 500; font-size: 0.875rem;">${lesson.title}</div>
        <div style="font-size: 0.75rem; opacity: 0.7;">${lesson.type}</div>
      </div>
    `

    lessonNav.appendChild(navItem)
  })
}

function getNavIcon(lesson) {
  if (lesson.status === "completed") {
    return '<i class="fas fa-check"></i>'
  }
  if (lesson.status === "current") {
    return '<i class="fas fa-play"></i>'
  }
  if (lesson.type === "test") {
    return '<i class="fas fa-clipboard-check"></i>'
  }
  if (lesson.type === "practice") {
    return '<i class="fas fa-dumbbell"></i>'
  }
  return '<i class="fas fa-lock"></i>'
}

// Learning Path Functionality (adapted from original script)
function initializeLearningPath() {
  let selectedLevel = 4
  const levelNodesContainer = document.getElementById("level-nodes")
  const draggableContent = document.getElementById("draggable-content")
  const draggableContainer = document.getElementById("draggable-path")

  if (!levelNodesContainer || !draggableContent || !draggableContainer) return

  // Create level nodes
  function createLevelNodes() {
    levelNodesContainer.innerHTML = ""

    mathLevels.forEach((level) => {
      const node = document.createElement("div")
      node.className = "level-node"
      node.dataset.id = level.id
      node.style.left = `${level.position.x}%`
      node.style.top = `${level.position.y}%`

      const nodeInner = document.createElement("div")
      nodeInner.className = `node-inner node-${level.status}`
      nodeInner.innerHTML = getNodeIcon(level)

      const nodeNumber = document.createElement("div")
      nodeNumber.className = "node-number"
      nodeNumber.textContent = level.id

      if (level.status !== "locked") {
        node.addEventListener("click", (e) => {
          if (!isDragging) {
            selectLevel(level.id)
            e.stopPropagation()
          }
        })
      }

      node.appendChild(nodeInner)
      node.appendChild(nodeNumber)

      if (level.id === selectedLevel) {
        node.classList.add("node-selected")
        addTooltip(node, level.title)
      }

      levelNodesContainer.appendChild(node)
    })
  }

  function getNodeIcon(level) {
    if (level.status === "completed") {
      return '<i class="fas fa-check" style="font-size: 1.5rem;"></i>'
    }
    if (level.status === "current") {
      return '<i class="fas fa-play" style="font-size: 1.5rem;"></i>'
    }
    if (level.type === "bonus") {
      return '<i class="fas fa-star" style="font-size: 1.5rem;"></i>'
    }
    if (level.type === "test") {
      return '<i class="fas fa-clipboard-check" style="font-size: 1.5rem;"></i>'
    }
    return '<i class="fas fa-lock" style="font-size: 1.5rem;"></i>'
  }

  function addTooltip(node, title) {
    const tooltip = document.createElement("div")
    tooltip.className = "node-tooltip"

    const tooltipText = document.createElement("div")
    tooltipText.className = "node-tooltip-text"
    tooltipText.textContent = title

    tooltip.appendChild(tooltipText)
    node.appendChild(tooltip)
  }

  function selectLevel(id) {
    const previousSelected = document.querySelector(".node-selected")
    if (previousSelected) {
      previousSelected.classList.remove("node-selected")
      const tooltip = previousSelected.querySelector(".node-tooltip")
      if (tooltip) {
        tooltip.remove()
      }
    }

    selectedLevel = id
    const newSelected = document.querySelector(`.level-node[data-id="${id}"]`)
    if (newSelected) {
      newSelected.classList.add("node-selected")
      const level = mathLevels.find((l) => l.id === id)
      if (level) {
        addTooltip(newSelected, level.title)
      }
    }
  }

  // Draggable functionality
  let isDragging = false
  let startX, startY, scrollLeft, scrollTop
  let translateX = 0
  let translateY = 0

  function initDragging() {
    draggableContainer.addEventListener("mousedown", startDrag)
    draggableContainer.addEventListener("touchstart", startDrag, { passive: false })
    document.addEventListener("mouseup", endDrag)
    document.addEventListener("touchend", endDrag)
    document.addEventListener("mousemove", drag)
    document.addEventListener("touchmove", drag, { passive: false })
  }

  function startDrag(e) {
    isDragging = true
    draggableContainer.style.cursor = "grabbing"

    if (e.type === "touchstart") {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    } else {
      startX = e.clientX
      startY = e.clientY
      e.preventDefault()
    }

    scrollLeft = translateX
    scrollTop = translateY
  }

  function drag(e) {
    if (!isDragging) return

    let x, y
    if (e.type === "touchmove") {
      x = e.touches[0].clientX
      y = e.touches[0].clientY
      e.preventDefault()
    } else {
      x = e.clientX
      y = e.clientY
    }

    const moveX = x - startX
    const moveY = y - startY

    translateX = Math.min(Math.max(scrollLeft + moveX, -300), 300)
    translateY = Math.min(Math.max(scrollTop + moveY, -100), 100)

    draggableContent.style.transform = `translate(${translateX}px, ${translateY}px)`
  }

  function endDrag() {
    isDragging = false
    draggableContainer.style.cursor = "grab"
  }

  // Initialize
  createLevelNodes()
  initDragging()
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Start with catalog view
  navigateTo("catalog")

  // Add button click animations
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = ""
      }, 150)
    }
  })
})
