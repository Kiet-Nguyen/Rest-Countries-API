const elements = {
  container: document.querySelector('.container'),
  countriesContainer: document.querySelector('.countries'),
  sortAlphabet: document.querySelector('.sort-alphabet'),
  sortPopulation: document.querySelector('.sort-population'),
  dropdownBtn: document.querySelector('#js-dropdown')
};

const requestData = async () => {
  const requestURL = 'https://restcountries.eu/rest/v2/all';
  const respond = await fetch(requestURL);
  const resultArr = await respond.json();

  // Generate country
  namesAndFlags(resultArr);

  // Sort
  elements.sortAlphabet.addEventListener('click', () => {
    if (elements.sortAlphabet.innerHTML === 'Name (Z - A)') {
      sortAlphabet(resultArr, true);
      elements.sortAlphabet.innerHTML = 'Name (A - Z)';
    } else {
      sortAlphabet(resultArr, false);
      elements.sortAlphabet.innerHTML = 'Name (Z - A)';
    }
    namesAndFlags(resultArr);
  });

  elements.sortPopulation.addEventListener('click', () => {
    if (elements.sortPopulation.innerHTML === 'Population (Desc)') {
      sortPopulation(resultArr, true);
      elements.sortPopulation.innerHTML = 'Population (Ascen)';
    } else {
      sortPopulation(resultArr, false);
      elements.sortPopulation.innerHTML = 'Population (Desc)';
    }

    namesAndFlags(resultArr);
  });

  // resultArr.forEach(result => {
  //   console.log(result.flag);
  // });
};

const namesAndFlags = arr => {
  let reverseArr = arr.slice().reverse();

  // Insert li items
  reverseArr.forEach(element => {
    elements.countriesContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <li>
          <img class="img-responsive" src="${element.flag}" alt="Country flag">
          <p class="country-name collapsible">
            ${element.name}
            <span class="arrow"></span>
          </p>
          <div class="collapsible-content">
            <p>Capital: ${element.capital}</p>
            <p>Population: ${element.population}</p>
            <p>Region: ${element.region}</p>
            <p>Latlng: ${element.latlng[0]} ${element.latlng[1]}</p>
          </div>
        </li>
      `
    );
  });

  // Each element.name is a collapsible item
  const collapseBtns = document.querySelectorAll('.collapsible');
  handleCollapse(collapseBtns);
};

const handleCollapse = arr => {
  arr.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      let content = btn.nextElementSibling;

      content.style.display === 'block'
        ? (content.style.display = 'none')
        : (content.style.display = 'block');
    });
  });
};

const sortAlphabet = (arr, descending) => {
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

const sortPopulation = (arr, descending) => {
  const mod = descending ? 1 : -1;

  arr.sort((a, b) => {
    if (a.population < b.population) {
      return 1 * mod;
    } else if (a.population > b.population) {
      return -1 * mod;
    }
  });
};

const toggleShowDropdown = () => {
  elements.dropdownBtn.classList.toggle('show');
};

// Close the dropdown if the user clicks outside of it
window.onclick = event => {
  if (!event.target.matches('.dropbtn')) {
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

// Init
requestData();
