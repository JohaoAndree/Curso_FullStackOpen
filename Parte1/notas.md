# Creación de una aplicación React

## Creación de una aplicación React con Vite
1. Ejecutamos el comando:
    - `npm create vite@latest part1 -- --template react`
    - la terminal nos pedirá escoger el framework, escogemos react.
    - ahora pedirá una variante, como este curso enseñará react con javascript, elegimos javascript + SWC ya que leí que SWC es un compilador de JavaScript escrito en Rust que es más rápido que Babel, por lo tanto, se compila más rápido.
    Nota: en mi curso de Programación Web de la universidad, utilizamos Vite como herramienta de construcción, la librería react y typescript como lenguaje de programación así que será interesante hacer un proyecto en javascript.

2. Navegamos al directorio del proyecto:
    - `cd part1`

3. Instalamos las dependencias:
    - `npm install`

4. Para iniciar la aplicación, ejecutamos el siguiente comando:
    - `npm run dev`
    Nota: en este punto la aplicación ya se encuentra creada y en funcionamiento.

## Configuración inicial de la aplicación

1. Estableciendo código inicial:
    - Abrimos el archivo `src/main.jsx` y lo modificamos para que se vea así:
    ```javascript
    import ReactDOM from 'react-dom/client'

    import App from './App'

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    ```
    Nota: aquí importamos el componente `App` que se encuentra en el archivo `src/App.jsx`.
    - Abrimos el archivo `src/App.jsx` y lo modificamos para que se vea así:
    ```javascript
    const App = () => {
        return (
            <div>
                <p>Hello world</p>
            </div>
        )
    }

    export default App
    ```
    Nota: aquí creamos un componente funcional llamado `App` que retorna un elemento `div` con un párrafo que dice "Hello world".

2. Eliminando archivos innecesarios:
    - Eliminamos los archivos `src/assets`, `src/App.css` y `src/index.css` ya que no los necesitamos en este momento.

### Notas
- Los componentes de React los escribimos principalmente en archivos `.jsx` o `.js`, aunque también podemos usar `.tsx` si estamos trabajando con TypeScript.
- JSX es una sintaxis que se utiliza en React para describir cómo debería lucir la interfaz de usuario. Es una mezcla de JavaScript y HTML que permite escribir componentes de manera más intuitiva.
- Los componentes de React son bloques de construcción reutilizables que encapsulan la lógica y la presentación de una parte de la interfaz de usuario. Pueden ser componentes de clase o componentes funcionales, siendo estos últimos más comunes en las versiones recientes de React. **Se definen como funciones de flecha o funciones normales que retornan JSX**.
- Se pueden pasar datos a los componentes a través de las **props** (propiedades), que son argumentos que se pasan al componente cuando se utiliza. De esta forma:
    ```javascript
    const Componente = (props) => {
        return <div>{props.mensaje}</div>
    }
    ```
    Nota: aquí `mensaje` es una prop que se le pasa al componente `Componente`. Las props pueden ser strings "incrustados en el código"(hardcodeadas) o resultados de expresiones JavaScript, como variables o funciones, en ese caso, se utilizan llaves `{}` para envolver la expresión:
    ```javascript
    const App = () => {
        const nombre = "Alice";
        return (
            <div>
                <Componente mensaje={nombre} />
            </div>
        );
    };
    ```
- Los componentes de React se deben definir siempre con la primera letra en mayúscula, ya que React los identifica como componentes y no como elementos HTML. Por ejemplo, `App` es un componente válido, mientras que `app` no lo es.
- En JavaScript las constantes se definen con `const`, las variables que pueden cambiar su valor se definen con `let` y las variables que no deberían cambiar su valor se definen con `var`. En React, es común utilizar `const` para definir componentes y funciones, ya que generalmente no se espera que cambien su referencia.
- En JavaScript se sa el método `forEach` para iterar sobre un array y se le puede pasar como parámetro una función que se ejecutará para cada elemento del array. Por ejemplo:
    ```javascript
    const lista = [1, 2, 3];
    lista.forEach((elemento) => {
        console.log(elemento);
    });
    ```
- En JavaScript puedes agregar un elemento a una lista con el método `push`, pero en React, a menudo se usan técnicas de programación funcional y una característica importante es la inmutabilidad. En lugar de modificar directamente un array, se crea una nueva copia del array con el nuevo elemento agregado. Por ejemplo:
    ```javascript
    const lista = [1, 2, 3];
    const nuevaLista = lista.concat(4); // [1, 2, 3, 4]
    ```
- En React, es común utilizar el método `map` para transformar un array en otro array, aplicando una función a cada elemento. Por ejemplo:
    ```javascript
    const lista = [1, 2, 3];
    const nuevaLista = lista.map((elemento) => elemento * 2);
    console.log(nuevaLista); // [2, 4, 6]
    const listaHtml = lista.map((elemento) => '<li>' + elemento + '</li>');
    console.log(listaHtml); // ['<li>1</li>', '<li>2    </li>', '<li>3</li>']
    ```
- Los elemento de un array se pueden asignar a variables utilizando la desestructuración. Por ejemplo:
    ```javascript
    const lista = [1, 2, 3, 4, 5];
    const [a, b, c, ...resto] = lista;
    console.log(a); // 1
    console.log(b); // 2
    console.log(c); // 3
    console.log(resto); // [4, 5]
    ```
- En JavaScript, es común usar objetos literales que sucede al enumerar propiedades y valores. Por ejemplo:
    ```javascript
    const persona = {
        nombre: 'Alice',
        edad: 30,
        ciudad: 'Madrid'
    };
    console.log(persona.nombre); // Alice
    console.log(persona['edad']); // 30
    ```