var numbers = Array(45).fill().map(function(yo, index) {
    return index + 1;
});

var suffle = [];
while(numbers.length > 0) {
    var shake = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    suffle.push(shake);
}

var bonus = suffle[suffle.length - 1];
var pick = suffle
    .slice(0, 6)
    .sort(function(p, c) { 
        return p - c; 
    });

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

// for문으로 돌려 뽑은 만큼 돌리기
// 뽑은 ball들 div(resultPage)안에 출력하기
// closer 문제 발생..!!
//for(var i = 0; i < pick.length; i++){
//    setTimeout(function nonscallback() {
//        var ball = document.createElement('div');
//        ball.textContent = pick[i];
//        resultPage.appendChild(ball); 
//    }, 1000);
//}
// 클로저 해결방법..!!
for(var i = 0; i < pick.length; i++) {
    (function closer(j) { // 즉시실행함수
        setTimeout(function nonscallback() {
            ballStyle(pick[j], resultPage);
        }, (j+1)*1000);
    })(i);
}
// 클로저 없이 노가다..!
//setTimeout(function nonscallback() {
//    ballStyle(pick[0], resultPage);
//}, 1000);
//setTimeout(function nonscallback() {
//    ballStyle(pick[1], resultPage);
//}, 2000);
//setTimeout(function nonscallback() {
//    ballStyle(pick[2], resultPage);
//}, 3000);
//setTimeout(function nonscallback() {
//    ballStyle(pick[3], resultPage);
//}, 4000);
//setTimeout(function nonscallback() {
//    ballStyle(pick[4], resultPage);
//}, 5000);
//setTimeout(function nonscallback() {
//    ballStyle(pick[5], resultPage);
//}, 6000);

// 보너스 공도 출력하기
setTimeout(function nonscallback() {
    ballStyle(bonus, bonusPage);
}, 7000);