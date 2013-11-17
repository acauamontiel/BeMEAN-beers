var mongoose = require('../connect').connect('ws_nv');

var BeerSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  category: { type: String, default: ''},
  ingredients: [{
    name: { type: String, default: '' },
    qnty: { type: String, default: '' },
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: '' },
});

function emptyObject(obj) {
    var prop;
    for (prop in obj) {
        return false;
    }
    return true;
}

var Beer = mongoose.model('Beer', BeerSchema);

var Db = {
  create: function(data, callback){
    var beer = new Beer(data);

    beer.save(function(err) {
      if(err){
        console.error(err);
      } else {
        console.log('Cerveja cadastrada com sucesso');
        if (callback) callback();
      }
    });
  },

  retrieve: function(query, callback){
    var method = (emptyObject(query)) ? 'find' : 'findOne';

    Beer[method](query, function (err, beers) {
      if(err) {
        return err;
      } else {
        if (callback) callback(beers);
      }
    });
  },

  update: function(query, data, callback){
    Beer.update(query, data, function(err, beer) {
      if(err) {
        return err;
      } else {
        console.log('Cerveja atualizada com sucesso', beer);
        if (callback) callback(beer);
      }
    });
  },

  delete: function(query, callback){
    Beer.remove(query, function(err) {
      if(err) {
        return err
      } else {
        console.log('Cerveja deletada com sucesso!');
        if (callback) callback();
      }
    });
  }
};

exports.model = function () {
  return Db;
}