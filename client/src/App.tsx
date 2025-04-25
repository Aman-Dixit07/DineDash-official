import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ForgotPassword from "./auth/ForgotPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";

const appRouter = createBrowserRouter([
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
  {
    path:"/",
    element:(<MainLayout/>),
      children:[
        {
          path:"/",
          element:(<HeroSection/>)
        },
      ] 
  }
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