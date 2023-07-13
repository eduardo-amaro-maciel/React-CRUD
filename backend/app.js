require('dotenv').config()

const instaceOfSupabase = require('@supabase/supabase-js')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const DB_URL = process.env.DB_URL
const DB_KEY = process.env.DB_KEY

const supabase = instaceOfSupabase.createClient(DB_URL, DB_KEY)

const app = express()

app.use(bodyParser.json());
//app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())


app.get('/user/getAllUsers', async (req, res) => {

    const { data, error } = await supabase
        .from('usuario_empresa')
        .select(`
        usuario:usuario_id ( id, nome, email, telefone, data_nascimento, cidade_nascimento ),
        empresa:empresa_id ( id, nome, cnpj, endereco )
    `)

    return res.status(200).json({ data });
})


app.post('/user/deleteUser', async (req, res) => {

    const { id } = req.body

    if (!id) return res.status(404).json({ msg: 'O id do usuario é requerido' });

    const { data: dataUsuarioEmpresaDelete, error: errorUsuarioEmpresaDelete } = await supabase
        .from('usuario_empresa')
        .delete()
        .eq('usuario_id', id);

    if (errorUsuarioEmpresaDelete) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    const { data, error } = await supabase
        .from('usuario')
        .delete()
        .eq('id', id)

    if (error) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    return res.status(200).json({ msg: 'Usuário foi deletado com sucesso!' });
})


// app.get('/user/getUsers', async (req, res) => {
//     const { data, error } = await supabase
//         .from('usuario_empresa')
//         .select(`
//             usuario:usuario_id ( id, nome, email, telefone, data_nascimento, cidade_nascimento ),
//             empresa:empresa_id ( id, nome, cnpj, endereco )
//         `)

//     // Cria um objeto com as informações de cada usuário e suas respectivas empresas
//     const groupedData = data.reduce((acc, { usuario, empresa }) => {
//         if (acc[usuario.id]) {
//             acc[usuario.id].empresas.push(empresa);
//         } else {
//             acc[usuario.id] = {
//                 usuario,
//                 empresas: [empresa]
//             }
//         }
//         return acc;
//     }, {});

//     // Cria um array com os objetos de usuário e suas empresas
//     const transformedData = Object.values(groupedData);

//     return res.status(200).json({ data: transformedData });
// })


app.post('/user/postUser', async (req, res) => {

    const { nome, email, telefone, data_nascimento, cidade_nascimento, empresas } = req.body

    if (!nome) return res.status(404).json({ msg: 'Preencha o nome' });

    if (!empresas) return res.status(404).json({ msg: 'O usuario deve estar em alguma empresa' });

    if (!email) return res.status(404).json({ msg: 'Preencha o email' });

    if (!telefone) return res.status(404).json({ msg: 'Preencha o telefone' });

    //if (!data_nascimento) return res.status(404).json({ msg: 'Preencha a data de nascimento' });

    //if (!cidade_nascimento) return res.status(404).json({ msg: 'Preencha a cidade de nascimento' });

    const { data: usuario, error: errorInsertUsuario } = await supabase.from('usuario').insert({
        nome,
        email,
        telefone,
        data_nascimento,
        cidade_nascimento
    }).select();

    if (errorInsertUsuario) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    const userId = usuario[0].id
    //const newEmpresas = JSON.parse(empresas)
    const newEmpresas = empresas

    // Insert new companies
    const { data: dataUsuarioEmpresaInsert, error: errorUsuarioEmpresaInsert } = await supabase
        .from('usuario_empresa')
        .insert(newEmpresas.map(empresa_id => ({ usuario_id: userId, empresa_id })));

    if (errorUsuarioEmpresaInsert) {
        return res.status(404).json({ msg: 'Ocorreu um erro ao inserir o usuario' })
    }

    return res.status(200).json({ msg: "Usuario criado com sucesso" });
})


