$('html,body').on('click','.create_new_coach_img_btn',function(e){
    e.stopImmediatePropagation();
    $('.create_new_coach_img_input').trigger('click')
})

$('html,body').on('change','.create_new_coach_img_input',function(e){
    e.stopImmediatePropagation();
    var image = document.getElementById('output');
    $('.create_new_coach_img_preview').attr('src',URL.createObjectURL(e.target.files[0]))

})
