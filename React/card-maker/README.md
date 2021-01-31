# Card Maker

### 목차

1. [Login](#login)
2. [Card Maker](#maker)
3. [Card Preview](#preview)
4. [Review](#review)

---

- Login<a id="login"></a>

  Firebase에는 여러가지 로그인기능이 있습니다.<br/>비밀번호 인증, 이메일 링크 인증, Google 로그인, Facebook 로그인, Apple 계정으로 로그인, Twitter 로그인, GitHub 로그인 등 여러 인증방법으로 로그인을 할 수 있는 기능이 있습니다. 이와 같은 방식으로 로그인을 하면 그 회원의 <code>user_id</code>가 배정됩니다.<br/>이것으로 회원이 로그인이 됐는지 안됐는지 판별할 수 있으며, 로그인을 했으면 그 회원만의 사이트로 만들 수 있습니다.<br/>Firebase에는 또 한가지 장점이 있습니다. 바로 실시간 데이터베이스입니다.<br/>값을 수정하였을 때 onSubmit을 하지 않아도 input값이 변경이 되었으면 DB값도 바로 변경이 되며 input, ouput의 값이 실시간으로 변경됩니다.<br/>그리하여 저는 이것을 이용하여 Login을 구현하였습니다. Google과 Github 아이디를 이용하여 로그인을 진행할 수 있습니다.

  ![login](https://user-images.githubusercontent.com/43205396/106308125-97befe80-62a3-11eb-82eb-ec9430a4b891.png)

  로그인을 하면 회원의 <code>user_id</code> 의 유무판단에 따라 Route를 이용하여 페이지를 다른 화면으로 출력할 수 있게 했습니다.

  ```javascript
  import { firebaseAuth, githubProvider, googleProvider } from "./firebase";
  
  class AuthService {
    login(providerName) {
      const authProvider = this.getProvider(providerName);
      return firebaseAuth.signInWithPopup(authProvider);
    }
  
    logout() {
      firebaseAuth.signOut();
    }
  
    // 콜백함수를 받는 함수
    // 사용자가 바뀌었을 때 원하는 기능을 수행하는 콜백함수를 받음
    onAuthChange(onUserChanged) {
      firebaseAuth.onAuthStateChanged((user) => {
        // 받은 사용자정보를 함수로 전달받은 함수에 호출
        onUserChanged(user);
      });
    }
  
    getProvider(providerName) {
      switch(providerName) {
        case 'Google':
          return googleProvider;
        case 'Github':
          return githubProvider;
        default:
          throw new Error(`not supported provider: ${providerName}`);
      }
    }
  }
  
  export default AuthService;
  ```

  googleProvider나 githubProvider로 로그인을 했으면 providerName에 값을 전송시켜 로그인을 진행합니다.<br/>그리고 user의 정보를 firebaseAuth에 전송해 값을 가져옵니다.

  ```react
  const onLogin = (e) => {
    // props로 가져온 authService에서 login을 불러와 로그인 함
    authService
      .login(e.currentTarget.textContent)
    	// data를 받아오게 된다면 goToMaker 함수를 실행시켜 로그인한 id의 data.user.uid를 불러와 저장함
      .then((data) => goToMaker(data.user.uid));
  };
  
  // 로그인이 되어 있을 때 user의 데이터가 있을 경우 goToMaker 실행하여 user.uid를 전달
  useEffect(() => {
    authService
      .onAuthChange((user) => {
      	// null이면 알아서 로그인 화면
      user && goToMaker(user.uid);
    });
  });
  ```

  service폴더의 authService에서 login을 하면 <code>user_id</code> 인 <code>data.user.uid</code> 를 가져와 로그인을 진행합니다.<br/>로그아웃을 눌렀을 때 user값이 null이 되기 때문에 로그인을 하는 화면으로 자동전환됩니다.

  ---

- Card Maker<a id="maker"></a>

  명함을 제작하기 위해서 페이지 왼쪽 부분에 Maker하는 곳으로 지정하였습니다. 그리고 오른쪽 부분은 Preview하는 곳으로 지정하였습니다.<br/>처음 로그인 시 그 회원 정보에 card가 없으면 생성할 수 있는 부분만 출력되고, card를 생성하면 생성된 정보가 나오며 오른쪽은 그 정보에 따른 card의 미리보기가 출력됩니다.

  ![cardmaker](https://user-images.githubusercontent.com/43205396/106305690-54af5c00-62a0-11eb-92dc-eda1788d9946.png)

  카드에 대한 정보는 다음과 같습니다.

  - 카드컨셉
  - 테두리 모양
  - 앞면 색상
  - 뒷면 색상
  - 이름
  - 회사명
  - 직책
  - 회사 주소
  - 회사 번호
  - 핸드폰 번호
  - 회사 팩스
  - 주소
  - 담고싶은 말

  ![card](https://user-images.githubusercontent.com/43205396/106305713-5b3dd380-62a0-11eb-88b3-1f64f4c5d775.png)

  다양한 정보를 입력할 수 있으며, 아래 Delete 옆에는 카드에 이미지를 넣을 수 있습니다.<br/>DB에 이미지를 저장하는데 용량의 제한이 있기 때문에 어떻게 하면 이미지를 데이터에 무리 없이 불러올 수 있을까 생각을 하다가 Cloudinary라는 것을 찾았습니다.<br/>그리하여 아래와 같은 코드로 이미지를 출력하였습니다.

  ```javascript
  class ImageUploader {
      async upload(file) {
          const data = new FormData();
          data.append('file', file);
          data.append('upload_preset', 'pdzaoz52');
          const result = await fetch(
              'https://api.cloudinary.com/v1_1/drqni4rhj/upload',
              {
                  method: 'POST',
                  body: data,
              }
          );
          return await result.json();
      }
  }
  
  export default ImageUploader;
  ```

  <code>ImageFileInput</code> 파일에 코드를 입력하여 import해줍니다.

  ```javascript
  const FileInput = memo(props => (
    <ImageFileInput {...props} imageUploader={imageUploader} />
  ));
  ```

  <code>ImageFileInput</code> 파일에 <code>ImageUploader</code> 와 <code>name</code>, <code>onFileChange</code> 데이터를 넘겨주어 url로 저장하고 불러올 수 있게 하였습니다.

  ```react
  const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
      const [loading, setLoading] = useState(false);
      const inputRef = useRef();
      const onButtonClick = (e) => {
          e.preventDefault();
          inputRef.current.click();
      };
      const onChange = async (e) => {
          setLoading(true);
          const uploaded = await imageUploader.upload(e.target.files[0]);
          setLoading(false);
          onFileChange({
              name: uploaded.original_filename,
              url: uploaded.url,
          });
      }
  
      return (
          <div className={styles.container}>
              <input
                  ref={inputRef}
                  className={styles.input}
                  type="file"
                  accept="image/*"
                  name="file"
                  onChange={onChange}
              />
              { !loading && (
                  <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onButtonClick}>
                      {name || 'No File'}
                  </button>
              )}
              { loading && <div className={styles.loading}></div> }
          </div>
      );
  };
  ```

  Cloudinary에 데이터가 있을 때 이미지 파일의 name을 출력하고, 그렇지 않으면 추가하는 버튼으로 구분을 하였습니다.<br/>card 정보 및 사진을 입력을 마무리하면 Add 버튼을 눌러 onSubmit하여 firebase에 DB를 이용하여 전송하는 방식으로 구현하였습니다.<br/><code>useRef</code> 를 사용하여 input값에 넣은 데이터들을 가져오고 그 데이터들을 객체형태로 전송하였습니다.

  ```react
  const onSubmit = (e) => {
          e.preventDefault();
          const card = {
              id: Date.now(),
              name: nameRef.current.value || '',
              company: companyRef.current.value || '',
              address: addressRef.current.value || '',
              position: positionRef.current.value || '',
              theme1: themeRef1.current.value,
              theme2: themeRef2.current.value,
              shape: shapeRef.current.value,
              design: designRef.current.value,
              comnumber: comnumberRef.current.value || '',
              number: numberRef.current.value || '',
              email: emailRef.current.value || '',
              fax: faxRef.current.value || '',
              message: messageRef.current.value || '',
              fileName: file.fileName || '',
              fileURL: file.fileURL || '',
          };
  
          formRef.current.reset();
          setFile({ fileName: null, fileURL: null })
          onAdd(card);
      }
  
      return (
          <form ref={formRef} className={styles.form}>
              <select ref={designRef} className={styles.select} name="design" placeholder="Design">
                  <option placeholder="manyInfo">manyInfo</option>
                  <option placeholder="simple">simple</option>
                  <option placeholder="static">static</option>
              </select>
              <select ref={shapeRef} className={styles.select} name="shape" placeholder="Shape">
                  <option placeholder="modern">modern</option>
                  <option placeholder="round">round</option>
                  <option placeholder="stick">stick</option>
              </select>
              <select ref={themeRef1} className={styles.select} name="theme1" placeholder="Theme1">
                  <option placeholder="light">light</option>
                  <option placeholder="dark">dark</option>
                  <option placeholder="colorful">colorful</option>
                  <option placeholder="slamon">salmon</option>
                  <option placeholder="blue">blue</option>
                  <option placeholder="gold">gold</option>
                  <option placeholder="wood">wood</option>
              </select>
              <select ref={themeRef2} className={styles.select} name="theme2" placeholder="Theme2">
                  <option placeholder="light">light</option>
                  <option placeholder="dark">dark</option>
                  <option placeholder="colorful">colorful</option>
                  <option placeholder="slamon">salmon</option>
                  <option placeholder="blue">blue</option>
                  <option placeholder="gold">gold</option>
                  <option placeholder="wood">wood</option>
              </select>
              <input ref={nameRef} className={styles.input} type="text" name="name" placeholder='Name' />
              <input ref={companyRef} className={styles.input} type="text" name="company" placeholder='Company' />
              <input ref={positionRef} className={styles.input} type="text" name="position" placeholder='Position' />
              <input ref={addressRef} className={styles.input} type="text" name="address" placeholder='Address' />
              <input ref={comnumberRef} className={styles.input} type="text" name="comnumber" placeholder='Company Number' />
              <input ref={numberRef} className={styles.input} type="text" name="number" placeholder='Phone Number' />
              <input ref={faxRef} className={styles.input} type="text" name="fax" placeholder='Fax' />
              <input ref={emailRef} className={styles.input} type="text" name="email" placeholder='Email' />
              <textarea ref={messageRef} className={styles.textarea} name="messgae" placeholder='Message' />
              <div className={styles.fileInput}>
                  <FileInput name={file.fileName} onFileChange={onFileChange} />
              </div>
              <Button name="Add" onClick={onSubmit} />
          </form>
      );
  });
  ```

  그리고 firebase repository에 데이터를 넘겨주는 방식으로 구현을 하였습니다.<br/>기능적으로 세분화시켜 데이터를 조종하는 부분에서 최적화를 생각하여 구현하였습니다.

  ```javascript
  import { firebaseDatabase } from './firebase';
  
  class CardRepository {
      syncCards(userId, onUpdate) {
          const ref = firebaseDatabase.ref(`maker/${userId}/cards`);
          ref.on('value', snapshot => {
              const value = snapshot.val();
              value && onUpdate(value);
          });
          return () => ref.off();
      }
  
      saveCard(userId, card) {
          firebaseDatabase.ref(`maker/${userId}/cards/${card.id}`).set(card);
      }
  
      removeCard(userId, card) {
          firebaseDatabase.ref(`maker/${userId}/cards/${card.id}`).remove();
      }
  }
  
  export default CardRepository;
  ```

  <code>syncCards</code> 는 데이터를 불러오는 기능, <code>saveCard</code> 는 데이터 저장 및 수정, <code>removeCard</code> 는 특정 데이터를 삭제하는 기능으로 구분하였습니다.

  ---

- Card Preview<a id="preview"></a>

  생성한 카드를 시각적으로 어떻게 만들었는지 확인을 하고 싶었습니다.<br/>그리하여 생성한 카드를 어떻게 보여주면 좋을까 생각을 하다가 명함이니 앞면과 뒷면으로 구분을 했으면 좋겠다라고 생각을 하였으며, 간단한 디자인의 명함, 정보들을 많이 입력한 명함으로 구분을 하여 제작을 해 보았습니다.

  ![preview](https://user-images.githubusercontent.com/43205396/106305715-5c6f0080-62a0-11eb-9aee-c3ac02806ee2.png)

  예시로 위와 같은 이미지로 출력이 됩니다.<br/>

  ```react
  return (
    <>
      {
        design === 'manyInfo' ?
        (<li ref={printRef} className={styles.groupcard} onClick={print}>
          <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)} ${styles.manyInfo}`}>
            <img className={styles.avatar} src={url} alt="profile"/>
            <div className={styles.front}>
              <h1 className={styles.name}>
                <span className={styles.position}>{position && `${position} | `}</span>
                {name}
              </h1>
              <p className={styles.company}>{company}</p>
              <p className={styles.address}>{address}</p>
              <div className={styles.content}>
                <p className={styles.number}><b>{ number && `Mobile: `}</b>{number}</p>
                <p className={styles.comnumber}><b>{ comnumber && `Tel: `}</b>{comnumber}</p>
                <p className={styles.fax}><b>{ fax && `Fax: `}</b>{fax}</p>
                <p className={styles.email}><b>{ email && `Email: `}</b>{email}</p>
              </div>
            </div>
          </dt>
          <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)} ${styles.manyInfo}`}>
            <div className={styles.back}>
              <p className={styles.message}>
                {
                  message.split('\n').map( line => {
                    return (<span key={line}>{line}<br/></span>)
                  })
                }
              </p>
            </div>
          </dt>
        </li>) : design === 'simple' ?
      (<li ref={printRef} className={styles.groupcard} onClick={print}>
        <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)} ${styles.simple}`}>
          <div className={styles.front}>
            <div className={styles.intro}>
              <h1 className={styles.name}>{name}</h1>
              <p className={styles.position}>{position}</p>
            </div>
            <p className={styles.number}>{number}</p>
            <div className={styles.content}>
              <p className={styles.email}>{email}</p>
              <p className={styles.message}>
                {
                  message.split('\n').map( line => {
                    return (<span key={line}>{line}<br/></span>)
                  })
                }
              </p>
            </div>
          </div>
        </dt>
        <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)} ${styles.simple}`}>
          <div className={styles.back}>
            <img className={styles.avatar} src={url} alt="profile"/>
          </div>
        </dt>
      </li>) : design === 'static' ?
      (<li ref={printRef} className={styles.groupcard} onClick={print}>
        <dt id="modal-body" className={`${styles.card} ${getStyles(theme1)} ${shapeStyles(shape)} ${styles.static}`}>
          {address}, {comnumber}
        </dt>
        <dt className={`${styles.card} ${getStyles(theme2)} ${shapeStyles(shape)} ${styles.static}`}>
          {fax}, {number}, {position}
        </dt>
      </li>) : <li>이상하게 적지 마세요!!</li>
    }
    </>
  );
  ```

  디자인에 따라 다르게 디자인이 출력되도록 코드를 작성했습니다.<br/>카드만 만들면 실제로 사용하기에 무리가 있으며, 사용자들이 아무리 카드를 만들었어도 인쇄를 할 수 없다는 단점이 있습니다.<br/>그리하여 명함을 직접 인쇄할 수 있도록 카드를 클릭 시 3개의 명함을 프린트할 수 있게 구현을 하였습니다.

  ![print](https://user-images.githubusercontent.com/43205396/106344158-6880af80-62ec-11eb-93a3-8a04cf431b3b.png)

  card를 클릭하면 위와 같이 출력되며 실제로 명함으로 제작을 할 수 있습니다.

  ```react
  function print() {
    const html = document.querySelector('html');
    const printContents = printRef.current.innerHTML;
    const printUl = document.createElement('ul');
    const printDiv1 = document.createElement('li');
    printDiv1.className = printRef.current.className;
    const printDiv2 = document.createElement('li');
    printDiv2.className = printRef.current.className;
    const printDiv3 = document.createElement('li');
    printDiv3.className = printRef.current.className;
  
  
    printUl.style.display = 'flex';
    printUl.style.flexDirection = 'column';
    printUl.style.alignItems = 'center';
    printUl.style.padding = 0;
    printUl.style.marginTop = '5px';
  
    printDiv1.style.boxShadow = 'none';
    printDiv1.style.border = 0;
    printDiv2.style.boxShadow = 'none';
    printDiv2.style.border = 0;
    printDiv3.style.boxShadow = 'none';
    printDiv3.style.border = 0;
  
    html.appendChild(printUl);
    printUl.appendChild(printDiv1);
    printDiv1.innerHTML = printContents;
    printUl.appendChild(printDiv2);
    printDiv2.innerHTML = printContents;
    printUl.appendChild(printDiv3);
    printDiv3.innerHTML = printContents;
  
    document.body.style.display = 'none';
    window.print();
    document.body.style.display = 'block';
    printUl.style.display = 'none';
  }
  ```

  DB에 있는 값을 가져와 CSS도 맞춰 출력할 수 있습니다.

  ---

- Review<a id="review"></a>

  명함을 전문가들이 아닌 일반인들끼리 만든다는 설정으로 프로젝트를 진행 했습니다.<br/>그러나 디자인적으로 한계가 있다는 점이 있다고 생각을 하여 어떻게 하면 좋을까 라고 고민을 하던 중 이용자들끼리 피드백을 주며 review형식으로 대화창을 만들면 좋지 않을까라고 고민을 하게 되었습니다.<br/>그리고 firebase의 장점 중 하나인 실시간 DB가 있기에 채팅 형식으로 구현을 할 수 있었습니다.

  ![review](https://user-images.githubusercontent.com/43205396/106305720-5da02d80-62a0-11eb-91c2-a14526b78409.png)

  <code>All Talking</code> 에서는 모든 회원들끼리 대화가 이루어질 수 있으며 본인의 계정의 대화는 오른쪽으로 나오고, 그 이외의 모든 사용자의 말은 왼쪽으로 출력됩니다.<br/>spacebar도 들어갈 수 있게 구현을 하였으며 아무리 길게 쓰더라도 UI가 깨지지 않고 잘 출력됩니다.

  ```react
  const Review = memo(({ authService, commentRepository, userRepository, division }) => {
    const historyState = useHistory();
    const [comments, setUsers] = useState({});
    const [users, setUser] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);
  
    useEffect(() => {
      if (!userId) {
        return;
      }
      const stopSync = userRepository.syncUsers(userId, (users) => {
        setUser(users);
      });
      return () => stopSync();
    }, [userRepository, userId]);
  
    useEffect(() => {
      if (!userId) {
        return;
      }
      const stopSync = commentRepository.syncComment(userId, (comments) => {
        setUsers(comments);
      });
      return () => stopSync();
    }, [commentRepository, userId]);
  
    // review 쓴 사용자 확인
    useEffect(() => {
      authService.onAuthChange((user) => {
        if (user) {
          setUserId(user.uid);
        }
      });
    }, [authService]);
  
    const createComment = (comment) => {
      setUsers((comments) => {
        const updated = { ...comments };
        updated[comment.id] = comment;
        return updated;
      });
      commentRepository.saveComment(userId, comment);
    };
  
    const onLogout = useCallback(() => {
      authService.logout();
    }, [authService]);
  
    return (
      <section className={styles.maker}>
        <Header onLogout={onLogout} />
        <Select />
        <h1 className={styles.title}>Review & Talk</h1>
        <section className={styles.container}>
          <UserList users={users} myId={userId} />
          <Comments authService={authService} comments={comments} createComment={createComment} myId={userId} division={division} />
        </section>
        <Footer />
      </section>
    );
  });
  ```

  comment를 작성 하였을 때 comment의 repository로 데이터들이 넘겨져 firebase의 DB로 저장됩니다.

  ```javascript
  import { firebaseDatabase } from './firebase';
  
  class CommentRepository {
      syncComment(userId, onUpdate) {
          const ref = firebaseDatabase.ref(`comments/common`);
          ref.on('value', snapshot => {
              const value = snapshot.val();
              value && onUpdate(value);
          });
          return () => ref.off();
      }
  
      saveComment(userId, comment) {
          firebaseDatabase.ref(`comments/common/${comment.id}`).set(comment);
      }
  }
  
  export default CommentRepository
  ```

  <code>syncComment</code> 는 <code>comments/common</code> 은 모든 사용자의 대화를 출력하고, <code>saveComment</code> 는 특정 사용자가 comment를 입력 하였을 때 로그인 했을 때의 id를 가지고 구분을 하며 저장되도록 구현 하였습니다.

  > 추가할 것
  >
  > 1. card를 앞 뒷면으로 인쇄하여 풀로 붙이지 않아도 자르기만하면 명함이 생성되도록 양면출력기능
  > 2. 회원가입을 했을 때 1:1 대화 구현 (미완성)