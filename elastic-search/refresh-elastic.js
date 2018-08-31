var fs = require('fs')
var products = require('../JSON/Fjson.json')
var elasticSearch = require('./elastic')
const uuidv4 = require('uuid/v4')

function refresh() {
    return elasticSearch.createIndex('amazon').then((response) => {
        bulk = []
        products.forEach(item => {
            if(item.title && item.price && item.images && item.images.length) {
                bulk.push(
                    {index: {_index: 'amazon', _type: 'product-title', _id: uuidv4()}},
                    {
                        'title': item.title,
                        'price': item.price,
                        'images': item.images
                    }
                );
            }
        });
        console.log(bulk.length)
        return elasticSearch.insertMany('amazon', 'product-title', bulk)
    })
}

module.exports = { refresh: refresh }