let aa;
// let bb;
document.body.addEventListener('keydown', function(e){
    // console.log('1');
    // clearTimeout(aa);
    // console.log('2');
    // bb = e.key;
    aa = setTimeout(() => {
        console.log('down');
    }, 1000);
    // console.log(aa);
    // if(e.key === 'r'){
    //     clearTimeout(aa);
    // }
})
// document.body.addEventListener('keypress', function(e){

//         console.log('press');
//         clearTimeout(aa);
    
// })
document.body.addEventListener('keyup', function(e){

    console.log('up');
    for(let i = 1; i < 999; i++){
        clearTimeout(i);
    }
    

})
