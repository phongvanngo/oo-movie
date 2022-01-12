import movieApi from 'api/oomovie/movieApi';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { filterMoviesByTrue, mergeMovieLists } from 'utils/Movie';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { OutlineButton, OutlineButtonToggle } from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import './movie-grid.scss';
import MovieSearch from './MovieSearch';
import { mapMoviesByType, searchMovies } from 'utils/Movie';
import {
  addAttributeCategory,
  updateDisplayCategories,
  clearSelectedCategories,
  filterGenresTrue,
} from 'utils/Category';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const listItemsToFilter = useRef();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  const dispatch = useAppDispatch();

  //   Trigger khi click vao category item
  const FilterCategory = (selectedCate) => {
    // 1 danh sach de hien thi. 1 danh sach de xu ly logic
    updateDisplayCategories(
      selectedCate,
      categories,
      setCategories,
      setActiveCategories
    );
  };

  //   Trigger moi khi danh sach category active thay doi (items)
  const FilterList = (refItems) => {
    //   Truong hop khong co category nao dc filter thi chuyen thanh all
    let newListItems = [...refItems];
    if (activeCategories.length === 0) {
      setItems(newListItems);
    } else {
      newListItems = refItems.filter((item) => {
        // Voi 1 phim, xet toan bo category dc chon.
        // Doi voi moi category dc chon, select some in movies category.
        let isContains = activeCategories.some((activeCate) => {
          return item.genres.some((genre) => {
            // const isAlike = genre.name.indexOf(activeCate.name);
            return genre.id === activeCate.id;
          });
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
    dispatch(setLoading(true));
    const getList = async () => {
      let listGenres = null;
      let newMovies = null;
      const params = {};

      const reponseNewMovies = await movieApi.getAll({ params });
      newMovies = filterMoviesByTrue(reponseNewMovies.data);

      if (keyword === undefined) {
        const responseGenres = await movieApi.getListGenres({ params });
        listGenres = filterGenresTrue(responseGenres?.data);
      } else {
        newMovies = searchMovies(newMovies, keyword);
      }

      newMovies = mapMoviesByType(newMovies, props.category);
      console.log(newMovies);
      setItems(newMovies);
      listItemsToFilter.current = newMovies;

      addAttributeCategory(listGenres, setCategories);
    };
    getList().finally(() => {
      dispatch(setLoading(false));
    });
  }, [props.category, keyword]);

  useEffect(() => {
    if (listItemsToFilter.current) {
      FilterList(listItemsToFilter.current);
    }
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
                    cateItem={cate}
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
        {/* {items && items.length === 0 && 'No movies found'} */}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={() => {}}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
