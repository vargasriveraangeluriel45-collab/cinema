/**
 * buscar.js — Motor de búsqueda para Cine Mexicano
 * Centraliza todos los datos de películas y renderiza resultados
 */

/** Elimina tildes/acentos para búsqueda insensible a diacríticos */
function normalizar(str) {
    return String(str)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

const TODAS_LAS_PELICULAS = [
    // ── Contemporáneo ────────────────────────────────────────────
    {
        title: "Amores Perros", year: "2000", director: "A. G. Iñárritu", genre: "Drama, Thriller",
        sinopsis: "Tres historias distintas se cruzan de manera violenta tras un accidente automovilístico en la Ciudad de México.",
        trailerUrl: "https://www.youtube.com/embed/ebvWj98Yui0",
        movieUrl: "https://archive.org/embed/amores-perros-2000_202510",
        poster: "https://i.pinimg.com/736x/e6/07/b8/e607b8e2749668cb43abb8a7ac9b0bee.jpg", seccion: "contemporaneo"
    },
    {
        title: "Roma", year: "2018", director: "Alfonso Cuarón", genre: "Drama",
        sinopsis: "Un año turbulento en la vida de una familia de clase media y su trabajadora doméstica en la Ciudad de México de los 70.",
        trailerUrl: "https://www.youtube.com/embed/6BS27ngZtxg",
        movieUrl: "https://archive.org/embed/roma_20201122",
        poster: "https://i.pinimg.com/1200x/82/79/1a/82791ac7b19206f184deab197f85c8fb.jpg", seccion: "contemporaneo"
    },
    {
        title: "El Infierno", year: "2010", director: "Luis Estrada", genre: "Comedia Negra, Drama",
        sinopsis: "Un hombre regresa a su pueblo natal y se involucra con el narcotráfico en medio de la celebración del Bicentenario.",
        trailerUrl: "https://www.youtube.com/embed/_ZqQ4nBfYRs",
        movieUrl: "https://archive.org/embed/el.-infierno.-dvd-rip.-latino.-ac-3.5.1.www.tuspelisdvdrip.com",
        poster: "https://i.pinimg.com/736x/c0/6a/87/c06a8781bc679f28924932a7167a45e1.jpg", seccion: "contemporaneo"
    },
    {
        title: "Matando Cabos", year: "2004", director: "Alejandro Lozano", genre: "Comedia, Acción",
        sinopsis: "Dos amigos deben conseguir mucho dinero para salvar a su jefe, lo que lleva a un enredo de secuestros y mafiosos.",
        trailerUrl: "https://www.youtube.com/embed/nujJ3sXSU18",
        movieUrl: "https://archive.org/embed/matando.cabos.2004.1080p.webrip.latino",
        poster: "https://i.pinimg.com/736x/97/ba/4e/97ba4e9774c522af5bb00feedabb1913.jpg", seccion: "contemporaneo"
    },
    {
        title: "Güeros", year: "2014", director: "Alonso Ruizpalacios", genre: "Drama, Comedia",
        sinopsis: "Un joven y su hermano emprenden una búsqueda de un legendario músico en medio de una huelga universitaria en 1999.",
        trailerUrl: "https://www.youtube.com/embed/OhlpIT4aj2w",
        movieUrl: "https://archive.org/embed/gueros.2014.720p",
        poster: "https://i.pinimg.com/736x/d5/ff/dc/d5ffdc096e41fbbf9e1cc422f726f267.jpg", seccion: "contemporaneo"
    },
    {
        title: "La Dictadura Perfecta", year: "2014", director: "Luis Estrada", genre: "Sátira, Comedia Negra",
        sinopsis: "Un gobernador se convierte en el salvador de su partido gracias a un escándalo fabricado en los medios de comunicación.",
        trailerUrl: "https://www.youtube.com/embed/Q3BHyQX7FWg",
        movieUrl: "https://archive.org/embed/la-dictadura-perfecta-2014",
        poster: "https://i.pinimg.com/736x/45/ae/2d/45ae2d5075992189f961c778284ebf33.jpg", seccion: "contemporaneo"
    },
    {
        title: "Los Insólitos Peces Gato", year: "2013", director: "C. Sainte-Luce", genre: "Drama",
        sinopsis: "Una joven solitaria forja una relación profunda con una madre enferma y su peculiar familia de cinco hijos.",
        trailerUrl: "https://www.youtube.com/embed/Oi9DfLNglyM",
        movieUrl: "//ok.ru/videoembed/7150700923457?nochat=1",
        poster: "https://i.pinimg.com/736x/fe/a4/f6/fea4f601fee30369b3132a3ba2bfcf1d.jpg", seccion: "contemporaneo"
    },
    {
        title: "Sueño en otro idioma", year: "2017", director: "Ernesto Contreras", genre: "Drama, Romance",
        sinopsis: "Un lingüista intenta grabar a los dos últimos hablantes de una lengua indígena, pero están enemistados.",
        trailerUrl: "https://www.youtube.com/embed/va7ug89VNs4",
        movieUrl: "https://youtu.be/1uP6tsLgDHc?si=JLJdKE1Z0Vb7HQ4K",
        poster: "https://i.pinimg.com/1200x/89/7a/ae/897aae1586970177156bc8349b151c92.jpg", seccion: "contemporaneo"
    },
    {
        title: "Ya No Estoy Aquí", year: "2019", director: "F. Frías de la Parra", genre: "Drama",
        sinopsis: "Después de un conflicto, un joven líder de una pandilla de cumbia en Monterrey debe migrar a Queens, Nueva York.",
        trailerUrl: "https://www.youtube.com/embed/ngl5wCDw840",
        movieUrl: "https://geo.dailymotion.com/player.html?video=x8jqi8u",
        poster: "https://i.pinimg.com/736x/ce/f0/39/cef039405e99c07e033ccf3211d9e262.jpg", seccion: "contemporaneo"
    },
    {
        title: "Amarte Duele", year: "2002", director: "Fernando Sariñana", genre: "Romance, Drama",
        sinopsis: "La trágica historia de amor juvenil entre Renata, de clase alta, y Ulises, de clase baja, en la Ciudad de México.",
        trailerUrl: "https://www.youtube.com/embed/3XfEqRg2FhU",
        movieUrl: "https://archive.org/embed/pelis-latino-3gp.-net.-amarteduelemoviesdvdfull.blogspot.mx",
        poster: "https://i.pinimg.com/1200x/f6/ac/d4/f6acd4ace3555f8530e4be85b3c193e5.jpg", seccion: "contemporaneo"
    },
    {
        title: "Temporada de Patos", year: "2004", director: "Fernando Eimbcke", genre: "Comedia, Drama",
        sinopsis: "Cuatro jóvenes pasan un domingo de calor y aburrimiento en un departamento en Tlatelolco.",
        trailerUrl: "https://www.youtube.com/embed/PdmM4SJApqk",
        movieUrl: "https://youtu.be/Fv-keQeafzw?si=ZyYfRaQuTbQyLp6R",
        poster: "https://i.pinimg.com/736x/37/41/ae/3741ae72d1aa99de04be941837389c30.jpg", seccion: "contemporaneo"
    },
    {
        title: "La Cocina", year: "2024", director: "Alonso Ruizpalacios", genre: "Drama",
        sinopsis: "En la hora punta del almuerzo en un restaurante de Nueva York, la desaparición de dinero pone a prueba a los trabajadores inmigrantes.",
        trailerUrl: "https://www.youtube.com/embed/gqZuW8uq0yA",
        movieUrl: "https://www.hbomax.com/mx/es/movies/la-cocina/0214d315-ae77-454f-9d43-7f2049703e53",
        poster: "https://i.pinimg.com/736x/55/0e/b9/550eb9765c8509fc03b3c0d6ecb80291.jpg", seccion: "contemporaneo"
    },
    {
        title: "Y tu Mamá También", year: "2001", director: "Alfonso Cuarón", genre: "Drama, Aventura",
        sinopsis: "Dos adolescentes y una mujer española de viaje a una playa secreta. Un recorrido por la geografía mexicana.",
        trailerUrl: "https://www.youtube.com/embed/UW1LQbtRuAM",
        movieUrl: "https://archive.org/embed/y-tu-mama-tambien_202511",
        poster: "https://i.pinimg.com/736x/48/f6/09/48f60900e77a624abbf2a07ce371953c.jpg", seccion: "contemporaneo"
    },
    {
        title: "Chicuarotes", year: "2019", director: "Gael García Bernal", genre: "Drama",
        sinopsis: "Dos adolescentes de San Gregorio Atlapulco buscan desesperadamente salir de su pueblo organizando un asalto.",
        trailerUrl: "https://www.youtube.com/embed/ucngKPAo_Co",
        movieUrl: "https://youtu.be/H8yoYybtS3I?si=i6ygedyg1fPXq2jy",
        poster: "https://i.pinimg.com/736x/11/57/b3/1157b3f760ae933a6ab8d05690cfd209.jpg", seccion: "contemporaneo"
    },
    {
        title: "Museo", year: "2018", director: "Alonso Ruizpalacios", genre: "Drama, Thriller",
        sinopsis: "Dos jóvenes de clase media planean y ejecutan el robo de 140 piezas prehispánicas del Museo Nacional de Antropología en 1985.",
        trailerUrl: "https://www.youtube.com/embed/srroDVtCwcY",
        movieUrl: "https://www.netflix.com/mx/title/81032766",
        poster: "https://i.pinimg.com/1200x/82/87/a1/8287a1a1408d9da518ed31f34b5b061f.jpg", seccion: "contemporaneo"
    },
    {
        title: "Bardo", year: "2022", director: "Alejandro G. Iñárritu", genre: "Comedia, Drama",
        sinopsis: "El viaje íntimo de Silverio, un periodista mexicano que cae en una crisis existencial al regresar a su país natal.",
        trailerUrl: "https://www.youtube.com/embed/knbKghKJKrA",
        movieUrl: "https://www.netflix.com/mx/title/81249430",
        poster: "https://i.pinimg.com/736x/a2/79/e6/a279e67b4d9e75510a40774ed5dad03a.jpg", seccion: "contemporaneo"
    },
    {
        title: "Corina", year: "2025", director: "Urzula Barba Hopfner", genre: "Comedia",
        sinopsis: "Corina, una joven con agorafobia, debe vencer sus miedos para encontrar a una misteriosa escritora y salvar su trabajo.",
        trailerUrl: "https://www.youtube.com/embed/6g_BAV-pr4s",
        movieUrl: "https://www.primevideo.com/-/es/detail/Corina/0TAYBCAK770RYWVROUO99N1OAN",
        poster: "https://i.pinimg.com/736x/f0/ff/65/f0ff65a7b746389ab7e35b657f15de57.jpg", seccion: "contemporaneo"
    },
    {
        title: "La vida inmoral de la pareja ideal", year: "2016", director: "Manolo Caro", genre: "Comedia, Drama, Romance",
        sinopsis: "Martina y Lucio se reencuentran 25 años después de una ruptura abrupta y deciden inventarse vidas perfectas.",
        trailerUrl: "https://www.youtube.com/embed/_-eJgS0BILA",
        movieUrl: "https://www.netflix.com/mx/title/80135136",
        poster: "https://i.pinimg.com/736x/dc/50/03/dc5003f9f198958625b48df6c19f5efa.jpg", seccion: "contemporaneo"
    },
    // ── Principal (destacadas) ──────────────────────────────────
    {
        title: "Soy Frankelda", year: "2025", director: "Hermanos Ambriz", genre: "Animación, Terror, Stop Motion",
        sinopsis: "Joven escritora de terror del siglo XIX es llevada al Reino de las Pesadillas para convertirse en la pesadillera real.",
        trailerUrl: "https://www.youtube.com/embed/EE19ga5mq0c",
        movieUrl: "SOLO EN CINES",
        poster: "https://i.pinimg.com/1200x/33/9d/09/339d09110d01ae40f708760230de326b.jpg", seccion: "principal"
    },
    {
        title: "Rudo y Cursi", year: "2008", director: "Carlos Cuarón", genre: "Comedia, Drama, Deportes",
        sinopsis: "Dos hermanos campesinos descubiertos por un scout de fútbol son llevados a la capital, desatando una rivalidad.",
        trailerUrl: "https://www.youtube.com/embed/zAMlwcJchoQ",
        movieUrl: "https://archive.org/embed/RUDOYCURSI",
        poster: "https://i.pinimg.com/736x/69/3a/2a/693a2ad1c948fbde0340aa62c153b1d0.jpg", seccion: "principal"
    },
    {
        title: "No nos moverán", year: "2024", director: "Pierre Saint-Martin", genre: "Drama",
        sinopsis: "Abogada obsesionada con encontrar al soldado que mató a su hermano durante la masacre de Tlatelolco en 1968.",
        trailerUrl: "https://www.youtube.com/embed/CsXQHU87UtM",
        movieUrl: "https://mubi.com/es/mx/films/no-nos-moveran",
        poster: "https://i.pinimg.com/736x/4f/dd/e4/4fdde44567f626891367af3d950f42dc.jpg", seccion: "principal"
    },
    // ── Cine de Oro ─────────────────────────────────────────────
    {
        title: "Los Olvidados", year: "1950", director: "Luis Buñuel", genre: "Drama, Neorrealismo",
        sinopsis: "Niños y adolescentes viven en la miseria de los suburbios de la Ciudad de México, donde la violencia es su única realidad.",
        trailerUrl: "https://www.youtube.com/embed/yFghaQAZdYg?si=DFzjduvOCRMOC2Ws",
        movieUrl: "https://archive.org/embed/LosOlvidadosLuisBunuel1950Spanish",
        poster: "https://i.pinimg.com/1200x/ae/c9/12/aec9123abae3b8aa384a4b78ffd9bda0.jpg", seccion: "cine_oro"
    },
    {
        title: "Nosotros los Pobres", year: "1948", director: "Ismael Rodríguez", genre: "Melodrama",
        sinopsis: "La vida de Pepe 'El Toro', un carpintero del barrio humilde, su ahijada 'Chachita' y su novia Celia.",
        trailerUrl: "https://www.youtube.com/embed/9HG_qiDsf-c?si=15nzYMjCysvy7i8w",
        movieUrl: "https://archive.org/embed/nosotros-los-pobres-1948",
        poster: "https://i.pinimg.com/736x/93/20/32/932032843385ff62a7e25e246a44448c.jpg", seccion: "cine_oro"
    },
    {
        title: "Dos Tipos de Cuidado", year: "1953", director: "Ismael Rodríguez", genre: "Comedia Ranchera",
        sinopsis: "Dos amigos de la infancia se enfrentan por el amor de la misma mujer en una historia llena de música y enredos.",
        trailerUrl: "https://www.youtube.com/embed/ep4NpklX90I?si=I2UOUhN25v6OhmHW",
        movieUrl: "https://archive.org/embed/001.-colorizada-pedro-infante-peliculas-completas-dos-tipos-de-cuidado-1952-colo",
        poster: "https://i.pinimg.com/736x/05/50/06/0550067c2c5417d2e1540480a8b85882.jpg", seccion: "cine_oro"
    },
    {
        title: "Aventurera", year: "1949", director: "Alberto Gout", genre: "Cine de Rumberas, Melodrama",
        sinopsis: "Una joven engañada y obligada a trabajar en un cabaret como 'rumbera', asciende socialmente sin olvidar su tragedia.",
        trailerUrl: "https://www.youtube.com/embed/nmJVyecb_JY?si=dcKPncvlkBuQpxaY",
        movieUrl: "https://youtu.be/pGBDfAWExAw?si=eY4JvjlN9EiXKsmf",
        poster: "https://a.ltrbxd.com/resized/film-poster/9/1/3/5/6/91356-aventurera-0-1000-0-1500-crop.jpg?v=60d612bd67", seccion: "cine_oro"
    },
    {
        title: "El Ángel Exterminador", year: "1962", director: "Luis Buñuel", genre: "Drama, Surrealismo",
        sinopsis: "Un grupo de burgueses tras una cena se encuentran inexplicablemente incapaces de salir de un lujoso salón.",
        trailerUrl: "https://www.youtube.com/embed/ysYG7qaz29c?si=XYzT2Day6ZlaqqAF",
        movieUrl: "https://archive.org/embed/angel-exterminador-el-1962-1080p",
        poster: "https://i.pinimg.com/736x/1f/7f/a7/1f7fa76e0e0b6a9161854b8bbefff872.jpg", seccion: "cine_oro"
    },
    {
        title: "María Candelaria", year: "1944", director: "Emilio Fernández", genre: "Drama, Romance",
        sinopsis: "La trágica historia de amor de una joven indígena en Xochimilco, enfrentada a la superstición y el prejuicio.",
        trailerUrl: "https://www.youtube.com/embed/3qgYGde9xoM?si=ctS8im_a3Sbz7nEZ",
        movieUrl: "https://youtu.be/Rh-I7j1YYwE?si=ZqPXlWS_rakBxWUG",
        poster: "https://i.pinimg.com/736x/4c/76/9f/4c769f5ec8768c4f266ebfe9be053c81.jpg", seccion: "cine_oro"
    },
    {
        title: "Macario", year: "1960", director: "Roberto Gavaldón", genre: "Fantasía, Drama",
        sinopsis: "Un campesino anhela comer un pavo entero él solo, y su deseo lo lleva a un encuentro con La Muerte.",
        trailerUrl: "https://www.youtube.com/embed/JQGcu3j4CdM?si=5Y-lK7uD1LcqGD4T",
        movieUrl: "https://archive.org/embed/macario_202209",
        poster: "https://i.pinimg.com/1200x/ff/f0/a7/fff0a73e5082c6c7b219211848c45810.jpg", seccion: "cine_oro"
    },
    {
        title: "La Ley de Herodes", year: "1999", director: "Luis Estrada", genre: "Sátira, Comedia Negra",
        sinopsis: "Un basurero nombrado alcalde interino sucumbe a la corrupción y el abuso de poder.",
        trailerUrl: "https://www.youtube.com/embed/D-i9VJpKI3U?si=vCO2Ssj_3JWnCfkh",
        movieUrl: "https://archive.org/embed/LUISESTRADALaLeyDeHerodes1999",
        poster: "https://i.pinimg.com/1200x/c1/01/f3/c101f345963ba4bb83ad299397fa3af7.jpg", seccion: "cine_oro"
    },
    {
        title: "Ahí está el Detalle", year: "1940", director: "Juan Bustillo Oro", genre: "Comedia, Enredos",
        sinopsis: "Un malentendido con un perro provoca una cadena de confusiones que involucra a un millonario y un desempleado.",
        trailerUrl: "https://www.youtube.com/embed/GSqP7R4YYrY?si=_o-BfW8z7p1T1q75",
        movieUrl: "https://archive.org/embed/ahiestaeldetalle1940",
        poster: "https://i.pinimg.com/736x/89/a4/7a/89a47a5bdfee5576abcb023662f29a95.jpg", seccion: "cine_oro"
    },
    {
        title: "El Esqueleto de la Señora Morales", year: "1960", director: "Rogelio A. González", genre: "Comedia Negra",
        sinopsis: "Un taxidermista vive oprimido por su esposa hasta que ella desaparece y él comienza a tener una vida social más activa.",
        trailerUrl: "https://www.youtube.com/embed/3JrZ_yTLOfI?si=qRXxtnYdgyk0uLYZ",
        movieUrl: "https://archive.org/embed/el-esqueleto-de-la-senora-morales-1960",
        poster: "https://a.ltrbxd.com/resized/film-poster/9/3/4/8/5/93485-the-skeleton-of-mrs-morales-0-1000-0-1500-crop.jpg?v=6dd1f6224d", seccion: "cine_oro"
    },
];

// ─── Lógica de búsqueda ──────────────────────────────────────
(function () {
    const params = new URLSearchParams(window.location.search);
    const query = (params.get('q') || '').trim().toLowerCase();
    const resultsEl = document.getElementById('search-results');
    const queryEl = document.getElementById('search-query');
    const countEl = document.getElementById('search-count');

    if (queryEl) queryEl.textContent = params.get('q') || '';

    if (!query) {
        if (resultsEl) resultsEl.innerHTML = '<p class="search-empty">Escribe algo en el buscador del menú para ver resultados.</p>';
        return;
    }

    const nq = normalizar(query); // query ya normalizada

    const resultados = TODAS_LAS_PELICULAS.filter(p =>
        normalizar(p.title).includes(nq) ||
        normalizar(p.director).includes(nq) ||
        normalizar(p.genre).includes(nq) ||
        p.year.includes(nq)
    );

    if (countEl) countEl.textContent = resultados.length;

    if (!resultsEl) return;

    if (resultados.length === 0) {
        resultsEl.innerHTML = `<p class="search-empty">No se encontraron películas con "<strong>${escapeHtml(params.get('q'))}</strong>".</p>`;
        return;
    }

    resultsEl.innerHTML = resultados.map(p => `
    <div class="movie-card"
      data-title="${escapeHtml(p.title)}"
      data-year="${p.year}"
      data-director="${escapeHtml(p.director)}"
      data-genre="${escapeHtml(p.genre)}"
      data-sinopsis="${escapeHtml(p.sinopsis)}"
      data-trailer-url="${p.trailerUrl}"
      data-movie-url="${p.movieUrl}"
      onclick="mostrarDetalle(this)"
      role="button" tabindex="0"
      onkeypress="if(event.key==='Enter') mostrarDetalle(this);"
    >
      <div class="movie-image">
        <img src="${p.poster}" alt="Póster ${escapeHtml(p.title)}" style="width:100%;height:100%;object-fit:cover"/>
      </div>
      <div class="movie-info">
        <h4>${escapeHtml(p.title)}</h4>
        <span class="year">${p.year}</span>
        <p>Director: ${escapeHtml(p.director)}</p>
        <p>Género: ${escapeHtml(p.genre)}</p>
        <span class="search-tag">${labelSeccion(p.seccion)}</span>
      </div>
    </div>
  `).join('');
}());

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function labelSeccion(s) {
    return s === 'cine_oro' ? '🏆 Cine de Oro'
        : s === 'contemporaneo' ? '🎬 Contemporáneo'
            : '⭐ Destacadas';
}
