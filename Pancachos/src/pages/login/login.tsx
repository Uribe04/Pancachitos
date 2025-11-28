import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/thunks/authThunks";
import { resetCartOnLogout } from "../../redux/slices/cartSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: '',
      password: '',
      general: ''
    };

    // Basic validation
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    // Limpiar carrito del usuario anterior
    dispatch(resetCartOnLogout());

    // Usar thunk de login con Supabase
    const result = await dispatch(loginUser({ 
      email: formData.email, 
      password: formData.password 
    }));

    if (result.meta.requestStatus === 'fulfilled') {
      // Login exitoso
      navigate("/");
    } else {
      // Login fallido
      setErrors({
        ...newErrors,
        general: (result.payload as string) || 'Invalid email or password'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#69ADF1] px-6 sm:px-10">
      <div className="relative w-full max-w-[850px] md:max-w-[900px] h-auto md:h-[520px] rounded-2xl border-[6px] border-[#d5a84a] overflow-hidden flex items-center justify-center shadow-lg"
        style={{
          backgroundImage: `url('/images/bg login-register.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start px-6 md:pl-16 py-10 md:py-0 w-full">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:w-[380px] md:w-[420px] h-[400px] flex flex-col justify-between items-center text-center p-6 sm:p-8">
            <div className="flex flex-col items-center">
              <img
                src="/images/Logo ver 2.png"
                alt="Pancachitos Logo"
                className="w-24 sm:w-28 mb-3"
              />
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-black leading-tight tracking-wide">
                LOG IN
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-left">
              {errors.general && (
                <div className="text-red-500 text-xs text-center">{errors.general}</div>
              )}
              
              <div className="flex flex-col gap-1">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
              </div>



              <button
                type="submit"
                disabled={loading}
                className={`bg-[#69ADF1] ${loading ? 'opacity-50' : 'hover:bg-[#4c95e5]'} text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform ${!loading && 'hover:scale-105'} text-sm`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="flex flex-col items-center gap-3 mt-2">
              <div className="flex items-center justify-center gap-3">
                <button className="border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <img
                    src="/images/icon-google.png"
                    alt="Google"
                    className="w-5 h-5 object-contain"
                  />
                </button>
                <button className="border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <img
                    src="/images/icon-facebook.png"
                    alt="Facebook"
                    className="w-5 h-5 object-contain"
                  />
                </button>
              </div>

              <p className="text-xs text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-[#69ADF1] font-semibold cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

