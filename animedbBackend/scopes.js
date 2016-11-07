var _ =require('lodash');

function checkScopes(scopes) {
  return function(req, res, next) {

    var tokenScopes = req.token_payload.scopes;
    var check = _.every(scopes, function(val) {
      return _.contains(tokenScopes, val);
    });

    if (!check) {
      return res.send(401, 'insufficient scopes')
    } else {
      next();
    }
  }
};

 function getScopesFrmoRequest(req) {
  return ['follow', 'read_users'];
};

module.exports = checkScopes;   
module.exports = getScopesFrmoRequest; 
