(function ($) {
    // datepicker 한글화
    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월',
        '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: 'Wk',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        duration: 200,
        showAnim: 'show',
        showMonthAfterYear: true,
        yearSuffix: '년'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);
}(jQuery));

(function (w) {
    w.isMobile = false;
    w.isChrome = false;

    w.isMobileApp = false;
    w.isAndroidApp = false;
    w.isiOSApp = false;

    if (w.navigator.userAgent.match(/Android/i)
            || w.navigator.userAgent.match(/webOS/i)
            || w.navigator.userAgent.match(/iPhone/i)
            || w.navigator.userAgent.match(/iPad/i)
            || w.navigator.userAgent.match(/iPod/i)
            || w.navigator.userAgent.match(/BlackBerry/i)
            || w.navigator.userAgent.match(/Windows Phone/i)
            || w.navigator.userAgent.match(/Opera Mini/i)
            || w.navigator.userAgent.match(/IEMobile/i)
            ) {
        w.isMobile = true;
    }

    if (w.navigator.userAgent.toLowerCase().indexOf('univapp') > -1) {
        w.isMobileApp = true;
        if (w.navigator.userAgent.toLowerCase().indexOf('univapp(android)') > -1) { w.isAndroidApp = true; }
        if (w.navigator.userAgent.toLowerCase().indexOf('univapp(ios)') > -1) { w.isiOSApp = true; }
    }

    if (w.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        w.isChrome = true;
    }
}(window));