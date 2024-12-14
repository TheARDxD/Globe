import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;



const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({
  map: new THREE.TextureLoader().load('./img/daymap.jpg'),
});
const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
globe.rotation.y = THREE.MathUtils.degToRad(184); 
scene.add(globe);


const light = new THREE.PointLight(0xffffff, 5); 
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(-10, 10, 5);
scene.add(directionalLight);


camera.position.z = 10;



// Handle Window Resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Detect Mouse Click on Globe
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();



document.addEventListener('click', async (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasting from the camera to the mouse's location
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(globe);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    const point = intersect.point;

    const radius = globe.geometry.parameters.radius; 
    const lat = Math.asin(point.y / radius) * (180 / Math.PI);
    const lng = Math.atan2(point.z, point.x) * (180 / Math.PI);
    document.getElementById("locationInput").value = `Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`;
    console.log(`Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`);

    const location = `${lat.toFixed(2)},${lng.toFixed(2)}`;
    console.log(`Fetching weather data for: ${location}`);
    const weatherInfoDiv = document.getElementById('weatherInfo');

    weatherInfoDiv.innerHTML = '';

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=10a50b2041914bf5abe161128241012&q=${location}&aqi=no`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      weatherInfoDiv.innerHTML = `
        <h3>Weather in ${data.location.name}, ${data.location.country}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
      `;
      document.getElementById("locationInput").value = `${data.location.name}`;
    } catch (error) {
      weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    }
  }
});


// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


