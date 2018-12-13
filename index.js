#!/usr/bin/env node
require('dotenv').config();
var axios = require("axios");

var apiKey = process.env.API_KEY;
var apiToken = process.env.API_TOKEN;
var memberId = process.env.MEMBER_ID;

const baseUrl = "https://api.trello.com/1";
const auth = "key=" + apiKey + "&token=" + apiToken;

async function deleteBoards(name) {
    let boards = await getBoards();

    let boardsToDelete = boards.data.filter(board => { 
        return board.name == name;
    });

    console.log("Deleting " + boardsToDelete.length + " board(s).");

    await boardsToDelete.forEach(async board => {
        let deleteBoardUrl = baseUrl + "/boards/" + board.id + "?" + auth;
        await axios.delete(deleteBoardUrl);
    });
}

async function getBoards() {
    let getBoardsUrl = baseUrl + "/members/" + memberId + "/boards?fields=id,name&" + auth;
    let boards = await axios.get(getBoardsUrl);
    return boards;
}

async function displayBoards() {
    let boards = await getBoards();
    let test = boards.data.map(board => {
        return board.name;
    });
    console.log("Available boards: " + test);
}

async function main() {
    if (process.argv.length > 3) {
        console.log("Usage: deletinator [BOARDNAME]");
        return 0;
    }
    
    if (process.argv.length == 2) {
        displayBoards();
        return 0;
    } 
    
    console.log("Deleting boards with the name: " + process.argv[2] + ".");
    
    deleteBoards(process.argv[2]);
}

main().catch("fuck");





