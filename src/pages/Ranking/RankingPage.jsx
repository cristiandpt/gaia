import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const RankingPage = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const q = query(collection(db, "ranking"), orderBy("score", "desc"));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setRanking(users);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  const getMedal = (score) => {
    if (score > 300) return "Oro 🥇";
    if (score > 200) return "Plata 🥈";
    if (score > 100) return "Cobre 🥉";
    return "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ranking</h1>
      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>Puntaje</th>
            <th>Tiempo</th>
            <th>Medalla</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{user.time?.toDate().toLocaleString()}</td>
              <td>{getMedal(user.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingPage;
