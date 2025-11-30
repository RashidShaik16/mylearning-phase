// Reverse the given integer number including the negative integers

function reverseTheInteger(number) {
    let copyNumber = number
    let reversedInt = 0
    if(copyNumber < 0) copyNumber = Math.abs(copyNumber)
        

        while(copyNumber > 0) {
            reversedInt = (reversedInt * 10) + (copyNumber % 10)
            copyNumber = Math.floor(copyNumber / 10)
            
        }

    if(number < 0) reversedInt -= (reversedInt*2) 

        console.log(reversedInt);
        
}



reverseTheInteger(-123)