const http = require("http");
const fs = require("fs");
const toml = require("toml");
const json2toml = require("json2toml");
const config = toml.parse(fs.readFileSync("webring.toml"));
const port = 8080;

http.createServer((request, response) => {

    let body = []
    
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let { url } = request
        url = url.substring(1,url.length)
        switch(url) {

            case "DNSMETA":

                response.statusCode = 200;
                response.setHeader("Content-Type", "text/plain");

                response.write(json2toml(config.metadata));
                response.end();
                break;

            case "":
                if (config.nodes[body] !== undefined) {

                    response.statusCode = 200;
                    response.setHeader("Content-Type", "text/plain");

                    response.write(json2toml({data: config.nodes[body]}));

                    response.end();
                    break;

                } else {

                    response.statusCode = 400;
                    response.setHeader("Content-Type", "text/plain");
                    response.write(json2toml({error: "The requested Node ID does not exist."}));
                    response.end();
                    break;

                }
        }
    });
}).listen(port);

  