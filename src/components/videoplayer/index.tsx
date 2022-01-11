import { FixMeLater } from 'interfaces/Migrate';
import * as React from 'react';
import videojs from 'video.js';

// Styles
import 'video.js/dist/video-js.css';

interface IVideoPlayerProps {
  options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false,
    },
  },
};

const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef() as React.MutableRefObject<HTMLVideoElement>;
  const player = React.useRef<videojs.Player>();

  React.useEffect(() => {
    if (options && options.sources) {
      videoNode.current.src = options!.sources[0].src;
    }

    player.current = videojs(videoNode.current, {
      ...initialOptions,
      ...options,
    }).ready(function () {
      console.log('onPlayerReady', videoNode.current);
    });

    return () => {
      if (player.current) {
        player.current.dispose();
      }
    };
  }, [options]);

  return <video ref={videoNode} className="video-js vjs-big-play-centered" />;
};

export default VideoPlayer;
