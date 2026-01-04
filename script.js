import { CYOA } from "./scripts/cyoa/CYOA.js";
import { DigitCounter } from "./scripts/elements/DigitCounter.js"

// document.querySelectorAll("digit").forEach((value, key, parent) => {
//     var counter = new DigitCounter(value);
// });

window.cyoa = new CYOA();
window.dispatchEvent(new Event("resize"));