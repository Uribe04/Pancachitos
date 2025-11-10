import { useNavigate } from "react-router-dom";

export default function LoginSelect() {
  const navigate = useNavigate();

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
        {/* Capa de contraste */}
        <div className="absolute inset-0 bg-black/30 md:bg-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 md:gap-0 px-4 sm:px-8 md:pl-16 py-10 md:py-0 w-full">
          {/* Card blanca */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[380px] sm:max-w-[400px] md:w-[420px] h-auto md:h-[400px] flex flex-col items-center justify-center text-center p-6 sm:p-8">
            <img
              src="/images/Logo ver 2.png"
              alt="Pancachitos Logo"
              className="w-20 sm:w-24 md:w-28 mb-4 sm:mb-5"
            />

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-6 sm:mb-8 leading-tight tracking-wide">
              CHOOSE <br /> WHICH USER <br /> WILL YOU BE
            </h2>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 w-full">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#f9eccc] hover:bg-[#f6e3b9] text-black font-semibold py-3 sm:py-4 px-6 rounded-xl w-full sm:w-[150px] shadow-md hover:scale-105 transition-transform flex flex-col items-center gap-0"
              >
                <span className="text-sm sm:text-base mt-1">Particular</span>
                <span className="text-sm sm:text-base">Client</span>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="bg-[#5ea6f2] hover:bg-[#4c95e5] text-white font-semibold py-3 sm:py-4 px-6 rounded-xl w-full sm:w-[150px] shadow-md hover:scale-105 transition-transform flex flex-col items-center gap-0"
              >
                <span className="text-sm sm:text-base mt-1">Bakery</span>
                <span className="text-sm sm:text-base">Owner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



