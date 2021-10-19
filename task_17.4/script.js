const timeZone = document.querySelector('#timeZone');
const dateTime = document.querySelector('#dateTime');
const btn = document.querySelector('.j-btn-test');


const error = () => {
  timeZone.textContent = 'error';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  let xhr = new XMLHttpRequest();
// Инициализируем запрос
xhr.open('GET', `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`);

// Добавляем обрабочик ответа сервера
xhr.onload = function() {
  if (xhr.status != 200) { // HTTP ошибка?
    // Если статус не 200 (указывает, что запрос выполнен успешно),
    // то обрабатываем отдельно
    console.log('Статус ответа: ', xhr.status);
  } else {
  
    // Парсим и выводим ответ сервера
    timeZone.textContent = `Временная зона, в которой Вы находитесь: ${JSON.parse(xhr.response).timezone}`;
    
    dateTime.textContent = `местные дата и время: ${JSON.parse(xhr.response).date_time_txt}`;
    
  }
};

// Добавляем обрабочик процесса загрузки
xhr.onprogress = function(event) {
  // Выведем прогресс загрузки
  console.log(`Загружено ${event.loaded} из ${event.total}`)
};

// Добавляем обрабочик ошибки
xhr.onerror = function() {
  // обработаем ошибку, не связанную с HTTP (например, нет соединения)
  console.log('Ошибка! Статус ответа: ', xhr.status);
};

// Отправляем запрос
xhr.send();

};

btn.addEventListener('click', () => {
 
    if (!navigator.geolocation) {
      timeZone.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
      timeZone.textContent = 'Определение местоположения…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
    });