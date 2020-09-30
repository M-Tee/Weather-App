// const key = process.env.KEY
const section = document.querySelector('.section3');
const input = document.getElementById("input");
const addbtn = document.querySelector('.btn');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const marker = document.querySelector('.locationIcon');
let defferedPrompt;

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
		.then(response => {
			let data = response.data
			const lat = data.coord.lat
			const lon = data.coord.lon

			displayDaysForecast(data)
			getWeeksForecast(lat, lon)
			console.log(data);
		})
		.catch(err => {
			displayErrorMessage() 
			console.log(err);
		});
}

function displayDaysForecast(data) {
	const img = document.querySelector('#weatherIcon');
	const temp = document.querySelector('.degrees')
	const weather = document.querySelector('.weather');
	const humidity = document.querySelector('#humidityRate')
	const cloudRate = document.querySelector('#cloudRate');
	const windSpeed = document.querySelector('#windSpeedRate');
	const pressureRate = document.querySelector('#pressureRate');

	let icon = data.weather[0].icon

	marker.style.display = "unset";
	city.textContent = `${data.name},`
	country.textContent = data.sys.country
	img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
	temp.textContent = `${Math.round(data.main.temp - 273.15)}°`;
	weather.textContent = data.weather[0].description
	humidity.textContent = `${data.main.humidity}%`
	windSpeed.textContent = `${data.wind.speed} m/s`
	pressureRate.textContent = `${data.main.pressure} hPa`
}

async function getWeeksForecast(lat, lon) {
	await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=`, {
		"method": "GET"
	})
		.then(response => {
			let data = response.data.daily
			data.splice(0, 1)
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
	const nextDay = [document.querySelectorAll('#nextDay')]
	const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let weeksTemp = nextDayDegree[0]
	let weeksIcon = nextDayIcon[0]
	let weeksForecast = nextforeCast[0]
	let dayOftheWeek = nextDay[0]

	for (i = 0; i < 7; i++) {

		let timeInUnix = data[i].dt
		let dateFromUnix = new Date(timeInUnix * 1000)

		dayOftheWeek[i].innerText = daysOfTheWeek[dateFromUnix.getDay()]
		weeksTemp[i].innerText = `${Math.round(data[i].temp.day - 273.15)}°`;
		weeksIcon[i].setAttribute('src', `https://openweathermap.org/img/wn/${data[i].weather[0].icon}.png`)
		weeksForecast[i].innerText = data[i].weather[0].main

		if (i === 0) {
			dayOftheWeek[i].innerText = 'Tommorrow';
		}
	}
}
function displayErrorMessage() {
	marker.style.display = "none";
	city.innerText = "404,";
	country.innerText = "City not found";
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


if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js')
			.then(reg => console.log(reg))
			.catch(err => console.log(err))
	})
}

// if (!('Notification' in window)) {
//   console.log('This browser does not support notifications!');
// }
// Notification.requestPermission(status => {
//   console.log('Notification permission status:', status);
// });

// if (Notification.permission == 'granted') {
//   navigator.serviceWorker.getRegistration().then(reg => {

//     const options = {
// 			body: 'Subscribe to get daily weather updates!',
// 			icon: './favicon-32x32.png',
// 			vibrate: [100, 50, 100],
// 			data: {
// 				dateOfArrival: Date.now(),
// 				primaryKey: 1
// 			},
// 			actions: [
// 				{action: 'explore', title: 'Subscribe',
// 					icon: './favicon-32x32.png'},
// 				{action: 'close', title: 'Dismiss',
// 					icon: './favicon-32x32.png'},
// 			]

// 			// TODO 5.1 - add a tag to the notification

// 		};

//     reg.showNotification('Want to receive weather updates?', options);
//   });
// }