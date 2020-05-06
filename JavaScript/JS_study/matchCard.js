var ver = 4;
var hor = 3;
var color_num = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var color = [];
var click_flag = true;
for(var i = 0; color_num.length > 0; i++) { // 색깔후보들(color_num)을 색깔(color)에 random으로 넣어주는 것
    color = color.concat(color_num.splice(Math.floor(Math.random() * color_num.length), 1));
}
console.log(color);

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
                if(click_flag) {
                    c.classList.toggle('flipped');
                }
            });
        })(card);
        document.body.appendChild(card);
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
    }, 5000);
}

cardSetting(ver, hor);