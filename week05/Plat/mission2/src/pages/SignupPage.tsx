import { z } from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { Link } from 'react-router-dom';

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be at most 20 characters' }),

  passwordCheck: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be at most 20 characters' }),

  name: z
    .string()
    .min(1, { message: 'Name is required' }),
})
.refine((data) => data.password === data.passwordCheck, {
  message: "Passwords do not match",
  path: ['passwordCheck'],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting },
   } = useForm<FormFields>({
    defaultValues: {
      name: '',
      password: '',
      passwordCheck: '',
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div>
        <Link to='/login'>Sign in | </Link>
        <Link to='/my'>My</Link>
      </div>
      <div className="flex flex-col gap-3">
        <input 
          {...register("email")}
          name="email"
          type={"email"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder="Email" 
        />
        {errors.email && (
          <div className={'text-red-500 text-sm'}>{errors.email.message}</div>
        )}
        <input 
          {...register("password")}
          name="password"
          type={"password"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder="Password" 
        />
        {errors.password && (
          <div className={'text-red-500 text-sm'}>{errors.password.message}</div>
        )}
        <input 
          {...register("passwordCheck")}
          name="passwordCheck"
          type={"password"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder="Password Check" 
        />
        {errors.passwordCheck && (
          <div className={'text-red-500 text-sm'}>{errors.passwordCheck.message}</div>
        )}
        <input 
          {...register("name")}
          name="name"
          type={"text"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder="Name" 
        />
        {errors.name && (
          <div className={'text-red-500 text-sm'}>{errors.name.message}</div>
        )}
        <button 
          type="button"
          className={`disabled:bg-[#ccc] bg-[#807bff] text-white w-[300px] p-[10px] rounded-sm hover:bg-[#6b63e7] transition-colors cursor-pointer`}
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        > 
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignupPage;