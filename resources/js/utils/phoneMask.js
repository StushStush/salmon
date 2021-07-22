import IMask from 'imask';

var items = document.getElementsByClassName('input_phone');

Array.prototype.forEach.call(items, function(element) {
    var phoneMask = new IMask(element, {
        mask: '+{7} 000 000 00 00',
        placeholder: {
            show: 'always'
        }
    });
});
