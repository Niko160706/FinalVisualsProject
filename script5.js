// Application State
let currentView = "hub"
let currentQuiz = null
const currentQuestion = 0
let selectedTopics = []
let questionCount = 10
let difficulty = "adaptive"
const placementTestData = {
  currentQuestion: 0,
  answers: [],
  questions: [
    {
      question: "What is 2 + 3?",
      options: ["4", "5", "6", "7"],
      correct: 1,
    },
    {
      question: "Solve for x: 2x + 4 = 10",
      options: ["x = 2", "x = 3", "x = 4", "x = 6"],
      correct: 1,
    },
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      correct: 1,
    },
    {
      question: "What is 15% of 80?",
      options: ["10", "12", "15", "20"],
      correct: 1,
    },
    {
      question: "Simplify: √16",
      options: ["2", "4", "8", "16"],
      correct: 1,
    },
  ],
}

const quizData = {
  questions: [
    {
      id: 1,
      question: "What is the derivative of x²?",
      answer: "2x",
      userAnswer: "",
      correct: false,
      explanation: "The derivative of x² is 2x using the power rule.",
    },
    {
      id: 2,
      question: "Solve: ∫x dx",
      answer: "x²/2 + C",
      userAnswer: "",
      correct: false,
      explanation: "The integral of x is x²/2 plus the constant of integration C.",
    },
  ],
  currentQuestion: 0,
  score: 0,
  startTime: null,
  endTime: null,
}

// Navigation Functions
function navigateTo(view, param = null) {
  currentView = view

  // Update URL hash
  if (param) {
    window.location.hash = `${view}/${param}`
  } else {
    window.location.hash = view
  }

  switch (view) {
    case "placement":
      renderPlacementTest()
      break
    case "hub":
      renderQuizHub()
      break
    case "active":
      renderActiveQuiz()
      break
    case "review":
      renderQuizReview()
      break
  }
}

// Render Functions
function renderPlacementTest() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("placement-test-template")
  const clone = template.content.cloneNode(true)

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Reset placement test
  placementTestData.currentQuestion = 0
  placementTestData.answers = []
}

function renderQuizHub() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("quiz-hub-template")
  const clone = template.content.cloneNode(true)

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Initialize hub functionality
  initializeQuizHub()
}

function renderActiveQuiz() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("active-quiz-template")
  const clone = template.content.cloneNode(true)

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Initialize quiz
  initializeActiveQuiz()
}

function renderQuizReview() {
  const appContent = document.getElementById("app-content")
  const template = document.getElementById("quiz-review-template")
  const clone = template.content.cloneNode(true)

  appContent.innerHTML = ""
  appContent.appendChild(clone)

  // Initialize review
  initializeQuizReview()
}

// Placement Test Functions
function startPlacementTest() {
  document.getElementById("placement-welcome").style.display = "none"
  document.getElementById("placement-question").style.display = "block"
  loadPlacementQuestion()
}

function loadPlacementQuestion() {
  const current = placementTestData.currentQuestion
  const question = placementTestData.questions[current]

  document.getElementById("placement-question-text").textContent = question.question
  document.getElementById("placement-counter").textContent =
    `Question ${current + 1} of ${placementTestData.questions.length}`

  const progress = ((current + 1) / placementTestData.questions.length) * 100
  document.getElementById("placement-progress").style.width = `${progress}%`

  const optionsContainer = document.getElementById("placement-options")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const button = document.createElement("button")
    button.className = "option-btn"
    button.textContent = option
    button.onclick = () => selectPlacementAnswer(index)
    optionsContainer.appendChild(button)
  })

  document.getElementById("next-btn").disabled = true
}

function selectPlacementAnswer(index) {
  // Remove previous selections
  document.querySelectorAll(".option-btn").forEach((btn) => btn.classList.remove("selected"))

  // Select current option
  document.querySelectorAll(".option-btn")[index].classList.add("selected")

  // Store answer
  placementTestData.answers[placementTestData.currentQuestion] = index

  // Enable next button
  document.getElementById("next-btn").disabled = false
}

function nextPlacementQuestion() {
  placementTestData.currentQuestion++

  if (placementTestData.currentQuestion >= placementTestData.questions.length) {
    completePlacementTest()
  } else {
    loadPlacementQuestion()
  }
}

