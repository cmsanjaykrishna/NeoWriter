exports.getPost = (req,res)=>{
    res.json({
        posts:[{title : 'First post'}, {title : 'Second post'}]    
    });
    };