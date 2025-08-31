document.addEventListener('DOMContentLoaded', function() {
  console.log("Portfolio loaded successfully");
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              const headerOffset = document.getElementById('main-header').offsetHeight;
              const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerOffset - 20;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Animate text elements on scroll
  const animItems = document.querySelectorAll('.anim-item, .welcome-text, .section-title, .job-card, .project-card, .skill-category, .contact-link, .download-cv');
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              anime({
                  targets: entry.target,
                  opacity: [0, 1],
                  translateY: [20, 0],
                  easing: 'easeOutQuad',
                  duration: 800,
                  delay: anime.stagger(100)
              });
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);

  animItems.forEach(item => {
      item.style.opacity = "0";
      observer.observe(item);
  });

  // Dynamic Background Animation
  const bgContainer = document.querySelector('.background-elements');
  const numNodes = 40;
  const nodes = [];

  // Create a node element
  function createNode() {
      const node = document.createElement('div');
      node.className = 'background-node';
      bgContainer.appendChild(node);
      nodes.push({ element: node, x: Math.random(), y: Math.random() });
  }

  // Connect nodes to their closest neighbors
  function createConnections() {
      nodes.forEach((source, i) => {
          const connections = findClosestNodes(nodes, i, 3);
          connections.forEach(targetIndex => {
              const connection = document.createElement('div');
              connection.className = 'background-line';
              
              const target = nodes[targetIndex];
              
              // Calculate position, length, and angle of the line
              const dx = (target.x - source.x) * window.innerWidth;
              const dy = (target.y - source.y) * window.innerHeight;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * 180 / Math.PI;

              connection.style.width = `${distance}px`;
              connection.style.left = `${source.x * 100}%`;
              connection.style.top = `${source.y * 100}%`;
              connection.style.transform = `rotate(${angle}deg)`;

              bgContainer.appendChild(connection);
          });
      });
  }

  // Find closest nodes
  function findClosestNodes(allNodes, sourceIndex, count) {
      const distances = [];
      const sourceNode = allNodes[sourceIndex];

      allNodes.forEach((node, i) => {
          if (i !== sourceIndex) {
              const dx = node.x - sourceNode.x;
              const dy = node.y - sourceNode.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              distances.push({ index: i, distance: distance });
          }
      });

      distances.sort((a, b) => a.distance - b.distance);
      return distances.slice(0, count).map(d => d.index);
  }
  
  // Animate the elements
  function animateBackground() {
      anime({
          targets: '.background-node',
          scale: [0, 1],
          opacity: [0.3, 0.8],
          delay: anime.stagger(100),
          duration: 1000,
          easing: 'easeOutElastic(1, .5)'
      });
      
      anime({
          targets: '.background-node',
          translateY: ['-5%', '5%'],
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine',
          duration: function() { return anime.random(2000, 4000); }
      });
      
      anime({
          targets: '.background-line',
          opacity: [0, 0.4],
          delay: anime.stagger(50),
          duration: 1000,
          easing: 'easeInOutQuad'
      });
  }
  
  for (let i = 0; i < numNodes; i++) {
      createNode();
  }
  createConnections();
  animateBackground();
});