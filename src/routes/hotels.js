const { Router } = require('express')
const router = Router();
const paginate = require('express-paginate');

var data = require('../data/data.json')
var url = require('url')

router.get('/', async (request, response) => {
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    var result = data;    
    
    let page = parseInt(request.query.p);

    if (!page) page = 1;

    if (query.name) {
        result = result.filter(item => {
            return item.name.search((new RegExp(query.name, 'i'))) > -1;
        }); 
    }
    
    if (query.stars && query.stars.length) {
        let stars = query.stars
        .split(';')
        .map(item => parseInt(item, 10));

        result = result.filter(item => {
        return stars.includes(item.stars);
        });
    }  

    const pageCount = Math.ceil(result.length / 10);
    if (page > pageCount) {
        page = pageCount
    }
    
    response.json({
        "page": page,
        "pageCount": pageCount,
        "result": result.slice(page * 10 - 10, page * 10)
    })
    
});



module.exports = router;