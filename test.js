const count = 1000000;
const testArray = [...new Array(count).keys()];
let testStart, testEnd;

console.log("Testing for Loop: ");
testStart = Date.now();
const mappedA = [];
for (let i = 0; i < count; i++) {
  mappedA.push(testArray[i] + 5);
}
testEnd = Date.now();
console.log(`Done in ${testEnd - testStart}ms`);

console.log("Testing for..in Loop: ");
testStart = Date.now();
const mappedB = [];
for (let i in testArray) {
  mappedB.push(testArray[i] + 5);
}
testEnd = Date.now();
console.log(`Done in ${testEnd - testStart}ms`);

console.log("Testing .map(): ");
testStart = Date.now();
const mappedC = testArray.map((v) => v + 5);
testEnd = Date.now();
console.log(`Done in ${testEnd - testStart}ms`);
