'use strict'

Object.defineProperty(exports, '__esModule', {
    value: true,
})

var _express = require('express')

var _express2 = _interopRequireDefault(_express)

var _routes = require('./routes/routes')

var _routes2 = _interopRequireDefault(_routes)

var _dotenv = require('dotenv')

var _dotenv2 = _interopRequireDefault(_dotenv)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

_dotenv2.default.config()

var app = (0, _express2.default)()

app.use(_express2.default.urlencoded({ extended: false }))
app.use(_express2.default.json())

app.use(_routes2.default)

app.get('/', function(req, res) {
    res.status(200).json({
        status: 200,
        message:
            'Welcome to Property Pro Lite you can search properties for sale or rent!',
    })
})

app.use('*', function(req, res) {
    res.status(400).json({
        status: 400,
        message: "Sorry this router doesn't exist !",
    })
})

var port = process.env.PORT || 3000
app.listen(port, function() {
    return console.log('Welcome to MY Property Pro Lite Land Server!!....')
})

exports.default = app
