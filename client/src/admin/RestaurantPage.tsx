import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import {RestaurantFormSchemaType,restaurantFormSchema,} from "@/schema/restaurantSchema";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchemaType>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const loading = false;
  const restaurant = false;

  const [errors, setErrors] = useState<Partial<RestaurantFormSchemaType>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
    setErrors({...errors,[name]:undefined});
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFormSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchemaType>);
      return;
    }

    // add restaurant api implementation start from here
  };

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  type="text"
                  name="restaurantName"
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.restaurantName}
                  </span>
                )}
              </div>

              <div>
                <Label>City</Label>
                <Input
                  value={input.city}
                  onChange={changeEventHandler}
                  type="text"
                  name="city"
                  placeholder="Enter your city name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  value={input.country}
                  onChange={changeEventHandler}
                  type="text"
                  name="country"
                  placeholder="Enter your country name"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  type="number"
                  name="deliveryTime"
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  value={input.cuisines}
                  onChange={(e) => {
                    setInput({ ...input, cuisines: e.target.value.split(",") });
                  }}
                  type="text"
                />
                {/* {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.cuisines}
                  </span>
                )} */}
              </div>

              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    });
                  }}
                />
                {errors && (
                  <span className="text-xs text-red-600 font-medium">
                    {errors.imageFile?.name}
                  </span>
                )}
              </div>
            </div>

            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;