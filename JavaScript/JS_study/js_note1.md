# JavaScript note 1

<br/>

## 목차

- [끝말잇기](#endsentence)
- [야구게임](#baseball)
- [틱택토](#tictakto)

---

1. 끝말잇기<a id="endsentence"></a>

   ```javascript
   var b_body = document.body;
   // b_body의 변수 안에 window.document.body를 그린다.
   
   var word = document.createElement('div');
   word.textContent = '시작';
   document.body.append(word);
   // word라는 변수 안에 div를 만든다. 그런 후 word라는 변수 안에 text를 '시작'이라는 단어로 초기화 시켜준다.
   // body안에 word를 넣어 출력되게 한다.
   
   var enterform = document.createElement('form');
   document.body.append(enterform);
   // enterform이라는 변수 안에 form 태그를 만든다. 값을 전달할 때 form태그를 사용하여 보내야 페이지가 새로고침이 되지 않기 때문이다.
   // body안에 enterform을 넣어 출력되게 한다.
   
   var input_text = document.createElement('input');
   enterform.append(input_text);
   // input_text라는 변수 안에 input을 만든다.
   // 만들어 놓은 form 태그 안에 input버튼을 넣어 form안에 감싸지게 한다.
   // <form><input type="text"/></form>
   
   var btn = document.createElement('button');
   btn.textContent = '입력!';
   enterform.append(btn);
   // btn이라는 변수 안에 button을 만든다. btn라는 변수 안에 text를 '입력!'이라는 단어로 초기화 시켜준다.
   // 이 역시 또한 form 태그 안에 button을 넣어 form안에 감싸지게 한다.
   // <form><input type="text"/><button>입력!</button></form>
   
   var result = document.createElement('div');
   document.body.append(result);
   // result라는 변수 안에 div를 만든다.
   // body안에 result를 넣어 출력되게 한다.
   
   // ----------------- 기본변수 생성 -----------------
   
   input_text.focus();
   // 페이지가 처음 시작되면 input_text라는 input에 마우스가 클릭되어 있다.
   
   enterform.addEventListener('submit', function callback(e){
     // form 태그 안에 callback함수인 submit라는 방식으로 이벤트함수를 생성한다.
       e.preventDefault();
     // 버튼을 눌렀을 때 화면이 맨 위로 가는 것을 막아준다.
       if(word.textContent[word.textContent.length - 1] === input_text.value[0]) {
         // word변수 안에 텍스트[길이-1]의 값과 새로 입력한 값의 첫번째 값이([0]) 같다면
           result.textContent = '정답!';
         // result의 변수는 '정답!'으로 초기화
           word.textContent = input_text.value;
         // 정답이라면 작성한 input_text값이 word의 값으로 초기화하여 div안에 word를 출력한다.
       } else {
           result.textContent = '틀렸습니다!';
       }
       input_text.value = '';
     // 값을 작성했으면 다음 또 쓰라고 input_text안을 초기화를 해준다.
       input_text.focus();
   });
   ```

   <br/>

   ---

2. 야구게임<a id="baseball"></a>

   ```javascript
   var body = document.body;
   // b_body의 변수 안에 window.document.body를 그린다.
   
   var number; // 출력될 숫자들 넣어둘 변수
   var numArray; // 뽑은 숫자들 넣어둘 변수
   var pick; // 뽑은 숫자
   var i; // 순서
   
   function play() {
     // play라는 함수
       number = [1,2,3,4,5,6,7,8,9] // number에 1~9까지 배열값으로 초기화
       numArray = []; // 배열로 빈칸 생성
   
       for(i = 0; i < 4; i++) {
         // 4번 for문으로 돌며 뽑는다.
           pick = number.splice(Math.floor(Math.random()*number.length), 1)[0];
         // pick이란 변수 안에 splice를 사용하여 number 안에서 random()을 활용하여 숫자를 출력하여 첫번째 배열값을 초기화시켜준다.
           numArray.push(pick);
         // 뽑은 pick을 numArray에 넣어준다.
       }
       console.log(numArray);
   }
   
   play();
   
   var result = document.createElement('h1');
   document.body.append(result);
   
   var comment = document.createElement('h2');
   document.body.append(comment);
   
   var enterform = document.createElement('form');
   document.body.append(enterform);
   
   var input_text = document.createElement('input');
   enterform.append(input_text);
   input_text.type = 'text';
   input_text.maxLength = 4;
   // input_text안에 최대 글자 수는 4자리
   
   var btn = document.createElement('button');
   btn.textContent = '입력!';
   enterform.append(btn);
   
   input_text.focus();
   
   var error = 0;
   // error라는 변수 안에 0으로 초기화
   
   enterform.addEventListener('submit', function callback(e) {
       e.preventDefault();
       var solution = input_text.value;
     // solution 이라는 변수 안에 input_text값을 넣어준다.
       if(solution === numArray.join('')) {
         // numArray는 배열이기에 join을 사용하여 빈칸 없이 한번에 붙여주는 형식
         // 만약 입력한 값인 solution과 numArray의 값이 같다면
           result.textContent = '홈~런~!';
           error = 0;
           input_text.value = '';
         // result는 '홈~런~!'으로 초기화하고 error는 0으로 다시 초기화 시켜준다.
           
           play();
       } else {
           var solutionList = solution.split('');
         // solution은 하나의 값으로 출력이 되기에 split을 사용하여 숫자 안에 '' 값을 주어 배열로 만들어 solutionList로 저장을 시켜준다.
           var strike = 0;
           var ball = 0;
           error ++;
         // 1번 실패를 했기 때문에 error를 count를 한다.
           if(error >= 10){
               comment.textContent = '사용 횟수를 10번을 하였습니다. 실패!! 답은 : ' + numArray.join(',') + '였습니다.';
               error = 0;
             // error가 10번 이상이면 끝 다시 play()함수 실행
               input_text.value = '';
               
               play();           
           } else {
               for (i = 0; i < 4; i++) {
                   if(Number(solutionList[i]) === numArray[i]) {
                     // Number로 형변환 하여 solutionList의 배열을 하나하나 생성된 numArray와 비교하여 같은지 확인
                       strike ++;
                     // 만약 같은 자리에 같은 숫자가 있다면 strike에 1을 더해준다.
                   } else if(numArray.indexOf(Number(solutionList[i])) > -1) {
                     // indexOf를 사용하여 배열값이 있으면 그 배열값의 자리를 나타낸다. ex) 0, 1, 2, 3
                     // 그러나 배열 안에 없다면 -1을 출력하므로 양수이면 ball에 1을 더해준다.
                       ball ++;
                   }
               }
               result.textContent = strike + ' 스트라이크, ' + ball + ' 볼입니다.';
               comment.textContent = '사용 횟수: ' + error + " / 10";
               input_text.value = '';
             // 결과 출력
           }
       }
   });
   ```

   <br/>

   ---

3. 틱택토<a id="tictakto"></a>

   ```javascript
   // 2차원 배열 사용!!
   var body = document.body;
   var table = document.createElement('table'); // table 생성
   var rows = []; // 행
   var boxes = []; // 열
   var turn = 'X'; // 처음에 시작을 'X'로 시작
   var text = document.createElement('div'); // 클릭할 수 있는 div 생성
   
   var noncallback = function(e) {
     // 비동기 함수 생성
       e.preventDefault();
       
       var howRow = rows.indexOf(e.target.parentNode);
     // howRow에 rows의 선택한 곳의 부모노드를 넣어준다. --> 몇번째 줄?
       var howBox = boxes[howRow].indexOf(e.target);
     // howBox에 선택한 곳의 boxes(열)를 넣어준다. --> 몇번째 칸?
       
       if(boxes[howRow][howBox].textContent !== '') { // 칸이 이미 채워져 있는가?
           console.log('빈칸이 아닙니다.');
       } else { // 빈칸이면
           console.log('빈칸입니다.');
           boxes[howRow][howBox].textContent = turn;
         // boxes의 2차원 배열인 [몇번째줄][몇번째칸]에 turn값을 넣어준다.
           
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
   
           // 다 찼으면: full --> true
           if(full) {
               text.textContent = turn + '님이 승리!';
               // 초기화
               turn = 'X';
               boxes.forEach(function (row) { // forEach문 --> 반복문
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
     // 3번 돌림 왜? 3x3이기 때문에(행)
       var row = document.createElement('tr');
     // 행(row)는 tr로 생성
       rows.push(row);
     // rows안에 row를 집어넣는다.
       boxes.push([]);
     // boxes안에 빈 배열을 집어넣는다.
       for( var j = 0; j < 3; j++ ) {
         // 3번 돌림 왜? 3x3이기 때문에(열)
           var box = document.createElement('td');
         // 열(box)는 td로 생성
           box.addEventListener('click', noncallback);
         // box가 클릭이 되었을 때 이벤트해주는 비동기함수 걸어준다.
           boxes[i].push(box);
         // boxes들 안에 몇번째 줄에 몇번 box를 집어넣을지 구분해서 넣는다.
           row.appendChild(box);
         // row안에 box를 추가한다. 즉, 한 row안에 3개의 box를 추가한다.
       }
       table.appendChild(row);
     // table안에 row를 추가한다. 즉, table안에 3개의 row를 추가한다.
   }
   
   body.appendChild(table);
   body.appendChild(text);
   // body안에 table과 text를 출력한다.
   ```

   
