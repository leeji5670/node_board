var express = require('express');
var router = express.Router();
var database = require('./modules/mysql');
var mysql = new database();
/** **/

/* GET home page.*/
router.get('/', async function(req, res, next) {
	mysql.open();
	var query = 'SELECT * FROM data;';
	var result = await mysql.query(query);
	//var rtn = Object.assign({}, result);
	res.render('report', { youn: result });
	mysql.close();
});
/*
async function test(){
	for( var i=0; i<1000; i++ ){

		mysql.open();
		var query = `INSERT INTO data(title, content, date, hit) values('text${i}', 'contesnt${i}', now(), 0);`;

		var result2 = await mysql.query(query);
		console.log('i',i);
	}
}
test();
*/
router.post('/', async function(req, res, next) {
	mysql.open();
	var idx = req.body.idx;
	var obj = {};
	var arr = [];

	/*
	if( typeof idx !== 'object' ){
		var tmp = idx;
		idx = [];
		idx[0] = tmp;
	}
	*/
	if( typeof idx === 'string' ){
		idx = [idx];
	}

	var query = `DELETE from data where idx in (`;
	var arr_len = idx.length;

	for(var i=0; i<arr_len; i++)
	{
		if( i === (arr_len - 1) ){
			query += `${idx[i]})`;
		} else {
			query += `${idx[i]}, `;
		}
	}
	var result2 = await mysql.query(query);
	res.redirect('/report');
	mysql.close();
});
/*
router.get('/', async function(req, res, next) {
	mysql.open();
	var query = 'SELECT * FROM data;';
	mysql.query(query).then( function( result ){
		var query2 = 'SELECT * FROM data;';
		return mysql.query(query2);
	}).then( function(result){
		res.render('report',{ data: result[0].id });
		mysql.close();
	}).catch( function(err){

	});
});
*/
module.exports = router;

