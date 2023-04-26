import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Tooltip } from '@chakra-ui/react';
import { HiPlus } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { filterByUsers } from '../../utils/selectoptions';
import InputFilter from '../../components/InputFilter';
import ModalUser from '../../components/ModalUser';
import useUserTable from '../../hooks/useUserTable';
import formatDate from '../../utils/formatDate';
import Loading from '../../components/Loading';

export default function Users() {

  const {
    searchValue,
    searchBy,
    filteredData,
    handleSearchChange,
    handleSelectChange,
    isOpen,
    onOpen,
    onClose,
    mutateDeleteUser,
    handleNewUser,
    handleEditClick,
    isError,
    isLoading,
    selectedUserId,
    defaultValues
  } = useUserTable()

  return (
    <>
      {/* Inserir novo usuario */}
      <Box>
        <button className="ml-auto btn-primary flex items-center gap-2" onClick={handleNewUser}>
          Novo usuario <HiPlus />
        </button>
      </Box>

      {/* Filtro para a tabela */}
      <InputFilter
        searchBy={searchBy}
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
        handleSelectChange={handleSelectChange}
        by={filterByUsers}
      />

      {/* Tabela mostrando todos os usuarios */}
      <TableContainer className="bg-white rounded-lg scroll-1">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone</Th>
              <Th>Nascimento</Th>
              <Th>Cidade</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData?.map(({ usuario, empresas }, index) => (
              <Tr key={index} >
                <Td>{usuario.nome}</Td>
                <Td>{usuario.email}</Td>
                <Td>{usuario.telefone}</Td>
                <Td>{formatDate(usuario.data_nascimento)}</Td>
                <Td>{usuario.cidade_nascimento}</Td>
                <Td className='w-20'>
                  <Tooltip label='Editar'>
                    <button
                      className="ml-auto btn-primary flex items-center gap-2"
                      onClick={() => handleEditClick(usuario.id, {
                        ...usuario,
                        empresas_usuario: empresas.map((e) => ({
                          id: e.id,
                          nome_empresa: e.nome,
                          cnpj: e.cnpj,
                          endereco: e.endereco
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
                      onClick={() => mutateDeleteUser(usuario.id)}
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

      {/* Modal do usuario */}
      <ModalUser
        isOpen={isOpen}
        onClose={onClose}
        id={selectedUserId}
        defaultValues={defaultValues}
      />
    </>
  )
}