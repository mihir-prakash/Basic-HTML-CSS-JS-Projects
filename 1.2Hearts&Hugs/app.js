/*
-Note: If you assign a value to a variable without declaring it, JavaScript creates a global variable implicitly. But this can lead to bugs, unintended consequences.
*/

const colorPicker = document.getElementById("colorpicker");
const canvasColor = document.getElementById("canvascolor");
const fontSelect = document.getElementById("fontsize");
const canvas = document.getElementById("Canvasboard");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const retrieveButton = document.getElementById("retrieve");
const eraser = document.getElementById('erase');

const ctx = canvas.getContext('2d');  /*creating a 2D rendering context */
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let iserase = false;
let backgroundColor='#DDC4BD';
;
let linethickness;

colorPicker.addEventListener("change", (e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
    eraser.textContent = "Eraser"
    iserase = false;
       

});

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener("mousemove",(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);       
        ctx.stroke();
        
        //update the location of pointer
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
    if(iserase){
        ctx.strokeStyle = backgroundColor;
        ctx.lineWidth = '50px';
    }
})

canvas.addEventListener('mouseup',()=>{
    isDrawing = false;
})

canvasColor.addEventListener("change", (e)=>{    
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500);
    backgroundColor = e.target.value;
    console.log(backgroundColor);
});

fontSelect.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
    linethickness = e.target.value;
   
})

clearButton.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width, canvas.height);
})

eraser.addEventListener('click', ()=>{
    iserase = !iserase; // Toggle the eraser state
    if (iserase) {
        // Set eraser settings
        ctx.strokeStyle = backgroundColor;
        ctx.lineWidth = '50px'; // Set a larger width for erasing
        eraser.textContent = "Switch to Pen"; // Update button text
    } else {
        // Restore previous settings
        ctx.strokeStyle = colorPicker.value;
        ctx.lineWidth = linethickness;
        eraser.textContent = "Eraser"; // Update button text
    }
})

saveButton.addEventListener('click',()=>{
    localStorage.setItem('canvasContent', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();    
    link.click();
})

retrieveButton.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContent'); //return a dataURL string of canvas image
    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
        
    }
})