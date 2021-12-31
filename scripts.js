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
    $(document.body).on("click",'.removeRow',function(){
        $(this).parent().remove();
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
    $("table").append("<tr class=dataRow></tr>");
    let newRow = $("tr").last();
    newRow.append("<td><input class=className value='"+className+"'></input></td>");
    newRow.append("<td><input type=number min=0 step=1 class=wins1 value='"+wins1+"'></input></td>");
    newRow.append("<td><input type=number min=0 step=1 class=loss1 value='"+loss1+"'></input></td>");
    newRow.append("<td class=winrate1>"+winrate1+"%</td>");
    newRow.append("<td><input type=number min=0 step=1 class=wins2 value='"+wins2+"'></input></td>");
    newRow.append("<td><input type=number min=0 step=1 class=loss2 value='"+loss2+"'></input></td>");
    newRow.append("<td class=winrate2>"+winrate2+"%</td>");
    newRow.append("<td class=total>"+total+"</td>");
    newRow.append("<td class=totalWinrate>"+totalWinrate+"%</td>");
    newRow.append("<div class='removeRow'>X</div>");
}
function saveRow(){
    const saveData = [];
    $("tr").each(function(){
        if($(this).hasClass("heading") != true){
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
        };
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
