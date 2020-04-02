var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);
var multi = Number(num1) * Number(num2);

var body = document.body;
var text = document.createElement('div');
text.textContent = String(num1) + ' * ' + String(num2) + ' = ?';
document.body.append(text);

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

enterform.addEventListener('submit', function callback(e) {
    e.preventDefault();
    if(multi === Number(input_text.value)) {
        result.textContent = '정답!';
        num1 = Math.ceil(Math.random()*9);
        num2 = Math.ceil(Math.random()*9);
        multi = num1 * num2
        text.textContent = String(num1) + ' * ' + String(num2) + ' = ?';
    } else {
        result.textContent = '틀렸습니다!';
    }
    input_text.value = '';
});

//function play() {
//   while(true) {
//       var num1 = Math.ceil(Math.random()*9);
//       var num2 = Math.ceil(Math.random()*9);
//       var result = num1 + num2;
//       var change = true;
//       while(change) {
//           var real = prompt(num1 + " * " + num2 + " 의 정답은?");
//           if(result === Number(real)) {
//               alert("정답입니다!");
//               change = false;
//           } else {
//               if(real === 'stop'){
//                   break;
//               } else {
//                   alert("틀렸습니다!");
//               }
//           }
//       }
//   }
//}