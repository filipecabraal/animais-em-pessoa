var page = {
	init: function(){
    this.geral();
    this.slide();
  },

  geral: function() {

    // placeholder no ie
    $('input, textarea').placeholder();

    // mascara telefone
    var maskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    options = {onKeyPress: function(val, e, field, options) {
            field.mask(maskBehavior.apply({}, arguments), options);
        }
    };

    $('.telefone').mask(maskBehavior, options);

    // validação
    $('form').each(function() {  
      $(this).validate({      
        errorPlacement: function(error,element) {
          return true;
        }
      });
    });

    $('form').submit(function() {
      $(this).find("button[type='submit']").prop('disabled',true);
    });
  },

  slide: function(){
    $('.owl-carousel').owlCarousel({
      responsive:{
        0:{
          items:1,
          nav:false,
          dots:true
        },
        768:{
          items:0
        },
        1200:{
          items:0
        }          
      }
    });
  }
}   
page.init();