import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormErrorMessage } from '@chakra-ui/react'
import MultiSelect from '../MultiSelect';
import useUserModal from "../../hooks/useUserModal"
import ErrorMessage from '../ErrorMessage';

export default function ModalUser({ isOpen, onClose, id, defaultValues }) {

    const {
        companies,
        userFormSchema,
        errorCompanie,
        register,
        handleSubmit,
        errors,
        setValue,
        allCompanies,
        isError,
        isLoading,
        handleClear,
        saveUser,
        onModalCloser,
        userCompanies,
        setUserCompanies,
    } = useUserModal(isOpen, onClose, id, defaultValues)

    return (
        <Modal isOpen={isOpen} onClose={onModalCloser} isCentered size={'lg'}>
            <form onSubmit={handleSubmit(saveUser)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{id ? 'Editar Usuario' : 'Adicionar Usuario'}</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody className='flex flex-col gap-2'>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Nome:</label>
                            <input type="text" className='input-secondery' {...register('name')} />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>E-mail:</label>
                            <input type="text" className='input-secondery' {...register('email')} />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </div>
                        <div className='flex gap-3'>
                            <div className='container-input-modal'>
                                <label className='label-input-modal'>Telefone:</label>
                                <input type="tel" className='input-secondery' {...register('phone')} />
                                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
                            </div>
                            <div className='container-input-modal'>
                                <label className='label-input-modal'>Data de nascimento:</label>
                                <input type="date" className='input-secondery' {...register('dateOfBirth')} />
                                {errors.dateOfBirth && <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>}
                            </div>
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Cidade onde nasceu:</label>
                            <input type="text" className='input-secondery' {...register('cityWhereBorn')} />
                            {errors.cityWhereBorn && <ErrorMessage>{errors.cityWhereBorn.message}</ErrorMessage>}
                        </div>
                        <div className='container-input-modal'>
                            <label className='label-input-modal'>Empresas:</label>
                            <MultiSelect
                                set={setUserCompanies}
                                value={userCompanies}
                                labels={companies}
                            />
                            {errorCompanie && <ErrorMessage>{errorCompanie}</ErrorMessage>}
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
