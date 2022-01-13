import movieApi from 'api/oomovie/movieApi';
import Button, { OutlineButton } from 'components/button/Button';
import Comments from 'components/comments';
import Modal, { ModalWithButton } from 'components/modal/Modal';
import { getListComments } from 'module/comment/commentModule';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser } from 'redux/reducer/authenticateSlice';
import { setLoading } from 'redux/reducer/loader';
import { filterDisplayComments } from 'utils/comment';
import apiConfig from '../../api/apiConfig';
import tmdbApi from '../../api/tmdbApi';
import MovieList from '../../components/movie-list/MovieList';
import CastList from './CastList';
import './detail.scss';
import VideoList from './VideoList';

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const dispatch = useAppDispatch();

  let history = useHistory();

  const location = useLocation();

  const [listComments, setListComments] = useState([]);

  const trailerSection = useRef();

  const userAuth = useAppSelector(selectorUser);

  const setModalVisible = () => {
    const modal = document.querySelector(`#PaymentNotification`);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  const handleWatchMovieEvent = async () => {
    dispatch(setLoading(true));
    const isLegalToWatch = await CheckIfLegal();
    if (isLegalToWatch) {
      pushToMovie(location.pathname);
    } else {
      setModalVisible();
    }
    dispatch(setLoading(false));
  };

  const handleWatchTrailer = () => {
    trailerSection.current?.scrollIntoView();
  };

  const CheckIfLegal = async () => {
    try {
      const isEligble = await movieApi.checkIfEligible({
        params: {
          movie_id: id,
        },
      });
      console.log(isEligble);
      return isEligble.data;
    } catch (error) {
      return false;
    }
  };

  const pushToMovie = (path) => {
    history.push({ pathname: `${path}/watch`, search: '?episode=' });
  };

  const pushToCheckout = () => {
    let MovieOrTV = 'movie';
    if (item.number_of_episodes) {
      MovieOrTV = 'tv';
    }
    let selectedItem = {
      isPlan: false,
      MovieOrTv: MovieOrTV,
      item: { ...item, price: 50 },
    };
    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    history.push('/checkout');
  };

  const rateMovie = async (value) => {
    toast(`You just voted ${value} stars!`);
    if (userAuth) {
      try {
        const data = {
          movie_id: id,
          value: value,
        };
        const response = await movieApi.rateMovie(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      let movieDetail = null;
      try {
        let response = await movieApi.getMovieDetail({ params: { id: id } });
        movieDetail = response.data;
      } catch (error) {
        movieDetail = await tmdbApi.detail(category, id, { params: {} });
      }
      setItem(movieDetail);

      console.log('movie detail ne', movieDetail);
      window.scrollTo(0, 0);
    };

    getListComments(id).then((data) => {
      const displayComments = filterDisplayComments(data);
      setListComments(displayComments);
    });
    dispatch(setLoading(true));
    getDetail().finally(() => {
      dispatch(setLoading(false));
    });
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
              <div className="movie-content__poster__rating">
                <div className="text-lg mr-2">Rating: </div>
                <Rate
                  style={{ fontSize: '25px' }}
                  defaultValue={item?.vote_average}
                  onChange={rateMovie}
                  allowClear={false}
                />
              </div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} idNew={item.movie_id_fake} />
              </div>
              <div className="btns">
                <Button onClick={handleWatchMovieEvent}>Watch now</Button>
                <OutlineButton onClick={handleWatchTrailer}>
                  Watch Trailer
                </OutlineButton>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="flex flex__content">
              <div className="w-3/4 flex__content__column">
                <div className="section mb-3" ref={trailerSection}>
                  <VideoList id={item.id} idNew={item.movie_id_fake} />
                </div>
                <div className="section mb-3">
                  <div className="mb-4 text-lg">Comments</div>
                  <Comments
                    comments={listComments}
                    updateComments={setListComments}
                    movieID={item.id}
                  />
                </div>
              </div>
              <div className="w-1/5  flex__content__column">
                <div className="section mb-3">
                  <div className="section__header mb-2">
                    <h2>Similar</h2>
                  </div>
                  <MovieList
                    category={category}
                    isVertical={true}
                    type="similar"
                    id={item.id}
                    idNew={item.movie_id_fake}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal active={false} id="PaymentNotification">
            {/* @ts-ignore */}
            <ModalWithButton
              onOk={() => history.push('/plan')}
              onAbort={pushToCheckout}
              okContent="Subscribe a plan"
              abortContent="Buy movie"
            >
              <div className="flex justify-center items-center text-xl text-center">
                <div>
                  You dont have permission to watch this movie.
                  <div>Buy it or Subscribe a plan</div>
                </div>
              </div>
            </ModalWithButton>
          </Modal>
        </>
      )}
    </>
  );
};

export default Detail;
