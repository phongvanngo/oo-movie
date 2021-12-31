import { headerNav, linkDropDown } from 'config/routes';
import { SignOut } from 'module/auth';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser, setCurrentUser } from 'redux/reducer/authenticateSlice';
import { updateUserHistory } from 'redux/reducer/userHistory';
import logo from '../../assets/tmovie.png';
import './header.scss';

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const globalUserState = useAppSelector(selectorUser);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const HeaderSignOut = () => {
    SignOut();
    // dispatch(updateUserHistory({}));
    dispatch(setCurrentUser(null));
    history.push('/');
  };

  console.log('Current user', globalUserState);

  const DropDownHeader = () => (
    <div
      className={`header__dropdown border border-black border-opacity-60 drop-shadow-2xl w-full absolute rounded-md `}
    >
      {linkDropDown.map((linkItem) => (
        <Link
          key={linkItem.id}
          className="py-2 hover:bg-opacity-50  hover:bg-black w-full flex justify-center"
          to={linkItem.path}
          style={{ color: 'white', fontWeight: 500, fontSize: '20px' }}
        >
          {linkItem.name}
        </Link>
      ))}

      <div
        className="cursor-pointer py-2 hover:bg-opacity-50  hover:bg-black w-full flex justify-center"
        to="#"
        onClick={HeaderSignOut}
        style={{ color: 'white', fontWeight: 500, fontSize: '20px' }}
      >
        Sign out
      </div>
    </div>
  );

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">NightMovies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => {
            if (globalUserState) {
              if (e.path !== '/sign-in') {
                if (e.path === '/profile') {
                  return (
                    <li
                      key={i}
                      className={`${
                        i === active ? 'active' : ''
                      } header__profile`}
                    >
                      <Link to="#" className=" ">
                        {globalUserState.displayName}
                      </Link>
                      <DropDownHeader />
                    </li>
                  );
                }

                return (
                  <li key={i} className={`${i === active ? 'active' : ''}`}>
                    <Link to={e.path}>{e.display}</Link>
                  </li>
                );
              }
            } else {
              if (e.path !== '/profile') {
                return (
                  <li key={i} className={`${i === active ? 'active' : ''}`}>
                    <Link to={e.path}>{e.display}</Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
