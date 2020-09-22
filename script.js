// Selecting elements
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');

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
      </div>
      <div class='card-body'>
        <h2 class="country-name">${country.name}</h2>
        <p>
          <strong>Population:</strong>
          ${country.population}
        </p>
        <p class="country-region">
          <strong>Region:</strong> 
          ${country.region}
        </p>
        <p>
          <strong>Capital:</strong> 
          ${country.capital}
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

// get input value on searchBar
searchEl.addEventListener('input', e => {
  const val = e.target.value;
  // get all the country name
  const countryName = document.querySelectorAll('.country-name');

  // hide or show country
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(val.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  });
});

// region filters on dropdown
regionFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    // check if value is all
    const val = filter.innerText;
    // get all the country region
    const countryRegion = document.querySelectorAll('.country-region');

    // hide or show region
    countryRegion.forEach(region => {
      if (region.innerText.includes(val) || val === 'All') {
        // .card -> .card-body -> .country-region
        region.parentElement.parentElement.style.display = 'block';
      } else {
        region.parentElement.parentElement.style.display = 'none';
      }
    });
  });
});
