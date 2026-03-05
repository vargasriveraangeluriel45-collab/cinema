let currentNewsUrl = "";
let currentVideoUrl = "";

/**
 * Muestra el modal de detalles de la Noticia y deshabilita el scroll principal.
 * @param {HTMLElement} card - El elemento de la tarjeta de noticia que fue clickeado.
 */
function mostrarDetalleNoticia(card) {
    const title = card.getAttribute("data-title");
    const source = card.getAttribute("data-director");
    const tags = card.getAttribute("data-genre");
    const description = card.getAttribute("data-sinopsis");

    currentVideoUrl = card.getAttribute("data-trailer-url");
    currentNewsUrl = card.getAttribute("data-movie-url");

    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-director").textContent = source;
    document.getElementById("modal-genre").textContent = tags;
    document.getElementById("modal-sinopsis").textContent = description;

    document.getElementById("modal-trailer-iframe").src = currentVideoUrl;

    // 2. Lógica para el botón
    const btnIrSitio = document.getElementById("btn-ir-sitio");

    if (currentNewsUrl) {
        btnIrSitio.textContent = "IR AL SITIO DE LA NOTICIA";
        btnIrSitio.disabled = false;
        btnIrSitio.classList.remove("disabled-cines");
    } else {
        btnIrSitio.textContent = "SITIO NO DISPONIBLE";
        btnIrSitio.disabled = true;
        btnIrSitio.classList.add("disabled-cines");
    }

    document.getElementById("movie-modal").classList.add("is-active");

    document.body.style.overflow = "hidden";
   

    document.getElementById("trailer-container").style.display = "flex";
}


function cerrarDetalleNoticia() {
    const modal = document.getElementById("movie-modal");
    const trailerIframe = document.getElementById("modal-trailer-iframe");
   
    trailerIframe.src = ""
    modal.classList.remove("is-active");


    document.body.style.overflow = "auto";
   
}


function abrirSitioNoticia() {
    if (currentNewsUrl) {
        window.open(currentNewsUrl, "_blank");
        cerrarDetalleNoticia();
    } else {
        alert("URL del sitio de noticias no definida.");
    }
}


document.addEventListener("DOMContentLoaded", function() {

    document
        .getElementById("movie-modal")
        .addEventListener("click", function (e) {
            
            if (e.target.id === "movie-modal") {
                cerrarDetalleNoticia();
            }
        });
});



function mostrarDetalle(card) {
    mostrarDetalleNoticia(card);
}
function cerrarDetalle() {
    cerrarDetalleNoticia();
}
function abrirPelicula() {
    abrirSitioNoticia();
}