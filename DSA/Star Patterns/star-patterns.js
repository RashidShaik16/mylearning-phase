// Basic 4x4 grid star pattern
function fourByFourStarPattern() {
    for(let i = 0; i < 4; i++) {
        let row = ""
        for(let j = 0; j < 4; j++){
            row = row + "* "
        }
        console.log(row);      
    }
}

// Stars should increase by every row
function oneToFourIncrementalPattern(){
    for(let i = 1; i < 5; i++){
        let row = ""
        for(let j = 0; j < i; j++){
            row = row + "* "
        }
        console.log(row);
    }

}


// Prints the numbers which increases by each row
function printNumberStarPattern(){
    for(let i = 1; i <= 5; i++){
        let num = ""
        for(let j = 1; j <= i; j++){
           num = num + j + " "
        }
         console.log(num);
    }
}


// Prints the same number and increases by every row
function printSameNumberStarPattern(){
    for(let i = 1; i <= 5; i++){
        let num = ""
        for(let j = 1; j <= i; j++){
           num = num + i + " "
        }
         console.log(num);
    }
}


// Prints the numbers in reverse order which decreases by each row
function printNumberInReverseOrder() {
    for(let i = 5; i > 0; i--){
        let num = ""
        for(let j = 1; j <= i; j++){
            num = num + j + " "
        }

        console.log(num);
        
    }
}


// Prints the incremental stars but in the row reverse order
function printStarsInRowReverse() {
    let stars = ""
    for(let i = 1; i <=5; i++){
        let spaces = ""
        for(let j = 5; j > i; j--){
            spaces = spaces + " "
        }
        stars = stars + "*"
        console.log(spaces + stars);
        
    }

}


// Print numbers of 1 and 0 alternatively
function printNumbersOfOneZeroAlternatively() {
     let turn = false
        for(let i = 1; i <= 5; i ++){
            let num = ""
            for(let j = 1; j <= i; j++){
                if(turn) {
                    num = num + "0 "
                } else {
                    num = num + "1 "
                }
                turn = !turn
            }

            console.log(num);
            
        }
}

// fourByFourStarPattern()
// oneToFourIncrementalPattern()
// printNumberStarPattern()
// printNumberInReverseOrder()
// printStarsInRowReverse()
printNumbersOfOneZeroAlternatively()