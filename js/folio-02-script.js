document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const content = document.querySelector('#content');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            processCommand(command);
            input.value = '';
        }
    });

    function processCommand(command) {
        const output = document.createElement('pre');
        output.classList.add('output');
        switch (command.toLowerCase()) {
            case 'help':
                output.textContent = 'Available commands: help, clear';
                break;
            case 'clear':
                content.innerHTML = `
                    <pre>lilacboy@silly-goose:/~$ ls</pre>
                    <pre>Breakfast     Shut-and-Die     Computer-Black</pre>
                    <pre>Butler's-Revenge     Heads or Tails</pre>
                    <pre>lilacboy@silly-goose:/~$ cd Computer-Black</pre>
                    <pre>lilacboy@silly-goose:/Computer-Black$ ./play.mp3</pre>
                    <pre>playing "Computer-Black" --</pre>
                    <pre>________________________________________</pre>
                    <pre>|                                      |</pre>
                    <pre>|    ________   ________    ________   |</pre>
                    <pre>|   /        \\ /        \\  /        \\  |</pre>
                    <pre>|  /  _______/ /   ___   \\ \\______   \\ |</pre>
                    <pre>| /  /_____    \\  \\_/  \\  \\  _____/   / |</pre>
                    <pre>| \\_____   \\    \\   _   \\  \\ \\_______/  |</pre>
                    <pre>|  ______/  / ___\\  \\_/  \\  \\ \\_____   \\ |</pre>
                    <pre>| /        / /    \\        \\        \\  \\|</pre>
                    <pre>|/________/ /_____/\\________/\\__________/|</pre>
                    <pre>|                                      |</pre>
                    <pre>|    BY Lilac Boy                        |</pre>
                    <pre>|                                      |</pre>
                    <pre>| NOW PLAYING: Computer Black           |</pre>
                    <pre>| Volume: [███████████] 100%            |</pre>
                    <pre>|                                      |</pre>
                    <pre>|                                      |</pre>
                    <pre>|--------------------------------------|</pre>
                    <pre>| 00:45                             3:28 |</pre>
                    <pre>________________________________________</pre>
                    <pre>Song 3/5 | [SPACE-PLAY/PAUSE] | [PgUp-NEXT] | [PgDn-PREV] | [ESC-TERMINAL]</pre>
                    <div class="input-line">
                        <span class="prompt">></span>
                        <input type="text" class="input" autofocus>
                    </div>
                `;
                return;
            default:
                output.textContent = `Unknown command: ${command}`;
        }
        content.insertBefore(output, content.querySelector('.input-line'));
    }
});
