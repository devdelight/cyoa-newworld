import { DigitCounter } from "../elements/DigitCounter.js";

const DEVICE = {
    DESKTOP: "desktop",
    MOBILE_PORTRAIT: "mobile-portrait",
    MOBILE_LANDSCAPE: "mobile-landscape",
}

/**
 * 얘가 플레이어의 값들을 가지고 있음
 */
class CYOA
{
    constructor()
    {
        // variables
        this.resources = { "마력": 0, "순수한 마력": 0 };
        this.stats = new Map([
            ["근력", 0],
            ["민첩", 0],
            ["지능", 0],
            ["지혜", 0],
            ["건강", 0],
            ["매력", 0],
        ]);
        this.specialStats = new Map([
            ["명성", 0],
            ["행운", 0],
        ]);

        // systems

        /**
         * @type {CYOAStatsPanel}
         */
        this.statsPanel = new CYOAStatsPanel(this);
    }

    /**
     * 데이터를 불러와서 적용함
     * @param {*} data 
     */
    copyFrom(data)
    {

    }

    onResize(device)
    {
        this.statsPanel.onResize(device);

        // console.log(device);
    }
}

/**
 * desktop: (전부) 기본 표기
 * portrait: (심플하게) 기본 표기
 * landscape: 미표기, 드래그 하여 볼 수 있게
 */
class CYOAStatsPanel
{
    /**
     * 
     * @param {CYOA} parent 
     */
    constructor(parent)
    {
        this.parent = parent;

        /**
         * @type {HTMLElement}
         */
        this.container = document.querySelector("#cyoa-panel-stats");

        /**
         * @type {HTMLElement}
         */
        this.labelElement = this.container.querySelector(".cyoa-panel-label");

        /**
         * @type {HTMLTableElement}
         */
        this.tableElement = this.container.querySelector("table.cyoa-panel-table");

        this.arr = [];
        this.specialArr = [];

        for (var i = 0; i < this.parent.stats.size; i++)
            this.arr.push(new DigitCounter());
        for (var i = 0; i < this.parent.specialStats.size; i++)
            this.specialArr.push(new DigitCounter());
    }

    update()
    {

    }

    onResize(device)
    {
        var body = this.tableElement.tBodies.item(0);
        while (body.rows.length > 0)
            body.deleteRow(0);

        function appendChildToCellAsDigit(cell, name, digit)
        {
            var label = document.createElement("div");
            label.textContent = name;

            cell.appendChild(label);
            cell.appendChild(digit.element);

            return digit;
        }

        var keys = [...this.parent.stats.keys()];
        var specialKeys = [...this.parent.specialStats.keys()];

        switch (device)
        {
            case DEVICE.DESKTOP:
                // 근력 지능 건강
                // 민첩 지혜 매력
                // 명성 행운
                var row1 = body.insertRow(0);
                appendChildToCellAsDigit(row1.insertCell(0), keys[0], this.arr[0]); // "근력"
                appendChildToCellAsDigit(row1.insertCell(1), keys[2], this.arr[2]); // "지능"
                appendChildToCellAsDigit(row1.insertCell(2), keys[4], this.arr[4]); // "건강"

                var row2 = body.insertRow(1);
                appendChildToCellAsDigit(row2.insertCell(0), keys[1], this.arr[1]); // "민첩"
                appendChildToCellAsDigit(row2.insertCell(1), keys[3], this.arr[3]); // "지혜"
                appendChildToCellAsDigit(row2.insertCell(2), keys[5], this.arr[5]); // "매력"

                var row3 = body.insertRow(2);
                appendChildToCellAsDigit(row3.insertCell(0), specialKeys[0], this.specialArr[0]); // 명성
                appendChildToCellAsDigit(row3.insertCell(1), specialKeys[1], this.specialArr[1]); // 행운
                break;
            case DEVICE.MOBILE_LANDSCAPE:
                // 근력 민첩
                // 지능 지혜
                // 건강 매력
                // 명성
                // 행운
                var row1 = body.insertRow(0);
                appendChildToCellAsDigit(row1.insertCell(0), keys[0], this.arr[0]); // "근력"
                appendChildToCellAsDigit(row1.insertCell(1), keys[1], this.arr[1]); // "민첩"

                var row2 = body.insertRow(1);
                appendChildToCellAsDigit(row2.insertCell(0), keys[2], this.arr[2]); // "지능"
                appendChildToCellAsDigit(row2.insertCell(1), keys[3], this.arr[3]); // "지혜"

                var row3 = body.insertRow(2);
                appendChildToCellAsDigit(row3.insertCell(0), keys[4], this.arr[4]); // "건강"
                appendChildToCellAsDigit(row3.insertCell(1), keys[5], this.arr[5]); // "매력"

                var row4 = body.insertRow(3);
                appendChildToCellAsDigit(row4.insertCell(0), specialKeys[0], this.specialArr[0]); // 명성
                
                var row5 = body.insertRow(4);
                appendChildToCellAsDigit(row5.insertCell(0), specialKeys[1], this.specialArr[1]); // 행운

                break;
            case DEVICE.MOBILE_PORTRAIT:
                break;
        }

        this.update();
        // switch (device)
        // {
        //     case DEVICE.DESKTOP:
        //         break;
        //     case DEVICE.MOBILE_LANDSCAPE:
        //         break;
        //     case DEVICE.MOBILE_PORTRAIT:
        //         break;
        // }
    }
}

export { CYOA };