var table = document.getElementById('table');
var data = [];

function reset() {
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

function random_create() {
    var block_array = [];
    data.forEach(function(row_data, i) {
        row_data.forEach(function(line_data, j) {
            if(!line_data) {
                block_array.push([i, j]);
            }
        });
    });
    console.log(block_array);
    var random_block = block_array[Math.floor(Math.random() * block_array.length)];
    data[random_block[0]][random_block[1]] = 2;
    draw();
}

function draw() { // 데이터를 받아서 화면에 표시를 해주는 것
    data.forEach(function(row_data, i) {
        row_data.forEach(function(line_data, j) {
            if(line_data > 0) {
                table.children[i].children[j].textContent = row_data;
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

window.addEventListener('mouseup', function(e) { // 마우스 클릭 시
    drag_start = false; // mouse를 놨을 때 정지
    end_location = [e.clientX, e.clientY]; // 끝 좌표 (x축, y축)
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
                        new_data[i].push(line_data)
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
                        new_data[i].unshift(line_data)
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
                        new_data[j].push(line_data)
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
                        new_data[j].unshift(line_data)
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