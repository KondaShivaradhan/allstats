var express = require('express');
var app = express();
var path = require('path');
app.use("/public", express.static(path.join(__dirname, "/public")));
app.set('view engine', 'ejs');
const port = 5000
app.use(express.urlencoded({ extended: false }));
var apex = require('./stats/apex.js')
var r6 = require('./stats/r6.js')
    // var bot = require('./stats/bot.js')
    // const API_KEY = 'f582bd87-1ccb-4f27-ad72-61900e1408d6' // from https://battlefieldtracker.com/site-api

const R6API = require('r6api.js');
const r6api = new R6API(process.env.username, process.env.password);

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/', function(req, res) {

    res.render('index')
});
app.get('/bfv', function(req, res) {

    res.render('bfv')
});
app.get('/BlazingBaneApex', function(req, res) {
    apex.user('BlazingBane', 'PC').then(data => {
        var aap = data.data
        global.ap = aap
    });
    wait(3 * 1000).then(() => {
        if (typeof ap != 'undefined')
            res.render('apexold', { ap });
        else {
            res.render('refresh')

        }
        throw new Error("error occurred");
    }).catch(() => {
        console.log('waiting failed');
    });

});
app.get('/apex/:Name', function(req, res) {
    const id = req.params.Name
    apex.user(id, 'PC').then(data => {

        var aap = data.data
        console.log(aap.children[0].stats);
        global.ap = aap
    });
    wait(3 * 1000).then(() => {
        if (typeof ap != 'undefined')
            res.render('apexold', { ap });
        else {
            res.render('refresh')

        }
        throw new Error("error occurred");
    }).catch(() => {
        console.log('waiting failed');
    });

});
app.get('/r6/:Name', function(req, res) {
    const un = req.params.Name
    const username = req.params.Name
    platform = 'uplay';
    const start = async function() {
        const id = await r6api.getId(platform, username).then(el => el[0].userId);
        const stats = await r6api.getStats(platform, id).then(el => el[0]);
        const rank = await r6api.getRank('uplay', id);
        ra = rank[0].seasons['20'].regions.apac
        r6.getGenericStats(un, 'pc', 'all').then(userStats => {
            rdatao = userStats
            global.ro = rdatao

        })
        r6.getOperatorStats(un, 'pc').then(userStats => {
            var rdatao = userStats
            global.r1o = rdatao
        })

        wait(1000).then(() => {
            if (typeof ro != 'undefined' && typeof r1o != 'undefined') {
                var dmax = 1;
                var amax = 1;
                r1o.operators.forEach(element => {
                    if (dmax < element.kills && element.role == 'Defender') {
                        dmax = element.kills
                    }
                })
                r1o.operators.forEach(element => {

                    if (amax < element.kills && element.role == 'Attacker') {
                        amax = element.kills
                    }
                })
                res.render('r6others', { ro, r1o, dmax, amax, ra });
            }
            throw new Error("error occurred");
        }).catch(() => {
            console.log('waiting failed');
        });
    }
    start()
});
app.get('/BlazingBaneR6', function(req, res) {
    const username = 'BlazingBane'
    platform = 'uplay';
    const start = async function() {
        const id = await r6api.getId(platform, username).then(el => el[0].userId);
        const stats = await r6api.getStats(platform, id).then(el => el[0]);
        const rank = await r6api.getRank('uplay', id);
        ra = rank[0].seasons['20'].regions.apac
        r6.getGenericStats('BlazingBane', 'pc', 'all').then(userStats => {
            rdata = userStats
            global.r = rdata
        })
        r6.getOperatorStats('BlazingBane', 'pc').then(userStats => {
            var rdata = userStats
            global.r1 = rdata
                // JSON.stringify
        })
        wait(1000).then(() => {
            if (typeof r != 'undefined' && typeof r1 != 'undefined') {
                var dmax = 1;
                var amax = 1;
                r1.operators.forEach(element => {
                    if (dmax < element.kills && element.role == 'Defender') {
                        dmax = element.kills
                    }
                })
                r1.operators.forEach(element => {

                    if (amax < element.kills && element.role == 'Attacker') {
                        amax = element.kills
                    }
                })
                res.render('r6', { r, r1, dmax, amax, ra });
            } else {
                res.render('refresh')

            }
            throw new Error("error occurred");
        }).catch(() => {
            console.log('waiting failed');
        });
    }
    start()
});
app.get('/discord', function(req, res) {
    res.render('discord')
});
app.listen(process.env.PORT || 5000)
console.log('====================================');
console.log('sever started');
console.log('====================================');