import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/signin" && pathname !== "/signup") {
      navigate("/signin");
    }
  }, [pathname]);

  return (
    <main className="h-screen w-screen bg-[#f1f5f9]">
      <section className="w-full h-full min-h-screen flex justify-center items-center">{children}</section>
    </main>
  );
};

export default AuthLayout;
