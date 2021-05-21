var express = require('express');
var app = express();
const https = require('https');
const axios = require('axios')
var mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ApexM = require('./modals/Apex');
var url = process.env.URI;
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
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
const Apex = require('./modals/Apex');
const r6api = new R6API("kondashivaradhan007@gmail.com", "Rlsss@5007");
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
app.get('/', function(req, res) {

    res.render('index')
});
app.get('/battlefield', function(req, res) {
    res.render('bfs')
});

app.get('/bf/:Name', function(req, res) {
    var bfv = 0
    var bf1 = 0
    var bf4 = 0
    var nobf = 0
    var id = req.params.Name
    const start = async function() {
        let response4
        response4 = await axios.get(
            "https://api.gametools.network/bf4/stats/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf4 = undefined
        });
        let response5
        response5 = await axios.get(
            "https://api.gametools.network/bfv/all/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bfv = undefined
        });
        if (response5.data.error) {
            bfv = undefined
        }

        // if (response4.data.error) {
        //     bf4 = undefined
        // }
        let response1
        response1 = await axios.get(
            "https://api.gametools.network/bf1/all/?name=" + id + "&lang=en-us", {}
        ).catch(error => {
            bf1 = undefined
        });
        if (response1.data.error) {
            bf1 = undefined
        }
        if (bf1 != undefined)
            bf1 = response1.data
        if (bf4 != undefined)
            bf4 = undefined
            // bf4 = response4.data

        if (bfv != undefined)
            bfv = {...response5.data }
        console.log(bf1);
        console.log(bfv);

        if (bf1 == undefined && bfv == undefined && bf4 == undefined) {
            nobf = 'Buy a Game NOOB'
        }
        res.render('bf', { bfv, bf4, bf1, id, nobf })

    }
    start()
});

app.get('/apex/:Name', function(req, res) {

    const id = req.params.Name
    apex.user(id, 'PC').then(data => {
        global.ap = {...data.data }
        var obj = {};
        try {
            function data() {
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("Names");
                    var myobj = { uname: id };
                    dbo.collection("Apex").updateOne({ uname: id }, { $set: { uname: id } }, { upsert: true })
                });
            }

            ap.stats.forEach(element => {
                Object.assign(obj, {
                    [element.metadata.name]: element.value
                });
            });
            if (typeof ap != 'undefined') {
                data()
                res.render('apexold', { ap, obj });
            } else {
                res.render('refresh')

            }
        } catch (error) {
            res.render('refresh')
        }
    });
});

app.get('/r6/:Name', function(req, res) {
    const un = req.params.Name
    const username = req.params.Name
    platform = 'uplay';
    const start = async function() {
        try {
            const id = await r6api.getId(platform, username).then(el => el[0].userId);
            const stats = await r6api.getStats(platform, id).then(el => el[0]);
            const rank = await r6api.getRank('uplay', id, { regions: ['apac'] });

            ba = rank[0]
            ra = rank[0].seasons[Object.keys(ba.seasons)].regions.apac
            var obj = {};

            await r6.getGenericStats(un, 'pc', 'all').then(userStats => {
                rdatao = userStats
                global.ro = rdatao

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
        } catch (error) {
            res.render('refresh')
        }
    }
    start()

});
app.get('/pc', function(req, res) {
    res.render('pc')
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
    function data() {

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("Names");
            dbo.collection("Apex").find({}).toArray(function(err, result) {
                if (err) throw err;
                obj = result;
                var an = [];
                for (var o in obj) {
                    an.push(obj[o].uname);
                }
                db.close();
                res.render('apex', { an: an });
            });
        });
        // var sql = "SELECT uname FROM apex";

        // con.query(sql, function(err, result) {
        //     if (err) throw err;
        //     obj = result;
        //     var an = [];
        //     for (var o in obj) {
        //         an.push(obj[o].uname);
        //     }
        //     res.render('apex', { an: an });
        //     console.log(an);
        // });
    }
    data()
});

app.listen(process.env.PORT || 5000)
console.log('====================================');
console.log('sever started');