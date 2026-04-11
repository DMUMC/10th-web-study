import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useForm } from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { validateSignin, type UserSignInformation } from "../utils/validate";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = 
    useForm<UserSignInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
  });
  
  const handleSubmit = async () => {
    console.log("Submitted values:", values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
    } catch (error) {
      alert(error?.message);
    }
    console.log(response);
  }

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div>
        <Link to='/signup'>Sign up | </Link>
        <Link to='/my'>My</Link>
      </div>
      <div className="flex flex-col gap-3">
        <input 
          {...getInputProps("email")}
          name="email"
          type={"email"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm`} 
          placeholder="Email" />
          {errors?.email && touched?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        <input 
          {...getInputProps("password")}
          name="password"
          type={"password"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm`} 
          placeholder="Password" />
          {errors?.password && touched?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        <button 
          type="button"
          className={`disabled:bg-[#ccc] bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm hover:bg-[#6b63e7] transition-colors cursor-pointer`}
          disabled={isDisabled}
          onClick={handleSubmit}
        > 
          Login
        </button>
      </div>
    </div>
  );
}