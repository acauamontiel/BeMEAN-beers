var Db = require('../models/beer').model();

var exports = {
  showBeer: function (req, res) {
    var id = req.params.id;
    var query = {_id: id};
    Db.retrieve(query, function (beers) {
      res.render('beers/show', {title: 'Minhas cervejas', cerveja: beers});
    });
  },

  showCreate: function(req, res){
    res.render('beers/form', {title: 'Adicionar cerveja', acao: 'create'});
  },

  showUpdate: function (req, res) {
    var id = req.params.id;
    var query = {_id: id};
    Db.retrieve(query, function (beers) {
      res.render('beers/form', {title: 'Editar cerveja', acao: 'update', cerveja: beers});
    });
  },

  showDelete: function(req, res){
    var id = req.params.id;
    var query = {_id: id};
    Db.retrieve(query, function (beers) {
      res.render('beers/form', {title: 'Deletar cerveja?', acao: 'delete', cerveja: beers});
    });
  },

  list: function (req, res) {
    Db.retrieve({}, function (beers) {
      res.render('beers/list', {title: 'Minhas cervejas', cervejas: beers});
    });
  },

  create: function (req, res) {
    var data = req.body;
    Db.create(data, function () {
      Db.retrieve({}, function (beers) {
        res.render('beers/list', {title: 'Minhas cervejas', msg: 'Cerveja cadastrada com sucesso!', cervejas: beers});
      });
    });
  },

  update: function (req, res) {
    var id = req.params.id;
    var query = {_id: id};
    var data = req.body;
    Db.update(query, data, function () {
      Db.retrieve({}, function (beers) {
        res.render('beers/list', {title: 'Minhas cervejas', msg: 'Cerveja alterada com sucesso!', cervejas: beers});
      });
    });
  },

  delete: function(req, res){
    var id = req.params.id;
    var query = {_id: id};
    Db.delete(query, function () {
      Db.retrieve({}, function (beers) {
        res.render('beers/list', {title: 'Minhas cervejas', msg: 'Cerveja deletada com sucesso!', cervejas: beers});
      });
    });
  }
}

module.exports = exports;