import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../types/payload"; // トークンのデコード結果の型定義

// カスタムフック: ユーザーの認証状態を管理
export const UseAuth = () => {
    // 認証情報の状態を管理
    // checked: 認証チェックが完了したかを示すフラグ
    // isAuthenticated: 認証されているかを示すフラグ
    const [authInfo, setAuthInfo] = useState<{
        checked: boolean;
        isAuthenticated: boolean;
    }>({
        checked: false, // 初期状態では認証チェックは未完了
        isAuthenticated: false, // 初期状態では未認証
    });

    // コンポーネントのマウント時に認証状態を確認
    useEffect(() => {
        // ローカルストレージからトークンを取得
        const token = localStorage.getItem("token");
        try {
            // トークンが存在する場合
            if (token) {
                // トークンをデコードして中身を確認
                const decodedToken = jwtDecode<Payload>(token);
                // トークンの有効期限(exp)が現在時刻を過ぎているかチェック
                if (decodedToken.exp * 1000 < Date.now()) {
                    // 有効期限切れの場合はトークンを削除し、未認証状態をセット
                    localStorage.removeItem("token");
                    setAuthInfo({ checked: true, isAuthenticated: false });
                } else {
                    // 有効なトークンの場合は認証済み状態をセット
                    setAuthInfo({ checked: true, isAuthenticated: true });
                }
            } else {
                // トークンが存在しない場合は未認証状態をセット
                setAuthInfo({ checked: true, isAuthenticated: false });
            }
        } catch (error) {
            // トークンの解析中にエラーが発生した場合（例: 不正なトークン）
            // 未認証状態をセット
            setAuthInfo({ checked: true, isAuthenticated: false });
        }
    }, []); // 空の依存配列で初回マウント時のみ実行

    // 現在の認証状態を返却
    return authInfo;
};
