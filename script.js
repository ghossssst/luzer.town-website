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
