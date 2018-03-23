/*****价格曲线图表****/
var priceChart2; //价格曲线图2内容区
function initChartEle() {
    //内容区切换价格曲线表模式
    $("#dypMid9527 .yhq-chart-box .change-charts-btn span").click(function () {
        if (!priceCurve.clickOf) {
            priceCurve.clickOf = true;
            return false;
        } else {
            $(this).addClass("active").siblings("span").removeClass("active");
            priceCurve.format = $(this).data("sbase");
            disposeData(priceCurve.curveData["data"], priceCurve.format);
        }
    });
    //价格曲线图表大小配置
    $("#dypMid9527 #douyapu-line-chart").css({
        "width": $("#dypMid9527").width()
    });
    priceChart2 = echarts.init($('#dypMid9527 #douyapu-line-chart')[0]);
    //内容区历史价格曲线图表节点
}

//去除格式为xxxx-xx-xx的日期对象中数字前的0（商品价格曲线数据处理用到）
function deleteZero(res) {
    res = res.split('-');
    res[1] = res[1].replace(/^[0]/, '');
    res[2] = res[2].replace(/^[0]/, '');
    res = res.join('-');
    return res;
}

//补全年份，月份（商品价格曲线数据处理用到）
function fillMonth(data, nowDate) {
    //当前日期
    var nowTime = {
            year: nowDate.curTime.split('-')[0],
            month: nowDate.curTime.split('-')[1].replace(/^[0]/, ''),
            day: nowDate.curTime.split('-')[2].replace(/^[0]/, '')
        },
        //最新数据日期
        newTime = {
            year: nowDate.recentlyTime.split('-')[0],
            month: nowDate.recentlyTime.split('-')[1].replace(/^[0]/, ''),
            day: nowDate.recentlyTime.split('-')[2].replace(/^[0]/, '')
        };
    //补全年份和月份
    if (nowTime.year > newTime.year) {
        data[nowTime.year] = {};
        for (var i = newTime.month; i <= 12; i++) {
            data[newTime.year][i] = [];
            data[newTime.year][i].push({
                "time": "1",
                "price": nowDate.recentlyPrice
            });
        }
        for (var k = 1; k <= nowTime.month; k++) {
            if (nowTime.month == k) {

                data[nowTime.year][k] = [];
                data[nowTime.year][k].push({
                    "time": nowTime.day,
                    "price": nowDate.recentlyPrice
                });
            } else {
                data[nowTime.year][k] = [];
                data[nowTime.year][k].push({
                    "time": "1",
                    "price": nowDate.recentlyPrice
                });
            }
        }
        //只补全月份
    } else if (nowTime.month > newTime.month) {
        for (var k1 = newTime.month; k1 <= nowTime.month; k1++) {
            if (nowTime.month == k1) {
                data[nowTime.year][k1] = [];
                data[nowTime.year][k1].push({
                    "time": nowTime.day,
                    "price": nowDate.recentlyPrice
                });
            } else {
                data[nowTime.year][k1] = [];
                data[nowTime.year][k1].push({
                    "time": "1",
                    "price": nowDate.recentlyPrice
                });
            }
        }
    }
    return data;
}

//历史价格数据填充（商品价格曲线数据处理用到）
function fillData(data, fn) {
    var initData = data.list,
        dateObj = {
            //当前时间
            curTime: deleteZero(data.curTime),
            //最新变动时间
            recentlyTime: deleteZero(data.list[data.list.length - 1]['time']),
            //开始时间
            startTime: deleteZero(data.startTime),
            //最后一条数据价格
            recentlyPrice: data.list[data.list.length - 1]['price']
        },
        filldata = {}; //最终填充完毕数据
    streeYMD(initData, function (treeData) {
        treeData = fillMonth(treeData, dateObj);
        //第一层遍历年份
        $.each(treeData, function (key, item) {
            filldata[key] = {};
            //第二次遍历月份
            $.each(item, function (index, value) {
                var monthDayNum = getFirstAndLastMonthDay(key, index),
                    nowMonth = [],
                    lastMonthData = item[index][0]["price"];
                if (item[index - 1]) {
                    lastMonthData = item[index - 1][item[index - 1].length - 1]["price"];
                }
                //数据首月不需补全之前天数
                if (key == dateObj.startTime.split('-')[0] && index == dateObj.startTime.split('-')[1]) {
                    nowMonth = fillDay(value, dateObj.startTime.split('-')[2], monthDayNum);
                    //最后一个月数据补全不需要补全当前日期之后的天数
                } else if (key == dateObj.curTime.split('-')[0] && index == dateObj.curTime.split('-')[1]) {
                    nowMonth = fillDay(value, 1, dateObj.curTime.split('-')[2], lastMonthData);
                    //正常月份天数补全
                } else {
                    nowMonth = fillDay(value, 1, monthDayNum, lastMonthData);
                }
                filldata[key][index] = nowMonth;
            });

        });
        fn(filldata); //执行回调
    });
}

