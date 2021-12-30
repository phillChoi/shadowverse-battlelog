$(window).on("beforeunload",function(){
    saveRow();
});

$(window).on("load",function(){
    let saveData = JSON.parse(localStorage.getItem('save'));
    saveData.forEach(data => {
        addRows(data.className, data.wins1,data.loss1,data.wins2,data.loss2, true);
        
    }) 
});

$(document).ready(function(){
    $(document.body).on("click",'.removeRow',function(){
        $(this).parent().remove();
    })
})

function addRows(className = "",wins1=0,loss1=0,wins2=0,loss2=0,flag=false){
    $("table").append("<tr></tr>");
    let newRow = $("tr").last();
    newRow.append("<td class=className contenteditable=true>"+className+"</td>");
    newRow.append("<td class=wins1 contenteditable=true>"+wins1+"</td>");
    newRow.append("<td class=loss1 contenteditable=true>"+loss1+"</td>");
    newRow.append("<td class=winrate1></td>");
    newRow.append("<td class=wins2 contenteditable=true>"+wins2+"</td>");
    newRow.append("<td class=loss2 contenteditable=true>"+loss2+"</td>");
    newRow.append("<td class=winrate2></td>");
    newRow.append("<td class=total></td>");
    newRow.append("<td class=totalWinrate></td>");
    newRow.append("<div class='removeRow'>X</div>");
}
function saveRow(){
    const saveData = [];
    $("tr").each(function(){
        if($(this).hasClass("heading") != true){
            let data = {
                className: $("td.className",this).text(),
                wins1: $("td.wins1",this).text(),
                loss1: $("td.loss1",this).text(),
                wins2: $("td.wins2",this).text(),
                loss2: $("td.loss2",this).text()
            };
            saveData.push(data);
        };
    });
    let saveString = JSON.stringify(saveData);
    localStorage.setItem('save',saveString);
    console.log(saveString);
}