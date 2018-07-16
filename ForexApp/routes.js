//SPDX-License-Identifier: Apache-2.0

var annapp = require('./controller.js');

module.exports = function(app){

  app.get('/get_all_trans', function(req, res){
    annapp.get_all_trans(req, res);
  });
  app.get('/get_trans', function(req, res){
    annapp.get_trans(req, res);
  });
  app.get('/create_trans/:id/:type', function(req, res){
    annapp.create_trans(req, res);
  });
  app.get('/make_trans', function(req, res){
    annapp.make_trans(req, res);
  });
  app.get('/accept_trans', function(req, res){
    annapp.accept_trans(req, res);
  });
  app.get('/complete_trans', function(req, res){
    annapp.complete_trans(req, res);
  });
}
