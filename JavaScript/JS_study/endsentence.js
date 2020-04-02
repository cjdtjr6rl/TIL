var b_body = document.body;
var word = document.createElement('div');
word.textContent = '시작';
document.body.append(word);

var enterform = document.createElement('form');
document.body.append(enterform);

var input_text = document.createElement('input');
enterform.append(input_text);

var btn = document.createElement('button');
btn.textContent = '입력!';
enterform.append(btn);

var result = document.createElement('div');
document.body.append(result);

input_text.focus();

enterform.addEventListener('submit', function callback(e){
    e.preventDefault();
    if(word.textContent[word.textContent.length - 1] === input_text.value[0]) {
        result.textContent = '정답!';
        word.textContent = input_text.value;
    } else {
        result.textContent = '틀렸습니다!';
    }
    input_text.value = '';
    input_text.focus();
});

//
//var word = '시작';
//
//while(true) {
//    var newWord = prompt(word + " <-- 이전 제시어");
//    if(word[word.length - 1] === newWord[0]) {
//        word = newWord;
//    } else {
//        if(newWord === 'stop') {
//            break;
//        } else {
//            alert("틀렸습니다. 다시 제시하세요.");
//        }
//    }
//}