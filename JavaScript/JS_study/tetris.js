var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0, 3];
var blocks = [
  {
    name: 's', // 네모
    center: false,
    numCode: 1,
    color: 'red',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 1],
      ]
    ],
  },
  {
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'z', // 지그재그
    center: true,
    numCode: 3,
    color: 'yellow',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'zr', // 반대 지그재그
    center: true,
    numCode: 4,
    color: 'green',
    startRow: 1,
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ]
  },
  {
    name: 'l', // L자
    center: true,
    numCode: 5,
    color: 'blue',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
    ]
  },
  {
    name: 'lr', // 반대 L자
    center: true,
    numCode: 6,
    color: 'navy',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ]
  },
  {
    name: 'b', // 1자
    center: true,
    numCode: 7,
    color: 'violet',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ]
  },
];

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value === undefined || value >= 10); // 빈칸인지, 10이상인지(움직이지 못하는 블럭인지)

function init() {
  const fragment = document.createDocumentFragment(); // documentFragment는 메모리를 아끼는 함수
  [...Array(20).keys()].forEach((col, i) => { // 0부터 20까지 tr을 만들어라
      // [...Array(숫자).keys()] -> spread라는 최신문법
      // ...[123] -> 123으로 읽음 배열을 쉽게 대괄호를 뗄 수 있음
      // [...Array(숫자).keys()] -> [0, 1, 2, ..., 숫자 - 1]
      // [...Array(숫자).keys().map((v) => v + 1)] -> [1, 2, 3, ..., 숫자]
      // [...Array(숫자).keys().map((v) => v * 2)] -> [2, 4, 6, ..., 숫자 - 2]
    const tr = document.createElement('tr');
    fragment.appendChild(tr);
    [...Array(10).keys()].forEach((row, j) => { // 0부터 10까지 td를 만들어라
      const td = document.createElement('td');
      tr.appendChild(td);
    });
    const column = Array(10).fill(0);
    tetrisData.push(column);
  });
  tetris.appendChild(fragment);
}

function draw() { // 데이터와 화면과 일치시키기 위해 데이터가 그려지면 화면에서 그리는 함수
  console.log('drawed', JSON.parse(JSON.stringify(tetrisData)), JSON.parse(JSON.stringify(currentBlock)));
  tetrisData.forEach((col, i) => {
    col.forEach((row, j) => {
      if (row > 0) {
        tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j] / 10 - 1]: colors[tetrisData[i][j] - 1]; // className을 가져와서 색을 입힘
      } else {
        tetris.children[i].children[j].className = ''; // className을 빈칸으로 하여 색을 없앰
      }
    });
  });
}

function drawNext() { // 다음 블록 그리는 함수
  const nextTable = document.getElementById('next-table');
  nextTable.querySelectorAll('tr').forEach((col, i) => {
    Array.from(col.children).forEach((row, j) => {
      if (nextBlock.shape[0][i] && nextBlock.shape[0][i][j] > 0) {
        nextTable.querySelectorAll('tr')[i].children[j].className = colors[nextBlock.numCode - 1];
      } else {
        nextTable.querySelectorAll('tr')[i].children[j].className = 'white';
      }
    });
  })
}

function generate() { // 테트리스 블록 생성
  if (!currentBlock) { // 현재 블럭이 없으면 블럭 뽑기
    currentBlock = blocks[Math.floor(Math.random() * blocks.length)]; // 일일히 만들었던 blocks들에서 random하게 뽑는 것
  } else {
    currentBlock = nextBlock;
  }
  currentBlock.currentShapeIndex = 0;
  nextBlock = blocks[Math.floor(Math.random() * blocks.length)]; // 다음 블록 미리 생성
  console.log(currentBlock);
  drawNext();
  currentTopLeft = [-1, 3]; // 가상의 칸이 하나 더 있다고 생각 왜냐하면 한칸 아래에서 도형이 생성이 되기 때문에
  let isGameOver = false;
  currentBlock.shape[0].slice(1).forEach((col, i) => { // 게임 오버 판단
    col.forEach((row, j) => {
      if (row && tetrisData[i][j + 3]) { // 새로운 블럭이 나와야 하는 부분에 블럭 데이터가 있으면 game over
        isGameOver = true;
      }
    });
  });
  currentBlock.shape[0].slice(1).forEach((col, i) => { // 블록 데이터 생성
    console.log(currentBlock.shape[0], currentBlock.shape[0].slice(1), col);
    col.forEach((row, j) => {
      if (row) {
        tetrisData[i][j + 3] = currentBlock.numCode;
      }
    });
  });
  console.log('generate', JSON.parse(JSON.stringify(currentBlock)));
  if (isGameOver) {
    clearInterval(int);
    draw();
    alert('game over');
  } else {
    draw();
  }
}

