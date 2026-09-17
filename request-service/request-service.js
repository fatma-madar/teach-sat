

document.getElementById('requestServiceForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const form = event.target;
    const honeypot = form.querySelector('#rs-website');
    const toast = document.querySelector('.site-toast');

    if (honeypot && honeypot.value) {
        form.reset();
        return;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (toast) {
        toast.textContent = 'تم إرسال طلبك بنجاح، سيتواصل معك فريقنا خلال 24 ساعة.';
        toast.classList.add('visible');

        window.setTimeout(function () {
            toast.classList.remove('visible');
        }, 4000);
    }

    form.reset();
});
