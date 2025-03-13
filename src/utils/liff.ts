import liff from "@line/liff";

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID || ""; // ✅ 讀取環境變數

export async function initLiff() {
  try {
    if (!LIFF_ID) {
      console.error("❌ 錯誤：LIFF_ID 未設定！");
      return;
    }

    await liff.init({ liffId: LIFF_ID });

    console.log("✅ LIFF 初始化成功，登入狀態：", liff.isLoggedIn());

    await liff.ready; // ✅ 確保 LIFF 完全初始化

    if (!liff.isLoggedIn()) {
      console.warn("⚠️ 使用者未登入，導向登入...");
      liff.login();
      return;
    }
  } catch (error) {
    console.error("❌ LIFF 初始化失敗", error);
  }
}

export async function getProfile() {
  try {
    await liff.ready; // ✅ 確保 LIFF 完全初始化

    if (!liff.isLoggedIn()) {
      console.warn("⚠️ 使用者尚未登入，無法取得 Profile");
      return null;
    }

    const profile = await liff.getProfile();
    console.log("✅ 成功取得使用者資訊:", profile);

    return profile;
  } catch (error) {
    console.error("❌ 取得使用者資訊失敗:", error);
    return null;
  }
}
