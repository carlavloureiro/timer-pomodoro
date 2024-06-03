let timerContainer = document.querySelector('.timer-container');
let pomodoroTimer = document.querySelector('.timer');
let botoesTimer = document.querySelector('.controle-timer');
let botoesIntervaloContainer = document.querySelector('.controle-intervalo');
let breakContainer = document.querySelector('.intervalo-container');
let pomodoroBreak = document.querySelector('.intervalo');
let iniciarIntervaloContainer = document.querySelector('.iniciar-intervalo-container');
let reiniciarTimerContainer = document.querySelector('.reiniciar-timer-container');

let minuto = 25;
let segundo = 0;
let pausado = false;
let graus = 0;
let intervalVisible = false;
let minutoIntervalo = 5;
let segundoIntervalo = 0;
let regressivaTimer;
let timerEmExecucao = false;
let intervaloEmExecucao = false;

document.addEventListener('DOMContentLoaded', iniciarTempo);

function iniciarTempo() {
    pomodoroTimer.innerHTML = minuto + ":" + (segundo < 10 ? "0" + segundo : segundo);
    pausado = true;
}

function iniciarContagem() {
    clearInterval(regressivaTimer);
    pausado = false;
    timerEmExecucao = true;
    intervaloEmExecucao = false;
    atualizarSegundos();
    regressivaTimer = setInterval(atualizarSegundos, 1000);
}

function iniciarContagemIntervalo() {
    clearInterval(regressivaTimer);
    pausado = false;
    intervaloEmExecucao = true;
    timerEmExecucao = false;
    atualizarSegundosIntervalo();
    regressivaTimer = setInterval(atualizarSegundosIntervalo, 1000);
}

function atualizarSegundos() {
    preencherCirculo();
    if (!pausado) {
        if (minuto === 0 && segundo === 0) {
            clearInterval(regressivaTimer);
            iniciarIntervalo();
            return;
        }
        if (segundo === 0) {
            segundo = 59;
            minuto--;
        } else {
            segundo--;
        }
        pomodoroTimer.innerHTML = minuto + ":" + (segundo < 10 ? "0" + segundo : segundo);
    }
}

function atualizarSegundosIntervalo() {
    preencherCirculo();
    if (!pausado) {
        if (minutoIntervalo === 0 && segundoIntervalo === 0) {
            clearInterval(regressivaTimer);
            finalizarIntervalo();
            return;
        }
        if (segundoIntervalo === 0) {
            segundoIntervalo = 59;
            minutoIntervalo--;
        } else {
            segundoIntervalo--;
        }
        pomodoroBreak.innerHTML = minutoIntervalo + ":" + (segundoIntervalo < 10 ? "0" + segundoIntervalo : segundoIntervalo);
    }
}

function pausarTimer() {
    pausado = true;
    clearInterval(regressivaTimer);
}

function preencherCirculo() {
    if (!pausado) {
        if (timerEmExecucao) {
            graus += 360 / (25 * 60);
            pomodoroTimer.style.background = `conic-gradient(#FD5D5B ${graus}deg, transparent ${graus}deg)`;
        } else if (intervaloEmExecucao) {
            graus += 360 / (5 * 60);
            pomodoroBreak.style.background = `conic-gradient(#FD5D5B ${graus}deg, transparent ${graus}deg)`;
        }
    }
}

function mostrarTempoIntervalo() {
    pomodoroBreak.innerHTML = minutoIntervalo + ":" + (segundoIntervalo < 10 ? "0" + segundoIntervalo : segundoIntervalo);
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
    iniciarContagemIntervalo();
}

function finalizarIntervalo() {
    minutoIntervalo = 5;
    segundoIntervalo = 0;
    intervaloEmExecucao = false;
    minuto = 25;
    segundo = 0;
    pausado = true;
    graus = 0;

    pomodoroTimer.innerHTML = minuto + ":" + (segundo < 10 ? "0" + segundo : segundo);
    pomodoroTimer.style.background = 'none';

    timerContainer.style.display = 'flex';
    breakContainer.style.display = 'none';
    iniciarIntervaloContainer.style.display = 'flex';
    reiniciarTimerContainer.style.display = 'none';
    botoesIntervaloContainer.style.display = 'none';
    botoesTimer.style.display = 'flex';
}
