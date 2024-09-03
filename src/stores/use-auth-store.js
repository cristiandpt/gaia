import { create } from 'zustand';
import { auth } from '../../firebase.config';
import { create } from "zustand";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    user: null,
    loading: true
}
))