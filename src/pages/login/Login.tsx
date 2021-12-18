import firebase from 'firebase/compat/app';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { setCurrentUser } from 'redux/reducer/authenticateSlice';
import PageHeader from '../../components/page-header/PageHeader';
import { Providers } from '../../config/firebase';
import { SignInWithSocialMedia } from '../../module/auth';
import './login.scss';
import { FixMeLater } from 'interfaces/Migrate';
import { updateUserHistory } from 'redux/reducer/userHistory';
interface Props {}

export default function LoginPage({}: Props): ReactElement {
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const dispatch = useAppDispatch();

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    SignInWithSocialMedia(provider)
      .then((result) => {
        history.push('/');
        const user = result.user?.toJSON();
        dispatch(setCurrentUser(user));
        LocalStorageHandle(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const LocalStorageHandle = (user: FixMeLater) => {
    // localStorage.setItem('rememberMe', rememberMe);
    // localStorage.getItem('rememberMe')
    let thisUser = localStorage.getItem(user.email);

    if (thisUser) {
      dispatch(updateUserHistory(JSON.parse(thisUser)));
    } else {
      const thisUserEmail = user.email;
      const newUSer = {
        email: thisUserEmail,
        isBoughtPlan: false,
        boughtMovies: [],
        historyMovies: [],
      };
      dispatch(updateUserHistory(newUSer));
    }
  };

  const mainref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <PageHeader></PageHeader>
      <div ref={mainref} className="main h-full m-0">
        <div className="login__background"> </div>
        <div className="login__main">
          <div className="text-3xl font-semibold mb-8">Sign In</div>
          <div
            className="w-full border bg-white p-4  flex justify-center items-center text-black text-lg mb-4 hover:bg-opacity-50 hover:bg-black hover:text-white transition duration-300 cursor-pointer"
            onClick={() => signInWithSocialMedia(Providers.google)}
          >
            {' '}
            <span>Sign In With Google</span>{' '}
            <span className="text-2xl ml-2">
              <FcGoogle />
            </span>
          </div>

          <div
            className="w-full border flex items-center justify-center bg-white text-black p-4  text-lg mb-4 hover:bg-opacity-50 hover:bg-black hover:text-white transition duration-300 cursor-pointer"
            onClick={() => signInWithSocialMedia(Providers.facebook)}
          >
            {' '}
            <span>Sign In With Facebook</span>{' '}
            <span className="text-2xl ml-2 text-blue-600">
              <BsFacebook />
            </span>
          </div>
          <div className="text-center">
            Don't have account?{' '}
            <span className="text-blue-600 hover:text-blue-600 hover:underline cursor-pointer">
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
