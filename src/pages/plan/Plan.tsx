import planApi from 'api/oomovie/planApi';
import PlanCard from 'components/plan/PlanCard';
import { IPLan } from 'interfaces/Plan';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { setLoading } from 'redux/reducer/loader';
import PageHeader from '../../components/page-header/PageHeader';

interface Props {}

const SCROLL_TOP_LOCATION = 80;

export default function Plan({}: Props): ReactElement {
  const history = useHistory();

  const [listPlans, setListPlans] = useState<IPLan[] | null>(null);

  const dispatch = useAppDispatch();

  const PushToCheckout = (selectedPlan: IPLan) => {
    let selectedItem = {
      isPlan: true,
      item: selectedPlan,
    };

    localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
    history.push('/checkout');
    return;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const getPLans = async () => {
      try {
        const response = await planApi.getAllPlans();
        setListPlans(response.data);
      } catch (error) {}
    };
    getPLans().finally(() => {
      dispatch(setLoading(false));
    });
    window.scrollTo({ top: SCROLL_TOP_LOCATION, behavior: 'smooth' });
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
            {listPlans &&
              listPlans.map((plan) => (
                <PlanCard
                  plan={plan}
                  key={plan.id}
                  onCheckout={PushToCheckout}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
