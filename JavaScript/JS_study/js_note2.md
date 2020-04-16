# JavaScript note 2

<br/>

## 목차

- [구구단](#multiplication)
- [로또 추첨기](#lotto)
- [가위바위보](#rockpaperscissors)

---

1. 구구단<a id="multiplication"></a>

   ```javascript
   var num1 = Math.ceil(Math.random()*9);
   var num2 = Math.ceil(Math.random()*9);
   // num1, num2에 random으로 나온 숫자에서 9를 곱한 후 앞 양수만 가져온다.
   var multi = Number(num1) * Number(num2);
   // multi 변수 안에 숫자로 형번환 한 num1과 num2를 곱한 값을 넣는다.
   
   var body = document.body;
   var text = document.createElement('div');
   text.textContent = String(num1) + ' * ' + String(num2) + ' = ?';
   // textContent 변수 안에 숫자와 문자를 합쳐 넣는다.
   document.body.append(text);
   // body 안에 text를 출력한다.
   
   var enterform = document.createElement('form');
   document.body.append(enterform);
   // enterform이라는 변수 안에 form 태그를 넣고 출력한다.
   
   var input_text = document.createElement('input');
   enterform.append(input_text);
   // input_text이라는 input 태그를 form 태그에 넣고 출력한다.
   
   var btn = document.createElement('button');
   btn.textContent = '입력!';
   enterform.append(btn);
   // btn이라는 버튼을 form 태그에 넣고 출력한다.
   
   var result = document.createElement('div');
   document.body.append(result);
   // result이라는 div 태그 안에 결과를 출력할 것을 만들어 놓고 출력한다.
   
   input_text.focus();
   // mouse focus on
   
   enterform.addEventListener('submit', function callback(e) {
     // form 태그 안에 값을 submit하는 콜백함수 생성
       e.preventDefault();
       if(multi === Number(input_text.value)) {
         // 곱한 값인 multi와 사용자가 입력한 input_text값(숫자로 형변환)이 같은지 판별
           result.textContent = '정답!';
           num1 = Math.ceil(Math.random()*9);
           num2 = Math.ceil(Math.random()*9);
           multi = num1 * num2
           text.textContent = String(num1) + ' * ' + String(num2) + ' = ?';
         // 맞췄으니 다음 문제 출제
       } else {
           result.textContent = '틀렸습니다!';
       }
       input_text.value = '';
   });
   ```
   
   <br/>
   
   ---
   
2. 로또 추첨기<a id="lotto"></a>

   ```javascript
   var numbers = Array(45).fill().map(function(yo, index) {
     // numbers에 배열로 45개를 만들어서 함수를 돌리며 fill을 이용하여 채워넣는다.
     // yo: 요소, index: 인덱스(number)
       return index + 1;
   });
   
   var suffle = [];
   // suffle안에 뽑은 값들을 배열로 넣는다.
   while(numbers.length > 0) {
     // 다 뽑히지 않았다면
       var shake = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
     // shake라는 변수 안에 numbers에 있는 것 배열 앞부분 1개씩 쪼개서 넣는다.
       suffle.push(shake);
   }
   
   var bonus = suffle[suffle.length - 1];
   // bonus 숫자로 suffle의 맨 마지막의 번호를 뽑는다.
   var pick = suffle
       .slice(0, 6)
       .sort(function(p, c) { 
           return p - c; 
       });
   // 뽑는 변수로 pick은 suffle안에 0부터 5번째까지 뽑는다.
   // 큰 수대로 나열하기 위해 sort를 사용한다 -> function을 사용하여 앞에서 뒤를 뺐을 때 크면 뒤로 보낸다.
   
   console.log(suffle);
   console.log(pick + ", " + bonus);
   
   // 페이지에 resultPage라는 id, class값으로 가져오기
   var resultPage = document.querySelector('#resultPage');
   var bonusPage = document.querySelector('.bonusPage')[0]; // class는 여러개 가지고 올 수 있기 때문에 배열의 [0]값을 넣어주어야 함
   
   // 공 style 설정
   function ballStyle(num, resultPage) {
       var ball = document.createElement('div');
       ball.textContent = num;
       ball.style.display = 'inline-block';
       ball.style.border = '1px solid #000';
       ball.style.borderRadius = '50%';
       ball.style.width = '20px';
       ball.style.height = '20px';
       ball.style.textAlign = 'center';
       ball.style.marginRight = '10px';
       ball.className = 'ballId' + num;
       var bgc;
       if(num <= 10) {
           bgc = 'red';
       } else if(num <= 20) {
           bgc = 'orange';
       } else if(num <= 30) {
           bgc = 'yellow';
       } else if(num <= 40) {
           bgc = 'blue';
       } else {
           bgc = 'green';
       }
       ball.style.backgroundColor = bgc;
       resultPage.appendChild(ball);
   }
   
   setTimeout(function nonscallback() {
       ballStyle(pick[0], resultPage);
   }, 1000);
   setTimeout(function nonscallback() {
       ballStyle(pick[1], resultPage);
   }, 2000);
   setTimeout(function nonscallback() {
       ballStyle(pick[2], resultPage);
   }, 3000);
   setTimeout(function nonscallback() {
       ballStyle(pick[3], resultPage);
   }, 4000);
   setTimeout(function nonscallback() {
       ballStyle(pick[4], resultPage);
   }, 5000);
   setTimeout(function nonscallback() {
       ballStyle(pick[5], resultPage);
   }, 6000);
   // ballStyle을 거쳐 공의 모양을 css로 디자인 하여 시간을 두어 출력
   // 1~6초
   
   // 보너스 공도 출력하기
   setTimeout(function nonscallback() {
       ballStyle(bonus, bonusPage);
   }, 7000);
   ```
   
   <br/>
   
   ---
   
3. 가위바위보<a id="rockpaperscissors"></a>

   ```javascript
   var imgLocation = 0;
   
   var rockscissorpaper = { // 딕셔너리 자료구조
       rock: '0',
       scissor: '-145px',
       paper: '-286px'
   };
   // 딕셔너리 자료구조를 사용하여 0은 rock, -145px은 scissor, -286px은 paper로 초기화하여 rockscissorpage에 초기화한다.
   
   function comSelect(imgLocation) {
       // 1차원 배열일 경우 indexof를 사용하고 2차원 배열일 경우 find, findindex를 사용한다.
       // find도 반복문으로 친다.
       return Object.entries(rockscissorpaper).find(function(v) {
         // Object.entries를 사용하면 객체를 배열모양으로 바꿔준다.
           return v[1] === imgLocation;
       })[0];
   }
   
   var interval;
   function intervalMake() {
       clearInterval(interval);
     // setInterval로 반복하고 있는 것을 멈춘다.
       interval = setInterval(function() {
         // setInterval을 사용하여 일정 시간동안 함수를 실행하도록 한다.
           if(imgLocation === rockscissorpaper.rock) {
             // 딕셔러니 자료구조에서 rock 즉, 0이 맞다면..?
               imgLocation = rockscissorpaper.scissor;
             // imgLocation이 '-145px'로 초기화된다.
           } else if(imgLocation === rockscissorpaper.scissor) {
             // 딕셔러니 자료구조에서 scissor 즉, '-145px'이 맞다면..?
               imgLocation = rockscissorpaper.paper;
             // imgLocation이 '-286px'로 초기화된다.
           } else {
               imgLocation = rockscissorpaper.rock;
             // imgLocation이 0으로 초기화된다.
           }
           document.querySelector('#computer').style.background =
             'url(https://lh3.googleusercontent.com/proxy/XtgN_9EbMj-HH__xBbJiehulffSu7Z1sieFpI6nrjoGCgZ9fTXCiRjwG5duK3kwJz2rF7kVWUlSB24Tph1aj8VJZlc1WDiBhGiUEnMUDkoJL5XRu04683BFowXNuth7GSQXddwV45r-T) ' + imgLocation + ' 0';
         // 이미지 스프라이트를 사용하여 이미지를 픽셀별로 위치를 옮기며 출력한다.
       }, 100)
   }
   
   intervalMake();
   // 숫자 만들기
   
   var list = {
       rock: 1,
       scissor: 0,
       paper: -1
   }
   // list 변수 안에 rock, scissor, paper를 1, 0, -1로 초기화한 것으로 생성
   // 왜? 승/패를 가리기 위해서
   // rock vs scissor -> rock win: 1-0=1
   // rock vs paper -> paper win: 1--1=2
   // scissor vs paper -> scissor win: 0-1=-1
   // rock vs rock -> draw: 1-1=0
   // scissor vs scissor -> draw: 0-0=0
   // paper vs paper -> -1--1=0
   
   document.querySelectorAll('.btn').forEach(function(btn) {
       btn.addEventListener('click', function() {
           clearInterval(interval); // clearinterval을 사용하면 interval이 멈춘다.
           setTimeout(function() {
               intervalMake();
           }, 1000);
         // 1초 멈추기
           var mySelect = this.textContent;
           var myScore = list[mySelect];
           var comScore = list[comSelect(imgLocation)];
           var compare = myScore - comScore;
           if(compare === 0) {
               console.log('비겼습니다!');
           } else if([-1, 2].includes(compare)) {
               console.log('졌습니다!');
           } else {
               console.log('이겼습니다!');
           }
           console.log('나의 선택: ' + mySelect, '컴퓨터의 선택: ' + comSelect(imgLocation));
       });
   });
   ```
   
   
