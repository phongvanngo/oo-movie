import React, { ReactElement, useState } from 'react';
import testimg from 'testimage/testimg.jpg';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FixMeLater } from 'interfaces/Migrate';
import { numberToDate } from 'utils/commonConvert';

interface Props {}

export default function Comment({ comment }: FixMeLater): ReactElement {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const nestedComments = (comment.children || []).map((comment: any) => {
    return <Comment key={comment.id} comment={comment} type="child" />;
  });

  const dateTime = numberToDate(comment.time);

  return (
    <div className={`${comment.children && 'ml-20'} mt-6`}>
      <div className="flex">
        <img
          className="w-16 h-16 object-cover rounded-md mr-5"
          src={testimg}
          alt=""
        />
        <div className=" border border-gray-300 w-full rounded-md p-3 bg-white text-black">
          <div className="flex items-center">
            <div className="font-semibold cursor-pointer mb-1 mr-2">
              {comment?.user?.fullname}
            </div>
            <div className="text-xs opacity-70">{dateTime}</div>
          </div>
          <div className="text-sm ">{comment?.content} </div>
          <div className="text-sm mt-4 flex items-center">
            <div className="mr-2 hover:underline cursor-pointer text-blue-500">
              Reply
            </div>
            <div className="mr-2">4</div>
            <div className="text-xl cursor-pointer">
              {!isLiked && (
                <FcLikePlaceholder onClick={() => setIsLiked(!isLiked)} />
              )}
              {isLiked && <FcLike onClick={() => setIsLiked(!isLiked)} />}
            </div>
          </div>
        </div>
      </div>
      {nestedComments}
    </div>
  );
}
