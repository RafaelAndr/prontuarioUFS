import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import TableSchedule from "./components/TableSchedule.jsx";
import DadosIniciaisPlano from "./components/DadosIniciaisPlano.jsx";
import api from "../../services/api.js";
import useFormPersistence from "../../hooks/useFormPersistence.js";
import DraftModal from "../BaseAnamneseForm/components/DraftModal.jsx";

function FoodPlanForm() {
  const { pacienteId, anamneseId } = useParams();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateSuccessModal, setUpdateShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({});
  const formKey = 'foodPlanForm_' + pacienteId;
  const { clearSaved } = useFormPersistence(formKey, formData, setFormData, 24, !anamneseId);
  const [showDraftModal, setShowDraftModal] = useState(false);

  useEffect(() => {
    if (anamneseId) {
      api.get(`/food-plans/${anamneseId}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) =>
          console.error("Erro ao carregar plano alimentar:", err),
        );
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
      tipo_registro: "Plano Alimentar",
      ...formData,
    };

    try {
      clearSaved();
      
      if (anamneseId) {
        await api.put(`/food-plans/${anamneseId}`, data);
        setUpdateShowSuccessModal(true);
      } else {
        await api.post('/food-plans/cadastrar', data);
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

            {anamneseId
              ? "Editar Plano Alimentar"
              : "Cadastro de Plano Alimentar"}
          </h3>

          <p
            className="mt-4 mb-3 ms-1"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          ></p>
          <DadosIniciaisPlano formData={formData} setFormData={setFormData} />

          <p
            className="mt-5 mb-3 ms-1"
            style={{ fontFamily: "arial", fontSize: "1.4rem" }}
          >
            Tabela Alimentar
          </p>
          <TableSchedule formData={formData} setFormData={setFormData} />

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClick}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Voltar
            </button>

            <button type="submit" className="btn btn-success rounded-pill px-4 ">
              {anamneseId
                ? "Atualizar Plano Alimentar"
                : "Salvar Plano Alimentar"}
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
                  Plano Alimentar Cadastrado!
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
                  Plano Alimentar Atualizado!
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

export default FoodPlanForm;
