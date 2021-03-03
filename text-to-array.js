var fs = require('fs');

try {
    var data = fs.readFileSync('./corpora/hhgttg.txt', 'utf8');
    var split = data.split(/\."?\s(?=[A-Z])/);
    split = split.map(sentence => sentence + '.');
    var stringified = JSON.stringify(split);
    fs.writeFileSync('./corpora/hhgttg.js', stringified);
} catch(e) {
    console.log('Error:', e.stack);
}

