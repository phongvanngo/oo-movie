import React, { useRef, useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './header.scss';

import logo from '../../assets/tmovie.png';
import { auth } from 'config/firebase';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { selectorUser } from 'redux/reducer/authenticateSlice';

const headerNav = [
  {
    display: 'Home',
    path: '/',
  },
  {
    display: 'Movies',
    path: '/movie',
  },
  {
    display: 'TV Series',
    path: '/tv',
  },
  {
    display: 'Plan',
    path: '/plan',
  },
  {
    display: 'Sign In',
    path: '/sign-in',
  },
  {
    display: 'NguyenKiet',
    path: '/profile',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathname);

  const globalUserState = useAppSelector(selectorUser);

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
          <Link to="/">tMovies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => {
            if (globalUserState) {
              if (e.path !== '/sign-in') {
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
