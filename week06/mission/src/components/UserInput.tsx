import React from 'react'


interface UserInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}
const UserInput = ({ error, touched, ...props}: UserInputProps) => {
  return (
    <div className="w-full mb-4">
      <input
        {...props}
        className={`w-full p-4 bg-white/5 border rounded-xl text-black placeholder:text-gray-500 focus:outline-none transition-all
          ${error && touched 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-black/10 focus:border-white/30 focus:bg-white/10'
          }`}
      />
      {error && touched && (
        <div className="text-red-500 text-sm mt-1 ml-1">{error}</div>
      )}
    </div>
  )
}

export default UserInput