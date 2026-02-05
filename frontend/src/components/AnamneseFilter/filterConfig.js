/**
 * Configuração dos tipos de registro para filtros de anamnese.
 * Define ícones, cores e labels para cada tipo.
 */
export const tipoConfig = {
  base: {
    label: "Anamnese Padrão",
    icon: "bi-person",
    color: "#198754",
  },
  child: {
    label: "Anamnese Infantil",
    icon: "bi-bandaid",
    color: "#0d6efd",
  },
  retorno: {
    label: "Ficha de Retorno",
    icon: "bi-arrow-repeat",
    color: "#0dcaf0",
  },
  plano: {
    label: "Plano Alimentar",
    icon: "bi-cart2",
    color: "#426461",
  },
  recordatorio: {
    label: "Recordatório",
    icon: "bi-card-checklist",
    color: "#252a2b",
  },
};

/**
 * Estado inicial para os filtros de tipo.
 */
export const filtroTiposInicial = {
  base: true,
  child: true,
  retorno: true,
  plano: true,
  recordatorio: true,
};

/**
 * Opções de ordenação disponíveis.
 */
export const opcoesOrdenacao = [
  { value: "created_at", label: "Data de criação" },
  { value: "updated_at", label: "Data de modificação" },
];

/**
 * Opções de direção de ordenação.
 */
export const opcoesDirecao = [
  { value: "desc", label: "Mais recente primeiro" },
  { value: "asc", label: "Mais antigo primeiro" },
];
