'use strict';

let socket = io();

window.addEventListener('load', init);

function init(){
    let nameField = document.querySelector('#name');
    let userBtn = document.querySelector('#user');
    let gmBtn = document.querySelector('#gameMaster');
    let gmHidden = document.querySelector('#hidden');
    let gmHiddenBtn = document.querySelector('#gmHiddenBtn');
    let gmID = document.querySelector('#gmID');

    let clickCounter = false;

    userBtn.addEventListener('click', ()=>{
        if(nameField.value === ''){
            socket.emit('userReady', 'Jesus');
        } else {
            socket.emit('userReady', nameField.value);
        }
    });

    gmBtn.addEventListener('click', (e)=>{
        if(clickCounter === false){
            e.preventDefault();                     // Så inte "Gamemaster knappen" funkar som submit i form
            gmHidden.classList.remove('hidden');
            gmHidden.classList.add('flex');
            gmBtn.classList.remove('bg-gray-300');
            gmBtn.classList.add('bg-blue-200');
            clickCounter = true;
            dropDown();
        } else {
            e.preventDefault();                     // Så inte "Gamemaster knappen" funkar som submit i form
            dropUp();
            clickCounter = false;
            setTimeout(() => {
                gmHidden.classList.remove('flex');
                gmHidden.classList.add('hidden');
                gmBtn.classList.remove('bg-blue-200');
                gmBtn.classList.add('bg-gray-300');
            }, 200);
        }
    });

    function dropDown(){
        
        gmHidden.style.top = '-100px';
        let pos = -100;
        let id;
        clearInterval(id);
        id = setInterval(frame, 1);

        function frame(){
            if(pos == -10){
                clearInterval(id);
            }else{
                pos += 10;
                gmHidden.style.top = pos + 'px';
            }
        }
    }

    function dropUp(){
        
        gmHidden.style.top = '-10px';
        let pos = -10;
        let id;
        clearInterval(id);
        id = setInterval(frame, 1);

        function frame(){
            if(pos == -120){
                clearInterval(id);
            }else{
                pos -= 10;
                gmHidden.style.top = pos + 'px';
            }
        }
    }
};