function skipPlacementQuestion() {
  placementTestData.answers[placementTestData.currentQuestion] = -1 // -1 for skipped
  nextPlacementQuestion()
}

function completePlacementTest() {
  document.getElementById("placement-question").style.display = "none"
  document.getElementById("placement-complete").style.display = "block"

  // Calculate level based on answers (simplified)
  const correctAnswers = placementTestData.answers.filter(
    (answer, index) => answer === placementTestData.questions[index].correct,
  ).length

  let level = "Beginner"
  if (correctAnswers >= 4) level = "Advanced"
  else if (correctAnswers >= 2) level = "Intermediate"

  document.getElementById("placement-level").textContent = level
}

// Quiz Hub Functions
function initializeQuizHub() {
  // Initialize topic selection
  const topicTags = document.querySelectorAll(".tag-btn")
  topicTags.forEach((tag) => {
    tag.addEventListener("click", () => toggleTopic(tag.dataset.topic, tag))
  })

  // Initialize slider
  const slider = document.getElementById("question-count")
  const display = document.getElementById("question-count-display")

  slider.addEventListener("input", (e) => {
    questionCount = e.target.value
    display.textContent = questionCount
  })

  // Initialize difficulty selector
  const difficultyBtns = document.querySelectorAll(".difficulty-btn")
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      difficultyBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      difficulty = btn.dataset.difficulty
    })
  })

  // Initialize search
  const searchInput = document.getElementById("topic-search")
  searchInput.addEventListener("input", (e) => {
    filterTopics(e.target.value)
  })
}

function toggleTopic(topic, element) {
  if (selectedTopics.includes(topic)) {
    selectedTopics = selectedTopics.filter((t) => t !== topic)
    element.classList.remove("selected")
  } else {
    selectedTopics.push(topic)
    element.classList.add("selected")
  }

  updateSelectedTopics()
}

function updateSelectedTopics() {
  const container = document.getElementById("selected-topics")
  container.innerHTML = ""

  selectedTopics.forEach((topic) => {
    const tag = document.createElement("div")
    tag.className = "selected-tag"
    tag.innerHTML = `
      ${topic}
      <span class="remove" onclick="removeTopic('${topic}')">×</span>
    `
    container.appendChild(tag)
  })
}

function removeTopic(topic) {
  selectedTopics = selectedTopics.filter((t) => t !== topic)

  // Update UI
  const tagBtn = document.querySelector(`[data-topic="${topic}"]`)
  if (tagBtn) tagBtn.classList.remove("selected")

  updateSelectedTopics()
}

function filterTopics(query) {
  const tags = document.querySelectorAll(".tag-btn")
  tags.forEach((tag) => {
    const topic = tag.dataset.topic.toLowerCase()
    if (topic.includes(query.toLowerCase())) {
      tag.style.display = "inline-block"
    } else {
      tag.style.display = "none"
    }
  })
}

function generateQuiz() {
  if (selectedTopics.length === 0) {
    alert("Please select at least one topic!")
    return
  }

  // Generate quiz data based on selections
  currentQuiz = {
    topics: [...selectedTopics],
    questionCount: questionCount,
    difficulty: difficulty,
    questions: generateQuestions(),
    currentQuestion: 0,
    score: 0,
    startTime: new Date(),
  }

  navigateTo("active")
}

function generateQuestions() {
  // Generate dummy questions based on selected topics
  const questions = []
  const questionTemplates = {
    algebra: [
      { question: "Solve for x: 2x + 5 = 13", answer: "x = 4" },
      { question: "Simplify: 3x + 2x - x", answer: "4x" },
    ],
    calculus: [
      { question: "What is the derivative of x³?", answer: "3x²" },
      { question: "Evaluate: ∫2x dx", answer: "x² + C" },
    ],
    geometry: [
      { question: "What is the area of a circle with radius 5?", answer: "25π" },
      { question: "Find the perimeter of a square with side 4", answer: "16" },
    ],
  }

  for (let i = 0; i < questionCount; i++) {
    const randomTopic = selectedTopics[Math.floor(Math.random() * selectedTopics.length)]
    const templates = questionTemplates[randomTopic] || questionTemplates.algebra
    const template = templates[Math.floor(Math.random() * templates.length)]

    questions.push({
      id: i + 1,
      question: template.question,
      answer: template.answer,
      userAnswer: "",
      correct: false,
      topic: randomTopic,
    })
  }

  return questions
}

