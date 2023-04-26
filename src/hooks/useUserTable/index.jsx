import { useState } from 'react';
import useFilter from '../../hooks/useFilter'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useDisclosure } from '@chakra-ui/react';

export default function useUserTable() {

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [defaultValues, setDefaultValues] = useState(null);
    const queryClient = useQueryClient()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['users'], queryFn: api.getUsers
    })

    const {
        searchValue,
        searchBy,
        filteredData,
        handleSearchChange,
        handleSelectChange
    } = useFilter(data)

    const handleEditClick = (userId, userDefaultValues) => {
        setSelectedUserId(userId);
        setDefaultValues({
            ...userDefaultValues
        })
        onOpen();
    };

    const handleNewUser = () => {
        setSelectedUserId(null);
        setDefaultValues(null)
        onOpen();
    }


    const { mutate: mutateDeleteUser } = useMutation({
        mutationFn: async (id) => await api.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
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
        mutateDeleteUser,
        handleNewUser,
        handleEditClick,
        isError,
        isLoading,
        selectedUserId,
        defaultValues
    }
}