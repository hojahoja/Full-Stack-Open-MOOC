:::mermaid
sequenceDiagram
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (form_data)
    activate server
    Note left of server:  form_data added to <br> serverside table.
    server-->>browser: redirect /exampleapp/notes
    deactivate server
    

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS File
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: Javacscript File
    deactivate server
    Note right of browser: Browser executes <br> javascript to get json file 

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file (that has the new information)
    deactivate server
    Note right of browser: Browser executes callback <br> to render the notes
:::
