let showSettings = false;

//Save table data to localStorage
$(window).on("beforeunload",function(){
    saveRow();
});

//Load saved data from localStorage
$(window).on("load",function(){
    let saveData = JSON.parse(localStorage.getItem('save'));
    saveData.forEach(data => {
        addRows(
            data.className,
            data.wins1,
            data.loss1,
            data.winrate1,
            data.wins2,
            data.loss2,
            data.winrate2,
            data.total,
            data.totalWinrate);
    }) 
});

$(document).ready(function(){
    $(document.body).on("click",'button[name="removeRow"]',function(){
        $(this).closest("tr").remove();
    });
    $(document.body).on("input",".wins1, .loss1, .wins2, .loss2",function(){
        let anchor = $(this).closest(".dataRow");
        let wins1 = anchor.find('.wins1').val();
        let loss1 = anchor.find('.loss1').val();
        let wins2 = anchor.find('.wins2').val();
        let loss2 = anchor.find('.loss2').val();
        if (["wins1","loss1"].includes($(this).attr('class'))){
            let winrate = calcWinrate(wins1,loss1);
            anchor.find(".winrate1").text(winrate+"%");
        }
        if (["wins2","loss2"].includes($(this).attr('class'))){
            let winrate = calcWinrate(wins2,loss2);
            anchor.find(".winrate2").text(winrate+"%");
        }
        let total = calcTotal(wins1,loss1,wins2,loss2);
        anchor.find(".total").text(total);
        let totalWins = wins1+wins2;
        let totalLoss = loss1+loss2;
        let totalWinrate  = calcWinrate(totalWins,totalLoss);
        anchor.find(".totalWinrate").text(totalWinrate+"%");
    });
})

function addRows(className = "",wins1=0,loss1=0,winrate1=0,wins2=0,loss2=0,winrate2=0,total=0,totalWinrate=0){
    $("#dataTable").find("tbody").append("<tr class=dataRow></tr>");
    let newRow = $("#dataTable").find("tbody").find("tr").last();
    let data = (`
    <td><div class=dataWrapper><input class=className value='${className}'></input></div></td>
    <td><div class=dataWrapper><input type=number min=0 step=1 class=wins1 value='${wins1}'></input></div></td>
    <td><div class=dataWrapper><input type=number min=0 step=1 class=loss1 value='${loss1}'></input></div></td>
    <td class=winrate1><div class=dataWrapper>${winrate1}%</div></td>
    <td><div class=dataWrapper><input type=number min=0 step=1 class=wins2 value='${wins2}'></input></div></td>
    <td><div class=dataWrapper><input type=number min=0 step=1 class=loss2 value='${loss2}'></input></div></td>
    <td class=winrate2><div class=dataWrapper>${winrate2}%</div></td>
    <td class=total><div class=dataWrapper>${total}</div></td>
    <td class=totalWinrate><div class=dataWrapper>${totalWinrate}%</div></td>
    <td class=options><button type="button" name="removeRow" class="btn btn-danger btn-sm">X</button></td>`);
    newRow.append(data);
    if(showSettings == true){
        $(".options").addClass("reveal");
    }
    newRow.find(".dataWrapper").hide();
    newRow.find(".dataWrapper").fadeIn("slow");
}
function saveRow(){
    const saveData = [];
    $(".dataRow").each(function(){
        let data = {
            className: $("input.className",this).val(),
            wins1: $("input.wins1",this).val(),
            loss1: $("input.loss1",this).val(),
            winrate1: $(".winrate1",this).text().slice(0,-1),
            wins2: $("input.wins2",this).val(),
            loss2: $("input.loss2",this).val(),
            winrate2: $(".winrate2",this).text().slice(0,-1),
            total: $(".total",this).text(),
            totalWinrate: $(".totalWinrate",this).text().slice(0,-1)
        };
        saveData.push(data);
    });
    let saveString = JSON.stringify(saveData);
    localStorage.setItem('save',saveString);
    console.log(saveString);
}
function calcWinrate(wins,loss){
    wins = parseInt(wins);
    loss = parseInt(loss);
    let answer = Math.round(wins/(wins+loss)*10000)/100;
    return answer;
}
function calcTotal(wins1,loss1,wins2,loss2){
    wins1 = parseInt(wins1);
    loss1 = parseInt(loss1);
    wins2 = parseInt(wins2);
    loss2 = parseInt(loss2);
    let answer = wins1+loss1+wins2+loss2;
    return answer;
}

function testAnimation(){
    if($(".options").css("display")=="none"){
        showSettings = true;
        $(".options").addClass("reveal");
    } else{
        showSettings = false;
        $(".options").removeClass("reveal");
    }
}
        