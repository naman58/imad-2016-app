console.log('Loaded!');
var element=document.getElementById('main-text')
element.innerHTML = 'new VALUE'
//move the image 
var img=document.getElementById('img');
img.onclick = function() {
    img.style.increaseleft='1000px';
}