import { Card } from "react-bootstrap";

const SintomasClinicosDetails = ({ anamnese }) => {
  const denticaoLabels = {
    natural_completa: "Natural (completa)",
    protese_completa: "Prótese (completa)",
    natural_parcial: "Natural (parcial)",
    protese_parcial: "Prótese (parcial)",
    edentulo: "Edêntulo",
  };

  const mastigacaoLabels = {
    normal: "Normal",
    comprometida: "Comprometida",
  };

  const ritmoInstestinalLabels = {
    normal: "Normal",
    diarreia: "Diarréia",
    obstipacao: "Obstipação",
  };

  const ritmoUrinarioLabels = {
    oliguria: "Oligúria",
    anuria: "Anúria",
    poliuria: "Poliúria",
    normal: "Normal",
  };

  return (
    <div>
      <Card.Body>
        <Card.Title
          className="mb-4 border-bottom pb-2"
          style={{ fontFamily: "arial" }}
        >
          Sinais e sintomas clínicos:
        </Card.Title>

        <div className="row g-3 mb-4 ps-1">
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Dentição:</small>
              <span className="fw-medium">
                {denticaoLabels[anamnese.denticao] || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Mastigação:</small>
              <span className="fw-medium">
                {mastigacaoLabels[anamnese.mastigacao] || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Disfagia:</small>
              <span className="fw-medium">
                {anamnese.disfagia === true
                  ? "Sim"
                  : anamnese.disfagia === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Odinofagia:</small>
              <span className="fw-medium">
                {anamnese.odinofagia === true
                  ? "Sim"
                  : anamnese.odinofagia === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Dispepsia:</small>
              <span className="fw-medium">
                {anamnese.dispepsia === true
                  ? "Sim"
                  : anamnese.dispepsia === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Náuseas:</small>
              <span className="fw-medium">
                {anamnese.nauseas === true
                  ? "Sim"
                  : anamnese.nauseas === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Vômitos:</small>
              <span className="fw-medium">
              {anamnese.vomitos === true
                  ? "Sim"
                  : anamnese.vomitos === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Flatulência:</small>
              <span className="fw-medium">
                {anamnese.flatulencia === true
                  ? "Sim"
                  : anamnese.flatulencia === false
                    ? "Não"
                    : "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Ritmo intestinal:</small>
              <span className="fw-medium">
                {ritmoInstestinalLabels[anamnese.ritmo_intestinal] || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Ritmo urinário:</small>
              <span className="fw-medium">
                {ritmoUrinarioLabels[anamnese.ritmo_urinario] || "-"}
              </span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Pele:</small>
              <span className="fw-medium">{anamnese.pele || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Unhas:</small>
              <span className="fw-medium">{anamnese.unhas || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Cabelo:</small>
              <span className="fw-medium">{anamnese.cabelo || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Mucosas:</small>
              <span className="fw-medium">{anamnese.mucosas || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Edema:</small>
              <span className="fw-medium">{anamnese.edemas || "-"}</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="flex-grow-1">
              <small className="text-muted d-block">Abdômem:</small>
              <span className="fw-medium">{anamnese.abdomen || "-"}</span>
            </div>
          </div>
        </div>
      </Card.Body>
    </div>
  );
};

export default SintomasClinicosDetails;
