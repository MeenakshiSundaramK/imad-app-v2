console.log('Loaded!');

var element = document.getElementById('main-text');
element.innerHTML='New Version';

var img = document.getElementById('madi');
img.onclick = function()
{
    img.style.leftmargin='100px';  
};