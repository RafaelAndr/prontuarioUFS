import React from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/authProvider.jsx";

const Header = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/login", { replace: true });
    };

    return (
        <Navbar bg="primary" variant="dark" className="shadow-sm">
            <Container fluid className="px-4">
                <Navbar.Brand href="/" className="fw-bold">
                    <i className="bi bi-hospital me-2"></i>
                    Prontuário UFS
                </Navbar.Brand>
                
                <Dropdown align="end">
                    <Dropdown.Toggle 
                        as="button"
                        variant="light" 
                        id="dropdown-profile"
                        className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0 border-0"
                        style={{ width: "45px", height: "45px" }}
                        bsPrefix="custom-dropdown"
                    >
                        <i className="bi bi-person-circle fs-4"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Sair
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};

export default Header;
