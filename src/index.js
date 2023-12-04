let button = document.querySelector("button");
let div = document.querySelector("div.info");
let compteurClics = 0;
let controller = null;

button.addEventListener("click", () => {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();
    const signal = controller.signal;

    compteurClics += 1;
    button.innerHTML = compteurClics;

    const request = fetch(`https://iut-info.univ-reims.fr/users/jonquet/resources/fetch/echo.php?nb=${compteurClics}`, {signal});
    request.then((response) => response.text())
        .then((text) => {
            div.innerText = `Last response: ${text}`;
        })
        .catch((error) => {
            if (error.name === 'AbortError') {
                console.log('Requête annulée.');
            }
        });
});
