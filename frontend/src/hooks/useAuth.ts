//ここではBEから受け取ったJWTが存在するか、有効期限が切れていないかを確認
import { useState,useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
    const [authInfo,setAuthInfo] = useState<{
        checked:boolean;//認証の処理が済んでいるか
        isAuthenticated:boolean;//認証されているか
    }>({checked: false, isAuthenticated: false});//初期値

    useEffect(()=> {
        const token = localStorage.getItem('token');
        try {
            if(token){
                const decodedToke = jwtDecode<payload>(token);
                if(decodedToken.exp * 1000 < Data.now()){//トークンの有効期限が切れていないか
                    localStotage.removeItem('token');
                    setAuthInfo({checked: true, isAuthenticated: false});
                } else {//トークンの有効期限が切れていない場合
                    setAuthInfo({checked:true,isAuthenticated: true});
                }
            } else {//トークンが存在しない場合
                setAuthInfo({checked:true, isAuthenticated:false});
            }
        } catch (error){
            setAuthInfo({checkerd:true, isAuthenticated:false});//エラーが発生した場合
        }
    },[]);
    return authInfo;
}