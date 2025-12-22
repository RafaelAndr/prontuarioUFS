import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/authProvider.jsx";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setToken } = useAuth();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    throw new Error("Email com formato inválido");
                }
                throw new Error(errorData.detail || "Erro ao fazer login");
            }

            const data = await response.json();

            if (data.token) {
                setToken(data.token);
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setError(
                error.message || "Erro ao fazer login. Verifique suas credenciais."
            );
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default LoginPage;