function checkRows() { // 한 줄 다 찼는지 검사
  const fullRows = [];
  tetrisData.forEach((col, i) => { // 반복문으로 한 줄에 채워진 칸이 몇개인지 count
    let count = 0;
    col.forEach((row, j) => {
      if (row > 0) {
        count++;
      }
    });
    if (count === 10) { // 10칸이 다 찼는지 세면
      fullRows.push(i);
    }
  });
  const fullRowsCount = fullRows.length;
  tetrisData = tetrisData.filter((row, i) => !fullRows.includes(i)); // 몇번째 index줄인지 알고 filter로 아예 한 줄을 지워줌
  for (let i = 0; i < fullRowsCount; i++) {
    tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]); // 맨 위에 한 줄을 새로 추가
  }
  console.log(fullRows, JSON.parse(JSON.stringify(tetrisData)));
  let score = parseInt(document.getElementById('score').textContent, 10);
  score += fullRowsCount ** 2;
  document.getElementById('score').textContent = String(score);
}

function tick() { // 한 칸 아래로 보내는 함수
  const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1]];
  const activeBlocks = [];
  let canGoDown = true;
  let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
  for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 블럭이 있으면
    if (i < 0 || i >= 20) continue;
    for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
      console.log(i, j);
      if (isActiveBlock(tetrisData[i][j])) { // 현재 움직이는 블럭이면
        activeBlocks.push([i, j]);
        if (isInvalidBlock(tetrisData[i + 1] && tetrisData[i + 1][j])) { // 움직이지 않는 칸 / 벽, 바닥, 고정된블럭
          console.log('아래 블럭이 있다!', i, j, tetrisData[i][j], tetrisData[i + 1] && tetrisData[i + 1][j], JSON.parse(JSON.stringify(tetrisData)));
          canGoDown = false; // 움직일 수 있는 flag
        }
      }
    }
  }
  if (!canGoDown) {
    activeBlocks.forEach((blocks) => {
      tetrisData[blocks[0]][blocks[1]] *= 10; // 블럭에 10을 곱해져서 움직이지 못하도록
    });
    checkRows(); // 지워질 줄 있나 확인
    generate(); // 새 블록 생성
    return false; // 아래로 내려갈 수 없으면 flase를 반환
  } else if (canGoDown) {
    for (let i = tetrisData.length - 1; i >= 0; i--) {
      const col = tetrisData[i];
      col.forEach((row, j) => {
        if (row < 10 && tetrisData[i + 1] && tetrisData[i + 1][j] < 10) {
          tetrisData[i + 1][j] = row;
          tetrisData[i][j] = 0;
        }
      });
    }
    currentTopLeft = nextTopLeft;
    draw();
    return true; // 아래로 내려갈 수 있으면 true를 반환
  }
}

// 진입점
// 2초마다 tick이라는 함수를 실행
let int = setInterval(tick, 2000);
init();
generate();

document.getElementById('stop').addEventListener('click', function() {
  clearInterval(int);
});
document.getElementById('start').addEventListener('click', function() {
  if (int) {
    clearInterval(int);
  }
  int = setInterval(tick, 2000);
});
document.getElementById('mute').addEventListener('click', function() {
  if (document.getElementById('bgm').paused) {
    document.getElementById('bgm').play();
  } else {
    document.getElementById('bgm').pause();
  }
});

