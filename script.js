const counterElement = document.getElementById('counter');
const decrementButton = document.getElementById('decrement-btn');
const incrementButton = document.getElementById('increment-btn');
const resetButton = document.getElementById('reset-btn');

let count = 0;

const updateCounter = () => {
  counterElement.textContent = count;
};

incrementButton.addEventListener('click', () => {
  count += 1;
  updateCounter();
});

decrementButton.addEventListener('click', () => {
  count -= 1;
  updateCounter();
});

resetButton.addEventListener('click', () => {
  count = 0;
  updateCounter();
});
