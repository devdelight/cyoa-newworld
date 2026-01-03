// 디버깅 용으로 비주얼 부분도 구현할 것
class GraphView
{

}

// 각 노드는 해당 노드를 클릭했을 때를 기준으로 출력할 문장, 나타나게 할 배경/프로필/아이템 이미지에 대한 정보를 갖고 있다
// 가장 최근 상태를 GetLatestState라고 칭하며, AutoCalc모드가 활성화 되어 있으면 매 노드를 클릭할 때마다 이전 데이터를 기반으로 자동으로 계산한다. 
// AutoCalc가 꺼져있거나 Immediately Calc 사용 시 즉시 계산을 종료함. (데이터를 불러오거나 무결성 검사 시 필요, 약간의 로딩 소요)
class GraphNode
{
    
}

// 숫자 촤르륵 바뀌게 하는 거
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
    constructor(element)
    {
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
    }
}

document.querySelectorAll("digit").forEach((value, key, parent) => {
    var counter = new DigitCounter(value);
});