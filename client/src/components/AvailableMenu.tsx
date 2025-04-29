import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

type MenuType = {
  _id: string;
  image: string;
  name: string;
  price: string;
  description: string;
};

const AvailableMenu = ({ menus }: { menus: MenuType[] }) => {
  const navigate = useNavigate();

  return (
    <div className="md:p-4">
      <h1 className="text-xl  md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
      <div className="grid lg:grid-cols-3 space-y-4 lg:space-y-0 ">
        {menus.map((menu: MenuType) => (
          <Card
            key={menu._id}
            className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={menu.image}
              alt="menu image"
              className="w-full h-40 object-cover"
            />

            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-foreground ">
                {menu.name}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h3 className="text-lg font-semibold mt-4">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h3>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                onClick={() => {
                  navigate("/cart");
                }}
                className="w-full bg-orange hover:bg-hoverOrange"
              >
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AvailableMenu;