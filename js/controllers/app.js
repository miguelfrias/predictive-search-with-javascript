(function (win, doc) {
    'use strict';

    window.onload = initApp;

    function initApp () {

        var App = win.App || {};

        // App.loadFile.init('data/alice_in_wonderland.txt');
        App.init('data/alice_in_wonderland.txt');

        var searchDOM = {
                'button': doc.getElementById('search-button'),
                'input': doc.getElementById('search'),
                'results': doc.getElementById('results'),
                'exactMatches': doc.getElementById('number-of-exact-matches')
            };

        searchDOM.input.focus();

        App.search.init(searchDOM);

    }

})(window, document);