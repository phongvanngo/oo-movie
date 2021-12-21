import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import VideoPlayer from 'components/videoplayer';
import Button, { OutlineButton } from 'components/button/Button';
import Modal, { ModalContent, ModalWithButton } from 'components/modal/Modal';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  selectorUserHistory,
  updateUserHistory,
} from 'redux/reducer/userHistory';

const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  const userHistory = useAppSelector(selectorUserHistory);

  let history = useHistory();

  const location = useLocation();

  const setModalVisible = () => {
    const modal = document.querySelector(`#PaymentNotification`);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  const handleWatchMovieEvent = () => {
    const isLegalToWatch = CheckIfLegal(userHistory);

    if (isLegalToWatch) {
      pushToMovie(location.pathname);
    } else {
      setModalVisible();
    }
  };

  const CheckIfLegal = (user) => {
    if (user.isBoughtPlan) {
      return true;
    }

    const listMovies = user.boughtMovies;
    if (listMovies.length > 0) {
      const isMovieBought = listMovies.some((movie) => movie.id === item.id);
      return isMovieBought;
    }

    return false;
  };

  const pushToMovie = (path) => {
    history.push(`${path}` + '/watching');
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

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
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
                <CastList id={item.id} />
              </div>
              <div className="btns">
                <Button onClick={handleWatchMovieEvent}>Watch now</Button>
                <OutlineButton>Watch Trailer</OutlineButton>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
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
