import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../layout/navbar";
import {
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
} from "../../utils/localStorage";

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (!storedUser) {
      alert("You must log in first.");
      navigate("/login");
    } else {
      setUser(storedUser);
      setEditData(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    removeCurrentUser();
    alert("You have been logged out.");
    navigate("/login");
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditData(user);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditData(user);
  };

  const handleEditChange = (field: string, value: string) => {
    setEditData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditSave = () => {
    updateCurrentUser(editData);
    setUser(editData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  // Cambiar imagen de perfil
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateCurrentUser({ profileImage: base64String });
        setUser((prev: any) => ({ ...prev, profileImage: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-linear-to-r from-[#2971B9] to-[#69ADF1] min-h-screen w-full px-4 py-6 md:py-8 flex flex-col items-center">
      {/* Navbar */}
      <div className="w-full max-w-6xl mb-6 md:mb-8">
        <Navbar />
      </div>

      {/* Contenedor principal */}
  <div className="w-full max-w-6xl bg-[#F4DFB3] rounded-4xl shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Columna izquierda */}
        <section className="w-full md:w-1/3 bg-white rounded-[28px] shadow-md p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={user.profileImage || "/images/user-default.png"} // 🔥 aquí usa tu imagen del public
              alt="User avatar"
              className="w-28 md:w-32 h-28 md:h-32 rounded-full object-cover border border-gray-300"
            />
            <label className="absolute bottom-2 right-0 bg-[#CFA452] text-white rounded-full p-2 shadow-md text-xs cursor-pointer">
              ✎
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <h2 className="text-base md:text-lg font-bold text-gray-800 text-center">
            {user.email?.split("@")[0] || "User"}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mb-6 text-center">
            {user.bakeryName || (user.type === "bakery" ? "Bakery" : "Client")}
          </p>

          {/* Navegación */}
          <nav className="w-full flex flex-col gap-2 mb-10">
            <NavLink
              to="/favourite"
              className="text-left text-xs md:text-sm text-gray-700 hover:text-[#CFA452]"
            >
              My favorites
            </NavLink>
            {user.type === "bakery" && (
              <>
                <NavLink
                  to="/myproducts"
                  className="text-left text-xs md:text-sm text-gray-700 hover:text-[#CFA452]"
                >
                  My products
                </NavLink>
              </>
            )}
          </nav>

          <div className="mt-auto w-full flex justify-end">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#CFA452] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#b8934a]"
            >
              Log out
            </button>
          </div>
        </section>

        {/* Columna derecha */}
        <section className="w-full md:flex-1 bg-white rounded-[28px] shadow-md p-6 flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Profile Information</h3>
            {!isEditing && (
              <button
                onClick={handleEditStart}
                className="w-full md:w-auto bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600"
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <input
                  type="email"
                  value={editData?.email || ""}
                  onChange={(e) => handleEditChange("email", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CFA452]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Password</label>
                <div className="flex gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={editData?.password || ""}
                    onChange={(e) => handleEditChange("password", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CFA452]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {editData?.type === "bakery" && (
                <div>
                  <label className="text-sm text-gray-500">Bakery Name</label>
                  <input
                    type="text"
                    value={editData?.bakeryName || ""}
                    onChange={(e) => handleEditChange("bakeryName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#CFA452]"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleEditSave}
                  className="flex-1 bg-sky-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600"
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  className="flex-1 bg-[#CFA452] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#b8934a]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="pb-3 border-b border-gray-200">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-semibold text-gray-800">{user?.email}</p>
              </div>

              <div className="pb-3 border-b border-gray-200">
                <p className="text-sm text-gray-500">Password</p>
                <div className="flex justify-between items-center">
                  <p className="text-base font-semibold text-gray-800">
                    {showPassword ? user?.password : "•••••••••"}
                  </p>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-[#CFA452] hover:text-[#b8934a] font-semibold"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {user?.type === "bakery" && user?.bakeryName && (
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Bakery Name</p>
                  <p className="text-base font-semibold text-gray-800">{user?.bakeryName}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