//补全月天数数据 data已有数据 starTime开始时间 endTime结束时间 lastMonthData上个月最后一条数据（商品价格曲线数据处理用到）
function fillDay(data, startTime, endTime, lastMonthData) {
    for (var i1 in data) {
        data[i1]["time"] = data[i1]["time"].replace(/^[0]/, '');
    }
    var mothd = {};
    var mothda = [];
    for (var k = startTime; k <= endTime; k++) {
        mothd[k] = {
            "time": k,
            "price": lastMonthData
        };
    }
    for (var t = 0; t < data.length; t++) {
        mothd[data[t]["time"]] = data[t];
        if (t < data.length - 1) {
            for (var l1 = data[t]["time"] - 0 + 1; l1 < data[t + 1]['time']; l1++) {
                mothd[l1] = {
                    "time": l1,
                    "price": mothd[data[t]["time"]]["price"]
                };
            }
        } else if (t >= data.length - 1) {
            for (var l = data[t]["time"] - 0 + 1; l <= endTime; l++) {
                mothd[l] = {
                    "time": l,
                    "price": mothd[data[t]["time"]]["price"]
                };
            }
        }
    }
    for (var i2 in mothd) {
        mothda.push(mothd[i2]);
    }
    return mothda;
}

//将数据按年月份拆分（商品价格曲线数据处理用到）
function streeYMD(data, fn) {
    var fillObj = {};
    for (var i in data) {
        var ymd = data[i].time.split('-');
        ymd[1] = ymd[1].replace(/[0]/, '');
        if (!fillObj[ymd[0]]) {
            fillObj[ymd[0]] = {
                [ymd[1]]: [{
                    "time": ymd[2],
                    "price": data[i].price
                }]
            }
        } else if (!fillObj[ymd[0]][ymd[1]]) {
            fillObj[ymd[0]][ymd[1]] = [{
                "time": ymd[2],
                "price": data[i].price
            }]
        } else {
            fillObj[ymd[0]][ymd[1]].push({
                "time": ymd[2],
                "price": data[i].price
            })
        }
    }
    fn(fillObj);
}

//获取指定月份天数（商品价格曲线数据处理用到）
function getFirstAndLastMonthDay(year, month) {
    return new Date(year, month, 0).getDate();
}

//三维数据转一维数据（商品价格曲线数据处理用到）
function treeToTwo(data) {
    var arr = [];
    for (var i in data) {
        for (var k in data[i]) {
            for (var j in data[i][k]) {
                var time = i + '/' + k + '/' + data[i][k][j]['time'];
                var price = data[i][k][j]['price'];
                arr.push({
                    "time": time,
                    "price": price
                });
            }
        }
    }
    return arr;
}

