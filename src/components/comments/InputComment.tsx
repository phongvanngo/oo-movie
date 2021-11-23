import SubmitButton from 'components/submitButton/SubmitButton';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {}

export default function InputComment({}: Props): ReactElement {
  const ROW = 4;

  return (
    <div className="text-sm ">
      <div>
        <textarea
          name=""
          id=""
          rows={ROW}
          className="w-full bg-transparent border-white border p-3 rounded-md outline-none"
        ></textarea>
      </div>
      <div className="flex justify-end items-center">
        <div className="mr-4 text-xs">
          You are login as <span className="underline">NguyenKiet</span> .
          <Link to="/"> Click to change</Link>
        </div>
        <SubmitButton content="Post" />
      </div>
    </div>
  );
}
