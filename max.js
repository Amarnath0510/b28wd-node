console.log("max!!!!!");
console.log(process.argv);

const[,,nums]=process.argv;
console.log(nums);
 const arr=JSON.parse(nums);
 console.log(arr[2]);
 console.log("Max number is",Math.max(...arr));