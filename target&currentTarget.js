function hide(e) {
    // 点击的原始目标DOM
    // console.log(e.target);
    // 当事件触发后 冒泡至哪个元素时 这时的DOM
    console.log(e.currentTarget);
}

var ps = document.getElementsByTagName('*');

for (var i = 0; i < ps.length; i++) {
    // Console: print the clicked <p> element
    ps[i].addEventListener('click', hide, true);
    // 最后一个参数 为true 时 ，采取捕捉策略；false时，冒泡策略
}