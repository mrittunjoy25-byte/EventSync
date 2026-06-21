import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/register', data);
      console.log('Register response', response.data);
      alert('Account created successfully. Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
      console.log("REGISTER ERROR:", error.response?.data);
      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl bg-slate-900/60 backdrop-blur-lg border border-cyan-500/20 p-10 shadow-xl">
      <h1 className="text-3xl font-semibold text-white">Student Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-white">Name</span>
          <input {...register('name')} className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white px-4 py-3" />
        </label>
        <label className="block">
          <span className="text-white">Email</span>
          <input type="email" {...register('email')} className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white px-4 py-3" />
        </label>
        <label className="block">
          <span className="text-white">Password</span>

          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="
        w-full
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-800/60
        text-white
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
        <label className="block">
          <span className="text-white">Department</span>
          <input {...register('department')} className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white px-4 py-3" />
        </label>
        <label className="block">
          <span className="text-white">Semester</span>
          <input {...register('semester')} className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white px-4 py-3" />
        </label>
        <label className="block">
          <span className="text-white">Phone</span>
          <input {...register('phone')} className="mt-2 w-full rounded-2xl border border-cyan-500/20 bg-slate-800/60 text-white px-4 py-3" />
        </label>
        <button type="submit" className="md:col-span-2 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-700 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
