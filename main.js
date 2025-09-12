const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    hat = '^';
    hole = 'O';
    fieldCharacter = '░';
    pathCharacter = '*';

    constructor(map) {
        this.layout = map;
        this.x = 0;
        this.y = 0;
    }
    print(){
        let layoutPrint = this.layout.map(row => row.join("")).join("\n")
        process.stdout.write(layoutPrint + '\n');
    }
    moveRight(){
        this.x + 1;
    }
    getPosition(){
        return [this.x, this.y];
    }
    findHat(){
        for(let row = 0; row < this.layout.length; row++){
            for(let col = 0; col < this.layout[row].length; col++){
                if(this.layout[row][col] === hat){
                    return {row, col};
                }
            }
        }
    }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

myField.print();
let finish = myField.findHat();
const move = prompt("Which way?")
console.log(finish);