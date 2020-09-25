const section = document.querySelector('.section3');
const input = document.getElementById("input");
const addbtn = document.querySelector('.btn');
let defferedPrompt;

if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log(reg))
    .catch(err => console.log(err))
  })
}

(function displayDate() {
	const displayDate = document.querySelector('#date');

	let today = new Date()
	let date = today.getDate()
	let month = today.toLocaleString('default', { month: 'long' })
	let year = today.getFullYear()

	displayDate.textContent = `${date}th ${month} ${year} `
})()

input.addEventListener('keyup', async (event) => {
	if (event.keyCode === 13) {

		const typedString = document.getElementById("input").value;
		getDaysForecast(typedString)
	}
})

async function getDaysForecast(typedString) {
	await axios(`https://api.openweathermap.org/data/2.5/weather?q=${typedString}&APPID=`, {
		"method": "GET"
	})
		.then(async response => {
			let data = response.data
			const lat = data.coord.lat
			const lon = data.coord.lon
			console.log(data);

			displayDaysForecast(data)
			getWeeksForecast(lat, lon)
		})
		.catch(err => {
			console.log(err);
		});
}

function displayDaysForecast(data) {
	const city = document.querySelector('.city');
	city.textContent = `${data.name},`

	const country = document.querySelector('.country');
	country.textContent = data.sys.country

	let icon = data.weather[0].icon
	const img = document.querySelector('#weatherIcon');
	img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)

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
}

async function getWeeksForecast(lat, lon) {
	await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=`, {
		"method": "GET"
	})
		.then(response => {
			let data = response.data.daily
			console.log(data)
			displayWeeksForecast(data)
		})
		.catch(err => {
			console.log(err);
		});
}

function displayWeeksForecast(data) {
	const nextDayDegree = [document.querySelectorAll('#nextDaydegree')]
	const nextDayIcon = [document.querySelectorAll('#nextWeatherIcon')]
	const nextforeCast = [document.querySelectorAll('#nextforeCast')]

	let weeksTemp = nextDayDegree[0]
	let weeksIcon = nextDayIcon[0]
	let weeksForecast = nextforeCast[0]

	for(i = 0; i < 7; i++) {
	weeksTemp[i].innerText = `${Math.round(data[i].temp.day - 273.15)}°`;
	weeksIcon[i].setAttribute('src', `https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`) 
	weeksForecast[i].innerText = data[i].weather[0].main
	}
}

window.addEventListener('beforeinstallprompt', event => {
	event.preventDefault();
	defferedPrompt = event
	addbtn.style.display = 'block';
});

addbtn.addEventListener('click', event => {
	defferedPrompt.prompt();

	defferedPrompt.userChoice.then(choice => {
		if (choice.outcome === 'accepted') {
			console.log('user accepted the prompt')
		}
		defferedPrompt = null;
	})
})