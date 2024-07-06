function onPageLoaded() {
  console.log("page loaded");
  displayBrowserInfo();
  loadImagesWithProgress();
}

function showLargeImage(imageSrc) {
  var largeImage = document.getElementById('largeImage');
  largeImage.src = imageSrc;

  var overlay = document.getElementById('overlay');
  overlay.style.display = 'block';
}

function hideLargeImage() {
  var overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  const ipAddressElement = document.getElementById('ip-address');

  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          ipAddressElement.textContent = data.ip;
      })
      .catch(error => {
          ipAddressElement.textContent = 'Unable to fetch IP address';
          console.error('Error fetching IP address:', error);
      });
});

function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Email address copied to clipboard: ' + text);
}

document.addEventListener('DOMContentLoaded', (event) => {

  const windows = [
      { buttonId: 'toggleButton1', windowId: 'floatingWindow1' },
      { buttonId: 'toggleButton2', windowId: 'floatingWindow2' },
      { buttonId: 'toggleButton3', windowId: 'floatingWindow3' },
      { buttonId: 'toggleButton4', windowId: 'floatingWindow4' },
      { buttonId: 'toggleButton5', windowId: 'floatingWindow5' },
  ];

  windows.forEach(({ buttonId, windowId }) => {
    const toggleButton = document.getElementById(buttonId);
    const floatingWindow = document.getElementById(windowId);
    const header = floatingWindow.querySelector('.header');
    const closeButton = floatingWindow.querySelector('.close');
    const minimaliseButton = floatingWindow.querySelector('.minimalise');

    floatingWindow.style.display = 'none';
    floatingWindow.style.position = 'absolute';

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
        offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            floatingWindow.style.left = `${x}px`;
            floatingWindow.style.top = `${y}px`;
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    toggleButton.addEventListener('click', () => {
        if (floatingWindow.style.display === 'none') {
            const randomX = getRandomInt(200, 500);
            const randomY = getRandomInt(100, 200);
            floatingWindow.style.left = `${randomX}px`;
            floatingWindow.style.top = `${randomY}px`;
            floatingWindow.style.display = 'block';
        } else {
            floatingWindow.style.display = 'none';
        }
    });

    closeButton.addEventListener('click', () => {
        floatingWindow.style.display = 'none';
    });

    minimaliseButton.addEventListener('click', () => {
      floatingWindow.style.display = 'none';
    });
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

