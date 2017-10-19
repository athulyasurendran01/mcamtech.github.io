function getWindowHeight() {
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
        //Non-IE
        myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }

    return myHeight
}

$(function() {
    if(!device.mobile() && !device.tablet() && !device.ipod()){
        $('section.parallax-box').each(function(){
            var obj = $(this),
                bgobj = obj.find('.parallax-bg'),
                bufferRatio = bgobj.data('speed'),
                x;
            
            moveObj();
            $(window).scroll(moveObj);
            
            function moveObj(){
                x = $(window).scrollTop() - obj.offset().top;
                yPos = (parseInt(x / bufferRatio));
                coords = 'center '+ yPos + 'px';
                bgobj.css({ backgroundPosition: coords });
            }
        });
    }
});