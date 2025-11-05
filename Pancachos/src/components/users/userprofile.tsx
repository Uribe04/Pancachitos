import Navbar from "../layout/navbar";

function UserProfile() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-500 to-blue-600 px-8 py-8 flex flex-col items-center">
      {/* NAVBAR ARRIBA */}
      <div className="w-full max-w-6xl mb-8">
        <Navbar />
      </div>

      {/* Contenedor beige grande */}
      <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-[32px] shadow-2xl p-8 flex gap-8">
        {/* Columna izquierda: tarjeta de usuario */}
        <section className="w-1/3 bg-white rounded-[28px] shadow-md p-6 flex flex-col items-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <img
              src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
              alt="User avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <button className="absolute bottom-2 right-0 bg-[#CFA452] text-white rounded-full p-1 shadow-md text-xs">
              ✎
            </button>
          </div>

          {/* Nombre */}
          <h2 className="text-lg font-bold text-gray-800">Emma Torres</h2>
          <p className="text-sm text-gray-500 mb-6">(independent)</p>

          {/* Links */}
          <nav className="w-full flex flex-col gap-2 mb-10">
            <button className="text-left text-sm text-gray-700 hover:text-[#CFA452]">
              My favorites 💛
            </button>
            <button className="text-left text-sm text-gray-700 hover:text-[#CFA452]">
              My products
            </button>
            <button className="text-left text-sm text-gray-700 hover:text-[#CFA452]">
              Seller panel
            </button>
          </nav>

          {/* Botón logout abajo */}
          <div className="mt-auto w-full flex justify-end">
            <button className="flex items-center gap-2 bg-[#F4DFB3] text-[#9B7A35] text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#e9d298]">
              Log out ⏏
            </button>
          </div>
        </section>

        {/* Columna derecha: formulario de información personal */}
        <section className="flex-1 bg-white rounded-[28px] shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Personal information
          </h3>

          <form className="space-y-6">
            {/* Nombre y apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Name(s)
                </label>
                <input
                  type="text"
                  defaultValue="Emma"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CFA452]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  defaultValue="Torres"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CFA452]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email address
              </label>
              <input
                type="email"
                defaultValue="Emmatorres@gmail.com"
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CFA452]"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm text-gray-500 mb-1">Address</label>
              <input
                type="text"
                defaultValue="Calle 9 # 23-45"
                className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CFA452]"
              />
            </div>

            {/* Teléfono + Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  defaultValue="315 220 6098"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CFA452]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Ubication
                </label>
                <select className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm outline-none bg-white focus:ring-2 focus:ring-[#CFA452]">
                  <option>Ubication</option>
                  <option>North</option>
                  <option>Center</option>
                  <option>South</option>
                </select>
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-wrap justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-5 py-2 rounded-full border border-[#CFA452] text-[#CFA452] text-sm font-semibold hover:bg-[#f7edd5]"
              >
                Discard changes
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#CFA452] text-white text-sm font-semibold hover:bg-[#b88b3e]"
              >
                Save changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
