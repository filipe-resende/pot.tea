import { useState, useEffect } from 'react';

export function useUserName() {
  const [userName, setUserName] = useState<string>('');

  // Carregar nome do localStorage ao montar o componente
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Salvar nome no localStorage
  const saveUserName = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem('userName', trimmedName);
      setUserName(trimmedName);
    }
  };

  // Limpar nome do localStorage
  const clearUserName = () => {
    localStorage.removeItem('userName');
    setUserName('');
  };

  return {
    userName,
    saveUserName,
    clearUserName
  };
}
