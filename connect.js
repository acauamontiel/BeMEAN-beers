exports.connect = function (database) {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/'+database);

	var db = mongoose.connection;
	db.on('error', function(err){
		console.error('Erro de conexao.', err);
	});

	db.once('open', function () {
		console.log('Conexão aberta.');
	});

	return mongoose;
}