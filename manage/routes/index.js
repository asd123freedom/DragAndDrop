var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var html = fs.readFileSync('./public/pic.html', {encoding: 'utf8'});
// console.log(html);
/* GET home page. */
router.get('/', function(req, res, next) {
    var path = __dirname.slice(0, -7)+'/public/upload';
    fs.readdir(path, function(err, files) {
        if (err) {
           console.log('read dir error');
       } else {
            var pics = [];
            files.forEach(function(item) {
                pics.push('upload/'+item);
            });
            res.render('index', {
                title: 'Express' ,
                pics: pics
            });
       }
    });
});

router.post('/upload', function(req, res) {

  var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + "/upload";	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {

    if (err) {
        res.json({"error":1});
        return;
    }

  });
  res.json({"success":1});

});

router.get('/pic', function (req, res, next) {
    res.send(html);
});

router.get('/show', function (req, res, next) {
    html = fs.readFileSync('./public/demo.html', {encoding: 'utf8'});
    res.send(html);
});

router.get('/getMore', function (req, res, next) {
    var data = fs.readFileSync('./public/data.json', {encoding: 'utf8'});
    data = JSON.parse(data);
    res.send([]);
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
        res.send({
            status: 0,
            statusInfo: 'success'
        });
    }
    catch (e) {
        console.log(e);
        res.send({
            status: 1,
            statusInfo: 'fail'
        });
    }
});

module.exports = router;
