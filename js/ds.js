$(function() {
    let loading = {
        show: function() {
            $("body").append("<div class='main-loading'></div>");
        },
        hide: function() {
            $(".main-loading").remove();
        }
    }
    $("body").easeScroll();

    $("[data-bg]").each(function() {
        let $this = $(this),
            $bg = $this.attr("data-bg");
         console.log($("[data-bg]").css )
        $this.css({
            backgroundImage: 'url(' + $bg + ')',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'center'
        });
        $this.prepend("<div class='overlay'></div>");
    });

    $(".smooth-link").click(function() {
        let $this = $(this),
            $target = $($this.attr("href"));
        $("html, body").animate({
            scrollTop: $target.offset().top - ($(".main-navbar").outerHeight() - 1)
        });

        return false;
    });

    $(window).scroll(function() {
        let $this = $(this);
        $("section").each(function() {
            if ($this.scrollTop() >= ($(this).offset().top - $(".main-navbar").outerHeight())) {
                $(".smooth-link").parent().removeClass("active");
                $(".smooth-link[href='#" + $(this).attr("id") + "']").parent().addClass('active');
            }
        });
    });

    $("[data-toggle=read]").click(function() {
        let $this = $(this),
            $id = $this.attr("id");

        $("body").css({
            overflow: "hidden"
        });

        let $element = '<div class="article-read">';
        $element += '<div class="article-read-inner">';
        $element += '<div class="article-back">';
        $element += '<a class="btn btn-outline-primary"><i class="ion ion-chevron-left"></i> Back</a>';
        $element += '</div>';
        $element += '<h1 class="article-title">{title}</h1>';
        $element += '<div class="article-metas">';
        $element += '<div class="meta">';
        $element += '	{date}';
        $element += '</div>';
        $element += '<div class="meta">';
        $element += '	{category}';
        $element += '</div>';
        $element += '<div class="meta">';
        $element += '	{author}';
        $element += '</div>';
        $element += '</div>';
        $element += '<figure class="article-picture"><img src="{picture}"></figure>';
        $element += '<div class="article-content">';
        $element += '{content}';
        $element += '</div>';
        $element += '</div>';
        $element += '</div>';

        $.ajax({
            url: "mock/article.json",
            dataType: 'json',
            beforeSend: function() {
                loading.show();
            },
            complete: function() {
                loading.hide();
            },
            success: function(data) {
                let reg = /{([a-zA-Z0-9]+)}/g,
                    res = [],
                    element = $element;
                while (match = reg.exec($element)) {
                    element = element.replace('{' + match[1] + '}', data[match[1]]);
                }

                $("body").prepend(element);
                $(".article-read").fadeIn();
                $(document).on("click", ".article-back .btn", function() {
                    $(".article-read").fadeOut(function() {
                        $(".article-read").remove();
                        $("body").css({
                            overflow: 'auto'
                        });
                    });
                    return false;
                });
            }
        });

        return false;
    });

    $("#contact-form").submit(function() {
        let $this = $(this);
        $.ajax({
            url: 'server/send.php',
            type: "post",
            data: $this.serialize(),
            dataType: 'json',
            beforeSend: function() {
                loading.show();
            },
            complete: function() {
                loading.hide();
            },
            success: function(data) {
                if (data.status === true) {
                    swal("Mensagem enviada com sucesso :)", data.data, "success");
                    $this[0].reset();
                } else {
                    swal("Failed", data.data, "error");
                }
            }
        });
        return false;
    });

    $(".subscribe").submit(function() {
        let $this = $(this);
        $.ajax({
            url: 'server/send.php',
            type: "post",
            data: $this.serialize(),
            dataType: 'json',
            beforeSend: function() {
                loading.show();
            },
            complete: function() {
                loading.hide();
            },
            success: function(data) {
                if (data.status === true) {
                    swal("Mensagem enviada com sucesso", data.data, "success");
                    $this[0].reset();
                } else {
                    swal("Failed", data.data, "error");
                }
            }
        });
        return false;
    });



 ///  foto passado
function atualizar_img(){

   let cont=0
   

 function loop(){
     window.requestAnimationFrame(loop);
     cont++
     console.log(cont)
     if (cont==(28*5)){ 
         $("[data-bg]").css({
         backgroundImage: 'url(' + "img/senne.jpg" + ')'
     })

     }
    else if(cont==(28*10)){
          $("[data-bg]").css({
          backgroundImage: 'url(' + "img/uni2.jpg" + ')'
          })
    }
    else if(cont==(28*15)){
          $("[data-bg]").css({
           backgroundImage: 'url(' + "img/hero.jpg" + ')'
    })

    cont=0

    }
 } 
 loop(); 
  
}


 atualizar_img();

});