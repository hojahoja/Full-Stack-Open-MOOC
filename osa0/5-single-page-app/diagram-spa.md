:::mermaid
sequenceDiagram
    participant browser
    participant server
    

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS File
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: Javacscript File
    deactivate server
    Note right of browser: Browser executes <br> javascript to get json file 

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON file (that has the new information)
    deactivate server
    Note right of browser: Browser executes javascript <br> to render the notes
:::