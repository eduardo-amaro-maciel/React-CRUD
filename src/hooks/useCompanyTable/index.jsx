import { useState } from 'react';
import useFilter from '../../hooks/useFilter'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useDisclosure } from '@chakra-ui/react';

export default function useUserTable() {

    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [defaultValues, setDefaultValues] = useState(null);
    const queryClient = useQueryClient()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['companies'], queryFn: api.getCompaniesLabel
    })

    const {
        searchValue,
        searchBy,
        filteredData,
        handleSearchChange,
        handleSelectChange
    } = useFilter(data)

    const handleEditClick = (companyId, companyDefaultValues) => {
        setSelectedCompanyId(companyId);
        setDefaultValues({
            ...companyDefaultValues
        })
        onOpen();
    };

    const handleNewCompany = () => {
        setSelectedCompanyId(null);
        setDefaultValues(null)
        onOpen();
    }


    const { mutate: mutateDeleteCompany } = useMutation({
        mutationFn: async (id) => await api.deleteCompany(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['companies'])
        },
        onError: (data) => {
            console.log('deu erro', data)
        }
    })


    return {
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
    }
}