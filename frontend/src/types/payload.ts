export type Payload = {
    email: string;
    sub: number;
    iat:number;//Tokenが発行された日時
    exp:number;//Tokenの有効期限
}
