var http = require("http");

function requestListener(req,res){
	console.log(req.url);

	res.write("hello"+req.url);
	res.end();
}

var server = http.createServer(requestListener);

server.listen(8888);