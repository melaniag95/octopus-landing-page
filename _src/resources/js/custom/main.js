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

$('button.navbar-toggler').on('click', function (){
  if($('button.navbar-toggler').attr('aria-expanded')== 'true') {
      $('#HeaderNavbar .container').addClass('bg-dark');
      $('#HeaderNavbar').addClass('bg-dark');
  } else {
      $('#HeaderNavbar').removeClass('bg-dark');
      $('#HeaderNavbar .container').removeClass('bg-dark');
  };

    const navLinks = document.querySelectorAll('.nav-item')
    const menuToggle = document.getElementById('CollapseNavbar')
    const bsCollapse = new bootstrap.Collapse(menuToggle)
    navLinks.forEach((l) => {
        l.addEventListener('click', () => { bsCollapse.toggle() })
    })
})
