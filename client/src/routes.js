import React, {
  Suspense,
  Fragment,
  lazy
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import StakeLayout from 'src/layouts/StakeLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/home/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Layout>
                {route.routes ? (
                  renderRoutes(route.routes)
                ) : (
                  <Component {...props} />
                )}
              </Layout>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    path: '/app',
    layout: StakeLayout,
    routes: [
      {
        exact: true,
        path: '/app/stake',
        component: lazy(() => import('src/views/stake'))
      },
      {
        exact: true,
        path: '/app/withdrawStake',
        component: lazy(() => import('src/views/withdrawStake'))
      },
      { exact: true,
        path: '/app/stakeRewards',
        component: lazy(() => import('src/views/stakeRewards'))
      },
      { exact: true,
        path: '/app/withdrawRewards',
        component: lazy(() => import('src/views/withdrawRewards'))
      },
      {
        exact: true,
        path: '/app/leaderboard',
        component: lazy(() => import('src/views/leaderboard'))
      },
      {
        exact: true,
        path: '/app/staking-stats',
        component: lazy(() => import('src/views/reports/DashboardStakingStatsView'))
      },
      {
        exact: true,
        path: '/app/chain-stats',
        component: lazy(() => import('src/views/reports/DashboardChainStatsView'))
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to='src/views/stake' />
      },
      {
        component: () => <Redirect to='/404' />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
