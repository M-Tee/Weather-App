
const input = document.getElementById("input");
input.addEventListener('keyup', async (event) => {
	event.preventDefault();
	if (event.keyCode === 13) {
		const typedString = document.getElementById("input").value;

		await axios(`https://api.openweathermap.org/data/2.5/weather?q=${typedString}&APPID=72a730baaa2ebd7a0edabe3d09b870c2`, {
			"method": "GET"
		})
			.then(response => {
				let data = response.data
				// let data = JSON.parse(response)
				console.log(data);

				const city = document.querySelector('.city');
				let cityName = data.name;
				city.textContent = `${cityName},`


				const country = document.querySelector('.country');
				country.textContent = data.sys.country

				const weather = document.querySelector('.weather')
				weather.textContent = data.weather[0].main

				const temp = document.querySelector('.degrees')
				temp.textContent = Math.round(data.main.temp - 273.15);
				
			
				const humidity = document.querySelector('#humidityRate')
				humidity.textContent = data.main.humidity

				const windSpeed = document.querySelector('#windSpeedRate'); 
				windSpeed.textContent = data.wind.speed

			})
			.catch(err => {
				console.log(err);
			});
	}
})

// https://spott.p.rapidapi.com/places?type=CITY&limit=1&language=ar&skip=0&q= ${typedString}

// https://spott.p.rapidapi.com/places/autocomplete?q=${typedString}&limit=10&skip=0&type=CITY&language=ar
// async function getWeather(cityName) {
// 	await axios(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=72a730baaa2ebd7a0edabe3d09b870c2`, {
// 		"method": "GET"
// 	})
// 	.then(response =>{
// 		console.log(response.data)
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	});
// }
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=72a730baaa2ebd7a0edabe3d09b870c2