function createPracticeQuiz(topic) {
  selectedTopics = [topic]
  questionCount = 10
  difficulty = "medium"

  // Update UI
  updateSelectedTopics()
  document.getElementById("question-count").value = 10
  document.getElementById("question-count-display").textContent = "10"

  // Update difficulty buttons
  document.querySelectorAll(".difficulty-btn").forEach((btn) => {
    btn.classList.remove("active")
    if (btn.dataset.difficulty === "medium") {
      btn.classList.add("active")
    }
  })

  // Update topic tags
  document.querySelectorAll(".tag-btn").forEach((btn) => {
    btn.classList.remove("selected")
    if (btn.dataset.topic === topic) {
      btn.classList.add("selected")
    }
  })
}

function reviewQuiz(quizId) {
  // Load quiz data for review
  navigateTo("review", quizId)
}

// Active Quiz Functions
function initializeActiveQuiz() {
  if (!currentQuiz) {
    navigateTo("hub")
    return
  }

  loadQuestion()
  createQuestionNavigation()
}

function loadQuestion() {
  const question = currentQuiz.questions[currentQuiz.currentQuestion]

  document.getElementById("question-number").textContent = `Question ${currentQuiz.currentQuestion + 1}`
  document.getElementById("question-text").textContent = question.question
  document.getElementById("progress-text").textContent =
    `Question ${currentQuiz.currentQuestion + 1} of ${currentQuiz.questions.length}`

  const progress = ((currentQuiz.currentQuestion + 1) / currentQuiz.questions.length) * 100
  document.getElementById("quiz-progress").style.width = `${progress}%`

  // Clear previous answer
  document.getElementById("answer-input").value = question.userAnswer || ""
  document.getElementById("answer-feedback").style.display = "none"
  document.getElementById("check-btn").style.display = "inline-flex"

  updateQuestionNavigation()
}

function createQuestionNavigation() {
  const grid = document.getElementById("question-grid")
  grid.innerHTML = ""

  currentQuiz.questions.forEach((_, index) => {
    const btn = document.createElement("button")
    btn.className = "question-nav-btn"
    btn.textContent = index + 1
    btn.onclick = () => navigateToQuestion(index)

    if (index > currentQuiz.currentQuestion) {
      btn.classList.add("locked")
      btn.onclick = null
    }

    grid.appendChild(btn)
  })
}

function updateQuestionNavigation() {
  const buttons = document.querySelectorAll(".question-nav-btn")
  buttons.forEach((btn, index) => {
    btn.classList.remove("current", "answered", "locked")

    if (index === currentQuiz.currentQuestion) {
      btn.classList.add("current")
    } else if (index < currentQuiz.currentQuestion) {
      btn.classList.add("answered")
    } else if (index > currentQuiz.currentQuestion) {
      btn.classList.add("locked")
      btn.onclick = null
    } else {
      btn.onclick = () => navigateToQuestion(index)
    }
  })
}

function navigateToQuestion(index) {
  if (index <= currentQuiz.currentQuestion) {
    currentQuiz.currentQuestion = index
    loadQuestion()
  }
}

function checkAnswer() {
  const userAnswer = document.getElementById("answer-input").value.trim()
  const question = currentQuiz.questions[currentQuiz.currentQuestion]

  if (!userAnswer) {
    alert("Please enter an answer!")
    return
  }

  question.userAnswer = userAnswer
  question.correct = userAnswer.toLowerCase() === question.answer.toLowerCase()

  if (question.correct) {
    currentQuiz.score++
  }

  showFeedback(question.correct)
}

