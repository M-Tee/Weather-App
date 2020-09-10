
const input = document.getElementById("input");
input.addEventListener('keyup', async (input)=> {
	
	const typedString = document.getElementById("input").value;
	// const url = "https://spott.p.rapidapi.com/places/autocomplete?q="+input+"&limit=10&skip=0&type=CITY&language=ar&country=US%252CCA",


	await fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${typedString}&limit=10&skip=0&type=CITY&language=ar`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spott.p.rapidapi.com",
		"x-rapidapi-key": "e894934359msh14a1ac1cf2e5dc7p1115b0jsn7009fce07bb0"
	}
})
.then(response => {
	let data = response.json();
	console.log(data.id);

const country = document.querySelector('country');
country.textContent = data.name

})
.catch(err => {
	console.log(err);
});
})

