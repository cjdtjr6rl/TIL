var body = document.body;
var table = document.createElement('table');
var rows = [];
var boxes = [];
var turn = 'X';
var text = document.createElement('div');

function check(howRow, howBox) {
    // 세 칸 다 채워졌나?
    var full = false;
    // 가로줄 검사
    if(boxes[howRow][0].textContent === turn && 
       boxes[howRow][1].textContent === turn && 
       boxes[howRow][2].textContent === turn) { // 세칸 다 채워졌나?
       full = true;
    }

    // 세로줄 검사
    if(boxes[0][howBox].textContent === turn &&
       boxes[1][howBox].textContent === turn &&
       boxes[2][howBox].textContent === turn) {
       full = true;
    }

    // 대각선 검사 -> 필요할 때마다 검사 하기
    if(boxes[0][0].textContent === turn &&
       boxes[1][1].textContent === turn &&
       boxes[2][2].textContent === turn) {
       full = true
    } else if(
        boxes[0][2].textContent === turn &&
        boxes[1][1].textContent === turn &&
        boxes[2][0].textContent === turn){
        full = true;
    }
    
    return full;
}

function reload(draw) { // 초기화
    if(draw) {
        text.textContent = '무승부'
    } else { // 승부가 났을 경우
        text.textContent = turn + '님이 승리!';
    }
    
    turn = 'X';
    setTimeout(function() {
        text.textContent = '';
        boxes.forEach(function (row) {
            row.forEach(function (box) {
                box.textContent = '';
            });
        }); 
    }, 1000);
}

var noncallback = function(e) { // 사용자가 클릭을 했을 때의 턴
    e.preventDefault();
    if(turn === 'O') { // 컴퓨터의 turn일때 사용자가 클릭시 return
        return;
    }
    
    var howRow = rows.indexOf(e.target.parentNode);
    var howBox = boxes[howRow].indexOf(e.target);
    
    if(boxes[howRow][howBox].textContent !== '') { // 칸이 이미 채워져 있는가?
        console.log('빈칸이 아닙니다.');
    } else { // 빈칸이면
        console.log('빈칸입니다.');
        boxes[howRow][howBox].textContent = turn;
        
        var full = check(howRow, howBox);
        // 모든 칸이 다 찼는지 검사
        var restBox = [];
        boxes.forEach(function(row) {
            row.forEach(function(box) {
                restBox.push(box);
            });
        });
        // 빈칸 중 하나를 고른다.
        restBox = restBox.filter(function(box) { return !box.textContent }); // 아무도 안고른 칸이 담김
        // filter는 true인 애들만 값을 걸러냄
        if(full) {
            // 초기화
            reload(false);
        } else if(restBox.length === 0) { // 칸을 더이상 선택할 수 없을 때
            reload(true);
        } else { // 다 안찼으면
            if(turn === 'X') {
                turn = 'O';
            }
            setTimeout(function() { // 컴퓨터의 턴
                var choiceBox = restBox[Math.floor(Math.random() * restBox.length)];
                choiceBox.textContent = turn;
                // 컴퓨터가 승리했는지 check
                var howRow = rows.indexOf(choiceBox.parentNode);
                var howBox = boxes[howRow].indexOf(choiceBox);
                var full = check(howRow, howBox);
                if(full) {
                    // 초기화
                    reload();
                }
                // turn을 사용자한테 넘긴다.
                turn = 'X';
            }, 1000);
        }
    }
};

for( var i = 0; i < 3; i++ ) {
    var row = document.createElement('tr');
    rows.push(row);
    boxes.push([]);
    for( var j = 0; j < 3; j++ ) {
        var box = document.createElement('td');
        box.addEventListener('click', noncallback);
        boxes[i].push(box);
        row.appendChild(box);
    }
    table.appendChild(row);
}

body.appendChild(table);
body.appendChild(text);