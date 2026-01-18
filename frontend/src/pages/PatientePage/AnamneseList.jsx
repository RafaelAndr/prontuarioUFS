import { useEffect, useState } from "react";
import { Modal, Button, Dropdown } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api.js";

const AnamneseList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [anamnesesBase, setAnamnesesBase] = useState([]);
  const [anamnesesChild, setAnamnesesChild] = useState([]);
  const [returnAnamnese, setReturnAnamnese] = useState([]);
  const [foodPlan, setFoodPlan] = useState([]);
  const [recordatory, setRecordatory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ModalExcluir = ({ show, handleClose, handleConfirm }) => (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Tem certeza que deseja excluir este registro?
        <br />
        <strong>Essa ação não pode ser desfeita.</strong>
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

  const ModalSucesso = ({ show, handleClose }) => (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sucesso</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-success fw-semibold">
        Registro excluído com sucesso!
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const detalhesRotas = {
    base: (id) => `/detalhes-anamnese/${id}`,
    child: (id) => `/detalhes-child-anamnese/${id}`,
    retorno: (id) => `/detalhes-return-anamnese/${id}`,
    plano: (id) => `/detalhes-food-plan/${id}`, 
    recordatorio: (id) => `/detalhes-recordatory/${id}`,
  };

  const editarRotas = {
    base: (pacienteId, anamneseId) =>
      `/base-anamnese/editar/${pacienteId}/${anamneseId}`,

    child: (pacienteId, anamneseId) =>
      `/child-anamnese/editar/${pacienteId}/${anamneseId}`,

    retorno: (pacienteId, anamneseId) =>
      `/anamnese-retorno/editar/${pacienteId}/${anamneseId}`,

    plano: (pacienteId, anamneseId) =>
      `/food-plan/editar/${pacienteId}/${anamneseId}`, 
    recordatorio: (pacienteId, anamneseId) =>
      `/recordatory/editar/${pacienteId}/${anamneseId}`,
  };

  const deleteEndpoints = {
    base: (id) => `/base-anamneses/${id}`,
    child: (id) => `/child-anamneses/${id}`,
    retorno: (id) => `/return-anamneses/${id}`,
    plano: (id) => `/food-plans/${id}`, 
    recordatorio: (id) => `/recordatorys/${id}`,
  };

  const handleOpenConfirm = (item) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);

    const { id: registroId, tipo } = selectedItem;

    const endpoint = deleteEndpoints[tipo]?.(registroId);
    if (!endpoint) return alert("Tipo não suportado para exclusão.");

    try {
      await api.delete(endpoint);

      if (tipo === "base")
        setAnamnesesBase((prev) => prev.filter((a) => a.id !== registroId));
      else if (tipo === "child")
        setAnamnesesChild((prev) => prev.filter((a) => a.id !== registroId));
      else if (tipo === "retorno")
        setReturnAnamnese((prev) => prev.filter((a) => a.id !== registroId));
      else if (tipo === "plano")
        setFoodPlan((prev) => prev.filter((a) => a.id !== registroId));
      else if (tipo === "recordatorio")
        setRecordatory((prev) => prev.filter((a) => a.id !== registroId));
        
      setShowSuccess(true);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Erro ao excluir.";
      alert(errorMsg);
    }
  };

  const handleGerarPdf = async (item) => {
    try {
      const response = await api.get(`/food-plans/${item.id}/pdf`, {
        responseType: "blob",
      });
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
      setTimeout(() => URL.revokeObjectURL(fileURL), 60000);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Verifique se você tem permissão.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [baseRes, childRes, returnRes, planRes, recordatoryRes] = await Promise.all([
          api.get(`/base-anamneses/paciente/${id}`),
          api.get(`/child-anamneses/paciente/${id}`),
          api.get(`/return-anamneses/paciente/${id}`),
          api.get(`/food-plans/paciente/${id}`),
          api.get(`/recordatorys/paciente/${id}`),
        ]);

        setAnamnesesBase(baseRes.data.map((d) => ({ ...d, tipo: "base" })));
        setAnamnesesChild(childRes.data.map((d) => ({ ...d, tipo: "child" })));
        setReturnAnamnese(returnRes.data.map((d) => ({ ...d, tipo: "retorno" })));
        setFoodPlan(planRes.data.map((d) => ({ ...d, tipo: "plano" })));
        setRecordatory(recordatoryRes.data.map((d) => ({ ...d, tipo: "recordatorio" })));
      } catch (err) {
        console.log(err);
        const errorMsg = err.response?.data?.message || err.message || "Erro ao carregar dados";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const formatarData = (data) => {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const todasAsAnamneses = [
    ...anamnesesBase,
    ...anamnesesChild,
    ...returnAnamnese,
    ...foodPlan,
    ...recordatory,
  ];

  return (
    <div className="container mt-4">
      {todasAsAnamneses.length > 0 && (
        <p
          className="fw-semibold text-secondary"
          style={{ marginLeft: "10px" }}
        >
          Registros encontrados
        </p>
      )}

      {todasAsAnamneses.length === 0 ? (
        <div className="text-muted fst-italic">Nenhum registro encontrado.</div>
      ) : (
        <div
          className="list-group border-0"
          style={{
            maxHeight: "400px",
            minHeight: "200px",
            overflowY: "auto",
            paddingRight: "6px",
          }}
        >
          {todasAsAnamneses.map((item) => (
            <div
              key={`${item.tipo}-${item.id}`}
              className="list-group-item border-0 shadow-sm mb-3 rounded-4 p-3 d-flex justify-content-between align-items-center"
              style={{ background: "#f8f9fa" }}
            >
              <div className="bg-light rounded-3 p-3 border-start border-primary border-4">
               <div className="row g-2">

                  {/* DATA */}
                  {(item.data_consulta || item.data_plano_alimentar) && (
                    <div className="col-md-12">
                      <small className="text-muted d-block">Data</small>
                      <span className="text-dark small">
                        {formatarData(item.data_consulta || item.data_plano_alimentar)}
                      </span>
                    </div>
                  )}

                  {/* NUTRICIONISTA */}
                  {item.nutricionista_responsavel && (
                    <div className="col-md-12">
                      <small className="text-muted d-block">Nutricionista</small>
                      <span className="text-dark small">
                        {item.nutricionista_responsavel}
                      </span>
                    </div>
                  )}

                  {/* TIPO */}
                  {item.tipo_registro && (
                    <div className="col-md-6">
                      <small className="text-muted d-block">Tipo</small>
                      <span className="text-dark small">
                        {item.tipo_registro}
                      </span>
                    </div>
                  )}

                </div>

              </div>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  size="sm"
                  className="border-0 p-0"
                >
                  <span style={{ fontSize: "22px", lineHeight: "0" }}>⋮</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      navigate(detalhesRotas[item.tipo](item.id), {
                        state: { id },
                      })
                    }
                  >
                    Ver detalhes
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() =>
                      navigate(editarRotas[item.tipo](id, item.id))
                    }
                  >
                    Editar
                  </Dropdown.Item>

                  {item.tipo === "plano" && (
                    <Dropdown.Item
                      onClick={() => handleGerarPdf(item)}
                    >
                      Gerar PDF
                    </Dropdown.Item>
                  )}

                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleOpenConfirm(item)}
                  >
                    Excluir
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ))}
        </div>
      )}

      <ModalExcluir
        show={showConfirm}
        handleClose={() => setShowConfirm(false)}
        handleConfirm={handleConfirmDelete}
      />
      <ModalSucesso
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default AnamneseList;
