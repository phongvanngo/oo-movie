import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton, OutlineButtonToggle } from '../button/Button';
import Input from '../input/Input';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getMovies, selectorMovies } from 'redux/reducer/movieSlice';
import { SwiperSlide, Swiper } from 'swiper/react';

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const dispatch = useAppDispatch();
  const listMovies = useAppSelector(selectorMovies);

  const [categories, setCategories] = useState([]);

  const [activeCategories, setActiveCategories] = useState([]);

  //   ======= Get movie from api ========
  useEffect(() => {
    dispatch(getMovies());
    // console.log(listMovies);
  }, [listMovies, dispatch]);

  //   ====== Category de click vao thi filter

  const AddAttributeCategory = (listCategories) => {
    let newCategories = [];
    if (listCategories) {
      newCategories = listCategories.map((cate) => {
        return {
          ...cate,
          is_selected: false,
        };
      });
    }
    setCategories(newCategories);
  };

  const UpdateDisplayCategories = (category) => {
    let newCategories = [...categories];
    newCategories = newCategories.map((cate) => {
      if (cate.name === category) {
        return {
          ...cate,
          is_selected: !cate.is_selected,
        };
      } else {
        return {
          ...cate,
        };
      }
    });

    setCategories(newCategories);
  };

  const UpdateListSelectedCategories = (category) => {
    let newActiveCategories = categories.filter(
      (cate) => cate.is_selected === true
    );
    categories.forEach((cate) => {
      if (cate.name === category) {
        if (cate.is_selected === false) {
          newActiveCategories.push(cate);
        } else {
          newActiveCategories = newActiveCategories.filter(
            (cate) => cate.name !== category
          );
        }
      }
    });
    setActiveCategories(newActiveCategories);
  };

  const FilterCategory = (selectedCate) => {
    UpdateDisplayCategories(selectedCate);
    UpdateListSelectedCategories(selectedCate);
  };

  const FilterMovies = (movies) => {};

  const ClearSelectedCategories = () => {
    let newCategories = [...categories];
    newCategories = newCategories.map((cate) => {
      if (cate.is_selected === true) {
        return {
          ...cate,
          is_selected: !cate.is_selected,
        };
      } else {
        return {
          ...cate,
        };
      }
    });

    setCategories(newCategories);
  };

  useEffect(() => {
    const getList = async () => {
      let responseMovies = null;
      let responseCategories = null;
      if (keyword === undefined) {
        const params = {};
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
      setItems(responseMovies.results);
      console.log(responseMovies.results);
      console.log(responseCategories?.genres);
      AddAttributeCategory(responseCategories?.genres);
      setTotalPage(responseMovies.total_pages);
    };
    getList();
  }, [props.category, keyword]);

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
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
        {categories && (
          <div className="flex overflow-x-hidden genre-list">
            <Swiper grabCursor={true} slidesPerView={'auto'}>
              <SwiperSlide>
                <OutlineButtonToggle
                  onClick={ClearSelectedCategories}
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

// =================== Search component =========
const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <>
      <div className="movie-search">
        <div className="mb-2">
          <Input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>
            Search
          </Button>
        </div>
      </div>
    </>
  );
};

export default MovieGrid;
