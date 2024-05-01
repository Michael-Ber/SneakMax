export const accordion = ({accordion: accordionSelector, maxHeight: maxHeightValue}) => {
    try {
        const accordion = document.querySelector(accordionSelector);

        const items = accordion.querySelectorAll('.accordion__item');
        const controls = accordion.querySelectorAll('.accordion__control');
        const contents = accordion.querySelectorAll('.accordion__content');
        const arrows = accordion.querySelectorAll('.arrow');
        const arrowsSvg = accordion.querySelectorAll('.arrow-svg');
        items.forEach(item => {
            const btn = item.querySelector('.accordion__control');
            processAccordion(item, accordion, items, 'init');
            window.addEventListener('resize', () => {
                processAccordion(item, accordion, items, 'init');
            })
            btn.addEventListener('click', () => {
                resetAccordion(items, controls, contents, arrows, arrowsSvg, item);
                processAccordion(item, accordion, items, 'process');
            })
        })

        function processAccordion (item, accordion, items, condition='process'){
            try {
                
                const control = item.querySelector('.accordion__control');
                const content = item.querySelector('.accordion__content');
                const arrow = item.querySelector('.arrow');
                const arrowSvg = item.querySelector('.arrow-svg');
                if(condition !== 'init') {
                    item.classList.toggle('accordion__item_active');
                    if(accordion.classList.contains('need-border')) {
                        item.classList.toggle('accordion-item-border');
                    }
                }
                if(item.classList.contains('accordion__item_active')) {
                    if(maxHeightValue) {
                        content.style.maxHeight = maxHeightValue + 25 + 'px';
                    }else {
                        content.style.maxHeight = content.scrollHeight + 25 + 'px';
                    }
                    content.setAttribute('aria-hidden', false);
                    control.setAttribute('aria-expanded', true);
                    if(arrow) {
                        arrow.classList.add('arrow_active');
                    }else if(arrowSvg) {
                        arrowSvg.classList.add('arrow-svg_active');
                    }
                }else {
                    content.style.maxHeight = 0 + 'px';
                    content.setAttribute('aria-hidden', true);
                    control.setAttribute('aria-expanded', false);
                    if(arrow) {
                        arrow.classList.remove('arrow_active');
                    }else if(arrowSvg) {
                        arrowSvg.classList.remove('arrow-svg_active');
                    }
                }
                
                
            } catch (error) {
                console.log(error)
            }
        }

        function resetAccordion(items, controls, contents, arrows, arrowsSvg, item) {
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
                if(arrows) {
                    arrows.forEach(arrow => {
                        arrow.classList.remove('arrow_active');
                    })
                }else if(arrowsSvg) {
                    arrowsSvg.forEach(arrow => {
                        arrow.classList.remove('arrow-svg_active');
                    })
                }
                
            }
        }

       
        
    } catch (error) {
        console.log(error)
    }
}