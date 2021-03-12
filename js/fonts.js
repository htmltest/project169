var html = document.documentElement;

var fontsfile = document.createElement('link');
fontsfile.href = pathTemplate + 'css/fonts.css';
fontsfile.rel = 'stylesheet';
document.head.appendChild(fontsfile);

if (sessionStorage.fontsLoaded) {
    html.classList.add('fonts-loaded');
} else {
    var script = document.createElement('script');
    script.src = pathTemplate + 'js/fontfaceobserver.js';
    script.async = true;

    script.onload = function () {
        var Raleway300 = new FontFaceObserver('Raleway', {
            weight: '300'
        });
        var Raleway400 = new FontFaceObserver('Raleway', {
            weight: 'normal'
        });
        var Raleway500 = new FontFaceObserver('Raleway', {
            weight: '500'
        });
        var Raleway600 = new FontFaceObserver('Raleway', {
            weight: '600'
        });
        var Raleway700 = new FontFaceObserver('Raleway', {
            weight: 'bold'
        });
        var Raleway900 = new FontFaceObserver('Raleway', {
            weight: '900'
        });

        Promise.all([
            Raleway300.load(),
            Raleway400.load(),
            Raleway500.load(),
            Raleway600.load(),
            Raleway700.load(),
            Raleway900.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}