// var Student =
// {
//     name : "ABC",
//     age : 18,
//     dept : "CSE",
//     score : 90
// };
class Content{
    constructor(time, browser, clientip, comment){
        this.timestamp = time;
        this.browseragent = browser;
        this.ip = clientip;
        this.comment = comment;
    }; 
}
class Block{
    constructor(index,  user,prevhash, Content) {
        this.index = index;
        this.user = user;
        this.prevhash = prevhash;
        this.detail = Content;
    }
}
class blockchain{  //container for block only, not for saving anything new
    constructor(){
        this.chain = [this.start()]
    }
    start(){    return new Block(0, 0,0,0,null)}
    addNewBlock(Block1){
        // console.log(crypto.SHA256("jo").toString())
        Block1.index = this.chain.length;
        Block1.prevhash = this.getLastBlock().thishash;
        console.log(Block1)
        Block1.thishash = crypto.SHA256(JSON.stringify(Block1)).toString()
        console.log(Block1.thishash)
        // console.log(this.getLastBlock())
        // console.log(this.chain);
        
        this.chain.push(Block1);
    }
    getLastBlock(){ return this.chain[this.chain.length - 1]}
}
// module.exports = {blockchain , Block, Content};
// let whatsup = new blockchain();
// whatsup.addNewBlock(new Block(0,0,4,0,new Content("hi","","","","")))
// whatsup.addNewBlock(new Block(0,0,4,0,new Content("hi","","","","")))
// whatsup.addNewBlock(new Block(0,0,4,0,new Content("hi","","","","")))
// function checkChainValidity(){
//     for(let i = 1; i < this.blockchain.length; i++){
//         const currentBlock = this.blockchain[i];
//         const precedingBlock= this.blockchain[i-1];

//       if(currentBlock.hash !== currentBlock.computeHash()){
//           return false;
//       }
//       if(currentBlock.precedingHash !== precedingBlock.hash)
//         return false;
//     }
//     return true;
// }checkChainValidity();

//login
$(document).ready(()=>{
    var user;
    try{  let decodedCookie = decodeURIComponent(document.cookie);
            user = decodedCookie.substring(7, undefined)
        if( user.length !== 0){
            logged();
        }}
    catch{}
// LOGIN
$("#join").click(() =>{
    $("#invalid").hide();
    const value = $("#joinbox").val().trim();
    const checking = true;
    var email = false;
    if(value.length <= 0){}else{
        $("#joinbox").val("");
        if(value.includes("@")){
          if(value.includes("@newhallstudent.co.uk")){
            // EMAIL + CHECKING
            email = true;
            $("#email").val(value)
          }else{
            alert("please enter ...@newhallstudent.co.uk")
            window.location.reload(true);
        }
        }else{
            //non-email + checking
            email = false;
            $("#username").val(value)
        }

        $.post("/login",{value: value, email: email, check: checking},(data,status)=>{
            console.log(data)
            if(data == ""){
                $('#regmodal').modal('toggle')
            }else{
                $("#welcomebox").html(data.username)
                $(".welcomebox").html(data.username)
                 $('#loginmodal').modal('toggle')}
        })
    }
})
$("#otp").submit((e)=>{
    $("#invalid").hide()
    e.preventDefault();
    const otp = $("#otp1").val().trim();
    if (otp.length < 1 || otp == 0 ){
        $("#invalid").show();
        console.log("show")
    }else{
        $.post("/login", {value: $("#welcomebox").html(), otp: otp, check:false,login:true,otpcheck:true},(data)=>{
            if(data == "logged"){
                document.cookie = `logged = ${$("#welcomebox").html()};`
                user = $("#welcomebox").html()
                logged();
            }else{
                console.log("notlog")
                $("#invalid").show();
            }
        })
    }
})
$("#register").submit((e)=>{
    e.preventDefault();
    const email = $("#email").val().trim();
    const username = $("#username").val().trim();
    const password = $("#password2").val().trim();
    if(email.length <= 0 || username.length<= 0 || password.length<=6){}else{
        if(email.includes("@newhallstudent.co.uk")){
            $.post("/login",{email: email, username:username, password:password,check:false,login:false},(data)=>{
                if(data =="successcreate"){
                    alert("successfully created")
                    window.location.reload(true);
                }else{
                    alert("error occurs")
                }
            })
        }else{
            alert("you must be a newhall student")
        }
    }
})
$("#login").submit((e)=>{
    e.preventDefault()
    var password = $("#password1").val().trim()
    if(password.length <= 0){}else{
        // console.log($("#welcomebox").html)
        $.post("/login", {password: password, value:$("#welcomebox").html(),check:false, login:true},(data)=>{
            if(data == "logged"){
                document.cookie = `logged = ${$("#welcomebox").html()};`
                user = $("#welcomebox").html()
                logged();
            }else{
                // $("#invalid").show();
                hide();
                $("#otpmodal").modal("show");
            }
        })
    }
})
$("#logout").click(()=>{
    document.cookie ="logged= ;";
    window.location.reload(true);
})
$(".close").click(()=>{
    hide();
});

function logged(){
    hide();
    $(".toprightnav").html(`
    <pre>Hello, ${user}</pre>
    <button id="logout">Logout</button>
    `)
}

function hide(){
    $("#loginmodal").modal('hide');
    $("#regmodal").modal('hide');
    $("#otpmodal").modal('hide');
    $("#invalid").hide();
}
$("#hide").click(()=>{
    // console.log(screen.availWidth)
    // console.log(screen.width)
    if($("#hide").html() == "hide"){
        $(".side").hide();
        $(".middle").css("width","100%");
        $(".detail").css("width","100%")
        $("#hide").html("show");
    }else{
        $(".side").show();
        if(screen.availWidth > 600){
        $(".middle").css("width","70%");
        $(".detail").css("width","70%")}
        $("#hide").html("hide");
    }
})
$("#otp").submit(()=>{
    console.log("otp")
});
})