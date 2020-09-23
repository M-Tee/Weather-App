
if('serviceWorker' in navigator){
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log(reg))
    .catch(err => console.log(err))
  })
}
(function displayDate(){
	const displayDate = document.querySelector('#date');

	let today = new Date()
	let date = today.getDate()
	let month = today.toLocaleString('default', { month: 'long' })
	let year = today.getFullYear()

	displayDate.textContent = `${date}th ${month} ${year} `
})()


const input = document.getElementById("input");

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
			checkScreenWidth(data)
		})
		.catch(err => {
			console.log(err);
		});
}

function clearPlaceholder() {
	const placeholder = document.querySelector('.placeholder')
	placeholder.style.display = "none";
}

function checkScreenWidth(data){
	let arraylength = 0
	if (window.screen.width < 768) {
 arraylength = data.length - 5
	} else{
	 arraylength = data.length - 2	
	}
	displayWeeksForecast(data, arraylength)
}

const section = document.querySelector('.section3');

function displayWeeksForecast(data, arraylength) {
	clearPlaceholder()
	for (var i = 0; i < arraylength; i++) {
		let day = data[i];
		let icon = day.weather[0].icon
	
		const card = document.createElement('div')
		card.setAttribute('class', 'card')
		section.appendChild(card);

		const p = document.createElement('p')
		p.textContent = 'next'
		card.appendChild(p)

		const innerCard = document.createElement('div')
		innerCard.setAttribute('class', 'innerCard')
		card.appendChild(innerCard)

		const img = document.createElement('img')
		img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png`)
		innerCard.appendChild(img)

		const temp = document.createElement('p')
		temp.textContent = `${Math.round(day.temp.day - 273.15)}°`;
		innerCard.appendChild(temp)

		const weather = document.createElement('p')
		weather.textContent = day.weather[0].main
		innerCard.appendChild(weather)
	}
}

let defferedPrompt;
const addbtn = document.querySelector('.btn');

window.addEventListener('beforeinstallprompt', event => {
	event.preventDefault();
	defferedPrompt = event
	addbtn.style.display = 'block';
});

addbtn.addEventListener('click', event => {
	defferedPrompt.prompt();

	defferedPrompt.userChoice.then(choice => {
		if(choice.outcome === 'accepted'){
			console.log('user accepted the prompt')
		}
		defferedPrompt = null;
	})
})