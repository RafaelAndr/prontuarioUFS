import React from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Dropdown,
  Container
} from "react-bootstrap";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/authProvider.jsx";

function SearchBar({ placeholder, onSearch }) {
  const [filter, setFilter] = React.useState("Todos os profissionais");
  const [query, setQuery] = React.useState("");
  const { setToken, setWorkspaceId } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setWorkspaceId(null);
    navigate("/login", { replace: true });
  };

  const handleSwitchWorkspace = () => {
    setWorkspaceId(null);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(query, filter);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) onSearch("", filter);
  };

  return (
    <div className="search-bar-wrapper">

      {/* 🔹 Topo: título + perfil + ações */}
      <Container
        fluid
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <h4 className="mb-1" style={{ fontFamily: "arial" }}>
          Prontuários
        </h4>

        <Dropdown align="end">
          <Dropdown.Toggle
            as="button"
            className="btn d-flex align-items-center justify-content-center border-0 shadow-sm"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#ffffff"
            }}
            bsPrefix="custom-dropdown"
          >
            <i className="bi bi-person-circle fs-5 text-secondary"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow-sm">
            <Dropdown.Item onClick={() => navigate("/configuracoes-clinica")}>
              <i className="bi bi-gear me-2"></i>
              Configurações da Clínica
            </Dropdown.Item>

            <Dropdown.Item onClick={handleSwitchWorkspace}>
              <i className="bi bi-arrow-left-right me-2"></i>
              Trocar Clínica
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item onClick={handleLogout} className="text-danger">
              <i className="bi bi-box-arrow-right me-2"></i>
              Sair
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      {/* 🔹 Barra de busca */}
      <div className="search-container">
        <InputGroup className="search-input-group">
          <span className="input-group-text bg-transparent border-0">
            <i className="bi bi-search text-muted"></i>
          </span>

          <FormControl
            placeholder={placeholder || "Buscar paciente..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="border-0 search-input"
          />

          {query && (
            <Button
              variant="link"
              className="border-0 text-muted clear-btn"
              onClick={handleClear}
            >
              <i className="bi bi-x-lg"></i>
            </Button>
          )}
        </InputGroup>
      </div>
    </div>
  );
}

export default SearchBar;
