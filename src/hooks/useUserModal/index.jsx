import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/api'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react';

export default function useUserModal( isOpen, onClose, id, defaultValues ) {

    const [companies, setCompanies] = useState()
    const [userCompanies, setUserCompanies] = useState([])
    const [errorCompanie, setErrorCompanie] = useState()
    const queryClient = useQueryClient()
    

    const userFormSchema = z.object({
        name: z.string().nonempty({ message: "Obrigatório" }).min(3, 'No minimo 3 caracteres'),
        email: z.string().email({ message: "E-mail inválido" }).nonempty({ message: "E-mail é obrigatório" }),
        phone: z.string().nonempty({ message: "Obrigatório" }).min(10, 'Número inválido'),
        dateOfBirth: z.string(),
        cityWhereBorn: z.string()
    });
    

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: zodResolver(userFormSchema)
    })
    

    const { data: allCompanies, isError, isLoading } = useQuery({
        queryKey: ['getCompanies'], 
        queryFn: api.getCompanies,
        onSuccess: ({ data }) => {
            const options = data.map(({ empresa }) => ({
                value: empresa.id,
                label: empresa.nome
            }));

            setCompanies(options)
        }
    })


    const { mutate : mutateNewUser } = useMutation({
        mutationFn: async (json) => await api.postNewUser(json),
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
            onModalCloser()
        },
        onError: (data) => {
            console.log('deu erro', data)
        }
    })

    const { mutate : mutateEditUser } = useMutation({
        mutationFn: async (json) => await api.putUser(json),
        onSuccess: () => {
            queryClient.invalidateQueries(['users'])
            onModalCloser()
        },
        onError: (data) => {
            console.log('deu erro', data)
        }
    })


    function saveUser(data) {
        
        if (userCompanies.length < 1) {
            setErrorCompanie('Selecione pelo menos 1 empresa')

        } else {
            setErrorCompanie()
            const json = {
                nome: data.name,
                empresas: userCompanies.map(obj => obj.value),
                email: data.email,
                data_nascimento: data.dateOfBirth,
                cidade_nascimento: data.cityWhereBorn,
                telefone: data.phone
            }
            
            id ? mutateEditUser({...json, id}) : mutateNewUser(json)
        }
    }


    function handleClear() {
        reset();
        setUserCompanies()
    }


    function onModalCloser() {
        handleClear()
        onClose()
    }


    useEffect(() => {
        if (id) {
            setValue('name', defaultValues.nome)
            setValue('email', defaultValues.email)
            setValue('phone', defaultValues.telefone)
            setValue('dateOfBirth', defaultValues.data_nascimento)
            setValue('cityWhereBorn', defaultValues.cidade_nascimento)

            const companiesOnEditUser = defaultValues?.empresas_usuario.map(empresa => ({
                value: empresa.id,
                label: empresa.nome_empresa
            }));

            setUserCompanies(companiesOnEditUser)
        }
    }, [id, defaultValues])

    return {
        userFormSchema,
        companies,
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
        setUserCompanies
    }
}