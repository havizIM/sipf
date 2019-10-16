console.log('Dashboard is running..')

$(function(){
    const DOM = {
        count: {
            user: '#count_user',
            po: '#count_po'
        },
        chart: {
            po_doughnut: 'po_doughnut',
            po_line: 'po_line',
            user_pie: 'user_pie'
        }
    }

    

    const dashboardController = (() => {
        const {count, chart} = DOM

        const PO_DOUGHNUT = new Chart(document.getElementById(chart.po_doughnut).getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        "blue",
                        "red"
                    ]
                }],
            },

            options: {
                legend: {
                    display: true,
                },
                responsive: true,
                tooltips: {
                    enabled: true,
                }
            }
        })

        const USER_PIE = new Chart(document.getElementById(chart.user_pie).getContext('2d'), {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        "green",
                        "red"
                    ]
                }],
            },

            options: {
                legend: {
                    display: true,
                },
                responsive: true,
                tooltips: {
                    enabled: true,
                }
            }
        })

        const PO_LINE = new Chart(document.getElementById(chart.po_line).getContext('2d'), {
            type: 'line',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
                datasets: [{
                    label: 'Fee Growth',
                    data: [],
                    borderColor: "rgba(0, 176, 228, 0.75)",
                    backgroundColor: "transparent",
                    pointBorderColor: "rgba(0, 176, 228, 0)",
                    pointBackgroundColor: "rgba(0, 176, 228, 0.9)",
                    pointBorderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                },
            },
        })

        const fetchUser = () => {
            $.ajax({
                url: `${BASE_URL}api/user`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    let aktif = data.filter(v => v.aktif === 'Y').length
                    let nonaktif = data.filter(v => v.aktif === 'T').length

                    if (aktif !== 0) {
                        USER_PIE.data.labels.push('Aktif');
                        USER_PIE.data.datasets[0].data.push(aktif)
                    }

                    if (nonaktif !== 0) {
                        USER_PIE.data.labels.push('Nonaktif');
                        USER_PIE.data.datasets[0].data.push(nonaktif)
                    }

                    $(count.user).text(data.length)
                    USER_PIE.update();
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        const fetchPo = () => {
            $.ajax({
                url: `${BASE_URL}api/purchase_order`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    let approve = data.filter(v => v.approve === 'Y').length
                    let proses = data.filter(v => v.approve === 'T').length

                    if (approve !== 0) {
                        PO_DOUGHNUT.data.labels.push('Approve');
                        PO_DOUGHNUT.data.datasets[0].data.push(approve)
                    }

                    if (proses !== 0) {
                        PO_DOUGHNUT.data.labels.push('Proses');
                        PO_DOUGHNUT.data.datasets[0].data.push(proses)
                    }
                    
                    $(count.po).text(data.length)
                    PO_DOUGHNUT.update();
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        const fetchStatistic = () => {
            $.ajax({
                url: `${BASE_URL}api/purchase_order/statistic`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: xhr => {
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                },
                success: ({ data }) => {
                    PO_LINE.data.datasets[0].data = data.total_fee;
                    PO_LINE.update();
                },
                error: err => {
                    const { error } = err.responseJSON
                    toastr.error(error, 'Gagal')
                }
            })
        }

        return {
            init: () => {
                fetchUser()
                fetchPo()
                fetchStatistic()
            }
        }
    })()

    dashboardController.init()
})