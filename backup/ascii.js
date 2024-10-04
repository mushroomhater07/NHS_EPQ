// for(var i = 0; i < 200; i++) {
//     // console.log(i)
//     console.log(i+String.fromCharCode(i));
//     //48 to 57 
//     //65 to 90
//     //97 to 122
// }
function main(){
var hi = "str"
for(var i = 0; i < hi.length; i++) {
    var valid;
    var char1 = hi[i].charCodeAt(0);
    switch(char1) {
        case 32: // spacebar
        case 10: //next line
        case 64: // @
            $.post()
        // case (x < 48)://1-47
        //     valid = false;
        //     break;
        // case (x < 58)://48 to 57 - integer
        //     break;
        // case(x < 65)://58 to 64
        //     valid = false;
        //     break;
        // case (x < 91)://65 to 90 - Ucase
        //     break;
        // case (x < 97)://91 to 96
        //     valid = false;
        //     break;
        // case (x < 123)://97 to 122 - Lcase
        //     break;
        default:
            valid = false;
            break;
    }
    console.log(valid)
}
}