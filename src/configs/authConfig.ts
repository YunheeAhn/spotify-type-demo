// Spotify API 인증 관련 설정
// 클라이언트 ID와 시크릿 키를 환경 변수에서 가져옴
export const client_Id = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
export const client_Secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

//scope 전역변수
export const SCOPE = "user-read-private user-read-email playlist-read-private";
