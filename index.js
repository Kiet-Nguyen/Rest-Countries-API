const elements = {
  container: document.querySelector('.container'),
  countriesContainer: document.querySelector('.countries'),
  sortAlphabet: document.querySelector('.sort-alphabet'),
  sortPopulation: document.querySelector('.sort-population'),
  dropdownBtn: document.querySelector('#js-dropdown'),
  searchInput: document.querySelector('.search-input'),
  searchBtn: document.querySelector('.js-search')
};

let searchInputValue;

const requestData = async () => {
  const requestURL = 'https://restcountries.eu/rest/v2/all';
  const respond = await fetch(requestURL);
  const resultArr = await respond.json();

  // Generate country
  generateEachCountry(resultArr);

  // Sort Name
  elements.sortAlphabet.addEventListener('click', () => {
    if (elements.sortAlphabet.innerHTML === 'Name (Z - A)') {
      sortCountryName(resultArr, true);
      elements.sortAlphabet.innerHTML = 'Name (A - Z)';
    } else {
      sortCountryName(resultArr, false);
      elements.sortAlphabet.innerHTML = 'Name (Z - A)';
    }
    generateEachCountry(resultArr);
  });

  // Sort population
  elements.sortPopulation.addEventListener('click', () => {
    if (elements.sortPopulation.innerHTML === 'Population (DESC)') {
      sortCountryPopulation(resultArr, true);
      elements.sortPopulation.innerHTML = 'Population (ASC)';
    } else {
      sortCountryPopulation(resultArr, false);
      elements.sortPopulation.innerHTML = 'Population (DESC)';
    }
    generateEachCountry(resultArr);
  });

  // Search
  elements.searchBtn.addEventListener('click', () => {
    elements.countriesContainer.innerHTML = '';
    searchCountry(resultArr);
  });
};

const generateEachCountry = arr => {
  let reverseArr = arr.slice().reverse();

  // Insert li items
  reverseArr.forEach(country => {
    elements.countriesContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <li>
          <img class="img-responsive" src="${country.flag}" alt="Country flag">
          <p class="country-name collapsible">
            ${country.name}
            <span class="arrow"></span>
          </p>
          <div class="collapsible-content">
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Latlng: ${country.latlng[0]} ${country.latlng[1]}</p>
          </div>
        </li>
      `
    );
  });

  // Each element.name is a collapsible element
  const collapseBtns = document.querySelectorAll('.collapsible');
  handleCollapse(collapseBtns);
};

/**
 * Each country name is a collapsible element
 **/

const handleCollapse = arr => {
  arr.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      let content = btn.nextElementSibling;

      content.style.display === 'inline-block'
        ? (content.style.display = 'none')
        : (content.style.display = 'inline-block');
    });
  });
};

/**
 * Sort options
 */

const sortCountryName = (arr, descending) => {
  // Check descending and ascending
  const mod = descending ? 1 : -1;

  arr.sort((a, b) => {
    let valueA = a.name.toUpperCase();
    let valueB = b.name.toUpperCase();

    if (valueA < valueB) {
      return 1 * mod;
    } else if (valueA > valueB) {
      return -1 * mod;
    }
  });
};

const sortCountryPopulation = (arr, descending) => {
  const mod = descending ? 1 : -1;

  arr.sort((a, b) => {
    if (a.population < b.population) {
      return 1 * mod;
    } else if (a.population > b.population) {
      return -1 * mod;
    }
  });
};

/**
 * Dropdown to choose sort options
 **/
const toggleShowDropdown = () => {
  elements.dropdownBtn.classList.toggle('show');
};

// Close the dropdown if the user clicks outside of it
window.onclick = event => {
  if (!event.target.matches('.drop-btn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let index;
    for (index = 0; index < dropdowns.length; index++) {
      let openDropdown = dropdowns[index];

      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

/**
 * Search
 **/
const searchCountry = arr => {
  searchInputValue = elements.searchInput.value.toUpperCase();

  arr.forEach(country => {
    let name = country.name.toUpperCase();
    let partOfName = name.substring(0, searchInputValue.length);
    let capital = country.capital.toUpperCase();
    let partOfCapital = capital.substring(0, searchInputValue.length);
    let region = country.region.toUpperCase();
    let partOfRegion = region.substring(0, searchInputValue.length);
    // let language = country.languages
    // console.log('language', language);

    if (
      partOfName == searchInputValue ||
      partOfCapital == searchInputValue ||
      partOfRegion == searchInputValue
    ) {
      elements.countriesContainer.insertAdjacentHTML(
        'afterbegin',
        `
          <div>
            <div class="">
              <img class="img-responsive" src="${country.flag}" alt="Country flag">
              <h2 class="country-name">${country.name}</h2>
            </div>

            <div class="">
              <p>Capital: ${country.capital}</p>
              <p>Population: ${country.population}</p>
              <p>Region: ${country.region}</p>
              <p>Latlng: ${country.latlng[0]} ${country.latlng[1]}</p>
            </div>
          </div>
        `
      );
    }
  });
};

// Init
requestData();
