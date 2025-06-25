const arr = [1, 2, 3, 4, 5]
const arr2 = []

// Polyfill for myForEach

if(!Array.prototype.myForEach){
    Array.prototype.myForEach = function(userFn){

        for(let i = 0; i < this.length; i++){
            userFn(this[i], i)
        }
    }
}

arr.myForEach(function(value, index){
    arr2.push(value * 2)
})

console.log(arr)
console.log(arr2)