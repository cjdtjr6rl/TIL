var body = document.body;

var number;
var numArray;
var pick;
var i;

function play() {
    number = [1,2,3,4,5,6,7,8,9];
    numArray = [];

    for(i = 0; i < 4; i++) {
        pick = number.splice(Math.floor(Math.random()*number.length), 1)[0];
        numArray.push(pick);
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

var btn = document.createElement('button');
btn.textContent = '입력!';
enterform.append(btn);

input_text.focus();

var error = 0;

enterform.addEventListener('submit', function callback(e) {
    e.preventDefault();
    var solution = input_text.value;
    if(solution === numArray.join('')) {
        result.textContent = '홈~런~!';
        error = 0;
        input_text.value = '';
        
        play();
    } else {
        var solutionList = solution.split('');
        var strike = 0;
        var ball = 0;
        error ++;
        if(error >= 10){
            comment.textContent = '사용 횟수를 10번을 하였습니다. 실패!! 답은 : ' + numArray.join(',') + '였습니다.';
            error = 0;
            input_text.value = '';
            
            play();           
        } else {
            for (i = 0; i < 4; i++) {
                if(Number(solutionList[i]) === numArray[i]) {
                    strike ++;
                } else if(numArray.indexOf(Number(solutionList[i])) > -1) {
                    ball ++;
                }
            }
            result.textContent = strike + ' 스트라이크, ' + ball + ' 볼입니다.';
            comment.textContent = '사용 횟수: ' + error + " / 10";
            input_text.value = '';
        }
    }
});