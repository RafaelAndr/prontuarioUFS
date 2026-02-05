import { Card } from "react-bootstrap";

const tableDetails = ({ anamnese }) => {
    const tipoLabels = {
      vinte_quatro_horas: "24 horas",
      habitual: "Habitual",
    };
  
  return (
    <div>
      <Card.Body>
          <div className="d-flex flex-column mb-3">
              <small className="text-muted d-block">
                Tipo do recordatório:
              </small>
              <span className="text-dark">
                {tipoLabels[anamnese.tipo_recordatorio] || "-"}
              </span>
          </div>
        <Card.Title
          className="mb-4 border-bottom pb-2"
          style={{ fontFamily: "arial" }}
        >
          Tabela de Recordatório Alimentar:
        </Card.Title>

        <div className="table-responsive">
          <table
            className="table align-middle mb-4"
            style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: "30%",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    fontWeight: "600",
                    color: "#6c757d",
                    paddingBottom: "16px",
                    border: "none",
                  }}
                >
                  REFEIÇÃO/HORÁRIO
                </th>
                <th
                  style={{
                    width: "35%",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    fontWeight: "600",
                    color: "#6c757d",
                    paddingBottom: "16px",
                    border: "none",
                  }}
                >
                  ALIMENTOS
                </th>
                <th
                  style={{
                    width: "35%",
                    fontSize: "12px",
                    letterSpacing: "0.5px",
                    fontWeight: "600",
                    color: "#6c757d",
                    paddingBottom: "16px",
                    border: "none",
                  }}
                >
                  QUANTIDADE/MEDIDA CASEIRA
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  refeicao: anamnese.refeicao_um,
                  alimentos: anamnese.alimentos_um,
                  quantidade: anamnese.quantidade_um,
                },
                {
                  refeicao: anamnese.refeicao_dois,
                  alimentos: anamnese.alimentos_dois,
                  quantidade: anamnese.quantidade_dois,
                },
                {
                  refeicao: anamnese.refeicao_tres,
                  alimentos: anamnese.alimentos_tres,
                  quantidade: anamnese.quantidade_tres,
                },
                {
                  refeicao: anamnese.refeicao_quatro,
                  alimentos: anamnese.alimentos_quatro,
                  quantidade: anamnese.quantidade_quatro,
                },
                {
                  refeicao: anamnese.refeicao_cinco,
                  alimentos: anamnese.alimentos_cinco,
                  quantidade: anamnese.quantidade_cinco,
                },
                {
                  refeicao: anamnese.refeicao_seis,
                  alimentos: anamnese.alimentos_seis,
                  quantidade: anamnese.quantidade_seis,
                },
              ].map((item, index) =>
                item.refeicao || item.alimentos || item.quantidade ? (
                  <tr
                    key={index}
                    style={{
                      background: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    }}
                  >
                    <td
                      style={{
                        padding: "16px",
                        verticalAlign: "top",
                        borderLeft: "3px solid #0d6efd",
                        borderTop: "1px solid #e9ecef",
                        borderBottom: "1px solid #e9ecef",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#2c3e50",
                          fontSize: "14px",
                        }}
                      >
                        {item.refeicao || (
                          <span className="text-muted fst-italic">-</span>
                        )}
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "16px",
                        verticalAlign: "top",
                        borderTop: "1px solid #e9ecef",
                        borderBottom: "1px solid #e9ecef",
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          lineHeight: "1.6",
                          color: "#495057",
                          fontSize: "14px",
                        }}
                      >
                        {item.alimentos || (
                          <span className="text-muted fst-italic">-</span>
                        )}
                      </div>
                    </td>

                    <td
                      style={{
                        padding: "16px",
                        verticalAlign: "top",
                        borderRight: "1px solid #e9ecef",
                        borderTop: "1px solid #e9ecef",
                        borderBottom: "1px solid #e9ecef",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      <div
                        style={{
                          whiteSpace: "pre-wrap",
                          lineHeight: "1.6",
                          color: "#495057",
                          fontSize: "14px",
                        }}
                      >
                         {item.quantidade || (
                          <span className="text-muted fst-italic">-</span>
                        )} 
                      </div>
                    </td>
                  </tr>
                ) : null,
              )}
            </tbody>
          </table>
        </div>


        <div className="row g-3 mb-4 ps-1">
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">
                Consumo Mensal:
              </small>
              <span className="fw-medium">
                {anamnese.quantidade_pessoas || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Açucar:</small>
              <span className="fw-medium">{anamnese.acucar || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Óleo:</small>
              <span className="fw-medium">{anamnese.oleo || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Margarina:</small>
              <span className="fw-medium">{anamnese.margarina || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Sal:</small>
              <span className="fw-medium">{anamnese.sal || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Temperos prontos:</small>
              <span className="fw-medium">{anamnese.temperos_prontos || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Outros:</small>
              <pre className="fw-medium">{anamnese.outros || "-"}</pre>
            </div>
          </div>
        </div>
      </Card.Body>
    </div>
  );
};

export default tableDetails;
