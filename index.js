require('dotenv').config();
var axios = require("axios");

var apiKey = process.env.API_KEY;
var apiToken = process.env.API_TOKEN;
var memberId = process.env.MEMBER_ID;

const baseUrl = "https://api.trello.com/1";
const auth = "key=" + apiKey + "&token=" + apiToken;

async function func(name) {
    let getBoardsUrl = baseUrl + "/members/" + memberId + "/boards?fields=id,name&" + auth
    let boards = await axios.get(getBoardsUrl);

    let boardsToDelete = boards.data.filter(board => { 
        return board.name == name
    });

    console.log("Deleting " + boardsToDelete.length + " boards.");

    await boardsToDelete.forEach(async board => {
        let deleteBoardUrl = baseUrl + "/boards/" + board.id + "?" + auth;
        await axios.delete(deleteBoardUrl);
    });
}

if (process.argv.length != 3) {
    console.log("Usage: node index.js BOARDNAME")
    return 0;
}

console.log("Deleting boards with the name: " + process.argv[2]);

func(process.argv[2]);



