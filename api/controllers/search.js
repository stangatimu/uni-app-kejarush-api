const algoliasearch = require('algoliasearch'),
      client = algoliasearch(process.env.appId,process.env.algoliaAPIkey),
      index = client.initIndex("kejarush_ads");

exports.products_search = function(req, res){
    if(req.query.query == ''){
        return res.status(401).json({
            success: false,
            message:"sorry! found errors on request"
        });
    }
    index.setSettings({
        attributesToHighlight:['name']
    })
    index.search({
        query: req.query.query,
        page: req.query.page,
        hitsPerPage: parseInt(req.query.per) || 10,
    },
    (err,content)=>{
        if(err || content.nbHits == 0){

            return res.status(404).json({
                success: false,
                message:`Sorry no results were found for ${content.query}. Try another keyword`
            })


        }
        return res.status(200).json({
            success: true,
            content: content,
            search_result: req.query.query            
        });
    }
 );

}