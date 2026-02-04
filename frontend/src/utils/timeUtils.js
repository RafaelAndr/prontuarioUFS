/**
 * Calcula o tempo de sono entre dois horários
 * @param {string} horario_dorme - Horário que dorme no formato "HH:MM"
 * @param {string} horario_acorda - Horário que acorda no formato "HH:MM"
 * @returns {string|null} Tempo de sono formatado (ex: "8h" ou "8h 30min") ou null se algum horário estiver faltando
 */
export const calcularTempoSono = (horario_dorme, horario_acorda) => {
  if (!horario_dorme || !horario_acorda) return null;

  const [hD, mD] = horario_dorme.split(':').map(Number);
  const [hA, mA] = horario_acorda.split(':').map(Number);

  let total = (hA * 60 + mA) - (hD * 60 + mD);
  if (total < 0) total += 1440; // 24 horas em minutos

  const horas = Math.floor(total / 60);
  const minutos = total % 60;

  return minutos === 0 ? `${horas}h` : `${horas}h ${minutos}min`;
};
