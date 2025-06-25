const arr = [1, 2, 3, 4, 5]

// Polyfill for filter function

if(!Array.prototype.myFilter){
    Array.prototype.myFilter = function(userFn) {
        const result = []
        for(let i = 0; i < this.length; i++) {
            if(userFn(this[i], i)){
                result.push(this[i])
            }
        }

        return result
    }
}

const newArr = arr.myFilter(function(value, index){
    return value % 2 === 0
})


console.log(newArr)