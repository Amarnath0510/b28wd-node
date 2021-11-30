console.log("Hello,amar");

function sum(a,b){
    return a+b;
}
console.log(sum(4,5));
// console.log(process.argv);

const[, , num1,num2]=process.argv;
console.log(sum(+num1,+num2));