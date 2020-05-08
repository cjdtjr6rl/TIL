var ver = 4;
var hor = 3;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var color_num = colors.slice(); // 백업변수, colors와 color_num이 참조관계에 있으므로 slice를 사용하여 참조관계를 끊는다.
// 이 방법 외에 참조를 끊는 방법은 var color_num = JSON.parse(JSON.stringify(colors));로 깊은 복사가 된다.
// 배열 역시 깊은 복사를 사용하려면 arr.slice();를 사용하면 할 수 있다. -->
// arr = [1, 2, 3];
// arr2 = arr.slice();
// arr2[0] = 10;
// arr[0]; --> 1

// 얕은복사, 깊은복사 정리
// var a = 10;
// b = a; --> 복사

// var c = { d: 1 };
// var e = c; --> 참조

// var obj1 = { a: 1 } --> 객체 안에 객체가 없는 1단계만 사용 가능
// var obj2 = {};
// Object.keys(obj).forEach(function(key) {
//  obj2[key] = obj[key];
// }); --> 1단계만 복사 나머지는 참조

// var arr1 = [1, 2, 3];
// var arr2 = arr1.slice() -->  1단계만 복사, 나머지는 참조

// var obj3 = JSON.stringify(JSON.parse(obj1)); --> 복사 --> 2,3 단계 사용 가능
// var arr3 = JSON.stringify(JSON.parse(arr1)); --> 복사

var color = [];
var click_flag = true;
var click_card = [];
var success_card = [];
var start_time;
function shuffle() {
    for(var i = 0; color_num.length > 0; i++) { // 색깔후보들(color_num)을 색깔(color)에 random으로 넣어주는 것
        color = color.concat(color_num.splice(Math.floor(Math.random() * color_num.length), 1));
    }
}

function cardSetting(ver, hor) {
    click_flag = false;
    for(var i = 0; i < ver*hor; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c) { // 즉시실행함수로 이벤트리스너를 한번 감싸면 c라는 새로운 스코프가 생겨 클로저 문제를 해결
            card.addEventListener('click', function() {
                if(click_flag && !success_card.includes(c)) {
                    c.classList.toggle('flipped');
                    click_card.push(c);
                    if(click_card.length === 2) {
                        if(click_card[0].querySelector('.card-back').style.backgroundColor === click_card[1].querySelector('.card-back').style.backgroundColor){ // 두 카드의 색이 같으면
                            success_card.push(click_card[0]);
                            success_card.push(click_card[1]);
                            click_card = [];
                            if(success_card.length === ver*hor) {
                                var end_time = new Date();
                                alert('카드맞추기 성공! ' + (end_time - start_time) / 1000 + '초 걸렸습니다.');
                                document.querySelector('#wrapper').innerHTML = ''; // 내부 tag들 전부 다 지우기
                                color_num = colors.slice(); // 전체 카드 초기화
                                color = [];
                                success_card = [];
                                start_time = null;
                                shuffle();
                                cardSetting(ver, hor);
                            }
                        } else { // 두 카드의 색깔이 다르면
                            click_flag = false;
                            setTimeout(function() {
                                click_card[0].classList.remove('flipped');
                                click_card[1].classList.remove('flipped');
                                click_flag = true;
                                click_card = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function() {
            card.classList.add('flipped');
        }, 1000+100*index);
    });
    
    setTimeout(function() {
        document.querySelectorAll('.card').forEach(function (card, index) {
            card.classList.remove('flipped');
        });
        click_flag = true;
        start_time = new Date();
    }, 5000);
}

shuffle();
cardSetting(ver, hor);