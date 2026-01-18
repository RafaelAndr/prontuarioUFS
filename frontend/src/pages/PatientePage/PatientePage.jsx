import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CadastrateAnamneseButton from "../../components/CadastrateAnamneseButton/CadastrateAnamneseButton";
import AnamneseList from "./AnamneseList";
import { Modal, Button, Dropdown } from "react-bootstrap";
import api from "../../services/api.js";

const PatientePage = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function ModalExcluir({ show, handleClose, handleConfirm }) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Tem certeza que deseja excluir este paciente?
          <br />
          <strong>
            Ao excluir um paciente, todos os registros associados a ele também
            serão excluidos.
          </strong>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function ModalSucesso({ show, handleClose }) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-success fw-semibold">
          Paciente excluído com sucesso!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchPatiente = async () => {
      try {
        const response = await api.get(`/pacientes/${id}`);
        setPaciente(response.data);
      } catch (error) {
        console.error("Erro ao buscar paciente:", error);
      }
    };

    fetchPatiente();
  }, [API_URL, id]);

  if (!paciente) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="text-muted mt-3">
            Carregando informações do paciente...
          </p>
        </div>
      </div>
    );
  }

  const calcularIdade = (data_nascimento) => {
    const hoje = new Date();
    const nascimento = new Date(data_nascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const formatarData = (data) => {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false); 

    try {
      await api.delete(`/pacientes/${selectedId}`);
      setShowSuccess(true); 
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || "Erro ao excluir paciente.";
      alert(errorMsg);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="bi bi-house-door me-1"></i>
              Início
            </a>
          </li>
          <li className="breadcrumb-item active">Paciente</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm rounded-3 mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
            <div
              className="bg-secondary bg-gradient text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{ width: 70, height: 70, fontSize: "1.5rem" }}
            >
              {paciente.nome
                ? paciente.nome
                    .split(" ")
                    .filter((word) => word.length > 1)
                    .slice(0, 2)
                    .map((word) => word[0].toUpperCase())
                    .join("")
                : "??"}
            </div>

            <div className="ms-3 flex-grow-1">
              <h4 className="mb-1 text-dark" style={{ fontFamily: "arial" }}>
                {paciente.nome}
              </h4>
              <div className="d-flex align-items-center text-muted">
                <small>{calcularIdade(paciente.data_nascimento)} anos</small>
                <span className="mx-2">•</span>
                <small>Paciente</small>
              </div>
            </div>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="border-0 p-0"
                id="dropdown-basic"
                style={{ boxShadow: "none" }}
              >
                <span style={{ fontSize: "22px", lineHeight: "0" }}>⋮</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => navigate(`/editar-paciente/${id}/`)}
                >
                  Editar
                </Dropdown.Item>

                <Dropdown.Item
                  className="text-danger"
                  onClick={() => handleOpenConfirm(id)}
                >
                  Excluir
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="d-flex align-items-start">
                <div>
                  <small className="text-muted d-block">Telefone</small>
                  <span className="fw-medium">{paciente.telefone || "-"}</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-start">
                <div>
                  <small className="text-muted d-block">
                    Data de Nascimento
                  </small>
                  <span className="fw-medium">
                    {formatarData(paciente.data_nascimento)}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-start">
                <i className="bi bi-geo-alt text-secondary me-2 mt-1"></i>
                <div>
                  <small className="text-muted d-block">Endereço</small>
                  <span className="fw-medium">{paciente.endereco || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CadastrateAnamneseButton pacienteId={id} />
      </div>

      <div className="mb-4">
        <AnamneseList />
      </div>

      <div className="d-flex justify-content-start mt-5">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClick}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Voltar
        </button>
      </div>

      <ModalExcluir
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleConfirmDelete}
      />

      <ModalSucesso show={showSuccess} handleClose={handleCloseSuccess} />
    </div>
  );
};

export default PatientePage;
