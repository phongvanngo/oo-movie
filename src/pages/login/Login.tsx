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
import commonApi from 'api/oomovie/commonApi';
import { setUserFromAPI } from 'redux/reducer/userFromAPI';
interface Props {}

export default function LoginPage({}: Props): ReactElement {
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const dispatch = useAppDispatch();

  const registerAndSignIn = async (user: FixMeLater) => {
    const data = {
      username: user!.uid,
      password: '12345678',
    };

    let response = null;
    try {
      const registerData = {
        ...data,
        fullname: user!.displayName,
        role: 'Subscriber',
      };
      response = await commonApi.register(registerData);
    } catch (error) {
      console.log('erorr', error);
    } finally {
      try {
        response = await commonApi.login(data);
      } catch (error) {
        console.log('erorr', error);
      }
    }
    await saveToken(response?.data);
    getUser();
  };

  const saveToken = async (data: FixMeLater) => {
    if (data && data?.accessToken) {
      localStorage.setItem('ootoken', data?.accessToken);
      return Promise.resolve();
    }
    return Promise.reject();
  };

  const getUser = async () => {
    try {
      const response = await commonApi.getUser();
      localStorage.setItem('user', JSON.stringify(response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    SignInWithSocialMedia(provider)
      .then((result) => {
        history.push('/');
        const user: any = result.user?.toJSON();
        //Goi dang nhap => Luu token

        registerAndSignIn(user);

        dispatch(setCurrentUser(user));
      })
      .catch((error) => {
        setError(error.message);
      });
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
