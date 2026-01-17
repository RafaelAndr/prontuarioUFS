import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button, Alert, Badge, Spinner, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/authProvider";
import api from "../../services/api";

const roleMap = {
    'OWNER': 'Proprietário',
    'ADMIN': 'Administrador',
    'MEMBER': 'Membro'
};

const WorkspaceSettings = () => {
    const { workspaceId, setWorkspaceName: setContextWorkspaceName } = useAuth(); // Adicionado
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [workspaceName, setWorkspaceName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    // Modal e inputs
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [customCode, setCustomCode] = useState("");
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState("");

    // Estado para edição do nome
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [nameLoading, setNameLoading] = useState(false);

    useEffect(() => {
        if (workspaceId) {
            fetchData();
        }
    }, [workspaceId]);

    const fetchData = async () => {
        setLoading(true);
        setError("");
        try {
            // Pegar também os dados do workspace para exibir o nome
            const [membersRes, invitesRes, workspacesRes] = await Promise.all([
                api.get(`/workspaces/${workspaceId}/members`),
                api.get(`/workspaces/${workspaceId}/invites`),
                api.get(`/workspaces/`)
            ]);
            setMembers(membersRes.data);
            setInvites(invitesRes.data);
            
            const currentWs = workspacesRes.data.find(w => w.id === workspaceId);
            if (currentWs) {
                setWorkspaceName(currentWs.name);
                setNewName(currentWs.name);
            }
        } catch (err) {
            if (err.response?.status === 403) {
                setError("Acesso negado. Apenas administradores podem gerenciar esta clínica.");
            } else {
                setError("Erro ao carregar dados da clínica.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateName = async () => {
        if (!newName.trim()) return;
        setNameLoading(true);
        setError("");
        setSuccessMessage("");
        
        try {
            await api.put(`/workspaces/${workspaceId}`, { name: newName });
            setWorkspaceName(newName);
            setContextWorkspaceName(newName);
            setIsEditingName(false);
            setSuccessMessage("Nome da clínica atualizado com sucesso!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            setError("Erro ao atualizar nome da clínica.");
        } finally {
            setNameLoading(false);
        }
    };

    const handleCreateInvite = async (e) => {
        e.preventDefault();
        setModalLoading(true);
        setModalError("");
        try {
            // Se customCode for vazio, manda null ou objeto vazio
            const body = customCode ? { code: customCode } : {};
            await api.post(`/workspaces/${workspaceId}/invites`, body);
            await fetchData(); 
            setShowInviteModal(false);
            setCustomCode("");
        } catch (err) {
            setModalError(err.response?.data?.detail || "Erro ao gerar convite.");
        } finally {
            setModalLoading(false);
        }
    };

    const handleDeleteInvite = async (inviteId) => {
        if (!window.confirm("Deseja realmente excluir este código de convite?")) return;
        
        try {
            await api.delete(`/workspaces/${workspaceId}/invites/${inviteId}`);
            setInvites(invites.filter(i => i.id !== inviteId));
        } catch (err) {
            setError("Erro ao excluir convite.");
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!window.confirm("Tem certeza que deseja remover este membro da clínica?")) return;

        try {
            await api.delete(`/workspaces/${workspaceId}/members/${userId}`);
            setMembers(members.filter(m => m.user_id !== userId));
        } catch (err) {
            alert(err.response?.data?.detail || "Erro ao remover membro.");
        }
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        alert(`Código ${code} copiado!`);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center py-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error && error.includes("Acesso negado")) {
        return (
            <Container className="py-5 text-center">
                <Alert variant="warning" className="py-5 shadow-sm">
                    <i className="bi bi-shield-lock fs-1 d-block mb-3 text-warning"></i>
                    <h4>Acesso Restrito</h4>
                    <p>{error}</p>
                    <Button variant="outline-primary" onClick={() => navigate("/")}>Voltar ao Início</Button>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex align-items-center mb-4">
                <Button 
                    variant="link" 
                    className="text-decoration-none text-secondary p-0 me-3" 
                    onClick={() => navigate(-1)}
                >
                    <i className="bi bi-arrow-left fs-4"></i>
                </Button>
                <div className="flex-grow-1">
                    <h2 className="mb-0 text-primary fw-bold d-flex align-items-center">
                        <i className="bi bi-gear-fill me-2"></i>
                        Configurações da Clínica
                    </h2>
                </div>
            </div>

            {error && !error.includes("Acesso negado") && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
            {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage("")}>{successMessage}</Alert>}

            {/* Card de Informações Gerais */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-white py-3 border-bottom-0">
                            <h5 className="mb-0 fw-bold text-dark">Informações da Clínica</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <label className="text-muted small text-uppercase fw-bold mb-1">Nome da Clínica</label>
                                    {isEditingName ? (
                                        <div className="d-flex gap-2 max-w-50">
                                            <Form.Control 
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                disabled={nameLoading}
                                            />
                                            <Button variant="success" onClick={handleUpdateName} disabled={nameLoading}>
                                                {nameLoading ? <Spinner size="sm" /> : <i className="bi bi-check-lg"></i>}
                                            </Button>
                                            <Button variant="outline-secondary" onClick={() => {setIsEditingName(false); setNewName(workspaceName);}}>
                                                <i className="bi bi-x-lg"></i>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="d-flex align-items-center">
                                            <h4 className="mb-0 me-3">{workspaceName}</h4>
                                            <Button variant="link" size="sm" className="p-0 text-secondary" onClick={() => setIsEditingName(true)}>
                                                <i className="bi bi-pencil-square"></i> Editar
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-white py-3 border-bottom-0">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-0 fw-bold text-dark">Códigos de Convite</h5>
                                    <small className="text-muted">Gerencie os códigos para novos membros entrarem.</small>
                                </div>
                                <Button 
                                    variant="primary" 
                                    size="sm" 
                                    onClick={() => setShowInviteModal(true)}
                                    className="d-flex align-items-center"
                                >
                                    <i className="bi bi-plus-lg me-2"></i>
                                    Novo Código
                                </Button>
                            </div>
                        </Card.Header>
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="ps-4">Código</th>
                                    <th>Criado em</th>
                                    <th>Status</th>
                                    <th className="text-end pe-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invites.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center text-muted py-5">Nenhum código de convite ativo no momento.</td></tr>
                                ) : (
                                    invites.map((invite) => (
                                        <tr key={invite.id}>
                                            <td className="ps-4"><code className="fs-6 px-2 py-1 bg-light rounded border text-dark fw-bold">{invite.code}</code></td>
                                            <td>{new Date(invite.created_at).toLocaleDateString()}</td>
                                            <td><Badge bg="success" className="fw-normal">Ativo</Badge></td>
                                            <td className="text-end pe-4">
                                                <Button variant="outline-primary" size="sm" className="me-2 rounded-circle" title="Copiar" onClick={() => copyToClipboard(invite.code)}>
                                                    <i className="bi bi-clipboard"></i>
                                                </Button>
                                                <Button variant="outline-danger" size="sm" className="rounded-circle" title="Excluir" onClick={() => handleDeleteInvite(invite.id)}>
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-white py-3 border-bottom-0">
                            <h5 className="mb-0 fw-bold text-dark">Membros da Equipe</h5>
                            <small className="text-muted">Lista de membros com acesso.</small>
                        </Card.Header>
                        <Table responsive hover className="mb-0 align-middle">
                            <thead className="bg-light text-secondary small text-uppercase">
                                <tr>
                                    <th className="ps-4">Nome</th>
                                    <th>Email</th>
                                    <th>Função</th>
                                    <th>Código de entrada</th>
                                    <th>Data de Entrada</th>
                                    <th className="text-end pe-4">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member) => (
                                    <tr key={member.user_id}>
                                        <td className="ps-4 fw-medium">{member.user_name || "Sem nome"}</td>
                                        <td className="text-muted">{member.user_email}</td>
                                        <td>
                                            <Badge bg={member.role === 'OWNER' ? 'primary' : (member.role === 'ADMIN' ? 'info' : 'secondary')}>
                                                {roleMap[member.role] || member.role}
                                            </Badge>
                                        </td>
                                        <td>
                                            {member.invite_code === "Criação/Direto" ? 
                                                <span className="text-muted small fst-italic">Fundador</span> : 
                                                <code className="small text-muted">{member.invite_code}</code>
                                            }
                                        </td>
                                        <td className="text-muted">{new Date(member.joined_at).toLocaleDateString()}</td>
                                        <td className="text-end pe-4">
                                            {member.role !== 'OWNER' && (
                                                <Button 
                                                    variant="outline-danger" 
                                                    size="sm" 
                                                    className="rounded-circle" 
                                                    title="Remover Membro" 
                                                    onClick={() => handleRemoveMember(member.user_id)}
                                                >
                                                    <i className="bi bi-person-x"></i>
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>

            {/* Modal de Criação de Convite */}
            <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} centered>
                <Form onSubmit={handleCreateInvite}>
                    <Modal.Header closeButton>
                        <Modal.Title>Criar Novo Convite</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalError && <Alert variant="danger">{modalError}</Alert>}
                        <Form.Group>
                            <Form.Label>Código Personalizado (Opcional)</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ex: CLINICA2024 (Deixe em branco para aleatório)" 
                                value={customCode}
                                onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                            />
                            <Form.Text className="text-muted">
                                Códigos devem ser únicos. Se deixado em branco, um código aleatório será gerado.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowInviteModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit" disabled={modalLoading}>
                            {modalLoading ? <Spinner size="sm" animation="border" /> : "Criar Convite"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default WorkspaceSettings;