app.put('/user/putUser', async (req, res) => {

    const { id, nome, email, telefone, data_nascimento, cidade_nascimento, empresas } = req.body

    if (!id) return res.status(404).json({ msg: 'O id do usuario é requerido' });

    if (!nome) return res.status(404).json({ msg: 'Preencha o nome' });

    if (!empresas) return res.status(404).json({ msg: 'O usuario deve estar em alguma empresa' });

    if (!email) return res.status(404).json({ msg: 'Preencha o email' });

    if (!telefone) return res.status(404).json({ msg: 'Preencha o telefone' });

    // if (!data_nascimento) return res.status(404).json({ msg: 'Preencha a data de nascimento' });

    // if (!cidade_nascimento) return res.status(404).json({ msg: 'Preencha a cidade de nascimento' });

    //const newEmpresas = JSON.parse(empresas)
    const newEmpresas = empresas

    // Deletar todas as empresas
    const { data: dataUsuarioEmpresaDelete, error: errorUsuarioEmpresaDelete } = await supabase
        .from('usuario_empresa')
        .delete()
        .eq('usuario_id', id);

    if (errorUsuarioEmpresaDelete) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }


    // Relacionar o usuario com as novas empresas
    const { data: dataUsuarioEmpresaInsert, error: errorUsuarioEmpresaInsert } = await supabase
        .from('usuario_empresa')
        .insert(newEmpresas.map(empresa_id => ({ usuario_id: id, empresa_id })));

    if (errorUsuarioEmpresaInsert) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }


    // Editar o proprio usuario
    const { data: dataPutUsuarios, error: errorPutUsuarios } = await supabase
        .from('usuario')
        .update({ nome, email, telefone, data_nascimento, cidade_nascimento })
        .eq('id', id)

    if (errorPutUsuarios) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    return res.status(200).json({ msg: 'Usuário foi atualizado com sucesso!' });
})


app.post('/company/deleteCompany', async (req, res) => {

    const { id } = req.body

    if (!id) return res.status(404).json({ msg: 'O id da empresa é requerido' });

    const { data: dataDeleteUsuarioEmpresa, error: errorDeleteUsuarioEmpresa } = await supabase
        .from('usuario_empresa')
        .delete()
        .eq('empresa_id', id)

    if (errorDeleteUsuarioEmpresa) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    const { data: dataDeleteEmpresa, error: errorDeleteEmpresa } = await supabase
        .from('empresa')
        .delete()
        .eq('id', id)

    if (errorDeleteEmpresa) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    return res.status(200).json({ msg: 'Empresa foi deletada com sucesso!' });
})


app.get('/company/getAllCompanies', async (req, res) => {

    const { data, error } = await supabase
        .from('empresa')
        .select('*')

    if (error) {
        return res.status(400).json({ msg: "Ocorreu um erro" })
    }

    const output = {
        "data": data.map(empresa => {
            return {
                "empresa": {
                    "id": empresa.id,
                    "nome": empresa.nome,
                    "cnpj": empresa.cnpj,
                    "endereco": empresa.endereco
                }
            };
        })
    };

    return res.status(200).json({ data: output.data });
})


// app.get('/company/getCompanies', async (req, res) => {

//     // const { data, error } = await supabase
//     //     .from('empresa')
//     //     .select('*')

//     // if (error) {
//     //     return res.status(400).json({ msg: "Ocorreu um erro" })
//     // }

//     // return res.status(200).json({ data });


//     const { data, error } = await supabase
//         .from('usuario_empresa')
//         .select(`
//         usuario:usuario_id ( id, nome, email, telefone, data_nascimento, cidade_nascimento ),
//         empresa:empresa_id ( id, nome, cnpj, endereco )
//     `)

//     // Cria um objeto com as informações de cada usuário e suas respectivas empresas
//     const groupedData = data.reduce((acc, { empresa, usuario }) => {
//         if (acc[empresa.id]) {
//             acc[empresa.id].usuarios.push(usuario);
//         } else {
//             acc[empresa.id] = {
//                 empresa,
//                 usuarios: [usuario]
//             }
//         }
//         return acc;
//     }, {});

//     // Cria um array com os objetos de usuário e suas empresas
//     const transformedData = Object.values(groupedData);

//     return res.status(200).json({ data: transformedData });
// })


app.get('/company/getCompany', async (req, res) => {

    const { id } = req.body

    if (!id) return res.status(404).json({ msg: 'O id da empresa é requerido' });

    const { data, error } = await supabase
        .from('empresa')
        .select('*')
        .eq('id', id)

    if (error) {
        return res.status(400).json({ msg: "Ocorreu um erro" })
    }

    return res.status(200).json({ data });
})


