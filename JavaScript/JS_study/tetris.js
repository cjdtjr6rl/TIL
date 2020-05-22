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

window.addEventListener('keyup', function(e) { // 버튼 누르는 이벤트
    console.log(e);
    switch(e.code) { // 누른 버튼의 event의 code값
        case 'Space': // 한방에 내리기
            break;
        case 'ArrayRight': // 오른쪽 이동
            break;
        case 'ArrayLeft': // 왼쪽 이동
            break;
        case 'ArrayDown': // 아래쪽 이동
            break;
        case 'ArrayUp': // 방향 전환
            break;
        default:
            break;
    }
});

create_block();