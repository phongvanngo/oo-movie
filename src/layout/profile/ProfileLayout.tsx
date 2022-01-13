import checkoutApi from 'api/oomovie/checkoutApi';
import movieApi from 'api/oomovie/movieApi';
import { FixMeLater } from 'interfaces/Migrate';
import { SignOut } from 'module/auth';
import React, {
  ReactChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser, setCurrentUser } from 'redux/reducer/authenticateSlice';
import { setLoading } from 'redux/reducer/loader';
import backgroundImage from 'testimage/captain.jpg';
import { numberToDate } from 'utils/commonConvert';
import { clearLocalStorage } from 'utils/localstorage';
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
  const userAuth = useAppSelector(selectorUser);

  const [currentPlan, setCurrentPlan] = useState<FixMeLater>();

  const LogOut = () => {
    SignOut();
    dispatch(setCurrentUser(null));
    toast('Sign out successfully!');
    clearLocalStorage();
    history.push('/');
  };

  const parsedTime = numberToDate(currentPlan?.expired_in);

  useEffect(() => {
    const getPurchasedPlan = async () => {
      const purchasedPlan = localStorage.getItem('purchasedPlan');
      if (!purchasedPlan) {
        try {
          const reponse: FixMeLater = await checkoutApi.getPurcasedPlan({});
          console.log(reponse?.data);
          setCurrentPlan(reponse?.data);
          localStorage.setItem('purchasedPlan', JSON.stringify(reponse?.data));
        } catch (error) {}
      } else {
        setCurrentPlan(JSON.parse(purchasedPlan));
      }
    };
    getPurchasedPlan();
  }, []);

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
          <div className="profile__main__notification">
            <div>Welcome back {userAuth?.displayName}!</div>
            <div>
              Current plan:{' '}
              {currentPlan?.plan?.title ? currentPlan?.plan?.title : 'None'}
            </div>
            <div>Expired date: {parsedTime ? parsedTime : 'None'}</div>
          </div>
          <div className="profile__main__content">
            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
