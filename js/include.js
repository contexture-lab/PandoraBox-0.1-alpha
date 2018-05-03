function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function pboper() {
    include("js/bootstrap.js");
    include("js/pbmapset.js");
    include("js/pbmap.js");
    include("js/oper.js");
    var gmurl = "https://maps.googleapis.com/maps/api/js?key="+mapkey+"&callback=initMap&libraries=geometry";
    include(gmurl);
}

function pbunit() {
    include("js/bootstrap.js");
    include("js/pbmapset.js");
    include("js/pbmap.js");
    include("js/unit.js");
    var gmurl = "https://maps.googleapis.com/maps/api/js?key="+mapkey+"&callback=initMap&libraries=geometry";
    include(gmurl);
}

function pbauth() {
    include("js/bootstrap.js");
    include("js/auth.js");
}
