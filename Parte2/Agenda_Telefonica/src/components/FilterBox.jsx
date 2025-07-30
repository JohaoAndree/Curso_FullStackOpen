const FilterBox = ({ searchValue, onSearchChange }) => {
    return (
        <div>
            <input id="filter-box" placeholder="Ingrese nombre o número" value={searchValue} onChange={onSearchChange} />
        </div>
    )
}

export default FilterBox