import { Tooltip, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { HiPlus } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { filterByCompanies } from '../../utils/selectoptions';
import InputFilter from '../../components/InputFilter';
import ModalCompany from '../../components/ModalCompany';
import useCompanyTable from '../../hooks/useCompanyTable'
import Loading from '../../components/Loading';

export default function Companies() {

  const { 
    searchValue,
    searchBy,
    filteredData,
    handleSearchChange,
    handleSelectChange,
    isOpen,
    onOpen,
    onClose,
    mutateDeleteCompany,
    handleNewCompany,
    handleEditClick,
    isError,
    isLoading,
    selectedCompanyId,
    defaultValues 
  } = useCompanyTable()
  
  return (
    <>
      {/* Inserir nova compania */}
      <Box>
        <button className="ml-auto btn-primary flex items-center gap-2" onClick={handleNewCompany}>
          Nova empresa <HiPlus />
        </button>
      </Box>

      {/* Filtro para a tabela */}
      <InputFilter
        searchBy={searchBy}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        by={filterByCompanies}
      />

      {/* Tabela mostrando todas as empresas */}
      <TableContainer className="bg-white rounded-lg scroll-1">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CNPJ</Th>
              <Th>Endereço</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData?.map(({ usuarios, empresa }, index) => (
              <Tr key={index} >
                <Td>{empresa.nome}</Td>
                <Td>{empresa.cnpj}</Td>
                <Td>{empresa.endereco}</Td>
                <Td className='w-20'>
                  <Tooltip label='Editar'>
                    <button
                      className="ml-auto btn-primary flex items-center gap-2"
                      onClick={() => handleEditClick(empresa.id, {
                        ...empresa,
                        empresas_usuario: usuarios.map((e) => ({
                          id: e.id,
                          nome_usuario: e.nome,
                          email: e.email,
                          telefone: e.telefone,
                          data_nascimento: e.data_nascimento,
                          cidade_nascimento: e.cidade_nascimento
                        }))
                      })}
                    >
                      <AiFillEdit />
                    </button>
                  </Tooltip>
                </Td>
                <Td className='w-20'>
                  <Tooltip label='Remover'>
                    <button
                      className="ml-auto btn-primary flex items-center gap-2"
                      onClick={() => mutateDeleteCompany(empresa.id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal da compania */}
      <ModalCompany 
        isOpen={isOpen} 
        onClose={onClose} 
        id={selectedCompanyId}
        defaultValues={defaultValues}
      />
    </>
  )
}