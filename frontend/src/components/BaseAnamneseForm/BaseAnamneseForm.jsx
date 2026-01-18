import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import DadosSocioEconomicos from "./components/DadosSocioEconomicos.jsx";
import DadosSaude from "./components/DadosSaude.jsx";
import AvaliacaoAntropometrica from "./components/AvaliacaoAntropometrica.jsx";
import DadosBioimpedancia from "./components/DadosBioimpedancia.jsx";
import SinaisSintomasClinicos from "./components/SinaisSintomasClinicos.jsx";
import AvaliacaoBioquimica from "./components/AvaliacaoBioquimica.jsx";
import HistoriaAlimentar from "./components/HistoriaAlimentar.jsx";
import DadosIniciais from "./components/DadosIniciais.jsx";
import DiagnosticoConclusivo from "./components/DiagnosticoConclusivo.jsx";
import api from "../../services/api.js";
import useFormPersistence from "../../hooks/useFormPersistence.js";
import DraftModal from "./components/DraftModal.jsx";

function BaseAnamneseForm() {
  const { pacienteId, anamneseId } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateSuccessModal, setUpdateShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({});
  const formKey = 'baseAnamneseForm_' + pacienteId;
  const { clearSaved } = useFormPersistence(formKey, formData, setFormData, 24, !anamneseId);

  const [showDraftModal, setShowDraftModal] = useState(false);

  useEffect(() => {
    if (anamneseId) {
      api.get(`/base-anamneses/${anamneseId}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => console.error("Erro ao carregar anamnese:", err));
    }
  }, [anamneseId]);

  useEffect(() => {
    const savedDraft = localStorage.getItem(formKey);
    if (savedDraft && !anamneseId) {
      setShowDraftModal(true);
    }
  }, [pacienteId, anamneseId]);


  const handleClick = () => {
    navigate(`/pagina-paciente/${pacienteId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      paciente_id: Number(pacienteId),
      tipo_registro: "Anamnese Padrão",
      ...formData,
    };

    try {
      clearSaved();
      
      if (anamneseId) {
        await api.put(`/base-anamneses/${anamneseId}`, data);
        setUpdateShowSuccessModal(true);
      } else {
        await api.post('/base-anamneses/cadastrar', data);
        setShowSuccessModal(true);
      }
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

  const handleContinueDraft = () => {
    setShowDraftModal(false);
  };

  const handleDiscardDraft = () => {
    clearSaved();
    setFormData({});
    setShowDraftModal(false);
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

            {anamneseId ? "Editar Anamnese" : "Cadastro de Anamnese"}
          </h3>

          <p
            className="mt-4 mb-3 ms-1"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados Iniciais
          </p>
          <DadosIniciais formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados Demográficos
          </h4>
          <DadosSocioEconomicos formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados de Saúde
          </h4>
          <DadosSaude formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Avaliação Antropométrica
          </h4>
          <AvaliacaoAntropometrica
            formData={formData}
            setFormData={setFormData}
          />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Dados Bioimpedância
          </h4>
          <DadosBioimpedancia formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Sinais e Sintomas
          </h4>
          <SinaisSintomasClinicos
            formData={formData}
            setFormData={setFormData}
          />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Avaliação Bioquímica
          </h4>
          <AvaliacaoBioquimica formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            História Alimentar
          </h4>
          <HistoriaAlimentar formData={formData} setFormData={setFormData} />

          <h4
            className="mt-5 mb-3"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Diagnóstico Conclusivo
          </h4>
          <DiagnosticoConclusivo
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
      {showDraftModal && (
        <DraftModal
          onContinue={handleContinueDraft}
          onDiscard={handleDiscardDraft}
        />
      )}
    </>
  );
}

export default BaseAnamneseForm;
