import React, { useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import useForm from '../hooks/useForm'
import { vaildateSignin, type UserSigninInformation } from '../utils/validate'
import axios from 'axios'
import UserInput from '../components/UserInput'
import { postSignin } from '../apis/auth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { LOCAL_STORAGE_KEY } from '../constans/key'

const Loginpage = () => {

  const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)

    const navigate = useNavigate();
  const {values, errors, touched, getInputProps} =useForm<UserSigninInformation>({
    initialValue:{
        email:"",
        password:""
    },
    validate: vaildateSignin
  });

   const handleSubmit =async() => {
    console.log(values);
    try{
    const response = await postSignin(values);
    console.log(response);
    setItem(response.data.accessToken)
    }catch(error: any){
      alert(error?.message)
    }

   }

const isDisabled: boolean = 
  Object.values(errors || {}).some((error: string) => error.length > 0) || 
  Object.values(values).some((value: string) => value === "");

  return (
    <div className='flex items-center justify-center min-h-full w-full p-4'>
       <div className='w-full max-w-[400px] bg-white/5 backdrop=blur-sm border border-white/10 rounded-2xl p-10 shadow-2xl' >
        <div className="flex items-center mb-10 relative">
          <button
          type="button"
            onClick={() => navigate(-1)}
          className="absolute left-0 text-black hover:text-gray">{"<"}</button>
          <h1 className="w-full text-center text-2xl font-bold text-black">로그인</h1>
        </div>
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
        
       <button type='button' onClick={handleSubmit} disabled={isDisabled} className="w-full py-4 bg-indigo-600/80 hover:bg-indigo-600 text-black rounded-xl font-bold shadow-lg shadow-indigo-500/20 disabled:bg-gray-300 disabled:shadow-gray-500/20 transition-all cursor-pointer">
          로그인
        </button>
        </div>
    </div>
  )
}

export default Loginpage


