import { useNavigate } from "react-router-dom";
import {useState } from "react";
import type { FormEvent} from "react";

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (newErrors.email || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Here you would typically make your API call
    navigate("/login");
  };

  // Keep your existing return statement but update the form section:
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#69ADF1] px-6 sm:px-10">
      {/* ...existing code... */}
      <div className="relative w-full max-w-[850px] md:max-w-[900px] h-auto md:h-[520px] rounded-2xl border-[6px] border-[#d5a84a] overflow-hidden flex items-center justify-center shadow-lg"
        style={{
          backgroundImage: `url('/images/bg login-register.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-end px-6 md:pr-16 py-10 md:py-0 w-full">
          <div className="bg-white rounded-2xl shadow-xl w-full sm:w-[380px] md:w-[420px] h-auto md:h-[440px] flex flex-col justify-between items-center text-center p-6 sm:p-8">
            <div className="flex flex-col items-center">
              <img src="/images/Logo ver 2.png" alt="Pancachitos Logo" className="w-24 sm:w-28 mb-3" />
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-black leading-tight tracking-wide">
                CREATE ACCOUNT
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 text-left">
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

              <div className="flex flex-col gap-1">
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#69ADF1] ${isSubmitting ? 'opacity-50' : 'hover:bg-[#4c95e5]'} text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform ${!isSubmitting && 'hover:scale-105'} text-sm`}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>

                {/* Parte inferior (social + login) */}
            <div className="flex flex-col items-center gap-3 mt-2">
              <span className="text-xs text-gray-500">Or Sign up with</span>

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
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#69ADF1] font-semibold cursor-pointer hover:underline"
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

        

