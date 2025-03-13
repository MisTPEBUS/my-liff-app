"use client"; // ✅ 這是 Client Component

import { useEffect, useState } from "react";
import { initLiff, getProfile } from "../utils/liff";

export default function ProfileClient() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      await initLiff(); // ✅ 先初始化 LIFF
      const userProfile = await getProfile();

      if (userProfile) {
        setProfile(userProfile);
      }
      setLoading(false); // ✅ 避免畫面閃爍
    }

    fetchProfile();
  }, []);

  if (loading) {
    return <p>載入中...</p>; // ✅ 讓畫面不會突然閃爍
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">LIFF 使用者資訊</h1>
      {profile ? (
        <div className="mt-4">
          <img
            src={profile.pictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <p className="text-lg">姓名: {profile.displayName}</p>
          <p>用戶 ID: {profile.userId}</p>
        </div>
      ) : (
        <p>⚠️ 無法取得使用者資訊，請確保你已登入並授權！</p>
      )}
    </div>
  );
}
