import React, { ReactChildren, ReactElement } from 'react';
import backgroundImage from 'testimage/captain.jpg';
import './profile-layout.scss';

interface Props {
  children: ReactChildren | ReactElement;
  currentRoute?: string;
  userName: string;
}

export default function ProfileLayout({
  children,
  currentRoute,
  userName,
}: Props): ReactElement {
  return (
    <>
      <div
        className={`profile-cover `}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="profile container">
        <div className="profile__sidebar">
          <div className="profile__sidebar__avatar">
            <img src={backgroundImage} alt="captain" />
          </div>

          <div className="profile__sidebar__menu">
            <div className="profile__sidebar__menu__item">
              <div className="profile__sidebar__menu__item__content">
                Profile
              </div>
              <div className="profile__sidebar__menu__item__icon">{' >'}</div>
            </div>
            <div className="profile__sidebar__menu__item">Hello</div>
            <div className="profile__sidebar__menu__item">Hello</div>
            <div className="profile__sidebar__menu__item">Hello</div>
            <div className="profile__sidebar__menu__item">Hello</div>
          </div>
        </div>

        <div className="profile__main">
          <div className="profile__main__notification">Welcome {userName}</div>
          <div className="profile__main__content">
            <div>{children}</div>
          </div>
        </div>

        {/* Tablet */}
        {/* <div>Icon tablet</div> */}
      </div>
    </>
  );
}
