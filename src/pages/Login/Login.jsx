import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* left graphic/branding */}
      <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
        <div className="text-center text-white p-8">
          <img src="/donezo.png" alt="Donezo" className="w-32 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mt-2">Manage your tasks and projects efficiently with Donezo dashboard.</p>
        </div>
      </div>
      {/* login form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl mb-6 text-center font-semibold">Sign in to Donezo</h2>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email required' })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password required' })}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;