
function get_H_height(ma, thick, c, width, height) { // 재료,두께,갯수,w,h 세로계산
    var W, H;
    if (width >= height) { W = width, H = height } else { W = height, H = width } // 큰쪽을 가로로 놓는다.
    if (W > 1200 && H > 450 && H <= 500) { H = 600 }
    if (W > 2400 || H > 1200) {
        w1 = 0, w2 = 0, w3 = 0, h1 = 0, h2 = 0, h3 = 0;
    } else {
        var shareW1200 = parseInt(1200 / W);// 1200에 들어가는 가로 판수
        var shareH1200 = parseInt(1200 / H);// 1200에 들어가는 세로 판수
        var w1, w2, w3, h1, h2, h3;
        var maxC = getcutMaxNum(2400, 1200, W, H); // 한판에 들어가는 최대수
        var plateC = parseInt(c / maxC); // 한판을 넘어갈때 판수
        var restC = c % maxC; // 판을 넘어가는 갯수


        w1 = (crestC < shareH1200 ? 0 : shareH1200 * H);
        h1 = parseInt(restC / shareH1200) * W;
        w2 = (parseInt((restC % shareH1200) / shareW1200) < 1 ? 0 : shareW1200 * W);
        h2 = (parseInt((restC % shareH1200) / shareW1200)) * H
        w3 = ((restC % shareH1200) % shareW1200) * W;
        h3 = H;

        if ((h2 + h3) >= W || W > 1200) {
            w3 = 0;
            h3 = 0;
            w2 = (crestC % shareH1200) * H; // 나머지 * H
            h2 = W;
        }

        var convert = convertSize(h1, h2, h3, w1, w2, w3);
        h1 = convert[0];
        h2 = convert[1];
        h3 = convert[2];
        w1 = convert[3];
        w2 = convert[4];
        w3 = convert[5];

        var area0 = areaprice(ma, t, 1200, 2400) * plateC;
        var area1 = areaprice(ma, t, w1, h1); // 세로 1mm 단위로 계산
        var area2 = areaprice(ma, t, w1, h1); // 세로 1mm 단위로 계산
        var area3 = areaprice(ma, t, w1, h1); //  세로 100mm 단위로 계산
        var totalArea = area0 + area1 + area2 + area3; //총합

    }
    console.log(w1 + "," + h1 + "," + w2 + "," + h2 + "," + w3 + "," + h3);
}

function get_W_height(ma, thick, c, width, height) {  // 재료,두께,갯수,w,h  가로 계산
    var W, H;
    if (width >= height) { (W = width), (H = height); } else { (W = height), (H = width); } // 큰쪽을 가로로 놓는다.
    var maxC = getcutMaxNum(1200, 2400, W, H); // 한판에 들어가는 최대수
    var shareW1200 = parseInt(1200 / W); // 1200에 들어가는 가로 판수
    var shareH1200 = parseInt(1200 / H); // 1200에 들어가는 세로 판수
    var restW1200 = 1200 % W; // 1200 에 남는 공간
    var shareRestW1200H = parseInt(restW1200 / H); // 1200  남는 공간에 들어가는 세로 판수
    var w1 = 0, w2 = 0, w3 = 0, h1 = 0, h2 = 0, h3 = 0;
    var plateC = parseInt(c / maxC); // 한판을 넘어갈때 판수
    var restC = c % maxC; // 판을 넘어가는 갯수

    for (var i = 0, j = 0, h3Count = 0, delcNum = 0; i < restC; i++) {
        // 옆 공간에 들어가는 수량 계산 필요
        // var j=0;// 옆 사이드에 세로로 들어가는 판
        if (W > 1200) { break; }
        var delcount = delcNum * shareRestW1200H; //
        w3 = W * ((i + 1 - j - delcount) % shareW1200); //0~ 가로 사이즈
        h3 = (i + 1 - j - delcount) % shareW1200 == 0 ? 0 : H; // or 0
        h2 = parseInt((i + 1 - j - delcount) / shareW1200) * H - h3Count * W;
        if (i + 1 < shareW1200) {
            w2 = 0;
        } else {
            w2 = shareW1200 * W;
            if (h2 > W) {
                w2 += H * (j % shareRestW1200H);
                j++;
                if (j / shareRestW1200H > 1) {
                    w2 = shareW1200 * W;
                    j = 0;
                    h3Count++;
                    h2 -= W;
                    delcNum++;
                }
            }
        }
        w1 = shareW1200 * W + shareRestW1200H * H; //h1 높이만  설정해도 된다.
        h1 = h3Count * W;

        console.log(
            "C-" + c + "\n" +
            "_W3=" + w3 + "_H3=" + h3 + "\n" +
            "_W2=" + w2 + "_H2=" + h2 + "\n" +
            "_W1=" + w1 + "_H1=" + h1
        );

    }

    var convert = convertSize(h1, h2, h3, w1, w2, w3);
    h1 = convert[0];
    h2 = convert[1];
    h3 = convert[2];
    w1 = convert[3];
    w2 = convert[4];
    w3 = convert[5];

    // console.log(
    //   "C-" + c + "\n" +
    //   "_W3=" + w3 + "_H3=" + h3 + "\n" +
    //   "_W2=" + w2 + "_H2=" + h2 + "\n" +
    //   "_W1=" + w1 + "_H1=" + h1
    // );


    var area0 = areaprice(ma, t, 1200, 2400) * plateC;
    var area1 = areaprice(ma, t, w1, h1); // 세로 1mm 단위로 계산
    var area2 = areaprice(ma, t, w1, h1); // 세로 1mm 단위로 계산
    var area3 = areaprice(ma, t, w1, h1); //  세로 100mm 단위로 계산
    var totalArea = area0 + area1 + area2 + area3; //총합

}

function convertSize(h1, h2, h3, w1, w2, w3) {
    if (h1 + h2 + h3 > 2100) {
        if (h3 == 0) {
            if (h2 == 0) {
                h1 = 2400;
            } else {
                h2 = 2400 - h1;
            }
        } else {
            h3 = 2400 - h2 - h3;
        }
    } else {
        if (h3 == 0) {
            if (h2 == 0) {
                h1 = unit100(h1);
            } else {
                h2 = unit100(h1 + h2) - h1;
            }
        } else {
            h3 = unit100(h1 + h2 + h3) - h2 - h3;
        }
    }

    w1 = unit100(over900(w1));
    w2 = unit100(over900(w2));
    w3 = unit100(over900(w3));
    var value = [h1, h2, h3, w1, w2, w3];
    return (value);
}
function areaprice(ma, thick, w, h) {
    var totalMa = Math.round((((materials[ma])["thk" + thick]).unitCost * w * h) / 1000) * 1000; // 1000단위
    return totalMa;
}

function unit100(num) {
    return (Math.ceil(num / 100) * 100);
}

function over900(num) {
    return (num > 900 ? 1200 : num);
}

// 한판에 들어가는 최대 수 계산
function getcutMaxNum(maW, maH, W, H) {
    var widthNum = parseInt(maW / W);
    var heightNum = parseInt(maH / H);
    var checkWidth = maW % W;
    if (widthNum != 0) {
        var basicNum = widthNum * heightNum + getcutMaxNum(checkWidth, maH, H, W);
        return basicNum;
    } else { return 0; }
}
get_W_height("아크릴", 10, 3, 900, 600);
  // get_W_height("아크릴", 10, 13, 425, 175);
  // get_W_height("아크릴", 10, 14, 425, 175);
  // get_W_height("아크릴", 10, 15, 425, 175);
