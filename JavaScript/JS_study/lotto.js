var numbers = Array(45).fill().map(function(yo, index) {
    return index + 1;
});

var suffle = [];
while(numbers.length > 0) {
    var shake = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    suffle.push(shake);
}

var bonus = suffle[suffle.length - 1];
var pick = suffle
    .slice(0, 6)
    .sort(function(p, c) { 
        return p - c; 
    });

console.log(suffle);
console.log(pick + ", " + bonus);