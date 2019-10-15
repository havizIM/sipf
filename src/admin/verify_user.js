
const verifyUser = (() => {

    const DOM = {
        header: {
            name: '#header_name',
            email: '#header_email'
        },
        profile: {
            username: '#profile_username',
            nama_lengkap: '#profile_nama_lengkap',
            telepon: '#profile_telepon',
            email: '#profile_email'
        }
    }

    const setSession = (data) => {
        const {header, profile} = DOM

        $(header.name).text(data.nama_lengkap)
        $(header.email).text(data.email)

        $(profile.username).val(data.username)
        $(profile.nama_lengkap).val(data.nama_lengkap)
        $(profile.telepon).val(data.telepon)
        $(profile.email).val(data.email)
    }

    const cekUser = () => {
        if (!TOKEN) {
            window.location.replace(`${BASE_URL}`);
        } else {
            $.ajax({
                url: `${BASE_URL}api/setting/verify_user`,
                type: 'GET',
                dataType: 'JSON',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD))
                    xhr.setRequestHeader("X-SIPF-KEY", TOKEN)
                },
                success: function (res) {
                    if (res.status === true) {
                        const { level, aktif } = res.data;

                        if (aktif === 'T') {
                            localStorage.removeItem('X-SIPF-KEY')
                            window.location.replace(`${BASE_URL}`)
                        } else {
                            if (level !== 'admin') {
                                window.location.replace(`${BASE_URL}${level}/`)
                            } else {
                                setSession(res.data);
                            }
                        }
                    } else {
                        localStorage.removeItem('X-SIPF-KEY')
                        window.location.replace(`${BASE_URL}`)
                    }
                },
                error: function (err) {
                    localStorage.removeItem('X-SIPF-KEY')
                    window.location.replace(`${BASE_URL}`)
                }
            })
        }
    }

    return {
        init: () => {
            cekUser()
        }
    }
})()

verifyUser.init()