import InContentButton from 'components/InContentButton/InContentButton';
import ProfileLayout from 'layout/profile/ProfileLayout';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser, setCurrentUser } from 'redux/reducer/authenticateSlice';
import { selectorUserHistory } from 'redux/reducer/userHistory';
import { auth } from 'config/firebase';
import Modal, { ModalWithButton } from 'components/modal/Modal';
import { FixMeLater } from 'interfaces/Migrate';

interface Props {}

export default function Profile({}: Props): ReactElement {
  const ProfileButton = ({
    mouseHandler,
  }: {
    mouseHandler: React.MouseEventHandler<HTMLDivElement>;
  }) => <div onClick={mouseHandler}>Hello ne</div>;

  const globalUser = useAppSelector(selectorUser);

  const [displayName, setDisplayName] = useState<FixMeLater>(
    globalUser?.displayName
  );
  const [currentPassword, setCurrentPassword] = useState<FixMeLater>('');
  const [newPassword, setNewPassword] = useState<FixMeLater>('');

  const dispatch = useAppDispatch();

  const setEditProfileModalVisible = () => {
    const modal = document.querySelector(`#EditProfile`);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  const setPasswordEditorVisible = () => {
    const modal = document.querySelector(`#ChangePassword`);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  const editProfileModal = () => {
    auth.currentUser
      ?.updateProfile({
        displayName: `${displayName}`,
      })
      .then(() => {
        const userParsed = auth.currentUser?.toJSON();

        dispatch(setCurrentUser(userParsed));
      });
  };

  return (
    <div>
      <div className="flex py-4 justify-center">
        <div className="w-1/2 px-8">
          <div className="mb-1.5">
            <div className="font-bold">Username</div>
            <div>{auth.currentUser?.displayName}</div>
          </div>
          <div className="mb-1.5">
            <div className="font-bold">Email</div>
            <div>{auth.currentUser?.email}</div>
          </div>
          <div className="mb-1.5">
            <div className="font-bold">Creation Date</div>
            <div>{auth.currentUser?.metadata.creationTime}</div>
          </div>
          <div className="mb-1.5">
            <div className="font-bold">Payment method</div>
            <div>Visa @32312</div>
          </div>
        </div>
        <div className="border border-gray-300"></div>
        <div className="w-1/2 px-14 flex flex-col items-center justify-center">
          <InContentButton
            className="mb-4"
            eventHandler={setEditProfileModalVisible}
          >
            Edit profile
          </InContentButton>
          <InContentButton
            className="mb-4"
            eventHandler={setPasswordEditorVisible}
          >
            Change password
          </InContentButton>
          <div className="mb-1.5">Have any questions? </div>
          <InContentButton>Go to FAQ</InContentButton>
        </div>
      </div>
      {/* @ts-ignore */}
      <Modal active={false} id="EditProfile">
        {/* @ts-ignore */}
        <ModalWithButton
          okContent="Save"
          abortContent="Cancel"
          onOk={editProfileModal}
          onAbort={() => {}}
        >
          <div className="flex justify-center items-center text-xl font-semibold text-center mb-4">
            <div>Enter your new profile</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3/4 mb-4">
              <div className="font-semibold mb-1.5">Display name</div>
              <input
                type="text"
                name=""
                id=""
                className="w-full"
                value={displayName}
                onChange={(e: any) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="w-3/4">
              <div className="font-semibold">Email</div>
              <input
                type="text"
                name=""
                id=""
                className="w-full"
                disabled
                value={auth.currentUser?.email?.toString()}
              />
            </div>
          </div>
        </ModalWithButton>
      </Modal>

      {/* Change password modal */}
      {/* @ts-ignore */}
      <Modal active={false} id="ChangePassword">
        {/* @ts-ignore */}
        <ModalWithButton
          okContent="Save"
          abortContent="Cancel"
          //   onOk={}
          onAbort={() => {
            setCurrentPassword('');
            setNewPassword('');
          }}
        >
          <div className="flex justify-center items-center text-xl font-semibold text-center mb-4">
            <div>Change password</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3/4 mb-4">
              <div className="font-semibold mb-1.5">Current Password</div>
              <input
                type="password"
                name=""
                id=""
                className="w-full"
                value={currentPassword}
                onChange={(e: any) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="w-3/4">
              <div className="font-semibold">New Password</div>
              <input
                type="password"
                name=""
                id=""
                className="w-full"
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
        </ModalWithButton>
      </Modal>
    </div>
  );
}
