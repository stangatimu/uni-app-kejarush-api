const algoliasearch = require('algoliasearch'),
      client = algoliasearch(process.env.appId,process.env.apiKey),
      index = client.initIndex(process.env.indexName);

exports.products_search = function(req, res){
    if(req.query.query == ''){
        return res.status(401).json({
            success: false,
            message:"sorry! found errors on request"
        });
    }
    index.setSettings({
        attributesToHighlight:['name','description']
    })
    index.search({
        query: req.query.query,
        page: req.query.page,
        hitsPerPage: parseInt(req.query.per) || 10,
    },
    (err,content)=>{
        res.status(200).json({
            success: true,
            content: content,
            search_result: req.query.query            
        });
    }
 );

}