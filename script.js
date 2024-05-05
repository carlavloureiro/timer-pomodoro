let timerContainer = document.querySelector('.timer-container');
let pomodoroTimer = document.querySelector('.timer');
let botoesTimer = document.querySelector('.controle-timer');
let botoesIntervaloContainer = document.querySelector('.controle-intervalo');
let breakContainer = document.querySelector('.intervalo-container')
let pomodoroBreak = document.querySelector('.intervalo');
let iniciarIntervaloContainer = document.querySelector('.iniciar-intervalo-container');
let reiniciarTimerContainer = document.querySelector('.reiniciar-timer-container');

let minuto = 25;
let segundo = "00";
let iterator = 1;
let pausado = false;
let graus = 0;
let intervalVisible = false;
let minutoIntervalo = 5;
let segundoIntervalo = "00";
let retomarContagem = 0;
let retomarContagemIntervalo = 0;
let regressivaTimer;
let timerEmExecucao = false;
let intervaloEmExecucao = false; 

document.addEventListener('DOMContentLoaded', iniciarTempo);

function iniciarTempo() {
    pomodoroTimer.innerHTML = minuto + ":" + segundo;
    pausado = true;
}

function iniciarContagem() {
    clearInterval(regressivaTimer); 
    if (retomarContagem == 0) {
        pausado = false;
        atualizarSegundos();
        regressivaTimer = setInterval(atualizarSegundos, 1000);
    }
    else {
        pausado = false;
        atualizarSegundos();
        clearInterval(regressivaTimer); 
        regressivaTimer = setInterval(atualizarSegundos, 1000);
    }
    timerEmExecucao = true;
}

function iniciarContagemIntervalo() {
    clearInterval(regressivaTimer);
    if (retomarContagemIntervalo == 0) {
        pausado = false;
        atualizarSegundosIntervalo();
        regressivaTimer = setInterval(atualizarSegundosIntervalo, 1000);
    }
    else {
        pausado = false;
        atualizarSegundosIntervalo();
        clearInterval(regressivaTimer);
        regressivaTimer = setInterval(atualizarSegundosIntervalo, 1000);
    }
    intervaloEmExecucao = true; // Marca que o intervalo está em execução
    timerEmExecucao = false; // Marca que o timer não está mais em execução
    preencherBorda(); // 
}

function atualizarSegundos() {
    preencherBorda();
    Number(segundo);
    let iterator = 0;
    if (pausado == false) {
        if (segundo == 0) {
            segundo = 60;
            minuto = minuto - iterator;
            iterator++;
        }    
        if (segundo > 0){
            segundo--;
            minuto = minuto - iterator;
            if (segundo < 10){
                pomodoroTimer.innerHTML = minuto + ":" + "0" + segundo;
            }
            else {
                pomodoroTimer.innerHTML = minuto + ":" + segundo;
            }
        }    
        else {
            iterator++;
        }
    } 
    else {
        return;
    }
}


function atualizarSegundosIntervalo() {
    preencherBorda();
    Number(segundoIntervalo);
    let iterator = 0;
    if (pausado == false) {
        if (segundoIntervalo == 0) {
            segundoIntervalo = 60;
            minutoIntervalo = minutoIntervalo - iterator;
            iterator++;
        }    
        if (segundoIntervalo > 0){
            segundoIntervalo--;
            minutoIntervalo = minutoIntervalo - iterator;
            if (segundoIntervalo < 10){
                pomodoroBreak.innerHTML = minutoIntervalo + ":" + "0" + segundoIntervalo;
            }
            else {
                pomodoroBreak.innerHTML = minutoIntervalo + ":" + segundoIntervalo;
            }
        }    
        else {
            iterator++;
        }
    } 
    else {
        return;
    }
}

function atualizarMinutos() {
    iterator++;
}

function pausarTimer() {
    pausado = true;
    retomarContagem++;
    clearInterval(regressivaTimer);
}

function preencherBorda() {
    if (timerEmExecucao) {
        if (intervalVisible == false) {
            graus += 0.019;
            timerContainer.style.background = `conic-gradient(#FD5D5B ${graus}deg, transparent ${graus}deg)`;
        }
        else if (intervaloEmExecucao) {
            graus += 0.019;
            breakContainer.style.background = `conic-gradient(#72A2EB ${graus}deg, transparent ${graus}deg)`;
        }
    }
}
setInterval(preencherBorda, 83,3333333);

function mostrarTempoIntervalo() {
    pomodoroBreak.innerHTML = minutoIntervalo + ":" + segundoIntervalo;
    botoesTimer.style.display = 'none';
    botoesIntervaloContainer.style.display = 'flex';
    iniciarIntervaloContainer.style.display = 'none';
    reiniciarTimerContainer.style.display = 'flex';
}

function iniciarIntervalo() {
    timerContainer.style.display = 'none';
    breakContainer.style.display = 'flex';
    intervalVisible = true;
    mostrarTempoIntervalo();
}

function finalizarIntervalo() {
    timerContainer.style.display = 'flex';
    breakContainer.style.display = 'none';
    iniciarIntervaloContainer.style.display = 'flex';
    reiniciarTimerContainer.style.display = 'none';
    botoesIntervaloContainer.style.display = 'none';
    botoesTimer.style.display = 'flex';
    intervalVisible = false;
    iniciarTempo();
}