function showFeedback(correct) {
  const feedback = document.getElementById("answer-feedback")
  const icon = document.getElementById("feedback-icon")
  const text = document.getElementById("feedback-text")

  feedback.style.display = "block"
  feedback.className = `answer-feedback ${correct ? "correct" : "incorrect"}`

  if (correct) {
    icon.innerHTML = '<i class="fas fa-check-circle"></i>'
    icon.className = "feedback-icon correct"
    text.textContent = "Correct! Well done."
  } else {
    icon.innerHTML = '<i class="fas fa-times-circle"></i>'
    icon.className = "feedback-icon incorrect"
    const correctAnswer = currentQuiz.questions[currentQuiz.currentQuestion].answer
    text.textContent = `Incorrect. The correct answer is: ${correctAnswer}`
  }

  document.getElementById("check-btn").style.display = "none"

  // Update next button text
  const nextBtn = document.getElementById("next-question-btn")
  if (currentQuiz.currentQuestion === currentQuiz.questions.length - 1) {
    nextBtn.innerHTML = 'Finish Quiz <i class="fas fa-flag-checkered"></i>'
  }
}

function nextQuestion() {
  if (currentQuiz.currentQuestion < currentQuiz.questions.length - 1) {
    currentQuiz.currentQuestion++
    loadQuestion()
  } else {
    finishQuiz()
  }
}

function finishQuiz() {
  currentQuiz.endTime = new Date()
  navigateTo("review")
}

function pauseQuiz() {
  if (confirm("Are you sure you want to pause the quiz? Your progress will be saved.")) {
    navigateTo("hub")
  }
}

// Quiz Review Functions
function initializeQuizReview() {
  if (!currentQuiz) {
    navigateTo("hub")
    return
  }

  // Update summary stats
  document.getElementById("final-score").textContent = `${currentQuiz.score}/${currentQuiz.questions.length}`

  const timeTaken = Math.floor((currentQuiz.endTime - currentQuiz.startTime) / 1000)
  const minutes = Math.floor(timeTaken / 60)
  const seconds = timeTaken % 60
  document.getElementById("final-time").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`

  const accuracy = Math.round((currentQuiz.score / currentQuiz.questions.length) * 100)
  document.getElementById("final-accuracy").textContent = `${accuracy}%`

  // Populate questions review
  const reviewContainer = document.getElementById("questions-review")
  reviewContainer.innerHTML = ""

  currentQuiz.questions.forEach((question, index) => {
    const questionDiv = document.createElement("div")
    questionDiv.className = `review-question ${question.correct ? "correct" : "incorrect"}`

    questionDiv.innerHTML = `
      <div class="review-question-header">
        <span class="question-number">Question ${index + 1}</span>
        <span class="question-status ${question.correct ? "correct" : "incorrect"}">
          ${question.correct ? "Correct" : "Incorrect"}
        </span>
      </div>
      <h4>${question.question}</h4>
      <div class="answer-comparison">
        <div class="answer-item ${question.correct ? "correct-user" : "your-answer"}">
          <div class="answer-label">Your Answer:</div>
          <div>${question.userAnswer || "No answer provided"}</div>
        </div>
        <div class="answer-item correct-answer">
          <div class="answer-label">Correct Answer:</div>
          <div>${question.answer}</div>
        </div>
      </div>
      <div class="ai-explanation">
        <strong>Explanation:</strong> ${question.explanation || "This is the correct solution based on mathematical principles."}
      </div>
    `

    reviewContainer.appendChild(questionDiv)
  })
}

function retakeQuiz() {
  // Reset quiz data
  currentQuiz.questions.forEach((q) => {
    q.userAnswer = ""
    q.correct = false
  })
  currentQuiz.currentQuestion = 0
  currentQuiz.score = 0
  currentQuiz.startTime = new Date()

  navigateTo("active")
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is new (simplified check)
  const isNewUser = !localStorage.getItem("visualize_user_level")

  if (isNewUser) {
    navigateTo("placement")
  } else {
    navigateTo("hub")
  }

  // Handle browser back/forward
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1)
    const [view, param] = hash.split("/")

    if (view && view !== currentView) {
      navigateTo(view, param)
    }
  })

  // Set initial hash if empty
  if (!window.location.hash) {
    window.location.hash = isNewUser ? "placement" : "hub"
  }
})

// Utility Functions
function saveUserProgress() {
  const userData = {
    level: "intermediate",
    completedQuizzes: [],
    preferences: {
      topics: selectedTopics,
      difficulty: difficulty,
    },
  }

  localStorage.setItem("visualize_user_data", JSON.stringify(userData))
}

function loadUserProgress() {
  const userData = localStorage.getItem("visualize_user_data")
  if (userData) {
    return JSON.parse(userData)
  }
  return null
}
