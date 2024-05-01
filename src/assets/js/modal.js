import { accordion } from "./accordion.js";

export const modal = () => {
    try {
        const btns = document.querySelectorAll('[data-modal]');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modals = document.querySelectorAll('.modal');
        const body = document.querySelector('.page__body');
        

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => { 
                closeModal(); 
                body.style.marginRight = removeTwitching() + 'px';
                const modalAttr = findParent(e.target).getAttribute('data-modal');
                modalOverlay.classList.add('modal-overlay_visible');
                document.querySelector(`[data-target=${modalAttr}]`).classList.add('modal_visible');
                body.classList.add('page__body_scroll-unable');

                if(modalAttr === 'order') {
                    accordion({
                        accordion: '.order-accordion',
                        maxHeight: 240
                    })
                }
            })
        })

        modals.forEach(modal => {
            const close = modal.querySelector('.modal-close');
            if(close) {
                close.addEventListener('click', () => {
                    closeModal()
                    
                })
            }
        })

        window.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal-overlay')) {
                closeModal();
                
            }
        })

        

        function closeModal() {
            modalOverlay.classList.remove('modal-overlay_visible');
            modals.forEach(modal => {
                modal.classList.remove('modal_visible')
            })
            body.classList.remove('page__body_scroll-unable');
            body.style.marginRight = 0;
            
        }

        function findParent(element) {
            if(element.getAttribute('data-modal')) {
                return element
            }
            return findParent(element.parentNode)
        }
        function removeTwitching() {
            const div = document.createElement('div');
            div.style.width = '30px';
            div.style.height = '30px';
            div.style.overflow = 'scroll';
            div.style.visibility = 'hidden';
            div.style.position = 'absolute';
            div.style.bottom = '-2000px';
            body.appendChild(div);
            const margin = div.offsetWidth - div.clientWidth;
            body.removeChild(div);
            return Number(margin);
        }

    } catch (error) {
        console.log(error)
    }
}