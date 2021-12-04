import { SignOut } from 'module/auth';
import React, { ReactChildren, ReactElement, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { setCurrentUser } from 'redux/reducer/authenticateSlice';
import backgroundImage from 'testimage/captain.jpg';
import './profile-layout.scss';

interface Props {
  children: ReactNode;
  currentRoute?: string;
  userName?: string;
}

const profileNav = [
  {
    id: 1,
    display: 'Profile',
    path: '/profile',
  },
  {
    id: 2,
    display: 'Payment History',
    path: '/payment-history',
  },
  {
    id: 3,
    display: 'My Movies',
    path: '/my-movies',
  },
  {
    id: 4,
    display: 'Collection',
    path: '/my-collection',
  },
];

export default function ProfileLayout({
  children,
  currentRoute,
  userName,
}: Props): ReactElement {
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useAppDispatch();

  const LogOut = () => {
    SignOut();
    dispatch(setCurrentUser(null));
    history.push('/');
  };

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
            {profileNav.map((item) => (
              <div
                key={item.id}
                className={`profile__sidebar__menu__item ${
                  item.path === pathname && 'sidebar-active'
                }`}
              >
                <Link
                  to={item.path}
                  className="profile__sidebar__menu__item__content"
                >
                  {item.display}
                </Link>
              </div>
            ))}
            <div
              className={`profile__sidebar__menu__item `}
              onClick={() => {
                LogOut();
              }}
            >
              <div className="profile__sidebar__menu__item__content">
                Sign Out{' '}
              </div>
            </div>
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
