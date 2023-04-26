export default function InputFilter({ searchBy, searchValue, handleSearchChange, handleSelectChange, by }) {
    
    return (
        <>
            <div className="flex gap-4 my-10">
                <input
                    type="text"
                    name=""
                    id=""
                    className="input-primary w-full"
                    placeholder="Pesquisar"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <select
                    name=""
                    id=""
                    className="input-primary"
                    value={searchBy}
                    onChange={handleSelectChange}
                >
                    {by.map(({label, value}, index) => (
                        <option key={index} value={value}>{label}</option>
                    ))}
                </select>
            </div>
        </>
    )
}