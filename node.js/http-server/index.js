const http = require("node:http")
const fs = require("fs")

const server = http.createServer((req, res) => {
    const method = req.method
    const path = req.url

    const log = `[${Date.now()}] : ${method} ${path}\n`
    fs.appendFileSync("log.txt", log, "utf-8")


    switch(method){
        case "GET" : {
            switch(path){
                case "/" : return res.writeHead(200).end("You are at homepage")
                case "/contact" : return res.writeHead(200).end("You can contact us at 8019734321 or rashidshaik.dev16@gmail.com")
                case "/about" : return res.writeHead(200).end("I'm an aspiring fullstack developer")
                case "/tweet" : return res.writeHead(200).end("Tweet-1\nTweet-2\nand so on....")
            }
        }
        break

        case "POST" : {
            switch(path){
                case "/tweet" : return res.writeHead(201).end("Your tweet was created successfully")
            }
        }

        return res.writeHead(404).end("Invalid request")
    }
})

const PORT = 8000

server.listen(PORT, () => console.log("Server connected successfully"))