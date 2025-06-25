const arr = [1, 2, 3, 4, 5]

// Polyfill for map function

if(!Array.prototype.myMap) {
    Array.prototype.myMap = function(userFn) {
        const result = []
        for(let i = 0; i < this.length; i++) {
           result.push(userFn(this[i], i))
        }

        return result
    }
}

const newArr = arr.myMap(function(value, index){
    return  value * 2
})

console.log(newArr)