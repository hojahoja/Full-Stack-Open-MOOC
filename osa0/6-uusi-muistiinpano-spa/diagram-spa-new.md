:::mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser executes javascript that prevents <br> default action of forms.
    Note right of browser: The information from the form is handled in <br> the code and added to the already loaded list.
    Note Right of browser: The list is then rendedred again <br> to show the changes.

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (Stringified JSON)
    activate server
    Note left of server:  the JSON-String is handled serverside and <br> the new data added to the existing table.
    deactivate server
:::