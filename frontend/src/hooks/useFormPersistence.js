import { useEffect, useCallback } from "react";

function useFormPersistence(formKey, formData, setFormData, expirationHours = 24, shouldPersist = true) {
  useEffect(() => {
    if (!shouldPersist) return;
    
    const saved = localStorage.getItem(formKey);
    if (saved) {
      try {
        const { data, timestamp } = JSON.parse(saved);
        const now = new Date().getTime();
        const expirationTime = expirationHours * 60 * 60 * 1000;
        
        if (now - timestamp < expirationTime) {
          setFormData(data);
        } else {
          localStorage.removeItem(formKey);
        }
      } catch (error) {
        console.error("Erro ao carregar dados salvos:", error);
        localStorage.removeItem(formKey);
      }
    }
  }, [formKey, setFormData, expirationHours, shouldPersist]);

  useEffect(() => {
    if (!shouldPersist) return;
    
    if (Object.keys(formData).length > 0) {
      const dataToSave = {
        data: formData,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(formKey, JSON.stringify(dataToSave));
    }
  }, [formData, formKey, shouldPersist]);

  const clearSaved = useCallback(() => {
    localStorage.removeItem(formKey);
  }, [formKey]);

  return { clearSaved };
}

export default useFormPersistence;