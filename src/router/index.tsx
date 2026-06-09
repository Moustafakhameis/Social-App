import { createBrowserRouter } from "react-router";
import App from "@/App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import ForgotPassword from "@/pages/ForgotPassword";
import Discover from "@/pages/Discover";
import { MainLayout } from "@/components/layout/MainLayout";
import { Feed } from "@/features/posts/Feed";
import NotFound from "@/pages/NotFound";
import SinglePost from "@/pages/SinglePost";
import UsersDirectory from "@/pages/UsersDirectory";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";

import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// We will add lazy loaded routes later
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "feed",
                element: <Feed />,
              },
              {
                path: "post/:id",
                element: <SinglePost />,
              },
              {
                path: "users",
                element: <UsersDirectory />,
              },
              {
                path: "profile",
                element: <Profile />,
              },
              {
                path: "profile/:id",
                element: <Profile />,
              },
              {
                path: "discover",
                element: <Discover />,
              },
              {
                path: "notifications",
                element: <Notifications />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ]
          }
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
], { basename: import.meta.env.BASE_URL });
