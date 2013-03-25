
module.exports = (function (lang) {
    "use strict";
    var sequence = lang.sequence,
        filter = sequence.filter,
        vec = sequence.vec,
        map = sequence.map;

    function stripWord(word) {
        return word.replace(/[^-a-zA-Z_0-9]+/, '').toLowerCase();
    }

    function isWord(word) {
        return /^[-a-zA-Z_0-9]+$/.exec(word)
    }

    function words(string) {
        return vec(filter(isWord, map(stripWord, string.split(/ /))));
    }

    return words;
})(require('cosy-lang'));
