import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../services/api.js";

function PatienteForm() {
  const { pacienteId } = useParams();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessUpdateModal, setShowSuccessUpdateModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const formatTelefone = (value) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return null;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleClick = () => {
    pacienteId ? navigate(`/pagina-paciente/${pacienteId}`) : navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "telefone") {
      formattedValue = formatTelefone(value);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.data_nascimento) {
      newErrors.data_nascimento = "Data de nascimento é obrigatória";
    } else if (!formData.nome) {
      newErrors.nome = "Data de nascimento é obrigatória";
    }
    else {
      const idade = calcularIdade(formData.data_nascimento);
      if (idade < 0) {
        newErrors.data_nascimento = "Data de nascimento inválida";
      }
    }

    if (formData.telefone) {
      const numbers = formData.telefone.replace(/\D/g, "");
      if (numbers.length < 10) {
        newErrors.telefone = "Telefone incompleto";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  useEffect(() => {
    if (pacienteId) {
      api.get(`/pacientes/${pacienteId}`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => console.error("Erro ao carregar paciente:", err));
    }
  }, [pacienteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      let data;
      
      if (pacienteId) {
        const response = await api.put(`/pacientes/${pacienteId}`, formData);
        data = response.data;
        setShowSuccessUpdateModal(true);
      } else {
        const response = await api.post('/pacientes/cadastrar', formData);
        data = response.data;
        setShowSuccessModal(true);
      }

      console.log("Paciente cadastrado:", data);

      setFormData({
        nome: "",
        data_nascimento: "",
        telefone: "",
        endereco: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      const errorMsg = error.response?.data?.message || "Erro ao cadastrar paciente. Por favor, tente novamente.";
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const idade = calcularIdade(formData.data_nascimento);

  return (
    <>
      <div className="container mt-4 bg-white" style={{ maxWidth: "80%" }}>
        <div className="card shadow-sm border-0 rounded p-4 bg-white">
          <div className="d-flex align-items-center mb-4">
            <div className="bg-white rounded-circle p-2 me-2">
              <i className="bi bi-person-circle fs-2 text-dark"></i>
            </div>
            <h4 className="mb-0 text-dark" style={{ fontFamily: "arial" }}>
              {pacienteId ? "Editar Paciente" : "Cadastro de Paciente"}
            </h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label text-muted small">
                  Nome
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${errors.nome ? "is-invalid" : ""}`}
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  style={{width:"300px"}}
                  placeholder=""
                  required
                />
                {errors.nome && (
                  <div className="invalid-feedback">{errors.nome}</div>
                )}
              </div>
              <div className="col-md-6 mb-4">
                <label className="form-label text-muted small">Endereço</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  style={{width:"300px"}}
                  placeholder=""
                />
              </div>

              

              <div className="col-md-6">
                <label className="form-label text-muted small">Telefone</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${errors.telefone ? "is-invalid" : ""}`}
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(79) 99999-9999"
                  maxLength="15"
                  style={{width:"125px"}}
                />
                {errors.telefone && (
                  <div className="invalid-feedback">{errors.telefone}</div>
                )}
              </div>

             <div className="col-md-6">
                <label className="form-label text-muted small">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className={`form-control form-control-sm ${errors.data_nascimento ? "is-invalid" : ""}`}
                  name="data_nascimento"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                  style={{width:"125px"}}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
                {idade !== null && idade >= 0 && (
                  <small className="text-muted">
                    {idade} {idade === 1 ? "ano" : "anos"}
                  </small>
                )}
                {errors.data_nascimento && (
                  <div className="invalid-feedback">
                    {errors.data_nascimento}
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
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
                className="btn btn-success px-4 fw-semibold"
              >
                <i className="bi bi-check-lg me-2"></i>
                {pacienteId ? "Atualizar Paciente" : "Salvar Paciente"}
              </button>
            </div>
          </form>
        </div>
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
                  Paciente Cadastrado!
                </h4>
                <p className="text-muted mb-4">
                  O cadastro foi realizado com sucesso e já está disponível no
                  sistema.
                </p>

                <div className="d-flex gap-3 justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setShowSuccessModal(false)}
                  >
                    Cadastrar Outro
                  </button>
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

      {showSuccessUpdateModal && (
        <div className="modal show d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-body text-center p-5">
                <h4 className="text-success fw-bold mb-3">
                  Paciente Atualizado!
                </h4>
                <p className="text-muted mb-4">
                  Os dados do paciente foram atualizados com sucesso.
                </p>

                <button
                  className="btn btn-primary px-4"
                  onClick={() => navigate(`/pagina-paciente/${pacienteId}`)}
                >
                  Ver Prontuário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleCloseErrorModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-sm">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title mb-0">Erro</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseErrorModal}
                ></button>
              </div>

              <div className="modal-body text-center">
                <p className="fw-semibold text-danger mb-2">
                  Erro ao cadastrar
                </p>
                <small className="text-muted">{errorMessage}</small>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger px-4"
                  onClick={handleCloseErrorModal}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PatienteForm;
