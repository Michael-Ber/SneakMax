export const accordion = () => {
    try {
        const accordions = document.querySelectorAll('.accordion');

        accordions.forEach(accordion => {
            const items = accordion.querySelectorAll('.accordion__item');
            const controls = accordion.querySelectorAll('.accordion__control');
            const contents = accordion.querySelectorAll('.accordion__content');
            const arrows = accordion.querySelectorAll('.arrow');
            items.forEach(item => {
                const btn = item.querySelector('.accordion__control');
                processAccordion(item, accordion, items, 'init');
                window.addEventListener('resize', () => {
                    processAccordion(item, accordion, items, 'init');
                })
                btn.addEventListener('click', () => {
                    resetAccordion(items, controls, contents, arrows, item);
                    processAccordion(item, accordion, items, 'process');
                })
            })
        })

        function processAccordion (item, accordion, items, condition='process'){
            try {
                
                const control = item.querySelector('.accordion__control');
                const content = item.querySelector('.accordion__content');
                const arrow = item.querySelector('.arrow');
                
                if(condition !== 'init') {
                    item.classList.toggle('accordion__item_active');
                    if(accordion.classList.contains('need-border')) {
                        item.classList.toggle('accordion-item-border');
                    }
                }
                if(item.classList.contains('accordion__item_active')) {
                    content.style.maxHeight = content.scrollHeight + 25 + 'px';
                    content.setAttribute('aria-hidden', false);
                    control.setAttribute('aria-expanded', true);
                    arrow.classList.add('arrow_active');
                }else {
                    content.style.maxHeight = 0 + 'px';
                    content.setAttribute('aria-hidden', true);
                    control.setAttribute('aria-expanded', false);
                    arrow.classList.remove('arrow_active');
                }
                
                
            } catch (error) {
                console.log(error)
            }
        }

        function resetAccordion(items, controls, contents, arrows, item) {
            if(!item.classList.contains('accordion__item_active')) {
                items.forEach(item => {
                    item.classList.remove('accordion__item_active');
                    item.classList.remove('accordion-item-border');
                })
                controls.forEach(control => {
                    control.setAttribute('aria-expanded', false);
                })
                contents.forEach(content => {
                    content.style.maxHeight = 0 + 'px';
                    content.setAttribute('aria-hidden', true);
                })
                arrows.forEach(arrow => {
                    arrow.classList.remove('arrow_active');
                })
            }
        }

       
        
    } catch (error) {
        console.log(error)
    }
}