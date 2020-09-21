// Selecting elements
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');

getCountries();

// API CALL
async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries = await res.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  // Clear body content
  countriesEl.innerHTML = '';

  countries.forEach(country => {
    const countryEl = document.createElement('div');
    countryEl.classList.add('card');

    countryEl.innerHTML = `
      <div>
        <img src=${country.flag} alt=${country.name} />
      <div/>
      <div class='card-body'>
        <h2>${country.name}</h2>
        <p>
          <strong>Population:</strong> ${country.population}
        </p>
        <p>
          <strong>Region:</strong> ${country.region}
        </p>
        <p>
          <strong>Capital:</strong> ${country.capital}
        </p>
      </div>
  `;

    countriesEl.appendChild(countryEl);
  });
}

// toggle btn theme
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// filter dropdown btn
filterBtn.addEventListener('click', () => {
  filterBtn.classList.toggle('open');
});
