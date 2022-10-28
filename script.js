const kartu = document.querySelectorAll('.kartu');
const hasilSkor = document.querySelector('.score');
const rank = document.querySelector('.rank span');
const wrongAudio = document.querySelector('.wrong');
const correctAudio = document.querySelector('.correct');
const warningAudio = document.querySelector('.warning');
const progress = document.querySelector('progress');
const container = document.querySelector('.container');
const restart = document.querySelector('.restart');
const tmblRestart = document.querySelector('.tombol-restart');

// variable
let score = 0;
let kesalahan = 0;

// array gambar
const arrGambar = ['ae', 'evos', 'aura', 'btr', 'rrq', 'onic'];
arrGambar.forEach(valArrGambar => arrGambar.push(valArrGambar));

// mulai
function mulaiGame(kartu) {
    restart.style.display = 'none';
    kartu.forEach((valBukaKartu, indexBukaKartu) => {
        valBukaKartu.style.order = acakRandomKartu();
        valBukaKartu.classList.replace('kartu', arrGambar[indexBukaKartu]);
    });
    setTimeout(function () {
        kartu.forEach((valTutupKartu, indexTutupKartu) => {
            valTutupKartu.classList.replace(arrGambar[indexTutupKartu], 'kartu');
            valTutupKartu.addEventListener('click', bukaKartu);
        });
    }, 150);
}
mulaiGame(kartu);

// acak kartu
function acakRandomKartu() {
    return Math.round((Math.random() * kartu.length) + 1);
}

// check score
let arrCheck = [];
let arrCheckIndex = [];

function bukaKartu() {
    const index = this.dataset.indexNumber;
    arrCheck.push(arrGambar[index]);
    arrCheckIndex.push(index);

    this.classList.replace('kartu', arrGambar[index]);
    this.removeEventListener('click', bukaKartu);
    hasilKartu(kartu, arrCheckIndex[0], arrCheckIndex[1]);
    gameSelesai();
}

function hasilKartu(a1, a2, a3) {
    if (arrCheck.length == 2 && arrCheckIndex.length == 2) {
        if (arrCheck[0] == arrCheck[1]) {
            correctAudio.play();
            setTimeout(() => {
                a1[a2].style.opacity = '50%';
                a1[a3].style.opacity = '50%';
            }, 500);
            score += 10;
            hasilSkor.innerText = Math.floor(score);
            progress.value = Math.floor(score);
        } else {
            wrongAudio.play();
            kesalahan++;
            setTimeout(() => {
                a1[a2].classList.replace(a1[a2].classList.item(0), 'kartu');
                a1[a3].classList.replace(a1[a3].classList.item(0), 'kartu');
                a1[a2].addEventListener('click', bukaKartu);
                a1[a3].addEventListener('click', bukaKartu);
            }, 500);
        }
        arrCheck = [];
        arrCheckIndex = [];
    }
}

// game
function gameSelesai() {
    let grade = '';
    if (score >= 10) {
        // if (kesalahan == 0) grade = 'Sangat Bagus';
        // else if (kesalahan <= 2) grade = 'Bagus';
        // else if (kesalahan <= 4) grade = 'Normal';
        // else if (kesalahan <= 6) grade = 'Buruk';
        // else grade = 'Sangat Buruk';
        setTimeout(function () {
            container.style.display = 'none';
            rank.innerText = grade;
            restart.removeAttribute('style');s
        }, 500);
    }
    tmblRestart.addEventListener('click', restartGame);
}

function restartGame() {
    score = 0;
    hasilSkor.innerText = score;
    kesalahan = 0;
    progress.value = score;
    container.removeAttribute('style');
    restart.style.display = 'none';
    for (let i = 0; i < kartu.length; i++) {
        kartu[i].removeAttribute('style');
        kartu[i].classList.replace(kartu[i].classList.item(0), 'kartu');
        mulaiGame(kartu);
        kartu[i].style.order = acakRandomKartu();
    }
}