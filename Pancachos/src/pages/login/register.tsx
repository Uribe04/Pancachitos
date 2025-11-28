import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser, signIn } from "../../redux/thunks/authThunks";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    bakery_name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    bakery_name: "",
    general: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      bakery_name: "",
      general: "",
    };

    // Validaciones
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.bakery_name) {
      newErrors.bakery_name = "Bakery name is required";
    }

    if (
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword ||
      newErrors.bakery_name
    ) {
      setErrors(newErrors);
      return;
    }

    // Usar thunk de registro con Supabase
    const result = await dispatch(registerUser({
      email: formData.email,
      password: formData.password,
      bakery_name: formData.bakery_name,
    }));

    await signIn(formData.email, formData.password);

    if (result.meta.requestStatus === 'fulfilled') {
      // Registro exitoso
      navigate("/login");
    } else {
      // Registro fallido
      setErrors({
        ...newErrors,
        general: (result.payload as string) || 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#69ADF1] px-4 sm:px-6 md:px-10 py-8">
      <div
        className="relative w-full max-w-[850px] md:max-w-[900px] h-auto md:h-[520px] rounded-2xl border-[6px] border-[#d5a84a] overflow-hidden flex flex-col md:flex-row items-center justify-center shadow-lg"
        style={{
  backgroundImage: `url('/images/bg login-register.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}

      >
        <div className="absolute inset-0 bg-black/30 md:bg-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-end w-full px-4 sm:px-8 md:pr-16 py-10 md:py-0">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[380px] sm:max-w-[400px] md:w-[420px] h-auto flex flex-col justify-between items-center text-center p-6 sm:p-8">
            <div className="flex flex-col items-center">
              <img
                src="/images/Logo ver 2.png"
                alt="Pancachitos Logo"
                className="w-20 sm:w-24 md:w-28 mb-3"
              />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black leading-tight tracking-wide">
                CREATE ACCOUNT
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3 text-left mt-4 sm:mt-6"
            >
              {errors.general && (
                <div className="text-red-500 text-xs text-center">
                  {errors.general}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              {/* 🔹 Campo de nombre de panadería */}
              <div className="flex flex-col gap-1">
                <input
                  name="bakery_name"
                  type="text"
                  value={formData.bakery_name}
                  onChange={handleChange}
                  placeholder="Bakery name"
                  className={`w-full border ${
                    errors.bakery_name ? "border-red-500" : "border-gray-300"
                  } rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]`}
                />
                {errors.bakery_name && (
                  <span className="text-red-500 text-xs">
                    {errors.bakery_name}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#69ADF1] ${
                  loading ? "opacity-50" : "hover:bg-[#4c95e5]"
                } text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform ${
                  !loading && "hover:scale-105"
                } text-sm mt-2`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-xs sm:text-sm text-gray-600 mt-4">
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
  );
}