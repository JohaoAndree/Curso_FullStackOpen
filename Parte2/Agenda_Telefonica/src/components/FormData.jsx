const FormData = ({ onSubmit, name, onNameChange, number, onNumberChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                Nombre: <input id="form-box" value={name} onChange={onNameChange} />
            </div>
            <div className="form-group">
                Número: <input id="form-box" value={number} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit" className="submit-button">Añadir</button>
            </div>
        </form>
    )
}

export default FormData