
const input = document.getElementById("input");
input.addEventListener('keyup', async (event) => {
	event.preventDefault();
		const typedString = document.getElementById("input").value;
	
		await axios(`https://spott.p.rapidapi.com/places?type=CITY&limit=1&language=ar&skip=0&q=${typedString}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "",
				"x-rapidapi-key": ""
			}
		})
			.then(response => {
				let data = response.data[0]
				// let data = JSON.parse(response)
				console.log(data);

				

			})
			.catch(err => {
				console.log(err);
			});
})

// https://spott.p.rapidapi.com/places/autocomplete?q=${typedString}&limit=10&skip=0&type=CITY&language=ar
