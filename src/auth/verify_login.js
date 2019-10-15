if (TOKEN) {
    $.ajax({
        url: `${BASE_URL}api/setting/verify_user`,
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
            xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
        },
        success: function (res) {
            if (res.data.length !== 0) {
                const { level, aktif } = res.data;

                if (aktif === 'Y') {
                    window.location.replace(`${BASE_URL}${level}/`)
                }
            } else {
                localStorage.removeItem('X-SIPF-KEY')
            }

        },
        error: function (err) {
            localStorage.removeItem('X-SIPF-KEY')
        }
    })
}