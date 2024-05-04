import { burger } from "./burger.js"
import { rangeSlider } from "./rangeSlider.js";
import { form } from "./form.js";
import { quizData } from "./quiz.js";
import { quiz } from "./quiz.js";
import { accordion } from "./accordion.js";

import { modal } from "./modal.js";
import { elementAnimation } from "./elementAnimation.js";

window.addEventListener('DOMContentLoaded', () => {
    burger();
    rangeSlider();
    form();
    quiz(quizData);
    accordion({accordion: '.questions-accordion'});
    modal();
    elementAnimation();
})