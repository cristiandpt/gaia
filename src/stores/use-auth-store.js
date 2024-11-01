import { create } from "zustand";
import {
        GoogleAuthProvider,
        onAuthStateChanged,
        signInWithPopup,
        signOut,
      } from "firebase/auth";
      
import { auth } from "../../firebase.config";
      
const provider = new GoogleAuthProvider();
     
const useAuthStore = create((set) => ({
        user: null,
        loading: true,
      
      
        loginGoogleWithPopUp: async () => {
			(await signInWithPopup(auth, provider)).then((data) => {
	        console.log(data);  
          })
          .catch((error) => {
            console.log(error);
          });
        },
      
        logout: async () => {
          await signOut(auth)
				.then(() => {
					console.log("User signed out");
					localStorage.removeItem('name');
					localStorage.removeItem('email');
					localStorage.removeItem('photoUrl');
					localStorage.removeItem('accessToken');
                 set({ user: null });
            })
            .catch((error) => {
              console.log(error);
            });
        },
      
        observeAuthState: () => {
          set({ loading: true });
          onAuthStateChanged(auth, (user) => {
              if (user) {
				  localStorage.setItem('name',     user.displayName); // Save user name
				  localStorage.setItem('email',    user.email);
				  localStorage.setItem('photoUrl', user.photoURL);
				  localStorage.setItem('token',    user.accessToken); // Save token
              set({ user, loading: false });
            } else {
              set({ user: null, loading: false });
            }
          });
        },
      }));


      
      export default useAuthStore;
      
