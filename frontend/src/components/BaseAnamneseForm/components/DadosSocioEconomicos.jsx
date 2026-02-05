import { useMemo } from "react";
import { calcularTempoSono } from "../../../utils/timeUtils";
import "./index.css"

const DadosSocioEconomicos = ({ formData, setFormData }) => {

  const tempoSono = useMemo(() => {
    return calcularTempoSono(formData.horario_dorme, formData.horario_acorda);
  }, [formData.horario_dorme, formData.horario_acorda]);

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
      <div className="mb-3 p-4 border rounded-3 bg-white ">
        <label className="form-label text-muted small">Estado Civil</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {["solteiro", "casado", "viuvo", "separado"].map((estado) => (
            <div
              className="form-check d-flex align-items-center gap-2"
              key={estado}
            >
              <input
                className="form-check-input"
                type="radio"
                name="estado_civil"
                id={estado}
                value={estado}
                checked={formData.estado_civil === estado}
                onChange={handleChange}
                onClick={() => toggleBooleanField("estado_civil", estado)}
              />
              <label className="form-check-label" htmlFor={estado}>
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <label className="form-label text-muted small">Escolaridade</label>

        <div className="d-flex flex-wrap gap-3 mb-3">
          {[
            { id: "analfabeto", label: "Analfabeto" },
            { id: "alfabetizado", label: "Alfabetizado" },
            { id: "fundamental_incompleto_completo", label: "Fundamental" },
            { id: "medio_incompleto_completo", label: "Médio" },
            { id: "superior_incompleto_completo", label: "Superior" },
          ].map((item) => (
            <div
              className="form-check d-flex align-items-center gap-2"
              key={item.id}
            >
              <input
                className="form-check-input"
                type="radio"
                name="escolaridade"
                id={item.id}
                value={item.id}
                checked={formData.escolaridade === item.id}
                onChange={handleChange}
                onClick={() => toggleBooleanField("escolaridade", item.id)}
              />
              <label className="form-check-label" htmlFor={item.id}>
                {item.label}
              </label>
            </div>
          ))}
        </div>

        <label htmlFor="ocupacao" className="form-label text-muted small">
          Ocupação
        </label>
        <input
          type="text"
          className="form-control form-control-sm mb-3"
          id="ocupacao"
          name="ocupacao"
          style={{ width: "200px" }}
          value={formData.ocupacao || ""}
          placeholder="Ex: Professor"
          onChange={handleChange}
        />

        <label className="form-label text-muted small">
          Exerce alguma atividade dentro de casa?
        </label>
        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_atividade_dentro_casa"
              id="sim_casa"
              value="true"
              checked={formData.faz_atividade_dentro_casa === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_atividade_dentro_casa", true)}
            />
            <label className="form-check-label" htmlFor="sim_casa">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_atividade_dentro_casa"
              id="nao_casa"
              value="false"
              checked={formData.faz_atividade_dentro_casa === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_atividade_dentro_casa", false)}
            />
            <label className="form-check-label" htmlFor="nao_casa">
              Não
            </label>
          </div>
          {formData.faz_atividade_dentro_casa === true && (
            <div className="d-flex align-items-center gap-2 ms-3">
              <label className="text-muted small mb-0">Qual?</label>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "220px" }}
                name="atividade_dentro_casa"
                value={formData.atividade_dentro_casa || ""}
                placeholder="Ex: Limpeza, organização"
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <label className="form-label text-muted small">
          Estrutura Familiar
        </label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="pai_mae"
              id="pai_mae"
              value="true"
              checked={formData.pai_mae === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("pai_mae", true)}
            />
            <label className="form-check-label" htmlFor="pai_mae">
              Pai/Mãe
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="conjuge"
              id="conjuge"
              value="true"
              checked={formData.conjuge === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("conjuge", true)}
            />
            <label className="form-check-label" htmlFor="conjuge">
              Cônjuge
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="filho"
              id="filho"
              value="true"
              checked={formData.filho === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("filho", true)}
            />
            <label className="form-check-label" htmlFor="filho">
              Filho
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="irmao"
              id="irmao"
              value="true"
              checked={formData.irmao === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("irmao", true)}
            />
            <label className="form-check-label" htmlFor="irmao">
              Irmão
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="netos"
              id="netos"
              value="true"
              checked={formData.netos === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("netos", true)}
            />
            <label className="form-check-label" htmlFor="netos">
              Netos
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="sobrinho"
              id="sobrinho"
              value="true"
              checked={formData.sobrinho === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("sobrinho", true)}
            />
            <label className="form-check-label" htmlFor="sobrinho">
              Sobrinho
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="cunhado"
              id="cunhado"
              value="true"
              checked={formData.cunhado === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("cunhado", true)}
            />
            <label className="form-check-label" htmlFor="cunhado">
              Cunhado
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="so"
              id="so"
              value="true"
              checked={formData.so === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("so", true)}
            />
            <label className="form-check-label" htmlFor="so">
              Só
            </label>
          </div>

          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="amigos"
              id="amigos"
              value="true"
              checked={formData.amigos === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("amigos", true)}
            />
            <label className="form-check-label" htmlFor="amigos">
              Amigos
            </label>
          </div>
        </div>

        <label htmlFor="ocupacao" className="form-label text-muted small">
          Outras pessoas da estrutura familiar:
        </label>
        <input
          type="text"
          className="form-control form-control-sm mb-3"
          name="outros_da_familia"
          style={{ width: "400px" }}
          value={formData.outros_da_familia || ""}
          placeholder=""
          onChange={handleChange}
        />

        <div className="row g-3 mb-4 mt-3">
          <div className="d-flex align-items-center gap-2 col-md-6">
            <label
              htmlFor="renda_pessoal"
              className="form-label form-side text-muted small"
            >
              Renda Pessoal (R$):
            </label>
            <input
              type="text"
              id="renda_pessoal"
              name="renda_pessoal"
              className="form-control form-control-sm"
              style={{ width: "150px" }}
              value={formData.renda_pessoal || ""}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex align-items-center gap-2 col-md-6">
            <label
              htmlFor="gastos_alimentacao"
              className="form-label form-side text-muted small"
            >
              Gastos com Alimentação (R$):
            </label>
            <input
              type="text"
              id="gastos_alimentacao"
              name="gastos_alimentacao"
              className="form-control form-control-sm"
              style={{ width: "150px" }}
              value={formData.gastos_alimentacao || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <label className="form-label text-muted small">Atividade Física</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_atividade_fisica"
              id="sim_atividade"
              value="true"
              checked={formData.faz_atividade_fisica === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_atividade_fisica", true)}
            />
            <label className="form-check-label" htmlFor="sim_atividade">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="faz_atividade_fisica"
              id="nao_atividade"
              value="false"
              checked={formData.faz_atividade_fisica === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("faz_atividade_fisica", false)}
            />
            <label className="form-check-label" htmlFor="nao_atividade">
              Não
            </label>
          </div>
          {formData.faz_atividade_fisica === true && (
            <>
              <div className="d-flex align-items-center gap-2 ms-3">
                <label className="text-muted small mb-0">Qual:</label>
                <input
                  type="text"
                  name="qual_atividade_fisica"
                  className="form-control form-control-sm"
                  style={{ width: "180px" }}
                  placeholder="Ex: Caminhada"
                  value={formData.qual_atividade_fisica || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <label className="text-muted small mb-0">Frequência:</label>
                <input
                  type="text"
                  name="frequencia_atividade_fisica"
                  className="form-control form-control-sm"
                  style={{ width: "140px" }}
                  placeholder="Ex: 3x/sem"
                  value={formData.frequencia_atividade_fisica || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        <label className="form-label text-muted small">
          Já fez alguma atividade física?
        </label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_fez_atividade_fisica"
              id="sim_ja_fez"
              value="true"
              checked={formData.ja_fez_atividade_fisica === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_fez_atividade_fisica", true)}
            />
            <label className="form-check-label" htmlFor="sim_ja_fez">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_fez_atividade_fisica"
              id="nao_ja_fez"
              value="false"
              checked={formData.ja_fez_atividade_fisica === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_fez_atividade_fisica", false)}
            />
            <label className="form-check-label" htmlFor="nao_ja_fez">
              Não
            </label>
          </div>
          {formData.ja_fez_atividade_fisica === true && (
            <div className="d-flex align-items-center gap-2 ms-3">
              <label className="text-muted small mb-0">
                Há quanto tempo parou:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "180px" }}
                name="tempo_parado_atividade_fisica"
                placeholder="Ex: 6 meses"
                value={formData.tempo_parado_atividade_fisica || ""}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <label className="form-label text-muted small">
          Etilismo (consumo de bebidas alcoólicas)
        </label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="tem_etilismo"
              id="sim_etilismo"
              value="true"
              checked={formData.tem_etilismo === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("tem_etilismo", true)}
            />
            <label className="form-check-label" htmlFor="sim_etilismo">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="tem_etilismo"
              id="nao_etilismo"
              value="false"
              checked={formData.tem_etilismo === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("tem_etilismo", false)}
            />
            <label className="form-check-label" htmlFor="nao_etilismo">
              Não
            </label>
          </div>
          {formData.tem_etilismo === true && (
            <>
              <div className="d-flex align-items-center gap-2 ms-3">
                <label className="text-muted small mb-0">Tipo:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: "140px" }}
                  placeholder="Ex: Cerveja"
                  name="tipo_etilismo"
                  value={formData.tipo_etilismo || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <label className="text-muted small mb-0">Quanto:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: "140px" }}
                  placeholder="Ex: 2x/sem"
                  name="quanto_etilismo"
                  value={formData.quanto_etilismo || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        <label className="form-label text-muted small">Já foi etilista?</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_foi_etilista"
              id="sim_foi_etilista"
              value="true"
              checked={formData.ja_foi_etilista === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_foi_etilista", true)}
            />
            <label className="form-check-label" htmlFor="sim_foi_etilista">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_foi_etilista"
              id="nao_foi_etilista"
              value="false"
              checked={formData.ja_foi_etilista === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_foi_etilista", false)}
            />
            <label className="form-check-label" htmlFor="nao_foi_etilista">
              Não
            </label>
          </div>
          {formData.ja_foi_etilista === true && (
            <div className="d-flex align-items-center gap-2 ms-3">
              <label className="text-muted small mb-0">
                Há quanto tempo parou:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "180px" }}
                placeholder="Ex: 1 ano"
                name="tempo_parado_etilismo"
                value={formData.tempo_parado_etilismo || ""}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <label className="form-label text-muted small">Tabagismo</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="tem_tabagismo"
              id="sim_tabagismo"
              value="true"
              checked={formData.tem_tabagismo === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("tem_tabagismo", true)}
            />
            <label className="form-check-label" htmlFor="sim_tabagismo">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="tem_tabagismo"
              id="nao_tabagismo"
              value="false"
              checked={formData.tem_tabagismo === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("tem_tabagismo", false)}
            />
            <label className="form-check-label" htmlFor="nao_tabagismo">
              Não
            </label>
          </div>
          {formData.tem_tabagismo === true && (
            <>
              <div className="d-flex align-items-center gap-2 ms-3">
                <label className="text-muted small mb-0">Tipo:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: "140px" }}
                  placeholder="Ex: Cigarro"
                  name="tipo_tabagismo"
                  value={formData.tipo_tabagismo || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <label className="text-muted small mb-0">Quanto:</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: "140px" }}
                  placeholder="Ex: 1 maço/dia"
                  name="quanto_tabagismo"
                  value={formData.quanto_tabagismo || ""}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        <label className="form-label text-muted small">Já foi tabagista?</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_foi_tabagista"
              id="sim_foi_tabagista"
              value="true"
              checked={formData.ja_foi_tabagista === true}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_foi_tabagista", true)}
            />
            <label className="form-check-label" htmlFor="sim_foi_tabagista">
              Sim
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="ja_foi_tabagista"
              id="nao_foi_tabagista"
              value="false"
              checked={formData.ja_foi_tabagista === false}
              onChange={handleChange}
              onClick={() => toggleBooleanField("ja_foi_tabagista", false)}
            />
            <label className="form-check-label" htmlFor="nao_foi_tabagista">
              Não
            </label>
          </div>
          {formData.ja_foi_tabagista === true && (
            <div className="d-flex align-items-center gap-2 ms-3">
              <label className="text-muted small mb-0">
                Há quanto tempo parou:
              </label>
              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "180px" }}
                placeholder="Ex: 1 ano"
                name="tempo_parado_tabagismo"
                value={formData.tempo_parado_tabagismo || ""}
                onChange={handleChange}
              />
            </div>
          )}       
        </div>

        <label className="form-label text-muted small">Sono</label>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="sono"
              id="sono_bom"
              value="bom"
              checked={formData.sono === "bom"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("sono", "bom")}
            />
            <label className="form-check-label" htmlFor="sono_bom">
              Bom
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="sono"
              id="sono_mediano"
              value="mediano"
              checked={formData.sono === "mediano"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("sono", "mediano")}
            />
            <label className="form-check-label" htmlFor="sono_mediano">
              Mediano
            </label>
          </div>
          <div className="form-check d-flex align-items-center gap-2">
            <input
              className="form-check-input"
              type="radio"
              name="sono"
              id="sono_ruim"
              value="ruim"
              checked={formData.sono === "ruim"}
              onChange={handleChange}
              onClick={() => toggleBooleanField("sono", "ruim")}
            />
            <label className="form-check-label" htmlFor="sono_ruim">
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
              value={formData.horario_acorda || ""}
              onChange={handleChange}
            />
          </div>
          {tempoSono && (
            <div className="d-flex align-items-center gap-2 ms-2">
              <span className="text-muted small">
                Tempo: <strong>{tempoSono}</strong>
              </span>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default DadosSocioEconomicos;
