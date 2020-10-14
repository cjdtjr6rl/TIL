import firebase from "firebase";
import firebaseApp from "./firebase";

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  // 콜백함수를 받는 함수
  // 사용자가 바뀌었을 때 원하는 기능을 수행하는 콜백함수를 받음
  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      // 받은 사용자정보를 함수로 전달받은 함수에 호출
      onUserChanged(user);
    });
  }
}

export default AuthService;
