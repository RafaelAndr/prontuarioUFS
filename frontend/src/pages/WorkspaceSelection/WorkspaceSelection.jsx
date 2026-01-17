import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/authProvider";
import { Container, Row, Col, Card, Button, Form, Alert, ListGroup, Spinner, Badge, Tab, Tabs } from "react-bootstrap";
import api from "../../services/api";

const roleMap = {
    'OWNER': 'Proprietário',
    'ADMIN': 'Administrador',
    'MEMBER': 'Membro'
};

const WorkspaceSelection = () => {
    const { setWorkspaceId, setToken, setWorkspaceName } = useAuth(); // Adicionado setWorkspaceName
    const [workspaces, setWorkspaces] = useState([]);
    const [defaultWorkspaceId, setDefaultWorkspaceId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    // Estados para criação
    const [newWorkspaceName, setNewWorkspaceName] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    // Estados para entrar (join)
    const [inviteCode, setInviteCode] = useState("");
    const [joinLoading, setJoinLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [wsRes, userRes] = await Promise.all([
                api.get("/workspaces/"),
                api.get("/auth/me")
            ]);
            setWorkspaces(wsRes.data);
            setDefaultWorkspaceId(userRes.data.default_workspace_id);
        } catch (err) {
            setError("Erro ao carregar dados.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (id) => {
        const selected = workspaces.find(w => w.id === id);
        if (selected) {
            setWorkspaceName(selected.name);
        }
        setWorkspaceId(id);
        navigate("/");
    };

    const handleSetDefault = async (e, id) => {
        e.stopPropagation(); // Não selecionar a clínica ao clicar na estrela
        try {
            await api.put(`/auth/default-workspace/${id}`);
            setDefaultWorkspaceId(id);
        } catch (err) {
            alert("Erro ao definir clínica padrão.");
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const { data } = await api.post("/workspaces/", { name: newWorkspaceName });
            setWorkspaceName(data.name);
            setWorkspaceId(data.id);
            navigate("/");
        } catch (err) {
            setError("Erro ao criar clínica.");
        } finally {
            setActionLoading(false);
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        setJoinLoading(true);
        setError(""); // Limpa erros anteriores
        try {
            const { data } = await api.post("/workspaces/join", { code: inviteCode });
            // Se sucesso, entra direto
            setWorkspaceName(data.name);
            setWorkspaceId(data.id);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.detail || "Erro ao entrar na clínica. Verifique o código.");
        } finally {
            setJoinLoading(false);
        }
    };

    const handleLogout = () => {
        setToken(null);
        setWorkspaceId(null);
        setWorkspaceName(null);
        navigate("/login");
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    return (
        <Container className="py-5 position-relative">
            {/* Botão de Logout no canto superior direito */}
            <div className="position-absolute top-0 end-0 mt-3 me-3">
                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="d-flex align-items-center">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sair
                </Button>
            </div>

            <div className="text-center mb-5">
                <h2 className="fw-bold text-primary display-6">Bem-vindo(a)</h2>
                <p className="text-muted fs-5">Selecione ou crie uma clínica.</p>
            </div>

            {error && <Alert variant="danger" className="mx-auto mb-4" style={{ maxWidth: '600px' }}>{error}</Alert>}

            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    {/* Lista de Clínicas */}
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-4">
                                <div 
                                    className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: '60px', height: '60px', minWidth: '60px' }}
                                >
                                    <i className="bi bi-building fs-3 text-primary"></i>
                                </div>
                                <div>
                                    <h4 className="fw-bold mb-0">Suas Clínicas</h4>
                                    <small className="text-muted">Acesse seus espaços de trabalho</small>
                                </div>
                            </div>
                            
                            {workspaces.length === 0 ? (
                                <div className="text-center py-4 text-muted border rounded bg-light">
                                    <i className="bi bi-inbox fs-2 d-block mb-2 opacity-50"></i>
                                    <p className="mb-0">Você ainda não participa de nenhuma clínica.</p>
                                </div>
                            ) : (
                                <ListGroup variant="flush">
                                    {workspaces.map((ws) => (
                                        <ListGroup.Item 
                                            key={ws.id} 
                                            action 
                                            onClick={() => handleSelect(ws.id)}
                                            className="d-flex justify-content-between align-items-center py-3 px-3 rounded mb-2 border shadow-none position-relative"
                                        >
                                            <div className="d-flex align-items-center">
                                                <Button 
                                                    variant="link" 
                                                    className="p-0 me-3 text-decoration-none"
                                                    onClick={(e) => handleSetDefault(e, ws.id)}
                                                    title={defaultWorkspaceId === ws.id ? "Clínica Padrão" : "Definir como Padrão"}
                                                >
                                                    <i className={`bi ${defaultWorkspaceId === ws.id ? 'bi-star-fill text-warning' : 'bi-star text-muted'} fs-5`}></i>
                                                </Button>
                                                <div>
                                                    <span className="fw-bold d-block text-dark">{ws.name}</span>
                                                    <div className="d-flex gap-2">
                                                        <Badge bg="light" text="dark" className="fw-normal border small">
                                                            {roleMap[ws.role] || ws.role}
                                                        </Badge>
                                                        {defaultWorkspaceId === ws.id && (
                                                            <Badge bg="warning" text="dark" className="fw-normal small">
                                                                Padrão
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <i className="bi bi-chevron-right text-primary"></i>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>

                    {/* Tabs para Entrar ou Criar */}
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body className="p-4">
                            <Tabs defaultActiveKey="join" id="workspace-tabs" className="mb-4 custom-tabs" justify>
                                <Tab eventKey="join" title="Entrar com Código">
                                    <div className="pt-3">
                                        <div className="d-flex align-items-center mb-3">
                                            <div 
                                                className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                                style={{ width: '40px', height: '40px' }}
                                            >
                                                <i className="bi bi-ticket-perforated text-primary"></i>
                                            </div>
                                            <small className="text-muted">Use um código de convite existente</small>
                                        </div>
                                        <Form onSubmit={handleJoin}>
                                            <Form.Group className="mb-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Código do Convite" 
                                                    value={inviteCode}
                                                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                                    required
                                                    className="py-2 border-0 shadow-sm"
                                                />
                                            </Form.Group>
                                            <Button 
                                                variant="primary" 
                                                type="submit" 
                                                className="w-100 py-2 fw-bold shadow-sm"
                                                disabled={joinLoading}
                                            >
                                                {joinLoading ? (
                                                    <>
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                        Entrando...
                                                    </>
                                                ) : "Entrar na Clínica"}
                                            </Button>
                                        </Form>
                                    </div>
                                </Tab>
                                <Tab eventKey="create" title="Criar Nova Clínica">
                                    <div className="pt-3">
                                        <div className="d-flex align-items-center mb-3">
                                            <div 
                                                className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                                style={{ width: '40px', height: '40px' }}
                                            >
                                                <i className="bi bi-plus-lg text-success"></i>
                                            </div>
                                            <small className="text-muted">Comece um novo workspace</small>
                                        </div>
                                        <Form onSubmit={handleCreate}>
                                            <Form.Group className="mb-3">
                                                <Form.Control 
                                                    type="text" 
                                                    placeholder="Nome da Clínica (ex: Clínica Saúde Total)" 
                                                    value={newWorkspaceName}
                                                    onChange={(e) => setNewWorkspaceName(e.target.value)}
                                                    required
                                                    className="py-2 border-0 shadow-sm"
                                                />
                                            </Form.Group>
                                            <Button 
                                                variant="success" 
                                                type="submit" 
                                                className="w-100 py-2 fw-bold shadow-sm"
                                                disabled={actionLoading}
                                            >
                                                {actionLoading ? (
                                                    <>
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                        Criando...
                                                    </>
                                                ) : "Criar"}
                                            </Button>
                                        </Form>
                                    </div>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WorkspaceSelection;
