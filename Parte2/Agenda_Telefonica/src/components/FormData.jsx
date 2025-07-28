const FormData = ({ onSubmit, name, onNameChange, number, onNumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Nombre: <input value={name} onChange={onNameChange} />
            </div>
            <div>
                Número: <input value={number} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">Añadir</button>
            </div>
        </form>
    )
}

export default FormData