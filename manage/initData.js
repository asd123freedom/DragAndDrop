var fs = require('fs');
var dir = './data';
var obj = null;

fs.readdir(dir, function(err, files) {
    if (err) {
       console.log('read dir error');
   } else {
        files.forEach(function(item) {
            if (item === 'real.json') {
                return;
            }
            var tmp = dir + '/' + item;
            var name = item.replace(/\.json/, '');
            obj = fs.readFileSync(tmp, {encoding: 'utf8'});
            var arr = [];
            for (var i = 0; i < 25; i++) {
                arr[i] = {};
                arr[i]['name'] = name + i + '';
                arr[i].url = 'http://dummyimage.com/150/09f/' + name + i + '.png';
            }
            obj = JSON.stringify(arr, null, 4);
            fs.writeFileSync('./data/' + item, obj);
        });
   }
});

/*
var path = './public/upload';
fs.readdir(path, function(err, files) {
    if (err) {
        console.log(err);
        console.log('read dir error');
    }
    else {
        var arr = [];
        var index = 0;
        files.forEach(function(item) {
            var tmp = '/upload' + '/' + item;
            var pic = {};
            pic.url = tmp;
            arr.push(pic);
        });
        obj = JSON.stringify(arr, null, 4);
        fs.writeFileSync('./data/real.json', obj);
   }
});
*/
