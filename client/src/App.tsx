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