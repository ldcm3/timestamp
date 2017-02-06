'use strict'

var express = require('express')
var app = express()
var moment = require('moment')

app.get('/:query', function (req,res){
   
    var date = req.params.query;
    var unixTimestamp = null;
    var naturalDate = null;
    
    // check for timestamp
    if (Number.isInteger(+date))
    {
        unixTimestamp = +date;
        naturalDate = convertUnixToNat(date);
    }   
   
    // check for natural date
    if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid())
    {
        unixTimestamp = +convertNatToUnix(date);
        naturalDate = convertUnixToNat(unixTimestamp);
    }
    
    // Convert natural date to unix Timestamp
    function convertNatToUnix(date)
    {
        return moment(date,"MMMM D, YYYY").format("X");
    }
 
    // Convert unix Timestamp to natural date
    function convertUnixToNat(unixTimestamp) {
        var nat = moment.unix(unixTimestamp)
            .format("MMMM D, YYYY");
        if (nat)
            return nat;
        else
            return null;
    }
    
    var dateObj = {"unix": unixTimestamp, 'natural': naturalDate };
    
    res.send(dateObj);
})

app.get('/', function(req,res){
    res.send('Please provide a timestamp or natural a number');
});

app.listen(8080, function(){
    console.log('Server is Running!');
});


