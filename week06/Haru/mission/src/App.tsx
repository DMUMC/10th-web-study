import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';

import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import CreatePage from './pages/CreatePage';
import LpDetailPage from './pages/LpDetailPage';
import GoogleCallback from './pages/GoogleCallback';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedLayout from './components/ProtectedRoute'; 
import HomeLayout from './layouts/HomeLayout';
import { SidebarProvider } from './context/SidebarContext';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: 'lp/:lpid',
            element: <LpDetailPage />,
          },
          {
            path: 'my',
            element: <MyPage />,
          },
          {
            path: 'create',
            element: <CreatePage />,
          },
        ],
      },
    ],
  },
  { path: '/login', element: <Loginpage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/v1/auth/google/callback', element: <GoogleCallback /> },
];

const router = createBrowserRouter(routes);

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

function App() {
  return ( 
    <QueryClientProvider client={queryClient}>
      <AuthProvider>   
        <SidebarProvider> 
          <RouterProvider router={router} />
        </SidebarProvider>
      </AuthProvider>     
    </QueryClientProvider>
  );
}

export default App;