//请求惠惠助手接口拿取商品历史价格数据
function setPriceChart(url) {
    $.ajax({
        url: "https://zhushou.huihui.cn/productSense",
        data: {
            phu: "https://detail.tmall.com/item.htm?id=" + url,
            type: "canvas"
        },
        type: 'GET',
        timeout: 5000,
        dataType: 'json',
        success: function (response) {
            var otherData = {
                max: response.max,
                min: response.min,
                today: similarGroup.prePrice
            };
            fillData(response.priceHistoryData, function (treeResponse) {
                treeResponse = treeToTwo(treeResponse);
                treeResponse[treeResponse.length - 1]["price"] = similarGroup.prePrice;
                priceCurve.curveData = {
                    data: treeResponse,
                    other: otherData
                }; //存储数据
                //第二个参数表示展示数据条数 全部1 月线2 周线3
                if (treeResponse.length > 1) {
                    var changePriceHigh = 0;
                    var changePriceLow = treeResponse[treeResponse.length - 1]["price"];
                    var num1 = treeResponse.length > 7 ? 7 : treeResponse.length;
                    for (var i = 0; i < num1 - 1; i++) {
                        if (treeResponse[treeResponse.length - 2 - i]["price"] > changePriceHigh) {
                            changePriceHigh = treeResponse[treeResponse.length - 2 - i]["price"];
                        }
                    }
                    for (var j = 0; j < num1 - 1; j++) {
                        if (treeResponse[treeResponse.length - 2 - j]["price"] < changePriceLow) {
                            changePriceLow = treeResponse[treeResponse.length - 2 - j]["price"];
                        }
                    }
                    if (treeResponse[treeResponse.length - 1]["price"] > changePriceLow) {
                        $(".dypMid9527-price-title span").fadeOut(function () {
                            $(this).html("价格上涨").fadeIn(1000);
                            $(this).next().fadeIn(1000).css("display", "inline-block").addClass("up");
                        });
                    } else if (treeResponse[treeResponse.length - 1]["price"] < changePriceHigh) {
                        $(".dypMid9527-price-title span").fadeOut(function () {
                            $(this).html("价格下降").fadeIn(1000);
                            $(this).next().fadeIn(1000).css("display", "inline-block").addClass("down");
                        });
                    }
                }
                disposeData(treeResponse, priceCurve.format);
                //添加标题和提示内容
                var maxMinPrice = `<div class="maxMixPrice">
										<span class="max-text">最高: ${otherData.max}</span>
										<span class="min-text">最低: ${otherData.min}</span>
									</div>`;
                var chartTitle = `<h4 class="chartTitle" style="width: auto;position: absolute;left: 8px;top: 0;text-align: center;font-size: 14px;font-weight: 700;">近一个月价格走势</h4>`;
                $("#dypMid9527 #douyapu-line-chart").append(chartTitle).append(maxMinPrice);
            });
        },
        error: function () {
            //自定义数据
            var todyTime = new Date(),
                todyYMD = todyTime.getFullYear() + '/' + (todyTime.getMonth() + 1) + '/' + todyTime.getDate(),
                getTime = new Date(todyYMD).getTime(),
                fakeData = [],
                otherData = {
                    max: similarGroup.prePrice,
                    min: similarGroup.prePrice,
                    today: similarGroup.prePrice
                };
            getTime = getTime - (86400000 * 5);
            //自定义数据长度为5天
            for (var i = 0; i < 8; i++) {
                getTime = getTime + 86400000;
                var fakeTime = new Date(getTime).getFullYear() + '/' + (new Date(getTime).getMonth() + 1) + '/' + new Date(getTime).getDate();
                var arr = fakeTime.split('/');
                if (arr[1] < 10) {
                    arr[1] = "0" + arr[1];
                }
                fakeTime = arr[0] + '/' + arr[1] + '/' + arr[2];
                fakeData.push({
                    "time": fakeTime,
                    "price": similarGroup.prePrice
                });
            }
            priceCurve.curveData = {
                data: fakeData,
                other: otherData
            }; //存储数据
            //添加标题和提示内容
            var maxMinPrice = `<div class="maxMixPrice">
										<span class="max-text">最高: ${otherData.max}</span>
										<span class="min-text">最低: ${otherData.min}</span>
									</div>`;
            var chartTitle = `<h4 class="chartTitle" style="width: auto;position: absolute;left: 8px;top: 0;text-align: center;font-size: 14px;font-weight: 700;">近一个月价格走势</h4>`;
            $("#dypMid9527 #douyapu-line-chart").append(chartTitle).append(maxMinPrice);
            disposeData(priceCurve.curveData["data"], priceCurve.format)
        },
        complete: function (status) {

        }
    });
}

//才分获取日期 yyyy-M 或者 MD ,ymd是个时间数组  format只能是2或3，2表示取年月，3表示取月日
function getDateFormat(ymd, format) {
    var ret = [];
    for (var i in ymd) {
        var time = ymd[i].split('/')[format - 2] + '/' + ymd[i].split('/')[format - 1];
        ret.push(time);
    }
    return ret;
}

