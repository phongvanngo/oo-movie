import ProfileLayout from 'layout/profile/ProfileLayout';
import React, { ReactElement } from 'react';

interface Props {}

export default function Profile({}: Props): ReactElement {
  return (
    <div>
      <ProfileLayout userName="NguyenKiet">
        <div>abc </div>
      </ProfileLayout>
    </div>
  );
}
