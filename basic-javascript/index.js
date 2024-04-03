const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// not wait for the user to respond
let value = rl.question(`What's your name?`, name => {
    console.log(`Hi ${name}!`);
    rl.close();
});
// wait for the user to respond
async function main() {

    try {
        let value = await new Promise((resolve, reject) => {
            rl.question(`What's your name?`, name => {
                if (name === 'bam') {
                    resolve(name)
                } else {
                    reject("Error")
                }
                rl.close()
            });

        })
        console.log(`My name is ${ value }`);
    } catch (error) {
        console.log({ error });
    }

}
main()