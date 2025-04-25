import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    /*NAVBAR*/
  <div  className="flex flex-col min-h-screen -2 md:m-0">
  <header><Navbar/></header>
      

    {/*MAIN CONTENT*/}   
  <div className="flex-1">
        <Outlet />
      </div>


    {/*FOOTER*/}
  <footer><Footer/></footer>  
    </div>
  )
}

export default MainLayout