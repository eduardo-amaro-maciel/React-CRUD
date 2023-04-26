import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react';

export default function useCompanyModal( isOpen, onClose, id, defaultValues ) {

    const [users, setUsers] = useState()
    const [companyUsers, setCompanyUsers] = useState([])
    const [errorSelectUsers, setErrorSelectUsers] = useState()
    const queryClient = useQueryClient()
    

    const companyFormSchema = z.object({
        name: z.string().nonempty({ message: "Obrigatório" }).min(3, 'No minimo 3 caracteres'),
        cnpj: z.string().nonempty({ message: "Obrigatório" }).max(18, 'Formato inválido'),
        address: z.string().nonempty({ message: "Obrigatório" }).min(3, 'Preencha o endereço completo'),
    });
    

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(companyFormSchema)
    })
    

    const { data: allUsers, isError, isLoading } = useQuery({
        queryKey: ['getUsersLabel'], 
        queryFn: api.getUsers,
        onSuccess: ({ data }) => {
            const options = data.map(({ usuario }) => ({
                value: usuario.id,
                label: usuario.nome
            }));
            
            setUsers(options)
        }
    })


    const { mutate : mutateNewCompany } = useMutation({
        mutationFn: async (json) => await api.postNewComapany(json),
        onSuccess: () => {
            queryClient.invalidateQueries(['companies'])
            onModalCloser()
        },
        onError: (data) => {
            console.log('deu erro', data)
        }
    })

    const { mutate : mutateEditCompany } = useMutation({
        mutationFn: async (json) => await api.putCompany(json),
        onSuccess: () => {
            queryClient.invalidateQueries(['companies'])
            onModalCloser()
        },
        onError: (data) => {
            console.log('deu erro', data)
        }
    })


    function saveCompany(data) {
        
        if (companyUsers.length < 1) {
            setErrorSelectUsers('Selecione pelo menos 1 usuario')

        } else {
            setErrorSelectUsers()
            const json = {
                nome: data.name,
                usuarios: companyUsers.map(obj => obj.value),
                cnpj: data.cnpj,
                endereco: data.address
            }

            id ? mutateEditCompany({...json, id}) : mutateNewCompany(json)
        }
    }


    function handleClear() {
        reset();
        setCompanyUsers()
    }


    function onModalCloser() {
        handleClear()
        onClose()
    }

    useEffect(() => {
        if (id) {
            setValue('name', defaultValues.nome)
            setValue('cnpj', defaultValues.cnpj)
            setValue('address', defaultValues.endereco)

            const usersOnEditCompany  = defaultValues?.empresas_usuario.map(usuario => ({
                value: usuario.id,
                label: usuario.nome_usuario
            }));

            setCompanyUsers(usersOnEditCompany)
        }
    }, [id, defaultValues])

    return {
        companyFormSchema,
        users,
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
        setCompanyUsers
    }
}