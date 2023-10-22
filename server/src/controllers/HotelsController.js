'use strict';
const data = require('../data/data.json');
const url = require('url');

async function index (request, response) {
    
    const url_parts = url.parse(request.url, true);
    const query = url_parts.query;
    let result = data;    
    
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
    
}
module.exports = {
    index: index
};