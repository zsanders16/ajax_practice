var currentProduct = {}
var showForm = false;
var editingProduct;

$(document).ready(function(){
    
    function toggle(){
        showForm = !showForm
        $('#product-form').remove();
        $('#products-list').toggle();
        if(showForm){
            $.ajax({
                url: '/product_form',
                method: 'GET',
                data: { id: editingProduct }
            }).done(function(html){
                $('#toggle').after(html)
            });
        }
    };

    function getProduct(id) {
        $.ajax({
            url: '/products/' + id,
            method: 'GET',
        }).done( function(product) {
            if (editingProduct) {
                var li = $("[data-id='" + id + "'")
                $(li).parent().replaceWith(product)
                editingProduct = null
            } else {
                $('#products-list').append(product);
            }
        });
    }
    
    $(document).on('submit', '#product-form form', function(e){
        e.preventDefault();
        var data = $(this).serializeArray();
        var url = '/products';
        var method = 'POST';

        if (editingProduct) {
            url = url + '/' + editingProduct;
            method: 'PUT'
        }

        $.ajax({
            url: url,
            type: method,
            dataType: 'JSON',
            data: data
        }).done( function(product) {
            toggle();
            getProduct(product.id)
        }).fail( function(err) {
            alert(err.responseJSON.errors)
        });

    })


    $('#toggle').on('click', function(){
        toggle();
    })

    $(document).on('click', '#edit-product', function() {
        editingProduct = $(this).siblings('.product-item').data().id
        debugger
        toggle();
    });

    $(document).on('click', '#delete-product', function() {
        var id = $(this).siblings('.product-item').data().id;
        $.ajax({
            url: '/products/' + id,
            method: 'DELETE'
        }).done( function() {
            var row = $("[data-id='" + id + "'");
            row.parent('li').remove();
        });
    });
    
    
})