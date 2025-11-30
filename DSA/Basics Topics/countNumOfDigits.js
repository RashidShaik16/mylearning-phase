// Return the number of digits in a number
function returnNoOfDigits(number) {
    let num = Math.abs(number)
    let digits = 0

    if(num == 0) return 1

    while(num){
        const result = Math.floor(num / 10)      
        num = result
        digits++
    }

    return digits
    
}

console.log(returnNoOfDigits(100));
