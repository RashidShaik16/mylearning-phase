const http = require("node:http")

const server = http.createServer((req, res) => {
    const method = req.method
    const path = req.url

    switch(method){
        case "GET" : 
            switch(path) {
                case "/" : return res.writeHead(200).end("Welcome to the homepage")
                case "/about" : return res.writeHead(200).end("I'm an aspiring software engineer")
                case "/contact" : return res.writeHead(200).end("You can contact me at 8019734321")
                default: return res.writeHead(404).end("The page doesn't exists")
            }
        case "POST" : {
            switch(path) {
                case "/apply" : return res.writeHead(201).end("We received your application")
                case "/offer" : return res.writeHead(201).end("Thank you for accepting the offer")
                default: return res.writeHead(400).end("Please apply in our job portal first")
            }
        }
    }

})


server.listen(8000, function() {
    console.log("Server connected successfully");
    
})