//获取到数据拆分数据再整合 response数据 otherData其他数据最高价最低价和当前价 disposeNum模式显示全部 月线 7日线
function disposeData(response, disposeNum) {
    //数据才分分类
    //显示x轴
    var chartDataX = splitDataList(response, "time"),
        //价格轴数据
        chartData = splitDataList(response, "price"),
        //实际数据x轴不显示
        chartDataXX = $.extend(true, [], chartDataX),
        //x轴数据(显示)
        chartDataXto = $.extend(true, [], chartDataX),
        chartDatato = $.extend(true, [], chartData),
        chartDataYto = $.extend(true, [], chartData),
        //当前月天数
        monthDay = getFirstAndLastMonthDay(response[response.length - 1]["time"].split('/')[0], response[response.length - 1]["time"].split('/')[1]);
    //模式选
    switch (disposeNum) {
        //全部历史价格展示
        case 1:
            chartDataXto = getDateFormat(chartDataXto, 2);
            break;
        //最新一个月历史价格展示
        case 2:
            chartDatato = chartDatato.length >= monthDay ? chartDatato.slice(chartDatato.length - monthDay, chartDatato.length) : chartDatato;
            chartDataXto = getDateFormat(chartDataXto, 2);
            chartDataXto = chartDataXto.length >= monthDay ? chartDataXto.slice(chartDataXto.length - monthDay, chartDataXto.length) : chartDataXto;
            chartDataXX = chartDataXX.length >= monthDay ? chartDataXX.slice(chartDataXX.length - monthDay, chartDataXX.length) : chartDataXX;
            break;
        //最新7天历史价格展示
        case 3:
            chartDatato = chartDatato.length >= 7 ? chartDatato.slice(chartDatato.length - 7, chartDatato.length) : chartDatato;
            chartDataXto = getDateFormat(chartDataXto, 3);
            chartDataXto = chartDataXto.length >= 7 ? chartDataXto.slice(chartDataXto.length - 7, chartDataXto.length) : chartDataXto;
            chartDataXX = chartDataXX.length >= 7 ? chartDataXX.slice(chartDataXX.length - 7, chartDataXX.length) : chartDataXX;
            break;
        default:
            break;
    }
    chartDataXto = ArrayUnique(chartDataXto);
    //数据再次整合
    creatChartDataObj = {
        //x轴数据(显示)
        chartDataX: chartDataXto,
        //x轴数据(隐藏数据真实x轴坐标)
        chartDataXX: chartDataXX,
        //数据纵坐标值
        chartData: chartDatato,
        //Y轴数据
        dataY: ArrayUnique(chartDataYto).sort(compare)
    };

    //创建图表
    creatChart(priceChart2, creatChartDataObj);
}

//创建图表 ele创建图表节点 data创建图表所需数据
function creatChart(ele, data) {
    ele.setOption(option = {
        title: {
            text: '',
            left: 'center',
            top: '0'
        },
        tooltip: {
            axisPointer: {
                // type: 'cross',
                lineStyle: {
                    width: '2',
                    type: 'dashed ',
                    color: '#FF0033'
                }
            },
            trigger: 'axis'
        },
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: data.chartDataXX,
            show: false,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#666666"
                } //
            },
            axisTick: {
                show: false
            }
        },
            {
                type: 'category',
                data: data.chartDataX,
                position: "bottom",
                axisLabel: {
                    interval: "auto",
                    margin: 10,
                    textStyle: {
                        align: 'center'
                    }
                },
                //指示线隐藏
                axisPointer: {
                    show: false
                },
                splitLine: {
                    show: true
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#666666"
                    } //
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [{
            type: 'value',
            data: "auto",
            show: true,
            minInterval: 10,
            axisLabel: {
                formatter: '¥ {value}'
            },
            splitLine: {
                show: true
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            name: '￥',
            type: 'line',
            step: 'start',
            symbol: "none",
            data: data.chartData,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#FF0033'
                    }
                }
            }
        }]
    });
    priceCurve.clickOf = true; //可以点击显示模式
}

//拆分数据拆分同类数据
function splitDataList(dataArr, Attr) {
    var repArr = [];
    for (var i = 0; i < dataArr.length; i++) {
        repArr.push(dataArr[i][Attr]);
    }
    return repArr;
}

//公共方法******/
//数组去重方法
function ArrayUnique(data) {
    var res = [];
    var json = {};
    for (var i = 0; i < data.length; i++) {
        if (!json[data[i]]) {
            res.push(data[i]);
            json[data[i]] = 1;
        }
    }
    return res;
}
//sort 方法
function compare(value1, value2) {
    if (value1 < value2) {
        return -1; //不用交换 跳出函数
    } else if (value1 == value2) {
        return 0;
    } else {
        return 1; //表示交换两个值
    }
}
//去掉浮点数的相减方法
function numSub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    e = Math.pow(10, Math.max(c, d));
    return (mul(a, e) - mul(b, e)) / e;
}
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {
    }
    try {
        c += e.split(".")[1].length;
    } catch (f) {
    }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//获取当前地址指定参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
//unicode转中文方法
function unicodeToUtf8(data) {
    str = unescape(data.replace(/\\u/g, "%u"));
    return str;
}
// 去掉字符串前后空格
function trim(str) {
    return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
}