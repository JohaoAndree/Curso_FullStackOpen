const Country = ({ country, onShow }) => {
  return (
    <div>
      <li className="country-item">
        {country.name.common}
        <button className="show-button" onClick={() => onShow(country.name.common)}>
          Mostrar
        </button>
      </li>
    </div>
  )
}

export default Country