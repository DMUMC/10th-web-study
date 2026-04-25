import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { validateSignin, type UserSignInformation } from "../utils/validate";

export default function LoginPage() {
  const { login } = useAuth();

  const { values, errors, touched, getInputProps } =
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
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <input
              {...getInputProps("email")}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
            />
            {errors?.email && touched?.email && (
              <p className="mt-2 text-sm text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              {...getInputProps("password")}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
            />
            {errors?.password && touched?.password && (
              <p className="mt-2 text-sm text-red-400">{errors.password}</p>
            )}
          </div>

          <button
            type="button"
            disabled={isDisabled}
            onClick={handleSubmit}
            className="mt-2 w-full rounded-2xl bg-purple-500 py-3 font-semibold text-white transition-colors hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
          >
            Login
          </button>

          <div className="flex items-center gap-3 py-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
          >
            <img
              src="/googlelogo.png"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}