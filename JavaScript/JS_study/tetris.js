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
var tetrisData = [
    
];

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