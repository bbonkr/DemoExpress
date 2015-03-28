$(function () {
    //replaces $.browser functionality that was deprecated in jQuery 1.9
    $.browser = {};
    $.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
    $.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    $.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
    $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

    String.prototype.padLeft = function (length, padChar) {
        var result = this;

        if (this == null) {
            return null;
        }

        if (padChar.length > 1) {
            padChar = padChar.substr(0, 1);
        }

        if (result.length >= length) { return result; }
        else {
            var count = length - this.length;
            for (var i = 0; i < count; i++) {
                result = padChar + result;
            }
        }

        return result;
    };

    Date.prototype.toShortDateString = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + '-' + mm.padLeft(2, '0') + '-' + dd.padLeft(2, '0');
    };
});

window.isMobile = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

/**
 * value : 숫자로 변환할 문자열
 */
function parseDouble(value) {
    // http://royaltutorials.com/javascript-parsedouble/
    if (typeof value == "string") {
        value = value.match(/^-?\d*/)[0];
    }

    return !isNaN(parseInt(value)) ? value * 1 : NaN;
}

/**
 * places : Decimal Place 소수점 이하 표시 갯수
 * prefix : 숫자 앞에 추가할 문자
 * subfix : 숫자 뒤에 추가할 문자
 * thousand : 1000단위 구분 기호 (기본값 : ",")
 * decimal : 소수점 구분 기호 (기본값 : ".")
 */
Number.prototype.format = function (places, prefix, subfix, thousand, decimal) {
    // Extend the default Number object with a formatMoney() method:
    // usage: someVar.formatMoney(decimalPlaces, prefix, thousandsSeparator, decimalSeparator)
    // defaults: (2, "", "", ",", ".");
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    prefix = prefix !== undefined ? prefix : '';
    subfix = subfix !== undefined ? subfix : '';
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
    return prefix + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "") + subfix;
};

/**
 * size : 크기
 * 제한 : 31자리의 숫자값가지만 처리가능!
 */
function fileSizeFormatter(size) {
    // http://en.wikipedia.org/wiki/Yottabyte

    var nSize = 0;
    try {
        nSize = parseInt(size);
    } catch (e) {
        nSize = 0;
    }

    var units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var base = 1024.0;
    if (nSize > 999999999999999999999999999999) { throw "처리할 수 있는 범위를 벗어났습니다." };
    if (!nSize || nSize < base) {
        return nSize.format(0, '', ' ' + units[0]);
    } else {
        for (var i = 0; i < units.length ; i++) {
            nSize /= base;
            console.log(nSize);
            if (nSize < base || i + 1 == units.length) { return nSize.format(2, '', ' ' + units[i]); }
        }
    }
}

function numberWithCommas(number) {
    if (number == null) { return null; }
    if (number.toString().indexOf('.') >= 0) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

/**
 * 바이트 크기 표시를 위한 포맷터
 */
function formatterByteSize(val) {
    var result = 0;
    var tmp_val = val;
    var basis = 1024.0;
    var idx = 0;
    var units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

    if (tmp_val > basis) {
        do {
            if (idx >= units.length) { break; }
            tmp_val /= basis;
            idx++;
        } while (tmp_val > basis);
    }

    tmp_val = Math.round(tmp_val * 100) / 100;
    result = numberWithCommas(tmp_val) + ' ' + units[idx];

    return result;
}