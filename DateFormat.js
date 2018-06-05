/*************************************************
 *              AUTHOR : Toncsin                 *
 *************************************************/

//格式化日期时间 X---> 时间 , Y--->自定义的格式
function DateFormat(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g,
        function (v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });
    return  y.replace(/(y+)/g, function(v){
        return x.getFullYear().toString().slice(-v.length)
    });
}

//获取今天的开始结束时间
function getDays(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var oneDayTime = 24 * 60 * 60 * 1000;
    var nowTime = now.getTime();
    var TodayTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000
    var TodayStart = nowTime - TodayTime;
    var TodayEnd = TodayStart + oneDayTime - 1000;
    return {TodayStart: DateFormat(new Date(TodayStart), "yyyy-MM-dd hh:mm:ss"), TodayEnd: DateFormat(new Date(TodayEnd), "yyyy-MM-dd hh:mm:ss")};
}

//获取本周的开始结束时间
function getWeeks() {
    var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayTime = 24 * 60 * 60 * 1000;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var TodayTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    var MondayTime = nowTime - (day - 1) * oneDayTime - TodayTime;
    var SundayTime = nowTime + (8 - day) * oneDayTime - TodayTime - 1000;
    return {WeekStart: DateFormat(new Date(MondayTime), "yyyy-MM-dd hh:mm:ss"), WeekEnd: DateFormat(new Date(SundayTime), "yyyy-MM-dd hh:mm:ss")};
}

//获取本月的开始结束时间
function getMonths(){
    var now = new Date();
    var oneDayTime = 24 * 60 * 60 * 1000;
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var TodayTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    var MonthStart = new Date(now.setDate(1) - TodayTime);
    var NextMonthCurrent = now.getMonth() + 1;
    var MonthEnd = new Date(new Date(now.getFullYear(), NextMonthCurrent, 1) - 1000)
    return {MonthStart: DateFormat(MonthStart, "yyyy-MM-dd hh:mm:ss"), MonthEnd: DateFormat(MonthEnd, "yyyy-MM-dd hh:mm:ss")}
}

//获取本季的开始结束时间
function getQuarters() {
    var now = new Date();
    var Month = now.getMonth();
    var quarterStartCurrent = Month >= 9 ? 9 : Month >= 6 ? 6 : Month >= 3 ? 3 : 0;
    var quarterEndCurrent = quarterStartCurrent + 2;
    var quarterStart =  new Date(now.getFullYear(), quarterStartCurrent, 1);
    var quarterEnd = new Date(new Date(now.getFullYear(), quarterEndCurrent + 1, 1) - 1000);
    return {quarterStart: DateFormat(quarterStart, "yyyy-MM-dd hh:mm:ss"), quarterEnd: DateFormat(quarterEnd, "yyyy-MM-dd hh:mm:ss")}
}

//获取今年的开始结束时间
function getYears(){
    var now = new Date();
    var YearStart = new Date(now.getFullYear() , 0 , 1);
    var YearEnd = new Date(new Date(now.getFullYear() + 1 , 0 , 1) - 1000);
    return {YearStart: DateFormat(YearStart, "yyyy-MM-dd hh:mm:ss"), YearEnd: DateFormat(YearEnd, "yyyy-MM-dd hh:mm:ss")}
}
