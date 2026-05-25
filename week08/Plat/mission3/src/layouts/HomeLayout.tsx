import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import FloatingButton from "../components/FloatingButton";
import LpFormModal, { type LpFormValues } from "../components/lp/LpFormModal";
import { useAuth } from "../context/AuthContext";
import { useCreateLpMutation } from "../hooks/mutations/useLpMutations";
import { postUploadImage } from "../apis/upload";
import { useSidebar } from "../hooks/useSidebar";

export default function HomeLayout() {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const createLpMutation = useCreateLpMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {
    close: closeSidebar,
    isOpen: isSidebarOpen,
    toggle: toggleSidebar,
  } = useSidebar();

  const handleOpenCreateModal = () => {
    if (!accessToken) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      return;
    }

    setIsCreateModalOpen(true);
  };

  const handleCreateLp = async (values: LpFormValues) => {
    const thumbnail = values.imageFile
      ? (await postUploadImage(values.imageFile)).data.imageUrl
      : values.thumbnail;

    await createLpMutation.mutateAsync({
      title: values.title,
      content: values.content,
      thumbnail,
      tags: values.tags,
      published: values.published,
    });
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <Header onMenuClick={toggleSidebar} />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="사이드바 외부 영역 닫기"
          onClick={closeSidebar}
          className="fixed inset-0 top-[73px] z-30 bg-black/60 md:hidden"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <main
        className={`
          min-h-[calc(100dvh-73px)] px-4 py-8 transition-all duration-300 md:px-8
          ${isSidebarOpen ? "md:ml-64" : "md:ml-0"}
        `}
      >
        <Outlet />
      </main>

      <FloatingButton onClick={handleOpenCreateModal} />

      {isCreateModalOpen && (
        <LpFormModal
          isOpen={isCreateModalOpen}
          title="LP 작성"
          submitLabel="Add LP"
          isSubmitting={createLpMutation.isPending}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateLp}
        />
      )}

      <Footer />
    </div>
  );
}
