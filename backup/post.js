


    // socket.emit("message", "new Rectangle(0,5))")
    // localStorage.setItem("Comment","hi5")


//     $.post("/post",{tag:"<%= session%>",post:"<%= sessionpost%>"},(data,status) =>{
//         $("#content").html(""); 
//         console.log(data.comment)
//         for (let index = 0; index < data.comment.length; index++) {
//             const element = data.comment[index];
//             var div = document.createElement("div");
//             div.className = "cmt";
//             div.style = "border-bottom: 5px blue inset;"
//             div.innerHTML = element.detail;
//             document.getElementById("section").append(div);
//         }
//         $("#post").html("");
//         // console.log(data.postdetail)
//         for (let index = 0; index < data.postdetail.length; index++) {
//             const element = data.postdetail[index];
//             var div = document.createElement("div");
//             div.className = "postlist";
//             div.style = "border-bottom: 5px blue inset;"
//             div.innerHTML = element.title;
//             document.getElementById("post").append(div);
//         }
//         // console.log(data.title);
//         $("#title1").html(data.title);
//         $("#channel").html(data.channel);
//     })
//     // console.log(comment)

//     // var post = JSON.parse(postdget);
//     // console.log(JSON.parse(post)[0].title);
//     // const io = require("socket.io-client");
//     // function reloadcmt(){for (let index = 0; index < comment[0].length; index++) {
//     //    
//     // };}reloadcmt()
    
//     $("#remove").click(function(){
//         array.forEach(element => {
//         });
//     })
//     // socket.on("connect", () => {
//     // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//     // });

//     // socket.on("disconnect", () => {
//     // console.log(socket.id); // undefined
//     // });
//     $("#join").click(function(){
//         var valid = true;
//         var email = false;
//         var spacevalid = true;
//         var inputjoin = $("#inputjoin").val().trim();
//         Array.from(inputjoin).forEach(
//             (e, i) => { var x = e.charCodeAt(0);
//                 if(x == 32 || x == 10){//32 spacebar//10next line
//                     spacevalid = false;
//                 }else if(x == 64){
//                     email = true;
//                 }else if((x >= 48 && x <= 57) || (x >= 65 && x <= 90) || (x>=97 && x<=122)){}
//                 else{
//                     valid = false;
//                 }
//             });
//             if (inputjoin != 0 || spacevalid == true){
//                 if(email == true){
//                     $.post("/formpost", {email: true, input: inputjoin}, (data, status)=>{
//                         console.log(data);
//                         console.log(status)
//                     })
//                 }else if(email == false && valid == true){
//                     $.post("/formpost", {email: false, input: inputjoin}, (data, status)=>{
//                         console.log(data);
//                         console.log(status)
//                     })
//                 }else{
//                     alert("Username should not have symbol");
//                 }
//             }else{
//                 alert("invalid input")
//             }
//         });
$("#subcomment").click(function(){
    var userid = 1
    var input = $("#commentdetail").val(); //.trim()
    if (input.length > 0){
        var i = 0; var x = "";
    do {
        x = input[i].charCodeAt(0);
        if(x == 32 || x == 10){
            i++;
        }else{break;}
    } while (true); 
    input = input.substring(i);}
    console.log(sessionpost)
    socket.emit(`${postid}`,input)
//         $.post("/createcomment", {commentdetail: input, postid: sessionpost, userid: userid},function(data){
//             console.log(data)
//             //socket.io
//         })
});
//     $("#subtopic").click(function(){console.log("topic posting")
//         var title = $("#topictitle").val().trim(); 
//         var detail = $("#topicdetail").val().trim();
//         if(title.length == 0 || detail.length == 0){
//             alert("Please enter valid data");
//         }else{
//             console.log(title, detail)
//             $.post("/createpost", {titletopic: title, detail: detail, tag: "<%= session%>"}, function(data){
//                 // window.location.href = `/post?tag=${data.tag}&post=${data.post}`
//             })
//         }
//     });
//           // function changeUrl(href)
//         // {
//         // $('.middle').load(href);
//         // href = (href == "") ? "/" : href;
//         // uri = window.location.href.split("#/");
//         // window.location.href = uri[0] + "#/" + href;
//         // }
        // else{
            // document.getElementById("result").innerHTML.trim() == "";
        //     var button = document.createElement("button");
        //     button.innerHTML= "Create New Tag";
        //     button.style = "margin-top: 10px;";
        //     button.id = "createnew";
        //     button.setAttribute('onclick',"createnew1()");
        //     $("#result").append(button);