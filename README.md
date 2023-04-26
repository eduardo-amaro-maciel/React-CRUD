# Teste para dev React

## Links
- Front-end: Acessar pela parte de Environments do github acessando o primiero link
- Back-end: https://github.com/eduardo-amaro-maciel/backend (Deploy feito na plataforma Render)

## Frameworks usados 
- vite: O Vite fornece código-fonte em ESM nativo permitindo melhor desempenho
- chakra-ui: Componentes de UI
- hookform: Validação de formularios
- tanstack: Facilitador de Querys e Cache de requisições
- axios: Integração do seu projeto React para qualquer serviço de API disponível
- react-icons: Icones
- tailwind: estilização
- react-router-dom: Rotas para a aplicação
- react-input-mask: mascara de inputs (não utilizado)
- react-select: Select com multiplas opções
- zod: integração junto ao react-hook-form para validação
- vitest: Testes (não utilizado)
- react-meta-tags: Melhora no SEO de paginas SPA's (não utilizado)
- supabse: banco de dados
- node.js: uso para o servidor junto com express

<hr>

# Desafio | Fullstack

O teste consiste em implementar uma lista de contatos e empresas. O projeto, obrigatoriamente, deve ser separado em backend e frontend.

## Backend

O backend **deve** ser desenvolvido em `php` e **deve** conter uma API Rest.

O sistema deve conter as seguintes entidades e seus respectivos campos:

- Usuário
    - Nome: obrigatório para preenchimento
    - E-mail: obrigatório para preenchimento
    - Telefone: não obrigatório
    - Data de nascimento: não obrigatório
    - Cidade onde nasceu: não obrigatório
    - Empresas: obrigatório para preenchimento

- Empresa
    - Nome: obrigatório para preenchimento
    - CNPJ: obrigatório para preenchimento
    - Endereço: obrigatório para preenchimento
    - Usuários: obrigatório para preenchimento

A regra de relacionamento para `Usuário` e `Empresa` deve ser de __n para n__

### Banco
Você **deve** utilizar um banco de dados para o sistema. Pode-se escolher qualquer opção que desejar, mas o seguite cenário deve ser levado em consideração:
- O sistema lida com informações sensíveis e preza pela integridade dos dados
- O sistema lida com diferentes entidades relacionadas

Pedimos para que nos sinalize o motivo da escolha do banco no final do documento


## Frontend
O frontend **deve** ser desenvolvido utilizando `react` e **deve** usar os dados fornecidos pela API.

Você **pode** e, de preferência, **deve** utilizar bibliotecas de terceiros.

Deve-se desenvolver uma página de formulário para cada uma das entidades (`Usuario` e `Empresa`). Também deve ser desenvolvida uma página listando todos os usuários e seus respectivos campos, inclusive todas as empresas de que ele faz parte.

Deve-se ter a possibilidade de filtrar os dados conforme cada um dos campos.

Obs: para facilitar, segue uma proposta de layout, você tem liberdade para desenvolver o layout da forma que achar mais adequado.

## Testes
Testes unitários **devem** ser implementados no backend para validação das operações do CRUD.

Testes unitários **devem** ser implementados no frontend para a tela de exibição dos usuários.

Você pode utilizar o framework de sua preferência tanto para o backend quanto para o frontend.

## Ambiente
Aqui na Contato Seguro, utilizamos __Docker__ nos nossos ambientes, então será muito bem visto caso decida utilizar. Principalmente para que tenhamos o mesmo resultado (mesma configuração de ambiente). Caso desenvolva com docker, nos envie junto com o projeto o `docker-compose.yml` e/ou os `Dockerfile´`s.

## Requisitos mínimos
- As 4 operações CRUD, tanto para entidade `Usuário`, quanto para `Empresa`. Todas as operações devem ter rotas específicas no backend.
- O filtro de registros
- Código legível, limpo e seguindo boas práticas de Orientação a Objetos
- Um dump ou DDL do banco de dados
- Testes unitários

## Requisitos bônus
- Utilizar Docker
- Outras entidades e relacionamento entre entidades. Por exemplo: uma entidade `Relatos` ou `Atividades` que tenha `Usuários` e/ou `Empresas` vinculadas.
- Separação em commits, especialmente com boas mensagens de identificação.

# Resposta do participante
Ao desenvolver o projeto, encontrei dificuldades em criar um back-end consistente devido a problemas com deploy e CORS nas plataformas. Inicialmente, tentei desenvolver usando Next.js, mas percebi que ainda não estava maduro o suficiente para o que eu precisava, o que me levou a desenvolver todo o back-end em Supabase e Express.

Além disso, tentei pensar em um novo modelo de layout para a aplicação, buscando deixar o design mais limpo e minimalista, porém por não ter uma boa noção de back-end tinha que parar o que estava fazendo para modificar a API a quase todo instante assim não conseguindo focar 100% na parte do front que era o esperado.

Peço desculpas por não ter conseguido fazer todos os testes solicitados, mas fiz o meu melhor para resolver os desafios que encontrei ao longo do processo de desenvolvimento.
