import apiConfig from 'api/apiConfig';
import movieApi from 'api/oomovie/movieApi';
import tmdbApi from 'api/tmdbApi';
import Comments from 'components/comments';
import MovieChappers from 'components/movie-chappers/MovieChappers';
import MovieList from 'components/movie-list/MovieList';
import VideoPlayer from 'components/videoplayer';
import { FixMeLater } from 'interfaces/Migrate';
import { MovieModelMapPattern } from 'interfaces/MovideDetail';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router';
import { MapVariable } from 'utils/MapVariables';
import './theater.scss';
import queryString from 'query-string';
import { getListComments } from 'module/comment/commentModule';
import { filterDisplayComments } from 'utils/comment';
import { IComment } from 'interfaces/Comment';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectorUser } from 'redux/reducer/authenticateSlice';
import { setLoading } from 'redux/reducer/loader';

interface Props {}

type RouterParams = {
  category: string;
  id: string;
  episode: string;
};

export default function Theater({}: Props): ReactElement {
  const { category, id } = useParams<RouterParams>();

  const location = useLocation();
  const value = queryString.parse(location.search);
  const episode = value.episode;

  const history = useHistory();

  const [item, setItem] = useState<FixMeLater>(null);

  const [listComments, setListComments] = useState<IComment[] | null>(null);

  const [listEpisodes, setListEpisodes] = useState<FixMeLater>(null);

  const [currentEpisodeObject, setCurrentEpisodeObject] =
    useState<FixMeLater>(null);

  const dispatch = useAppDispatch();

  const [movieSource, setMovieSource] = useState<FixMeLater>({
    sources: [
      {
        src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        type: 'video/mp4',
      },
    ],
  });

  const getDownloadLink = async (episodeObj: FixMeLater) => {
    const contentLink = episodeObj?.content;

    try {
      const responseList = await movieApi.getDownloadLink({
        params: { path: contentLink },
      });
      const data = responseList!.data;
      setMovieSource({
        sources: [
          {
            src: `${data}`,
            type: 'video/mp4',
          },
        ],
      });
      console.log(data);
    } catch (error) {}
    window.scrollTo(0, 0);
  };

  const getEpisodeByName = (data: FixMeLater) => {
    const currentEps = data.find((eps: FixMeLater) => eps.name === episode);
    return currentEps;
  };

  useEffect(() => {
    dispatch(setLoading(true));

    const getEpisodes = async () => {
      let responseList = null;
      try {
        responseList = await movieApi.getListEpisodes({
          params: { movieId: id },
        });
        const data: FixMeLater = responseList!.data;
        setListEpisodes(data);
        if (!episode) {
          const firstMovie: any = data[0];

          setCurrentEpisodeObject(firstMovie);
          getDownloadLink(firstMovie);

          history.replace({
            pathname: location.pathname,
            search: `?episode=${firstMovie.name}`,
          });
        } else {
          const currentEps = getEpisodeByName(data);

          setCurrentEpisodeObject(currentEps);
          getDownloadLink(currentEps);
        }
      } catch (error) {}
    };

    getListComments(id).then((data: FixMeLater) => {
      const displayComments = filterDisplayComments(data);
      setListComments(displayComments);
    });
    getEpisodes().finally(() => {
      dispatch(setLoading(false));
    });
  }, []);

  useEffect(() => {
    const getDetail = async () => {
      let movieDetail = null;
      try {
        let response: FixMeLater = await movieApi.getMovieDetail({
          params: { id: id },
        });
        movieDetail = MapVariable(response.data, MovieModelMapPattern);
      } catch (error) {
        movieDetail = await tmdbApi.detail(category, id, { params: {} });
      }
      setItem(movieDetail);

      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    if (listEpisodes) {
      const currentEps = getEpisodeByName(listEpisodes);

      setCurrentEpisodeObject(currentEps);
      dispatch(setLoading(true));
      getDownloadLink(currentEps).finally(() => {
        dispatch(setLoading(false));
      });
    }
  }, [episode]);

  return (
    <div>
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

          <div className="section">
            <div className=" movie mb-8">
              <VideoPlayer options={movieSource} />
            </div>
            <div className="flex mb-10">
              <div className="w-3/4">
                <div className="mb-10">
                  <div className="mb-4 text-lg">Chapters</div>
                  <MovieChappers
                    chappters={listEpisodes}
                    selectedChappter={currentEpisodeObject}
                  />
                </div>
                <div className="pr-6">
                  <div className="mb-4 text-lg">Comments</div>
                  <Comments
                    comments={listComments}
                    updateComments={setListComments}
                    movieID={id}
                  />
                </div>
              </div>
              <div className="w-1/4 bg-gray-700 pr-6 text-black">Banner QC</div>
            </div>
            <div className="mb-10">
              <div className="mb-4">You may also like</div>
              {/* <MovieList category={category} type="similar" id={item.id} /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
