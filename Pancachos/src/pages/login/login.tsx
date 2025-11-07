import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#69ADF1] px-6 sm:px-10">
      <div
        className="relative w-full max-w-[850px] md:max-w-[900px] h-auto md:h-[520px] rounded-2xl border-[6px] border-[#d5a84a] overflow-hidden flex items-center justify-center shadow-lg"
        style={{
          backgroundImage: `url('/images/bg login-register.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* capa ligera para contraste */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start px-6 md:pl-16 py-10 md:py-0 w-full">
          {/* Card blanca */}
          <div className="bg-white rounded-2xl shadow-xl w-full sm:w-[380px] md:w-[420px] h-[400px] flex flex-col justify-between items-center text-center p-6 sm:p-8">
            {/* Logo y título */}
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

            {/* Formulario */}
            <form className="w-full flex flex-col gap-3 text-left">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]"
              />

              <div className="text-right text-xs text-gray-500 hover:text-[#69ADF1] cursor-pointer">
                Forgot your password?
              </div>

              <button
                type="submit"
                className="bg-[#69ADF1] hover:bg-[#4c95e5] text-white font-semibold py-2.5 rounded-lg shadow-md transition-transform hover:scale-105 text-sm"
              >
                Log In
              </button>
            </form>

            {/* Parte inferior (social + sign up) */}
            <div className="flex flex-col items-center gap-3 mt-2">
              {/* Login con redes */}
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

              {/* Enlace de registro */}
              <p className="text-xs text-gray-600">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/Register")}
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



