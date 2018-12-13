#!/usr/bin/env node
require('dotenv').config();
var axios = require("axios");
var inquirer = require("inquirer");

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
    return test;
    //console.log("Available boards: " + test);
}

async function main(input) {
    // if (process.argv.length > 3) {
    //     console.log("Usage: deletinator [BOARDNAME]");
    //     return 0;
    // }
    
    // if (process.argv.length == 2) {
    //     displayBoards();
    //     return 0;
    // }
    
    console.log(await displayBoards());

    console.log("Deleting boards with the name: " + input + ".");
    
    deleteBoards(process.argv[2]);
}

inquirer
  .prompt([
    {
        type: "list",
        name: "delete_prompt",
        message: "Enter a board name to delete: (ctrl + c to quit)",
        choices: async function() {
            let done = this.async();
            done = await displayBoards();
        } 
    }
  ])
  .then(answers => {
    main(answers.delete_prompt);
  });





