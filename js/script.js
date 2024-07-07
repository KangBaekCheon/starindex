const $slideContainer = document.querySelector('.slide');
const $slide = document.querySelectorAll('.slide .pho');
const $stopBtn = document.querySelector('.stop_btn');
const $prev = document.querySelector('.prevBtn');
const $next = document.querySelector('.nextBtn');
const $pager=document.querySelectorAll('.indicator');
const $pagerBtn=document.querySelectorAll('.indicator li');
const $slideCount=$slide.length;
let $currentIndex=0;
let $timer=undefined;
let $true=true;
const $stopBtnImg=document.querySelector('.stop_btn img');
const $imgOn=$stopBtnImg.getAttribute('src');
const $imgOff=$imgOn.replace('stop', 'play');
const $prom = document.querySelector('#main_prom');

document.querySelector('.notice_down_btn').onclick = function(){
    document.querySelector('.notice_down_btn').style.display = "none"
    document.querySelector('.notice_up_btn').style.display = "block"
    document.querySelector('#main_prom').style.display = "block"
}
document.querySelector('.notice_up_btn').onclick = function(){
    document.querySelector('.notice_down_btn').style.display = "block"
    document.querySelector('.notice_up_btn').style.display = "none"
    document.querySelector('#main_prom').style.display = "none"
}
function goToSlide(idx){    
    $slideContainer.style.left = -100 * idx + '%';
    $currentIndex=idx;
    PagerButton(idx);
    slider(idx);
}
goToSlide(0);

function slider(ind){
    $slide.forEach((sli, i) => {
        sli.classList.toggle('opa', i === ind);
    });
}

function PagerButton(index) {
    $pagerBtn.forEach((btn, i) => {
        btn.classList.toggle('on', i === index);
    });
    
}
$pagerBtn.forEach((btn, idx) => {
    btn.addEventListener('click',() => {
        goToSlide(idx);
    });
});

$next.addEventListener('click',function(){
    if($currentIndex == $slideCount - 1){
        goToSlide(0);
    }else{
        goToSlide($currentIndex+1);
    }
});

$prev.addEventListener('click',function(){
    if($currentIndex == 0){
        goToSlide($slideCount-1); 
    }else{
        goToSlide($currentIndex-1);
    }
});

startAutoSlide();
function startAutoSlide(){
    $timer = setInterval(function(){
        let nextIdx = ($currentIndex+1) % $slideCount;
        goToSlide(nextIdx);
    }, 3000);
}

function stopAutoSlide(){
    clearInterval($timer);
}

$stopBtn.addEventListener('click',function(){
    if($true == true){
        stopAutoSlide();
        this.querySelector('img').src=$imgOff;        
        $true=false;
    }else{
        startAutoSlide();
        this.querySelector('img').src=$imgOn;       
        $true = true;
    }
});