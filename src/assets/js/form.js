export const form = () => {
    try {
        const forms = document.querySelectorAll('.form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
            })
        })
    } catch (error) {
        console.log(error)
    }
}