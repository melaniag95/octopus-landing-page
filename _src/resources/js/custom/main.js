//Animations scroll
window.addEventListener('scroll', () => {
    let page = this;
    let pageTop = this.scrollY;
    let pageHeight = this.outerHeight / 2 ;

    let frames = document.querySelectorAll('.scrollAnim');
    frames.forEach( frame => {
        let frameTop = frame.offsetTop;
        let frameHeight = frame.offsetHeight;

        if ( pageTop  >= frameTop - pageHeight &&
            pageTop  < frameTop + frameHeight/2 ){
            frame.classList.add('anim');
        }else{
            frame.classList.remove('anim');
        }
    });
});

//Calculate screen height
const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

//Scroll down button
$(function() {
    $('.scroll-down').click (function() {
        $('html, body').animate({scrollTop: $('section#about-us').offset().top });
        return false;
    });
});
