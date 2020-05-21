var table = document.getElementById('table'); // 화면과 데이터 나누기
var data = []; // 데이터
var score_list = document.getElementById('score');

function reset() { // 화면, 데이터 모두 0으로 집어넣어서 만들어 줌
    var fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function(){
        var row_data = [];
        data.push(row_data);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function(){
            row_data.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function random_create() { // 빈칸 좌료를 찾아 랜덤으로 칸에 2를 넣음
    var block_array = [];
    data.forEach(function(row_data, i) {
        row_data.forEach(function(line_data, j) {
            if(!line_data) {
                block_array.push([i, j]);
            }
        });
    });
    if(block_array.length === 0) { // 더이상 블록을 놓을 것이 없을 때
        alert('게임오버/ 점수: ' + score.textContent);
        table.innerHTML = ''; // 테이블 삭제
        reset();
    } else {
        var random_block = block_array[Math.floor(Math.random() * block_array.length)];
        data[random_block[0]][random_block[1]] = 2; // 2 넣기
        draw();
    }
}

function draw() { // 데이터를 받아서 화면에 표시를 해주는 것 -> 데이터와 화면을 일치시키기
    data.forEach(function(row_data, i) {
        row_data.forEach(function(line_data, j) {
            if(line_data > 0) {
                table.children[i].children[j].textContent = line_data;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

reset();
random_create();
draw();

var drag_start = false; // drag용 flag
var draging = false; // 클릭했을 때 막기 위해 생성
var start_location;
var end_location;

// 마우스 이벤트!!
// ScreenX: 모니터 기준 좌표
// pageX: 페이지(스크롤 포함)
// clientX: 브라우저 화면 기준
// offsetX: 이벤트 타겟 기준
window.addEventListener('mousedown', function(e) {
    drag_start = true; // mouse를 클릭했을 때 가능하도록 동작
    start_location = [e.clientX, e.clientY];
});

window.addEventListener('mousemove', function(e) {
    if(drag_start) { // flag가 true일 때 mousemove가 작동
        draging = true;
    }
});

window.addEventListener('mouseup', function(e) { // 마우스 클릭 시 -> 마우스 이벤트 정보들이 e의 객체에 담겨있음
    drag_start = false; // mouse를 놨을 때 정지
    end_location = [e.clientX, e.clientY]; // 화면의 좌표 (x축, y축)
    if(draging) { // mouse가 움직이는 중 일때
        var location;
        var x_interval = end_location[0] - start_location[0]; // x축 좌표
        var y_interval = end_location[1] - start_location[1]; // y축 좌표
        if(x_interval < 0 && Math.abs(x_interval) / Math.abs(y_interval) > 1) { // x축이 0보다 작고 y축이 1보다 클 때
            location = '왼쪽';
        } else if(x_interval > 0 && Math.abs(x_interval) / Math.abs(y_interval) > 1) { // x축이 0보다 크고 y축이 1보다 클 때
            location = '오른쪽';
        } else if(y_interval > 0 && Math.abs(x_interval) / Math.abs(y_interval) < 1) { // x축이 0보다 크고 y축이 1보다 작을 때
            location = '아래';
        } else if(y_interval < 0 && Math.abs(x_interval) / Math.abs(y_interval) < 1) { // x축이 0보다 작고 y축이 1보다 작을 때
            location = '위';
        }
        console.log(x_interval, y_interval, location);
    }
    drag_start = false;
    draging = false;
    
    switch(location) {
        case '왼쪽':
            var new_data = [ // 새로운 4개의 배열 안에 data를 넣어 반복문을 돌립니다.
                [],
                [],
                [],
                []
            ];
            data.forEach(function(row_data, i) {
                row_data.forEach(function(line_data, j) {
                    if(line_data) {
                        if(new_data[i][new_data[i].length - 1] && new_data[i][new_data[i].length - 1] === line_data) { // 합쳐져야 되는 경우
                            new_data[i][new_data[i].length - 1] *= 2;
                            var now_score = parseInt(score_list.textContent, 10);
                            score_list.textContent = now_score + new_data[i][new_data[i].length - 1];
                        } else {
                            new_data[i].push(line_data);
                        }
                    }
                });
            });
            console.log(new_data);
            [1, 2, 3, 4].forEach(function(row_data, i) {
                [1, 2, 3, 4].forEach(function(line_data, j) {
                    data[i][j] = new_data[i][j] || 0;
                });
            });
            break;
        case '오른쪽':
            var new_data = [ // 새로운 4개의 배열 안에 data를 넣어 반복문을 돌립니다.
                [],
                [],
                [],
                []
            ];
            data.forEach(function(row_data, i) {
                row_data.forEach(function(line_data, j) {
                    if(line_data) {
                        if(new_data[i][0] && new_data[i][0] === line_data) { // 합쳐져야 되는 경우
                            new_data[i][0] *= 2;
                            var now_score = parseInt(score_list.textContent, 10);
                            score_list.textContent = now_score + new_data[i][0];
                        } else {
                            new_data[i].unshift(line_data);
                        }
                    }
                });
            });
            console.log(new_data);
            [1, 2, 3, 4].forEach(function(row_data, i) {
                [1, 2, 3, 4].forEach(function(line_data, j) {
                    data[i][3-j] = new_data[i][j] || 0;
                });
            });
            break;
        case '위': // 마우스를 위로 드래그 했을 때
            var new_data = [ // 새로운 4개의 배열 안에 data를 넣어 반복문을 돌립니다.
                [],
                [],
                [],
                []
            ];
            data.forEach(function(row_data, i) {
                row_data.forEach(function(line_data, j) {
                    if(line_data) {
                        if(new_data[j][new_data[j].length - 1] && new_data[j][new_data[j].length - 1] === line_data) { // 합쳐져야 되는 경우
                            new_data[j][new_data[j].length - 1] *= 2;
                            var now_score = parseInt(score_list.textContent, 10);
                            score_list.textContent = now_score + new_data[j][new_data[j].length - 1];
                        } else {
                            new_data[j].push(line_data);
                        }
                    }
                });
            });
            console.log(new_data);
            [1, 2, 3, 4].forEach(function(line_data, i) {
                [1, 2, 3, 4].forEach(function(row_data, j) {
                    data[j][i] = new_data[i][j] || 0;
                });
            });
            break;
        case '아래':
            var new_data = [ // 새로운 4개의 배열 안에 data를 넣어 반복문을 돌립니다.
                [],
                [],
                [],
                []
            ];
            data.forEach(function(row_data, i) {
                row_data.forEach(function(line_data, j) {
                    if(line_data) {
                        if(new_data[j][0] && new_data[j][0] === line_data) { // 합쳐져야 되는 경우
                            new_data[j][0] *= 2;
                            var now_score = parseInt(score_list.textContent, 10);
                            score_list.textContent = now_score + new_data[j][0];
                        } else {
                            new_data[j].unshift(line_data);
                        }
                    }
                });
            });
            console.log(new_data);
            [1, 2, 3, 4].forEach(function(line_data, i) {
                [1, 2, 3, 4].forEach(function(row_data, j) {
                    data[3-j][i] = new_data[i][j] || 0;
                });
            });
            break;
    }
    draw();
    random_create();
});