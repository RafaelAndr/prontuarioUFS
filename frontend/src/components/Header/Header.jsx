// import React from "react";
// import { Navbar, Container, Dropdown } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../providers/authProvider.jsx";

// const Header = () => {
//     const { setToken, setWorkspaceId, workspaceName } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         setToken(null);
//         setWorkspaceId(null);
//         navigate("/login", { replace: true });
//     };

//     const handleSwitchWorkspace = () => {
//         setWorkspaceId(null); 
//     };

//     return (
//         <Navbar bg="primary" variant="dark" className="shadow-sm">
//             <Container fluid className="px-4">
//                 <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
//                     <i className="bi bi-hospital me-2"></i>
//                     <span>Prontuário UFS</span>
//                     {workspaceName && (
//                         <>
//                             <span className="mx-2 opacity-50">|</span>
//                             <span className="fw-light fs-6 opacity-75">{workspaceName}</span>
//                         </>
//                     )}
//                 </Navbar.Brand>
                
//                 <Dropdown align="end">
//                     <Dropdown.Toggle 
//                         as="button"
//                         variant="light" 
//                         id="dropdown-profile"
//                         className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0 border-0"
//                         style={{ width: "45px", height: "45px" }}
//                         bsPrefix="custom-dropdown"
//                     >
//                         <i className="bi bi-person-circle fs-4"></i>
//                     </Dropdown.Toggle>

//                     <Dropdown.Menu>
//                         <Dropdown.Item onClick={() => navigate("/configuracoes-clinica")}>
//                             <i className="bi bi-gear me-2"></i>
//                             Configurações da Clínica
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={handleSwitchWorkspace}>
//                             <i className="bi bi-arrow-left-right me-2"></i>
//                             Trocar Clínica
//                         </Dropdown.Item>
//                         <Dropdown.Divider />
//                         <Dropdown.Item onClick={handleLogout}>
//                             <i className="bi bi-box-arrow-right me-2"></i>
//                             Sair
//                         </Dropdown.Item>
//                     </Dropdown.Menu>
//                 </Dropdown>
//             </Container>
//         </Navbar>
//     );
// };

// export default Header;
