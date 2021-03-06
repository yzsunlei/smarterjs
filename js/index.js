/* 函数式，对象式封装调试
window.onload = function(){
    alert(Base.getId('footer').innerHTML);
    alert(Base.getTag('div').length);
    alert(Base.getName('nav').length);
    alert($('footer').innerHTML);
}
 */
 
/* 连缀写法封装调试 */
window.onload = function(){
/* 
    $().getId('footer').css('color','red').html('smarterjs').click(function(){
        //alert(this.innerHTML);
        //alert($().getId('footer').html());//对html函数的进一步封装
        //alert($().getTag('footer').css('color'));//对css函数的进一步封装
        //alert($().getClass('imgtext-flow').css('color'));//封装getClass函数
        //alert($().getClass('imgtext-flow','imgtext').css('color'));//对getClass函数的进一步封装
        //$().getClass('imgtext-flow').getElement(1).css('color','red');//增加选择器方法getElement
        //$().getId('footer').css('background','green').addClass('test').removeClass('layout');//封装添加类名函数和移除类名函数
        
    });
    //下拉菜单调试
    $().getClass('links-me').getElement(0).hover(function(){
        $().getClass('links-list').show();
    },function(){
        $().getClass('links-list').hide();
    });
    //后台登录弹出框调试
    $().getClass('links-login').getElement(0).click(function(){
        $().getId('mask').lock();
        $().getId('link-login').center(400,180).show();
    });
    $().getClass('link-close').getElement(0).click(function(){
        $().getId('mask').unlock();
        $().getId('link-login').hide();
    });
    $().getId('link-login').center(400,180).resize(function(){
        $().getId('link-login').center(400,180);
    });
    $().getId('link-login').drag();
    //加入书签弹出框调试
    $().getClass('links-insert').getElement(0).click(function(){
        $().getId('mask').lock();
        $().getId('link-book').center(400,180).show();
    });
    $().getClass('link-close').getElement(1).click(function(){
        $().getId('mask').unlock();
        $().getId('link-book').hide();
    });
    $().getId('link-book').center(400,180).resize(function(){
        $().getId('link-book').center(400,180);
    });
    $().getId('link-book').drag();
    
 */
    //alert($('#footer').html());
    //$('#footer').css('color','red').html('smarterjs');
    //$('.layout').css('background','red');
    //$('p').css('color','red');//问题
    //$('#content').find('.section').css('color','red');
    //$('#article').find('p').css('color','red');
    //$('.section').find('p').css('color','green');
    
    //下拉菜单调试
    $('.links-me').hover(function(){
        $('.links-list').show();
    },function(){
        $('.links-list').hide();
    });
    //后台登录弹出框调试
    $('.links-login').click(function(){
        $('#mask').lock();
        $('#link-login').center(400,180).show();
    });
    $('.link-close').eq(0).click(function(){
        $('#mask').unlock();
        $('#link-login').hide();
    });
    $('#link-login').center(400,180).resize(function(){
        $('#link-login').center(400,180);
    });
    $('#link-login').drag();
    //加入书签弹出框调试
    $('.links-insert').click(function(){
        $('#mask').lock();
        $('#link-book').center(400,180).show();
    });
    $('.link-close').eq(1).click(function(){
        $('#mask').unlock();
        $('#link-book').hide();
    });
    $('#link-book').center(400,180).resize(function(){
        $('#link-book').center(400,180);
    });
    $('#link-book').drag();
}

 
