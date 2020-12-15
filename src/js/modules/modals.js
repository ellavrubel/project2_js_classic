
// функция для всех модальных окон

const modals = () => {

    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { // триггер - кнопка; само модальное окно и триггер для его закрытия

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

                // закрытие всех открытых модальных окон на странице
                openWindows.forEach(item => {
                    item.style.display = 'none';
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

            if (e.target === modal && closeClickOverlay){

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


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    showModalByTime('.popup-consultation', 5000);



};







export default modals;
