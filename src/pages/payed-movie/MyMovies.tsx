import React, { ReactElement, useEffect, useState } from 'react';
import tmdbApi, { category, movieType, tvType } from 'api/tmdbApi';
import { FixMeLater } from 'interfaces/Migrate';
import MovieCard from 'components/movie-card/MovieCard';
import { SwiperSlide, Swiper } from 'swiper/react';

import './movie-slide.scss';
import { selectorUserHistory } from 'redux/reducer/userHistory';
import { useAppSelector } from 'redux/hooks';

interface Props {}

export default function MyMovies({}: Props): ReactElement {
  const [items, setItems] = useState([]);

  const userData = useAppSelector(selectorUserHistory);

  useEffect(() => {
    const getList = async () => {
      let response: FixMeLater = null;
      const params = {};

      response = await tmdbApi.getMoviesList(movieType.popular, { params });

      setItems(response.results);
    };
    getList();
  }, []);

  return (
    <>
      <div className="font-semibold mb-4 text-lg">Recent Movies</div>
      <div className="movie-slide mb-10">
        <Swiper
          grabCursor={true}
          freeMode={true}
          spaceBetween={30}
          slidesPerView={4}
        >
          {items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard
                key={i}
                item={item}
                category={category.movie}
                progress={'20%'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="font-semibold mb-4 text-lg">My movies</div>
      <div className="grid grid-cols-4 gap-3">
        {userData.boughtMovies.map((item: any, i: any) => (
          <div className="w-44" key={i}>
            <MovieCard
              key={i}
              item={item}
              category={item.number_of_episodes ? category.tv : category.movie}
            />
          </div>
        ))}
      </div>
    </>
  );
}
