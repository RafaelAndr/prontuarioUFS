import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../providers/authProvider.jsx";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

import api from "../../services/api.js";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setToken, setWorkspaceId } = useAuth();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await api.post(`/auth/login`, {
                email,
                password,
            });

            if (data.token) {
                setToken(data.token);
                
                if (data.default_workspace_id) {
                    setWorkspaceId(data.default_workspace_id);
                    navigate("/", { replace: true });
                } else {
                    // Se não tem workspace padrão, vai para seleção de clínica
                    navigate("/workspace-selection", { replace: true });
                }
            }
        } catch (error) {
            
            if (error.response?.status === 422) {
                setError("Email com formato inválido");
            } else if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Erro ao fazer login. Verifique suas credenciais.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Row className="w-100 justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={5} xl={4}>
                        <Card className="shadow-lg border-0">
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <i className="bi bi-person-circle fs-1 text-primary"></i>
                                    <h2 className="mt-3 fw-bold text-primary">Login</h2>
                                </div>
                                
                                <Form onSubmit={handleSubmit}>
                                    {error && (
                                        <Alert variant="danger" className="mb-3">
                                            {error}
                                        </Alert>
                                    )}
                                    
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="text-muted small">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Digite seu email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Label className="text-muted small">Senha</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            disabled={loading}
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        size="lg"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    className="me-2"
                                                />
                                                Entrando...
                                            </>
                                        ) : (
                                            "Entrar"
                                        )}
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        Não tem uma conta? <Link to="/cadastro" className="fw-bold">Criar uma conta</Link>
                                    </small>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;

