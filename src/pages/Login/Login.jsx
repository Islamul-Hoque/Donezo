// import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate('/', { replace: true });
//     }
//   }, [user, navigate]);

//   const onSubmit = async (data) => {
//     try {
//       await login(data.email, data.password);
//       navigate('/');
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* left graphic/branding */}
//       <div className="hidden md:flex w-1/2 bg-green-600 items-center justify-center">
//         <div className="text-center text-white p-8">
//           <img src="/donezo.png" alt="Donezo" className="w-32 mx-auto mb-4" />
//           <h2 className="text-3xl font-bold">Welcome Back!</h2>
//           <p className="mt-2">Manage your tasks and projects efficiently with Donezo dashboard.</p>
//         </div>
//       </div>
//       {/* login form */}
//       <div className="flex-1 flex items-center justify-center bg-gray-100">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-white p-8 rounded shadow-md w-full max-w-md"
//         >
//           <h2 className="text-2xl mb-6 text-center font-semibold">Sign in to Donezo</h2>
//           <div className="mb-4">
//             <label className="block mb-1">Email</label>
//             <input
//               type="email"
//               {...register('email', { required: 'Email required' })}
//               className="w-full p-2 border rounded"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>
//           <div className="mb-6">
//             <label className="block mb-1">Password</label>
//             <input
//               type="password"
//               {...register('password', { required: 'Password required' })}
//               className="w-full p-2 border rounded"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FiEye, FiEyeOff, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import Swal from 'sweetalert2'; 

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
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
        text: err.message || 'Invalid email or password',
        confirmButtonColor: '#1B5E3F', 
        background: '#fff',
        customClass: {
          popup: 'rounded-[24px]',
          confirmButton: 'rounded-xl px-8 py-3'
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f0f4f2] font-sans overflow-hidden">
      {/* Left side */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#2D7A4D] via-[#1B5E3F] to-[#14442E] items-center justify-center relative h-screen">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>
        
        <div className="text-center text-white p-12 relative z-10 flex flex-col items-center justify-center h-full">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-xl rounded-[32px] mb-8 border border-white/20">
            <img src="/donezo.png" alt="Donezo" className="w-20" />
          </div>
          <h2 className="text-6xl font-black tracking-tighter mb-6">Donezo.</h2>
          <p className="text-xl text-white/70 leading-relaxed max-w-md mx-auto font-medium">
            Elevate your productivity with our intuitive and powerful project management dashboard.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-white/50">
            <div className="flex items-center gap-2"><FiCheckCircle /> <span>Fast</span></div>
            <div className="flex items-center gap-2"><FiCheckCircle /> <span>Secure</span></div>
            <div className="flex items-center gap-2"><FiCheckCircle /> <span>Reliable</span></div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-6 h-screen bg-transparent">
        <div className="w-full max-w-[440px]">
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Sign In</h2>
              <p className="text-gray-400 mt-3 font-medium">Welcome back! Please enter your details.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="flex flex-col h-[95px]">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-2">Email Address</label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E3F]" size={20} />
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/5 focus:border-[#1B5E3F] transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1 ml-2 font-bold">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col h-[95px]">
                <label className="text-sm font-bold text-gray-700 ml-1 mb-2">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1B5E3F]" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-green-500/5 focus:border-[#1B5E3F] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B5E3F] transition-colors"
                  >
                    {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[11px] mt-1 ml-2 font-bold">{errors.password.message}</p>}
              </div>

              {/* Checkbox */}
              <div className="flex flex-col h-[50px] justify-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('terms', { required: 'Please accept terms' })}
                    className="w-5 h-5 rounded border-gray-300 transition-all cursor-pointer accent-[#1B5E3F]"
                  />
                  <span className="text-sm text-gray-500 font-medium group-hover:text-gray-700">
                    I accept the <span className="text-[#1B5E3F] font-bold">Terms and Conditions</span>
                  </span>
                </label>
                {errors.terms && <p className="text-red-500 text-[10px] ml-8 font-bold">{errors.terms.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B5E3F] hover:bg-[#14442E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-900/10 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;