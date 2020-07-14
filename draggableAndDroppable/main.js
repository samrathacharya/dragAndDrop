const item = document.querySelector('.item');
const resizers = document.querySelectorAll(".resizer")
let currentResizer;
let isResizing = false;

// 3 events needed when making a movable component
// 1. Mousedown
    //2. Mousemove
    // 3. Mouseup 
function mousedown(e){
    // Add additional event listeners
    // 1. mousemove: Accounts for changing the location of the object
    
    // Adding to window bc sometimes the cursor may not be inside the div
    window.addEventListener('mousemove',mousemove);
    window.addEventListener('mouseup', mouseup);

    // Current cursor position
    let prevX = e.clientX;
    let prevY = e.clientY;

    console.log(prevY);

    function mousemove(e){
        if (!isResizing){
            // See if mouse decreased value in x,y axis
            let newX = e.clientX - prevX;
            let newY = e.clientY - prevY;
            // Get the four courners making up the rectangle
            const rect = item.getBoundingClientRect();
            
            item.style.left = rect.left + newX + "px";
            item.style.top = rect.top + newY + "px";

            // Reassign prevX and prevY
            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseup(){
        // Remove event listeners
        window.removeEventListener('mousemove',mousemove);
        window.removeEventListener('mousedown',mousedown);
    }
}

item.addEventListener("mousedown",mousedown);
for (let resizer of resizers){
    resizer.addEventListener("mousedown",mousedown);

    function mousedown(e){
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mousemove', mousemove);
        currentResizer = e.target;
        console.log(currentResizer);
        let prevX = e.clientX;
        let prevY = e.clientY;
        isResizing = true;

        function mousemove(e){
            let newX = e.clientX - prevX;
            let newY = e.clientY - prevY;
            const rect = item.getBoundingClientRect();

            
            // SE - Width and height increase
            if (currentResizer.classList.contains('se')){
                item.style.width = rect.width + newX + "px";
                item.style.height = rect.height + newY + "px";
            }

            // SW - Left, height increase, width decreases
            if (currentResizer.classList.contains('sw')){
                item.style.width = rect.width - newX + "px";
                item.style.height = rect.height + newY + "px";
                item.style.left = rect.left + newX + "px";
            }

            // NE: width, Top increaes, height decreases
            if (currentResizer.classList.contains('ne')){
                console.log(newY);
                item.style.width = rect.width + newX+"px";
                item.style.height = rect.height - newY + "px";
                item.style.top = rect.top + newY+"px";
            }

            // NW: Top, left increase, width, height decrease
            if (currentResizer.classList.contains('nw')){
                console.log(newY);
                item.style.width = rect.width - newX+"px";
                item.style.height = rect.height - newY + "px";
                item.style.top = rect.top + newY+"px";
                item.style.left = rect.left + newX + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function mouseup(){
            window.removeEventListener('mousedown',mousedown);
            window.removeEventListener('mousemove',mousemove);
        }
    }
}

