import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import SocioEconomicosDetails from "./components/SocioEconomicosDetails.jsx";
import SaudeDetails from "./components/SaudeDetails.jsx";
import AntropometricaDetails from "./components/AntropometricaDetails.jsx";
import BioimpedanciaDetails from "./components/BioimpedanciaDetails.jsx";
import SintomasClinicosDetails from "./components/SintomasClinicosDetails.jsx";
import InformacoesGerais from "./components/InformacoesGerais.jsx";
import BioquimicaDetails from "./components/BioquimicaDetails.jsx";
import HistoriaAlimentarDetails from "./components/HistoriaAlimentarDetails.jsx";

const AnamnesesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [anamnese, setAnamnese] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleClick = () => {
    navigate(`/pagina-paciente/${anamnese.paciente_id}`);
  };

  useEffect(() => {
    const fetchAnamnese = async () => {
      try {
        const response = await fetch(`${API_URL}/base-anamneses/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar anamnese");
        const data = await response.json();
        setAnamnese(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnamnese();
  }, [id]);

  /* ===== SPINNER NO MESMO PADRÃO DO SearchResults ===== */
  if (loading) {
    return (
      <div className="container mt-4">
        <Card className="border-0 shadow-sm rounded-3">
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "2rem", height: "2rem" }}
            >
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted mb-0">Carregando Registro...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) return <p className="text-danger">Erro: {error}</p>;
  if (!anamnese) return <p>Registro não encontrado.</p>;

  return (
    <div className="container mt-4">
      <Card.Title
        className="mb-3 d-flex align-items-center"
        style={{ fontFamily: "arial", fontSize: "1.5rem" }}
      >
        <FaArrowLeft
          size={22}
          className="me-2"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
        Detalhes da Anamnese
      </Card.Title>

      <Card className="mb-3 border-0 shadow-sm rounded-3">
        <InformacoesGerais anamnese={anamnese} />
        <SocioEconomicosDetails anamnese={anamnese} />
        <SaudeDetails anamnese={anamnese} />
        <AntropometricaDetails anamnese={anamnese} />
        <BioimpedanciaDetails anamnese={anamnese} />
        <SintomasClinicosDetails anamnese={anamnese} />
        <BioquimicaDetails anamnese={anamnese} />
        <HistoriaAlimentarDetails anamnese={anamnese} />
      </Card>
    </div>
  );
};

export default AnamnesesDetails;
