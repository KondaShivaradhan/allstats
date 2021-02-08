var discord = require('discord.js')
const si = require('systeminformation');
const fs = require('fs');
const client = new discord.Client();
const prefix = '-';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
client.once('ready', () => {
    console.log('====================================');
    console.log('Namasthe');
    console.log('====================================');
})
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const comd = args.toString().toLowerCase();
    var file = 'Specs are \n'
    var arr2 = [];
    console.log(request.connection.remoteAddress);
    if (comd === ',spec') {
        var count = 0;

        si.cpu()
            .then(data => {
                var temp = 'CPU- ' + data.manufacturer + data.brand;
                // message.channel.send(temp)
                file = file + temp + '\n'
                count++;
            })

        .catch(error => console.error(error));
        si.graphics()
            .then(data => {
                var temp = 'GPU- ' + data.controllers[0].model;
                // message.channel.send(temp)
                file = file + temp + '\n'
                count++;

            })

        .catch(error => console.error(error));
        si.diskLayout()
            .then(data => {
                var output = 'Storage- ';
                for (let index = 0; index < data.length; index++) {
                    arr2[index] = data[index].type + '--' + parseFloat((data[index].size * 10) / 10000000000).toFixed(0) + 'GB'
                }
                arr2.forEach(element => {
                    output = output + element + '  '
                });
                // message.channel.send(output)
                file = file + output + '\n'
                count++;


            })
            .catch(error => console.error(error));
        si.system()
            .then(data => {
                var temp = 'MotherBoard- ' + data.model
                    // message.channel.send(temp)
                file = file + temp + '\n'
                count++;

            })
            .catch(error => console.error(error));
        si.memLayout()
            .then(data => {
                var output = 'Ram Sticks- ';
                var add = 0;
                for (let index = 0; index < data.length; index++) {
                    add = add + +parseFloat((data[index].size * 9.31) / 10000000000).toFixed(0)
                    arr2[index] = '  ' + parseFloat((data[index].size * 9.31) / 10000000000).toFixed(0) + 'GB'

                }
                arr2.forEach(element => {
                    output = output + element + '  '
                });
                var temp = output + ' total ' + add + 'GB with ' + data[0].clockSpeed + 'MHZ ClockSpeed'
                    // message.channel.send(temp)
                file = file + temp + '\n'
                count++;

            })
            .catch(error => console.error(error));
        // wait(3 * 1000).then(() => {
        //     message.channel.send(file)
        //     fs.writeFile('/Spec.txt', file, function(err) {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         console.log("The file was saved!");
        //     });
        // });
    }
})

client.login(process.env.dtoken)