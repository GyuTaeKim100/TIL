
const block_element = document.getElementById("block");
const lightbox_element = document.getElementById("lightbox");
const select_picture_btn_in_lightbox = document.querySelectorAll(".indicator button");

/**
 * @param img_num 라이트 박스에 출력 할 해당 이미지 번호
 * @brief 라이트 박스를 해당 이미지 번호 이미지로 연다.
 */
function lightbox_open(img_num){
    
    block_element.setAttribute('class', "active");
    lightbox_element.setAttribute('class', "active");

    change_img(img_num);
}

/**
 * @brief 라이트 박스를 닫는다.
 */
function lightbox_close(){

    block_element.removeAttribute('class', "active");
    lightbox_element.removeAttribute('class', "active");

}

/**
 * @brief 이미지 변경 핸들러
 */
function change_img(img_num){

    const img_elements  = lightbox_element.getElementsByTagName("img");

    select_picture_btn_in_lightbox[img_num-1].focus();

    for(var i= 0 ; i < img_elements.length; i++){

        img_elements[i].removeAttribute("class", "active");
    }

    img_elements[img_num-1].setAttribute("class", "active");

}