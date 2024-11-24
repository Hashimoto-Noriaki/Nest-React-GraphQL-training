export type Payload = {
    email: string
    sub: string
    iat: number//iatはトークンが作成された時刻
    exp: number//トークンの有効期限
};
