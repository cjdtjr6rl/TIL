var screen = document.querySelector('#screen');
var start_time; // 스코프를 사용하여 시작시간과 끝 시간이 함수를 사용해도 값이 날아가지 않고 저장되게 함
var end_time;
var remember = []; // 기록 저장
var time_out;

screen.addEventListener('click', function() {
    if(screen.classList.contains('waiting')) { // 현재 대기 상태인지 확인
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요.'
        time_out = setTimeout(function() {
            start_time = new Date();
            screen.click();
        }, Math.floor(Math.random()*1000) + 2000); // 0 ~ 1000 사이의 수
    } else if(screen.classList.contains('ready')) { // 준비 상태
        if(!start_time) { // 부정클릭
           clearTimeout(time_out); // setTimeout을 clearTimeout으로 취소할 수 있음
            screen.classList.remove('ready'); // 다시 대기화면으로..!
            screen.classList.add('waiting');
            screen.textContent = '너무 성급하시군요..!! 다시 시작하려면 클릭하세요.';
        } else {
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요.';
        }
    } else if(screen.classList.contains('now')) { // 시작 상태
        end_time = new Date();
        console.log('반응속도', end_time - start_time, 'ms');
        remember.push(end_time - start_time);
        start_time = null;
        end_time = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요.';
    }
});