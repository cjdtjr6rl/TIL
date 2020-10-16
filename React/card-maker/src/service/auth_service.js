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
