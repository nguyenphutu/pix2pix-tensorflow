var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = "white";
    ctx.fillRect(currX, currY, w, h);

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "white") y = 14;
    else y = 2;

}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    ctx.clearRect(0, 0, w, h);
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

// click image sizebar

$( ".well" ).click(function() {
  $('.well.active').removeClass('active');
  $(this).addClass('active');
});

// process render image


var URL = 'http://127.0.0.1:5000/'

$("#process").click(function(e) {
    var canvas = $('canvas')[0];
    var input_b64 = canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "")
    console.log(canvas.toDataURL("image/jpeg"))
//    addSurveysForm.find('div[id=continueSendSurveys]').modal("hide");
//    addSurveysForm.find('a[id=buttonContinueSendSurveys]').attr('disabled', true).addClass('loading');
//    addSurveysForm.find('a[id=buttonContinueSendSurveys]').removeAttr("data-toggle").removeAttr("data-target");
    $.ajax({
        type: "POST",
        data: JSON.stringify(input_b64, null, '\t'),
        contentType: 'application/json;charset=UTF-8',
        url: URL + 'apple',
        success: function(data) {
            alert(data.response)
        },
    });
});
//
//$("#process").click(function(){
//    $.post(URL + 'apple', data,
//    function(data, status){
//        alert("Data: " + data + "\nStatus: " + status);
//    });
//});

function b64_to_bin(str) {
  var binstr = atob(str)
  var bin = new Uint8Array(binstr.length)
  for (var i = 0; i < binstr.length; i++) {
    bin[i] = binstr.charCodeAt(i)
  }
  return bin
}