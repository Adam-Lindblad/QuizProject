'use strict';

let socket = io();

window.addEventListener('load', init);

function init(){
    const questionNumber = document.querySelector('#questionNumber');
    const question = document.querySelector('#question');
    const alternative1 = document.querySelector('#alt1');
    const alternative2 = document.querySelector('#alt2');
    const alternative3 = document.querySelector('#alt3');
    const alternative4 = document.querySelector('#alt4');

    socket.on('incomingQuestion', data=>{
        questionNumber.textContent = 'Question number: ' +data.qNumber;
        question.textContent = data.q;
        alternative1.textContent = data.alt1;
        alternative2.textContent = data.alt2;
        alternative3.textContent = data.alt3;
        alternative4.textContent = data.alt4;

        alternative1.classList.toggle('hidden');
        alternative2.classList.toggle('hidden');
        alternative3.classList.toggle('hidden');
        alternative4.classList.toggle('hidden');

        alternative1.addEventListener('click', ()=>{                            // Todo:    Fixa klickare på svarsalternativen
                                                                                //          Lägga till ett "rättsvar", shuffla på något sätt
        });                                                                     //          Lägga till funktion så GM ser hur många som svarat
                                                                                //          Lägga till kakor för GM som håller på rätt questionnumber
        alternative2.addEventListener('click', ()=>{                            //          Lägga till funktion som kollar om kakor finns och isåfall kan man inte skapa ny användare
                                                                                //          Ta hand på GM sidan när svar tagits emot
        });                                                                     //          När ny fråga tas emot skall den förra tas bort
                                                                                //          Kanske funktion som säger att man svarat rätt/fel
        alternative3.addEventListener('click', ()=>{                            //          
                                                                                //
        });                                                                     //
                                                                                //          .. and more to come
        alternative4.addEventListener('click', ()=>{                            //
                                                                                //
        });                                                                     //

    });


}