import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSignInformation } from "../utils/validate";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const LoginPage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate, accessToken]);

  const { values, errors, touched, getInPutProps } =
    useForm<UserSignInformation>({
      initialValues: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    await login(values);
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있다면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있다면 true

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full gap-4 text-white">
        <div className="flex flex-col gap-3">
          <div className="relative flex justify-center items-center pb-6">
            <button className="absolute left-0" onClick={() => navigate("/")}>
              <ChevronLeft />
            </button>
            <h1 className="text-xl font-bold">로그인</h1>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex justify-center items-center rounded-md border border-white p-2.5"
          >
            <div className="flex items-center justify-center gap-4">
              <img
                src={"/images/image.png"}
                alt="Google Logo Image"
                className="w-8"
              />
              <p>구글 로그인</p>
            </div>
          </button>
          <div className="flex justify-between items-center">
            <hr className="text-white w-24" />
            <p className="font-bold">OR</p>
            <hr className="text-white w-24" />
          </div>
          <input
            {...getInPutProps("email")}
            name="email"
            className={`border w-75 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
            `}
            type={"email"}
            placeholder={"이메일을 입력해주세요!"}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <input
            {...getInPutProps("password")}
            name="password"
            className={`border w-75 p-2.5 focus:outline-none focus:border-[#807bff] rounded-sm
            `}
            type={"password"}
            placeholder={"비밀번호를 입력해주세요!"}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-[#E63996] text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-[#161616] disabled:text-gray-200"
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;