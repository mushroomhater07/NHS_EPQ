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
    constructor(index, prevhash, user, Content) {
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
module.exports = {blockchain , Block, Content};
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