var body = document.body;
var table = document.createElement('table');
var rows = [];
var boxes = [];
var turn = 'X';
var text = document.createElement('div');

var noncallback = function(e) {
    e.preventDefault();
    
    var howRow = rows.indexOf(e.target.parentNode);
    var howBox = boxes[howRow].indexOf(e.target);
    
    if(boxes[howRow][howBox].textContent !== '') { // 칸이 이미 채워져 있는가?
        console.log('빈칸이 아닙니다.');
    } else { // 빈칸이면
        console.log('빈칸입니다.');
        boxes[howRow][howBox].textContent = turn;
        
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

        // 대각선 검사
        if(howRow - howBox === 0 || Math.abs(howRow - howBox) === 2) { // 대각선 검사 필요한 경우
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
        }

        // 다 찼으면
        if(full) {
            text.textContent = turn + '님이 승리!';
            // 초기화
            turn = 'X';
            boxes.forEach(function (row) {
                row.forEach(function (box) {
                    box.textContent = '';
                });
            });
        } else { // 다 안찼으면
            if(turn === 'O') {
                turn = 'X';
            } else if(turn === 'X') {
                turn = 'O';
        }
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