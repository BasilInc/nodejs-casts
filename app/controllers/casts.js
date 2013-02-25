var mongoose = require('mongoose')
  , Cast = mongoose.model('Cast')
  , markdown = require('markdown').markdown
  , rs = require('robotskirt')
  // , renderer = new rs.HtmlRenderer()
  , parser = rs.Markdown.std()
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
  console.log(cast)
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
  var test_skirt = "*Lorem ipsum dolor sit amet*, consectetur adipiscing elit. Sed bibendum orci quis erat elementum luctus. Ut a ante a tortor luctus semper id eget justo. \n\
\n\
Morbi non arcu a elit adipiscing ultricies. In at condimentum tellus. Nullam ac ultricies quam. \n\
\n\
> This is a blockquote.\n\n\
> It has several lines.\n\n\
>\n\
> Line three\n\n\
> Haikus are nice, but\n\n\
> Sometimes, they don't make any sense\n\n\
> Refridgerator\n\n\
>\n\
> * List Item 1\n\
> * List Item 2\n\
>\n\
> 1. OL 1\n\
> 1. OL 2\n\
\n\
";
  console.log("Test");
  console.log(Cast.findOne({id:req.params.id}));
  cast: Cast.findOne({'_id':req.params.id}).exec(function(err, cast){
    console.log(cast);
    var summary = '';
    if (cast.summary) {
      summary = highlighter(markdown.toHTML(cast.summary),false,true)
    }
    var readme = '';
    if(cast.readme) {
      readme = highlighter(markdown.toHTML(cast.readme),false,true)
    }
    res.render('casts/show', {
      cast: cast,
      test_skirt: parser.render(test_skirt),
      summary : summary,
      ascii_cast : readme
    })
  });
}


