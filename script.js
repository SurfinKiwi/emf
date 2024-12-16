const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

// UI Elements
const chargeInput = document.getElementById('chargeInput');
const velocityInput = document.getElementById('velocityInput');
const fieldInput = document.getElementById('fieldInput');
const resetButton = document.getElementById('resetButton');

// Particle properties
let particle = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: parseFloat(velocityInput.value),
  vy: 0,
  charge: parseFloat(chargeInput.value),
};

// Field properties
let magneticField = parseFloat(fieldInput.value);

// Reset simulation
resetButton.addEventListener('click', () => {
  particle.x = canvas.width / 2;
  particle.y = canvas.height / 2;
  particle.vx = parseFloat(velocityInput.value);
  particle.vy = 0;
  particle.charge = parseFloat(chargeInput.value);
  magneticField = parseFloat(fieldInput.value);
});

// Calculate Lorentz force
function calculateForce() {
  const Fx = 0; // No electric field
  const Fy = particle.charge * (particle.vx * magneticField);
  return { Fx, Fy };
}

// Draw particle
function drawParticle() {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'yellow';
  ctx.fill();
}

// Draw force vector
function drawForceVector(force) {
  const scale = 50; // Adjust vector scaling for visibility
  ctx.beginPath();
  ctx.moveTo(particle.x, particle.y);
  ctx.lineTo(particle.x + force.Fx * scale, particle.y - force.Fy * scale);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'red';
  ctx.stroke();
}

// Update particle position
function updatePhysics() {
  const force = calculateForce();
  particle.vx += force.Fx / 1; // Assume mass = 1
  particle.vy += force.Fy / 1;
  particle.x += particle.vx;
  particle.y += particle.vy;

  // Boundary conditions
  if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
  if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const force = calculateForce();
  drawParticle();
  drawForceVector(force);
  updatePhysics();

  requestAnimationFrame(animate);
}

// Start the simulation
animate();
