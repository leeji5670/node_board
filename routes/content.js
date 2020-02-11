var express = require('express');
var router = express.Router();
var database = require('./modules/mysql');
var mysql = new database();
/** **/

/* GET home page.*/
router.get('/:idx', async function(req,res,next){
	mysql.open();
	var idx = req.params.idx;
	const ip = req.headers['x-forwarded-for'] ||
		     req.connection.remoteAddress ||
		     req.socket.remoteAddress ||
		     req.connection.socket.remoteAddress;
	var tmp = ip.split(':');
	var len = tmp.length;
	var remote_ip;
	if( len === 1 ){
		remote_ip = tmp[0];
	} else {
		remote_ip = tmp[len-1];
	}
	console.log(remote_ip);
	var query = `SELECT * FROM data where idx = '${idx}';`;
	var result = await mysql.query(query);
	res.render('content',{title : "게시판 내용", result:result[0]});
	mysql.close();
});

module.exports = router;
