const RecordatoryTable = ({ formData, setFormData }) => {
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
    <div>
      <div>
        <label className="form-label text-muted small mt-5 mb-2 d-block">
          Tipo de Recordatório: *
        </label>

        <div className="d-flex flex-wrap gap-3 mb-2">
          <div className="d-flex align-items-center gap-2 form-check">
            <input
              type="radio"
              className="form-check-input"
              name="tipo_recordatorio"
              value="vinte_quatro_horas"
              id="vinte_quatro_horas"
              checked={formData.tipo_recordatorio === "vinte_quatro_horas"}
              onChange={handleChange}
              required={true}
              onClick={() =>
                toggleBooleanField("tipo_recordatorio", "vinte_quatro_horas")
              }
            />
            <label htmlFor="vinte_quatro_horas">24 horas</label>
          </div>

          <div className="d-flex align-items-center gap-1 form-check">
            <input
              type="radio"
              className="form-check-input"
              name="tipo_recordatorio"
              value="habitual"
              checked={formData.tipo_recordatorio === "habitual"}
              onChange={handleChange}
              id="habitual"
              onClick={() =>
                toggleBooleanField("tipo_recordatorio", "habitual")
              }
            />
            <label htmlFor="habitual" className="form-check-label ms-1">
              Habitual
            </label>
          </div>
        </div>
      </div>

      <p
        className="mt-5 mb-3 ms-1"
        style={{ fontFamily: "arial", fontSize: "1.4rem" }}
      >
        Tabela Alimentar
      </p>

      <table className="table table-hover align-middle mb-4">
        <thead className="table-secondary">
          <tr>
            <th className="text-center text-muted small text-uppercase" style={{ width: "30%" }}>
              Refeição
            </th>
            <th className="text-center text-muted small text-uppercase" style={{ width: "35%" }}>
              Alimentos
            </th>
            <th className="text-center text-muted small text-uppercase" style={{ width: "35%" }}>
              Quantidade/Medida caseira
            </th>
          </tr>
        </thead>

        <tbody>

          {/* ----------------------- 1 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_um"
                value={formData.refeicao_um || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_um"
                className="form-control"
                value={formData.alimentos_um || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_um"
                className="form-control"
                value={formData.quantidade_um || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

          {/* ----------------------- 2 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_dois"
                value={formData.refeicao_dois || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_dois"
                className="form-control"
                value={formData.alimentos_dois || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_dois"
                className="form-control"
                value={formData.quantidade_dois || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

          {/* ----------------------- 3 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_tres"
                value={formData.refeicao_tres || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_tres"
                className="form-control"
                value={formData.alimentos_tres || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_tres"
                className="form-control"
                value={formData.quantidade_tres || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

          {/* ----------------------- 4 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_quatro"
                value={formData.refeicao_quatro || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_quatro"
                className="form-control"
                value={formData.alimentos_quatro || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_quatro"
                className="form-control"
                value={formData.quantidade_quatro || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

          {/* ----------------------- 5 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_cinco"
                value={formData.refeicao_cinco || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_cinco"
                className="form-control"
                value={formData.alimentos_cinco || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_cinco"
                className="form-control"
                value={formData.quantidade_cinco || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

          {/* ----------------------- 6 ----------------------- */}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                name="refeicao_seis"
                value={formData.refeicao_seis || ""}
                onChange={handleChange}
              />
            </td>

            <td className="text-center">
              <textarea
                name="alimentos_seis"
                className="form-control"
                value={formData.alimentos_seis || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>

            <td className="text-center">
              <textarea
                name="quantidade_seis"
                className="form-control"
                value={formData.quantidade_seis || ""}
                onChange={handleChange}
                style={{ height: "150px" }}
              ></textarea>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default RecordatoryTable;
