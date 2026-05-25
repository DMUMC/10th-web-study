import { useState, type ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { QUERY_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";
import { useUpdateMyInfoMutation } from "../hooks/mutations/useMyInfoMutation";
import { ErrorState, LoadingState } from "../components/QueryStatus";
import type { RequestUpdateMyInfoDto } from "../types/auth";
import { postUploadImage } from "../apis/upload";

type ProfileForm = {
  name: string;
  bio: string;
  avatar: string;
  avatarFile?: File;
};

const MyPage = () => {
  const navigate = useNavigate();
  const { deleteAccount, isDeletingAccount } = useAuth();
  const updateMyInfoMutation = useUpdateMyInfoMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    bio: "",
    avatar: "",
  });
  const [fileError, setFileError] = useState("");

  const {
    data: myInfo,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.my],
    queryFn: getMyInfo,
    staleTime: 1000 * 60 * 5,
    select: (response) => response.data,
  });

  if (isLoading) {
    return <LoadingState message="내 정보를 불러오는 중입니다..." />;
  }

  if (isError || !myInfo) {
    return (
      <ErrorState
        message="내 정보를 불러오지 못했습니다."
        onRetry={() => refetch()}
      />
    );
  }

  const handleOpenEdit = () => {
    setForm({
      name: myInfo.name,
      bio: myInfo.bio ?? "",
      avatar: myInfo.avatar ?? "",
      avatarFile: undefined,
    });
    setFileError("");
    setIsEditOpen(true);
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("이미지 파일만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const avatar = reader.result;

      if (typeof avatar !== "string") return;

      setForm((prev) => ({
        ...prev,
        avatar,
        avatarFile: file,
      }));
      setFileError("");
    };

    reader.onerror = () => {
      setFileError("이미지를 읽지 못했습니다.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const name = form.name.trim();
    const bio = form.bio.trim();
    const avatar = form.avatarFile
      ? (await postUploadImage(form.avatarFile)).data.imageUrl
      : form.avatar.trim();

    if (!name) return;

    const payload: RequestUpdateMyInfoDto = {
      name,
      bio,
      avatar,
    };

    updateMyInfoMutation.mutate(payload);
    setIsEditOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setIsDeleteModalOpen(false);
      navigate("/login");
    } catch {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-3xl font-bold shadow-lg">
            {myInfo.avatar ? (
              <img
                src={myInfo.avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              myInfo.name.charAt(0).toUpperCase()
            )}
          </div>

          <h1 className="mt-5 text-2xl font-bold">My Page</h1>
          <p className="mt-1 text-sm text-gray-400">Your profile information</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">Nickname</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {myInfo.name}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">Email</p>
            <p className="mt-1 break-all text-lg font-semibold text-white">
              {myInfo.email}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-gray-400">Bio</p>
            <p className="mt-1 whitespace-pre-wrap text-base text-white">
              {myInfo.bio || "등록된 bio가 없습니다."}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleOpenEdit}
            className="rounded-2xl bg-purple-500 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-purple-600"
          >
            설정
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-2xl bg-green-500/80 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-500"
          >
            Home
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsDeleteModalOpen(true)}
          className="mt-3 w-full rounded-2xl border border-red-400/30 bg-red-500/10 py-3 text-base font-semibold text-red-200 transition-colors hover:bg-red-500/20"
        >
          탈퇴하기
        </button>
      </div>

      {isEditOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsEditOpen(false);
            }
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-gray-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">프로필 수정</h2>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                aria-label="모달 닫기"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-2xl text-gray-300 hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="text-sm font-semibold text-gray-200"
                >
                  이름
                </label>
                <input
                  id="profile-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-bio"
                  className="text-sm font-semibold text-gray-200"
                >
                  Bio
                </label>
                <textarea
                  id="profile-bio"
                  value={form.bio}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      bio: event.target.value,
                    }))
                  }
                  placeholder="비워두어도 저장할 수 있습니다."
                  className="mt-2 min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="profile-avatar"
                  className="text-sm font-semibold text-gray-200"
                >
                  프로필 사진
                </label>
                <input
                  id="profile-avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="mt-2 block w-full cursor-pointer rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-gray-300 file:mr-4 file:rounded-xl file:border-0 file:bg-purple-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-purple-600"
                />

                {fileError && (
                  <p className="mt-2 text-xs text-red-400">{fileError}</p>
                )}

                {form.avatar && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={form.avatar}
                      alt="프로필 미리보기"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 hover:bg-white/10"
              >
                취소
              </button>
              <button
                type="button"
                disabled={
                  form.name.trim().length === 0 ||
                  updateMyInfoMutation.isPending
                }
                onClick={handleSubmit}
                className="rounded-2xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-600 disabled:bg-gray-700 disabled:text-gray-400"
              >
                {updateMyInfoMutation.isPending ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsDeleteModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-gray-950 p-6 text-center text-white shadow-2xl">
            <h2 className="text-xl font-bold">정말 탈퇴하시겠습니까?</h2>
            <p className="mt-3 text-sm text-gray-400">
              예를 누르면 계정 탈퇴 API가 호출되고 로그인 페이지로 이동합니다.
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-2 text-sm font-semibold text-gray-300 hover:bg-white/10"
              >
                아니오
              </button>
              <button
                type="button"
                disabled={isDeletingAccount}
                onClick={handleDeleteAccount}
                className="rounded-2xl bg-red-500 px-5 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-400"
              >
                {isDeletingAccount ? "처리 중..." : "예"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
