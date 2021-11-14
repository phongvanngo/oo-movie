import PlanCard from 'components/plan/PlanCard';
import React, { ReactElement, useEffect, useRef } from 'react';
import PageHeader from '../../components/page-header/PageHeader';

interface Props {}

export default function Plan({}: Props): ReactElement {
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: 'smooth' });
  }, []);

  return (
    <>
      <PageHeader></PageHeader>

      <div className="py-6">
        <div className="flex flex-col justify-center items-center ">
          <div className="text-3xl mb-10">
            Choose your appropriate plan for you
          </div>
          <div className="md:grid grid-cols-3 gap-10">
            <PlanCard />
            <PlanCard />
            <PlanCard />
          </div>
        </div>
      </div>
    </>
  );
}
