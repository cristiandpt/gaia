import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import useAuthStore from "../stores/use-auth-store";
import UserDAO from "../daos/user-DAO"; // Importa tu imagen aquí

const SignIn = () => {
  const { user, loginGoogleWithPopUp, logout, observeAuthState, loading } =
    useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      UserDAO.createUser(newUser);
      navigate("/Inicio");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (loading) {
    return <p className="loading-text">Cargando...</p>;
  }

  const handleNavigateToCreateAccount = () => {
    navigate("/no-authorized/register");
  };

  return (
    <div className="flex items-center justify-center [&amp;>div]:w-full">
      <div className="rounded-xl border bg-card text-card-foreground shadow bg-white w-80">
        <div className="flex flex-col pb-4 space-y-1">
          <h3 className="font-semibold tracking-tight text-2xl">
            Iniciar sesión
          </h3>
          <p className="text-sm text-muted-foreground">
            Ingrese sus credenciales.
          </p>
        </div>
        <div className="p-6 py-0 grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <button
              onClick={handleNavigateToCreateAccount}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Crear Cuenta
            </button>
          </div>
        </div>
        <div className="p-6 pt-0 grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <Link
              to="google-signin"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                ></path>
              </svg>
              Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
