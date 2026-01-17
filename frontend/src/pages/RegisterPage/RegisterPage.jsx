import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import api from "../../services/api.js";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inviteCode, setInviteCode] = useState(""); // Campo opcional
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("As senhas não conferem.");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                name,
                email,
                password,
                invite_code: inviteCode || null // Envia null se estiver vazio
            };

            await api.post("/auth/register", payload);

            setSuccess("Cadastro realizado com sucesso! Redirecionando para o login...");
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Erro ao realizar cadastro. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={5} xl={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <i className="bi bi-person-plus-fill fs-1 text-primary"></i>
                                <h2 className="mt-3 fw-bold text-primary">Criar Conta</h2>
                            </div>
                            
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label className="text-muted small">Nome Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ex: João da Silva"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label className="text-muted small">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label className="text-muted small">Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Crie uma senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label className="text-muted small">Confirmar Senha</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Repita a senha"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </Form.Group>

                                <hr className="my-4" />

                                <Form.Group className="mb-4" controlId="formInviteCode">
                                    <Form.Label className="text-muted small fw-bold text-primary">
                                        Possui um código de convite? (Opcional)
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Cole o código aqui para entrar em uma clínica"
                                        value={inviteCode}
                                        onChange={(e) => setInviteCode(e.target.value)}
                                        disabled={loading}
                                        className="bg-light"
                                    />
                                    <Form.Text className="text-muted">
                                        Se preenchido, você entrará automaticamente na clínica.
                                    </Form.Text>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 mb-3"
                                    size="lg"
                                    disabled={loading}
                                >
                                    {loading ? <Spinner size="sm" animation="border" /> : "Cadastrar"}
                                </Button>

                                <div className="text-center">
                                    <small className="text-muted">
                                        Já tem uma conta? <Link to="/login" className="fw-bold">Fazer Login</Link>
                                    </small>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;
