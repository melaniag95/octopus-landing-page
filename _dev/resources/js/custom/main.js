window.setTimeout(function() {
    let reverseAnimations = document.getElementsByClassName('reverse');
    for(let i=  0; i < reverseAnimations.length; i++) {
        reverseAnimations[i].classList.add('animation-2');
    }
    let linearAnimations = document.getElementsByClassName('linear');
    for(let i=  0; i < linearAnimations.length; i++) {
        linearAnimations[i].classList.add('animation-1');
    }
}, 500)