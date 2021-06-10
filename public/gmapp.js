'use strict';

let socket = io();

let upperH2 = document.querySelector('#gmName');
let tBody = document.querySelector('tbody');
let submit = document.querySelector('#submit');
let question = document.querySelector('#question');
let alt1 = document.querySelector('#alt1');
let alt2 = document.querySelector('#alt2');
let alt3 = document.querySelector('#alt3');
let alt4 = document.querySelector('#alt4');

let alts = [alt1, alt2, alt3, alt4];
let sentData = [];
let qCounter = 0;

submit.addEventListener('click', ()=>{
    validate(question.value, alts);
});

function validate(){
    let qApproved = false;
    let approvedAlts = [false, false, false, false];

    if(question.value !== ""){
        qApproved = true;
    } else {
        question.placeholder = "Please enter something..!";
        qApproved = false;
    }

    for(let i=0; i<4; i++){
        
        if(alts[i].value !== ""){
            approvedAlts[i] = true;
        } else {
            alts[i].placeholder = "We need alternatives..!";
            approvedAlts[i] = false;
        }
    }

    if(approvedAlts[0] === true &&
        approvedAlts[1] === true &&
        approvedAlts[2] === true &&
        approvedAlts[3] === true &&
        qApproved === true){
        sentData = [question.value ,alts[0].value, alts[1].value, alts[2].value, alts[3].value];
        ++qCounter;
        validatedData();

        question.value = "";
        alt1.value = "";
        alt2.value = "";
        alt3.value = "";
        alt4.value = "";
    }
};

function validatedData(){
    socket.emit('outgoingQuestion',{
        "q": sentData[0],
        "alt1": sentData[1],
        "alt2": sentData[2],
        "alt3": sentData[3],
        "alt4": sentData[4],
        "qNumber": qCounter
    });

    sentData = [];
};

socket.on('gmData', data =>{
    upperH2.textContent = 'Welcome Gamemaster ' +data.gameMaster;

    for(let i=0; i < data.players.length; i++){
        let trNode = document.createElement('tr');
        let nameNode = document.createElement('td');
        let pNode = document.createElement('td');
        let cNode = document.createElement('td');
        let wNode = document.createElement('td');

        let nameText = document.createTextNode(data.players[i]);
        let pText = document.createTextNode('0');
        let cText = document.createTextNode('0');
        let wText = document.createTextNode('0');

        nameNode.appendChild(nameText);
        pNode.appendChild(pText);
        cNode.appendChild(cText);
        wNode.appendChild(wText);

        nameNode.classList.add('border', 'border-black', 'py-2', 'pl-4', 'font-bold');
        pNode.classList.add('border', 'border-black', 'pl-2');
        cNode.classList.add('border', 'border-black', 'pl-2');
        wNode.classList.add('border', 'border-black', 'pl-2');
        
        trNode.appendChild(nameNode);
        trNode.appendChild(pNode);
        trNode.appendChild(cNode);
        trNode.appendChild(wNode);

        tBody.appendChild(trNode);
    }
});

socket.on('newPlayer', data =>{

    let trNode = document.createElement('tr');
    let nameNode = document.createElement('td');
    let pNode = document.createElement('td');
    let cNode = document.createElement('td');
    let wNode = document.createElement('td');

    let nameText = document.createTextNode(data);
    let pText = document.createTextNode('0');
    let cText = document.createTextNode('0');
    let wText = document.createTextNode('0');

    nameNode.appendChild(nameText);
    pNode.appendChild(pText);
    cNode.appendChild(cText);
    wNode.appendChild(wText);

    nameNode.classList.add('border', 'border-black', 'py-2', 'pl-4', 'font-bold');
    pNode.classList.add('border', 'border-black', 'pl-2');
    cNode.classList.add('border', 'border-black', 'pl-2');
    wNode.classList.add('border', 'border-black', 'pl-2');
    
    trNode.appendChild(nameNode);
    trNode.appendChild(pNode);
    trNode.appendChild(cNode);
    trNode.appendChild(wNode);

    tBody.appendChild(trNode);
});