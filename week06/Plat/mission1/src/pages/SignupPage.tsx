import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),

    passwordCheck: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),

    name: z.string().min(1, { message: "Name is required" }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "Passwords do not match",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      password: "",
      passwordCheck: "",
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="mt-2 text-sm text-gray-400">
            Create your account
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <input
              {...register("email")}
              name="email"
              type="email"
              className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400 ${
                errors?.email ? "border-red-400" : "border-white/10"
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              name="password"
              type="password"
              className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400 ${
                errors?.password ? "border-red-400" : "border-white/10"
              }`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("passwordCheck")}
              name="passwordCheck"
              type="password"
              className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400 ${
                errors?.passwordCheck ? "border-red-400" : "border-white/10"
              }`}
              placeholder="Password Check"
            />
            {errors.passwordCheck && (
              <p className="mt-2 text-sm text-red-400">
                {errors.passwordCheck.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("name")}
              name="name"
              type="text"
              className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-purple-400 ${
                errors?.name ? "border-red-400" : "border-white/10"
              }`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="mt-2 w-full rounded-2xl bg-purple-500 py-3 font-semibold text-white transition-colors hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;