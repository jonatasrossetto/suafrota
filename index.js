const fetchAddress =
  'http://getting-started-app-env-2.eba-sp4sea8z.sa-east-1.elasticbeanstalk.com';
// const fetchAddress = 'http://localhost:3000';

let btnStoreApiKey = document.getElementById('btnStoreApiKey');
let inputApiKey = document.getElementById('inputApiKey');

let btnStart = document.getElementById('btnStart');
let btnStop = document.getElementById('btnStop');
let btnSend = document.getElementById('btnSend');
let btnReceive = document.getElementById('btnReceive');

let loginDiv = document.getElementById('loginDiv');
let trackDiv = document.getElementById('trackDiv');

let displayStatus = document.getElementById('displayStatus');
let displayPosition = document.getElementById('displayPosition');

let stop = false;
let dadosColetados = [];
let intervalId;
let apiKey = '';

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

let texto = '';

async function returnPosition(timeDelay) {
  console.log('return position');
  await delay(timeDelay);
  await navigator.geolocation.getCurrentPosition((posicao) => {
    let momento = Date.now();
    // let teste = new Date(momento).toUTCString();
    let lat = posicao.coords.latitude;
    let long = posicao.coords.longitude;
    dadosColetados.push({
      M: {
        t: {
          S: momento.toString(),
        },
        latitude: {
          S: lat.toString(),
        },
        longitude: {
          S: long.toString(),
        },
      },
    });
  });
  displayStatus.innerText =
    'return position qtd dados coletados: ' + dadosColetados.length;
}

async function requestScreenWakeLock() {
  let wakelock = await navigator.wakeLock.request('screen');
  // displayStatus.innerText = (wakelock != null);
}

async function runLoop() {
  requestScreenWakeLock();
  let inc = 0;
  while (true) {
    if (stop) {
      break;
    }
    inc = inc + 1;
    console.log('runLoop');
    await returnPosition(5000);
    // displayPosition.innerText = `iteração: ${inc}`;
  }
}

btnStart.onclick = () => {
  console.log('start');
  runLoop();
};

btnStop.onclick = async () => {
  let texto = '';
  stop = true;
  // console.log('stop');
  // console.log('qtd dados coletados: ' + dadosColetados.length);
  displayPosition.innerText = JSON.stringify(dadosColetados);
};

// btnSend.addEventListener('click', () => {
//   console.log('send clicked');
//   fetch(fetchAddress + '/vaivolta', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: apiKey,
//     },
//     body: JSON.stringify(dadosColetados),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data.m);
//       displayStatus.innerText = data.m;
//     });
// });

btnSend.addEventListener('click', () => {
  console.log('send clicked');

  let messageBody = {
    PK: {
      S: 'testUser1',
    },
    SK: {
      S: dadosColetados[0].M.t.S,
    },
    data: {
      L: dadosColetados,
    },
  };
  console.log(messageBody.data.L.length);
  console.log(JSON.stringify(messageBody));
  fetch(fetchAddress + '/armazena', {
    referrerPolicy: 'unsafe_url',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(messageBody),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayStatus.innerText = data.m;
    });
});

btnReceive.addEventListener('click', () => {
  console.log('receive clicked');
  fetch(fetchAddress + '/devolvedados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayStatus.innerText = data;
    });
});

btnStoreApiKey.addEventListener('click', () => {
  console.log('store api key clicked');
  apiKey = inputApiKey.value;
  inputApiKey.value = '';
  displayStatus.innerText = apiKey;
  loginDiv.style.display = 'none';
  trackDiv.style.display = 'block';
});
