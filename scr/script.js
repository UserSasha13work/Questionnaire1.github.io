$(document).ready(function() {

    let userLang = navigator.language || navigator.userLanguage;

    console.log(userLang);
    if(userLang=="ru"){
        let l=userLang;
        window.location.assign("./ru/ru.html");
        console.log(l);
    }
    else{
        window.location.assign("./en/en.html");
    }

});