//プライベートページ用のルート
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

type Props = {
    children:ReactNode;
}

export const PrivateRoute = ({children}:Props) => {
    const authInfo = useAuth();//カスタムフックのuseAuthを呼び出す
    if(!authInfo.checked){
        return <div>Loading...</div>; // 認証チェック中の表示
    }

    if(authInfo.authenticated){
        return <>{children}</>; // 認証済みの場合、子コンポーネントを表示 true
    }

    return <Navigate to='/signin' /> // 認証されていない場合、サインインページへリダイレクト
}

//ゲストページ用のルート
export const GuestRoute = ({children}:Props) => {
    const authInfo = useAuth();//カスタムフックのuseAuthを呼び出す
    if(!authInfo.checked){
        return <div>Loading...</div>; // 認証チェック中の表示
    }

    if(authInfo.authenticated){
        return <Navigate to='/'/>; // 認証済みの場合、子コンポーネントを表示 true
    }

    return <>{children}</>; // 認証されていない場合、子コンポーネントを表示
}