app.post('/company/postCompany', async (req, res) => {

    const { nome, cnpj, endereco, usuarios } = req.body

    if (!nome) return res.status(404).json({ msg: 'Preencha o nome' });

    if (!cnpj) return res.status(404).json({ msg: 'Preencha o cnpj' });

    if (!endereco) return res.status(404).json({ msg: 'Preencha o endereco' });

    if (!usuarios) return res.status(404).json({ msg: 'Preencha os usuarios' });

    const { data: dataCompany, error: errorCompany } = await supabase
        .from('empresa')
        .insert({ nome, cnpj, endereco })
        .select()

    if (errorCompany) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    const companyId = dataCompany[0].id

    // Insert new users
    const { data: dataUsuarioEmpresaInsert, error: errorUsuarioEmpresaInsert } = await supabase
        .from('usuario_empresa')
        .insert(usuarios.map(usuario_id => ({ usuario_id, empresa_id: companyId })));

    return res.status(200).json({ msg: 'Empresa criada com sucesso!' });
})


app.put('/company/putCompany', async (req, res) => {


    const { id, nome, cnpj, endereco, usuarios } = req.body

    if (!id) return res.status(404).json({ msg: 'O id da empresa é requerido' });

    if (!nome) return res.status(404).json({ msg: 'Preencha o nome' });

    if (!cnpj) return res.status(404).json({ msg: 'Preencha o cnpj' });

    if (!endereco) return res.status(404).json({ msg: 'Preencha o endereco' });

    if (!usuarios) return res.status(404).json({ msg: 'Preencha os usuarios' });

    // const { data, error } = await supabase
    //     .from('empresa')
    //     .update({ nome, cnpj, endereco })
    //     .eq('id', id)

    // if (error) {
    //     return res.status(404).json({ msg: "Ocorreu um erro" })
    // }

    // return res.status(200).json({ msg: 'Empresa foi atualizado com sucesso!' });

    // Deletar todas as empresas
    const { data: dataUsuarioEmpresaDelete, error: errorUsuarioEmpresaDelete } = await supabase
        .from('usuario_empresa')
        .delete()
        .eq('empresa_id', id);


    if (errorUsuarioEmpresaDelete) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }


    // Relacionar o usuario com as novas empresas
    const { data: dataUsuarioEmpresaInsert, error: errorUsuarioEmpresaInsert } = await supabase
        .from('usuario_empresa')
        .insert(usuarios.map(usuario_id => ({ usuario_id, empresa_id: id })));

    if (errorUsuarioEmpresaInsert) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    // Editar a propria empresa
    const { data: dataPutUsuarios, error: errorPutUsuarios } = await supabase
        .from('empresa')
        .update({ nome, cnpj, endereco })
        .eq('id', id)

    if (errorPutUsuarios) {
        return res.status(404).json({ msg: "Ocorreu um erro" })
    }

    return res.status(200).json({ msg: 'Usuário foi atualizado com sucesso!' });
})


// app.get('/teste', async (req, res) => {

//     const { data } = await supabase
//         .from('usuario')
//         .select('*')

//     let array = []

//     await Promise.all(

//         data.map(async (user) => {

//             const { data: empresasUsuario } = await supabase
//                 .from('usuario_empresa')
//                 .select('empresa_id')
//                 .eq('usuario_id', user.id)

//             await Promise.all(empresasUsuario.map(async (empresa) => {
//                 const { data: empresasSelecionadas } = await supabase
//                     .from('empresa')
//                     .select('*')
//                     .eq('id', empresa.empresa_id)

//                     const obj = {
//                         user,
//                         empresasSelecionadas
//                     }

//                     array.push(obj)
//             }))

//         })
//     )

//     // para cada usuario pegar as empresa que ele participa


//     // tipo de retorno esperado 

