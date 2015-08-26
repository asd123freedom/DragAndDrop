var express = require('express');
var router = express.Router();
var fs = require('fs');
var html = fs.readFileSync('./public/pic.html', {encoding: 'utf8'});
// console.log(html);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/pic', function (req, res, next) {
    res.send(html);
});

router.get('/data', function (req, res, next) {
    var name = req.query.name;
    var file = './data/' + name + '.json';
    var data = JSON.parse(fs.readFileSync(file, {encoding: 'utf8'}));
    res.send(data);
});
router.get('/spec', function (req, res, next) {
    var _from = req.query.from;
    var _to = req.query.to;
    var name = req.query.name;
    var fromObj = JSON.parse(fs.readFileSync('./data/' + _from + '.json', {encoding: 'utf8'}));
    var toObj = JSON.parse(fs.readFileSync('./data/' + _to + '.json', {encoding: 'utf8'}));
    var obj = {
        name: name
    }
    try {
        var arr = fromObj.data;
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === name) {
                arr.splice(i, 1);
                break;
            }
        }
        toObj.data.push(obj);
        fs.writeFileSync('./data/' + _from + '.json', JSON.stringify(fromObj));
        fs.writeFileSync('./data/' + _to + '.json', JSON.stringify(toObj));
    }
    catch (e) {
        console.log(e);
    }

    res.send({
        status: 0,
        statusInfo: 'success'
    });
});

module.exports = router;
