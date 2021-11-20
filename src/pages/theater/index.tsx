import tmdbApi from 'api/tmdbApi';
import PageHeader from 'components/page-header/PageHeader';
import VideoPlayer from 'components/videoplayer';
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MovieDetail } from 'interfaces/MovideDetail';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiConfig from 'api/apiConfig';

interface Props {}

type RouterParams = {
  category: string;
  id: string;
};

const videoJsOptions = {
  sources: [
    {
      src: '//vjs.zencdn.net/v/oceans.mp4',
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
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      // setItem(response);
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
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div> Hello</div>
            </div>
          </div>
        </>
      )}
      {/*       
      <div className="flex px-6">
        <div className="w-2/3">
          <VideoPlayer options={videoJsOptions} />
        </div>
        <div className="w-1/3 pl-12 flex flex-col items-center ">
          <div className="">You also like</div>
        </div>
      </div> */}
    </div>
  );
}
