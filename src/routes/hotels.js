const { Router } = require('express')
const router = Router();

var data = require('../data/data.json')
var url = require('url')

router.get('/', (request, response) => {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var result = data;    
    
    if (query.stars) {
        result = result.filter(item => {
            return item.stars === parseInt(query.stars);
        });
    }

    if (query.name) {
        result = result.filter(item => {
            return item.name.indexOf(query.name) > -1;
        }); 
    }

    response.json(result)
});


module.exports = router;