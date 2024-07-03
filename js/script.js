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