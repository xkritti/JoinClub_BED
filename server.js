require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
const soap = require('soap');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const url = 'https://passport.psu.ac.th/authentication/authentication.asmx?wsdl';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 8899);

let club_lists = [
    {
        "id": 4,
        "club_name": "Basketball Club",
        "club_image": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/12670098_996772417055706_1129148728793863501_n.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_eui2=AeH27gCcToKqKqOLkrBYe5UUNLEnddz4g-U0sSd13PiD5Uhd1O2tSa2B2svuWWDmyHHg9a2D1tDuL_zISJZcAiPA&_nc_oc=AQnoxCGZbIYBmkKtVbwh8elgO0YeElpFMek5SD50JRhZWutMhd_thMJufSpmxV5PzxE&_nc_ht=scontent.fbkk10-1.fna&oh=31666cd26ec87abeb9e633bbe4ab2410&oe=5EB602F8",
        "club_des": "Basketball",
        "member_name": [
            {
                "name": "",
                "stdID": ""
            }
        ],
        "people": 0
    },
    {
        "id": 3,
        "club_name": "PSU PIX Club",
        "club_image": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t31.0-8/p960x960/10476600_513268582107344_1187194267533613272_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_eui2=AeGVVKR17bDUkrHYElufLFyJ4UtpbR-s03nhS2ltH6zTeSEYlXBWRfdG4-Y_mzrG6sjFJ8kQaj1wg9VqTlfhweqU&_nc_oc=AQkVhds72NOzhey7U62B8pyvDtloBde02LuHKF_UwuYsL6BteQHwI7krVeU1P7FpyGg&_nc_ht=scontent.fbkk10-1.fna&_nc_tp=6&oh=5849f54d46e2249d5a1c0bda1e075efc&oe=5EB63217",
        "club_des": "ชมรมถ่ายภาพ ม.อ. ภูเก็ต",
        "member_name": [
            {
                "name": "",
                "stdID": ""
            }
        ],
        "people": 0
    },
    {
        "id": 2,
        "club_name": "Volunteer Club",
        "club_image": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/40161848_1038154879679483_5038912630178185216_n.png?_nc_cat=103&_nc_sid=85a577&_nc_eui2=AeF-FSDIAwP278aAqiAJ5ohFbTBOaIcoDKVtME5ohygMpSYwoveJlZkqqYwmS0VJODB0CZD4dWaf_-4YaNodDkid&_nc_oc=AQm8Oj6oWR2WjqSPTgZxnnZ8AtLJtZeFPn8JsjYRgnvxTUYEQT1fDsDdkBjH53scWi4&_nc_ht=scontent.fbkk10-1.fna&oh=b314b4af6118abf058ddc742c6868815&oe=5EB38720",
        "club_des": "จิตอาสา",
        "member_name": [
            {
                "name": "",
                "stdID": ""
            }
        ],
        "people": 0
    },
    {
        "id": 1,
        "club_name": "Music Club",
        "club_image": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/p960x960/36623013_2261189060574279_2249124680420032512_o.png?_nc_cat=105&_nc_sid=85a577&_nc_eui2=AeEv-M354LCx-35yJJjv0WA-xImTY0py6MrEiZNjSnLoyndkwdXxvLSOHL3PEyd8VYgbfLKpnfrvFGaoiKS9KVXn&_nc_oc=AQlygz7TdpeyExgWS4R_DC1yw4Xn7dWmiLthPUyTFyj1GAFknXv8VNzkWs7cv0y5DyY&_nc_ht=scontent.fbkk10-1.fna&oh=47e7eecbbcf5d95e94025316d7ba79d7&oe=5EB50278",
        "club_des": "PSU Phuket Campus , Music Club",
        "member_name": [
            {
                "name": "",
                "stdID": ""
            }
        ],
        "people": 0
    },
    {
        "id": 0,
        "club_name": "eSport Club",
        "club_image": "https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/40095712_221386955395033_8157893025557643264_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_eui2=AeG0Tc7XARwKb2wBaeXrH9EK6Veo74qoOwHpV6jviqg7AQINYFjBILYIdnK1c8Uubb1JTok4-eC8sf-77xY4lgKv&_nc_oc=AQmG6MJx9IpbIKPvWQqIGTmCIGICj8L2abcvJIkIXnTdoGucAYHUxKxZArODJb1xSHE&_nc_ht=scontent.fbkk10-1.fna&oh=f67c179f23eeb5ec14c915cb44def05c&oe=5EB26607",
        "club_des": "PSU Phuket Campus , eSport Club",
        "member_name": [
            {
                "name": "",
                "stdID": ""
            }
        ],
        "people": 0
    }
]

app.post('/Login', (req, res) => {
    soap.createClient(url, (err, client) => {
        if (err) console.error(err);
        else {
            let user = {}
            user.username = req.body.username
            user.password = req.body.password
            client.GetStudentDetails(user, function (err, response) {
                if (err) console.error(err);
                else {
                    res.send(response);
                }
            });
        }
    });
})

app.get("/clublist", (req, res) => {
    res.json(club_lists)
});

app.get('/clublist/:id', (req, res) => {
    let id = req.params.id
    let club_list = club_lists.find(data => (data.id === +id))
    res.json(club_list);
})

app.post('/clublist', (req, res) => {
    var club_list = {}
    club_list.id = club_lists.length > 0 ? club_lists[0].id + 1 : 0
    club_list.club_name = req.body.club_name
    club_list.club_image = req.body.club_image
    club_list.club_des = req.body.club_des
    club_list.member_name = req.body.member_name
    club_list.people = req.body.people
    club_lists.unshift(club_list)
    res.json({ message: "Successfull" })
})

app.put('/update/:id_club', (req, res) => {
    let id = req.params.id_club
    let index = club_lists.findIndex(data => (data.id === +id))
    club_lists[index].club_name = req.body.club_name
    club_lists[index].club_image = req.body.club_image
    club_lists[index].club_des = req.body.club_des
    club_lists[index].member_name = req.body.member_name
    club_lists[index].people = req.body.people
    res.json({ message: 'Club updated!' });
})

app.delete('/delete/:id_club', (req, res) => {
    let id = req.params.id_club
    let index = club_lists.findIndex(data => data.id === +id)
    club_lists.splice(index, 1)
    res.json({ message: 'Club deleted!'});
})

app.use("*", (req, res) => res.status(404).send('404 Not found'));

const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});