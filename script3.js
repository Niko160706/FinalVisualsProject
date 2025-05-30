document.addEventListener('DOMContentLoaded', function() {
  // Level data
  const mathLevels = [
    { id: 1, title: "Basic Addition", type: "lesson", status: "completed", position: { x: 50, y: 90 } },
    { id: 2, title: "Subtraction", type: "lesson", status: "completed", position: { x: 20, y: 75 } },
    { id: 3, title: "Practice: +/-", type: "practice", status: "completed", position: { x: 80, y: 60 } },
    { id: 4, title: "Multiplication", type: "lesson", status: "current", position: { x: 30, y: 45 } },
    { id: 5, title: "Division", type: "lesson", status: "locked", position: { x: 70, y: 30 } },
    { id: 6, title: "Test: Basic Ops", type: "test", status: "locked", position: { x: 50, y: 15 } },
    { id: 7, title: "Bonus: Speed Math", type: "bonus", status: "locked", position: { x: 20, y: 5 } },
    // Adding more levels to demonstrate scrolling
    { id: 8, title: "Advanced Addition", type: "lesson", status: "locked", position: { x: 60, y: -10 } },
    { id: 9, title: "Advanced Subtraction", type: "lesson", status: "locked", position: { x: 30, y: -25 } },
    { id: 10, title: "Complex Operations", type: "test", status: "locked", position: { x: 70, y: -40 } },
  ];

  let selectedLevel = 4; // Default selected level
  const levelNodesContainer = document.getElementById('level-nodes');
  const draggableContent = document.getElementById('draggable-content');
  const draggableContainer = document.getElementById('draggable-path');

  // Create level nodes
  function createLevelNodes() {
    mathLevels.forEach(level => {
      const node = document.createElement('div');
      node.className = 'level-node';
      node.dataset.id = level.id;
      node.style.left = `${level.position.x}%`;
      node.style.top = `${level.position.y}%`;
      
      // Create node inner element
      const nodeInner = document.createElement('div');
      nodeInner.className = `node-inner node-${level.status}`;
      
      // Add appropriate icon based on status and type
      nodeInner.innerHTML = getNodeIcon(level);
      
      // Create node number
      const nodeNumber = document.createElement('div');
      nodeNumber.className = 'node-number';
      nodeNumber.textContent = level.id;
      
      // Add click event if not locked
      if (level.status !== 'locked') {
        node.addEventListener('click', (e) => {
          // Only select if not dragging
          if (!isDragging) {
            selectLevel(level.id);
            e.stopPropagation();
          }
        });
      }
      
      // Add to DOM
      node.appendChild(nodeInner);
      node.appendChild(nodeNumber);
      
      // Add tooltip if selected
      if (level.id === selectedLevel) {
        node.classList.add('node-selected');
        addTooltip(node, level.title);
      }
      
      levelNodesContainer.appendChild(node);
    });
  }

  // Get appropriate icon for node based on status and type
  function getNodeIcon(level) {
    if (level.status === 'completed') {
      return '<i class="fas fa-check-circle" style="font-size: 1.5rem; color: black;"></i>';
    }
    if (level.status === 'current') {
      return '<i class="fas fa-play" style="font-size: 1.5rem; color: white;"></i>';
    }
    if (level.type === 'bonus') {
      return '<i class="fas fa-star" style="font-size: 1.5rem; color: #9ca3af;"></i>';
    }
    if (level.type === 'test') {
      return '<i class="fas fa-bullseye" style="font-size: 1.5rem; color: #9ca3af;"></i>';
    }
    return '<i class="fas fa-lock" style="font-size: 1.5rem; color: #9ca3af;"></i>';
  }

  // Add tooltip to node
  function addTooltip(node, title) {
    const tooltip = document.createElement('div');
    tooltip.className = 'node-tooltip';
    
    const tooltipText = document.createElement('div');
    tooltipText.className = 'node-tooltip-text';
    tooltipText.textContent = title;
    
    tooltip.appendChild(tooltipText);
    node.appendChild(tooltip);
  }

  // Select a level
  function selectLevel(id) {
    // Remove previous selection
    const previousSelected = document.querySelector('.node-selected');
    if (previousSelected) {
      previousSelected.classList.remove('node-selected');
      const tooltip = previousSelected.querySelector('.node-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    }
    
    // Add new selection
    selectedLevel = id;
    const newSelected = document.querySelector(`.level-node[data-id="${id}"]`);
    if (newSelected) {
      newSelected.classList.add('node-selected');
      const level = mathLevels.find(l => l.id === id);
      if (level) {
        addTooltip(newSelected, level.title);
      }
    }
  }

  // Add button click animations
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
      button.style.transform = button.classList.contains('btn-primary') 
        ? 'scale(0.95)' 
        : 'translateY(1px)';
    });
    
    button.addEventListener('mouseup', () => {
      button.style.transform = '';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

  // Draggable functionality
  let isDragging = false;
  let startX, startY, scrollLeft, scrollTop;
  let translateX = 0;
  let translateY = 0;

  // Initialize dragging
  function initDragging() {
    draggableContainer.addEventListener('mousedown', startDrag);
    draggableContainer.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
  }

  function startDrag(e) {
    isDragging = true;
    draggableContainer.style.cursor = 'grabbing';
    
    // Get initial position
    if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    } else {
      startX = e.clientX;
      startY = e.clientY;
      e.preventDefault(); // Prevent text selection during drag
    }
    
    // Store current scroll position
    scrollLeft = translateX;
    scrollTop = translateY;
  }

  function drag(e) {
    if (!isDragging) return;
    
    let x, y;
    if (e.type === 'touchmove') {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      e.preventDefault(); // Prevent page scrolling while dragging
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    
    // Calculate how far the mouse has moved
    const moveX = (x - startX);
    const moveY = (y - startY);
    
    // Update position (with limits)
    translateX = Math.min(Math.max(scrollLeft + moveX, -300), 300);
    translateY = Math.min(Math.max(scrollTop + moveY, -100), 100);
    
    // Apply the transform
    draggableContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }

  function endDrag() {
    isDragging = false;
    draggableContainer.style.cursor = 'grab';
  }

  // Initialize
  createLevelNodes();
  initDragging();
});