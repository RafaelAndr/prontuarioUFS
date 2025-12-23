import "./index.css"

const AvaliacaoAntropometrica = ({ formData, setFormData }) => {
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

  return (
    <div className="mb-4 p-4 border rounded bg-white shadow-sm">
      <div className="mb-4">
        <div className="row g-3">
          <div className="d-flex align-items-center gap-2 col-md-4">
            <label className="form-label form-side text-muted small">
              Peso atual (kg):
            </label>
            <input
              type="text"
              name="peso_atual"
              className="form-control form-control-sm"
              style={{ width: "100px" }}
              value={formData.peso_atual || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-4 mb-2">
            <label className="form-label form-side text-muted small">
              Peso usual (kg):
            </label>
            <input
              type="text"
              name="peso_usual"
              className="form-control form-control-sm"
              style={{ width: "100px" }}
              value={formData.peso_usual || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-4">
            <label className="form-label form-side text-muted small">
              Altura real (m):
            </label>
            <input
              type="text"
              name="altura_real"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.altura_real || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-4">
            <label className="form-label form-side text-muted small">
              Altura do joelho (cm):
            </label>
              <input
                type="text"
                name="aj"
                className="form-control form-control-sm"
                style={{width:"100px"}}
                value={formData.aj || ""}
                onChange={handleChange}
              />
            
          </div>

          <div className="d-flex align-items-center gap-2 col-md-4">
            <label className="form-label form-side text-muted small">
              Altura estimada (m):
            </label>
            <input
              type="text"
              name="altura_estimada"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.altura_estimada || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-4">
            <label className="form-label form-side text-muted small">IMC (kg/m²):</label>
            <input
              type="text"
              name="imc"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.imc || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="row g-3">
          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">Braço:</label>
            <input
              type="text"
              name="circunferencia_braco"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.circunferencia_braco || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">Cintura:</label>
            <input
              type="text"
              name="circunferencia_cintura"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.circunferencia_cintura || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">Panturrilha:</label>
            <input
              type="text"
              name="circunferencia_panturrilha"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.circunferencia_panturrilha || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">Pescoço:</label>
            <input
              type="text"
              name="circunferencia_pescoco"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.circunferencia_pescoco || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="row g-3">
          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">
              Tricipital (PCT):
            </label>
            <input
              type="text"
              name="pct"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.pct || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">
              Bicipital (PCB):
            </label>
            <input
              type="text"
              name="pcb"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.pcb || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">
              Subescapular (PCSE):
            </label>
            <input
              type="text"
              name="pcse"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.pcse || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center gap-2 col-md-3">
            <label className="form-label form-side text-muted small">
              Suprailíaca (PCSI):
            </label>
            <input
              type="text"
              name="pcsi"
              className="form-control form-control-sm"
              style={{width:"100px"}}
              value={formData.pcsi || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="diagnostico_antropometrico"
          className="form-label text-muted small"
        >
          Diagnóstico Antropométrico
        </label>
        <textarea
          className="form-control"
          id="diagnostico_antropometrico"
          name="diagnostico_antropometrico"
          placeholder="Descreva a avaliação dos dados antropométricos, classificações e observações relevantes..."
          rows="5"
          value={formData.diagnostico_antropometrico || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AvaliacaoAntropometrica;
