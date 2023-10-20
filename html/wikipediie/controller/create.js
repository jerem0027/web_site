/**
 * Ajout une section à la page de creation
 */
function addSection(){
    let nbSection = document.getElementsByClassName("section").length;
    let section = "section" + nbSection;
    let content = "content" + nbSection;
    
    // Representation d'une section
    let newsection = "<div class='container section'>" + 
    "<div>" +
        "<div class='input'>" + 
            "<label for='" + section +"'> Section  </label> <br>" +
            "<input type='text' maxlength=128 name='" + section +"'>" + 
        "</div>" +
        "<br>" +
        "<div class='input'>" +
            "<label for='" + content + "'> Contenu </label><br>" +
            "<textarea name='" + content + "' rows=10>" +
            "</textarea>" +
        "</div>" +
    "</div>";

    // ajout la section
    document.getElementById('btn_create').insertAdjacentHTML("beforebegin", newsection);
}
