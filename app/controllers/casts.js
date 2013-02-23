var mongoose = require('mongoose')
  , Cast = mongoose.model('Cast')


// auth callback
exports.index = function (req, res, next) {
  Cast
  .find({user:req.user})
  .exec(function(err, casts) {
      if (err) return res.render('500')
      Cast.count().exec(function (err, count) {
        res.render('casts/index', {
            title: 'Casts',
            count: count,
            casts: casts
        })
      })
    });
}

// New cast
exports.new = function(req, res){
  res.render('casts/new', {
      title: 'New Cast'
    , cast: new Cast({})
  })
}

// Create a cast
exports.create = function (req, res) {

  var cast = new Cast(req.body)
  cast.user = req.user
  
  cast.createdAt = Date.now()
  cast.updateAt = Date.now()

  if ( req.body.video.source.src.length > 0 ) {
    for(var sourceIndex = 0; sourceIndex < req.body.video.source.src.length; sourceIndex++) {
      cast.video.source.push({
        src: req.body.video.source.src[sourceIndex], 
        quality: req.body.video.source.quality[sourceIndex]
      });
    } 
  }

  cast.save(function(err){
 
    if (err) {
      res.render('casts/new', {
          title: 'New Cast'
        , cast: cast
        , errors: err.errors
      })
    }
    else {
      res.redirect('/casts/'+cast._id)
    }
  })
}

// View an cast
exports.show = function(req, res){
  //console.log("Test");
  //console.log(Cast.findOne({id:req.params.id}));
  cast: Cast.findOne({'_id':req.params.id}).exec(function(err, cast){
    console.log(cast);
    res.render('casts/show', {
      cast: cast
    })
  });
}
