import movieApi from 'api/oomovie/movieApi';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  addAttributeCategory,
  clearSelectedCategories,
  filterGenresTrue,
  updateDisplayCategories,
} from 'utils/Category';
import { filterMoviesByTrue, mapMoviesByType, searchMovies } from 'utils/Movie';
import { OutlineButton, OutlineButtonToggle } from '../button/Button';
import MovieCard from '../movie-card/MovieCard';
import './movie-grid.scss';
import MovieSearch from './MovieSearch';

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

  useEffect(() => {
    dispatch(setLoading(true));
    const getList = async () => {
      let listGenres = null;
      let newMovies = null;
      const params = {};

      try {
        const reponseNewMovies = await movieApi.getAll({ params });
        newMovies = filterMoviesByTrue(reponseNewMovies.data);

        if (keyword === undefined) {
          const responseGenres = await movieApi.getListGenres({ params });
          listGenres = filterGenresTrue(responseGenres?.data);
        } else {
          newMovies = searchMovies(newMovies, keyword);
        }
        const moviesByType = mapMoviesByType(newMovies, props.category);
        console.log(moviesByType);
        setItems(moviesByType);
        listItemsToFilter.current = moviesByType;

        addAttributeCategory(listGenres, setCategories);
      } catch (error) {
        console.log(error);
      }
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
