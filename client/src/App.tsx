import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import { createBrowserRouter, RouterProvider , Navigate } from "react-router-dom";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";
import ProfilePage from "./components/ProfilePage";
import SearchPage from "./components/SearchPage";
import RestaurantDetailPage from "./components/RestaurantDetailPage";
import Cart from "./components/Cart";
import SuccessPage from "./components/SuccessPage";
import RestaurantPage from "./admin/RestaurantPage";
import AddMenu from "./admin/AddMenu";
import Order from "./admin/Order";
import { useUserStore } from "./store/useUserStore";
import { ReactNode, useEffect } from "react";
import Loading from "./components/Loading";

const AuthenticatedUser = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }

  return children;
};

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:(<ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>),
      children:[
        {
          path:"/",
          element:(<HeroSection/>)
        },
        {
          path:"/profile",
          element:(<ProfilePage/>)
        },
        {
          path:"/search/:text",
          element:(<SearchPage/>)
        },
        {
          path:"/restaurant/:id",
          element:(<RestaurantDetailPage/>)
        },
        {
          path:"/cart",
          element:(<Cart/>)
        },
        {
          path:"/order/status",
          element:(<SuccessPage/>)
        },
        //Admin Routes starts from here
        {
          path:"/admin/restaurant",
          element:( <AdminRoute>
            <RestaurantPage />
          </AdminRoute>)
        },
        {
          path:"/admin/menu",
          element:(<AdminRoute>
            <AddMenu />
          </AdminRoute>)
        },
        {
          path:"/admin/orders",
          element:(<AdminRoute>
            <Order />
          </AdminRoute>)
        }
      ] 
  },
  {
    path:"/signup",
    element:(<AuthenticatedUser>
        <SignUp />
      </AuthenticatedUser>)
  },
  {
    path:"/login",
    element:( <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>)
  },
  {
    path:"/forgot-password",
    element:(<AuthenticatedUser>
        <ForgotPassword />
      </AuthenticatedUser>)
  },{
    path:"/reset-password",
    element:(<ResetPassword/>)
  },{
    path:"/verify-email",
    element:(<VerifyEmail/>)
  },
  
]
)

const App = () => {

  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) return <Loading />;

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App