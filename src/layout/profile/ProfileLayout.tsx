import { profile } from 'console';
import React, { ReactChildren, ReactElement } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import backgroundImage from 'testimage/captain.jpg';
import './profile-layout.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

interface Props {
  children: ReactChildren | ReactElement;
  currentRoute?: string;
  userName: string;
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
    display: 'Your Movies',
    path: '/my-movies',
  },
  {
    id: 4,
    display: 'Collection',
    path: '/my-collection',
  },
  {
    id: 5,
    display: 'Sign Out',
    path: '/sign-out',
  },
];

export default function ProfileLayout({
  children,
  currentRoute,
  userName,
}: Props): ReactElement {
  const { pathname } = useLocation();

  const active = profileNav.findIndex((e) => e.path === pathname);

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