//     /**
//      * caso o usuario tenha empresa no nome
//         {
//             "usuario": {
//                 "id": 56,
//                 "nome": "Caroline Ester Helena Aragão",
//                 "email": "reta7012@uorak.com",
//                 "telefone": "(71) 2821-8368",
//                 "data_nascimento": "24/02/1967",
//                 "cidade_nascimento": "Salvador"
//             },
//             "empresa": {
//                 "id": 15,
//                 "nome": "João e Lara Lavanderia Ltda",
//                 "cnpj": "61.678.441/0001-31",
//                 "endereco": "Rua Haiashi Ishimoto"
//             }
//         },
//         {
//             "usuario": {
//                 "id": 57,
//                 "nome": "Levi Murilo Breno Cavalcanti",
//                 "email": "sada1578@uorak.com",
//                 "telefone": "(38) 3873-9264",
//                 "data_nascimento": "06/04/1944",
//                 "cidade_nascimento": "Montes Claros"
//             },
//             "empresa": {
//                 "id": 16,
//                 "nome": "Roberto e Rafael Limpeza Ltda",
//                 "cnpj": "27.243.110/0001-30",
//                 "endereco": "Rodovia Raposo Tavares"
//             }
//         },


//         caso o usuario não tenha nenhuma empresa no nome:

//         {
//             "usuario": {
//                 "id": 56,
//                 "nome": "Caroline Ester Helena Aragão",
//                 "email": "reta7012@uorak.com",
//                 "telefone": "(71) 2821-8368",
//                 "data_nascimento": "24/02/1967",
//                 "cidade_nascimento": "Salvador"
//             },
//             "empresa": {

//             }
//         },
//      */

//     return res.status(200).json({ array });
// })



// esse pode ser usado em companies and users
// app.get('/teste', async (req, res) => {
//     const { data } = await supabase.from('usuario').select('*');

//     const array = [];

//     for (const user of data) {
//         const { data: empresasUsuario } = await supabase
//             .from('usuario_empresa')
//             .select('empresa_id')
//             .eq('usuario_id', user.id);

//         if (empresasUsuario.length === 0) {
//             // Se o usuário não tem nenhuma empresa, adicione um objeto de usuário sem empresas ao array
//             array.push({
//                 usuario: user,
//                 empresa: {}
//             });
//         } else {
//             // Para cada empresa do usuário, adicione um objeto de usuário com a empresa correspondente ao array
//             for (const empresa of empresasUsuario) {
//                 const { data: empresasSelecionadas } = await supabase
//                     .from('empresa')
//                     .select('*')
//                     .eq('id', empresa.empresa_id);

//                 const obj = {
//                     usuario: user,
//                     empresa: empresasSelecionadas[0]
//                 };

//                 array.push(obj);
//             }
//         }
//     }

//     return res.status(200).json({ data: array });
// });

app.get('/user/getUsers', async (req, res) => {
    const { data: usuarios } = await supabase
        .from('usuario')
        .select('*')

    const array = await Promise.all(
        usuarios.map(async (usuario) => {
            const { data: empresas } = await supabase
                .from('usuario_empresa')
                .select('empresa_id')
                .eq('usuario_id', usuario.id)

            const empresasSelecionadas = await Promise.all(
                empresas.map(async (empresa) => {
                    const { data: empresaData } = await supabase
                        .from('empresa')
                        .select('*')
                        .eq('id', empresa.empresa_id)

                    return empresaData[0] || {}
                })
            )

            return {
                usuario,
                empresas: empresasSelecionadas,
            }
        })
    )

    return res.status(200).json({ data: array })
})


app.get('/company/getCompanies', async (req, res) => {
    const { data: empresas } = await supabase
      .from('empresa')
      .select('*')
  
    const array = await Promise.all(
      empresas.map(async (empresa) => {
        const { data: usuarios } = await supabase
          .from('usuario_empresa')
          .select('usuario_id')
          .eq('empresa_id', empresa.id)
  
        const usuariosSelecionados = await Promise.all(
          usuarios.map(async (usuario) => {
            const { data: usuarioData } = await supabase
              .from('usuario')
              .select('*')
              .eq('id', usuario.usuario_id)
  
            return usuarioData[0] || {}
          })
        )
  
        return {
          empresa,
          usuarios: usuariosSelecionados,
        }
      })
    )
  
    return res.status(200).json({ data: array })
  })
  



app.listen(4000)