const apiKey = '10a50b2041914bf5abe161128241012';

async function getWeather() {
  const location = document.getElementById('locationInput').value;
  const weatherInfoDiv = document.getElementById('weatherInfo');

  weatherInfoDiv.innerHTML = '';

  if (!location) {
    weatherInfoDiv.innerHTML = '<p>Please enter a location.</p>';
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

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
  } catch (error) {
    weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
  }
}

// export async function geoWeather(lat, lng) {
//   const location = lat.toString().concat(",", lng.toString());
//   const weatherInfoDiv = document.getElementById('weatherInfo');

//  
//   weatherInfoDiv.innerHTML = '';

//   const apiUrl = `https://api.weatherapi.com/v1/current.json?key=10a50b2041914bf5abe161128241012&q=${location}&aqi=no`;

//   try {
//     const response = await fetch(apiUrl);

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();

//    
//     weatherInfoDiv.innerHTML = `
//       <h3>Weather in ${data.location.name}, ${data.location.country}</h3>
//       <p>Temperature: ${data.current.temp_c}°C</p>
//       <p>Condition: ${data.current.condition.text}</p>
//       <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />
//     `;
//     document.getElementById("locationInput").value = `${data.location.name}`

//   } catch (error) {
//     weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
//   }
// }

