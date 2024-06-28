import RouteProps from '../types/index.d.ts';

  import { HomePage } from '../pages/';

const publicRoutes: RouteProps[] = [

  {
    title: 'Home page',
    component: HomePage,
    exact: true,
    isPrivate: false,
    url: '/',
  },
];

export default publicRoutes;
