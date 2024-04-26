import noUiSlider from 'nouislider';
// import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export const rangeSlider = () => {
    try {
        const slider = document.getElementById('slider');
        const inputs = document.querySelectorAll('.parameters-catalog__cost-input')

        noUiSlider.create(slider, {
            start: [1850, 25768],
            connect: true,
            step: 10,
            range: {
                'min': 1850,
                'max': 25768
            }
        });

        slider.noUiSlider.on('update', (values, handle) => {
            inputs[handle].value = Math.round(values[handle])
        })

        inputs.forEach((input, i) => {
            let arr = [null, null];
            input.addEventListener('change', (e) => {
                arr[i] = e.currentTarget.value;
                slider.noUiSlider.set(arr)
            })
        })
        
    } catch (error) {
        console.log(error)
    }
}

