export const filterByUsers = [
    {
        value: "Nome",
        label: "Nome"
    },
    {
        value: "Email",
        label: "Email"
    },
    {
        value: "Telefone",
        label: "Telefone"
    },
    {
        value: "Nascimento",
        label: "Nascimento"
    },
    {
        value: "Cidade",
        label: "Cidade"
    },
]

export const filterByCompanies = [
    {
        value: "Nome da Empresa",
        label: "Nome da Empresa"
    },
    {
        value: "CNPJ",
        label: "CNPJ"
    },
    {
        value: "Endereço da Empresa",
        label: "Endereço da Empresa"
    }
]

export const filterByUsersAndCompanies = [...filterByUsers, ...filterByCompanies]