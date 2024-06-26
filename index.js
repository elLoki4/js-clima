
const formulario = document.createElement('form');
const container = document.getElementById('formulario-container');
container.appendChild(formulario);

function createButton(text, clickFunction) {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = clickFunction;
  button.className = 'btn btn-primary ms-2';
  formulario.appendChild(button);
}

function clearForm() {
  formulario.innerHTML = '';
}

function choice() {
  createButton('Coord', function () {
    clearForm();
    const divContainer = document.createElement('div');
    divContainer.className = 'container';
    formulario.appendChild(divContainer);

    const textLat = document.createElement('p');
    textLat.textContent = 'Input to lat';
    divContainer.appendChild(textLat);

    const lat = document.createElement('input');
    lat.id = 'lat';
    divContainer.appendChild(lat);

    const textLong = document.createElement('p');
    textLong.textContent = 'Input to long';
    divContainer.appendChild(textLong);

    const long = document.createElement('input');
    long.id = 'long';
    divContainer.appendChild(long);

    formulario.addEventListener('submit', function (event) {
      event.preventDefault();
      obtenerDatos(lat.value, long.value);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className = 'btn btn-primary mt-2';
    divContainer.appendChild(submitButton);

    const returnButton = document.createElement('button');
    returnButton.textContent = 'Return';
    returnButton.onclick = function () {
      clearForm();
      choice();
    };
    returnButton.className = 'btn btn-danger mt-2';
    divContainer.appendChild(returnButton);
  });

  createButton('Country', function () {
    clearForm();
    const textCountry = document.createElement('p');
    textCountry.textContent = 'Select a Country';
    formulario.appendChild(textCountry);

    const countryChoice = [
      {
        country: 'London',
        lat: '51.507351',
        long: '-0.127758',
      },
      {
        country: 'Liverpool',
        lat: '53.410',
        long: '-2.977',
      },
      {
        country: 'Manchester',
        lat: '53.480',
        long: '-2.237',
      },
      {
        country: 'Preston',
        lat: '53.763',
        long: '-2.704',
      },
      {
        country: 'Bradford',
        lat: '53.793',
        long: '-1.752',
      },
    ];

    const countryOptions = countryChoice.map((item, index) => {
      return `<option value="${index}">${item.country}</option>`;
    });

    const selectElement = document.createElement('select');
    selectElement.className = 'form-select mb-2';
    selectElement.setAttribute('aria-label', 'Default select example');
    selectElement.innerHTML = countryOptions.join('');

    formulario.appendChild(selectElement);

    formulario.addEventListener('submit', function (event) {
      event.preventDefault();

      const selectedIndex = selectElement.value;
      const selectedCountry = countryChoice[selectedIndex];

      obtenerDatos(selectedCountry.lat, selectedCountry.long);
    });
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Return';
    returnButton.onclick = function () {
      clearForm();
      choice();
    };
    returnButton.className = 'btn btn-danger';
    formulario.appendChild(returnButton);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className = 'btn btn-primary ms-2';
    formulario.appendChild(submitButton);
  });
}

function obtenerDatos(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c661314910f656184b12f2edfca7477c`
  )
    .then((resp) => resp.json())
    .then((data) => createdHtml(data));
}

function obtenerDatos(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c661314910f656184b12f2edfca7477c`
  )
    .then((resp) => resp.json())
    .then((data) => createdHtml(data));
}

function createdHtml(info) {
  const {
    weather: [arr],
    name,
  } = info;
  let body = '';
  body += `
  <div class="card text-center" style="width: 18rem;background: #000046;    background: -webkit-linear-gradient(to top, #1CB5E0, #000046); 
  background: linear-gradient(to top, #1CB5E0, #000046); 
  ">
  <h5 class="card-title" style="color:white;">${name} </h5>
  <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" 
  class="card-img-top" alt="${name} ">
  <div class="card-body">
    <p class="card-text-min" style="color:#ABED5A;font-weight:800;" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-snow" viewBox="0 0 16 16">
    <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5"/>
    <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5"/>
  </svg> ${info.main.temp_min}ºC </p>
    <p class="card-text-max" style="color:#5AEDE0;font-weight:800;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
    <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
    <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/>
  </svg> ${info.main.temp_max}ºC </p>
    <p class="card-text-description"> ${arr.description} </p>
    <p class="card-text-wind" style="color:#0048E6;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
  </svg> ${info.wind.speed} </p>
  </div>
</div>`;
  document.getElementById('body').innerHTML = body;
}

choice();
