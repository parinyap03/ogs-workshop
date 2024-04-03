function maxArray() {
    const arr = [22, 19, 2, 89, 77];
    const result = Math.max(...arr);
    return result;
}
console.log('1.) ' + maxArray());

function sortArray() {
    const arr = [22, 19, 2, 89, 77];
    const result = arr.sort((a, b) => a - b);
    return result;
}
console.log('2.) ' + sortArray());

function pyramid(rows) {
    let result = '';
    for (let i = 0; i < rows; i++) {
        result = ' ';
        for (let j = 0; j < rows - i; j++) {
            result += ' ';
        }
        for (let k = 0; k <= i; k++) {
            result += '* ';
        }
        console.log(result);
    }
    
}

console.log('3.) ');
pyramid(5);

