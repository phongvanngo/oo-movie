import InContentButton from 'components/InContentButton/InContentButton';
import ProfileLayout from 'layout/profile/ProfileLayout';
import React, { ReactElement } from 'react';

interface Props {}

export default function Profile({}: Props): ReactElement {
  const testonClick = () => {
    console.log('test click ne');
  };

  const ProfileButton = ({
    mouseHandler,
  }: {
    mouseHandler: React.MouseEventHandler<HTMLDivElement>;
  }) => <div onClick={mouseHandler}>Hello ne</div>;

  return (
    <div>
      <ProfileLayout userName="NguyenKiet">
        <div className="flex py-4 justify-center">
          <div className="w-1/2 px-8">
            <div className="mb-1.5">
              <div className="font-bold">Username</div>
              <div>Nguyen Kiet</div>
            </div>
            <div className="mb-1.5">
              <div className="font-bold">Email</div>
              <div>nguyenkiet@gmail.com</div>
            </div>
            <div className="mb-1.5">
              <div className="font-bold">Created date</div>
              <div>8 July 2019</div>
            </div>
            <div className="mb-1.5">
              <div className="font-bold">Payment method</div>
              <div>Visa @32312</div>
            </div>
          </div>
          <div className="border border-gray-300"></div>
          <div className="w-1/2 px-14 flex flex-col items-center justify-center">
            <InContentButton className="mb-4">Edit profile</InContentButton>
            <InContentButton className="mb-4">Change password</InContentButton>
            <div className="mb-1.5">Have any questions? </div>
            <InContentButton>Go to FAQ</InContentButton>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}
