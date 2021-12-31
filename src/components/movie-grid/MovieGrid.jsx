import movieApi from 'api/oomovie/movieApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getMovies, selectorMovies } from 'redux/reducer/movieSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton, OutlineButtonToggle } from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import {
  addAttributeCategory,
  clearSelectedCategories,
  updateDisplayCategories,
  updateListSelectedCategories,
} from './HandleCategory';
import './movie-grid.scss';
import MovieSearch from './MovieSearch';
import { mergeTwoArray } from 'utils/helper';

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const [categories, setCategories] = useState([]);

  const [activeCategories, setActiveCategories] = useState([]);

  //   Trigger khi click vao category item
  const FilterCategory = (selectedCate) => {
    // Danh sach nay de hien thi
    updateDisplayCategories(selectedCate, categories, setCategories);
    // Danh sach nay de xu ly logic
    updateListSelectedCategories(selectedCate, categories, setActiveCategories);
  };

  //   Trigger moi khi danh sach category active thay doi (items)
  const FilterList = (items) => {
    //   Truong hop khong co category nao dc filter thi chuyen thanh all
    let newListItems = [...items];
    if (activeCategories.length === 0) {
      setItems(newListItems);
    } else {
      newListItems = items.filter((item) => {
        // Voi 1 phim, xet toan bo category dc chon.
        // Doi voi moi category dc chon, select some in movies category.
        let isContains = false;
        activeCategories.some((activeCate) => {
          isContains = item.genre_ids.some((genre) => genre === activeCate.id);
          return isContains;
        });
        return isContains;
      });
      setItems(newListItems);
    }
    return newListItems;
  };

  const UpdateLoadMoreItems = (newLoadItems) => {
    const itemsFilterd = FilterList(newLoadItems);
    setItems([...items, ...itemsFilterd]);
  };

  useEffect(() => {
    const getList = async () => {
      let responseMovies = null;
      let responseCategories = null;
      let responseMovieNew = null;
      if (keyword === undefined) {
        const params = {};
        responseMovieNew = await movieApi.getAll({ params });
        switch (props.category) {
          case category.movie:
            responseMovies = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });

            responseCategories = await tmdbApi.getGenreList(category.movie, {
              params,
            });

            break;
          default:
            responseMovies = await tmdbApi.getTvList(tvType.popular, {
              params,
            });

            responseCategories = await tmdbApi.getGenreList(category.tv, {
              params,
            });
        }
      } else {
        const params = {
          query: keyword,
        };
        responseMovies = await tmdbApi.search(props.category, { params });
      }
      //   console.log('movie test ne', responseMovieFromAws?.data);
      //   console.log('movie that ne ne', responseMovies.results);
      //   const listItems = mergeTwoArray(
      //     responseMovieFromAws?.data,
      //     responseMovies.results
      //   );
      setItems(responseMovies.results);
      addAttributeCategory(responseCategories?.genres, setCategories);
      setTotalPage(responseMovies.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  //   Trigger moi khi active category thay doi => Get list movies moi nhat ve => filter => setState
  useEffect(() => {
    const getList = async () => {
      let responseMovies = null;
      let responseMovieFromAws = null;
      const params = {};
      responseMovieFromAws = await movieApi.getAll({ params });
      switch (props.category) {
        case category.movie:
          responseMovies = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });

          break;
        default:
          responseMovies = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
      }
      //     const listItems = mergeTwoArray(
      //     responseMovieFromAws?.data,
      //     responseMovies.results
      //   );
      FilterList(responseMovies.results);
    };
    getList();
  }, [activeCategories]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    UpdateLoadMoreItems(response.results);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
        {categories.length > 0 && (
          <div className="flex overflow-x-hidden genre-list">
            <Swiper grabCursor={true} slidesPerView={'auto'}>
              <SwiperSlide>
                <OutlineButtonToggle
                  onClick={() =>
                    clearSelectedCategories(
                      categories,
                      setCategories,
                      setActiveCategories
                    )
                  }
                  className="small btn-float-from-left"
                >
                  All
                </OutlineButtonToggle>
              </SwiperSlide>

              {categories.map((cate, i) => (
                <SwiperSlide key={i}>
                  <OutlineButtonToggle
                    onClick={FilterCategory}
                    isActive={cate.is_selected}
                    className="small btn-float-from-left"
                  >
                    {cate.name}
                  </OutlineButtonToggle>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
