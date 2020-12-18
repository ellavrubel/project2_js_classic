
// функция для всех модальных окон

const modals = () => {

    let btnPressed = false;  //переопределение значения в стр 24

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {

        const trigger = document.querySelectorAll(triggerSelector);
        const modal = document.querySelector(modalSelector);
        const close = document.querySelector(closeSelector);
        const openWindows = document.querySelectorAll('[data-modal]');
        const scroll = smoothModalSwitcher();


        trigger.forEach(item => {

            item.addEventListener('click', (e) => {
                if (e.target){
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy){
                    item.remove();
                }

                // закрытие всех открытых модальных окон на странице
                openWindows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // при открытом модальном окне страница сайта будет замораживаться

                document.body.style.marginRight = `${scroll}px`;
            });

        });

        close.addEventListener('click', () => {

            // закрытие всех открытых модальных окон на странице
            openWindows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';

            document.body.style.marginRight = '0px';

        });

        modal.addEventListener('click', (e) => {

            if (e.target === modal){

                // закрытие всех открытых модальных окон на странице
                openWindows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';

                document.body.style.marginRight = '0px';
            }

        });
    }



    function showModalByTime (selector, time){
        setTimeout(() => {

            let display;

            document.querySelectorAll('[data-modal]').forEach(item  => {
                if(getComputedStyle(item).display !== 'none'){
                    display = 'block';
                }
            });

            if (!display){
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';

                const scroll = smoothModalSwitcher();
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time)
    }

    function smoothModalSwitcher(){
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth; // динамически получаем ширину скрола
        div.remove();  //

        return scrollWidth;
    }

    // определяем, есть ли клики во время пролистывания страницы

    function openByScroll(selector){   // selector - в данном случае .fixed-gift

        window.addEventListener('scroll', () => {
            // для корректного отображения в старых версиях

            let scrollHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight); // document.documentElement = html

            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)){ // pageYOffset - сколько сверху уже прокручено
                document.querySelector(selector).click();
            }
        })
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    openByScroll('.fixed-gift');

    // showModalByTime('.popup-consultation', 5000);



};







export default modals;
