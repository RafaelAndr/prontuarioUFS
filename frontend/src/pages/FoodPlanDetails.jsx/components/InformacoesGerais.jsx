import { Card } from "react-bootstrap";

const InformacoesGerais = ({ anamnese }) => {
  const formatarData = (data) => {
    if (!data) return "-";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div>
      <Card.Body>
        <Card.Title
          className="mb-4 border-bottom pb-2"
          style={{ fontFamily: "arial" }}
        >
          Informações Gerais:
        </Card.Title>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="info-item p-3 bg-light rounded-3 h-100">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-calendar-event text-secondary me-2"></i>
                <small
                  className="text-muted text-uppercase fw-semibold"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  Data da Consulta
                </small>
              </div>
              <div className="fw-semibold text-dark ms-2">
                {formatarData(anamnese.data_plano_alimentar) || (
                  <span className="text-muted">Não informado</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-item p-3 bg-light rounded-3 h-100">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-person-badge text-secondary me-2"></i>
                <small
                  className="text-muted text-uppercase fw-semibold"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  Nutricionista
                </small>
              </div>
              <div className="fw-semibold text-dark ms-2">
                {anamnese.nutricionista_responsavel || (
                  <span className="text-muted">Não informado</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-item p-3 bg-light rounded-3 h-100">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-clipboard-check text-secondary me-2"></i>
                <small
                  className="text-muted text-uppercase fw-semibold"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}
                >
                  Tipo do Registro
                </small>
              </div>
              <div className="fw-semibold text-dark ms-2">
                {anamnese.tipo_registro || (
                  <span className="text-muted">Não informado</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </div>
  );
};

export default InformacoesGerais;
