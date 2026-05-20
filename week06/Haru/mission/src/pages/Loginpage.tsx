import { useLocation, useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import { vaildateSignin, type UserSigninInformation } from '../utils/validate'
import UserInput from '../components/UserInput'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const Loginpage = () => {
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [accessToken, navigate, from])

  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: ""
    },
    validate: vaildateSignin
  });

  const handleSubmit = async () => {
    await login(values);
    navigate(from, { replace: true });
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`;
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value === "");

  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-[#121212] p-4'>
      <div className='w-full max-w-[400px] bg-[#1e1e1e] border border-white/5 rounded-2xl p-10 shadow-2xl'>
        <div className="flex items-center mb-10 relative">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 text-gray-400 hover:text-white transition-colors"
          >
            {"<"}
          </button>
          <h1 className="w-full text-center text-2xl font-bold text-white">로그인</h1>
        </div>

        <div className="space-y-4 mb-8">
          <UserInput
            {...getInputProps("email")}
            type="email"
            placeholder="이메일을 입력해주세요"
            error={errors?.email}
            touched={touched.email}
          />

          <UserInput
            {...getInputProps("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            error={errors?.password}
            touched={touched.password}
          />
        </div>

        <button
          type='button'
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full py-4 bg-[#FF007A] hover:bg-[#ff1a87] text-white rounded-xl font-bold shadow-lg shadow-[#FF007A]/20 disabled:bg-gray-700 disabled:text-gray-500 disabled:shadow-none transition-all cursor-pointer mb-4"
        >
          로그인
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="mx-4 text-gray-500 text-sm">또는</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <button
          type='button'
          onClick={handleGoogleLogin}
          className="w-full py-4 bg-[#2a2a2a] border border-white/10 hover:bg-[#333333] text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          구글 로그인
        </button>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            계정이 없으신가요?{' '}
            <button 
              onClick={() => navigate('/signup')} 
              className="text-[#FF007A] hover:underline font-medium"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Loginpage;