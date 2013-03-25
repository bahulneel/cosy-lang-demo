
module.exports = (function (lang, words, tf, idf) {
    "use strict";
    var sequence = lang.sequence,
        map = sequence.map;

    function tfIdf(documents) {
        var theWords, terms, freq;
        terms = map(tf, map(words, documents));
        freq = idf(terms);
        function calcTfIdf(tf, idf) {
        	var word, tfIdf = {};
        	for (word in tf) {
        		if (tf.hasOwnProperty(word)) {
        			tfIdf[word] = tf[word] * idf[word];
        		}
        	}
        	return tfIdf;
        }
        return map(calcTfIdf, terms, freq);
    }

    return tfIdf;
})(require('cosy-lang'), require('./words'), require('./term-frequency'), require('./document-frequency'));
