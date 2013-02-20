var mongoose = require('mongoose')
  , Cast = mongoose.model('Cast')


// auth callback
exports.index = function (req, res, next) {
	console.log(req);
  Cast
  .find({userId:req.user._id})
  .exec(function(err, casts) {
      if (err) return res.render('500')
      Cast.count().exec(function (err, count) {
        res.render('casts/index', {
            title: 'Casts',
            count: count,
        })
      })
    });
}