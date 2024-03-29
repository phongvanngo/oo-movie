import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import MovieCard from '../movie-card/MovieCard';

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};

      if (props.type !== 'similar') {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        try {
          response = await tmdbApi.similar(props.category, props.idNew);
        } catch (error) {
          try {
            response = await tmdbApi.similar(props.category, props.id);
          } catch (error) {}
        }
      }
      setItems(response?.results);
    };
    getList();
  }, []);

  if (props.isVertical && items) {
    const numberItem = 7;
    const list5Items = items.reduce((accumulator, current, index) => {
      if (index < numberItem) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    return (
      <div className="overflow-y-hidden ">
        <Swiper
          direction="vertical"
          spaceBetween={10}
          paginationClickable
          autoplayDisableOnInteraction
          slidesPerView={'auto'}
          grabCursor={true}
        >
          {list5Items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items &&
          items.map((item, i) => (
            <SwiperSlide key={i}>
              <MovieCard item={item} category={props.category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default MovieList;
