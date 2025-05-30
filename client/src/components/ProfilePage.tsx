import {
    Loader2,
    LocateIcon,
    Mail,
    MapPin,
    MapPinnedIcon,
    Plus,
  } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
  import { FormEvent, useRef, useState } from "react";
  import { Input } from "./ui/input";
  import { Label } from "./ui/label";
  import { Button } from "./ui/button";
  import { useUserStore } from "@/store/useUserStore";

const ProfilePage = () => {
  const { user, updateProfile } = useUserStore();
    const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });
    
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const imageRef = useRef<HTMLInputElement | null>(null);
      const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<string>("");
    
      const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setSelectedProfilePicture(result);
          };
          reader.readAsDataURL(file);
        }
      };
    
      const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
      };
    
      const updateProfileHandler =  async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //api implementation
         try {
      setIsLoading(true);

      await updateProfile({
        ...profileData,
        profilePicture: selectedProfilePicture,
      });

      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
    }
      };

  return (
     <form onSubmit={updateProfileHandler} className="max-w-7xl mx-auto my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 w-20 h-20">
            <AvatarImage src={user?.profilePicture} alt="profile pic" />
            <AvatarFallback>AD</AvatarFallback>
            <input
              ref={imageRef}
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
              accept="image/*"
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            value={profileData.fullname}
            onChange={changeHandler}
            name="fullname"
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label className=" text-black">Email</Label>
            <input
              disabled
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label className=" text-black">Address</Label>
            <input
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label className=" text-black">City</Label>
            <input
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label className=" text-black">Country</Label>
            <input
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {isLoading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button type="submit" className="bg-orange hover:bg-hoverOrange">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};


export default ProfilePage