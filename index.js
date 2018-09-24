const countriesContainer = document.querySelector('.countries');

const requestData = async () => {
  const requestURL = 'https://restcountries.eu/rest/v2/all';
  const respond = await fetch(requestURL);
  const resultArr = await respond.json();

  // Generate country
  namesAndFlags(resultArr);

  // resultArr.forEach(result => {
  //   console.log(result.flag);
  // });
};

const namesAndFlags = arr => {
  let reverseArr = arr.slice().reverse();
  // Insert li items
  reverseArr.forEach(element => {
    countriesContainer.insertAdjacentHTML(
      'afterbegin',
      `
        <li>
          <img class="img-responsive" src="${element.flag}" alt="Country flag">
          <p class="country-name">${element.name}</p>
        </li>
      `
    );
  });
};

// Init
requestData();
