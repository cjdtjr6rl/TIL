# JavaScript note 6

<br/>

## 목차

- [ES2015 const, let](#const)
- [화살표 함수](#ray)

---

1. ES2015 const, let<a id="const"></a>

   var은 예전 문법입니다.<br/>현재에 들어와서 최신문법인 const와 let을 사용합니다.<br/>const 상수이름 = 값 / 상수이름 = 값은 변경이 안됩니다.<br/>let 변수이름 = 값<br/>var은 함수스코프이고 const와 let은 블록스코프입니다.
   
   ```javascript
if(true) {
     var a =  1;
}
   
   console.log(a);	// 1
   // 함수 안에서만 지역변수성을 띕니다.
   ```
   
   <br/>
   
   ---
   
2. 화살표 함수<a id="ray"></a>

   ```javascript
   // 기존 함수 모양
   function func() {}
   
   // 화살표 함수
   const func = () => {}
   ```

   이 둘의 차이점은 같은 함수이지만 this가 다릅니다.
