import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, User, PhoneOutgoing, LockKeyhole } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    email: "",
    password: "",
    fullname: "",
    contact: "",
  });
  const { loading, signup } = useUserStore();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const signupSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      return;
    }

    //api implementaion

    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={signupSubmitHandler}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-4 text-center">
          <h1 className="font-bold text-2xl">DineDash</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              className="pl-10 focus-visible:ring-1"
              onChange={changeEventHandler}
              value={input.fullname}
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.fullname}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 focus-visible:ring-1"
              onChange={changeEventHandler}
              value={input.email}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="pl-10 focus-visible:ring-1"
              onChange={changeEventHandler}
              value={input.password}
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />

            {errors && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              className="pl-10 focus-visible:ring-1"
              onChange={changeEventHandler}
              value={input.contact}
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-xs text-red-500">{errors.contact}</span>
            )}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button className="w-full bg-orange hover:bg-hoverOrange" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              Signup
            </Button>
          )}
        </div>

        <Separator />

        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;