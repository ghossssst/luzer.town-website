function onPageLoaded() {
    console.log("page loaded");
}

function showLargeImage(imageSrc) {
    var largeImage = document.getElementById("largeImage");
    largeImage.src = imageSrc;

    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";
}

function hideLargeImage() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
}

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const ipAddressElement = document.getElementById("ip-address");

        fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(data => {
                ipAddressElement.textContent = data.ip;
            })
            .catch(error => {
                ipAddressElement.textContent = "Unable to fetch IP address";
                console.error("Error fetching IP address:", error);
            });
    });

    (function () {
        const starPositions = [
            // Andromeda
            { x: 1100, y: 620 },
            { x: 1215, y: 535 },
            { x: 1375, y: 500 },
            { x: 1400, y: 640 },
            // Apus
            { x: 200, y: 700 },
            { x: 250, y: 735 },
            { x: 220, y: 750 },
            { x: 440, y: 770 },
            // Are
            { x: 875, y: 200 },
            { x: 1000, y: 190 },
            { x: 1085, y: 250 },
            { x: 1075, y: 320 },
            { x: 1100, y: 390 },
            { x: 1000, y: 430 },
            { x: 1015, y: 320 },
            // Aries
            { x: 400, y: 500 },
            { x: 575, y: 525 },
            { x: 630, y: 560 },
            { x: 650, y: 600 },
        ];

        const starCharacters = ["*", "+", "⟡", "˚", "✦", "."];

        function getRandomPosition() {
            const width = window.screen.availWidth;
            const height = window.screen.availHeight;
            const randomX = Math.floor(Math.random() * (width - 10));
            const randomY = Math.floor(Math.random() * (height - 10));
            return { x: randomX, y: randomY };
        }

        function getRandomStarCharacter() {
            const randomIndex = Math.floor(Math.random() * starCharacters.length);
            return starCharacters[randomIndex];
        }

        function createStar(x, y, isFixed = false) {
            const star = document.createElement("div");
            star.classList.add("star");
            if (isFixed) {
                star.classList.add("fixed");
            }
            star.innerHTML = getRandomStarCharacter();
            star.style.position = "absolute";
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            document.body.appendChild(star);

            if (!isFixed) {
                // Apply fade-in effect immediately
                star.classList.add("fade-in");

                // Apply fade-out effect after 3 seconds
                setTimeout(() => {
                    star.classList.remove("fade-in");
                    star.classList.add("fade-out");

                    // Remove star from DOM after fade-out animation completes
                    setTimeout(() => {
                        star.remove();
                    }, 2000); // Match the duration of the fade-out animation
                }, 3000); // Duration for which star stays visible before fading out
            }
        }

        function generateRandomStars() {
            const existingStars = document.querySelectorAll(".star:not(.fixed)");
            existingStars.forEach(star => star.remove());

            const width = window.screen.availWidth;
            const height = window.screen.availHeight;
            const randomAmount = Math.floor(Math.random() * ((width + height) / 50));
            for (let i = 0; i < randomAmount; i++) {
                const { x, y } = getRandomPosition();
                createStar(x, y);
            }
        }

        function generateFixedStars() {
            starPositions.forEach(({ x, y }) => {
                createStar(x, y, true);
            });
        }

        function generateRandomFixedStars() {
            const width = window.screen.availWidth;
            const height = window.screen.availHeight;
            const numberOfStars = Math.max(5, Math.floor((width + height) / 30)); // Ensure at least some stars

            for (let i = 0; i < numberOfStars; i++) {
                const { x, y } = getRandomPosition();
                createStar(x, y, true);
            }
        }

        function startStarsGeneration() {
            generateRandomStars();

            setInterval(() => {
                generateRandomStars();
            }, 5000);
        }

        window.onload = () => {
            generateFixedStars();
            generateRandomFixedStars();
            startStarsGeneration();
        };
    })();


    document.addEventListener("DOMContentLoaded", () => {
        const windows = [
            { buttonId: "toggleButton1", windowId: "floatingWindow1", runningId: "Button1running" },
            { buttonId: "toggleButton2", windowId: "floatingWindow2", runningId: "Button2running" },
            { buttonId: "toggleButton3", windowId: "floatingWindow3", runningId: "Button3running", contentId: "content3" },
            { buttonId: "toggleButton4", windowId: "floatingWindow4", runningId: "Button4running" },
            { buttonId: "toggleButton5", windowId: "floatingWindow5", runningId: "Button5running" },
            { buttonId: "toggleButton6", windowId: "floatingWindow6", runningId: "Button6running", contentId: "content6" }
        ];

        let highestZIndex = 1000;
        let lowestZIndex = 999;
        let cascadeOffsetX = 20;
        let cascadeOffsetY = 20;
        let nextWindowX = 300;
        let nextWindowY = 50;

        windows.forEach(({ buttonId, windowId, runningId, contentId }) => {
            const toggleButton = document.getElementById(buttonId);
            const floatingWindow = document.getElementById(windowId);
            const running = document.getElementById(runningId);
            const header = floatingWindow ? floatingWindow.querySelector(".header") : null;
            const closeButton = floatingWindow ? floatingWindow.querySelector(".close") : null;
            const minimaliseButton = floatingWindow ? floatingWindow.querySelector(".minimalise") : null;
            const contentDiv = contentId ? document.getElementById(contentId) : null;

            if (!floatingWindow || !toggleButton || (contentId && !contentDiv)) {
                console.error(`One or more elements not found for buttonId: ${buttonId}, windowId: ${windowId}, contentId: ${contentId}`);
                return;
            }

            let originalContent = contentDiv ? contentDiv.innerHTML : "";

            floatingWindow.style.display = "none";
            floatingWindow.style.position = "absolute";

            if (running) running.style.display = "none";

            let isDragging = false;
            let offsetX = 0;
            let offsetY = 0;

            const startDragging = (e) => {
                isDragging = true;
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);
                offsetX = clientX - floatingWindow.getBoundingClientRect().left;
                offsetY = clientY - floatingWindow.getBoundingClientRect().top;
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
                document.addEventListener("touchmove", onTouchMove);
                document.addEventListener("touchend", onTouchEnd);

                bringToFront(floatingWindow);
            };

            const stopDragging = () => {
                isDragging = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
                document.removeEventListener("touchmove", onTouchMove);
                document.removeEventListener("touchend", onTouchEnd);
            };

            const onMouseMove = (e) => {
                if (isDragging) {
                    updateWindowPosition(e.clientX, e.clientY);
                }
            };

            const onMouseUp = () => {
                stopDragging();
            };

            const onTouchMove = (e) => {
                if (isDragging) {
                    const touch = e.touches[0];
                    updateWindowPosition(touch.clientX, touch.clientY);
                }
            };

            const onTouchEnd = () => {
                stopDragging();
            };

            const updateWindowPosition = (clientX, clientY) => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const windowWidth = floatingWindow.offsetWidth;
                const windowHeight = floatingWindow.offsetHeight;

                let x = clientX - offsetX;
                let y = clientY - offsetY;

                x = Math.max(0, Math.min(viewportWidth - windowWidth, x));
                y = Math.max(0, Math.min(viewportHeight - windowHeight, y));

                floatingWindow.style.left = `${x}px`;
                floatingWindow.style.top = `${y}px`;
            };

            if (header) {
                header.addEventListener("mousedown", startDragging);
                header.addEventListener("touchstart", (e) => {
                    startDragging(e);
                });
            }

            if (toggleButton) toggleButton.addEventListener("click", () => {
                if (floatingWindow.style.display === "none") {
                    floatingWindow.style.left = `${nextWindowX}px`;
                    floatingWindow.style.top = `${nextWindowY}px`;
                    floatingWindow.style.display = "block";
                    if (running) running.style.display = "block";
                    bringToFront(floatingWindow);

                    nextWindowX += cascadeOffsetX;
                    nextWindowY += cascadeOffsetY;

                    if (nextWindowX + floatingWindow.offsetWidth > window.innerWidth) {
                        nextWindowX = 50;
                    }
                    if (nextWindowY + floatingWindow.offsetHeight > window.innerHeight) {
                        nextWindowY = 50;
                    }
                } else {
                    floatingWindow.style.display = "none";
                    if (running) running.style.display = "none";
                }
            });

            if (closeButton) closeButton.addEventListener("click", () => {
                floatingWindow.style.display = "none";
                if (running) running.style.display = "none";
            });

            if (minimaliseButton) minimaliseButton.addEventListener("click", () => {
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

            function addinternalwindowbuttonPersonalListeners() {
                const links = floatingWindow.querySelectorAll(".internalNavLink");
                links.forEach(link => {
                    link.addEventListener("click", (e) => {
                        e.preventDefault();
                        const option = link.textContent.trim().toLowerCase();
                        fetch(`../pages/${option}.html`)
                            .then(response => response.text())
                            .then(data => {
                                if (contentDiv) {
                                    originalContent = contentDiv.innerHTML;
                                    contentDiv.innerHTML = data;
                                    const backButton = floatingWindow.querySelector(".back-button");
                                    if (backButton) {
                                        backButton.style.visibility = "visible";

                                        backButton.addEventListener("click", () => {
                                            contentDiv.innerHTML = originalContent;
                                            backButton.style.visibility = "hidden";
                                            addinternalwindowbuttonPersonalListeners();
                                        }, { once: true });
                                    }
                                }
                            })
                            .catch(error => {
                                console.error("Error fetching the page:", error);
                                if (contentDiv) contentDiv.innerHTML = "<p>Error loading content.</p>";
                            });
                    });
                });
            }

            addinternalwindowbuttonPersonalListeners();
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const spiderContainer = document.getElementById("spider-container");
        const spiderPre = document.getElementById("spider-pre");
        const spiderSound = document.getElementById("spider-sound");

        const originalContent = `''"~,,.~"'/|
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
         , | ,
        .| | |.
        || | ||
        || | ||
        \\\\(^)// 
         //8\\\\  
         \\' '/
          ' '
    `;

        const newContent = `''"~,,.~"'/|
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
         , | ,
        .| | |.
        || | ||
        || | ||
        \\\\(^)// 
         //8\\\\  
         \\' '/
          ' '
    `;

        spiderContainer.addEventListener("mouseover", function () {
            spiderPre.textContent = newContent;
        });

        spiderContainer.addEventListener("mouseout", function () {
            spiderPre.textContent = originalContent;
        });

        spiderSound.volume = 0.1;

        spiderContainer.addEventListener("mouseenter", function () {
            spiderSound.currentTime = 0;
            spiderSound.play();
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const clickSound = document.getElementById("click-sound");
        const clickButtons = document.querySelectorAll(".directorybutton, .minimalise, .close, .infobutton, .copyEmailBtn, .back-button, .internalwindowbuttonPersonal, .internalwindowbutton");

        clickSound.volume = 0.4;

        clickButtons.forEach(function (button) {
            button.addEventListener("mousedown", function () {
                clickSound.currentTime = 0.02;
                clickSound.play().catch(function (error) {
                    console.error("Error playing sound:", error);
                });
            });
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            const seconds = String(now.getSeconds()).padStart(2, "0");
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            document.getElementById("datetime").textContent = formattedTime;
        }

        updateTime();

        setInterval(updateTime, 1000);
    });

    document.addEventListener("DOMContentLoaded", function () {
        const frames = [
            "|",
            "/",
            "-",
            "\\"
        ];

        let currentFrame = 0;
        const asciiArtElement = document.getElementById("loading");

        function animate() {
            asciiArtElement.textContent = frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
        }

        setInterval(animate, 1000);
    });

    document.addEventListener("DOMContentLoaded", function () {
        const visibleFrames = [
            "˵♥ᴗ♥˵",
            "˵♡ᴗ♡˵",
            "˵♥ᴗ♥˵",
            "˵♡ᴗ♡˵"
        ];

        const hiddenFrames = [
            "˵𐌗ᴗ𐌗˵",
            "˵𐌗ᴗ𐌗˵",
            "˵⠀ᴗ⠀˵"
        ];

        let currentFrame = 0;
        let intervalID;
        const titleElement = document.getElementById("titleanimation");
        const originalTitle = document.title;
        let isPageHidden = false;

        function animateTitle() {
            const frames = isPageHidden ? hiddenFrames : visibleFrames;
            titleElement.textContent = frames[currentFrame];
            document.title = frames[currentFrame];
            currentFrame = (currentFrame + 1) % frames.length;
        }

        function startAnimation() {
            intervalID = setInterval(animateTitle, 400);
        }

        function stopAnimation() {
            clearInterval(intervalID);
        }

        startAnimation();

        document.addEventListener("visibilitychange", function () {
            isPageHidden = document.hidden;
            currentFrame = 0;
            if (document.hidden) {
                stopAnimation();
                startAnimation();
            } else {
                stopAnimation();
                startAnimation();
            }
        });
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    document.addEventListener("DOMContentLoaded", function () {

    });

    document.addEventListener("DOMContentLoaded", function () {
        const flyingBat = document.getElementById("frame");
        const batContainer = document.getElementById("bat-container");
        const batPre = document.getElementById("bat-pre");
        const batidlesound = document.getElementById("batidle-sound");
        const battakeoffsound = document.getElementById("battakeoff-sound");

        batidlesound.volume = 0.1;
        battakeoffsound.volume = 0.1;

        const originalContent = `  /\\"/\\
  'v-v'
            `;

        const newContent = `\\'-.".-'/ 
 \\/v-v\\/
            `;

        batContainer.addEventListener("mouseover", function () {
            batPre.textContent = newContent;
            batidlesound.currentTime = 0;
            batidlesound.play();
        });

        batContainer.addEventListener("mouseout", function () {
            batPre.textContent = originalContent;
        });

        batContainer.addEventListener("mousedown", function () {
            batContainer.style.display = "none";
            flyingBat.style.display = "block";

            battakeoffsound.currentTime = 0;
            battakeoffsound.play();

            var $mouseX = 450, $mouseY = 400;
            var $xp = 450, $yp = 400;

            var follow = document.getElementById("follow");

            document.addEventListener("mousemove", function (e) {
                $mouseX = e.clientX;
                $mouseY = e.clientY;
            });

            var $loop = setInterval(function () {
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                $xp += (($mouseX - $xp) / 10);
                $yp += (($mouseY - $yp) / 10);

                follow.style.left = $xp + "px";
                follow.style.top = $yp + "px";
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
                const frameElement = document.getElementById("frame");
                frameElement.textContent = frames[currentFrame];
                currentFrame = (currentFrame + 1) % frames.length;
            }

            setInterval(updateFrame, 120);

            updateFrame();
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const audioElements = document.querySelectorAll("audio");
        const iframe = document.getElementById("mediaIframe");
        const muteButton = document.querySelector(".muteButton");
        const volumeButtons = document.querySelectorAll(".volumeButton");
        const volumeLevelCounter = document.getElementById("volumeLevelCounter");

        function setVolume(volume) {
            audioElements.forEach(audio => {
                audio.volume = volume;
                audio.muted = false;
            });
            volumeLevelCounter.textContent = `${Math.round(volume * 100)}%`;
            updateButtonColors(volume);

            if (iframe.contentWindow) {
                const audioElements = iframe.contentWindow.document.querySelectorAll("audio, video");
                audioElements.forEach(audio => {
                    audio.volume = volume;
                    audio.muted = false;
                });
                volumeLevelCounter.textContent = `${Math.round(volume * 100)}%`;
                updateButtonColors(volume);
            }
        }

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

        muteButton.addEventListener("click", function () {
            audioElements.forEach(audio => {
                audio.muted = !audio.muted;
                if (audio.muted) {
                    volumeLevelCounter.textContent = "0%";
                    updateButtonColors(0);
                } else {
                    const lastVolume = parseFloat(volumeLevelCounter.textContent) / 100;
                    setVolume(lastVolume);
                }
            });
        });

        volumeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const volume = parseFloat(this.getAttribute("data-volume"));
                setVolume(volume);
            });
        });

        const volumeControls = document.getElementById("volumeControls");

        volumeControls.addEventListener("wheel", function (event) {
            event.preventDefault();
            let currentVolume = parseFloat(volumeLevelCounter.textContent) / 100;
            let newVolume = currentVolume + (event.deltaY < 0 ? 0.05 : -0.05);
            newVolume = Math.max(0, Math.min(1, newVolume));
            setVolume(newVolume);
        });

        const initialVolume = 0.1;
        setVolume(initialVolume);
    });

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("copyEmailBtn").addEventListener("click", function () {
            var button = document.getElementById("copyEmailBtn");
            var email = document.getElementById("email").textContent;

            var tempInput = document.createElement("input");
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            button.innerHTML = "[&#9734]--------[copied!]";
        });
    });
})();