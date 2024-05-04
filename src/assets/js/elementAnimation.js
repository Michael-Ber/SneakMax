export const elementAnimation = () => {
    try {
        const blocksToAnimate = document.querySelectorAll('[animate]');
        
        blocksToAnimate.forEach(block => {
           
            const intersectionObserver = new IntersectionObserver((entries) => {
                if(entries[0].intersectionRatio <= 0) return;
                
                if(entries[0].target.hasAttribute('animate-y')) {
                    entries[0].target.setAttribute('animate-y-active', "")
                }else if(entries[0].target.hasAttribute('animate-x')) {
                    entries[0].target.setAttribute('animate-x-active', "")
                }
                intersectionObserver.unobserve(entries[0].target)
            })
            intersectionObserver.observe(block);
            
            
            
        })
    } catch (error) {
        console.log(error)
    }
}