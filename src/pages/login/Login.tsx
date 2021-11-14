import React, { ReactElement, useRef, useEffect } from 'react';
import PageHeader from '../../components/page-header/PageHeader';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import './login.scss';
import { firebase } from '../../firebase/firebase';

interface Props {}

export default function LoginPage({}: Props): ReactElement {
  const SignInWithGoogle = () => {
    // const google__provider = new Firebase.
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
          <div className="w-full border bg-white p-4  flex justify-center items-center text-black text-lg mb-4 hover:bg-opacity-50 hover:bg-black hover:text-white transition duration-300 cursor-pointer">
            {' '}
            <span>Sign In With Google</span>{' '}
            <span className="text-2xl ml-2">
              <FcGoogle />
            </span>
          </div>

          <div className="w-full border flex items-center justify-center bg-white text-black p-4  text-lg mb-4 hover:bg-opacity-50 hover:bg-black hover:text-white transition duration-300 cursor-pointer">
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
