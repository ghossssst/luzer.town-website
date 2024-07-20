function onPageLoaded() {
    console.log("page loaded");
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

document.addEventListener("DOMContentLoaded", function () {
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
        { buttonId: 'toggleButton1', windowId: 'floatingWindow1', runningId: "Button1running"},
        { buttonId: 'toggleButton2', windowId: 'floatingWindow2', runningId: "Button2running"},
        { buttonId: 'toggleButton3', windowId: 'floatingWindow3', runningId: "Button3running"},
        { buttonId: 'toggleButton4', windowId: 'floatingWindow4', runningId: "Button4running"},
        { buttonId: 'toggleButton5', windowId: 'floatingWindow5', runningId: "Button5running"},
    ];

    let highestZIndex = 1000;  
    let lowestZIndex = 999;

    windows.forEach(({ buttonId, windowId, runningId }) => {
        const toggleButton = document.getElementById(buttonId);
        const floatingWindow = document.getElementById(windowId);
        const running = document.getElementById(runningId);
        const header = floatingWindow.querySelector('.header');
        const closeButton = floatingWindow.querySelector('.close');
        const minimaliseButton = floatingWindow.querySelector('.minimalise');

        floatingWindow.style.display = 'none';
        floatingWindow.style.position = 'absolute';

        running.style.display = 'none';

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - floatingWindow.getBoundingClientRect().left;
            offsetY = e.clientY - floatingWindow.getBoundingClientRect().top;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
            bringToFront(floatingWindow); // Bring the window to the front when starting to drag
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
                running.style.display = 'block';
                bringToFront(floatingWindow); // Bring the window to the front when toggled
            } else {
                floatingWindow.style.display = 'none';
                running.style.display = 'none';
            }
        });

        closeButton.addEventListener('click', () => {
            floatingWindow.style.display = 'none';
            running.style.display = 'none';
        });

        minimaliseButton.addEventListener('click', () => {
            sendToBack(floatingWindow);
        });

        function bringToFront(window) {
            highestZIndex++;
            window.style.zIndex = highestZIndex;
        }

        function sendToBack(window) {
            lowestZIndex--;
            window.style.zIndex = lowestZIndex;
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const spiderContainer = document.getElementById('spider-container');
    const spiderPre = document.getElementById('spider-pre');
    const spiderSound = document.getElementById('spider-sound');

    const originalContent = `  ''"~,,.~"'/|
       ',  / |
         '/  |
          ', |
            .|
             |
             |
             |
             |
             |
             |
             |
             |
             |
             |
             |
           , | ,
          .| | |.
          || | ||
          || | ||
          \\\\(^)//
           //8\\\\  
           \\' '/
            ' '
    `;

    const newContent = `  ''"~,,.~"'/|
       ',  / |
         '/  |
          ', |
            .|
             |
             |
             |
             |
             |
             |
             |
             |
             |
             |
             |
             |
           , | ,
          .| | |.
          || | ||
          || | ||
          \\\\(^)//
           //8\\\\  
           \\' '/
            ' '
    `;

    spiderContainer.addEventListener('mouseover', function() {
        spiderPre.textContent = newContent;
    });

    spiderContainer.addEventListener('mouseout', function() {
        spiderPre.textContent = originalContent;
    });

    spiderSound.volume = 0.1;

    spiderContainer.addEventListener("mouseenter", function() {
        spiderSound.currentTime = 0;
        spiderSound.play();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const clickSound = document.getElementById('click-sound');
    const clickButtons = document.querySelectorAll('.directorybutton, .minimalise, .close');

    clickSound.volume = 0.4;

    clickButtons.forEach(function(button) {
        button.addEventListener("mousedown", function() {
            clickSound.currentTime = 0.02; 
            clickSound.play().catch(function(error) {
                console.error("Error playing sound:", error);
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        document.getElementById('datetime').textContent = formattedTime;
    }

    updateTime();

    setInterval(updateTime, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
    const frames = [
        "|",
        "/",
        "-",
        "\\"
    ];
    
    let currentFrame = 0;
    const asciiArtElement = document.getElementById('loading');
    
    function animate() {
        asciiArtElement.textContent = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
    }
    
    setInterval(animate, 300);    
});

document.addEventListener('DOMContentLoaded', function() {
    const frames = [
        "★ luzer.town ★",
        "✭ luzer.town ✭",
        "☆ luzer.town ☆",
        "✭ luzer.town ✭"
    ];
    
    let currentFrame = 0;
    const asciiArtElement = document.getElementById('titleanimation');
    
    function animate() {
        asciiArtElement.textContent = frames[currentFrame];
        currentFrame = (currentFrame + 1) % frames.length;
    }
    
    setInterval(animate, 1000);    
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', function() {


});

document.addEventListener("DOMContentLoaded", function() {
    const flyingBat = document.getElementById("frame")
    const batContainer = document.getElementById("bat-container")
    const batPre = document.getElementById("bat-pre")
    const batidlesound = document.getElementById('batidle-sound');
    const battakeoffsound = document.getElementById('battakeoff-sound');

    batidlesound.volume = 0.1;
    battakeoffsound.volume = 0.1;

    const originalContent = `  /\\"/\\
  'v-v'
            `;
    
    const newContent = `\\'-.".-'/
 \\/v-v\\/
            `;
    
    batContainer.addEventListener('mouseover', function() {
        batPre.textContent = newContent;
        batidlesound.currentTime = 0;
        batidlesound.play();
    });

    batContainer.addEventListener('mouseout', function() {
        batPre.textContent = originalContent;
    });

    batContainer.addEventListener('mousedown', function() {
        batContainer.style.display = "none";
        flyingBat.style.display = 'block';

        battakeoffsound.currentTime = 0;
        battakeoffsound.play();
     
        var $mouseX = 450, $mouseY = 400;
        var $xp = 450, $yp = 400;
        
        var follow = document.getElementById('follow');
        
        document.addEventListener('mousemove', function(e){
            $mouseX = e.clientX;
            $mouseY = e.clientY;
        });
        
        var $loop = setInterval(function(){
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            $xp += (($mouseX - $xp)/10);
            $yp += (($mouseY - $yp)/10);
            
            follow.style.left = $xp + 'px';
            follow.style.top = $yp + 'px';
        }, 80); 
        
        const frames = [
    `      ___     ___
      '._\\^-^/_.'
          '"'`,
    `
      '"-\\^-^/-"'
          '"'`,
    `
      ,.-/^-^\\-.,
          '"'`,
    `
        .'^-^'.
       /' '"' '\\`,
    `
      '"-\\^-^/-"'
          '"'`
        ];
        
        let currentFrame = 0;
        
        function updateFrame() {
            const frameElement = document.getElementById('frame');
            frameElement.textContent = frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
        }
        
        setInterval(updateFrame, 120); 
        
        updateFrame();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const audioElements = document.querySelectorAll("audio");
    const muteButton = document.querySelector(".muteButton");
    const volumeButtons = document.querySelectorAll(".volumeButton");
    const volumeLevelCounter = document.getElementById("volumeLevelCounter");

    // Function to set volume and update counter
    function setVolume(volume) {
        audioElements.forEach(audio => {
            audio.volume = volume;
            audio.muted = false;
        });
        volumeLevelCounter.textContent = `${Math.round(volume * 100)}%`;
        updateButtonColors(volume);
    }

    // Function to update button colors
    function updateButtonColors(volume) {
        volumeButtons.forEach(button => {
            const buttonVolume = parseFloat(button.getAttribute("data-volume"));
            if (buttonVolume <= volume) {
                button.querySelector(".volumeLevel").classList.remove("louder");
            } else {
                button.querySelector(".volumeLevel").classList.add("louder");
            }
        });
    }

    // Event listener for mute button
    muteButton.addEventListener("click", function() {
        audioElements.forEach(audio => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeLevelCounter.textContent = `0%`;
                updateButtonColors(0);
            } else {
                // Restore volume to the last set level
                const lastVolume = parseFloat(volumeLevelCounter.textContent) / 100;
                setVolume(lastVolume);
            }
        });
    });

    // Event listener for volume buttons
    volumeButtons.forEach(button => {
        button.addEventListener("click", function() {
            const volume = parseFloat(this.getAttribute("data-volume"));
            setVolume(volume);
        });
    });

    // Event listener for scrolling over volume controls
    const volumeControls = document.getElementById('volumeControls');

    volumeControls.addEventListener("wheel", function(event) {
        event.preventDefault();
        let currentVolume = parseFloat(volumeLevelCounter.textContent) / 100;
        let newVolume = currentVolume + (event.deltaY < 0 ? 0.05 : -0.05); // Scroll up increases volume, scroll down decreases volume
        newVolume = Math.max(0, Math.min(1, newVolume)); // Clamp volume between 0 and 1
        setVolume(newVolume);
    });

    // Initialize volume control
    const initialVolume = 0.1; // Set initial volume
    setVolume(initialVolume);
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyEmailBtn').addEventListener('click', function() {
        var button = document.getElementById('copyEmailBtn');
        var email = document.getElementById('email').textContent;

        var tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        button.innerHTML = '[copied]';
    });
});

