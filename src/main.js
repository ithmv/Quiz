const items = document.querySelectorAll('.item');
const radios = document.querySelectorAll('input');
  
items.forEach((item, index) => {
  item.addEventListener('click', function() {
    radios[index].checked = true;
    items.forEach((item) => {
      item.classList.remove('active');
    });
    this.classList.add('active');
  });
});

const steps = document.querySelectorAll('.step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');

let currentStep = 0;

// Функция, которая скрывает все шаги, кроме текущего
function hideSteps() {
  steps.forEach((step) => {
    step.style.display = 'none';
  });
}

// Функция, которая показывает текущий шаг
function showStep() {
  hideSteps();
  steps[currentStep].style.display = 'flex';
}

// Функция, которая переходит на следующий шаг
function nextStep() {
  currentStep++;
  if (currentStep >= steps.length) {
    currentStep = steps.length - 1;
  }
  showStep();
}

// Функция, которая переходит на предыдущий шаг
function prevStep() {
  currentStep--;
  if (currentStep < 0) {
    currentStep = 0;
  }
  showStep();
}

// Обработчик события для кнопки "Далее"
nextBtns.forEach((btn) => {
  btn.addEventListener('click', nextStep);
});

// Обработчик события для кнопки "Назад"
prevBtns.forEach((btn) => {
  btn.addEventListener('click', prevStep);
});

// Показываем первый шаг
showStep();

const button = document.querySelector('#get-recommendations');

  button.addEventListener('click', () => {
    // отправляем ajax-запрос на сервер для получения подборки
    fetch('/get-recommendations')
      .then((response) => {
        if (response.ok) {
          // если запрос успешный, то получаем данные и выводим их на страницу
          return response.json();
        } else {
          // если произошла ошибка, то показываем сообщение с ошибкой
          throw new Error(`Произошла ошибка: ${response.statusText}`);
        }
      })
      .then((data) => {
        // обрабатываем полученные данные и выводим их на страницу
        const recommendationsContainer = document.querySelector('#recommendations');
        recommendationsContainer.innerHTML = '';

        data.forEach((item) => {
          const recommendation = document.createElement('div');
          recommendation.textContent = item.title;
          recommendationsContainer.appendChild(recommendation);
        });
      })
      .catch((error) => {
        // если произошла ошибка при выполнении запроса, то показываем сообщение с ошибкой
        alert(error.message);
      });
  });