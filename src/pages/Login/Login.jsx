import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiEye, FiEyeOff, FiMail, FiLock, FiCheckCircle, FiCopy, FiZap } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Donezo from '../../assets/donezo.png'

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleDemoLogin = async () => {
    const demoEmail = "user1@example.com";
    const demoPass = "password123";

    setValue('email', demoEmail);
    setValue('password', demoPass);
    setValue('terms', true);

    await processLogin({ email: demoEmail, password: demoPass });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: 'success',
      title: `${type} copied!`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    });
  };


  const processLogin = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password',
        confirmButtonColor: '#1B5E3F',
        background: '#fff',
      });
    }
  };

  const onSubmit = (data) => {
    processLogin(data)
  };

  return (
    <div className="min-h-screen flex bg-[#f0f4f2] font-sans overflow-hidden">
      {/* Left side */}
      <div className="hidden lg:flex w-[45%] bg-[linear-gradient(195deg,#2fa875_0%,#1B5E3F_35%,#113425_100%)] items-center justify-center relative h-screen">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>

        <div className="text-center bg-[#] text-white p-12 relative z-10 flex flex-col items-center justify-center h-full">
          <div className="inline-block bg-linear-to-br from-green-50 to-green-100 p-4 bg-white/10 backdrop-blur-xl rounded-[32px] mb-8 border border-white/20">
            <img src={Donezo} alt="Donezo" className="w-20" />
          </div>
          <h2 className="text-6xl font-black tracking-tighter mb-6">Donezo.</h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-md mx-auto font-medium"> Elevate your productivity with our intuitive and powerful project management dashboard.</p>
          <div className="mt-12 flex items-center justify-center gap-6 text-white/50">

            <div className="flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"><FiCheckCircle /> <span>Fast</span> </div>
            <div className="flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"> <FiCheckCircle /> <span>Secure</span> </div>
            <div className="flex items-center gap-2 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"><FiCheckCircle /> <span>Reliable</span> </div>
          </div>
        </div>
      </div>

      {/* Right side  */}
      <div className=" flex-1 justify-center items-center p-8 md:p-12 h-screen overflow-y-auto bg-transparent">
        <div className=" ">
          <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-gray-100">
            <div className="mb-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Sign In</h2>
              <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-100 flex flex-col gap-2">
                <p className="text-[12px] font-bold text-[#1B5E3F] uppercase tracking-widest mb-1">Demo Access</p>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-600">user1@example.com</span>
                  <button type="button" onClick={() => copyToClipboard('user1@example.com', 'Email')} className="text-gray-400 cursor-pointer hover:text-[#1B5E3F]"><FiCopy /></button>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-100">
                  <span className="text-sm text-gray-600">password123</span>
                  <button type="button" onClick={() => copyToClipboard('password123', 'Password')} className="text-gray-400 cursor-pointer hover:text-[#1B5E3F]"><FiCopy /></button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col h-[90px]">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-1">Email Address</label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E3F]" size={20} />
                  <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Enter your email" className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#1B5E3F]" />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1 ml-2 font-bold">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col h-[90px]">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-1">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E3F]" size={20} />
                  <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required' })} placeholder="Enter your password" className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#1B5E3F]" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B5E3F]">
                    {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[11px] mt-1 ml-2 font-bold">{errors.password.message}</p>}
              </div>

              {/* Checkbox */}
              <div className="flex flex-col h-[50px] justify-center">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3  group">
                    <input type="checkbox" {...register('terms', { required: 'Please accept terms to continue' })} className="w-4 h-4 rounded cursor-pointer border-gray-300 accent-[#1B5E3F]" />
                  </label>
                  <span className="text-xs text-gray-500 font-medium group-hover:text-gray-700">I accept the Terms and Conditions</span>
                </div>
                {errors.terms && <p className="text-red-500 text-[10px] ml-7 font-bold">{errors.terms.message}</p>}
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button type="submit" className="w-full cursor-pointer bg-[#1B5E3F] hover:bg-[#14442E] text-white py-3.5 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98]">
                  Sign In
                </button>
                <button type="button" onClick={handleDemoLogin} className="w-full cursor-pointer bg-white border-2 border-[#1B5E3F] text-[#1B5E3F] py-3.5 rounded-2xl font-bold hover:bg-green-50 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                  <FiZap className="fill-current" /> Fast Demo Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;