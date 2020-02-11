var express = require('express');
var router = express.Router();
var database = require('./modules/mysql');
var mysql = new database();
/** **/

/* GET home page.*/
router.get('/:idx', async function(req,res,next){
	mysql.open();
	var idx = req.params.idx;
	var query = `SELECT * FROM data where idx = '${idx}';`;
	var result = await mysql.query(query);
	res.render('update',{title : "게시판 내용", result:result[0]});
	mysql.close();
});


router.post('/', async function(req, res, next) {
	mysql.open();
	var idx = req.body.idx;
	var title = req.body.title;
	var content = req.body.content;

	var query = `UPDATE data set title='${title}', content='${content}', date=now() where idx='${idx}';`;
	var result = await mysql.query(query); 
	res.redirect('/report');
	mysql.close();
});
/*
router.post('/', function(req, res, next) {
	mysql.open();
	console.log(req.body);
	var idx = req.body.idx;
	var title = req.body.title;
	var content = req.body.content;

	var query = `UPDATE data set title='${title}', content='${content}', date=now() where idx='${idx}';`;
	console.log(query);
	try {
	mysql.query(query).
		then(result => {
			console.log("result", result);
			res.redirect('/report');
			mysql.close();
		}).
		catch(err => {
			console.log(err);
			mysql.close();
		}); 
	} catch (e) {
		console.log("error", e);
	}
});
*/
module.exports = router;
