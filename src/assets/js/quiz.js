import { send } from "./sendRequest.js";

export const quizData = [
    {
        "name": "name",
        "questionTitle": "Какой тип кроссовок рассматриваете?",
        "items": [
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-1",
                "svg": "ok" 
            },
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-2",
                "svg": "ok"
            },
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-3",
                "svg": "ok"
            },
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-4",
                "svg": "ok"
            },
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-5",
                "svg": "ok"
            },
            {
                "img": "../assets/img/webp/sneakers-arm.webp",
                "type": "checkbox",
                "name": "кеды-6",
                "svg": "ok"
            },
        ]
    },
    {
        "name": "size",
        "questionTitle": "Какой размер вам подойдет?",
        "items": [
            {
                "type": "checkbox",
                "name": "менее 36",
                "svg": "ok"
            },
            {
                "type": "checkbox",
                "name": "36-38",
                "svg": "ok"
            },
            {
                "type": "checkbox",
                "name": "39-41",
                "svg": "ok"
            },
            {
                "type": "checkbox",
                "name": "42-44",
                "svg": "ok"
            },
            {
                "type": "checkbox",
                "name": "45 и больше",
                "svg": "ok"
            },
        ],
        "questionImg": "../assets/img/webp/size.webp"
    },
    {
        "name": "specify",
        "questionTitle": "Уточните какие-либо моменты",
        "items": [
            {
                "type": "textarea",
                "name": "message"
            }
        ]
    },
    {
        "title": "Уточните какие-либо моменты",
        "items": [
            {
                "type": "textarea",
                "name": "message"
            }
        ]
    },
];

