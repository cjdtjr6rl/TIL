var ver = 4;
var hor = 3;

function cardSetting(ver, hor) {
    for(var i = 0; i < ver*hor; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(c) { // 즉시실행함수로 이벤트리스너를 한번 감싸면 c라는 새로운 스코프가 생겨 클로저 문제를 해결
            card.addEventListener('click', function() {
                c.classList.toggle('flipped');
            });
        })(card);
        document.body.appendChild(card);
    }
}

cardSetting(ver, hor);