// JavaScript source code
var myData = {
    "appData": {
        // "user_id": 0,
        "starttime": "",
        "endtime": "",
        // "createdAt":"",
        // "buddy_details": "",
        // "session_id": "",
        "rightanswers": 0,
        "wronganswers": 0,
    },
    "attempt": [
    ]
}
var attempt = {
    "qid": 0,
    "starttime": "",
    "endtime": "",
    "failattempt": [
    ],
    "answer": {
        "answerid": 0,
        "answertime": ""
    }
}
var failattempt = {
    "optionid": "",
    "answertime": ""
}
var moon = {
    start: function (lng) {
        myData.userId = $.cookie("user_id");
        myData.buddyIds = $.cookie("buddy_ids");
        myData.appName = "Astroamer_Moon_Track";
        // myData.user.session_id = $.cookie("session_id");
        myData.createdAt = timeStamp();
        myData.appData.starttime = timeStamp();
        myData.language = lng;
        moon.save();
    },
    addQuestion: function () {
        console.log(qid);
        //debugger;
        var obj = null;
        for (var i = 0; i <= myData.attempt.length - 1; i++) {
            if (myData.attempt[i].qid == qid) {
                obj = myData.attempt[i];
                break;
            }
        }
        if (obj == null) {
            obj = $.extend(true, {}, attempt);
            obj.qid = qid;
            myData.attempt.push(obj);
        } else {
            obj.qid = qid;
        }
        myData.attempt[qid-1].starttime = timeStamp();
        moon.save();
    },
    addAnswer: function (id, e) {
        console.log(id);
        //debugger;
        var obj = null;
        for (var i = 0; i <= myData.attempt.length - 1; i++) {
            if (myData.attempt[i].qid == qid) {
                obj = myData.attempt[i];
                break;
            }
        }
        if (obj == null) {
            obj = $.extend(true, {}, attempt);
            obj.qid = qid;
            if (e) {
                obj.answer = id;
                obj.answertime = timeStamp();
            } else {
                var att = $.extend(true, {}, failattempt);
                att.optionid = id
                att.answertime = timeStamp();
                obj.failattempt.push(att);
            }
            myData.attempt.push(obj);
        } else {
            obj.qid = qid;
            if (e) {
                obj.answer = id;
                obj.answertime = timeStamp();
            } else {
                var att = $.extend(true, {}, failattempt);
                att.optionid = id
                att.answertime = timeStamp();
                obj.failattempt.push(att);
            }
        }
        moon.save();
        moon.updateScore();
    },
    save: function () {
        $.cookie("data", JSON.stringify(myData));
        console.log(myData);
    },
    readData: function () {
        myData = $.parseJSON($.cookie("data"));
    },
    end: function () {
        myData.appData.endtime = timeStamp();
        moon.save();
    },
    updateScore: function (s) {
        myData.appData.rightanswers = s;
        myData.appData.wronganswers = 10 - s;
        moon.save();
        /*$.ajax({
            url: "../saveJson.php?data=" + $.cookie("data"),
            success: function (response) {
                console.log(response);
                window.open('../data.json', '_blank');
            }
        });*/
        csrftoken = $.cookie("csrftoken");
        $.ajax({
            type: "POST",
            data: {
                "payload": $.cookie("data"),
                'csrfmiddlewaretoken': csrftoken,
            },
            url: "/tools/logging",
            datatype: "json",
            success: function (data) {
                console.log(data);
            }
        });
    }
}

function timeStamp() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

function setuserdetail() { // You don't need this function, since cookie is coming from some other place
    $.cookie("user_id", "1");
    $.cookie("session_id", "qe6wydl8mflsw3fol8u92t7e0os1q4z2");
    $.cookie("user_and_buddy_ids", "1&988");
}
