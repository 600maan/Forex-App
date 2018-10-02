//SPDX-License-Identifier: Apache-2.0

var ForexApp = require('./controller.js');

module.exports = function(app){
  app.get('/index', function(req, res) {
    ForexApp.index(req, res);
  });
  app.get('/get_all_trans', function(req, res){
    ForexApp.get_all_trans(req, res);
  });
  app.get('/get_trans', function(req, res){
    ForexApp.get_trans(req, res);
  });
  app.get('/create_trans/:id/:type', function(req, res){
    ForexApp.create_trans(req, res);
  });
  app.get('/make_trans', function(req, res){
    ForexApp.make_trans(req, res);
  });
  app.get('/accept_trans', function(req, res){
    ForexApp.accept_trans(req, res);
  });
  app.get('/complete_trans', function(req, res){
    ForexApp.complete_trans(req, res);
  });
}
