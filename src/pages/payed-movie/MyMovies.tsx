import React, { ReactElement, useEffect, useState } from 'react';
import tmdbApi, { category, movieType, tvType } from 'api/tmdbApi';
import { FixMeLater } from 'interfaces/Migrate';
import MovieCard from 'components/movie-card/MovieCard';
import { SwiperSlide, Swiper } from 'swiper/react';

import './movie-slide.scss';
import { selectorUserHistory } from 'redux/reducer/userHistory';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import checkoutApi from 'api/oomovie/checkoutApi';
import { Movie } from 'interfaces/Order';
import { setLoading } from 'redux/reducer/loader';

interface Props {}

export default function MyMovies({}: Props): ReactElement {
  const [items, setItems] = useState([]);

  const [purchasedItems, setPurchasedItems] = useState<FixMeLater>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getList = async () => {
      let listMovies: FixMeLater = null;
      const params = {};
      try {
        listMovies = await tmdbApi.getMoviesList(movieType.popular, { params });
        setItems(listMovies.results);

        const purchasedItems: FixMeLater = await checkoutApi.getPurchasedMovies(
          {}
        );
        setPurchasedItems(purchasedItems?.data);
        console.log('data me', purchasedItems);
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(setLoading(true));
    getList().finally(() => {
      dispatch(setLoading(false));
    });
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
        {purchasedItems &&
          purchasedItems.length > 0 &&
          purchasedItems.map((item: any, i: any) => (
            <div className="w-44" key={i}>
              <MovieCard
                key={i}
                item={item}
                category={item.is_tv_series ? category.tv : category.movie}
              />
            </div>
          ))}
      </div>
    </>
  );
}
