var rival_hero = document.getElementById('rival-hero');
var my_hero = document.getElementById('my-hero');
var rival_deck = document.getElementById('rival-deck');
var my_deck = document.getElementById('my-deck');
var rival_deck_data = [];
var my_deck_data = [];
var rival_hero_data;
var my_hero_data;

function rival_create(num) { // 상대덱생성
    for(var i = 0; i < num; i++) {
        rival_deck_data.push(cardFactory());
    }
}
function my_create(num) { // 나의덱생성
    for(var i = 0; i < num; i++) {
        my_deck_data.push(cardFactory());
    }
}
function rival_hero_create() { // 상대영웅생성
    rival_hero_data = cardFactory();
}
function my_hero_create() { // 내 영웅생성
    my_hero_data = cardFactory();
}

function setting() { // 초기세팅하는 함수
    rival_create(5);
    my_create(5);
    rival_hero_create();
    my_hero_create();
}

function Card() { // 입력을 받을 필요가 없으면 생성자 객체를 만들어서 return 해주면 됨, 1번만 선언되면 됨
    this.att = Math.ceil(Math.random() * 5); // 1~5까지의 공격력 랜덤하게 생성
    this.hp = Math.ceil(Math.random() * 5); // 1~5까지의 hp 랜덤하게 생성
    this.cost = Math.floor((this.att + this.hp) / 2); // cost 생성
}
function cardFactory() { // factory pattern
    return new Card(); // factory pattern에서 생성자로 만든 Card를 생성
}

setting();