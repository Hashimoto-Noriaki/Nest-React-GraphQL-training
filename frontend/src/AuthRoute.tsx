import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

type Props = {
    children: ReactNode;
};

// 認証済みユーザー専用ルート
export const PrivateRoute = ({ children }: Props) => {
    const authInfo = useAuth();

    if (!authInfo.checked) {
        // 認証チェック中のローディング表示
        return <div>Loading...</div>;
    }

    if (!authInfo.isAuthenticated) {
        // 未認証の場合はサインインページへリダイレクト
        return <Navigate to="/signin" />;
    }

    // 認証済みの場合、子要素をレンダリング
    return <>{children}</>;
};

// ゲストユーザー専用ルート
export const GuestRoute = ({ children }: Props) => {
    const authInfo = useAuth();

    if (!authInfo.checked) {
        // 認証チェック中のローディング表示
        return <div>Loading...</div>;
    }

    if (authInfo.isAuthenticated) {
        // 認証済みの場合はトップページへリダイレクト
        return <Navigate to="/" />;
    }

    // 未認証の場合、子要素をレンダリング
    return <>{children}</>;
};
