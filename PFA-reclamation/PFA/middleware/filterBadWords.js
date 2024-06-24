const Filter = require('bad-words');

let filter = new Filter();


var newBadWords = ['bhim', 'bitch', 'nigga', 'jghal', 'sakhta', 'khra'];;

filter.addWords(...newBadWords);
module.exports = filter;