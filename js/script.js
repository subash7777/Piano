let keyboard = document.querySelector('.piano__keyboard');
let controls = document.querySelectorAll('.piano__control__option');
let pianoNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
let keyboardMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N'];
let keys =[];

let happyBirthday = `G4,G4,A4,G4,C4,B4,
                    G4,G4,A4,G4,D5,C5,
                    G4,G4,G5,E5,C5,B4,A4,
                    F5,F5,E5,C5,D5,C5`;

let playSong = (notesString, tempo) => {
    let notes = notesString.split(',');
    let currentNote = 0;

    let interval
}

let init =() => {
    for(let i = 1; i<=5; i++) { 
        for(let j = 0; j<7; j++) {
            let key = createKey('white', pianoNotes[j], i);
            key.dataset.keyboard = keyboardMap[j + (i - 1) * 7]
            keyboard.appendChild(key); 

            if(j !=2 && j !=6) {
                 key = createKey('black', pianoNotes[j], i);
                 key.dataset.keyboard = '⇧+' + keyboardMap[j + (i - 1) * 7]
                 let emptySpace = document.createElement('div');
                 emptySpace.className = 'empty-space';
                 emptySpace.appendChild(key);
                 keyboard.appendChild(emptySpace);

            }
        }
    }
}

let createKey = (type, note, octave) => {
    let key = document.createElement('button');
    key.className = `piano__key piano__key--${type}`;
    key.dataset.letterNote = type == 'white' ? note+ octave: note + '#' + octave;
    key.dataset.letterNotefileName = type == 'white' ? note+ octave: note + 's' + octave;
    key.textContent = key.dataset.letterNote;
    keys.push(key);

    key.addEventListener('mousedown', () => {
        playSound(key);
        key.classList.add('piano__key--playing');
    })
    key.addEventListener('mouseup', () => {
        key.classList.remove('piano__key--playing');

    })
    return key;
}

document.addEventListener('keydown', (e) => {
    if(e.repeat) {
        return;
    }
    let lastLetter = e.code.substring(e.code.length-1);
    let isShiftPressed = e.shiftKey;
    let selector;
    if(isShiftPressed) {
        selector = `[data-keyboard = "⇧+${lastLetter}"]`;
    } else {
        selector = `[data-keyboard = ${lastLetter}]`;
    }
    let key = document.querySelector(selector);
    if(key !== null) {
        let mousedown = new Event('mousedown');
        key.dispatchEvent(mousedown);
    }
})

document.addEventListener('keyup', (e) => {
    let lastLetter = e.code.substring(e.code.length-1);
    let isShiftPressed = e.shiftKey;
    let selector;
    if(isShiftPressed) {
        selector = `[data-keyboard = "⇧+${lastLetter}"]`;
    } else {
        selector = `[data-keyboard = ${lastLetter}]`;
    }
    let key = document.querySelector(selector);
    if(key !== null) {
        let mouseup = new Event('mouseup');
        key.dispatchEvent(mouseup);
    }
})

let playSound = (key) => {
    let audio = document.createElement('audio');
    audio.src = 'sounds/' + key.dataset.letterNotefileName + '.mp3';
    audio.play().then(() => audio.remove());
}

controls.forEach(input => {
    input.addEventListener('input', () => {
        let value =input.value;
        let type;
        switch(value) {
            case 'letterNotes' : type = 'letterNote'; break;
            case 'keyboard' : type = 'keyboard'; break;
            case 'none': type = '';
        }
        keys.forEach((key) => {
            key.textContent = key.dataset[type];
        })
    })
})
init();