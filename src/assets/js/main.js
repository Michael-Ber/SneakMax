import { burger } from "./burger.js"
import { rangeSlider } from "./rangeSlider.js";
import { form } from "./form.js";
import { quizData } from "./quiz.js";
import { quiz } from "./quiz.js";

window.addEventListener('DOMContentLoaded', () => {
    burger();
    rangeSlider();
    form();
    quiz(quizData);
})