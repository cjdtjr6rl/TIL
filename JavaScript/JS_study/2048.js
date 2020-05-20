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