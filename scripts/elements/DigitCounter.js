/**
 * 숫자 촤르륵 바뀌게 하는 거
 * value    - 현재 값
 * element  - 부모 element
 * setNumber
 */
class DigitCounter
{
    /**
     * @type {DigitCounter[]} list
     */
    static list = [];

    /**
     * 여기에 Element를 넣으면 자동으로 바꿔줌
     * @param {Element} element 
     */
    constructor(element = null)
    {
        if (element == null || element == undefined)
        {
            element = document.createElement("digit");
        }
        this.element = element;

        for (var i = 0; i < DigitCounter.list.length; i++)
        {
            if (DigitCounter.list[i].element == element)
                throw "Non allowed to duplicate DigitCounter no same element.";
        }
        DigitCounter.list.push(this);

        this.element.digitCounter = this;

        this.container = document.createElement("div");
        this.container.className = "counter-container";

        element.replaceChildren();
        element.appendChild(this.container);

        var num = parseFloat(element.textContent);
        if (isNaN(num) || !isFinite(num)) num = 0;

        this._initialized = false;
        this.setNumber(num);
        this._initialized = true;
    }

    /**
     * 
     * @param {number} number 
     */
    setNumber(number)
    {
        var numstr = number.toString();
        var numlen = numstr.length;

        // 만약 children이 적다면 추가하고, 많다면 딱히 건드리지 않는다.
        if (this.container.childElementCount < numlen)
        {
            while (this.container.childElementCount < numlen)
            {
                // create container children (digit wrapper)
                var wrapper = document.createElement("div");
                wrapper.className = "digit-wrapper";

                var strip = document.createElement("div");
                strip.className = "digit-strip";
                strip.textContent = "0 1 2 3 4 5 6 7 8 9 .";
                strip.style.transform = `translateY(9%)`

                wrapper.appendChild(strip);

                this.container.prepend(wrapper);

                if (this._initialized)
                    strip.offsetHeight;
            }
        }
        // else if (this.container.childElementCount > numlen)
        // {
        //     while (this.container.childElementCount > numlen)
        //         this.container.removeChild(this.container.lastElementChild);
        // }
        else
        {
            numlen = this.container.childElementCount;
            numstr = numstr.padStart(numlen, "-");
        }

        for (var i = 0; i < numlen; i++)
        {
            /**
             * @type {HTMLElement}
             */
            var strip = this.container.childNodes.item(i).firstChild;

            if (numstr[i] == ".")
            {
                strip.style.transform = `translateY(-90.909%)`
            }
            else if (numstr[i] == "-")
            {
                strip.style.transform = `translateY(9.0909%)`
            }
            else
            {
                var digit = parseInt(numstr[i]);
                // (digit + 1) * 1 / 11 * 100 느낌의 계산이 필요하겠네요.
                // 현재 문자열이 11개(. + 0~9)이므로 한 칸당 약 9.09%입니다.
                strip.style.transform = `translateY(${-digit * 9.0909}%)`
            }
        }

        this.value = number;
    }
}

export { DigitCounter };