const counterElement = document.getElementById('counter');
const incrementButton = document.getElementById('increment-btn');

let count = 0;

incrementButton.addEventListener('click', () => {
  count += 1;
  counterElement.textContent = count;
});
