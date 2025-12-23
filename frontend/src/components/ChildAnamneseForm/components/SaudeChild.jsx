const SaudeChild = ({ formData, setFormData }) => {
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
        <div className=" mb-3">
          <label
            htmlFor="diagnostico_antropometrico"
            className="form-label text-muted small"
          >
            Queixa Principal/ Objetivo da consulta
          </label>
          <textarea
            className="form-control"
            placeholder="Descreva a queixa principal..."
            id="objetivo_consulta"
            name="objetivo_consulta"
            style={{ height: "150px" }}
            value={formData.objetivo_consulta || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label
            htmlFor="diagnostico_antropometrico"
            className="form-label text-muted small"
          >
            História da Doença (Queixa) Atual
          </label>
          <textarea
            className="form-control"
            placeholder="Descreva a evolução da doença, sintomas, início, intensidade..."
            id="historia_doenca"
            name="historia_doenca"
            style={{ height: "150px" }}
            value={formData.historia_doenca || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="diagnostico_antropometrico"
            className="form-label text-muted small"
          >
            História da Gestação, parto e amamentação
          </label>
          <textarea
            className="form-control"
            placeholder="Descreva a história da gestação"
            id="historia_gestacao"
            name="historia_gestacao"
            style={{ height: "150px" }}
            value={formData.historia_gestacao || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <table className="table table-hover align-middle mb-4">
          <thead className="table-secondary">
            <tr>
              <th style={{ width: "45%" }}>Patologia</th>
              <th className="text-center">HMA</th>
              <th className="text-center">HF</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Diabetes</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="diabetes_hma"
                  checked={formData.diabetes_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="diabetes_hf"
                  checked={formData.diabetes_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Hipertensão</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="hipertencao_hma"
                  checked={formData.hipertencao_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="hipertencao_hf"
                  checked={formData.hipertencao_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Doença Cardiovascular</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="doenca_cardiovascular_hma"
                  checked={formData.doenca_cardiovascular_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="doenca_cardiovascular_hf"
                  checked={formData.doenca_cardiovascular_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Dislipidemia</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="dislipidemia_hma"
                  checked={formData.dislipidemia_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="dislipidemia_hf"
                  checked={formData.dislipidemia_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Câncer</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="cancer_hma"
                  checked={formData.cancer_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="cancer_hf"
                  checked={formData.cancer_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Osteoporose</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="osteoporose_hma"
                  checked={formData.osteoporose_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="osteoporose_hf"
                  checked={formData.osteoporose_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Depressão / Ansiedade</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="depressao_hma"
                  checked={formData.depressao_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="depressao_hf"
                  checked={formData.depressao_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Parasitoses</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="parasitoses_hma"
                  checked={formData.parasitoses_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="parasitoses_hf"
                  checked={formData.parasitoses_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>DRGE</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="drge_hma"
                  checked={formData.drge_hma}
                  onChange={handleChange}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="drge_hf"
                  checked={formData.drge_hf}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mb-3">
          <label
            htmlFor="diagnostico_antropometrico"
            className="form-label text-muted small"
          >
            Outras Patologias
          </label>

          <textarea
            className="form-control"
            placeholder="Descreva aqui outras patologias relevantes..."
            id="outras_patologias"
            name="outras_patologias"
            style={{ height: "130px" }}
            value={formData.outras_patologias || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <label className="form-label text-muted small mb-3 d-block">
          Faz uso de medicamentos?
        </label>

        <div className="d-flex gap-3">
          {/* SIM */}
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_uso_medicamentos"
              id="uso_medicamentos"
              value="true"
              checked={formData.faz_uso_medicamentos === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_uso_medicamentos", true)}
            />
            <label className="form-check-label ms-1" htmlFor="uso_medicamentos">
              Sim
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_uso_medicamentos"
              id="nao_uso_medicamentos"
              value="false"
              checked={formData.faz_uso_medicamentos === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_uso_medicamentos", true)}
            />
            <label
              className="form-check-label ms-1"
              htmlFor="nao_uso_medicamentos"
            >
              Não
            </label>
          </div>

          {formData.faz_uso_medicamentos === true && (
            <div className="d-flex align-items-center gap-2 ms-3">
              <label className="text-muted small mb-0">Quais:</label>

              <input
                type="text"
                name="medicamentos"
                className="form-control form-control-sm"
                style={{ width: "400px" }}
                placeholder="Ex: Fluoxetina"
                value={formData.medicamentos || ""}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaudeChild;
