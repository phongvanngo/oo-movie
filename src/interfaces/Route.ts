export default interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  name: string; // Used to update page infon and title.
  isProfile: boolean;
  protected: boolean; // This will defines if the route is proteted or not
}

export type RouterParams = {
  category: string;
  id: string;
  episode: string;
};
