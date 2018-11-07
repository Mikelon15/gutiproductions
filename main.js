function onResponsiveToggle() {
    var x = document.getElementById("topNav");
    if (x.className === "mdc-top-app-bar__row") {
        x.className += " responsive";
    } else {
        x.className = "mdc-top-app-bar__row";
    }
}