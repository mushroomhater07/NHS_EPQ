const express = require('express');
const app = express();
const port = 80;

const server = require('http').createServer(app);
const io = require ("socket.io")(server, {cors:{origin:["*"],},});

const crypto = require('crypto-js');
const fs = require('fs');
const db = require("./database");
const mail = require('./mailer')
// const block = require("./post.js")

// const authHelper = require('./authHelper')
// app.set('views', './views');
app.set("view engine", "ejs");

app.use('/js',express.static(__dirname+'/views/js'));
app.use('/css',express.static(__dirname+'/views/css'));
app.use(express.json());           //accept data in JSON format
app.use(express.urlencoded({ extended: true }));

//////////////////////////index/////////////////////////
app.get('/', async(req, res) => {     //return the index.html
    fs.appendFile(__dirname+"/data/ip", req.ip + ",", (_err) => {});//req.socket.remoteAddress, req.ip
    //trend
    var result = "";
    try {result = await db.promise().query("SELECT title, tagid FROM tag ORDER BY dateupdate DESC LIMIT 0,7")
        result = result[0]}
    catch(e){result=null}

    res.render('index', {trend: JSON.stringify(result),});  
})
app.post('/gettag',async function(req,res){ //return tag for search + random
    var titlearray = [];
    var linkarray = [];
    const result = await db.promise().query(`SELECT title, tagid FROM tag`)//LIMIT 0, 10
    if(req.body.mode == "random"){
        var index = Math.floor(Math.random()*(result[0].length));
        try{res.send(result[0][index].tagid.toString())}
        catch{res.send("")}
        
    }else{ //non-random
        for (let index = 0; index < result[0].length; index++) {
            const element = result[0][index].title;
            if(element.indexOf(req.body.connect) !== -1){
                titlearray.push(element)
                linkarray.push(result[0][index].tagid)
            }
        }
        res.send([titlearray, linkarray])
    }
});
app.post('/createtag',async function(req, res){  //create(insert) tag in index
    const result = await db.promise().query(`SELECT * FROM tag WHERE title = "${req.body.tag.toLowerCase()}"`)
    //search for same
    var msg = "";
    if (result[0].length == 0){
        db.promise().query(`INSERT INTO tag(title) VALUES("${req.body.tag.toLowerCase()}")`);              
        //input the value tag title
        //query cant deal with errors
        msg = "created";
    }
    const result1 = await db.promise().query(`SELECT tagid FROM tag WHERE title = "${req.body.tag.toLowerCase()}"`) 
    //get the tagid to goto website
    res.send({href:result1[0], msg: msg})
}); 
app.get('/post',async(req, res) =>{//req.session //req.query //req.body //req.params
    try{
    if(req.query.post == -1){
    const postid = await db.promise().query(`SELECT post_id FROM post WHERE tagid = "${req.query.tag}" ORDER BY updatetime DESC LIMIT 0, 1`)
    try{res.redirect(`/post?tag=${req.query.tag}&post=${postid[0][0].post_id}`)}
    catch{
        const channel = await db.promise().query(`SELECT title FROM tag WHERE tagid = '${req.query.tag}'`); //get tag title
        res.render("post", {
            tag: req.query.tag,
            tagtitle: channel[0][0].title,
            post:"",
            posttitle:"-Empty tag-",
            postcontent:"",
            postdetail:"{}",
        })
    }
    }else{
    const postdetail = await db.promise().query(`SELECT * FROM post WHERE tagid = '${req.query.tag} ORDER BY updatetime DESC'`); //get all post
    const channel = await db.promise().query(`SELECT title FROM tag WHERE tagid = '${req.query.tag}'`); //get tag title
    const title = await db.promise().query(`SELECT title,detail FROM post WHERE post_id = '${req.query.post}'`);
    res.render("post", {
        tag: req.query.tag,
        tagtitle: channel[0][0].title,
        post:req.query.post,
        posttitle: title[0][0].title,
        postcontent: title[0][0].detail,
        postdetail: JSON.stringify(postdetail[0]),
    })}
    }catch(e){console.log(e);res.redirect("/")}
})
app.post("/newpost", async(req,res)=>{
    const result1 = await db.promise().query(`SELECT userid FROM user WHERE username = "${req.body.userid}"`)
    const user = result1[0][0].userid;
    const sql = `INSERT INTO post (title, detail, tagid, userid,content) VALUES("${req.body.title}","${req.body.detail}","${req.body.tagid}","${user}","");SELECT @@identity; `
    const result = await db.promise().query(sql)
   fs.writeFile(__dirname+`/data/${Object.values(result[0][1][0])[0].toString()}`,"",()=>{})
    res.send(Object.values(result[0][1][0])[0].toString())
})
//CHECK
app.post('/login', async(req, res)=>{
    var sql = "";
    if(req.body.check=="true"){
        if(req.body.email == "true"){
            sql = `SELECT username FROM user WHERE email = "${req.body.value}"`;
        }else{
            sql = `SELECT username FROM user WHERE username = "${req.body.value}"`;
        }
        var result = await db.promise().query(sql)
        res.send(result[0][0])
    }else{
        if(req.body.login == "true"){
            if(req.body.otpcheck == "true"){
                const result = await db.promise().query(`SELECT otp FROM user WHERE username = "${req.body.value}"`)
                if(req.body.otp == result[0][0].otp){res.send("logged")}else {res.send("notlog")};
            }else{
            const result = await db.promise().query(`SELECT pass FROM user WHERE username="${req.body.value}"`)

            if(crypto.SHA256(result[0][0].pass).toString() ==crypto.SHA256(req.body.password).toString()){
                res.send("logged")
            }else{
                const ran = Math.round(Math.random() * 999998+1)
                const email = await db.promise().query(`SELECT email FROM user WHERE username="${req.body.value}"`)
               console.log()
                mail.send(`${email[0][0].email}`,"",`${ran}`)
                await db.promise().query(`UPDATE user SET otp = ${ran} WHERE email = "${email[0][0].email}"`)
                res.send("notlog")//mailer
            }
        }
        }else{
            const sql = `INSERT INTO user(username, email, pass) VALUES("${req.body.username}","${req.body.email}","${crypto.SHA256(req.body.password).toString()}")`
            try{const result = await db.promise().query(sql)
            res.send("successcreate")    
        }
            catch{ res.send("404")}
        }   
    }
})
// app.post("/forgot",async(req,res)=>{
//     
//     console.log(await mail.send("chinghey.lau@newhallstudent.co.uk","Reset Password", `${ran}`))
//     res.send("done")
// })
// app.get("/forgot",async(req,res)=>{
//     res.render("forgot")
// })
// app.post("/checkforgot")