window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowLeft': { // 키보드 왼쪽 클릭 = 좌측 한 칸 이동
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] - 1];
      let isMovable = true; // 왼쪽으로 이동할 수 있는지의 flag
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 왼쪽 공간 체크
        if (!isMovable) break; // 블럭이 있다면
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j - 1])) {
            console.log(i, j, tetrisData[i][j], tetrisData[i][j-1]);
            isMovable = false;
          }
        }
      }
      console.log('left', 'isMovable', isMovable);
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col, i) => {
          for (var j = 0; j < col.length; j++) {
            const row = col[j];
            if (tetrisData[i][j - 1] === 0 && row < 10) {
              console.log(row, tetrisData[i][j - 1], i, j);
              tetrisData[i][j - 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowRight': { // 키보드 오른쪽 클릭 = 우측 한 칸 이동
      const nextTopLeft = [currentTopLeft[0], currentTopLeft[1] + 1];
      let isMovable = true;
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 오른쪽 공간 체크
        if (!isMovable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i] || !tetrisData[i][j]) continue;
          if (isActiveBlock(tetrisData[i][j]) && isInvalidBlock(tetrisData[i] && tetrisData[i][j + 1])) {
            console.log(i, j);
            isMovable = false;
          }
        }
      }
      console.log('right', 'isMovable', isMovable);
      if (isMovable) {
        currentTopLeft = nextTopLeft;
        tetrisData.forEach((col, i) => {
          for (var j = col.length - 1; j >= 0; j--) {
            const row = col[j];
            if (tetrisData[i][j + 1] === 0 && row < 10) {
              tetrisData[i][j + 1] = row;
              tetrisData[i][j] = 0;
            }
          }
        });
        draw();
      }
      break;
    }
    case 'ArrowDown': { // 키보드 아래쪽 클릭 = 하방측 한 칸 이동
      tick();
    }
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowUp': { // 방향 전환
      let currentBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];
      let isChangeable = true;
      const nextShapeIndex = currentBlock.currentShapeIndex + 1 === currentBlock.shape.length
        ? 0
        : currentBlock.currentShapeIndex + 1;
      const nextBlockShape = currentBlock.shape[nextShapeIndex];
      for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
        if (!isChangeable) break;
        for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!tetrisData[i]) continue;
          if (nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]] > 0 && isInvalidBlock(tetrisData[i] && tetrisData[i][j])) {
            console.log(i, j);
            isChangeable = false;
          }
        }
      }
      console.log('isChangeable', isChangeable);
      if (isChangeable) {
        console.log('isChangeable', JSON.parse(JSON.stringify(currentBlock)), nextBlockShape);
        while (currentTopLeft[0] < 0) {
          tick();
        }
        for (let i = currentTopLeft[0]; i < currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
          for (let j = currentTopLeft[1]; j < currentTopLeft[1] + currentBlockShape.length; j++) {
            if (!tetrisData[i]) continue;
            let nextBlockShapeCell = nextBlockShape[i - currentTopLeft[0]][j - currentTopLeft[1]];
            if (nextBlockShapeCell > 0 && tetrisData[i][j] === 0) {
              // 다음 모양은 있는데 현재 칸이 없으면
              tetrisData[i][j] = currentBlock.numCode;
            } else if (nextBlockShapeCell === 0 && tetrisData[i][j] && tetrisData[i][j] < 10) {
              // 다음 모양은 없는데  현재 칸이 있으면
              tetrisData[i][j] = 0;
            }
          }
        }
        currentBlock.currentShapeIndex = nextShapeIndex;
      }
      draw();
      break;
    }
    case 'Space': // 한방에 쭉 떨구기
      while (tick()) {} // tick은 한칸 내리는 것이기 때문에 아래 없을 때까지 tick을 계속 하기 true를 반환했어서 계속 진행
      break;
  }
});