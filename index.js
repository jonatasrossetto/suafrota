const dadosJson = [
  {
    time: '2023-06-13T14:58:49.186Z',
    latitude: -12.9840962,
    longitude: -38.449791,
  },
  {
    time: '2023-06-13T14:58:53.790Z',
    latitude: -12.9840966,
    longitude: -38.4497909,
  },
  {
    time: '2023-06-13T14:58:58.690Z',
    latitude: -12.9840972,
    longitude: -38.4497893,
  },
  {
    time: '2023-06-13T14:59:03.660Z',
    latitude: -12.9840959,
    longitude: -38.4497885,
  },
  {
    time: '2023-06-13T14:59:08.718Z',
    latitude: -12.9840972,
    longitude: -38.4497894,
  },
  {
    time: '2023-06-13T14:59:13.726Z',
    latitude: -12.9840971,
    longitude: -38.4497905,
  },
  {
    time: '2023-06-13T14:59:18.887Z',
    latitude: -12.9840993,
    longitude: -38.449792,
  },
  {
    time: '2023-06-13T14:59:23.651Z',
    latitude: -12.9840956,
    longitude: -38.449789,
  },
  {
    time: '2023-06-13T14:59:28.698Z',
    latitude: -12.9840973,
    longitude: -38.4497884,
  },
  {
    time: '2023-06-13T14:59:34.033Z',
    latitude: -12.9840978,
    longitude: -38.449788,
  },
  {
    time: '2023-06-13T14:59:40.168Z',
    latitude: -12.9840973,
    longitude: -38.4497899,
  },
  {
    time: '2023-06-13T14:59:43.729Z',
    latitude: -12.9840949,
    longitude: -38.4497883,
  },
  {
    time: '2023-06-13T14:59:48.792Z',
    latitude: -12.984098,
    longitude: -38.4497878,
  },
  {
    time: '2023-06-13T14:59:53.804Z',
    latitude: -12.9840953,
    longitude: -38.4497882,
  },
  {
    time: '2023-06-13T14:59:58.902Z',
    latitude: -12.9840953,
    longitude: -38.449789,
  },
  {
    time: '2023-06-13T15:00:03.818Z',
    latitude: -12.9840956,
    longitude: -38.4497901,
  },
  {
    time: '2023-06-13T15:00:08.813Z',
    latitude: -12.9840957,
    longitude: -38.4497915,
  },
  {
    time: '2023-06-13T15:00:13.773Z',
    latitude: -12.9840958,
    longitude: -38.449789,
  },
  {
    time: '2023-06-13T15:00:19.849Z',
    latitude: -12.9840975,
    longitude: -38.449787,
  },
  {
    time: '2023-06-13T15:00:23.782Z',
    latitude: -12.9840969,
    longitude: -38.4497896,
  },
  {
    time: '2023-06-13T15:00:29.012Z',
    latitude: -12.9840951,
    longitude: -38.4497884,
  },
  {
    time: '2023-06-13T15:00:33.899Z',
    latitude: -12.9840961,
    longitude: -38.4497914,
  },
  {
    time: '2023-06-13T15:00:39.043Z',
    latitude: -12.9840966,
    longitude: -38.4497883,
  },
  {
    time: '2023-06-13T15:00:43.970Z',
    latitude: -12.9840969,
    longitude: -38.4497893,
  },
  {
    time: '2023-06-13T15:00:48.886Z',
    latitude: -12.9840924,
    longitude: -38.4497935,
  },
  {
    time: '2023-06-13T15:00:54.034Z',
    latitude: -12.9840972,
    longitude: -38.4497884,
  },
  {
    time: '2023-06-13T15:00:58.811Z',
    latitude: -12.9840979,
    longitude: -38.4497878,
  },
  {
    time: '2023-06-13T15:01:03.976Z',
    latitude: -12.9840948,
    longitude: -38.4497882,
  },
  {
    time: '2023-06-13T15:01:09.356Z',
    latitude: -12.9840928,
    longitude: -38.4497895,
  },
  {
    time: '2023-06-13T15:01:14.233Z',
    latitude: -12.9840975,
    longitude: -38.4497881,
  },
  {
    time: '2023-06-13T15:01:18.972Z',
    latitude: -12.984094,
    longitude: -38.4497898,
  },
  {
    time: '2023-06-13T15:01:24.067Z',
    latitude: -12.9840935,
    longitude: -38.4497893,
  },
  {
    time: '2023-06-13T15:01:29.231Z',
    latitude: -12.9840939,
    longitude: -38.4497892,
  },
];
console.log(dadosJson);

const fetchAddress =
  'http://getting-started-app-env-2.eba-sp4sea8z.sa-east-1.elasticbeanstalk.com';
//const fetchAddress = 'http://localhost:3000';

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

async function returnPosition(timeDelay) {
  console.log('return position');
  await delay(timeDelay);
  await navigator.geolocation.getCurrentPosition((posicao) => {
    let now = new Date();
    let lat = posicao.coords.latitude;
    let long = posicao.coords.longitude;
    dadosColetados.push({
      time: now,
      latitude: lat,
      longitude: long,
    });
    // texto = texto + '\ntime:' + now + '\nlatitude: ' + lat + '   longitude: ' + long + '\n';
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
  console.log('stop');
  console.log('qtd dados coletados: ' + dadosColetados.length);
  displayPosition.innerText = JSON.stringify(dadosColetados);
};

btnSend.addEventListener('click', () => {
  console.log('send clicked');
  fetch(fetchAddress + '/vaivolta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify(dadosColetados),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.m);
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
