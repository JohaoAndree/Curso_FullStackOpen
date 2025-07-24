sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: El navegador comienza a ejecutar el código JavaScript que obtiene las notas del servidor.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON con las notas
    deactivate server

    Note right of browser: El navegador renderiza las notas en el DOM.

    Note right of browser: Se llena el formulario con una nueva nota y se envía (sin recargar).

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (body: JSON)
    activate server
    server-->>browser: 201 Created ({"message":"note created"})
    deactivate server

    Note right of browser: El código JavaScript maneja la respuesta y actualiza el estado de la aplicación.
    Note right of browser: El DOM se actualiza con la nueva nota sin recargar la página.