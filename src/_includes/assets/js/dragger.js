// implementation for dragable elements, set class "dragable" on an
// element that is a member of a div to apply. where the element is your
// "interactor" for moving the div.
//  see /src/_includes/layouts/core.html for an example of use.
// note! data-* supports kebab case in html, and camel for JS (it sucks, I know...)

document.addEventListener('DOMContentLoaded', function () {
    const draggable_elms = document.querySelectorAll('.dragable');

    // for each element with draggable applied, perform work on its parent elm
    // (note I know referencing the parent like this is ugly vs a variable, but
    //  consider a circumstance where you have multiple dragable elms! :)      )
    draggable_elms.forEach(elm => {
        console.log('dragger: found dragable element')
        elm.parentElement.style.position = 'absolute';

        // if a starting coordinate was supplied as a data-* param, use it.
        if (elm.parentElement.dataset.startPosX){
            elm.parentElement.style.left = elm.parentElement.dataset.startPosX; 
            elm.parentElement.style.top = elm.parentElement.dataset.startPosY;  
        }
        // check for dragging start
        elm.addEventListener('mousedown', (event) => {
            event.preventDefault(); // Prevent text selection

            // get a diff between mouse X.Y and elm X.Y
            let shiftX = event.clientX - elm.parentElement.getBoundingClientRect().left;
            let shiftY = event.clientY - elm.parentElement.getBoundingClientRect().top;

            // define a function for moving the element by this offset
            const moveTo = (event) => {
                elm.parentElement.style.left = event.pageX - shiftX + 'px';
                elm.parentElement.style.top = event.pageY - shiftY + 'px';
            };
            document.addEventListener('mousemove', moveTo);

            // define a function that removes the moving event listener
            // and itself when the mouse click is lifted thus stopping movement
            const onMouseUp = () => {
                document.removeEventListener('mousemove', moveTo);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mouseup', onMouseUp);
        });
    });
});