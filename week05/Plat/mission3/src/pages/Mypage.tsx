import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { type ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
        <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-6 shadow-2xl">
          <p className="text-lg font-medium animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold shadow-lg">
            {data.data?.avatar ? (
              <img
                src={data.data.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              data.data?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <h1 className="mt-5 text-2xl font-bold">My Page</h1>
          <p className="mt-1 text-sm text-gray-400">Your profile information</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-sm text-gray-400">Nickname</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {data.data?.name}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-sm text-gray-400">Email</p>
            <p className="mt-1 text-lg font-semibold text-white break-all">
              {data.data?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 w-full rounded-2xl bg-red-500/80 hover:bg-red-500 transition-colors py-3 text-base font-semibold text-white shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyPage;