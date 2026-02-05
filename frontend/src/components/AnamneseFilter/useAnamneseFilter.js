import { useState, useMemo, useCallback } from "react";
import { filtroTiposInicial } from "./filterConfig";

/**
 * Hook customizado para gerenciar filtros de anamnese.
 * Encapsula todos os estados e lógica de filtragem.
 * 
 * @param {Object} dados - Objeto contendo os arrays de dados por tipo
 * @returns {Object} Estados, setters e funções de filtro
 */
const useAnamneseFilter = (dados = {}) => {
  const {
    anamnesesBase = [],
    anamnesesChild = [],
    returnAnamnese = [],
    foodPlan = [],
    recordatory = [],
  } = dados;

  // Estados dos filtros
  const [showFilters, setShowFilters] = useState(false);
  const [filtroTipos, setFiltroTipos] = useState(filtroTiposInicial);
  const [filtroDataInicio, setFiltroDataInicio] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");
  const [filtroNutricionista, setFiltroNutricionista] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("created_at");
  const [ordemDirecao, setOrdemDirecao] = useState("desc");

  // Lista de nutricionistas únicos (memorizada)
  const nutricionistasUnicos = useMemo(() => {
    const todos = [
      ...anamnesesBase,
      ...anamnesesChild,
      ...returnAnamnese,
      ...foodPlan,
    ];
    const nomes = todos
      .map((item) => item.nutricionista_responsavel)
      .filter((nome) => nome && nome.trim() !== "");
    return [...new Set(nomes)].sort();
  }, [anamnesesBase, anamnesesChild, returnAnamnese, foodPlan]);

  // Verifica se há filtros ativos
  const temFiltrosAtivos = useMemo(() => {
    const todosTiposSelecionados = Object.values(filtroTipos).every((v) => v);
    return (
      !todosTiposSelecionados ||
      filtroDataInicio !== "" ||
      filtroDataFim !== "" ||
      filtroNutricionista !== "" ||
      ordenarPor !== "created_at" ||
      ordemDirecao !== "desc"
    );
  }, [filtroTipos, filtroDataInicio, filtroDataFim, filtroNutricionista, ordenarPor, ordemDirecao]);

  // Altera filtro de tipo específico
  const handleTipoChange = useCallback((tipo) => {
    setFiltroTipos((prev) => ({ ...prev, [tipo]: !prev[tipo] }));
  }, []);

  // Limpa todos os filtros
  const limparFiltros = useCallback(() => {
    setFiltroTipos(filtroTiposInicial);
    setFiltroDataInicio("");
    setFiltroDataFim("");
    setFiltroNutricionista("");
    setOrdenarPor("created_at");
    setOrdemDirecao("desc");
  }, []);

  // Todas as anamneses combinadas
  const todasAsAnamneses = useMemo(() => [
    ...anamnesesBase,
    ...anamnesesChild,
    ...returnAnamnese,
    ...foodPlan,
    ...recordatory,
  ], [anamnesesBase, anamnesesChild, returnAnamnese, foodPlan, recordatory]);

  // Aplica filtros
  const anamnesesFiltradas = useMemo(() => {
    return todasAsAnamneses.filter((item) => {
      // Filtro por tipo
      if (!filtroTipos[item.tipo]) return false;

      // Para recordatório, ignorar filtros de data e nutricionista
      if (item.tipo === "recordatorio") return true;

      // Filtro por data
      const dataItem = item.data_consulta || item.data_plano_alimentar;
      if (dataItem) {
        if (filtroDataInicio && dataItem < filtroDataInicio) return false;
        if (filtroDataFim && dataItem > filtroDataFim) return false;
      }

      // Filtro por nutricionista
      if (
        filtroNutricionista &&
        item.nutricionista_responsavel !== filtroNutricionista
      ) {
        return false;
      }

      return true;
    });
  }, [todasAsAnamneses, filtroTipos, filtroDataInicio, filtroDataFim, filtroNutricionista]);

  // Aplica ordenação
  const anamnesesOrdenadas = useMemo(() => {
    return [...anamnesesFiltradas].sort((a, b) => {
      const dataA = new Date(a[ordenarPor] || 0);
      const dataB = new Date(b[ordenarPor] || 0);
      return ordemDirecao === "desc" ? dataB - dataA : dataA - dataB;
    });
  }, [anamnesesFiltradas, ordenarPor, ordemDirecao]);

  return {
    // Estados
    showFilters,
    filtroTipos,
    filtroDataInicio,
    filtroDataFim,
    filtroNutricionista,
    ordenarPor,
    ordemDirecao,
    
    // Setters
    setShowFilters,
    setFiltroDataInicio,
    setFiltroDataFim,
    setFiltroNutricionista,
    setOrdenarPor,
    setOrdemDirecao,
    
    // Valores derivados
    nutricionistasUnicos,
    temFiltrosAtivos,
    todasAsAnamneses,
    anamnesesOrdenadas,
    
    // Funções
    handleTipoChange,
    limparFiltros,
  };
};

export default useAnamneseFilter;
