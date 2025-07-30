const FilterBox = ({ searchValue, onSearchChange }) => {
  return (
    <div>
      <span>Encuentra países: </span>
      <input id="filter-box" placeholder="Ingrese país" value={searchValue} onChange={onSearchChange} />
    </div>
  )
}

export default FilterBox