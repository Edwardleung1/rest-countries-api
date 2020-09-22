// Selecting elements
const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const regionFilters = filterBtn.querySelectorAll('li');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

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
        <h3 class="country-name">${country.name}</h3>
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

    // show modal on country click
    countryEl.addEventListener('click', () => {
      modal.style.display = 'flex';
      showCountryDetails(country);
    });

    countriesEl.appendChild(countryEl);
  });
}

// show country details for modal
function showCountryDetails(country) {
  const modalBody = modal.querySelector('.modal-body');
  const modalImg = modal.querySelector('img');

  // flag
  modalImg.src = country.flag;

  // country info
  modalBody.innerHTML = `
    <h2>${country.name}</h2>
    <p>
      <strong>Native Name:</strong>
      ${country.nativeName}
    </p>
    <p>
      <strong>Population:</strong>
      ${country.population}
    </p>
    <p>
      <strong>Region:</strong>
      ${country.region}
    </p>
    <p>
      <strong>Sub Region:</strong>
      ${country.subregion}
    </p>
    <p>
      <strong>Capital:</strong>
      ${country.capital}
    </p>
    <p>
      <strong>Top Level Domain:</strong> 
      ${country.topLevelDomain[0]}
    </p>
    <p>
      <strong>Currencies:</strong> 
      ${country.currencies.map(currency => currency.code)}
    </p>
    <p>
      <strong>Languages:</strong> 
      ${country.languages.map(language => language.name)}
    </p>
  `;
}

// toggle btn theme
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// filter dropdown btn
filterBtn.addEventListener('click', () => {
  filterBtn.classList.toggle('open');
});

// close the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
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
