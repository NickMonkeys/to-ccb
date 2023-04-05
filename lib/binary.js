function toString(bin) {
    const arr = bin.split(' ');
  	return arr.map(item => {
        let asciiCode = parseInt(item, 2);
        let charValue = String.fromCharCode(asciiCode);
        return charValue
    }).join('');
}

// 字符串转二进制
function toBinary(str) {
    let list = str.split('');
    return list.map(item => {
        return item.charCodeAt().toString(2);
    }).join(' ');
}
const data = toBinary('我们abc1')
console.log(data);
const str = toString(data);
console.log(str)