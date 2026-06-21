import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      const user = response.data;
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Login error', error);
      const message = error.response?.data?.message || 'Login failed';
      alert(message);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-slate-900/60 backdrop-blur-lg border border-cyan-500/20 p-10 shadow-lg">
      <h1 className="text-4xl font-bold text-center text-cyan-300 drop-shadow-lg">
        Welcome Back 🚀
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <label className="block">
          <span className="text-white">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white placeholder:text-slate-400 px-4 py-3"
          />        </label>
        <label className="block">
  <span className="text-white">Password</span>

  <div className="relative mt-2">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your password"
      {...register('password', { required: true })}
      className="
        w-full
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-800/60
        text-white
        placeholder:text-slate-400
        px-4
        py-3
        pr-12
      "
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-cyan-400
        hover:text-cyan-300
        hover:drop-shadow-[0_0_8px_#22d3ee]
        transition-all
        duration-300
      "
    >
      {showPassword ? (
        <EyeSlashIcon className="h-5 w-5" />
      ) : (
        <EyeIcon className="h-5 w-5" />
      )}
    </button>
  </div>
</label>
          <button type="submit" className="
w-full
rounded-full
bg-gradient-to-r
from-cyan-500
via-blue-600
to-purple-600
px-6
py-3
text-white
font-semibold
shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300
hover:scale-105
hover:shadow-cyan-500/30
transition-all
duration-300
">Login</button>
      </form>
    </div>
    
  );
};

export default Login;
