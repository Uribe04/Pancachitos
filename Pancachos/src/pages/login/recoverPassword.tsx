import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const navigate = useNavigate();
    navigate("/login");


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
        {/* Capa ligera para contraste */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start px-6 md:pl-16 py-10 md:py-0 w-full">
          {/* Card blanca */}
          <div className="bg-white rounded-2xl shadow-xl w-full sm:w-[380px] md:w-[420px] h-[380px] flex flex-col justify-between items-center text-center p-6 sm:p-8">
            
            {/* Logo y título */}
            <div className="flex flex-col items-center">
              <img
                src="/images/Logo ver 2.png"
                alt="Pancachitos Logo"
                className="w-24 sm:w-28 mb-3"
              />
              <h2 className="text-base sm:text-lg md:text-2xl font-bold text-black leading-tight tracking-wide">
                RECOVER PASSWORD
              </h2>
            </div>

            {/* Formulario */}
            <form className="w-full flex flex-col gap-4 text-left mt-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#69ADF1]"
              />

              <button
                type="submit"
                className="bg-[#69ADF1] hover:bg-[#4c95e5] text-white font-semibold py-2.5 rounded-full shadow-md transition-transform hover:scale-105 text-sm"
              >
                Send message
              </button>
            </form>

            {/* Texto informativo */}
            <p className="text-xs text-gray-400 mt-4">
              We will send you an email to reset your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
