// Check if a number is palindrom or not
function checkPalindrome(number) {
    let num = Number(number)
    let reversedNum = 0

    while(num > 0){
       let remainder = Math.floor(num / 10)
         reversedNum = (reversedNum * 10) + (num % 10)
        num = remainder
    }


    reversedNum = Number(reversedNum)

    if(number === reversedNum){
        console.log(`${number} is a Palindrome`);  
    } else {
        console.log(`${number} is not a Palindrome`); 
    }
    
}


checkPalindrome(13431)