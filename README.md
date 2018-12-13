# deletinator
Deletes those pesky Trello boards you make when testing

## Usage
First clone the directory to you local machine

You first need a `.env` file containing the following variables in your directory.
```
API_KEY = "YOUR_API_KEY"
API_TOKEN = "YOUR_API_TOKEN"
MEMBER_ID = "YOUR_TRELLO_MEMBER"
```
Then navigate to the directory and install with `npm install -g`

Next to actually run the script and delete a board
`deletinator BOARD_NAME`
or just use `delitinator` to list the boards available in your trello account.
