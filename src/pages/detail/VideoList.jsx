import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const VideoList = (props) => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      let res = null;
      try {
        res = await tmdbApi.getVideos(category, props.idNew);
      } catch (error) {
        try {
          res = await tmdbApi.getVideos(category, props.id);
        } catch (error) {}
      }
      setVideos(res?.results?.slice(0, 5));
    };
    getVideos();
  }, [category, props.id]);

  return (
    <>{videos && videos.map((item, i) => <Video key={i} item={item} />)}</>
  );
};

const Video = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default VideoList;
