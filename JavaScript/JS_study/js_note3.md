# JavaScript note 3

<br/>

## 목차

- [참조와 복사](#reference)
- [복사하는 방법](#copy)
  - [깊은 복사](#deep)
- [팩토리패턴과 프로토타입](#factory)
  - [프로토타입 사용 이유](#reason)
- [Object.create()](#object)

---

1. 참조와 복사<a id="reference"></a>

   ```javascript
   var value = 'Junnna';
   var copy = value;
   
   copy // 'Junnna'
   copy = 'samatha'
   
   copy // 'samatha'
   value // 'Junnna'
   ```
   
   value에 'Junnna'라는 변수를 넣고 copy를 value를 대입을 해줍니다.<br/>그러고 나서 copy에다가 새로운 값으로 대입을 시켜 주었을 때 copy는 변화가 됐지만 변수 value의 값은 변경되지 않았습니다.<br/>
   
   그러나 객체일 경우에는 결과가 다릅니다.
   
   ```javascript
   var person = {
     name: Junnna;
   }
   var copy_person = person;
   
   copy_person.name = 'samatha';
   copy_person // 'samatha';
   person // 'samatha';
   ```
   
   객체일 경우에는 값이 복사가 되지 않고 참조가 되어 값이 변경됩니다.
   
   ```javascript
   var array = ['apple', 'orange', 'grape'];
   var copy = array;
   
   copy // ['apple', 'orange', 'grape']
   
   copy[0] = 'melon';
   copy // ['melon', 'orange', 'grape']
   array // ['melon', 'orange', 'grape']
   ```
   
   함수도 똑같이 객체로 참조되어 변경됩니다.
   
   ```javascript
   var func = function() {}
   
   func.abc = 'abc';
   copy = func;
   
   copy.abc = 'def';
   func.abc; // 'def'
   ```
   
   함수도 똑같이 객체로 참조되어 변경됩니다.
   
   <br/>
   
   ---
   
2. 복사하는 방법<a id="copy"></a>

   ```javascript
   // 방법 1 (하나씩 넣는 무식한 방법) 원시값을 복사하는 것
   var obj1 = { a: 1, b: 2 };
   var obj2 = {};
   
   obj2.a = obj1.a;
   obj2.b = obj1.b;
   
   obj2 // { a: 1, b: 2 }
   obj2.a = 3;
   obj1.a // 1 --> obj2를 변경해도 obj1은 변경이 되지 않습니다.
   
   // 방법 2 (위의 방법을 코드로 푸는 방법)
   var obj1 = { a: 1, b: 2, c: 3 }
   var obj2 = {};
   Object.keys(obj1); // keys를 사용하면 값만 뽑을 수 있습니다.
   Object.keys(obj1).forEach(function(key) { // forEach문인 반복문을 돌려 객체의 원시값을 하나하나 넣어줍니다.
     obj2[key] = obj1[key];
   });
   ```

   연결이 되어 있지 않으면 참조관계가 아닙니다. 그래서 참조인지 아닌지로 구분하면 됩니다.<br/>

   객체간의 참조관계가 있는지 알아보려면 sure관계로 알아보면 됩니다.

   방법: <code>obj1 === obj2</code>

   <br/>

   방법 2에도 단점이 있습니다.

   ```javascript
   var obj1 = { a: 1, b: { c: 1 } }; // { a: 1, b: { ... } }
   var obj2 = {};
   Object.keys(obj1).forEach(function(key) { // 이렇게 복사를 하면 a는 복사가 되지만 b는 참조관계가 됩니다.
     obj2[key] = obj1[key];
   });
   
   obj2.a = 8;
   obj1.a // 1 --> 변경이 되지 않은 것으로 보아 참조가 아닌 복사가 된 것을 확인
   
   obj2.b.c = 5;
   obj1 // { a: 1, b: { c: 5 } } --> 변경이 되는 것으로 보아 참조관계
   ```

   a값은 반복문을 돌려 원시값을 복사를 한 것이지만 b는 반복문을 돌렸지만 원시값이 아니기에 참조가 되었습니다.

   <strong>얕은복사 --> 참조, 깊은복사 --> 복사</strong>

   - 깊은 복사<a id="deep"></a>

     재귀함수를 사용하여 해결 할 수 있습니다.

     ```javascript
     var obj1 = { a: 1, b: { c: 1 } }; // { a: 1, b: { ... } }
     var obj2 = {};
     Object.keys(obj1).forEach(function(key) { 
       // obj2[key]가 객체면
       // else obj2[key]가 원시값이면
       obj2[key] = obj1[key];
     });
     ```

     copyObject라는 함수를 통해서 깊은 복사를 할 수 있습니다. 그 외에...

     <br/>

     ```javascript
     var obj1 = { a: 1, b: { c: 2 } };
     var obj2 = JSON.parse(JSON.stringify(obj1)); // 이것을 사용하면 깊은 복사가 됩니다.! 중요!
     ```

     그리고 배열도 하는 방법이 있습니다.

     ```javascript
     var arr = [1, 2, 3];
     var arr2 = arr.slice(); // slice를 사용합니다. 그러면 참조관계가 끊깁니다.
     
     arr[0] = 10;
     arr2[0] // 1
     
     // slice는 아래 코드와 같습니다. 그리하여 겉만 깊은복사지 속은 얕은복사입니다.
     // Object.keys(obj1).forEach(function(key) {
     //   obj2[key] = obj1[key];
     // });
     ```

     정리<br/>

     ```javascript
     // 얕은복사, 깊은복사 정리
     var a = 10;
     b = a; --> 복사
     
     var c = { d: 1 };
     var e = c; // 참조
     
     var obj1 = { a: 1 } // 객체 안에 객체가 없는 1단계만 사용 가능
     var obj2 = {};
     Object.keys(obj).forEach(function(key) {
      obj2[key] = obj[key];
     }); // 1단계만 복사 나머지는 참조
     
     var arr1 = [1, 2, 3];
     var arr2 = arr1.slice() // 1단계만 복사, 나머지는 참조
     
     // 성능이 최악이라.. 안쓰는것을 추천
     var obj3 = JSON.stringify(JSON.parse(obj1)); // 복사 --> 2,3 단계 사용 가능
     var arr3 = JSON.stringify(JSON.parse(arr1)); // 복사
     ```

   <br/>

   ---

3. 팩토리패턴과 프로토타입

   ```javascript
   var card = {
     name: 'Junnna',
     att: 5,
     hp: 10,
     type: 'card',
     attack: function() {
       console.log('공격!');
     },
     defence: function() {
       console.log('방어!');
     }
   }
   
   var card2 = {
     name: 'Samatha',
     att: 1,
     hp: 3,
     type: 'card',
     attack: function() {
       console.log('공격!');
     },
     defence: function() {
       console.log('방어!');
     }
   }
   
   var card2 = {
     name: 'Kim',
     att: 4,
     hp: 6,
     type: 'card',
     attack: function() {
       console.log('공격!');
     },
     defence: function() {
       console.log('방어!');
     }
   }
   ```

   이렇게 하면 공통되는 부분(중복)이 있는데 반복되어 나타내어지고 있습니다.<br/>그리하여 factory를 만들어 줍니다. 객체를 만들어 주는 공장이라고 생각하면 됩니다.

   ```javascript
   function factory(name, att, hp) {
     return {
       name: name,
       att: att,
       hp: hp,
       type: 'card',
       attack: function() {},
       defence: function() {}
     };
   }
   
   var card = factory('Junnna', 5, 10);
   var card2 = factory('Samatha', 1, 3);
   ```

   이것을 팩토리 패턴이라고 부릅니다.

   ```javascript
   var prototype = {
     type: 'card',
     attack: function() {},
     defence: function() {},
   };
   
   function factory(name, att, hp) {
     var card = {
       name: name,
       att: att,
       hp: hp,
     }
     card.__proto__ = prototype
     return card;
   }
   ```

   달라지는 부분은 전부 다르게 가며, 같은 부분은 전부 같게 가는 것이 팩토리 패턴입니다.

   <br/>

   - 프로토타입 사용 이유<a id="reason"></a>

     ```javascript
     var prototype = {
       type: 'card',
       attack: function() {},
       defence: function() {},
     };
     
     function factory(name, att, hp) {
       var card = {
         name: name,
         att: att,
         hp: hp,
       }
       card.__proto__ = prototype; // 얘가 위의 변수를 참조하기 때문에 참조하는 type을 변경을 해주면 모든 type이 변경이 됩니다.
       return card;
     }
     
     prototype.type = 'toy'; // 이렇게 하면 모든 type이 변경이 됩니다.
     
     prototype.width = 100;
     prototype.height = 300; // 이렇게 참조하는 변수안에 추가도 가능합니다.
     ```

     오더가 type을 card가 아닌 toy로 변경을 원했을 때, 한번에 변경이 용이합니다. 즉, 수정하는데에 용이합니다.

   <br/>

   ---

4. Object.create()<a id="object"></a>

   !!! 실무에서 __ proto __를 사용하면 안됩니다. !!!<br/>Object.create()를 사용하면 만들 수 있습니다.

   ```javascript
   var prototype = {
     type: 'card',
     attack: function() {},
     defence: function() {},
   };
   
   function factory(name, att, hp) {
     var card = Obejct.create(prototype); // prototype을 적용해주는 함수입니다.
     card.name = name;
     card.att = att;
     card.hp = hp;
     // card.__proto__ = prototype;
     return card;
   }
   ```

   이같은 방법으로 실무에서 사용이 가능합니다.<br/>1단계 복사로 위에서 진행했던 keys를 사용한 것도 Object.assign으로 가능합니다.

   ```javascript
   Object.keys(obj1).forEach(function(key) { 
     obj2[key] = obj1[key];
   });
   
   // 위의 것을 Object.assign을 사용해서 줄이면
   
   Object.assign(obj2, obj1); // 으로 줄일 수 있습니다.
   ```

   프로토타입 : 객체들간 공유하는 것 --> 카드를 일일히 수정하는 것이 아닌 한방에 수정할 수 있습니다. 즉 아래의 코드라고 생각하면 됩니다.

   ```javascript
   var card = Object.create(prototype);
   
   // 위와 아래의 코드의 결과는 같습니다.
   
   var card = {};
   card.__proto__ = prototype;
   ```

   

