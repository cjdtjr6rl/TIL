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

var drag_start = false // drag용 flag
var start_location;
var end_location;

// ScreenX: 모니터 기준 좌표
// pageX: 페이지(스크롤 포함)
// clientX: 브라우저 화면 기준
// offsetX: 이벤트 타겟 기준
window.addEventListener('mousedown', function(e) {
    console.log('mousedown', e);
    drag_start = true; // mouse를 클릭했을 때 가능하도록 동작
    start_location = [e.clientX, e.clientY];
});

window.addEventListener('mousemove', function(e) {
    if(drag_start) { // flag가 true일 때 mousemove가 작동
        console.log('mousemove', e);
    }
});

window.addEventListener('mouseup', function(e) {
    console.log('mouseup', e);
    drag_start = false; // mouse를 놨을 때 정지
    end_location = [e.clientX, e.clientY];
});