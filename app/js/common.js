$('.operation_status').click(function () {
    $(this).find('.operation_status_descr').toggleClass('hidden');
});

$('.block_exchange_button__exchange').click(function () {
    $('.exchange_bottom').removeClass('hidden');
    $('.exchange_top').addClass('hidden');
});

$('.block_exchange_sending_a').click(function () {
    $('.exchange_top').removeClass('hidden');
    $('.exchange_bottom').addClass('hidden');
});

var pct = 0,
    span_progress = document.getElementById("span_progress"),
    div_loading_progress = document.getElementById("div_loading_progress");


function display_pct(p) {
    span_progress.innerHTML = "" + p + "%";
    div_loading_progress.className = "c100 p" + p;
}

function update_pct() {
    display_pct(pct++);

    if (pct <= 100) {
        setTimeout(update_pct, 50);
    }
}

setTimeout(update_pct, 100);



$('.operations_ul').on('click', '.operations_ul_item', function(){
    $('.operations_ul_item.active').removeClass('active');
    $(this).addClass('active');
    var status = $(this).data('status'),
        $operation;
    if (status) {
        $('.operation_status_main').hide();
        $('.operation_status_main[data-status="'+status+'"]').show();
    } else {
        $('.operation_status_main').show();
    }
});

$.getJSON('js/wallet.json', function (data) {

    var ChartData = [
        { "name": data[0][2], "y": data[0][5], "color": data[0][3] },
        { "name": data[1][2], "y": data[1][5], "color": data[1][3] },
        { "name": data[2][2], "y": data[2][5], "color": data[2][3] },
        { "name": data[3][2], "y": data[3][5], "color": data[3][3] },
        { "name": data[4][2], "y": data[4][5], "color": data[4][3] },
        { "name": data[5][2], "y": data[5][5], "color": data[5][3] },
        { "name": data[6][2], "y": data[6][5], "color": data[6][3] },
        { "name": data[7][2], "y": data[7][5], "color": data[7][3] },
        { "name": data[8][2], "y": data[8][5], "color": data[8][3] }
    ];
    Highcharts.chart('diagram', {
        credits: {
            enabled: false
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: "600px"
        },
        title: {
            text: ' '
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                borderColor: 'transparent',
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            showInLegend: false,
            name: 'Amount',
            colorByPoint: true,
            data: ChartData
        }]
    });
});
