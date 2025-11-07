
import { useNavigate } from "react-router-dom";

export default function LoginSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#69ADF1]">

      <div
        className="relative w-[92%] max-w-[1100px] h-[560px] rounded-xl border-[6px] border-[#d5a84a] overflow-hidden"
        style={{
          backgroundImage: `url('/images/bg login-register.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
    
        <div className="relative z-10 h-full flex items-center justify-start pl-10 md:pl-20">
       
          <div className="bg-white rounded-2xl shadow-xl w-[400px] md:w-[480px] h-[420px] flex flex-col items-center justify-center text-center p-10">
    
            <img
              src="/images/Logo ver 2.png"
              alt="Pancachitos Logo"
              className="w-28 mb-5"
            />


            <h2 className="text-lg md:text-2xl font-bold text-black mb-8 leading-tight tracking-wide">
              CHOOSE <br /> WHICH USER <br /> WILL YOU BE
            </h2>


            <div className="flex justify-center gap-8">
              <button
                onClick={() => navigate("/register-client")}
                className="bg-[#f9eccc] hover:bg-[#f6e3b9] text-black font-semibold py-4 px-6 rounded-xl w-[150px] shadow-md hover:scale-105 transition-transform flex flex-col items-center gap-0"
              >

                <span className="text-sm mt-1">Particular</span>
                <span className="text-sm">Client</span>
              </button>

              <button
                onClick={() => navigate("/register-bakery")}
                className="bg-[#5ea6f2] hover:bg-[#4c95e5] text-white font-semibold py-4 px-6 rounded-xl w-[150px] shadow-md hover:scale-105 transition-transform flex flex-col items-center gap-0"
              >

                <span className="text-sm mt-1">Bakery</span>
                <span className="text-sm">Owner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
