const { Router } = require('express')
const router = Router();
const paginate = require('express-paginate');

var data = require('../data/data.json')
var url = require('url')


router.use(paginate.middleware(10, 50));

router.get('/', async (request, response, next) => {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var result = data;    
    
    const pageCount = Math.ceil(result.length / 10);
    let page = parseInt(request.query.p);
    if (!page) { page = 1;}

    if (page > pageCount) {
      page = pageCount
    }
    

    if (query.stars && query.name) {
        result = result.filter(item => {
            return item.stars === parseInt(query.stars) && item.name.indexOf(query.name) > -1;
        });
    }
      
    if (query.name) {
        result = result.filter(item => {
            return item.name.indexOf(query.name) > -1;
        }); 
    }

    if (query.stars) {
        result = result.filter(item => {
            return item.stars === parseInt(query.stars);
        }); 
    }
         
    response.json({
        "page": page,
        "result": result.slice(page * 10 - 10, page * 10)
    })
    

});



module.exports = router;