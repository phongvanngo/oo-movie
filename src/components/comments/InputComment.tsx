import SubmitButton from 'components/submitButton/SubmitButton';
import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { selectorUser } from 'redux/reducer/authenticateSlice';

interface Props {
  handleComment: FixMeLater;
  textValue?: string;
  setTextValue?: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputComment({
  handleComment,
  textValue,
  setTextValue,
}: Props): ReactElement {
  const ROW = 4;

  const handleTextChange = (e: FixMeLater) => {
    if (setTextValue) {
      setTextValue(e.target.value);
    }
  };
  const userAuth = useAppSelector(selectorUser);

  return (
    <div className="text-sm ">
      <div>
        <textarea
          name=""
          id=""
          rows={ROW}
          className="w-full bg-transparent border-white border p-3 rounded-md outline-none"
          onChange={handleTextChange}
          value={textValue}
        ></textarea>
      </div>
      <div className="flex justify-end items-center">
        {userAuth && (
          <div className="mr-4 text-xs">
            You are login as <Link to="/profile">{userAuth?.displayName}</Link>
          </div>
        )}

        {!userAuth && (
          <div className="mr-4 text-xs">
            <Link to="/sign-in">Sign-in</Link> to leave comments
          </div>
        )}
        <SubmitButton content="Post" onClick={handleComment} />
      </div>
    </div>
  );
}
