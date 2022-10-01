(function ( $ ) {
            

    $.fn.preview = function(options) {
        var settings = $.extend({
            element: ``,
            elemDefault: ``,
            data: []
        }, options );
        const t = this;
        
        render();
        function render(){
            t.html(`<div class="row preview-container" for="buttons">
                            <div class="col-8 preview-tabs">
                                <div class="row">
                                    <div class="d-flex justify-content-center align-items-center preview-example">

                                    </div>
                                </div>
                            </div>
                            <div class="col-4 preview-options">
                                <div class="row">
                                    <div class="preview-options-title">
                                        <h1>Opciones</h1>
                                    </div>
                                    <div class="preview-options-container">

                                    </div>
                                </div>
                            </div>
                            <div class="col-12 preview-code">
                                <div class="row">
                                    <pre class="language-markup"><code></code></pre>
                                </div>
                            </div>
                        </div>`);
            const preContainer = t.find(".preview-options-container");
            settings.data.map((v, i) =>{
                switch (v.type) {
                    case "input":
                        preContainer.append(pInput(v.variable, v.value));
                    break;
                    case "select":
                        preContainer.append(pSelect(v.variable, v.value));
                    break;
                    case "check":
                        preContainer.append(pCheck(v.variable, v.value));
                    break;
                
                }
            })
            
            pCode("", settings.elemDefault);
        }

        function pInput(variable, value){
            return $(`<div class="mb-2">
                            <label class="form-label">${variable}</label>
                        </div>`)
                    .append($(`<input type="text" class="form-control preview-input" variable="${variable}" value="${value}">`)
                        .bind("keyup", function(){
                            pCode();
                        })
                    );
        }

        function pSelect(variable, value){
            let select = $(`<div class="mb-2">
                    <label class="form-label">${variable}</label>
                </div>`)
            .append($(`<select class="form-control preview-select" variable="${variable}"></select>`)
                .bind("change", function(){
                    pCode();
                })
            );
            value.map((v, i) =>{
                select.find("select").append(`<option value="${v.value}">${v.text}</option>`)
            })
            return select;
        }

        function pCheck(variable, value){
            return $(`<div class="form-check" for="${variable}">
                                <label class="form-check-label">
                                    ${variable}
                                </label>
                            </div>`)
                    .append($(`<input class="form-check-input preview-check" variable="${variable}" type="checkbox" value="${value}">`)
                        .bind("change", function(){
                            pCode();
                        })
                    );
                        
        }

        function pCode(){
            let code = settings.element;
            $.map($("input, select"), function (element, i) {
                if($(element).hasClass("preview-check")){
                    code = code.replace(`{${$(element).attr("variable")}}`, ($(element).prop("checked")) ? $(element).val() : "");
                } else {
                    code = code.replace(`{${$(element).attr("variable")}}`, $(element).val());
                }
                
            });
            t.find("code").text(code);
            Prism.highlightAll();
            t.find(".preview-example").html(code);
        }
        
    };
}( jQuery ));