import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage } from '@chakra-ui/react'
import MultiSelect from '../MultiSelect';
import useCompanyModal from "../../hooks/useCompanyModal"
import ErrorMessage from '../ErrorMessage';

export default function ModalCompany({ isOpen, onClose, id, defaultValues }) {

    const {
        users,
        companyFormSchema,
        errorSelectUsers,
        register,
        handleSubmit,
        errors,
        setValue,
        allUsers,
        isError,
        isLoading,
        handleClear,
        saveCompany,
        onModalCloser,
        companyUsers,
        setCompanyUsers,
    } = useCompanyModal(isOpen, onClose, id, defaultValues)

    return (
        <Modal isOpen={isOpen} onClose={onModalCloser} isCentered size={'lg'}>
            <form onSubmit={handleSubmit(saveCompany)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{id ? 'Editar Empresa' : 'Adicionar Empresa'}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody className='flex flex-col gap-2'>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Nome:</label>
                            <input type="text" className='input-secondery' {...register('name')} />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>CNPJ:</label>
                            <input type="text" className='input-secondery' {...register('cnpj')} placeholder='xx.xxx.xxx/0001-xx' />
                            {errors.cnpj && <ErrorMessage>{errors.cnpj.message}</ErrorMessage>}
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Endereço:</label>
                            <input type="text" className='input-secondery' {...register('address')} />
                            {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Usuarios:</label>
                            <MultiSelect
                                set={setCompanyUsers}
                                value={companyUsers}
                                labels={users}
                            />
                            {errorSelectUsers && <ErrorMessage>{errorSelectUsers}</ErrorMessage>}
                        </div>
                    </ModalBody>

                    <ModalFooter className='gap-5'>
                        <button className='btn-primary' onClick={handleClear}>Limpar</button>
                        <button className='btn-primary'>{id ? 'Salvar' : 'Enviar'}</button>
                    </ModalFooter>

                </ModalContent>
            </form>
        </Modal>
    )
}
