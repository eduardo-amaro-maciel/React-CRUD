import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import useFilter from '../../hooks/useFilter';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import InputFilter from '../../components/InputFilter';
import { filterByUsersAndCompanies } from '../../utils/selectoptions';
import formatDate from '../../utils/formatDate';
import Loading from '../../components/Loading';

export default function All() {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['usersAndCompanies'], queryFn: api.getUsersAndCompanies, defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    }
  })

  const { searchValue, searchBy, filteredData, handleSearchChange, handleSelectChange } = useFilter(data)

  return (
    <div className="">
      
      {/* Filtro para a tabela */}
      <InputFilter 
        searchBy={searchBy}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        by={filterByUsersAndCompanies}
      />

      {/* Tabela mostrando todos os usuarios e suas empresas */}
      <TableContainer className="bg-white rounded-lg scroll-1">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Nascimento</Th>
              <Th>Cidade</Th>
              <Th>Nome da Empresa</Th>
              <Th>CNPJ da Empresa</Th>
              <Th>Endereço da Empresa</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map(({ usuario, empresa }, index) => (
              <Tr key={index}>
                <Td>{usuario.nome}</Td>
                <Td>{usuario.email}</Td>
                <Td>{usuario.telefone}</Td>
                <Td>{formatDate(usuario.data_nascimento)}</Td>
                <Td>{usuario.cidade_nascimento}</Td>
                <Td>{empresa.nome}</Td>
                <Td>{empresa.cnpj}</Td>
                <Td>{empresa.endereco}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}