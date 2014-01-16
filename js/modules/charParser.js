(function (win, doc) {
    'use strict';

    var App = win.App || {};

    App.charParser = (function () {

        var _letterMap = [
                'abc',  // 2
                'def',  // 3
                'ghi',  // 4
                'jkh',  // 5
                'mno',  // 6
                'pqrs', // 7
                'tuv',  // 8
                'wxyz', // 9
            ],
            _originalText = '';

        // Original: https://gist.github.com/textarcana/5737478
        function _getCombinations (collection) { // AKA Permutation

            var current,
                subarray,
                result = [],
                currentArray = [],
                newResultArray = [];
         
            if (collection.length) {
                current = collection.shift();
                result = _getCombinations(collection);
         
                currentArray.push(current);
         
                result.map(function(list) {
                    newResultArray.push(list.slice(0));
                    list.push(current);
                });
         
                result.push(currentArray);
                result = result.concat(newResultArray);
            }
         
            return result;
        };

        function _mapLetter (value, key, list) {

            if (value === '0' || value === '1' ) {

                var errorText = 'Error. This number doesn\'t have a ';
                    errorText += 'equivalent in a numeric key pad.';

                alert(errorText);

                throw new Error('Invalid number');

            }

            if (!parseInt(value)) {

                var errorText = 'Error. Invalid characters. This field just ';
                    errorText += 'accept numbers.';

                alert(errorText);

                throw new Error('Invalid number');

            }

            return _letterMap[value - 2];

        }

        function _parse () {

            var arrayText = _originalText.split(''),
                textMap = _.map(arrayText, _mapLetter),
                textToSearch = textMap.join('').split(''),
                arraySearch = textMap.join('').split('');

            // console.log(arrayText);
            // console.log(textMap);
            // console.log(textToSearch);
            console.log(arraySearch);
            console.log(_getCombinations(arraySearch));

        }

        return {

            init: function (text) {

                _originalText = text;

            },

            parse: _parse

        }

    })();

    win.App = App;

})(window, document);