

const sliders = (slides, dir, prev, next) => {  // slides - селектор для всех слайдов, dir - направление слайдераб prev/next - кнопки переключения
    let slideIndex = 1;              // текущий слайд, кот виден пользователю
    let paused = false;             // отвечает за остановку авто-переключения слайдера
    const items = document.querySelectorAll(slides);

    function showSlides(n) {  // n - количество items
        // если переданное количество слайдов меньше числа, переданного в функцию - показываем первый слайд
        if (n > items.length){
            slideIndex = 1;
        }
        // если передано отрицательное число, показываем последний слайд
        if (n < 1){
            slideIndex = items.length;
        }

    //     добавляем анимацию всем слайдам и изначально их все скрываем

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        // показываем первый
        items[slideIndex -1].style.display = 'block';
    }

    showSlides(slideIndex);
    
    
    function changeSlides(n) {  // n - будет передано или 1 или -1
        showSlides(slideIndex += n);
    }


    // если кнопок нет в слайдере (как в первом), чтобы код не обрушился, помещаем этот кусок в try/catch, так он будет работать только когда он нужен
    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        })

    } catch (e){}
    

    function activateAnimation() {
        //  условие для авто переключения и направления слайдера
        if (dir === 'vertical'){
            paused = setInterval(()  => {
                changeSlides(1);
                items[slideIndex - 1].classList.add('zoomIn');
            }, 3000)    // интервал такжe можно передавать как аргумент функции
        } else {
            paused = setInterval(() => {
                changeSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
        }
    }

    activateAnimation();

    // отключениe авто-переключения слайдера
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};


export default sliders;