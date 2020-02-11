var express = require('express');
var router = express.Router();
var database = require('./modules/mysql');
var mysql = new database();
/** **/

/* GET home page.*/
router.get('/', function(req,res,next){
    res.render('board',{title : "write"});
});


router.post('/', async function(req, res, next) {
	mysql.open();
	var title = req.body.title;
	var content = req.body.content;

	var query = `INSERT INTO data(title, content, date, hit) values('${title}', '${content}', now(), 0);`;
	
	var result = await mysql.query(query); 
	res.redirect('/report');
	mysql.close();
});
/*


router.post('/', function(req, res, next) {
	mysql.open();
	var title = req.body.title;
	var content = req.body.content;

	var query = `INSERT INTO data(title, content, date, hit) values('${title}', '${content}', now(), 0);`;
	
	console.log("query", query);
	try {
		mysql.query(query).then((res_) => {
			console.log(res_);
			res.redirect('/report');
		}).catch(err => {
			console.log(err);
		}).finally(() => {
			mysql.close();
		}); 
	} catch (e) {
		console.error(e);
	}
});
*/
module.exports = router;
