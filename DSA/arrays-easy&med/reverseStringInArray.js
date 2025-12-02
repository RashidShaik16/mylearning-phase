function reverseTheArray(arr) {
    let len = arr.length
    let halfLen = Math.floor(arr.length/2)

    for(let i = 0; i < halfLen; i++){
        let temp = arr[i]
        arr[i] = arr[len-1-i]
        arr[len-1-i] = temp
    }

    return arr
}


console.log(reverseTheArray(["h", "o", "l", "d"]))