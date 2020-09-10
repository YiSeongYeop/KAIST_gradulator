new Swiper('.swiper-container', {
  loop: true,
  speed: 800,
  scrollbar : {
    el : '.swiper-scrollbar',
    draggable: true,
    dragSize: 50,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
  },
  mousewheel: {
    invert: false,
  },
  autoHeight: true,
});
//교필학/AU 인선 기필 기선 주전 2전
//영시 윤안 인리 영수 논글 연구
//console.log(calculated_list);
var calculated_list = new Object();

fetch('/resultdata')
  .then(response => response.json())
  .then(function(data) {
    console.log(data);
    if (data["교양필수 (AU)_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('kpa_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('kpa_');
      let str = String(data["교양필수 (AU)_total"] - data["교양필수 (AU)_req"])
       + ' / ' + String(data["교양필수 (AU)_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["교양필수 (학점)_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('kph_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('kph_');
      let str = String(data["교양필수 (학점)_total"] - data["교양필수 (학점)_req"])
       + ' / ' + String(data["교양필수 (학점)_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["인문사회선택_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('iss_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('iss_');
      let str = String(data["인문사회선택_total"] - data["인문사회선택_req"])
       + ' / ' + String(data["인문사회선택_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["기초필수_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('gp_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('gp_');
      let str = String(data["기초필수_total"] - data["기초필수_req"])
       + ' / ' + String(data["기초필수_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["기초선택" + " " + data["major"] + "_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('gs_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('gs_');
      let str = String(data["기초선택" + " " + data["major"] + "_total"] - 
        data["기초선택" + " " + data["major"] + "_req"])
       + ' / ' + String(data["기초선택" + " " + data["major"] + "_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data[data["major"] + " " + "주전공" + "_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('mj_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('mj_');
      let str = String(data[data["major"] + " " + "주전공" + "_total"] - 
        data[data["major"] + " " + "주전공" + "_req"])
       + ' / ' + String(data[data["major"] + " " + "주전공" + "_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data[data["submj"] + " " + data["subtype"] + "_req"] == 0) {
      let img = new Image();
      let div = document.getElementById('smj_');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('smj_');
      let str = String(data[data["submj"] + " " + data["subtype"] + "_total"] - 
        data[data["submj"] + " " + data["subtype"] + "_req"])
       + ' / ' + String(data[data["submj"] + " " + data["subtype"] + "_total"]);
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["eng_test"] == 0) {
      let img = new Image();
      let div = document.getElementById('eng_test');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('eng_test');
      let str = '<p>영어 시험을 치세요!</p>';
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }

    if (data["ethics_safety"] == 0) {
      let img = new Image();
      let div = document.getElementById('ethics_safety');
      img.onload = function() {
        div.appendChild(img);
      };
      img.src = 'img/complete.png';
      img.width = 505;
      img.height = 364;
    }
    else {
      let target = document.getElementById('ethics_safety');
      let str = '<p>윤리 안전 수업을 들으세요!</p>';
      let temp = document.createElement('div');
      temp.innerHTML = str;
      target.appendChild(temp);
    }
  });