server.listen(port, ()=>{console.log("port" + port)
    require('dotenv').config();
}); //open server 3000
//socket.io begins
io.on("connection", (socket)=>{
    socket.on("getcomment",async(postid,cb)=>{
        var data2;
        if(fs.existsSync(__dirname+`/data/${postid}`)){
        fs.readFile(__dirname+`/data/${postid}`, 'utf-8', (_err, data) => {
            try{data2 = data.substring(1,undefined)}
            catch{data2 = ""}
            cb(`[${data2}]`)
        })
    }
    })
    socket.on("newcomment",async(post, cmt,_cb)=>{
        var data2; //for getting prev hash
        var prevhash;
        console.log(fs.existsSync(__dirname+`/data/${post}`))
        if(fs.existsSync(__dirname+`/data/${post}`)){}else{console.log("run");fs.writeFile(__dirname+`/data/${post}`,"",()=>{})}
        fs.readFile(__dirname+`/data/${post}`, 'utf-8', (_err, data) => {
        if(data.length <= 2){prevhash = 0}else{
                data2 = JSON.parse(`[${data.substring(1, undefined)}]`);
                // console.log(data2[data2.length-1]) 
                prevhash = crypto.SHA256(JSON.stringify(data2[data2.length - 1])).toString();   
            }
            if(cmt.prevhash == prevhash){console.log("checked")}else {
                console.log("seems wrong")
            console.log(cmt.prevhash, "vs" ,prevhash)};
            cmt.detail.ip = socket.handshake.address
            socket.broadcast.emit("newcomment", post,cmt)
            fs.appendFile(__dirname+`/data/${post}`, ","+JSON.stringify(cmt), (_err) => {});
        })        
    })
})



// 
// io.to(socket.id).emit()   
//object for for loop to make comment + create commen object 
//need index - for version + comment id
    
