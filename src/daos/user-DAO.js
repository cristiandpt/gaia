import {
  collection,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

class UserDAO {
  constructor() {
    this.collectionRef = collection(db, "users");
  }

  getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null; // Return parsed user object or null
  };

  getTokenFromLocalStorage = () => {
    return localStorage.getItem("token"); // Return token or null
  };

  async getUserById(id) {
    await getDoc(doc(this.collectionRef, id))
      .then((userDoc) => {
        if (userDoc.exists()) {
          return { sucess: true, data: userDoc.data() };
        } else {
          return { sucess: false, data: null };
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  async createUser(userData) {
    await addDoc(this.collectionRef, userData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  async updateUser(id, userData) {
    const userRef = doc(this.collectionRef, id);
    await updateDoc(userRef, userData)
      .then(console.log("Document successfully updated!"))
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  }

  async deleteUser(id) {
    await deleteDoc(doc(this.collectionRef, id))
      .then(console.log("Document successfully deleted!"))
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  getUserData = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const photoUrl = localStorage.getItem("photoUrl");
    return {
      name,
      email,
      photoUrl,
    };
  };
}

export default new UserDAO();
