var rival_hero = document.getElementById('rival-hero');
var my_hero = document.getElementById('my-hero');
var rival_deck = document.getElementById('rival-deck');
var my_deck = document.getElementById('my-deck');
var rival_field = document.getElementById('rival-cards');
var my_field = document.getElementById('my-cards');
var rival_deck_data = [];
var my_deck_data = [];
var rival_hero_data;
var my_hero_data;
var rival_field_data = [];
var my_field_data = [];
var turn = true;

function card_dom(data, dom, hero) {
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    card.querySelector('.card-cost').textContent= data.cost;
    card.querySelector('.card-att').textContent= data.att;
    card.querySelector('.card-hp').textContent= data.hp;
    if(hero) {
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click', function(card) { // 카드를 클릭했을 때
        if(turn) { // 나의 덱이라면
            var idx = my_deck_data.indexOf(data); // 데이터에서 카드를 찾아서
            my_deck_data.splice(idx, 1); // 나의 덱 데이터가 몇번째인지 찾기
            my_field_data.push(data); // data를 나의 필드에 넣기
            my_deck.innerHtml = ''; // 화면을 싹 다 지움
            my_field.innerHtml = '';
            my_field_data.forEach(function(data) { // 다시 추가 --> 비효율적
                card_dom(data, my_field);
            });
            my_deck_data.forEach(function(data) {
                card_dom(data, my_deck);
            });
        } else {
            var idx = rival_deck_data.indexOf(data);
            rival_deck_data.splice(idx, 1);
            rival_field_data.push(data);
            rival_deck.innerHtml = '';
            rival_field.innerHtml = '';
            rival_field_data.forEach(function(data) {
                card_dom(data, rival_field);
            });
            rival_deck_data.forEach(function(data) {
                card_dom(data, rival_deck);
            });
        }
    });
    dom.appendChild(card);
}

function rival_create(num) { // 상대덱생성
    for(var i = 0; i < num; i++) {
        rival_deck_data.push(cardFactory());
    }
    rival_deck_data.forEach(function(data) { // data는 공장에서 찍어낸 카드 객체
        // cloneNode()로 기존 태그를 그대로 복사가능, 인자에 true를 넣으면 내부 class까지 다 복사가능
        card_dom(data, rival_deck);
    });
}
function my_create(num) { // 나의덱생성
    for(var i = 0; i < num; i++) {
        my_deck_data.push(cardFactory()); // 빈값으로 넣으면 undefined가 들어가 영웅이 아닌것으로 판별
    }
    my_deck_data.forEach(function(data) { // data는 공장에서 찍어낸 카드 객체
        // cloneNode()로 기존 태그를 그대로 복사가능, 인자에 true를 넣으면 내부 class까지 다 복사가능
        card_dom(data, my_deck);
    });
}
function rival_hero_create() { // 상대영웅생성
    rival_hero_data = cardFactory(true); // true값을 넣어줘야 영웅으로 판별
    card_dom(rival_hero_data, rival_hero, true);
}
function my_hero_create() { // 내 영웅생성
    my_hero_data = cardFactory(true);
    card_dom(my_hero_data, my_hero, true);
}

//function Card() { // 입력을 받을 필요가 없으면 생성자 객체를 만들어서 return 해주면 됨, 1번만 선언되면 됨
//    this.att = Math.ceil(Math.random() * 5); // 1~5까지의 공격력 랜덤하게 생성
//    this.hp = Math.ceil(Math.random() * 5); // 1~5까지의 hp 랜덤하게 생성
//    this.cost = Math.floor((this.att + this.hp) / 2); // cost 생성
//}
//function cardFactory(hero) { // factory pattern
//    if() {
//       return new HeroCard();
//    } else {
//       return new Card(); // factory pattern에서 생성자로 만든 Card를 생성
//    }
//}
//위와 같은 방식이 아닌 아래와 같은 방식도 가능
function Card(hero) { // 입력을 받을 필요가 없으면 생성자 객체를 만들어서 return 해주면 됨, 1번만 선언되면 됨
    if(hero) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5); // 1~5까지의 hp 랜덤하게 생성
        this.cost = Math.floor((this.att + this.hp) / 2); // cost 생성
    }
}
function cardFactory(hero) { // factory pattern
    return new Card(hero); // factory pattern에서 생성자로 만든 Card를 생성
}

function setting() { // 초기세팅하는 함수
    rival_create(5);
    my_create(5);
    rival_hero_create();
    my_hero_create();
}

setting();