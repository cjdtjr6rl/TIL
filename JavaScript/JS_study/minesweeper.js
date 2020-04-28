var dataset = []; // 스코프 문제 때문에 함수 밖으로 뺌 tbody도 동일 --> 기존 게임을 새 게임했을 때 dataset 초기화!
var tbody = document.querySelector('#table tbody'); // 전역과 지역으로 tbody를 사용하기 위해서 위로 뽑음 (스코프)
// 렉시컬 스코핑 = 정적 스코핑
var stopFlag = false; // 게임이 중단되는 flag
var open = 0; // 열은 칸
var codoBoard = { // 데이터가 너무 복잡하기에 딕셔너리를 사용하여 사용
  연칸: -1,
  물음표: -2,
  깃발: -3,
  깃발지뢰: -4,
  물음표지뢰: -5,
  지뢰: 1,
  보통칸: 0,
};

document.querySelector('#exec').addEventListener('click', function() { // function 안에 있는 변수는 밖으로 나갈 수 없다. 지역, 전역변수와 개념이 비슷
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
        if (stopFlag) { // 오른쪽 마우스도 중단flag로 true로 클릭이 되지 않도록
          return;
        }
        var parentTr = e.currentTarget.parentNode; // target은 contextmenu가 발생한 태그 -> td
        var parentTbody = e.currentTarget.parentNode.parentNode; // --> 몇번째 줄, 몇번째 칸인지 파악
//        var block = Array.prototype.indexOf.call(parentTr.children, td); // 클로저 문제 발생..!!
          // 함수와 함수가 접근할 수 있는 스코프가 클로저 관계를 맺는다.
          // 비동기 안에 function은 실행이 되는 순간에 정해지기에 for문을 돌지 않고 한번에 정해져 출력된다.
          // 실행되는 순간에야 변수를 찾는다.
//          클로저를 이용한 클로저 해결법
//          for(var i = 0; i < 100; i++) {
//              (function 클로저(j) { // -> 즉시실행함수 (매개변수j와 function이 closer관계)
//                  setTimeout(function(){
//                      console.log(j);
//                  }, j * 1000);
//              })(i);
//          }
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
      td.addEventListener('click', function (e) { // 왼쪽 마우스 클릭, 재귀함수.....
        if (stopFlag) { // 이러하면 여기서 함수가 끝..!
          return;
        }
          // 몇번째 칸, 줄인지 파악
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var block = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
        var row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if ([codoBoard.연칸, codoBoard.깃발, codoBoard.깃발지뢰, codoBoard.물음표지뢰, codoBoard.물음표].includes(dataset[row][block])) {
          return;
        }
        // 클릭했을때 주변 지뢰 갯수
        e.currentTarget.classList.add('opened'); // 클릭했을 때 class에 opened를 붙여 줌
          // jQuery같은 경우 $(this).addClass('opened);
        open += 1;
        if (dataset[row][block] === codoBoard.지뢰) { // 지뢰 클릭
          e.currentTarget.textContent = '펑'; // 현재 선택한 칸이 지뢰일 때
          document.querySelector('#result').textContent = '실패 ㅠㅠ';
          stopFlag = true; // 중단flag가 true일 경우 클릭이 되지 않게
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
          e.currentTarget.textContent = mineNum || ''; // 앞의 값이 거짓이면 뒤에 것을 사용해라
          dataset[row][block] = codoBoard.연칸;
          if (mineNum === 0) { // 주변 칸의 지뢰 갯수가 0개일 때
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
            areaBlock.filter(function (v) { // filter는 undefined같은것을 제거하는 기능
              return !!v;
            }).forEach(function(옆칸) {
              var parentTr = 옆칸.parentNode;
              var parentTbody = 옆칸.parentNode.parentNode;
              var 옆칸칸 = Array.prototype.indexOf.call(parentTr.children, 옆칸);
              var 옆칸줄 = Array.prototype.indexOf.call(parentTbody.children, parentTr);
              if (dataset[옆칸줄][옆칸칸] !== codoBoard.연칸) { // 한번 연칸을 다시 안열기 위해서..
                옆칸.click();
              }
            });
          }
        }
        console.log(open, hor * ver - mine);
        if (open === hor * ver - mine) { // 열은 칸이 가로*세로-지뢰갯수 했을 때 같다면 승리
          stopFlag = true; // 성공 했기에 중단flag true로..
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