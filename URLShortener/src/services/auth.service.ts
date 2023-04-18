import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import app from '../firebase.config';

class AuthService {
  private static instance: AuthService;
  private auth = getAuth(app);
  private constructor() {}
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  //   public isAuthenticated(): boolean {

  //   }

  public async loginWithEmailAndPassword(
    email: string,
    password: string,
    setSuccess: any
  ) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        toast.success('Login successful!');
      })
      .catch((error) => {
        toast.error('Invalid email or password!');
        console.log(error);
      });
  }

  public async logout() {
    signOut(this.auth)
      .then(() => {
        toast.success('Logout successful!');
      })
      .catch((error) => {
        toast.error('Logout failed!');
        console.log(error);
      });
  }
}

export default AuthService;
