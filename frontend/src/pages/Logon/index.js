import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./style.css";
import logoImg from "../../assets/logo.svg";
import herosImg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      const { name } = response.data;

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", name);

      history.push("/profile");
    } catch (error) {
      alert("Erro ao fazer Login, parece que sua ONG não está cadastrada!");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="logo be the heroes" />
        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={herosImg} alt="be the heroes" />
    </div>
  );
}
