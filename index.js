// console.log(process.argv)

// if(process.argv[2] === 'add'){
//     console.log("cours added with name",process.argv[3])
// }

// ---------------using COMMANDER --------------------
// import { Command } from 'commander';
// const program = new Command();

// program
//   .name('courses-manager')
//   .description('CLI to make courses')
//   .version('1.0.0');
// program
//   .command('Add')
//   .alias('a')
//   .description('Add a cours')
//   .argument("<title>","add cours title")
//   .option("--price <price>","add cours price")
//   .action((param,option)=>{
//     console.log('param,option',param,option)
//   })
//   program
//   .command('List')
//   .alias('l')
//   .description('List of courses')
//   .action(()=>{
//     console.log('all my courses')
//   })

// program.parse();

// ---------------using COMMANDER with inquirer--------------------

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
const program = new Command();

const questions = [
    {
        type : "input",
        name : "title",
        message : "Enter cours title"
    },
    {
        type : "input",
        name : "price",
        message : "Enter cours price"
    }
  ]

program
  .name('courses-manager')
  .description('CLI to make courses')
  .version('1.0.0');
program
  .command('Add')
  .alias('a')
  .description('Add a cours')

  .action(()=>{
    inquirer
  .prompt(questions)
  .then((answers) => {
    console.log(answers);

    if(fs.existsSync('./courses.json')){
        fs.readFile('./courses.json','utf8', (err, data) => {
            if (err) throw err;
            console.log(data);

            const courses = JSON.parse(data);
            courses.push(answers);
            
            fs.writeFile('./courses.json',JSON.stringify(courses),'utf8',()=>{
                console.log('Added Done !!!');
        
            })

          });
    }
    else{
        fs.writeFile('./courses.json',JSON.stringify([answers]),'utf8',()=>{
            console.log('Added Done !!!');
    
        })
    }
    
  })
  })
  program
  .command('List')
  .alias('l')
  .description('List of courses')
  .action(()=>{
    console.log('all my courses');
    fs.readFile('./courses.json','utf8',(err, data) =>{
        if (err){
            console.log("error is",err);
            process.exit()}
        else{
            console.table(JSON.parse(data))
        }
    })
  })

program.parse();