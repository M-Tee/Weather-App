// const functions = require('firebase-functions');
let today = new Date()

const displayDate = document.querySelector('#date');
let date = today.getDate()
displayDate.textContent = `${date}th`

const month = document.querySelector('#month');
month.textContent = today.toLocaleString('default', { month: 'long' })

const year = document.querySelector('#year');
year.textContent = today.getFullYear()


// const tommorow = new Date(date)
// const displayNextday = document.querySelector('#nextDay');
// displayNextday.textContent = tommorow.toLocaleString('default', { weekday: 'long' })

// let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// let day = today.getDay()
// const nextday2 = document.querySelector('#nextDay2');
// nextday2.textContent = days[day+2]
// for (let i = day; i>=6; i++){

// }

// date = tommorow.getDate()
// const nextday2 = document.querySelector('#nextDay2');
// let next = today.getDay()+1
// nextday2.textContent = today.toLocaleString('default', { weekday: 'long' })
// const next = new Date((tommorow.getDate()+2))
// const nextday2 = document.querySelector('#nextDay2');
// nextday2.textContent = next.toLocaleString('default', { weekday: 'long' })
// nextday.textContent = today.getDate() + 1
// const tommorow = today.getDay()+1
// const tomorrow = new Date()
// nextday.textcontent =  tomorrow.setDate(today.getDate() + 1)


const input = document.getElementById("input");

input.addEventListener('keyup', async (event) => {
	event.preventDefault();
	if (event.keyCode === 13) {
		const typedString = document.getElementById("input").value;
		getDaysForecast(typedString)
	}
})

async function getDaysForecast(typedString){
	await axios(`https://api.openweathermap.org/data/2.5/weather?q=${typedString}&APPID=d72c9198e329c1ee1652b88a716f343f`, {
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
}

async function getWeeksForecast(lat, lon) {
	await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=d72c9198e329c1ee1652b88a716f343f`, {
		"method": "GET"
	})
		.then(response => {
			let data = response.data
			console.log(data)
			displayWeeksForecast(data)
		})
		.catch(err => {
			console.log(err);
		});
}
function clearPlaceholder(){
	const placeholder = document.querySelector('.placeholder')
	placeholder.style.display = "none";
}

function displayWeeksForecast(data) {
	clearPlaceholder()
	data.daily.forEach(day => {
		let icon = day.weather[0].icon

		const section = document.querySelector('.section3');
		const card = document.createElement('div')
		card.setAttribute('class', 'card')
		section.appendChild(card);

		const p = document.createElement('p')
		p.textContent = 'next'
		card.appendChild(p)

		const innerCard = document.createElement('div')
		innerCard.setAttribute('class', 'innerCard')
		card.appendChild(innerCard)

		// const innerCard = document.querySelector('.innerCard')
		const img = document.createElement('img')
		img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`)
		innerCard.appendChild(img)

		const temp = document.createElement('p')
		temp.textContent = `${Math.round(day.temp.day - 273.15)}°`;
		innerCard.appendChild(temp)

		const weather = document.createElement('p')
		weather.textContent = day.weather[0].main
		innerCard.appendChild(weather)

	});
}

// //for loop that checks the day and prints out the da
// for(i = 0; i < 7; i++){
// 	let day = today.getDay()
// 	let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// 	for(j = day; j >= 6; j++){
// 		console.log(days[day]);
// 	}
// }