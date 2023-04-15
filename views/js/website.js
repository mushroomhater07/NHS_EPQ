$(document).ready(()=>{
    var user;
    try{  let decodedCookie = decodeURIComponent(document.cookie);
            user = decodedCookie.substring(7, undefined)
        if( user.length !== 0){
            logged();
        }}
    catch{}
$("#createnew").click(function(){
    if($("#searchbox").val().trim().length == 0){
        alert("Please enter something");
    }else{
        $.post("/createtag", {tag: $("#searchbox").val().trim()}, function(data){
            if(data.msg == "created"){
                alert("topic is created")
            }
            // console.log(data.href[0].tagid)
            window.location.href = `/post?tag=${data.href[0].tagid}&post=-1`
    })}
})
$("#searchbox").keyup(function(){
    $("#result").html("");
    // .remove();
    const sql = $("#searchbox").val().trim();
        $.post("/gettag", {connect : sql}, function(data){
            $("#result").html("");
            for (let index = 0; index < data[0].length; index++) {
                const block = document.createElement("a")
                block.href = `/post?tag=${data[1][index]}&post=-1`
                block.style = "margin: 0 3px;"
                block.innerHTML = data[0][index];
                $("#result").append(block)
                // console.log(data[1][index])
            }
        });
    if( $("#searchbox").val().trim() == ""){}
});
$("#random").click(function(){
    $.post("/gettag", {mode : "random"}, function(data,status){
        if(data !== ""){window.location.href = `/post?tag=${data}&post=-1`
    }else{console.log("no topic found")}
    });
})

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
                 $('#loginmodal').modal('toggle')}
        })
    }
})
$("#register").submit((e)=>{
    e.preventDefault();
    const email = $("#email").val();
    const username = $("#username").val();
    const password = $("#password2").val();
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
                $("#invalid").show();
            }
        })
    }
})
// $("#forgot").click(()=>{
//     $.post("/forgot",{user: $("#welcomebox").html()},(data)=>{
//         if(data =="done"){
            
//         alert("check your email")
//         window.location.href = `/forgot?user=${$("#welcomebox").html()}`
//         }
// })
// })
   
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
}
})