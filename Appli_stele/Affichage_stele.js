var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: {
        type: 'image',
        url: 'stele.jpg',
        buildPyramid: false
    }
});

var overlays = [
    //{ id: 'zone1', px: 0.18, py: 0.2, width: 0.76, height: 0.056, text: "Description de la zone 1" },
    //{ id: 'zone2', px: 0.18, py: 0.27, width: 0.77, height: 0.056, text: "Description de la zone 2" },
    //{ id: 'zone3', px: 0.18, py: 0.31, width: 0.76, height: 0.058, text: "Description de la zone 3" },
    //{ id: 'zone4', px: 0.18, py: 0.36, width: 0.765, height: 0.065, text: "Description de la zone 4" },
    //{ id: 'zone5', px: 0.19, py: 0.42, width: 0.71, height: 0.069, text: "Description de la zone 5" },
    //{ id: 'zone6', px: 0.5, py: 0.485, width: 0.4, height: 0.069, text: "Description de la zone 6" },
    { id: 'Ligne 1', px: 0.23, py: 0.878, width: 0.57, height: 0.06, text: "ὑπὲρ βασιλίσσης \nPour la reine" },
    { id: 'Ligne 2', px: 0.23, py: 0.938, width: 0.56, height: 0.065, text: "Κλεοπάτρας θε- \nCléopâtre, dé-" },
    { id: 'Ligne 3', px: 0.23, py: 1.005, width: 0.56, height: 0.071, text: "ᾶς Φιλοπάτωρ  \n-esse, qui aime son père," },
    { id: 'Ligne 4-5', px: 0.23, py: 1.08, width: 0.55, height: 0.14, text: "Τό/πος Σνοναιτια/κῆς συνόδου \nsiège de l'association de Snonais" },
    { id: 'Ligne 6', px: 0.23, py: 1.22, width: 0.54, height: 0.065, text: "ὧν συναγογὸς \ndont le président est" },
    { id: 'Ligne 7', px: 0.23, py: 1.28, width: 0.54, height: 0.065, text: "Ὀννῶφρις λεσώνης \nOnnôphris, directeur (du temple)" },
    { id: 'Ligne 8', px: 0.315, py: 1.335, width: 0.35, height: 0.055, text: "(ἔτους) αʹ, Ἐπὶφ αʹ \nAn 1, mois d'Epeiph, jour 1" },
    { id: 'Traduction complète', px: 0, py: 0, width: 1, height: 1.6, text: "Pour la reine \nCléopâtre, dé- \n-esse, qui aime son père, \nsiège de l'association de Snonais \ndont le président est \nOnnôphris, directeur (du temple) \nAn 1, mois d'Epeiph, jour 1" }
];

overlays.forEach(overlay => {
    viewer.addOverlay({
        element: createOverlayElement(overlay.id),
        location: new OpenSeadragon.Rect(overlay.px, overlay.py, overlay.width, overlay.height)
    });
});

function createOverlayElement(id) {
    var element = document.createElement('div');
    element.id = id;
    element.className = 'highlight';
    return element;
}

var currentHighlightedZone = null;

function highlightZone(zoneIndex) {
    var overlay = overlays[zoneIndex - 1];
    document.getElementById('info').innerText = overlay.text;
    
    // Enlever la bordure de toutes les surbrillances
    document.querySelectorAll('.highlight').forEach(el => {
        el.style.border = 'none';
    });
    
    // Enregistrer la zone actuellement surlignée
    currentHighlightedZone = overlay.id;

    // Zoom automatique sur la zone
    viewer.viewport.fitBounds(new OpenSeadragon.Rect(
        overlay.px,
        overlay.py,
        overlay.width,
        overlay.height
    ), true);
    
    setTimeout(() => {
        document.getElementById(overlay.id).style.border = '2px solid red';
    }, 500);
}

viewer.addHandler('zoom', function() {
    if (currentHighlightedZone) {
        setTimeout(() => {
            document.getElementById(currentHighlightedZone).style.border = '2px solid red';
        }, 100);
    }
});