export const quiz = (data) => {
    const quiz = document.getElementById('quiz');
    const quizQuestion = document.getElementById('quiz-question');
    const quizTitle = document.getElementById('quiz-title');
    const quizIndicator = document.getElementById('quiz-indicator');
    
    let step = 0;

    let results = [];

    const quizNextQuestion = (step) => {
        if(step < data.length-1) {
            const { questionTitle, items, questionImg } = data[step];
            const itemsDynamic = items.map((item, i) => {
                switch(item.type) {
                    case 'checkbox': 
                        return `<div class="quiz__question-item">
                            ${item.img ? `<img loading="lazy" src=${item.img} class="quiz__question-img" width="280" height="120" alt=${item.name}>` : ''}
                            <label class="quiz__question-label">
                                <input type=${item.type} name='${item.name}' class="quiz__question-input quiz-field" data-input='${item.type}-${i}' value=${item.name}>
                                ${item.name}
                                <svg class="quiz__question-svg">
                                    <use xlink:href="assets/svg/sprite.svg#${item.svg}"></use>
                                </svg>
                            </label>
                        </div>`;
                    case 'textarea': 
                        return `<div class="quiz__question-item">
                            <textarea name=${item.name} class="quiz__question-textarea quiz-field" cols="30" rows="10" placeholder="Введите сообщение"></textarea>
                        </div>`;
                }
            }).join('');
            return `
                <h2 class="section-title choose__title">Мы подберем идеальную пару для вас</h2>
                <h3 class="choose__subtitle">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями</h3>
                <div class="quiz__question" id="quiz-question">
                    <h4 class="quiz__question-title">${questionTitle}</h4>
                    <div class="quiz__question-wrapper">
                        ${itemsDynamic}
                    </div>
                </div>
                ${questionImg ? `<img loading="lazy" src=${questionImg} class="quiz__question-bg" width="980" height="282" alt=${questionTitle}>` : ''}
                <div class="quiz__bottom">
                    <div class="quiz__indicator" id="quiz-indicator">${step+1} из ${data.length-1}</div>
                    <button disabled type="button" class="btn-reset btn quiz__next" id="quiz-btn-next">Следующий шаг</button>
                </div>
            `
        }else {
            return `
                <h2 class="section-title choose__title">Ваша подборка готова!</h2>
                <h3 class="choose__subtitle">Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог</h3>
                <form action="#" class="quiz__final final-quiz">
                    <div class="final-quiz__images">
                        <img loading="lazy" src="./assets/img/webp/iphone.webp" class="final-quiz__img" width="205" height="411" alt="Iphone">
                        <img loading="lazy" src="../assets/img/spinner.gif" class="final-quiz__spinner">
                        
                        <div class="final-quiz__success">
                            <img loading="lazy" src="../assets/img/screen-success.svg" class="final-quiz__screen">
                            <svg class="final-quiz__svg">
                                <use xlink:href="assets/svg/sprite.svg#ok"></use>
                            </svg>
                            <span class="final-quiz__sent">Отправлено</span>
                        </div>
                        
                    </div>
                    <h4 class="final-quiz__title">Получить предложение</h4>
                    <h5 class="final-quiz__subtitle">Получите подборку подходящих для вас моделей на почту</h5>
                    <input type="text" name="name" required class="final-quiz__input" placeholder="Ваше имя">
                    <input type="email" name="email" required class="final-quiz__input" placeholder="E-mail">
                    <button type="submit" class="btn-reset btn btn_orange final-quiz__btn" id="quiz-button-send">Получить</button>
                </form>
            `
        }
        
    }

    quiz.addEventListener('click', function(e) {
        const quizBtnNext = document.getElementById('quiz-btn-next');
        const quizInputs = quiz.querySelectorAll('.quiz-field');
        
        
        switch(e.target.tagName) {
            case 'INPUT': 
                nextEnable(quizInputs, quizBtnNext);
                break;
            case 'TEXTAREA':
                nextEnable(quizInputs, quizBtnNext);
                break;
            case 'BUTTON': 
                if(e.target.id === 'quiz-btn-next') {
                    collectData(quizInputs);
                    quiz.innerHTML = quizNextQuestion(++step);
                }else if(e.target.id === 'quiz-button-send') {
                    sendData(results, this)
                }
        }
        
        
    })

    const collectData = (fields) => {
        // const formData = new FormData();
        // fields.forEach(field => {
        //     if(field.type === 'checkbox' && field.checked) {
        //         formData.append("type", field.name)
        //     }
        // })
        let temp = [];
        fields.forEach((field, i) => {
            if(field.type === 'checkbox' && field.checked) {
                temp.push(field.value)
            }else if(field.type === 'textarea' && field.value !== '') {
                temp.push(field.value)
            }
        })
        results.push({[data[step].name]: temp})
    }

    const sendData = (data, quiz) => {
        const form = quiz.querySelector('.final-quiz');
        const inputs = quiz.querySelectorAll('.final-quiz__input');
        const spinner = quiz.querySelector('.final-quiz__spinner');
        const successScreen = quiz.querySelector('.final-quiz__success');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            spinner.classList.add('final-quiz__spinner_visible');
            let dataObj = {data};
            inputs.forEach(input => {
                dataObj = {...dataObj, [input.name]: input.value}
            })
            const resp = send('../mailer/smart.php', dataObj)
            resp.then(() => {
                inputs.forEach(input => input.value = '');
                spinner.classList.remove('final-quiz__spinner_visible');
                successScreen.classList.add('final-quiz__success_visible');
                setTimeout(() => {
                    successScreen.classList.remove('final-quiz__success_visible');
                }, 5000)
            })
            resp.catch(e => console.log(e))
        })
    } 

    const nextEnable = (inputs, btnNext) => {
        let isValid = false;
        if(step < data.length-1) {
            switch(Array.from(inputs)[0].type) {
                case 'checkbox': 
                    isValid = Array.from(inputs).find(item => item.checked) ? true : false;
                    btnNext.disabled = !isValid;
                    break;
                case 'textarea':
                    Array.from(inputs).forEach(input => {
                        input.addEventListener('input', (e) => {
                            isValid = e.target.value !== '' ? true : false
                            btnNext.disabled = !isValid;
                        })
                    })
                    break;
            }
        }
        return isValid;
    }

    quiz.innerHTML = quizNextQuestion(step);
    



}