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
            "Images/Beauty/b3.jpg",
            "Images/Beauty/b4.jpg",
            "Images/Beauty/b5.jpg",
            "Images/Beauty/b6.jpg",
            "Images/Beauty/b7.jpg",
            "Images/Beauty/b8.jpg",
            "Images/Beauty/b9.jpg",
            "Images/Beauty/b10.jpg"
        ],
        fashion: [
            "Images/Fashion/f1.jpg",
            "Images/Fashion/f2.jpg",
            "Images/Fashion/f3.jpg",
            "Images/Fashion/f4.jpg",
            "Images/Fashion/f5.jpg",
            "Images/Fashion/f6.jpg",
            "Images/Fashion/f7.jpg",
            "Images/Fashion/f8.jpg",
            "Images/Fashion/f9.jpg",
            "Images/Fashion/f10.jpg" 
        ],
        emotions: [
            "Images/Emotions/em1.jpg",
            "Images/Emotions/em2.jpg",
            "Images/Emotions/em3.jpg",
            "Images/Emotions/em4.jpg",
            "Images/Emotions/em5.jpg",
            "Images/Emotions/em6.jpg",
            "Images/Emotions/em7.jpg",
            "Images/Emotions/em8.jpg",
            "Images/Emotions/em9.jpg",
            "Images/Emotions/em10.jpg" 
        ],
        exercise: [
            "Images/Exercise/ex1.jpg",
            "Images/Exercise/ex2.jpg",
            "Images/Exercise/ex3.jpg",
            "Images/Exercise/ex4.jpg",
            "Images/Exercise/ex5.jpg",
            "Images/Exercise/ex6.jpg",
            "Images/Exercise/ex7.jpg",
            "Images/Exercise/ex8.jpg",
            "Images/Exercise/ex9.jpg",
            "Images/Exercise/ex10.jpg"

            
        ],
        knowledge: [
            "Images/Knowlwdge/k1.jpg",
            "Images/Knowlwdge/k2.jpg",
            "Images/Knowlwdge/k3.jpg",
            "Images/Knowlwdge/k4.jpg",
            "Images/Knowlwdge/k5.jpg",
            "Images/Knowlwdge/k6.jpg",
            "Images/Knowlwdge/k7.jpg",
            "Images/Knowlwdge/k8.jpg",
            "Images/Knowlwdge/k9.jpg",
            "Images/Knowlwdge/k10.jpg"   
        ],
        money: [
            "Images/Money/m1.jpg",
            "Images/Money/m2.jpg",
            "Images/Money/m3.jpg",
            "Images/Money/m4.jpg",
            "Images/Money/m5.jpg",
            "Images/Money/m6.jpg",
            "Images/Money/m7.jpg",
            "Images/Money/m8.jpg",
            "Images/Money/m9.jpg",
            "Images/Money/m10.jpg"
        ],
        pets: [
            "Images/Pets/p1.jpg",
            "Images/Pets/p2.jpg",
            "Images/Pets/p3.jpg",
            "Images/Pets/p4.jpg",
            "Images/Pets/p5.jpg",
            "Images/Pets/p6.jpg",
            "Images/Pets/p7.jpg",
            "Images/Pets/p8.jpg",
            "Images/Pets/p9.jpg",
            "Images/Pets/p10.jpg"
        ],
        relationships:  [
            "Images/Relationships/r1.jpg",
            "Images/Relationships/r2.jpg",
            "Images/Relationships/r3.jpg",
            "Images/Relationships/r4.jpg",
            "Images/Relationships/r5.jpg",
            "Images/Relationships/r6.jpg",
            "Images/Relationships/r7.jpg",
            "Images/Relationships/r8.jpg",
            "Images/Relationships/r9.jpg",
            "Images/Relationships/r10.jpg" 
        ],
        skills: [
            "Images/Skills/s1.jpg",
            "Images/Skills/s2.jpg",
            "Images/Skills/s3.jpg",
            "Images/Skills/s4.jpg",
            "Images/Skills/s5.jpg",
            "Images/Skills/s6.jpg",
            "Images/Skills/s7.jpg",
            "Images/Skills/s8.jpg",
            "Images/Skills/s9.jpg",
            "Images/Skills/s10.jpg"  
        ],
        hobbies: [
            "Images/Hobbies/h1.jpg",
            "Images/Hobbies/h2.jpg",
            "Images/Hobbies/h3.jpg",
            "Images/Hobbies/h4.jpg",
            "Images/Hobbies/h5.jpg",
            "Images/Hobbies/h6.jpg",
            "Images/Hobbies/h7.jpg",
            "Images/Hobbies/h8.jpg",
            "Images/Hobbies/h9.jpg",
            "Images/Hobbies/h10.jpg"
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