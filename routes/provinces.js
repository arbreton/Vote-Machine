var express = require('express');
var mongoose = require('mongoose');
var Province = mongoose.model('Province');
var app = express();

app.get('/provinces', function (req, res)
{
  Province.find({}).exec(function (err, province)
  {
    var newProvince = [];
    var newCanton = [];
    var newDistritos = [];
    province.map( function (value, index)
    {

      if(value.descripcion =='SAN JOSE')
      {
          newProvince.push(value);
          if(value.cantones.descripcion = 'Central')
          {
            newCanton.push(value);
            if (value.cantones.distritos.descripcion = 'HOSPITAL')
            {
              newDistritos.push(value);
            }
          }
      }
    });
    res.json(newDistritos);
  });
});

module.exports = app;
