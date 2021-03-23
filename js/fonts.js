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
        var GraphikLCG300 = new FontFaceObserver('GraphikLCG', {
            weight: '300'
        });
        var GraphikLCG400 = new FontFaceObserver('GraphikLCG', {
            weight: 'normal'
        });
        var GraphikLCG500 = new FontFaceObserver('GraphikLCG', {
            weight: '500'
        });
        var GraphikLCG600 = new FontFaceObserver('GraphikLCG', {
            weight: '600'
        });
        var GraphikLCG700 = new FontFaceObserver('GraphikLCG', {
            weight: 'bold'
        });
        var GraphikLCG900 = new FontFaceObserver('GraphikLCG', {
            weight: '900'
        });

        Promise.all([
            GraphikLCG300.load(),
            GraphikLCG400.load(),
            GraphikLCG500.load(),
            GraphikLCG600.load(),
            GraphikLCG700.load(),
            GraphikLCG900.load()
        ]).then(function () {
            html.classList.add('fonts-loaded');
            sessionStorage.fontsLoaded = true;
        });
    };
    document.head.appendChild(script);
}