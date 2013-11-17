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

var Beer = mongoose.model('Beer', BeerSchema);

function emptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

var Db = {
  create: function(data, callback){
    var beer = new Beer(data);

    beer.save(function(err) {
      if(err){
        console.error(err);
      } else {
        console.log('Cerveja cadastrada com sucesso');
        if (callback) callback(beers);
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
        if (callback) callback(beers);
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

exports.retrieve = module.exports.retrieve = Db.retrieve;

exports.update = module.exports.update = function (req, res) {
    var id = req.params.id;
    var query = {_id: id};
    var dados = req.body;

    Beer.update(query, dados, function(err, beer) {
        if(err) {
          console.log(err);
        } else {
          console.log('Cerveja atualizada com sucesso', beer);
          var query = {};
            Beer.find(query, function (err, beers) {
            if(err) {
              console.log(err);
              return err;
            } else {
              res.render('beers/list', {title: 'Minhas cervejas', msg: 'Cerveja cadastrada com sucesso', cervejas: beers});
            }
            });
        }
      });
};

exports.delete = module.exports.delete = function(req, res){
  var id = req.params.id;
  var query = {_id: id};

  Beer.remove(query, function (err, beers) {
    if(err) {
      console.log(err);
      return err;
    } else {
      var query = {};
      Beer.find(query, function (err, beers) {
        if(err) {
          console.log(err);
          return err;
        } else {
          res.render('beers/list', {cervejas: beers});
        }
      });
    }
  });
};


exports.showUpdate = function (req, res) {
  var id = req.params.id;
  var query = {_id: id};
  Db.retrieve(query, function (beers) {
    res.render('beers/form', {title: 'Editar cerveja', acao: 'update', cerveja: beers});
  });
}

exports.showDelete = module.exports.showDelete = function(req, res){
  var id = req.params.id;
  var query = {_id: id};
  Db.retrieve(query, function (beers) {
    res.render('beers/form', {title: 'Deletar cerveja', acao: 'delete', cerveja: beers});
  });
}

exports.showBeer = function (req, res) {
  var id = req.params.id;
  var query = {_id: id};
  Db.retrieve(query, function (beers) {
    res.render('beers/show', {title: 'Minhas cervejas', cerveja: beers});
  });
}

exports.showCreate = function(req, res){
  res.render('beers/form', {title: 'Adicionar cerveja', acao: 'create'});
}

exports.list = function (req, res) {
  Db.retrieve({}, function (beers) {
    res.render('beers/list', {title: 'Minhas cervejas', cervejas: beers});
  });
}

exports.create = function (req, res) {
  var data = req.body;
  Db.retrieve(data, function (beers) {
    res.render('beers/list', {title: 'Minhas cervejas', msg: 'Cerveja cadastrada com sucesso', cervejas: beers});
  });
}