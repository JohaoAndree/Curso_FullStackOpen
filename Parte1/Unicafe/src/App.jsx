import { useState } from 'react'

const Button = ({ functionName, value, text }) => {
  return (
    <button onClick={() => functionName(value + 1)}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ textAlign: 'center', border: '0.5px solid black' }}>{text}</td>
      <td style={{ textAlign: 'center', border: '0.5px solid black' }}>{value}</td>
    </tr>
  )
}

const Estadisticas = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No hay feedback</p>
  }
  
  const total = good + neutral + bad
  const promedio = (good - bad) / total
  const porcentajeBuenos = (good / total) * 100

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'center', border: '0.5px solid black' }}>Estadística</th>
          <th style={{ textAlign: 'center', border: '0.5px solid black' }}>Valor</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="Bueno" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Malo" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Promedio" value={promedio.toFixed(2)} />
        <StatisticLine text="Porcentaje de buenos" value={`${porcentajeBuenos.toFixed(1)}%`} />
      </tbody>
    </table>
  )
}

const Titulo = ({ nombreTitulo }) => {
  return <h1>{nombreTitulo}</h1>
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Titulo nombreTitulo='Danos tu opinión' />
      <Button functionName={setGood} value={good} text='Bueno' />
      <Button functionName={setNeutral} value={neutral} text='Neutral' />
      <Button functionName={setBad} value={bad} text='Malo' />
      <Titulo nombreTitulo='Estadísticas' />
      <Estadisticas good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App