const SinaisSintomasClinicos = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (type === "checkbox" && !Array.isArray(formData[name])) {
      return setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }

    if (type === "radio" && (value === "true" || value === "false")) {
      return setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
    }

    if (type === "number") {
      const numericValue = value === "" ? null : Number(value);
      return setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }

    if (type === "date") {
      return setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleBooleanField = (fieldName, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName] === newValue ? null : newValue,
    }));
  };

  return (
    <>
      <div className="mb-4 p-3 border rounded bg-white shadow-sm">
        <label className="form-label text-muted small mb-2 d-block">
          Dentição:
        </label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex gap-1 align-items-center">
            <input
              className="form-check-input"
              type="radio"
              name="denticao"
              value="natural_completa"
              id="natural_completa"
              checked={formData.denticao === "natural_completa"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("denticao", "natural_completa")}
            />
            <label className="form-check-label ms-1" htmlFor="natural_completa">
              Natural Completa
            </label>
          </div>
          <div className="d-flex align-items-center gap-1 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="denticao"
              value="protese_completa"
              id="protese_completa"
              checked={formData.denticao === "protese_completa"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("denticao", "protese_completa")}
            />
            <label className="form-check-label ms-1" htmlFor="protese_completa">
              Prótese completa
            </label>
          </div>
          <div className="d-flex align-items-center gap-1 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="denticao"
              value="natural_parcial"
              id="natural_parcial"
              checked={formData.denticao === "natural_parcial"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("denticao", "natural_parcial")}
            />
            <label className="form-check-label ms-1" htmlFor="natural_parcial">
              Natural parcial
            </label>
          </div>
          <div className="d-flex align-items-center gap-1 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="denticao"
              value="protese_parcial"
              id="protese_parcial"
              checked={formData.denticao === "protese_parcial"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("denticao", "protese_parcial")}
            />
            <label className="form-check-label ms-1" htmlFor="protese_parcial">
              Prótese parcial
            </label>
          </div>

          <div className="d-flex align-items-center gap-1 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="denticao"
              value="edentulo"
              id="edentulo"
              checked={formData.denticao === "edentulo"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("denticao", "edentulo")}
            />
            <label className="form-check-label ms-1" htmlFor="edentulo">
              Edêntulo
            </label>
          </div>
        </div>
        <label className="form-label text-muted small mb-2 d-block">
          Mastigação:
        </label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="d-flex align-items-center gap-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              name="mastigacao"
              value="comprometida"
              id="comprometida"
              checked={formData.mastigacao === "comprometida"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("mastigacao", "comprometida")}
            />
            <label htmlFor="comprometida">Comprometida</label>
          </div>
          <div className="d-flex align-items-center gap-1 form-check">
            <input
              type="radio"
              className="form-check-input"
              name="mastigacao"
              value="normal"
              checked={formData.mastigacao === "normal"}
              onChange={handleChange}
              id="mastigacao_normal"
              onClick={() => toggleBooleanField("mastigacao", "normal")}
            />
            <label
              htmlFor="mastigacao_normal"
              className="form-check-label ms-1"
            >
              Normal
            </label>
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label text-muted small">Disfagia:</label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="disfagia"
                  value="true"
                  checked={formData.disfagia === true}
                  onChange={handleChange}
                  id="disfagia_sim"
                  onClick={() => toggleBooleanField("disfagia", true)}
                />
                <label className="form-check-label ms-1" htmlFor="disfagia_sim">
                  Sim
                </label>
              </div>

              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="disfagia"
                  value="false"
                  id="disfagia_nao"
                  checked={formData.disfagia === false}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("disfagia", false)}
                />
                <label className="form-check-label ms-1" htmlFor="disfagia_nao">
                  Não
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label text-muted small">Odinofagia</label>
            <div className="d-flex gap-3">
              <div className="d-flex form-check gap-1 align-items-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="odinofagia"
                  value="true"
                  checked={formData.odinofagia === true}
                  onChange={handleChange}
                  id="odinofagia_sim"
                  onClick={() => toggleBooleanField("odinofagia", true)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="odinofagia_sim"
                >
                  Sim
                </label>
              </div>

              <div className="d-flex form-check gap-1 align-items-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="odinofagia"
                  value="false"
                  checked={formData.odinofagia === false}
                  onChange={handleChange}
                  id="odinofagia_nao"
                  onClick={() => toggleBooleanField("odinofagia", false)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="odinofagia_nao"
                >
                  Não
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label text-muted small">Dispepsia</label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="dispepsia"
                  value="true"
                  id="dispepsia_sim"
                  checked={formData.dispepsia === true}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("dispepsia", true)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="dispepsia_sim"
                >
                  Sim
                </label>
              </div>

              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="dispepsia"
                  value="false"
                  id="dispepsia_nao"
                  checked={formData.dispepsia === false}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("dispepsia", false)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="dispepsia_nao"
                >
                  Não
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mt-0 mb-3">
          <div className="col-md-4">
            <label className="form-label text-muted small">Náuseas</label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nauseas"
                  value="true"
                  id="nauseas_sim"
                  checked={formData.nauseas === true}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("nauseas", true)}
                />
                <label className="form-check-label ms-1" htmlFor="nauseas_sim">
                  Sim
                </label>
              </div>

              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="nauseas"
                  value="false"
                  id="nauseas_nao"
                  checked={formData.nauseas === false}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("nauseas", false)}
                />
                <label className="form-check-label ms-1" htmlFor="nauseas_nao">
                  Não
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label text-muted small">Vômitos</label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="vomitos"
                  value="true"
                  id="vomitos_sim"
                  checked={formData.vomitos === true}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("vomitos", true)}
                />
                <label className="form-check-label ms-1" htmlFor="vomitos_sim">
                  Sim
                </label>
              </div>

              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="vomitos"
                  value="false"
                  id="vomitos_nao"
                  checked={formData.vomitos === false}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("vomitos", false)}
                />
                <label className="form-check-label ms-1" htmlFor="vomitos_nao">
                  Não
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label text-muted small">Flatulência</label>
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flatulencia"
                  value="true"
                  id="flatulencia_sim"
                  checked={formData.flatulencia === true}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("flatulencia", true)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="flatulencia_sim"
                >
                  Sim
                </label>
              </div>

              <div className="d-flex align-items-center gap-1 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flatulencia"
                  value="false"
                  id="flatulencia_nao"
                  checked={formData.flatulencia === false}
                  onChange={handleChange}
                  onClick={() => toggleBooleanField("flatulencia", false)}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="flatulencia_nao"
                >
                  Não
                </label>
              </div>
            </div>
          </div>
        </div>

        <label className="form-label text-muted small d-block">
          Ritmo Intestinal:
        </label>
        <div className="d-flex gap-3 mb-3">
          <div className="d-flex align-items-center gap-1 form-check">
            <input
              type="radio"
              name="ritmo_intestinal"
              className="form-check-input"
              value="normal"
              id="ritmo_normal"
              checked={formData.ritmo_intestinal === "normal"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_intestinal", "normal")}
            />
            <label className="form-check-label ms-1" htmlFor="ritmo_normal">
              Normal
            </label>
          </div>

          <div className="d-flex align-items-center gap-1 form-check">
            <input
              type="radio"
              name="ritmo_intestinal"
              value="diarreia"
              className="form-check-input"
              id="ritmo_diarreia"
              checked={formData.ritmo_intestinal === "diarreia"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_intestinal", "diarreia")}
            />
            <label className="form-check-label ms-1" htmlFor="ritmo_diarreia">
              Diarréia
            </label>
          </div>

          <div className="d-flex align-items-center gap-1 form-check">
            <input
              type="radio"
              name="ritmo_intestinal"
              value="obstipacao"
              className="form-check-input"
              id="ritmo_obstipacao"
              checked={formData.ritmo_intestinal === "obstipacao"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_intestinal", "obstipacao")}
            />
            <label className="form check-label ms-1" htmlFor="ritmo_obstipacao">
              Obstipação
            </label>
          </div>
        </div>

        <label className="form-label text-muted small mb-2 d-block">
            Escala de Bristol:
          </label>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <input
              type="text"
              name="escala_bristol"
              className="form-control"
              style={{ width: "200px" }}
              placeholder="Ex: Tipo 4"
              value={formData.escala_bristol || ""}
              onChange={handleChange}
            />
          </div>

        <label className="form-label text-muted small mb-2 d-block">
          Ritmo Urinário
        </label>

        <div className="d-flex flex-wrap gap-4 mb-3">
          <div className="form-check d-flex align-items-center gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="ritmo_urinario"
              id="oliguria"
              value="oliguria"
              checked={formData.ritmo_urinario === "oliguria"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_urinario", "oliguria")}
            />
            <label className="form-check-label ms-1" htmlFor="oliguria">
              Oligúria
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="ritmo_urinario"
              id="anuria"
              value="anuria"
              checked={formData.ritmo_urinario === "anuria"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_urinario", "anuria")}
            />
            <label className="form-check-label ms-1" htmlFor="anuria">
              Anúria
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="ritmo_urinario"
              id="poliuria"
              value="poliuria"
              checked={formData.ritmo_urinario === "poliuria"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_urinario", "poliuria")}
            />
            <label className="form-check-label ms-1" htmlFor="poliuria">
              Poliúria
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-1">
            <input
              className="form-check-input"
              type="radio"
              name="ritmo_urinario"
              id="normal"
              value="normal"
              checked={formData.ritmo_urinario === "normal"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ritmo_urinario", "normal")}
            />
            <label className="form-check-label ms-1" htmlFor="normal">
              Normal
            </label>
          </div>
        </div>

        <label className="form-label text-muted small mb-2 d-block">
          Nível de Hidratação:
        </label>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <input
            type="text"
            name="nivel_hidratacao"
            className="form-control"
            style={{ width: "200px" }}
            placeholder="Ex: 1"
            value={formData.nivel_hidratacao || ""}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-wrap gap-4">
          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Pele</label>
            <input
              type="text"
              name="pele"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Ex: íntegra"
              value={formData.pele || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Unhas</label>
            <input
              type="text"
              name="unhas"
              className="form-control"
              placeholder="Ex: normais"
              style={{ width: "300px" }}
              value={formData.unhas || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Cabelo</label>
            <input
              type="text"
              name="cabelo"
              className="form-control"
              placeholder="Ex: forte"
              style={{ width: "300px" }}
              value={formData.cabelo || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-4 mt-3">
          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Mucosas</label>
            <input
              type="text"
              name="mucosas"
              style={{ width: "300px" }}
              className="form-control"
              placeholder="Ex: úmidas"
              value={formData.mucosas || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Edemas</label>
            <input
              type="text"
              name="edemas"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Ex: ausentes"
              value={formData.edemas || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex flex-column">
            <label className="form-label text-muted small">Abdômen:</label>
            <input
              type="text"
              name="abdomen"
              className="form-control"
              style={{ width: "300px" }}
              placeholder="Ex: plano"
              value={formData.abdomen || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SinaisSintomasClinicos;
