var dataset = []; // 스코프 문제 때문에 함수 밖으로 뺌 tbody도 동일
var tbody = document.querySelector('#table tbody'); // 전역과 지역으로 tbody를 사용하기 위해서 위로 뽑음 (스코프)
var stopFlag = false;
var open = 0;
var codoBoard = {
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};

document.querySelector('#exec').addEventListener('click', function() {
  // 내부 먼저 초기화
  tbody.innerHTML = ''; // tbody의 내부 tag들을 초기화시켜줌
  document.querySelector('#result').textContent = '';
  dataset = [];
  open = 0;
  stopFlag = false;
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  // 지뢰 위치 뽑기
  var numbers = Array(hor * ver)
    .fill() // 전부 다 undefined로 채운 배열 생성
    .map(function (yo, index) { // 1:1로 짝지어줌
      return index; // ex) 0~99까지 뽑음
    });
  var suffle = [];

  while (numbers.length > hor * ver - mine) {
    var shake = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    suffle.push(shake);
  }

  console.log(suffle);
  // 지뢰 테이블 만들기
  for (var i = 0; i < ver; i += 1) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j += 1) {
      arr.push(codoBoard.보통칸);
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function (e) { // td를 만들어 주자마자 eventListener를 해줘야 함
        // 모든 td에 contextmenu event를 붙임
        // contextmenu는 오른쪽 마우스 클릭 시 를 나타냄
        e.preventDefault(); // 오른쪽 마우스 클릭 시 contextmenu 안뜸
        if (stopFlag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode; // target은 contextmenu가 발생한 태그 -> td
        var parentTbody = e.currentTarget.parentNode.parentNode; // --> 몇번째 줄, 몇번째 칸인지 파악
//        var block = Array.prototype.indexOf.call(parentTr.children, td); // 클로저 문제 발생..!!
        var block = Array.prototype.indexOf.call(parentTr.children, e.currentTarget); // 클로저 피하기..ㅎ
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        // 그냥 indexOf를 사용하면 배열이 아니라서 가져올 수 없어서 Array.prototype을 사용해준다. -> 배열이 아닌애도 사용가능
        // 특정 칸을 클릭을 했을 때 그 부모의 자식의 tr과 td를 row와 block으로 넣어준다.
        if (dataset[row][block] === codoBoard.연칸) { // 이미 연 칸은 오른쪽 눌러도 효과 없게
          return;
        }
        if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
          e.currentTarget.textContent = '!';
          e.currentTarget.classList.add('flag');
          if (dataset[row][block] === codoBoard.지뢰) {
            dataset[row][block] = codoBoard.깃발지뢰;
          } else {
            dataset[row][block] = codoBoard.깃발;
          }
        } else if (e.currentTarget.textContent === '!') {
          e.currentTarget.textContent = '?';
          e.currentTarget.classList.remove('flag');
          e.currentTarget.classList.add('question');
          if (dataset[row][block] === codoBoard.깃발지뢰) {
            dataset[row][block] = codoBoard.물음표지뢰;
          } else {
            dataset[row][block] = codoBoard.물음표;
          }
        } else if (e.currentTarget.textContent === '?') {
          e.currentTarget.classList.remove('question');
          if (dataset[row][block] === codoBoard.물음표지뢰) {
            e.currentTarget.textContent = 'X';
            dataset[row][block] = codoBoard.지뢰;
          } else {
            e.currentTarget.textContent = '';
            dataset[row][block] = codoBoard.보통칸;
          }
        }
        // 현재 빈칸이면 !로, !면 ?로 ?면 빈칸으로!
      });
      td.addEventListener('click', function (e) { // 왼쪽 마우스 클릭
        if (stopFlag) {
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var block = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if ([codoBoard.연칸, codoBoard.깃발, codoBoard.깃발지뢰, codoBoard.물음표지뢰, codoBoard.물음표].includes(dataset[row][block])) {
          return;
        }
        // 클릭했을때 주변 지뢰 갯수
        e.currentTarget.classList.add('opened');
        open += 1;
        if (dataset[row][block] === codoBoard.지뢰) { // 지뢰 클릭
          e.currentTarget.textContent = '펑'; // 현재 선택한 칸이 지뢰일 때
          document.querySelector('#result').textContent = '실패 ㅠㅠ';
          stopFlag = true;
        } else { // 지뢰가 아닌 경우 주변 지뢰 개수
          var area = [ // 주변의 지뢰갯수 area라는 변수 안에 초기화
            dataset[row][block-1], dataset[row][block+1],
          ];
          if (dataset[row-1]) {
            area = area.concat([dataset[row-1][block-1], dataset[row-1][block], dataset[row-1][block+1]]);
              // area안에 배열들을 concat을 이용하여 합치기
              // 새로운 배열을 넣어주는 것 이기 때문에 area를 초기화
          }
          if (dataset[row+1]) {
            area = area.concat([dataset[row+1][block-1], dataset[row+1][block], dataset[row+1][block+1]]);
          }
          var mineNum = area.filter(function(v) {
            return [codoBoard.지뢰, codoBoard.깃발지뢰, codoBoard.물음표지뢰].includes(v);
          }).length;
          // 거짓인 값: false, '', 0, null, undefined, NaN
          e.currentTarget.textContent = mineNum || '';
          dataset[row][block] = codoBoard.연칸;
          if (mineNum === 0) {
            console.log('주변을 엽니다');
            var areaBlock = [];
            if (tbody.children[row-1]) {
              areaBlock = areaBlock.concat([
                tbody.children[row - 1].children[block - 1],
                tbody.children[row - 1].children[block],
                tbody.children[row - 1].children[block + 1],
              ]);
            }
            areaBlock = areaBlock.concat([
              tbody.children[row].children[block - 1],
              tbody.children[row].children[block + 1],
            ]);

            if (tbody.children[row+1]) {
              areaBlock = areaBlock.concat([
                tbody.children[row + 1].children[block - 1],
                tbody.children[row + 1].children[block],
                tbody.children[row + 1].children[block + 1],
              ]);
            }
            areaBlock.filter(function (v) {
              return !!v;
            }).forEach(function(옆칸) {
              var parentTr = 옆칸.parentNode;
              var parentTbody = 옆칸.parentNode.parentNode;
              var 옆칸칸 = Array.prototype.indexOf.call(parentTr.children, 옆칸);
              var 옆칸줄 = Array.prototype.indexOf.call(parentTbody.children, parentTr);
              if (dataset[옆칸줄][옆칸칸] !== codoBoard.연칸) {
                옆칸.click();
              }
            });
          }
        }
        console.log(open, hor * ver - mine);
        if (open === hor * ver - mine) {
          stopFlag = true;
          document.querySelector('#result').textContent = '승리 ^^';
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  // 지뢰 심기
  for (var k = 0; k < suffle.length; k++) { // 예 60
    var 세로 = Math.floor(suffle[k] / ver);  // 예 7 -> 6
    var 가로 = suffle[k] % ver; // 예 0 -> 0
    console.dir(tbody);
    console.log(세로);
    tbody.children[세로].children[가로].textContent = 'X';
    dataset[세로][가로] = codoBoard.지뢰;
  }
});