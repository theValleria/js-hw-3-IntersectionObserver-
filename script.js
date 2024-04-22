document.addEventListener("DOMContentLoaded", () => {
    let images = document.querySelectorAll("img[data-src]");
    const loadButton = document.querySelector(".loadButton");

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    }

    const originalSrcs = [];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry);
            }
        }, options);
    })

    const loadImage = function (entry) {
        const image = entry.target;
        const originalSrc = image.getAttribute("src");
        originalSrcs.push(originalSrc);
        image.src = image.getAttribute("data-src");
        image.classList.remove("lazy-load");
        observer.unobserve(image);
    }

    const revertImages = () => {
        images.forEach((image, index) => {
            const dataSrc = image.getAttribute("data-src");
            const originalSrc = originalSrcs[index];
            image.src = originalSrc;
            image.setAttribute("data-src", originalSrc); 
            originalSrcs[index] = dataSrc;
            observer.observe(image);
        })

        originalSrcs.length = 0;
    }


    images.forEach(image => {
        observer.observe(image);
    })

    loadButton.addEventListener("click", () => {
        revertImages()
    })
})


