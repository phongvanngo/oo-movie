import PlanCard from 'components/plan/PlanCard';
import React, { ReactElement, useEffect, useRef } from 'react';
import PageHeader from '../../components/page-header/PageHeader';
import { useHistory } from 'react-router-dom';
import { FixMeLater } from 'interfaces/Migrate';

interface Props {}

const SCROLL_TOP_LOCATION = 80;

const listPlans = [
  {
    id: 0,
    title: 'Christmas Plan',
    price: 30,
  },
  {
    id: 1,
    title: 'All Year Plan',
    price: 80,
  },
  {
    id: 2,
    title: 'Trail Plan',
    price: 20,
  },
];

export default function Plan({}: Props): ReactElement {
  useEffect(() => {
    window.scrollTo({ top: SCROLL_TOP_LOCATION, behavior: 'smooth' });
  }, []);

  const history = useHistory();

  const PushToCheckout = (selectedPlan: FixMeLater) => {
    let selectedItem = {
      isPlan: true,
      item: selectedPlan,
    };

    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    history.push('/checkout');
  };

  return (
    <>
      <PageHeader></PageHeader>
      <div className="py-6">
        <div className="flex flex-col justify-center items-center ">
          <div className="text-3xl mb-10">
            Choose your appropriate plan for you
          </div>
          <div className="md:grid grid-cols-3 gap-10">
            {listPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                title={plan.title}
                price={plan.price}
                onCheckout={PushToCheckout}
              />
            ))}

            {/* <PlanCard
              title="All Year Plan"
              onCheckout={() => PushToCheckout('All Year Plan')}
            />
            <PlanCard
              title="Trail Plan"
              onCheckout={() => PushToCheckout('Trail Plan')}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
