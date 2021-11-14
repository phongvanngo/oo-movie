import PlanCard from 'components/plan/PlanCard';
import React, { ReactElement } from 'react';
import PageHeader from '../../components/page-header/PageHeader';

interface Props {}

export default function Plan({}: Props): ReactElement {
  return (
    <>
      <PageHeader></PageHeader>

      <div className="flex flex-col justify-center items-center ">
        <div className="text-3xl">Choose your appropriate plan for you</div>
        <div>
          <PlanCard />
        </div>
      </div>
    </>
  );
}
