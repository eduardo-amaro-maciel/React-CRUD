import Select from 'react-select';

export default function MultiSelect({ set, value, labels }) {

    return (
        <Select
            styles={{
                control: (baseStyles, state) => {
                    return {
                        ...baseStyles,
                        '&:hover': {
                            border: '2px solid #17171b',
                        },
                        backgroundColor: 'white',
                        padding: '.20rem',
                        color: '#17171b',
                        border: '2px solid #17171b',
                        borderRadius: '8px'
                    }
                },
            }}
            isMulti
            options={labels}
            value={value}
            onChange={(selectedOptions) =>
                set(selectedOptions)
            }
        />
    )
}