const FilterBox = ({ searchValue, onSearchChange }) => {
    return (
        <div>
            <input value={searchValue} onChange={onSearchChange} />
        </div>
    )
}

export default FilterBox