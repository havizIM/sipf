$(function () {
    const DOM = {
        page_content: '#page_content'
    }

    const mainUI = (() => {

    })()

    const mainController = ((UI) => {

        const loadContent = path => {
            $.ajax({
                url: `${BASE_URL}finance/${path}`,
                dataType: 'HTML',
                beforeSend: function () {
                    $.blockUI({
                        message: '<i class="fa fa-spinner fa-spin fa-5x"></i>',
                        overlayCSS: {
                            backgroundColor: '#fff',
                            opacity: 0.8,
                            cursor: 'wait'
                        },
                        css: {
                            border: 0,
                            padding: 0,
                            backgroundColor: 'transparent'
                        }
                    });
                },
                success: function (response) {
                    $(DOM.page_content).html(response)
                    $.unblockUI();
                },
                error: function () {
                    window.location.replace(`${BASE_URL}not_found`);
                }
            })
        }

        const setRoute = () => {
            let path;

            if (location.hash) {
                path = location.hash.substr(2);
                loadContent(path);
            } else {
                location.hash = '#/dashboard';
            }

            $(window).on('hashchange', function () {
                path = location.hash.substr(2);

                loadContent(path);
            });
        }

        const eventListener = () => {

        }

        return {
            init: () => {
                console.log('Main is running...')
                setRoute()
            }
        }
    })(mainUI)

    mainController.init();
})

