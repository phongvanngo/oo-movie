import tmdbApi from 'api/tmdbApi';
import VideoPlayer from 'components/videoplayer';
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MovieDetail } from 'interfaces/MovideDetail';
import { FixMeLater } from 'interfaces/Migrate';
import apiConfig from 'api/apiConfig';
import MovieList from 'components/movie-list/MovieList';
import './theater.scss';
import MovieChappers from 'components/movie-chappers/MovieChappers';
import Comments from 'components/comments';
import { Helmet } from 'react-helmet';

interface Props {}

type RouterParams = {
  category: string;
  id: string;
};

const videoJsOptions = {
  sources: [
    {
      // src: '//vjs.zencdn.net/v/oceans.mp4',
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      type: 'video/mp4',
    },
  ],
};

export default function Theater({}: Props): ReactElement {
  const { category, id } = useParams<RouterParams>();

  const [item, setItem] = useState<MovieDetail | null>(null);

  // let hisrory = useHistory();

  // const location = useLocation();

  useEffect(() => {
    document.title = 'Theater';

    const getDetail = async () => {
      const response: FixMeLater = await tmdbApi.detail(category, id, {
        params: {},
      });
      setItem(response);
      // console.log(response.data);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

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
              <VideoPlayer options={videoJsOptions} />
            </div>
            <div className="flex mb-10">
              <div className="w-3/4">
                <div className="mb-10">
                  <div className="mb-4 text-lg">Chapters</div>
                  <MovieChappers />
                </div>
                <div className="pr-6">
                  <div className="mb-4 text-lg">Comments</div>
                  <Comments />
                </div>
              </div>
              <div className="w-1/4 bg-gray-700 pr-6 text-black">Banner QC</div>
            </div>
            <div className="mb-10">
              <div className="mb-4">You may also like</div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
