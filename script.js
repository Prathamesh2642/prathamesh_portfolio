// Three.js Hyperspace Particle Effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-canvas').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x000000, 0.1); // Very dim for hyperspace void
scene.add(ambientLight);

// Hyperspace Particles (Adjusted for performance on mobile)
const particleCount = 500; // Reduced for better mobile performance
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    // Position particles randomly across a wide area
    positions[i] = (Math.random() - 0.5) * 2000;     // X
    positions[i + 1] = (Math.random() - 0.5) * 2000; // Y
    positions[i + 2] = (Math.random() - 0.5) * 2000; // Z

    // Cyan color with varying intensity for hyperspace streaks
    colors[i] = Math.random() * 0.5 + 0.5;    // R (low red for cyan)
    colors[i + 1] = Math.random() * 0.5 + 0.5; // G (some green for cyan)
    colors[i + 2] = 1.0;                       // B (full blue for cyan)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: 5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending // For glowing, streaky effect
});

const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

camera.position.z = 500;

// Animation loop
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01; // Slower for consistency across devices

    // Move particles to simulate high-speed streaks
    const positions = particlesGeometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 2] -= 2; // Maintain slow, smooth movement
        if (positions[i + 2] < -1000) {
            positions[i + 2] = 1000; // Reset to far back for continuous streaks
            positions[i] = (Math.random() - 0.5) * 2000; // Random X
            positions[i + 1] = (Math.random() - 0.5) * 2000; // Random Y
        }
    }
    particlesGeometry.attributes.position.needsUpdate = true;

    // Slight rotation for dynamic feel
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;

    renderer.render(scene, camera);
}
animate();

// Handle window resize (fully responsive)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll Animation (adjusted for mobile performance)
const animateElements = document.querySelectorAll('.animate-on-scroll');
function checkScroll() {
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.9) { // Adjusted threshold for mobile
            element.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Add new projects
function addProject(title, description, imageUrl) {
    const projectGrid = document.getElementById('projectsGrid');
    const newProject = document.createElement('div');
    newProject.className = 'project-card';
    newProject.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
    `;
    projectGrid.appendChild(newProject);
}

// Add new blog posts
function addBlogPost(title, content) {
    const blogGrid = document.getElementById('blogGrid');
    const newBlog = document.createElement('div');
    newBlog.className = 'blog-card';
    newBlog.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
    `;
    blogGrid.appendChild(newBlog);
}