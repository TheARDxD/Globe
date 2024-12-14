# WeatherGlobe
An interactive 3D globe powered by Three.js that allows users to click on any point on the Earth and get real-time weather information using the WeatherAPI. Included manual search feature too.

![image](https://github.com/user-attachments/assets/ce178bad-a8ac-49c6-b3f6-1b7f0f941977)

### (This was built using Vite)

## Reason behind potential lat, long mismatch:
- The offset is not accurate and the texture I put on the sphere has been stretched at a few places hence the locations might not be right
- The click is measured perpendicular to the surface of the sphere and not right underneath the mouse
