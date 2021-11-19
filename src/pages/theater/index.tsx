import PageHeader from 'components/page-header/PageHeader';
import VideoPlayer from 'components/videoplayer';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router';

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

  return (
    <div>
      <PageHeader></PageHeader>
      <div>
        <VideoPlayer options={videoJsOptions} />
      </div>
    </div>
  );
}
