const elements = {
  container: document.querySelector('.container'),
  countriesContainer: document.querySelector('.countries'),
  sortBtn: document.querySelector('.sort-button')
};

const requestData = async () => {
  const requestURL = 'https://restcountries.eu/rest/v2/all';
  const respond = await fetch(requestURL);
  const resultArr = await respond.json();

  // Generate country
  namesAndFlags(resultArr);

  // Collapse buttons
  const collapseBtns = document.querySelectorAll('.collapsible');
  createCollapseBtns(collapseBtns);

  elements.sortBtn.addEventListener('click', () => {
    sortAlphabet(resultArr);
    namesAndFlags(resultArr);
    console.log('sortAlphabet(resultArr)', sortAlphabet(resultArr));
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
};

const createCollapseBtns = arr => {
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

const sortAlphabet = arr => {
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    } else if (a.name > b.name) {
      return -1;
    }
  });
};

// Init
requestData();
