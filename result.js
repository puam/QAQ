//取出浏览器的值，进行判断。type，判断的性格类型，individuality，性格总类型。
var type = JSON.parse(sessionStorage.getItem("type"));
type = type[0].attribute + type[1].attribute + type[2].attribute + type[3].attribute;
type="性格类型："+type;
var individuality = JSON.parse(sessionStorage.getItem("individuality"));
$(document).ready(function () {
    judge();
});
//判断函数。
function judge() {
    switch (type) {
        case individuality[0].character:
            $(".character-type").text(individuality[0].character);
            // $(".traits-of-character").text(individuality[0].text1);
            let div1 = (`<p class="traits-of-character">${individuality[0].text1}<br>${individuality[0].text2}<br>
            ${individuality[0].text3}<br>${individuality[0].text4}<br>${individuality[0].text5}<br>
            ${individuality[0].text6}<br>${individuality[0].text7}  
</p>`);
            $(".evaluation-content").append(div1);
            break;
        case individuality[1].character:
            $(".character-type").text(individuality[1].character);
            // $(".traits-of-character").text(individuality[0].text1);
            let div2 = (`<p class="traits-of-character">${individuality[1].text1}<br>${individuality[1].text2}<br>
            ${individuality[1].text3}<br>${individuality[1].text4}<br>${individuality[1].text5}<br>
            ${individuality[1].text6}<br>${individuality[1].text7}         
</p>`);
            $(".evaluation-content").append(div2);
            break;
        case individuality[2].character:
            $(".character-type").text(individuality[2].character);
            // $(".traits-of-character").text(individuality[0].text1);
            let div3 = (`<p class="traits-of-character">${individuality[2].text1}<br>${individuality[2].text2}<br>
            ${individuality[2].text3}<br>${individuality[2].text4}<br>${individuality[2].text5}<br>
            ${individuality[2].text6}<br>${individuality[2].text7}<br>${individuality[2].text8}<br>${individuality[2].text9}
</p>`);
            $(".evaluation-content").append(div3);
            break;
        case individuality[3].character:
            $(".character-type").text(individuality[3].character);
            // $(".traits-of-character").text(individuality[0].text1);
            let div4 = (`<p class="traits-of-character">${individuality[3].text1}<br>${individuality[3].text2}<br>
            ${individuality[3].text3}<br>${individuality[3].text4}
</p>`);
            $(".evaluation-content").append(div4);
            break;
        case individuality[4].character:
            $(".character-type").text(individuality[4].character);
            let div5 = (`<p class="traits-of-character">${individuality[4].text1}<br>${individuality[4].text2}<br>
            ${individuality[4].text3}<br>${individuality[4].text4}     
</p>`);
            $(".evaluation-content").append(div5);
            break;
        case individuality[5].character:
            $(".character-type").text(individuality[5].character);
            let div6 = (`<p class="traits-of-character">${individuality[5].text1}<br>${individuality[5].text2}<br>
            ${individuality[5].text3}<br>${individuality[5].text4}     
</p>`);
            $(".evaluation-content").append(div6);
            break;
        case individuality[6].character:
            $(".character-type").text(individuality[6].character);
            let div7 = (`<p class="traits-of-character">${individuality[6].text1}<br>${individuality[6].text2}<br>
            ${individuality[6].text3}<br>${individuality[6].text4}<br>${individuality[6].text5}<br>${individuality[6].text6}<br>
            ${individuality[6].text7}          
</p>`);
            $(".evaluation-content").append(div7);
            break;
        case individuality[7].character:
            $(".character-type").text(individuality[6].character);
            let div8 = (`<p class="traits-of-character">${individuality[7].text1}<br>${individuality[7].text2}<br>
            ${individuality[7].text3}<br>${individuality[7].text4}<br>${individuality[7].text5}<br>${individuality[7].text6}          
</p>`);
            $(".evaluation-content").append(div8);
            break;
        case individuality[8].character:
            $(".character-type").text(individuality[8].character);
            let div9 = (`<p class="traits-of-character">${individuality[8].text1}<br>${individuality[8].text2}<br>
            ${individuality[8].text3}<br>${individuality[8].text4}<br>${individuality[8].text5}<br>${individuality[8].text6}          
</p>`);
            $(".evaluation-content").append(div9);
            break;
        case individuality[9].character:
            $(".character-type").text(individuality[9].character);
            let div10 = (`<p class="traits-of-character">${individuality[9].text1}<br>${individuality[9].text2}<br>
            ${individuality[9].text3}<br>${individuality[9].text4}<br>${individuality[9].text5}       
</p>`);
            $(".evaluation-content").append(div10);
            break;
        case individuality[10].character:
            $(".character-type").text(individuality[10].character);
            let div11 = (`<p class="traits-of-character">${individuality[10].text1}<br>${individuality[10].text2}<br>
            ${individuality[10].text3}<br>${individuality[10].text4}<br>${individuality[10].text5}<br>${individuality[10].text6}    
</p>`);
            $(".evaluation-content").append(div11);
            break;
        case individuality[11].character:
            $(".character-type").text(individuality[11].character);
            let div12 = (`<p class="traits-of-character">${individuality[11].text1}<br>${individuality[11].text2}<br>
            ${individuality[11].text3}<br>${individuality[11].text4}<br>${individuality[11].text5}<br>${individuality[11].text6}<br>
            ${individuality[11].text7}          
</p>`);
            $(".evaluation-content").append(div12);
            break;
        case individuality[12].character:
            $(".character-type").text(individuality[12].character);
            let div13 = (`<p class="traits-of-character">${individuality[12].text1}<br>${individuality[12].text2}<br>
            ${individuality[12].text3}<br>${individuality[12].text4}<br>${individuality[12].text5}<br>${individuality[12].text6}
            <br>${individuality[12].text7}  
</p>`);
            $(".evaluation-content").append(div13);
            break;
        case individuality[13].character:
            $(".character-type").text(individuality[13].character);
            let div14 = (`<p class="traits-of-character">${individuality[13].text1}<br>${individuality[13].text2}<br>
            ${individuality[13].text3}<br>${individuality[13].text4}<br>${individuality[13].text5}<br>${individuality[13].text6}          
</p>`);
            $(".evaluation-content").append(div14);
            break;
        case individuality[14].character:
            $(".character-type").text(individuality[13].character);
            let div15 = (`<p class="traits-of-character">${individuality[14].text1}<br>${individuality[14].text2}<br>
            ${individuality[14].text3}<br>${individuality[14].text4}<br>${individuality[14].text5}<br>${individuality[14].text6}          
</p>`);
            $(".evaluation-content").append(div15);
            break;
        case individuality[15].character:
            $(".character-type").text(individuality[15].character);
            let div16 = (`<p class="traits-of-character">${individuality[15].text1}<br>${individuality[15].text2}<br>
            ${individuality[15].text3}<br>${individuality[15].text4}<br>${individuality[15].text5}<br>${individuality[15].text6}          
</p>`);
            $(".evaluation-content").append(div16);
            break;
    }
};
