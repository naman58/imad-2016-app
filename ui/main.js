console.log('Loaded!');
var element=document.getElementById('main-text');
element.innerHTML = 'new VALUE';
//move the image 
var img=document.getElementById('MADI');
var marginLeft = 0;
function moveRight () {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
    var interval= setInterval(moveRight,50);
};