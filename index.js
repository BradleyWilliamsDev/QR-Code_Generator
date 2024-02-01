/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import fs from 'fs';
import qr from 'qr-image';

let url;

const questions = [
    {
      type: 'input',
      name: 'url',
      message: "Enter the url you want to turn into a qr code",
    }];

inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '   '));
    url = answers.url;

    console.log(`This is the url ${url}`);

    fs.writeFile("URL.txt", url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    var qr_code = qr.image (url, {type: 'png'});
    qr_code.pipe(fs.WriteStream(`${url}.png`));

    var png_string = qr.imageSync(url, {type: 'png'});
});



