"use strict"

//you can use both on a real keyboard and on a virtual one
//Dont use a real CapsLock
//You can use a virtual Caps
//You can use a real Space and BackSpace


const keyArr = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 90, 88, 67, 86, 66, 78, 77, 46, 44];
//select all charCode's of keys

let keyboard = document.querySelector('#keyboard');
let area = document.querySelector('#result');
let caps, backSpace;


area.addEventListener('keydown', (e) => {e.preventDefault()}); //disable complete removal for textArea

(function createKeyboard() {
    for (let i = 0; i < keyArr.length; i++) {
        let key = document.createElement('div');
        key.classList.add('keys');
        key.dataset.code = String.fromCharCode(keyArr[i]); //pull out the simbol from CharCode and create data attribute
        key.innerHTML = String.fromCharCode(keyArr[i]).toLowerCase(); //add symbol from charCode in virtual key
        
        key.addEventListener('click', function() {
            
            if (caps.getAttribute('class') == 'altKey active') {
                area.innerHTML += String(this.innerHTML).toUpperCase(); //if caps active
            } else {
                area.innerHTML += this.innerHTML;
            } 
            
            this.classList.add('click');

            setTimeout(() => {
                this.classList.remove('click');
            }, 200); //for short animation
        })

        keyboard.append(key); //added key in keyboard
    }
})();

(function capsAdd() {
    caps = document.createElement('div');
    caps.innerHTML = 'CapsLock';
    caps.classList.add('altKey');

    caps.addEventListener('click', function() {
        this.classList.toggle('active');
    })

    keyboard.append(caps); //added capsLock
})();

(function spaceAdd() {
    let space = document.createElement('div');
    space.innerHTML = ' ';
    space.classList.add('space');
    space.classList.add('keys');
    space.dataset.code = ' '; //to check if the spacebar is pressed on the keyboard

    space.addEventListener('click', function() {
            area.innerHTML += this.innerHTML; //add space in text
            this.classList.add('click');

            setTimeout(() => {
                this.classList.remove('click');
            }, 200); //for short animation
    })

    keyboard.append(space); //added space key
})();

(function backspaceAdd() {
    backSpace = document.createElement('div');
    backSpace.innerHTML = 'BackSpace';
    backSpace.classList.add('altKey');

    backSpace.addEventListener('click', function() { //for virtual Backspace
        this.classList.add('click');
        area.innerHTML = area.innerHTML.substring(0, area.innerHTML.length - 1); //removes last simbol from the text

        setTimeout(() => {
            this.classList.remove('click');
        }, 200); //for short animation
    })

    document.addEventListener('keyup', function() { //for physical Backspace
        if (event.key == 'Backspace') {
            backSpace.classList.add('click');
            area.innerHTML = area.innerHTML.substring(0, area.innerHTML.length - 1);

            setTimeout(() => {
                backSpace.classList.remove('click');
            }, 200); //for short animation
        }
    })

    keyboard.append(backSpace); //added backSpace
})();

(function keyKeyboard() { //checks for pressing buttons on physical keyboards
    let keys = document.querySelectorAll('.keys');

    for (let key of keys) {
        document.addEventListener('keyup', function() {
            if ((key.dataset.code).toLowerCase() == event.key) {
                if (caps.getAttribute('class') == 'altKey active') {
                    area.innerHTML += String(event.key).toUpperCase();
                } else {
                    area.innerHTML += event.key;
                }
                
                key.classList.add('click');

                setTimeout(() => {
                    key.classList.remove('click');
                }, 200);
            } 
        })
    }
})();