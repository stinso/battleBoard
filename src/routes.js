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
    exact: true,
    path: '/500',
    component: lazy(() => import('src/views/errors/InternalServerErrorView'))
  },
  {
    exact: true,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/VerifyEmail',
    component: lazy(() => import('src/views/auth/VerifyEmailView'))
  },
  {
    exact: true,
    path: '/VerifyForgotPassword',
    component: lazy(() => import('src/views/auth/VerifyForgotPasswordView'))
  },
  {
    exact: true,
    path: '/forgotPassword',
    component: lazy(() => import('src/views/auth/ForgotPasswordView'))
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/actionGamePage/cod',
        component: lazy(() => import('src/views/actionGameView'))
      },
      {
        exact: true,
        path: '/actionGamePage/fifa',
        component: lazy(() => import('src/views/actionGameView'))
      },
      {
        exact: true,
        path: '/actionGamePage/madden2021',
        component: lazy(() => import('src/views/actionGameView'))
      },
      {
        exact: true,
        path: '/gameInformationPage/:id?',
        component: lazy(() => import('src/views/gameInfo'))
      },
      {
        exact: true,
        path: '/upcomingEvents',
        component: lazy(() => import('src/views/upcomingEvents'))
      },
      {
        exact: true,
        path: '/challenges',
        component: lazy(() => import('src/views/challenges'))
      },
      {
        exact: true,
        path: '/profile/:username?',
        component: lazy(() => import('src/views/profile'))
      },
      {
        exact: true,
        path: '/userAccountSettings',
        component: lazy(() => import('src/views/userAccountSettings'))
      },
      {
        exact: true,
        path: [
          '/',
          '/dashboard',
        ],
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
