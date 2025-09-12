const prompt = require('prompt-sync')({sigint: true});


class Field {
    constructor(map) {
        this.layout = map;
        this.x = 0;
        this.y = 0;
        this.hat = '^';
        this.hole = 'O';
        this.fieldCharacter = '░';
        this.pathCharacter = '*';
    }
    print(){
        let layoutPrint = this.layout.map(row => row.join("")).join("\n")
        process.stdout.write(layoutPrint + '\n');
    }
    getPosition(){
        return [this.x,this.y]
    }
    updatePath(x,y){
        this.layout[x][y] = this.pathCharacter;
        this.x = x;
        this.y = y;
    }
    findHat(){
        for(let row = 0; row < this.layout.length; row++){
            for(let col = 0; col < this.layout[row].length; col++){
                if(this.layout[row][col] === this.hat){
                    return [row, col];
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

let finish = myField.findHat();
while(myField.getPosition() != finish){
    myField.print();
    const move = prompt("Which way?")
    switch(move){
        case 'l':
            if(myField.layout[myField.x][myField.y-1] && myField.layout[myField.x][myField.y-1] === myField.fieldCharacter){
                myField.updatePath(myField.x,myField.y-1)
            }else if(myField.layout[myField.x][myField.y-1] && myField.layout[myField.x][myField.y-1] === myField.hole){
                console.log('Sorry, you fell down a hole');
                process.exit();
            }
            else if(!myField.layout[myField.x][myField.y-1]){
                console.log('Cant go that way..\n')
            }else if(myField.layout[myField.x][myField.y-1] === myField.hat){
                console.log('You found the hat! Congratulations!');
                process.exit();
            }else if(myField.layout[myField.x][myField.y-1] === myField.pathCharacter){
                console.log('You already made that move!');
            }
            break;
        case 'r':
            if(myField.layout[myField.x][myField.y+1] && myField.layout[myField.x][myField.y+1] == myField.fieldCharacter){
                myField.updatePath(myField.x,myField.y+1);
            }else if(!myField.layout[myField.x][myField.y+1]){
                console.log('Cant go that way..\n')
            }else if(myField.layout[myField.x][myField.y+1] === myField.hole){
                console.log('Sorry, you fell down a hole');
                process.exit();
            }else if(myField.layout[myField.x][myField.y+1] === myField.hat){
                console.log('You found the hat! Congratulations!');
                process.exit();
            }
            break;
        case 'u':
            if(myField.layout[myField.x-1][myField.y] && myField.layout[myField.x-1][myField.y] == myField.fieldCharacter){
                myField.updatePath(myField.x-1,myField.y);
            }else if(!myField.layout[myField.x-1][myField.y]){
                console.log('Cant go that way..\n')
            }else if(myField.layout[myField.x-1][myField.y] === myField.hole){
                console.log('Sorry, you fell down a hole');
                process.exit();
            }else if(myField.layout[myField.x-1][myField.y] === myField.hat){
                console.log('You found the hat! Congratulations!');
                process.exit();
            }else if(myField.layout[myField.x-1][myField.y] === myField.pathCharacter){
                console.log('You already made that move!');
            }
            break;
        case 'd':
            if(myField.layout[myField.x+1][myField.y] && myField.layout[myField.x+1][myField.y] == myField.fieldCharacter){
                myField.updatePath(myField.x+1,myField.y);
            }else if(!myField.layout[myField.x+1][myField.y]){
                console.log('Cant go that way..\n')
            }else if(myField.layout[myField.x+1][myField.y] === myField.hole){
                console.log('Sorry, you fell down a hole');
                process.exit();
            }else if(myField.layout[myField.x+1][myField.y] === myField.hat){
                console.log('You found the hat! Congratulations!');
                process.exit();
            }else if(myField.layout[myField.x+1][myField.y] === myField.pathCharacter){
                console.log('You already made that move!');
            }    
            break;
        default: 
            console.log('Invalid Move. Please try again.')
    }
}