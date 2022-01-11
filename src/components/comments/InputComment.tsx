import SubmitButton from 'components/submitButton/SubmitButton';
import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div className="mr-4 text-xs">
          You are login as <span className="underline">NguyenKiet</span> .
          <Link to="/"> Click to change</Link>
        </div>
        <SubmitButton content="Post" onClick={handleComment} />
      </div>
    </div>
  );
}
