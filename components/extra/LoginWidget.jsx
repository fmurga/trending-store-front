import React from 'react';
import User from '../icons/User';

const LoginWidget = () => {
  return (
    <button className="px-4 py-2 border-0 rounded-2xl bg-purple-600 font-bold text-white hover:text-white hover:bg-purple-500 ">
    <div className="flex felx-row justify-between text-center items-center">
      <User />
      <p>Login</p>
    </div>
  </button>
  )
}

export default LoginWidget