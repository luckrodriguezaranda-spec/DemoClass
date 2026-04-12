const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
const images = document.querySelectorAll('.draggable');

let items = [];
let dragging = false;
let index = -1;
let offsetX = 0, offsetY = 0;
let draggedImageSrc = null;


function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    };
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    items.forEach(i => {
        ctx.drawImage(i.img, i.x, i.y, i.w, i.h);
    });
}


function hit(x, y) {
    for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (
            x > it.x &&
            x < it.x + it.w &&
            y > it.y &&
            y < it.y + it.h
        ) {
            return i;
        }
    }
    return -1;
}


images.forEach(img => {
    img.ondragstart = () => {
        draggedImageSrc = img.src;
    };
});


canvas.ondragover = e => e.preventDefault();

canvas.ondrop = e => {
    e.preventDefault();

    if (!draggedImageSrc) return;

    const pos = getPos(e);
    const img = new Image();

    img.onload = () => {
        const size = 120;

        items.push({
            img,
            x: pos.x - size / 2,
            y: pos.y - size / 2,
            w: size,
            h: size
        });

        draw();
    };

    img.src = draggedImageSrc;

    draggedImageSrc = null;
};


canvas.onmousedown = e => {
    const pos = getPos(e);
    index = hit(pos.x, pos.y);

    if (index !== -1) {
        dragging = true;
        offsetX = pos.x - items[index].x;
        offsetY = pos.y - items[index].y;
    }
};

document.onmousemove = e => {
    if (!dragging) return;

    const pos = getPos(e);

    items[index].x = pos.x - offsetX;
    items[index].y = pos.y - offsetY;

    draw();
};

document.onmouseup = () => {
    dragging = false;
};


clearBtn.onclick = () => {
    items = [];
    draw();
};


window.loadImages = function (category) {
    const container = document.getElementById("image-list");
    container.innerHTML = "";
    // Add the rest of your images :) 
    const imageBank = {
        beauty: [
            "Images/Beauty/b1.jpg",
            "Images/Beauty/b2.jpg",
            "Images/Beauty/b3.jpg"
        ],
        fashion: [
           
        ],
        emotions: [
           
        ],
        exercise: [
            
        ]
    };

    const imgs = imageBank[category] || [];

    imgs.forEach(src => {
        const img = document.createElement("img");
        img.src = src;

        img.className = "w-28 h-28 object-cover rounded cursor-grab";
        img.draggable = true;

        img.addEventListener("dragstart", () => {
            draggedImageSrc = img.src;
        });

        container.appendChild(img);
    });
};

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset importante
    ctx.scale(dpr, dpr);

    draw();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
document.addEventListener("dragend", () => {
    draggedImageSrc = null;
});