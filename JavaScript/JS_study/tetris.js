var tetris = document.querySelector('#tetris');
var blockArr = [ // 데이터를 불러오는데 배열이 맞을까?
    ['red', true, [
        [1, 1],
        [1, 1],
    ]],
    ['blue', true, [
        [0, 2, 0],
        [2, 2, 2],
    ]],
    ['orange', true, [
        [3, 3, 0],
        [0, 3, 3],
    ]],
    ['skyblue', true, [
        [0, 4, 4],
        [4, 4, 0],
    ]],
    ['yellowgreen', true, [
        [5, 5, 5],
        [5, 0, 0],
    ]],
    ['pink', true, [
        [6, 6, 6],
        [0, 0, 6],
    ]],
    ['yellow', true, [
        [7, 7, 7, 7],
    ]],
];
var blockDict = { // 데이터를 불러오는데 딕셔너리가 맞을까?
    0: ['white', false, []],
    1: ['red', true, [
        [1, 1], // 블럭 모양
        [1, 1],
    ]], // 색, 움직일 수 있는지, 모양
    2: ['blue', true, [
        [0, 1, 0],
        [1, 1, 1],
    ]],
    3: ['orange', true, [
        [1, 1, 0],
        [0, 1, 1],
    ]],
    4: ['skyblue', true, [
        [0, 1, 1],
        [1, 1, 0],
    ]],
    5: ['yellowgreen', true, [
        [1, 1, 1],
        [1, 0, 0],
    ]],
    6: ['pink', true, [
        [1, 1, 1],
        [0, 0, 1],
    ]],
    7: ['yellow', true, [
        [1, 1, 1, 1],
    ]],
    10: ['red', false, []], // 10배가 된 애들은 움직이지 못하게
    20: ['blue', false, []],
    30: ['orange', false, []],
    40: ['skyblue', false, []],
    50: ['yellowgreen', false, []],
    60: ['pink', false, []],
    70: ['yellow', false, []],
};
var tetrisData = [];
var stopDown = false; // 계속 내려가는 것을 멈추는 flag 변수

function create_block() {
    var fragment = document.createDocumentFragment(); // fragment에 내용을 집어넣음
    for(var i = 0; i < 20; i++) {
        var tr = document.createElement('tr');
        var arr = [];
        tetrisData.push(arr); // 참조관계, arr변수를 바꾸면 tetrisData도 같이 바뀜
        fragment.appendChild(tr);
        for(var j = 0; j < 10; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            arr.push(0); // 기본으로 칸에 모두 0을 집어넣음
        }
    }
    tetris.appendChild(fragment); // fragment라는 메모리에 집어넣은 것을 tetris라는 화면에 한번에 출력
}

function draw() { // 비효율 적이지만 전체 200칸을 다 지웠다가 다시 그리는 방식으로...(타협용...)
    tetrisData.forEach(function(tr, i) {
        tr.forEach(function(td, j){
            // tetris라는 화면에 배열값으로 접근
            tetris.children[i].children[j].className = blockDict[td][0];
        });
    });
}

function make_block() { // 블럭 생성하기
    stopDown = false;
    var block = blockArr[Math.floor(Math.random() * 7)][2]; // [2]는 배열 중 블럭 모양인 칸을 가져옴
    console.log(block);
    block.forEach(function(tr, i) { // 몇번째 줄
        tr.forEach(function(td, j) { // 몇번째 칸
            // TODO: 블록 생성할 때 이미 다 차있으면 game over
            tetrisData[i][j + 3] = td; // 3번째 열부터 출발하도록
        });
    });
    draw();
}

function block_down() { // 반복문을 위에서 부터 도느냐, 아래에서 부터 도느냐 중요..!
    for(var i = tetrisData.length - 1; i >= 0; i--) { // 아래에서부터 읽기
        tetrisData[i].forEach(function(td, j) {
            if(td > 0 && td < 10) { // 움직이는 블럭들
                if(tetrisData[i + 1] && !stopDown) {
                    tetrisData[i + 1][j] = td; // td를 한줄 아래로 내려보내기
                    tetrisData[i][j] = 0; // 현재의 칸은 빈칸으로 만들기
                } else { // 땅 끝에 도달하는 경우
                    stopDown = true;
                    tetrisData[i][j] = td * 10; // 딕셔너리에 10을 곱하면 움직임 false로 만듬
                }
            } 
        });
    }
    if(stopDown) {
        make_block();
    }
    draw(); // 화면을 다시 그리기
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
make_block();
setInterval(block_down, 100);