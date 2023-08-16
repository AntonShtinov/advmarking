function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text);
}

window.onload = function() {
    var ad_info_element = document.getElementsByClassName('adv-marking-info-banner');
    for (var i = 0; i < ad_info_element.length; ++i) {
        var item = ad_info_element[i];

        if(item.getAttribute('data-erid')) {
            item.style.display = 'inline-flex';
        }

        var erid = '';
        if(item.getAttribute('data-link')) {
            erid = '<a href="' + document.location.origin +
                item.getAttribute('data-link') + '?erid=' + item.getAttribute('data-erid') +
                '">Скопировать ссылку</a>';
        } else {
            erid = 'erid: '+ item.getAttribute('data-erid');
        }
        item.innerHTML = '<span>Реклама</span> <div class="adv-marking-icon"></div>' +
            '<div class="adv-marking-popup">' +
            '<div class="adv-marking-popup-close"></div>' +
            '<div class="adv-marking-company"><div class="adv-marking-icon"></div><span>' + item.getAttribute('data-company') + '</span></div>' +
            '<div class="adv-marking-link"><div class="adv-marking-icon"></div><span>' + erid + '</span></div' +
            '</div>';
        item.parentNode.style.position = 'relative';
        item.addEventListener("click", function(e) {
            this.querySelector('.adv-marking-popup').style.display = 'block';
        }, false);
        item.querySelector('.adv-marking-popup-close').addEventListener("click", function(e) {
            this.parentNode.style.display = '';
            e.stopPropagation()
        }, false);
        if(item.getAttribute('data-link')) {
            item.querySelector('.adv-marking-link a').addEventListener("click", function(e) {
                copyTextToClipboard(this.href);
                e.preventDefault();
                e.stopPropagation();
                return false;
            }, false);
        }
    }
};
