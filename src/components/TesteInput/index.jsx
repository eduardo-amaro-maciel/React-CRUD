import { useForm, Controller } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select';

const schema = z.object({
    select: z.array(
        z.object({
            value: z.string(),
        })
    ).length(1, 'É necessário no minimo 1 item'),
});

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function TesteInput() {

    const { formState: { errors }, handleSubmit, control } = useForm({
        mode: 'all',
        resolver: zodResolver(schema),
        defaultValues: {
            select: []
        }
    });

    function enviar(data) {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(enviar)}>
            <Controller
                control={control}
                name="select"
                render={({
                    field: { onChange, onBlur, value, name, ref },
                }) => (
                    <Select
                        options={options}
                        onChange={onChange}
                        isMulti={true}
                        value={value}
                        ref={ref}
                        name={name}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.select && <span>{errors.select.message}</span>}
            <button>send</button>
        </form>
    )
}

// exemplo input cep com react mask 

// import React from "react";
// import InputMask from "react-input-mask";
// // import InputMask from "react-text-mask";
// import { useForm, Controller } from "react-hook-form";

// import "./styles.css";

// export default function App() {
//   const [user, setUser] = React.useState({});
//   const { register, handleSubmit, control, reset } = useForm();

//   function onSubmit(data) {
//     console.log(data);
//   }

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input
//           type="text"
//           name="name"
//           placeholder="User full name"
//           ref={register}
//           // defaultValue={user.name}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="User email"
//           ref={register}
//           // defaultValue={user.email}
//         />
//         <Controller
//           disableUnderline
//           placeholder="999.999.999-99"
//           as={InputMask}
//           control={control}
//           maskChar=""
//           mask="999.999.999-99"
//           name="cpf"
//         />
//         <button type="submit">SEND</button>
//       </form>
//     </div>
//   );
// }
