var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express();
app.set('view engine', 'ejs');
app.set('views', path.resolve('tmpl'));
app.use(function (req, res, next) {
    var filename = path.join(__dirname, 'public', req.path);
    fs.exists(filename, function (flag) {
        if(flag){
            res.sendFile(filename);
        }else {
            next();
        }
    })
});
app.data = [];
//注册
app.get('/signup', function (req, res) {
    //res.sendFile('signup.html', {root: __dirname + '/tmpl'});
    res.render('signup', {title: 'signup'});
});
app.post('/signup', function (req, res) {
    var str = '';
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        var obj = {};
        str.replace(/([^&]+)=([^&]+)/g, function () {
            obj[arguments[1]] = arguments[2];
            app.data.push(obj);
        });
        res.redirect('/signin');
    })
});
//登录
app.get('/signin', function (req, res) {
    //res.sendFile('signin.html', {root: __dirname + '/tmpl'});
    res.render('signin', {title: 'signin'});
});
app.post('/signin', function (req, res) {
    var str = '';
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        var obj = {};
        str.replace(/([^&]+)=([^&]+)/g, function () {
            obj[arguments[1]] = arguments[2];
        });
        var flag = app.data.find(function (item) {
            return (item.username == obj.username && item.password == obj.password);
        });
        flag ? res.redirect('/welcome') : res.redirect('/signup');
    })
});
//欢迎页
app.get('/welcome', function (req, res) {
    //res.sendFile('welcome.html', {root: __dirname + '/tmpl'});
    res.render('welcome', {title: 'welcome'});
});
app.listen(8080, function () {
    console.log('8080 listened success!')
});