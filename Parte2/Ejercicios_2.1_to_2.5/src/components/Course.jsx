// Renderiza el encabezado del curso
// Recibe: course (string) - nombre del curso
const Header = (props) => {
    return (
        <header>
            <h2>{props.course}</h2>
        </header>
    )
}

// Muestra una parte individual del curso con su nombre y ejercicios
// Recibe: name (string), exercises (number)
const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
}

// Renderiza todas las partes del curso
// Recibe: parts (array) - array de objetos con id, name y exercises
const Content = (props) => {
    return (
        <div>
            {props.parts.map((part) => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}

// Calcula y muestra el total de ejercicios del curso
// Recibe: parts (array) - array de objetos con exercises
const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p><strong>
            Number total of exercises: {total}
        </strong></p>
    )
}

// Componente principal que renderiza un curso completo
// Recibe: course (object) - objeto con name, id y parts
const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course
