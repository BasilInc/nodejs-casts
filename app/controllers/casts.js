var mongoose = require('mongoose')
  , Cast = mongoose.model('Cast')
  , markdown = require('markdown').markdown
  , highlighter = require("highlight").Highlight


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
  var mard =  
"# Casts Summary\n\
\n\
    var x = 12;\n\
    var y = x;\n\
    function w() {\n\
      console.log(y);\n\
    }\n\
";

  var body = markdown.toHTML(mard,"Maruku");
  var finalBody = highlighter(body,false,true);
  console.log("Test");
  console.log(Cast.findOne({id:req.params.id}));
  cast: Cast.findOne({'_id':req.params.id}).exec(function(err, cast){
    console.log(cast);
    res.render('casts/show', {
      cast: cast,
      body : finalBody
    })
  });
}
