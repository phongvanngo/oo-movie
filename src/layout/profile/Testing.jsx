import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import tmdbApi, { movieType } from '../../api/tmdbApi';
import './profile-layout.scss';
import backgroundImage from 'testimage/captain.jpg';

const TestingLayout = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 4));
        console.log(response);
      } catch {
        console.log('error');
      }
    };
    getMovies();
  }, []);

  return (
    <div className="profile-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{delay: 3000}}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props) => {
  return (
    <>
      <div
        className={`profile-cover ${props.className}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="profile container">
        <div className="profile__sidebar">
          <div className="profile__sidebar__avatar">
            <img src={backgroundImage} alt="captain" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestingLayout;
