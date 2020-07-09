//下拉列表

var banner_list_items = document.querySelectorAll(".banner-list-item");
var goods_list = document.querySelector(".goods-list");

goods_list.onmouseover = function () {
  this.style.display = "block";
};
goods_list.onmouseout = function () {
  this.style.display = "none";
};

for (i = 0; i < banner_list_items.length; i++) {
  banner_list_items[i].onmouseover = function () {
    goods_list.style.display = "block";
  };
  banner_list_items[i].onmouseout = function () {
    goods_list.style.display = "none";
  };
}

//返回顶部

//1. 获取元素
var sliderbar = document.querySelector(".slider-bar");
var banner = document.querySelector(".banner");
var bannerTop = banner.offsetTop;
// 侧边栏固定定位之后应该变化的数值
var sliderbarTop = sliderbar.offsetTop - bannerTop;
// 获取column 主体元素
var column = document.querySelector(".column");
var goBack = document.querySelector(".goBack");
var columnTop = column.offsetTop;
// 2. 页面滚动事件 scroll
document.addEventListener("scroll", function () {
  // 3 .当我们页面被卷去的头部大于等于了 455px 此时 侧边栏就要改为固定定位
  if (window.pageYOffset >= bannerTop) {
    sliderbar.style.position = "fixed";
    sliderbar.style.top = sliderbarTop + 200 + "px";
  } else {
    sliderbar.style.position = "absolute";
    sliderbar.style.top = "300px";
  }
  // 4. 当我们页面滚动到column盒子，就显示 goback模块
  if (window.pageYOffset >= columnTop) {
    goBack.style.display = "block";
  } else {
    goBack.style.display = "none";
  }
});
// 点击了返回顶部模块，就让窗口滚动的页面的最上方
goBack.addEventListener("click", function () {
  //窗口滚动 所以对象是window
  animates(window, 0);
});
// 动画函数
function animates(obj, target, callback) {
  // 清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 步长值写到定时器的里面 步长值改为整数
    var step = (target - window.pageYOffset) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (window.pageYOffset == target) {
      // 停止动画 本质是停止定时器
      clearInterval(obj.timer);
      callback && callback();
    }
    // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
    window.scroll(0, window.pageYOffset + step);
  }, 15);
}
