// Find the uniques elements in a non decreasing array. Return the number of unique elements and the array with the unique elements placed in their initial position. The rest of the elements can be in any order and length of the array can be anything.


function removeDuplicates(arr) {
    let position = 0
    let uniqueEl = arr[position]
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > uniqueEl){
            arr[position + 1] = arr[i]
            uniqueEl = arr[i]
            position++
        }
    }

    console.log(position+1, arr)
}


removeDuplicates([0, 0, 1, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6])