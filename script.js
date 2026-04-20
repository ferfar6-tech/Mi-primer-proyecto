const counterElement = document.getElementById('counter');
const decrementButton = document.getElementById('decrement-btn');
const incrementButton = document.getElementById('increment-btn');
const resetButton = document.getElementById('reset-btn');
const randomImageElement = document.getElementById('random-image');

const imageOptions = [
  'https://picsum.photos/seed/earth-night/640/360',
  'https://picsum.photos/seed/aurora-sky/640/360',
  'https://picsum.photos/seed/mountains-world/640/360',
  'https://picsum.photos/seed/ocean-blue-planet/640/360',
  'https://picsum.photos/seed/space-nebula/640/360',
  'https://picsum.photos/seed/moon-craters/640/360',
  'https://picsum.photos/seed/saturn-rings/640/360',
  'https://picsum.photos/seed/galaxy-stars/640/360'
];

let count = Number.parseInt(localStorage.getItem('counterValue') ?? '0', 10);

if (Number.isNaN(count)) {
  count = 0;
}

const updateCounter = () => {
  counterElement.textContent = count;
  localStorage.setItem('counterValue', String(count));

  counterElement.classList.add('bump');
  setTimeout(() => {
    counterElement.classList.remove('bump');
  }, 170);
};

const setRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imageOptions.length);
  randomImageElement.src = imageOptions[randomIndex];
};

incrementButton.addEventListener('click', () => {
  count += 1;
  updateCounter();
  setRandomImage();
});

decrementButton.addEventListener('click', () => {
  count -= 1;
  updateCounter();
  setRandomImage();
});

resetButton.addEventListener('click', () => {
  count = 0;
  updateCounter();
});

updateCounter();
setRandomImage();
