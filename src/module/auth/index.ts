import firebase from 'firebase/compat/app';
import { useAppDispatch } from 'redux/hooks';
import { updateUserHistory } from 'redux/reducer/userHistory';
import { auth } from '../../config/firebase';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
  new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));
  });

export const SignOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log('Sign out thanh cong');
    })
    .catch((error) => {
      console.log(error);
    });
};
