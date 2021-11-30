const fs= require('fs');
fs.readFile('./welcome.txt', "utf-8",(err,data)=>{
  console.log(data);  
}

);

const quote="Life should be happier😂";
const niceQuote="\nMake everyday a little less ordinarily🎈 ";
 fs.appendFile("./awesome.txt",niceQuote,(err)=>{
     console.log("Completed writing");

 });




 const quote="Live more,worry less😂";
 fs.writeFile("./awesome.txt",quote,(err)=>{
     console.log("Completed writing");

 });

fs.unlink("./awesome.txt",(err)=>{
  console.log("Deleted successfully");  
});




 const quote2="Live more,worry less😂";
 function createQuotes(quote){


 for(let i=0;i<=10;i++){
     fs.writeFile(`./backup/text-${i}.txt`,quote2,(err)=>{
         console.log("Completed writing!!!",i);
     });
 }
 }
 createQuotes(quote2);


 const quote2="Live more,worry less😂";
 function createQuotes(noOfFiles,quote){


 for(let i=0;i<=noOfFiles;i++){
     fs.writeFile(`./backup/text-${i}.txt`,quote,(err)=>{
         console.log("Completed writing!!!",i);
     });
 }
 }

  const[, , noOfFiles]=process.argv;
  createQuotes(noOfFiles,quote2);



fs.readdir("./backup",(err,files)=>{
    if(err){
        console.log(err);
    }
    console.log(files);
});
