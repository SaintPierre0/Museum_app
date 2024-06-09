var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
    tileSources: {
        type: 'image',
        url: 'papyrus.jpg',
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
    { id: 'Ligne 1', px: 0.19, py: 0.68, width: 0.74, height: 0.06, text: "Διογένης Θρασυμήδει χαίρειν. \nDiogène à Thrasimède, salut !" },
    { id: 'Ligne 2', px: 0.2, py: 0.735, width: 0.74, height: 0.06, text: "σύνταξον μετρῆσαι Θεοδώρωι \nOrdonne de mesurer à Théodôros" },
    { id: 'Ligne 3', px: 0.2, py: 0.8, width: 0.77, height: 0.06, text: "καὶ Θευγένει καὶ Νικάνορι (εἰκοσιπενταρούροις) ἐπι\nà Théogénès, et à Nikanor, possesseurs de 25 aroures, épi-" },
    { id: 'Ligne 4', px: 0.2, py: 0.86, width: 0.77, height: 0.06, text: "γόνοις δάνειον εἰς κάτεργον ὃ ἀποδώ-\ngones, à titre de prêt pour frais de travaux, qu’ils resti-" },
    { id: 'Ligne 5', px: 0.2, py: 0.93, width: 0.755, height: 0.065, text: "σουσιν ἐγ νέων ἅμα τοῖς ἐκφορίοις ἐν \ntueront sur la nouvelle récolte en même temps que les redevances pour" },
    { id: 'Ligne 6', px: 0.2, py: 1.0, width: 0.72, height: 0.065, text: "τῶι λϛ (ἔτει) κριθοπυροῦ ἢ κριθῆς \nl'an 36, en blé-orge ou orge" },
    { id: 'Ligne 7', px: 0.2, py: 1.082, width: 0.72, height: 0.067, text: "παλαιᾶς (ἀρτάβας) εἴκοσι . ἔρρωσο. (ἔτους) λε \nvieille : 20 artabes. Porte-toi bien. An 35" },
    { id: 'Ligne 8', px: 0.725, py: 1.135, width: 0.18, height: 0.058, text: "Θῶυθ λ.\nMois de Thôt, jour 30." },
    { id: 'Traduction complète', px: 0, py: 0, width: 1, height: 1.3, text: "Diogène à Thrasimède, salut !\nOrdonne de mesurer à Théodôros\nà Théogénès, et à Nikanor, possesseurs de 25 aroures, épi-\ngones, à titre de prêt pour frais de travaux, qu'ils resti-\ntueront sur la nouvelle récolte en même temps que les redevances pour\nl'an 36, en blé-orge ou orge\nvieille : 20 artabes. Porte-toi bien. An 35\nMois de Thôt, jour 30." }
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