var express = require('express');
var app = express();
const https = require('https');
const axios = require('axios')

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
const r6api = new R6API("kondashivaradhan007@gmail.com", "Rlsss@5007");

// const r6api = new R6API(process.env.username || "kondashivaradhan007@gmail.com", process.env.password || "Rlsss@5007");

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

app.get('/', function(req, res) {

    res.render('index')
});
app.get('/battlefield', function(req, res) {
    res.render('bfs')
});
app.get('/BlazingBaneApex', function(req, res) {
    apex.user('BlazingBane', 'PC').then(data => {
        var aap = data.data
        global.ap = aap
        if (typeof ap != 'undefined')
            res.render('apexold', { ap });
        else {
            res.render('refresh')

        }
    });
});
app.get('/bf/:Name', function(req, res) {
    var bfv = 0
    var bf1 = 0
    var bf4 = 0
    var nobf = 0
    var id = req.params.Name
    const start = async function() {
        let response5
        response5 = await axios.get(
            "https://api.gametools.network/bfv/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            console.log(error);
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }
        let response6
        response6 = await axios.get(
            "https://api.gametools.network/bfv/weapons/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }
        let response4
        response4 = await axios.get(
            "https://api.gametools.network/bf4/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf4 = 'No bf4'
        });
        if (response4.data.error) {
            bf4 = undefined
        }
        let response1
        response1 = await axios.get(
            "https://api.gametools.network/bf1/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf1 = undefined
        });
        if (response1.data.error) {
            bf1 = undefined
        }
        if (bf1 != undefined)
            bf1 = response1.data
        if (bf4 != undefined)
            bf4 = response4.data
        if (bfv != undefined)
            bfv = {...response5.data, ...response6.data }
        console.log(bf1);
        if (bf1 == undefined && bfv == undefined && bf4 == undefined) {
            nobf = 'Buy a Game NOOB'
        }
        res.render('bf', { bfv, bf4, bf1, id, nobf })

    }
    start()
});
app.get('/bfv/:Name', function(req, res) {
    var bfv = 0

    var nobf = 0
    var id = req.params.Name
    const start = async function() {
        let response5
        response5 = await axios.get(
            "https://api.gametools.network/bfv/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            console.log(error);
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }
        let response6
        response6 = await axios.get(
            "https://api.gametools.network/bfv/weapons/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }
        if (bfv != undefined)
            bfv = {...response5.data, ...response6.data }
        console.log(bfv);
        if (bf1 == undefined && bfv == undefined && bf4 == undefined) {
            nobf = 'Buy a Game NOOB'
        }
        res.render('bf', { bfv, id, nobf })

    }
    start()
});
app.get('/apex/:Name', function(req, res) {
    const id = req.params.Name
    apex.user(id, 'PC').then(data => {
        global.ap = {...data.data }

        var obj = {};
        ap.stats.forEach(element => {
            Object.assign(obj, {
                [element.metadata.name]: element.value
            });
        });

        if (typeof ap != 'undefined')
            res.render('apexold', { ap, obj });
        else {
            res.render('refresh')

        }
    });
});
app.get('/r6/:Name', function(req, res) {
    const un = req.params.Name
    const username = req.params.Name
    platform = 'uplay';
    const start = async function() {
        const id = await r6api.getId(platform, username).then(el => el[0].userId);
        const stats = await r6api.getStats(platform, id).then(el => el[0]);
        const rank = await r6api.getRank('uplay', id, { regions: ['apac'] });
        ba = rank[0]
        ra = rank[0].seasons[Object.keys(ba.seasons)].regions.apac
        var obj = {};

        await r6.getGenericStats(un, 'pc', 'all').then(userStats => {
            rdatao = userStats
            global.ro = rdatao
            console.log('====================================');
            console.log(ro.stats.general);
            console.log('====================================');


            Object.keys(ro.stats.general).forEach(element => {
                Object.assign(obj, {
                    [element]: ro.stats.general[element]
                });
            });
        })

        await r6.getOperatorStats(un, 'pc').then(userStats => {
            var rdatao = userStats
            global.r1o = rdatao
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

                res.render('r6others', { ro, r1o, dmax, amax, ra, obj });
            } else {
                res.render('refresh')
            }
        })
    }
    start()

});
app.get('/pc', function(req, res) {
    res.render('pc')
});
app.get('/BlazingBaneR6', function(req, res) {
    const username = 'BlazingBane'
    platform = 'uplay';
    const start = async function() {
        const id = await r6api.getId(platform, username).then(el => el[0].userId);
        const stats = await r6api.getStats(platform, id).then(el => el[0]);
        const rank = await r6api.getRank('uplay', id);
        ba = rank[0]
        ra = rank[0].seasons[Object.keys(ba.seasons)].regions.apac
        await r6.getGenericStats('BlazingBane', 'pc', 'all').then(userStats => {
            rdata = userStats
            global.r = rdata
        })
        await r6.getOperatorStats('BlazingBane', 'pc').then(userStats => {
            var rdata = userStats
            global.r1 = rdata
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
        })
    }
    start()
});
app.get('/discord', function(req, res) {
    res.render('discord')
});
app.get('/:User/:Legend', function(req, res) {
    const id = req.params.User
    const legend = req.params.Legend

    apex.user(id, 'PC').then(data => {

        adata = {...data.data }
        if (typeof adata != 'undefined')
            res.render('legends', { id, legend, adata })
        else {
            res.render('refresh')
        }
    });

});
app.get('/r6s', function(req, res) {
    res.render('r6s')
});
app.get('/apex', function(req, res) {
    res.render('apex')
});

app.listen(process.env.PORT || 5000)
console.log('====================================');
console.log('sever started');
console.log('====================================');