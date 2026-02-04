const DadosClinicos = ({ formData, setFormData }) => {
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
    <div className="mb-3 p-4 border rounded-3 bg-white ">
      <div className="mb-4">
        <label
          htmlFor="diagnostico_antropometrico"
          className="form-label text-muted small"
        >
          Diagnóstico Clínico:
        </label>
        <textarea
          className="form-control"
          placeholder=""
          name="diagnostico_clinico"
          style={{ height: "70px" }}
          value={formData.diagnostico_clinico || ""}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="diagnostico_antropometrico"
          className="form-label text-muted small"
        >
          Queixa Principal:
        </label>
        <textarea
          className="form-control"
          placeholder=""
          name="queixa_principal"
          style={{ height: "70px" }}
          value={formData.queixa_principal || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="diagnostico_antropometrico"
          className="form-label text-muted small"
        >
          Medicações em uso:
        </label>
        <textarea
          className="form-control"
          placeholder=""
          name="medicacoes_uso"
          style={{ height: "70px" }}
          value={formData.medicacoes_uso || ""}
          onChange={handleChange}
        ></textarea>
      </div>

      <label className="form-label text-muted small d-block">
        Ritmo Intestinal:
      </label>
      <div className="d-flex gap-3 mb-4">
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
        <div className="d-flex align-items-center gap-2 ms-3">
          <label className="text-muted small mb-0">Frequência:</label>
          <input
            type="text"
            name="frequencia_ritmo_intestinal"
            className="form-control form-control-sm"
            style={{ width: "140px" }}
            placeholder=""
            value={formData.frequencia_ritmo_intestinal || ""}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <label className="text-muted small mb-0">Consistência:</label>
          <input
            type="text"
            name="consistencia_ritmo_intestinal"
            className="form-control form-control-sm"
            style={{ width: "140px" }}
            placeholder=""
            value={formData.consistencia_ritmo_intestinal || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <label className="form-label text-muted small d-block">
        Escala de Bristol:
      </label>
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          name="escala_bristol"
          className="form-control form-control-sm"
          style={{ width: "200px" }}
          placeholder="Ex: Tipo 4"
          value={formData.escala_bristol || ""}
          onChange={handleChange}
        />
      </div>

      <label className="form-label text-muted small mb-2 d-block">
        Ritmo Urinário
      </label>

      <div className="d-flex flex-wrap gap-3 mb-4">
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

        <div className="d-flex align-items-center gap-2 ms-3">
          <label className="text-muted small mb-0">Ingestão Hídrica:</label>
          <input
            type="text"
            name="ingestao_hidrica"
            className="form-control form-control-sm"
            style={{ width: "140px" }}
            placeholder=""
            value={formData.ingestao_hidrica || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <label className="form-label text-muted small d-block">
        Nível de Hidratação:
      </label>
      <div className="d-flex gap-3 mb-4">
        <input
          type="text"
          name="nivel_hidratacao"
          className="form-control form-control-sm"
          style={{ width: "200px" }}
          placeholder="Ex: 1"
          value={formData.nivel_hidratacao || ""}
          onChange={handleChange}
        />
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
              <label className="form-check-label ms-1" htmlFor="odinofagia_sim">
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
              <label className="form-check-label ms-1" htmlFor="odinofagia_nao">
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
              <label className="form-check-label ms-1" htmlFor="dispepsia_sim">
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
              <label className="form-check-label ms-1" htmlFor="dispepsia_nao">
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

      <div className="d-flex align-items-center gap-2 mb-3">
        <label className="text-muted small mb-0">Cefaléia:</label>
        <input
          type="text"
          name="cefaleia"
          className="form-control form-control-sm"
          style={{ width: "140px" }}
          placeholder=""
          value={formData.cefaleia || ""}
          onChange={handleChange}
        />
      </div>

      <label className="form-label text-muted small d-block">Sono:</label>
      <div className="d-flex gap-3 mb-3">
        <div className="d-flex align-items-center gap-1 form-check">
          <input
            type="radio"
            name="sono"
            className="form-check-input"
            value="bom"
            id="sono_bom"
            checked={formData.sono === "bom"}
            onChange={handleChange}
            onClick={() => toggleBooleanField("sono", "bom")}
          />
          <label className="form-check-label ms-1" htmlFor="sono_bom">
            Bom
          </label>
        </div>

        <div className="d-flex align-items-center gap-1 form-check">
          <input
            type="radio"
            name="sono"
            value="mediano"
            className="form-check-input"
            id="sono_mediano"
            checked={formData.sono === "mediano"}
            onChange={handleChange}
            onClick={() => toggleBooleanField("sono", "mediano")}
          />
          <label className="form-check-label ms-1" htmlFor="sono_mediano">
            Mediano
          </label>
        </div>

        <div className="d-flex align-items-center gap-1 form-check">
          <input
            type="radio"
            name="sono"
            value="ruim"
            className="form-check-input"
            id="sono_ruim"
            checked={formData.sono === "ruim"}
            onChange={handleChange}
            onClick={() => toggleBooleanField("sono", "ruim")}
          />
          <label className="form check-label ms-1" htmlFor="sono_ruim">
            Ruim
          </label>
        </div>
        <div className="d-flex align-items-center gap-2 ms-3">
          <label className="text-muted small mb-0">Dorme:</label>
          <input
            type="time"
            name="horario_dorme"
            className="form-control form-control-sm"
            style={{ width: "140px" }}
            placeholder=""
            value={formData.horario_dorme || ""}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex align-items-center gap-2">
          <label className="text-muted small mb-0">Acorda:</label>
          <input
            type="time"
            name="horario_acorda"
            className="form-control form-control-sm"
            style={{ width: "140px" }}
            placeholder=""
            value={formData.horario_acorda || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="diagnostico_antropometrico"
          className="form-label text-muted small"
        >
          Outros:
        </label>
        <textarea
          className="form-control"
          placeholder=""
          name="outros_dados_clinicos"
          style={{ height: "70px" }}
          value={formData.outros_dados_clinicos || ""}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default DadosClinicos;
