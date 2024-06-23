/*
custome.js V 1.0.0
This prepared to work with bootstarp and jquery
*/

class ScrollStyle {
    constructor(btnUp = '#btn-up') {
        this.btnUp = btnUp;
    }
    //Change Scroll Background Color
    /*
    ## Prameters:
    ### selctor: by default #navbar >> Bootstrap Navbar 
    ### far: the instance to change happen by default after 50px
    ### toggleClass: that class has propertes you want change by default 'bg-dark'  
    */
    chNavBg = (selctor = '#navbar', far = 50, toggleClass = 'bg-dark') => {
        if ($(window).scrollTop() > far) {
            $(selctor).addClass(toggleClass)
        } else {
            $(selctor).removeClass(toggleClass)
        }
    }
    //Hide Scroll while you scroll down and show it while you scroll up
    /*
    ## Prameters:
    ### selctor: by default #navbar >> Bootstrap Navbar 
    ### wodk: to contoll on/true and off/false
    */
    hideNavbarTop = (work = true, selctor = '#navbar') => {

        let navHeight = $(selctor).outerHeight();
        if (work) {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                $(selctor).css({
                    'top': `-${navHeight}px`
                })

            } else {
                $(selctor).css({
                    'top': '0'
                })
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }
    }
    //Change active class while scroll down and up
    /*
    ## Prameters:
    ### sections: group of elemnts you want change the color when arrive to each of them 
    ### Linkes: group of anchors that change when you scroll / <a> required
    ### active: calss name you want switch it between them
    ## 
    */
    changeActiveWhenDown = (sections = 'section', linkes = '.navbar-nav li a', active = 'active') => {
        $(sections).each(function(index, section) {
            let count = $(this).get(0).getBoundingClientRect();
            if (count.top >= -50 && count.top <= 300) {
                $(linkes).each(function(index, link) {
                    if ($(link).attr('href').slice(1) == $(section).attr('id')) {
                        $(link).addClass(active)
                        $(link).parent().siblings().find('a').removeClass(active)
                    }
                })
            }
        })
    }
    /*
    # Btn toggle
    ## Prameters:
    ### duration: the time that you want hide and show the btn in it
    ### position: the body position that you want show and hide your btn in it
    */
    btnUpToggle = function(duration = 500, position = 1000) {
        if ($(window).scrollTop() > position) {
            $(this.btnUp).fadeIn(duration)
        } else {
            $(this.btnUp).fadeOut(duration)
        }
    }
    /*
    # btnUpClicked
    ## Prameters:
    ### duration: the time that you want scroll up in it.
    */
    btnUpClicked = (duration = 1000) => {
        $(this.btnUp).click(function() {
            $('html,body').animate({
                scrollTop: 0
            }, duration);
        })
    }
}
/*
#Slidebar: to controle in hide and show side baer and change the colors
## prameters: 
### sidbar: sidebar's selctor 
### togglebtn: btn selctore that you'll open and close the sidebar
### colorElems: the group of elements that you'll based on them to change site main color.
*/

