import './App.css';
import Top from './components/Top';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute, GuestRoute } from './AuthRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* トップページは認証済みユーザーのみ */}
        <Route path="/" element={<PrivateRoute><Top /></PrivateRoute>} />

        {/* サインインページはゲスト専用 */}
        <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />

        {/* サインアップページはゲスト専用 */}
        <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />

        {/* 404 Not Found ページ */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
