import { Button, Form, Row, Col, Collapse } from "react-bootstrap";
import { tipoConfig, opcoesOrdenacao, opcoesDirecao } from "./filterConfig";
import PropTypes from "prop-types";

/**
 * Componente visual para filtros de anamnese.
 * Recebe estados e handlers do hook useAnamneseFilter.
 */
const AnamneseFilter = ({
  showFilters,
  setShowFilters,
  filtroTipos,
  handleTipoChange,
  filtroDataInicio,
  setFiltroDataInicio,
  filtroDataFim,
  setFiltroDataFim,
  filtroNutricionista,
  setFiltroNutricionista,
  nutricionistasUnicos,
  ordenarPor,
  setOrdenarPor,
  ordemDirecao,
  setOrdemDirecao,
  temFiltrosAtivos,
  limparFiltros,
}) => {
  return (
    <div className="mb-3">
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => setShowFilters(!showFilters)}
        className="d-flex align-items-center gap-2"
      >
        <i className={`bi bi-funnel${temFiltrosAtivos ? "-fill" : ""}`}></i>
        Filtros
        {temFiltrosAtivos && (
          <span className="badge bg-primary rounded-pill">Ativo</span>
        )}
      </Button>

      <Collapse in={showFilters}>
        <div className="mt-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <Row className="g-3">
                {/* Filtro por Tipo */}
                <Col md={12}>
                  <Form.Label className="fw-semibold text-secondary small mb-2">
                    Tipo de Registro
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {Object.keys(filtroTipos).map((tipo) => {
                      const config = tipoConfig[tipo];
                      const isSelected = filtroTipos[tipo];
                      return (
                        <button
                          key={tipo}
                          type="button"
                          onClick={() => handleTipoChange(tipo)}
                          className="btn d-flex align-items-center gap-2 rounded-3 px-3 py-2"
                          style={{
                            backgroundColor: isSelected ? config.color : "transparent",
                            color: isSelected ? "#fff" : config.color,
                            border: `2px solid ${config.color}`,
                            transition: "all 0.2s ease",
                            fontSize: "0.875rem",
                          }}
                        >
                          <i className={`bi ${config.icon}`}></i>
                          {config.label}
                        </button>
                      );
                    })}
                  </div>
                </Col>

                {/* Filtro por Data */}
                <Col md={4}>
                  <Form.Label className="fw-semibold text-secondary small">
                    Data Início
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="sm"
                    value={filtroDataInicio}
                    onChange={(e) => setFiltroDataInicio(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label className="fw-semibold text-secondary small">
                    Data Fim
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="sm"
                    value={filtroDataFim}
                    onChange={(e) => setFiltroDataFim(e.target.value)}
                  />
                </Col>

                {/* Filtro por Nutricionista */}
                <Col md={4}>
                  <Form.Label className="fw-semibold text-secondary small">
                    Nutricionista
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={filtroNutricionista}
                    onChange={(e) => setFiltroNutricionista(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {nutricionistasUnicos.map((nome) => (
                      <option key={nome} value={nome}>
                        {nome}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Ordenação */}
                <Col md={4}>
                  <Form.Label className="fw-semibold text-secondary small">
                    Ordenar por
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={ordenarPor}
                    onChange={(e) => setOrdenarPor(e.target.value)}
                  >
                    {opcoesOrdenacao.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={4}>
                  <Form.Label className="fw-semibold text-secondary small">
                    Ordem
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={ordemDirecao}
                    onChange={(e) => setOrdemDirecao(e.target.value)}
                  >
                    {opcoesDirecao.map((opcao) => (
                      <option key={opcao.value} value={opcao.value}>
                        {opcao.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Botão Limpar */}
                <Col md={12} className="d-flex justify-content-end">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={limparFiltros}
                    disabled={!temFiltrosAtivos}
                  >
                    <i className="bi bi-x-circle me-1"></i>
                    Limpar Filtros
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

AnamneseFilter.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  setShowFilters: PropTypes.func.isRequired,
  filtroTipos: PropTypes.object.isRequired,
  handleTipoChange: PropTypes.func.isRequired,
  filtroDataInicio: PropTypes.string.isRequired,
  setFiltroDataInicio: PropTypes.func.isRequired,
  filtroDataFim: PropTypes.string.isRequired,
  setFiltroDataFim: PropTypes.func.isRequired,
  filtroNutricionista: PropTypes.string.isRequired,
  setFiltroNutricionista: PropTypes.func.isRequired,
  nutricionistasUnicos: PropTypes.array.isRequired,
  ordenarPor: PropTypes.string.isRequired,
  setOrdenarPor: PropTypes.func.isRequired,
  ordemDirecao: PropTypes.string.isRequired,
  setOrdemDirecao: PropTypes.func.isRequired,
  temFiltrosAtivos: PropTypes.bool.isRequired,
  limparFiltros: PropTypes.func.isRequired,
};

export default AnamneseFilter;
