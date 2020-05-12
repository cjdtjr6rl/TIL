# JavaScript note 4

<br/>

## 목차

- [call by value, reference, sharing](#callby)
- [생성자](#new)
  - [this](#this)

---

1. call by value, reference, sharing<a id="callby"></a>

   모든 Javascript에서 call by value로 이루어진다고 생각을 하면 됩니다.
   
   ```javascript
   function func(j) {
     j = 10;
     console.log(j);
   }
   
   var i = 5;
   func(i); // 함수 안에 변수로 들어가지만 매개변수가 j=10으로 초기화
   console.log(i); // 렉시컬 스코프로 인해서 값이 5출력
   ```
   
   원시값이 복사가 되어 참조가 되는 것이 아닙니다.<br/>원시값이 아닌 객체로 나타내면 아래와 같습니다.
   
   ```javascript
   function func(j) {
     j.a = 10;
     console.log(j);
   }
   
   var i =  { a: 5 }; // 변수가 원시값이 아닌 객체를 참조
   func(i);
   console.log(i);
   ```
   
   복사를 하는 것이 아닌 참조를 하는 것이기 때문에 a를 변경하면 func의 안의 a도 똑같이 변경이 됩니다.<br/>call by value는 javascript에 있지만 call by reference는 javascript에 없습니다.<br/>위는 참조는 맞지만 call by reference와는 다릅니다.
   
   ```javascript
   function func(j) {
     j = 10; // 이렇게 변경을 하였을 때 
     console.log(j); // 10이 출력
   }
   
   var i =  { a: 5 };
   func(i);
   console.log(i); // call by reference가 아니기 때문에 a: 5가 출력
   ```
   
   객체 속성 수정 시에는 참조이지만 객체 자체를 수정할 시에는 관계가 깨집니다.
   
   <br/>
   
   ---
   
2. 생성자<a id="new"></a>

   ```javascript
   var prototype = {
     type: card;
   }
   
   function Card(name, att, hp) { // 생성자 함수의 앞은 대문자로 써주는 것이 약속!
     this.name = name;
     this.att = att;
     this.hp = hp;
   }
   Card.prototype = prototype; // Card.__proto__라고 쓰면 안됨
   
   var Junnna = new Card('Junnna', 5, 10);
   Junnna // { name: "Junnna", att: 5, hp: 10 }
   ```

   new를 붙여야 생성자가 생성이 됩니다.

   - this<a id="this"></a>

     ```javascript
     function Card(name, att, hp) {
       this.name = name;
       this.att = att;
       this.hp = hp;
     }
     Card.prototype = prototype;
     
     // 이렇게 했다고 했을 때
     
     var Junnna = Card('Junnna', 5, 10); // 이렇게 new연산자를 사용하지 않으면 함수를 출력하는 것
     Junnna // undefined로 출력이 됨 왜냐하면 함수로 출력했을 때 return값이 없기 때문
     
     window.name // Junnna
     window.att // 5
     window.hp // 10 이렇게 출력되는 이유는 this는 window이기 때문
     ```

     **this는 기본적으로 window이고 strict모드에서 undefined입니다.**<br/>엄격모드인 strict를 사용하면 new를 붙이지 않았을 때 경고창이 출력되게 할 수 있습니다.

     ```javascript
     var prototype = { type: 'card' };
     function Card(name, att, hp) {
       "use strict" // 이 함수만 적용, 그러나 밖에 할 시 전체 적용, 순서도 적용됨
       this.name = name;
       this.att = att;
       this.hp = hp;
     }
     Card.prototype = prototype;
     
     var Junnna = Card('Junnna', 5, 10); // 에러 발생 왜? new 연산자를 붙이지 않았기 때문
     ```

