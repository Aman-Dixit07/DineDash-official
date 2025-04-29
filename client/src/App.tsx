import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:(<MainLayout/>),
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
          element:(<RestaurantPage/>)
        }
      ] 
  },
  {
    path:"/signup",
    element:(<SignUp/>)
  },
  {
    path:"/login",
    element:(<Login/>)
  },
  {
    path:"/forgot-password",
    element:(<ForgotPassword/>)
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
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App