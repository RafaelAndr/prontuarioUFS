import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import SocioEconomicosChild from "./components/SocioEconomicosChild";
import SaudeChild from "./components/SaudeChild";
import AntropometricaChild from "./components/AntropometricaChild";
import SinaisSintomasChild from "./components/SinaisSintomasChild";
import BioquimicaChild from "./components/BioquimicaChild";
import HistoriaAlimentarChild from "./components/HistoriaAlimentarChild";
import DiagnosticoConclusivoChild from "./components/DiagnosticoConclusivoChild";
import DadosIniciaisChild from "./components/DadosIniciaisChild";
import useFormPersistence from "../../hooks/useFormPersistence.js";

function ChildAnamneseForm() {
  const { pacienteId, anamneseId } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateSuccessModal, setUpdateShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { clearSaved } = useFormPersistence('childAnamneseForm_' + pacienteId, formData, setFormData);

  useEffect(() => {
    if (anamneseId) {
      fetch(`${API_URL}/child-anamneses/${anamneseId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((err) => console.error("Erro ao carregar anamnese:", err));
    }
  }, [anamneseId]);

  const handleClick = () => {
    navigate(`/pagina-paciente/${pacienteId}`);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = anamneseId
      ? `${API_URL}/child-anamneses/${anamneseId}`
      : `${API_URL}/child-anamneses/cadastrar`;

    const method = anamneseId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paciente_id: Number(pacienteId),
          tipo_registro: "Anamnese Infantil",
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar anamnese");

      clearSaved();

      if (method === "PUT") {
        setUpdateShowSuccessModal(true);
        return;
      }
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar anamnese.");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/pagina-paciente/${pacienteId}`);
  };

  const handleCloseUpdateModal = () => {
    setUpdateShowSuccessModal(false);
    navigate(`/pagina-paciente/${pacienteId}`);
  };


  return (
    <>
      <div className="container mt-0 border-none rounded bg-white">
        <form onSubmit={handleSubmit} className="pt-3 pb-3">
          <h3
            className="d-flex align-items-center"
            style={{ fontFamily: "arial" }}
          >
            <FaArrowLeft
              size={22}
              className="me-2"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            />

            {anamneseId
              ? "Editar Anamnese Infantil"
              : "Cadastro de Anamnese Infantil"}
          </h3>

          <p
            className="mt-4 mb-3 ms-1"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados Iniciais
          </p>
          <DadosIniciaisChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados Demográficos
          </h4>
          <SocioEconomicosChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados de Saúde
          </h4>
          <SaudeChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Avaliação Antropométrica
          </h4>
          <AntropometricaChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Sinais e Sintomas
          </h4>
          <SinaisSintomasChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Avaliação Bioquímica
          </h4>
          <BioquimicaChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            História Alimentar
          </h4>
          <HistoriaAlimentarChild formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Diagnóstico Conclusivo
          </h4>
          <DiagnosticoConclusivoChild
            formData={formData}
            setFormData={setFormData}
          />

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClick}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar
            </button>

            <button
              type="submit"
              className="btn btn-success rounded-pill px-4 fw-semibold"
            >
              {anamneseId ? "Atualizar Anamnese" : "Salvar Anamnese"}
            </button>
          </div>
        </form>
      </div>
      {showSuccessModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-5">
                <div className="mb-4">
                  <div
                    className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  </div>
                </div>

                <h4 className="text-success fw-bold mb-3">
                  Anamnese Cadastrada!
                </h4>
                <p className="text-muted mb-4">
                  O cadastro foi realizado com sucesso e já está disponível no
                  sistema.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleCloseModal}
                  >
                    Ir para Lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUpdateSuccessModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-5">
                <div className="mb-4">
                  <div
                    className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      fill="white"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>
                  </div>
                </div>

                <h4 className="text-success fw-bold mb-3">
                  Anamnese Atualizada!
                </h4>
                <p className="text-muted mb-4">
                  A atualização foi realizada com sucesso e já está disponível no
                  sistema.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleCloseUpdateModal}
                  >
                    Ir para Lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChildAnamneseForm;
