function onPageLoaded() {
  // Write your javascript code here
  console.log("page loaded");
  displayBrowserInfo();
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

let el = document.getElementById('visual5');
el.style.setProperty('--rand', Math.random());
