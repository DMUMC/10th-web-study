import React, { useEffect, useState, useRef } from 'react'
import { getMyInfo, patchMyInfo } from '../apis/auth'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const MyPage = () => {
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editBio, setEditBio] = useState("");
    const [previewImage, setPreviewImage] = useState(""); 
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const updateProfile = useMutation({
        mutationFn: patchMyInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myInfo"] });
            setIsEditing(false);
            getData(); 
        },
    });

    const getData = async () => {
        try {
            const response = await getMyInfo();
            const user = response.data;
            setData(user);
            setEditName(user.name || "");
            setEditBio(user.bio || "");
           setPreviewImage(user.avatar || "");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!accessToken) {
            navigate("/login", { replace: true });
            return;
        }
        getData();
    }, [accessToken]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
    updateProfile.mutate({
        name: editName,
        bio: editBio || undefined,
        avatar: previewImage || undefined, 
    });
};

    if (!data) return null;

    return (
        <div className="max-w-2xl mx-auto p-6 text-white">
            <h2 className="text-2xl font-bold mb-8">마이 페이지</h2>
            <div className="bg-[#0D0D0D] border border-gray-800 p-10 rounded-xl">
                <div className="flex items-center gap-8">
                    <div className="relative">
                        <div 
                            onClick={() => isEditing && fileInputRef.current?.click()}
                            className={`w-32 h-32 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700 ${isEditing ? 'cursor-pointer hover:opacity-70' : ''}`}
                        >
                            <img 
                               src={previewImage || undefined}
                                alt="profile" 
                                className="w-full h-full object-cover" 
                            />
                            {isEditing && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-bold">변경</div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>

                    <div className="flex-1 flex items-start gap-4">
                        <div className="flex-1 space-y-4">
                            {isEditing ? (
                                <div className="space-y-3">
                                    <input 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-xl font-bold outline-none focus:border-[#FF007A]"
                                    />
                                    <input 
                                        value={editBio}
                                        onChange={(e) => setEditBio(e.target.value)}
                                        className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-2 text-gray-400 outline-none focus:border-[#FF007A]"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-3xl font-bold">{data.name}</h3>
                                    <p className="text-gray-400 text-lg">{data.bio || "상태 메시지가 없습니다."}</p>
                                </>
                            )}
                            <p className="text-gray-500 text-sm">{data.email}</p>
                        </div>
                        <div className="pt-2 relative">
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className="text-2xl hover:text-[#FF007A] transition-colors"
                            >
                                {isEditing ? "✔" : "⚙️"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPage;