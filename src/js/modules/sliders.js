

const sliders = (slides, dir, prev, next) => {  // slides - селектор для всех слайдов, dir - направление слайдераб prev/next - кнопки переключения
    let slideIndex = 1;  // текущий слайд, кот виден пользователю
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


};


export default sliders;