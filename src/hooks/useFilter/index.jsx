import { useState, useMemo } from 'react';

export default function useFilter(data, defaultSearch) {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState(defaultSearch ? 'Nome da Empresa' : 'Nome');

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleSelectChange(event) {
    const value = event.target.value;

    setSearchBy(value);
  }

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return data?.data || [];
    }

    const lowerSearchValue = searchValue ? searchValue.toLowerCase() : '';

    return (data?.data || []).filter(({ usuario, empresa }) => {
      switch (searchBy) {
        case 'Nome':
          return usuario?.nome.toLowerCase().includes(lowerSearchValue);
        case 'Email':
          return usuario?.email.toLowerCase().includes(lowerSearchValue);
        case 'Telefone':
          return usuario?.telefone.toLowerCase().includes(lowerSearchValue);
        case 'Nascimento':
          return usuario?.data_nascimento.toLowerCase().includes(lowerSearchValue);
        case 'Cidade':
          return usuario?.cidade_nascimento.toLowerCase().includes(lowerSearchValue);
        case 'Nome da Empresa':
          return empresa?.nome.toLowerCase().includes(lowerSearchValue);
        case 'CNPJ':
          return empresa?.cnpj.toLowerCase().includes(lowerSearchValue);
        case 'Endereço da Empresa':
          return empresa?.endereco.toLowerCase().includes(lowerSearchValue);
        default:
          return true;
      }
    });
  }, [data, searchValue, searchBy]);

  return {
    searchValue,
    searchBy,
    filteredData,
    handleSearchChange,
    handleSelectChange,
  };
}
