import React, { ReactElement, useRef, useEffect, useState } from 'react';
import PageHeader from '../../components/page-header/PageHeader';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import { Link, useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { SignInWithSocialMedia } from '../../module/auth';
import { Providers } from '../../config/firebase';
import './login.scss';

interface Props {}

export default function LoginPage({}: Props): ReactElement {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const history = useHistory();

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== '') setError('');

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then((result) => {
        history.push('/');
      })
      .catch((error) => {
        setAuthenticating(false);
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
