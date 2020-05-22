var tetris = document.querySelector('#tetris');
var tetrisData = [];

function create_block() {
    var fragment = document.createDocumentFragment(); // fragment에 내용을 집어넣음
    for(var i = 0; i < 20; i++) {
        var tr = document.createElement('tr');
        fragment.appendChild(tr);
        for(var j = 0; j < 10; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    tetris.appendChild(fragment); // fragment라는 메모리에 집어넣은 것을 tetris라는 화면에 한번에 출력
}

// keydown은 꾹 누르고 있으면 계속 출력
window.addEventListener('keydown', function(e) { // 버튼 누르는 이벤트
    console.log(e);
    switch(e.code) { // 누른 버튼의 event의 code값
        case 'ArrayRight': // 오른쪽 이동
            console.log('ArrayRight');
            break;
        case 'ArrayLeft': // 왼쪽 이동
            console.log('ArrayLeft');
            break;
        case 'ArrayDown': // 아래쪽 이동
            console.log('ArrayDown');
            break;
        default:
            break;
    }
});

// keyup은 꾹누르면 계속 출력되지 않음
// keypress는 방향키가 먹지 않음
// space와 arrayup은 계속 출력되면 안되기에 keyup을 사용
window.addEventListener('keyup', function(e) {
    console.log(e);
    switch(e.code) {
        case 'Space': // 한방에 내리기
            console.log('Space');
            break;
        case 'ArrayUp': // 방향 전환
            console.log('ArrayUp');
            break;
        default:
            break;
    }
});

create_block();