class Sidebar {
    constructor(sidebar = '.color-box', toggleBtn = '#color-box-switch', colorElems = '.color-option') {
        this.sidebar = sidebar
        this.toggleBtn = toggleBtn;
        this.sidebarWidth = $(this.sidebar).outerWidth();
        $(this.sidebar).css('left', `-${this.sidebarWidth}px`)
        this.widthToggleBtn = $(this.toggleBtn).outerWidth();
        console.log(this.widthToggleBtn)
        $(this.toggleBtn).css('right', `-${this.widthToggleBtn}px`)
        this.colorElems = colorElems;
        this.root = document.documentElement
    }
    /*
    # toggleSidebar: to hide and show your site
    ## Prameters:
    ### duration: the time that you want to hide and show the sidebar through it
    */
    toggleSidebar = (duration = 1500) => {
        $(this.toggleBtn).click(() => {
            $(this.toggleBtn).children().toggleClass('fa-spin')
            if ($(this.sidebar).css('left') == '0px') {
                $(this.sidebar).animate({
                    'left': `-${this.sidebarWidth}px`
                }, duration)
            } else {
                $(this.sidebar).animate({
                    'left': 0
                }, duration)
            }
        })
    }
    /*
    # pickColor: to change the side color
    ## prameters
    ### mainColor: is the CSS variable that you want based on it to chnage color
    ### border: to controll in border true/false
    ### borderWidth, borderStyle, borderColor: to coustmize the border.
    */
    pickColor = (mainColor = '--main-color', border = true, borderWidth = '1px', borderStyle = 'solid', borderColor = '#333') => {
        let borderCss = {
            borderWidth,
            borderColor,
            borderStyle
        }
        if (border) {
            $('.default').css(borderCss)
        }
        $(this.colorElems).click(function() {
            document.documentElement.style.setProperty(mainColor, $(this).css('background-color'))
            if (border) {
                $(this).css(borderCss)
                $(this).parent().siblings().children().css('border', 'none')
            }
        })
    }
}

/*
#switchActiveLink: to switch the active linke between the navbar linkes (that's based on bootsttrap navbar component)
## Prameters
### links: is group of links that in navbar
### active: is the class that you want fix it when navigation 
### duration: is the duration of the transition to the section that related 
*/
function switchNavActiveLink(links = '.nav-link', active = 'active', duration = 1000) {
    $(links).click(function() {
        $(this).addClass(active)
        $(this).parent().siblings().children().removeClass('active')
        let currentRev = $(this).attr('href');
        let secTop = $(currentRev).offset().top;
        $('body,html').animate({
            scrollTop: secTop
        }, duration)
    })
}

class Slider {
    constructor() {

    }
    switchActiveLinke = (lies = $('#portfolio-nav li')) => {
        lies.click(function() {
            $(this).addClass('color-main');
            $(this).siblings().removeClass('color-main');
        })
    }
    openModule = (elements = '#proto-container .img-cover', module = '#fixed-box', changeItem = '#fixed-box img') => {
        let index = 0;
        $(elements).click(function() {
            index = $(this).attr('id')
            let imgSrc = $(this).prev().attr('src');
            $(module).removeClass('d-none');
            $(module).addClass('d-flex');
            $(changeItem).fadeIn(500)
            $(changeItem).attr('src', imgSrc)
        })
        $(module).click(function(e) {
            $(module).addClass('d-none');
            $(module).removeClass('d-flex');
            $(changeItem).css('display', 'none')
        })
        $('#fixedContent').click(function(e) {
            e.stopPropagation()
        })
        $('#btn-close').click(function() {
            $(module).addClass('d-none');
            $(module).removeClass('d-flex');
            $(changeItem).css('display', 'none')
        })
        $('#btn-right').click(function() {
            if (index >= $(elements).length - 1) {
                index = 0;
            } else {
                index++;
            }
            $(changeItem).attr('src', $(elements).eq(index).prev().attr('src'))
        })
        $('#btn-left').click(function() {
            if (index < 0) {
                index = $(elements).length - 1;
            } else {
                index--;
            }
            $(changeItem).attr('src', $(elements).eq(index).prev().attr('src'))
        })
    }
}

/*Counter*/
function counter() {
    let counte1 = 0;
    let counte2 = 0;
    let counte3 = 0;
    let counte4 = 0;
    let counter1 = setInterval(() => {
        $('#counter1').html(counte1++)
        if (counte1 == 35) {
            clearInterval(counter1)
        }
    }, 100)
    let counter2 = setInterval(() => {
        $('#counter2').html(counte2++)
        if (counte2 == 63) {
            clearInterval(counter2)
        }
    }, 50)
    let counter3 = setInterval(() => {
        $('#counter3').html(counte3++)
        if (counte3 == 325) {
            clearInterval(counter3)
        }
    }, 10)
    let counter4 = setInterval(() => {
        $('#counter4').html(counte4++)
        if (counte4 == 217) {
            clearInterval(counter4)
        }
    }, 20)
}