let arr = [5,6,-7,12,-25,100,0, 100, 100, 4, 9]


function findLargest(data) {
    let largest = -Infinity
    let secondLargest = -Infinity

    for(let i = 0; i < data.length; i++){
        if(data[i] > largest) {
            secondLargest = largest
            largest = data[i]
            
        } else {
            if(data[i] == largest) continue
            else if(data[i] > secondLargest){
                secondLargest = data[i]
            }
        }
    }

    return secondLargest

}


console.log(findLargest(arr));
