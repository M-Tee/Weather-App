// const functions = require('firebase-functions');
let today = new Date()

const displayDate = document.querySelector('#date');
let date = today.getDate()
displayDate.textContent = `${date}th`

const month = document.querySelector('#month');
month.textContent = today.toLocaleString('default', { month: 'long' })

const year = document.querySelector('#year');
year.textContent = today.getFullYear()



const input = document.getElementById("input");
input.addEventListener('keyup', async (event) => {
	event.preventDefault();
	if (event.keyCode === 13) {
		const typedString = document.getElementById("input").value;
		// const apiKey = functions.config().openweather.key;

		await axios(`https://api.openweathermap.org/data/2.5/weather?q=${typedString}&APPID=d72c9198e329c1ee1652b88a716f343f`, {
			"method": "GET"
		})
			.then(response => {
				let data = response.data
				console.log(data);

				const city = document.querySelector('.city');
				city.textContent = `${data.name},`

				const country = document.querySelector('.country');
				country.textContent = data.sys.country

				let icon = data.weather[0].icon
				const img = document.querySelector('#weatherIcon');
				img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
	

				const temp = document.querySelector('.degrees')
				temp.textContent = `${Math.round(data.main.temp - 273.15)}°`;

				const weather = document.querySelector('.weather');
				weather.textContent = data.weather[0].description

				const humidity = document.querySelector('#humidityRate')
				humidity.textContent = `${data.main.humidity}%`

				const cloudRate = document.querySelector('#cloudRate');
				cloudRate.textContent = `${data.clouds.all}%`


				const windSpeed = document.querySelector('#windSpeedRate');
				windSpeed.textContent = `${data.wind.speed} m/s`

				const pressureRate = document.querySelector('#pressureRate');
				pressureRate.textContent = `${data.main.pressure} hPa`

			})
			.catch(err => {
				console.log(err);
			});


	
	}
})


