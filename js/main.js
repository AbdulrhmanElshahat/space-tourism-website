let 
    openBtn = $('.menue-btn'),
    closeBtn = $('.close-btn'),
    menue = $('.menue');

openBtn.click(function(){
    menue.css('display' , 'flex').animate({
        right : 0
    }, 300)
    $('body').css('overflow','hidden')
})

closeBtn.click(function(){
    $(this).parent('.menue').animate({
        right : - menue.innerWidth()
    }, 300 , _=> menue.css('display' , 'none'))
    $('body').css('overflow','auto')
})

$(window).resize(function(){
    if($(window).width() > 540){//mobile width
        menue.css({
            'display' : 'flex',
            right : 0
        })
    }else{
        menue.css({
            'display' : 'none',
            right : - menue.innerWidth()
        })
    }
})
// Elements its content com from API (json file)
let container = $('.container').data('name'),
    image =$('.image img'),
    theName = $('.name'),
    theDescription = $('.description'),
    contentIndex = $('.content').data('num'),
    thTravel = $('.Est-travel-time .value'),
    theDistance = $('.Avg-distance .value')

$.getJSON('data.json',function(data){
    let info = data;
    if(container !=='home'){
        getContent(theName,info,container,contentIndex , 'name')
        getContent(theDescription,info,container,contentIndex , 'description')
        getContent(thTravel,info,container,contentIndex , 'travel')
        getContent(theDistance,info,container,contentIndex , 'distance')
        getContent(image,info,container,contentIndex , 'images' , 'png')

        if(container === 'technology'){
            let arrImg = Array.from(image),
            bigImg = $(arrImg[0]),
            smallImg = $(arrImg[1]);
            bigImg.attr('src',(info[container][contentIndex].images.portrait) )
            smallImg.attr('src',(info[container][contentIndex].images.landscape) )
        }

        if(container === 'crew'){
        theDescription.text(info[container][contentIndex].bio)
        $('.nick-name').text(info[container][contentIndex].role)
        }
    }
})
function getContent(ele , data , section ,index , content , type){
    if(ele !== image){
        ele.text(data[section][index][content])
    }else{
        ele.attr('src',data[section][index][content][type])
    }
}

let explore = $('.content-explore span')
explore.hover(function(){
    $(this).parent().css('background-color' , 'rgba(255, 255, 255, 0.04)')
} , function(){
    $(this).parent().css('background-color' , 'inherit')
})




