var imgLocation = 0;

var rockscissorpaper = { // 딕셔너리 자료구조
    rock: '0',
    scissor: '-145px',
    paper: '-286px'
};

function comSelect(imgLocation) {
    // 1차원 배열일 경우 indexof를 사용하고 2차원 배열일 경우 find, findindex를 사용한다.
    // find도 반복문으로 친다.
    return Object.entries(rockscissorpaper).find(function(v) {
        return v[1] === imgLocation;
    })[0];
}

var interval;
function intervalMake() {
    clearInterval(interval);
    interval = setInterval(function() {
        if(imgLocation === rockscissorpaper.rock) {
            imgLocation = rockscissorpaper.scissor;
        } else if(imgLocation === rockscissorpaper.scissor) {
            imgLocation = rockscissorpaper.paper;
        } else {
            imgLocation = rockscissorpaper.rock;
        }
        document.querySelector('#computer').style.background =
          'url(https://lh3.googleusercontent.com/proxy/XtgN_9EbMj-HH__xBbJiehulffSu7Z1sieFpI6nrjoGCgZ9fTXCiRjwG5duK3kwJz2rF7kVWUlSB24Tph1aj8VJZlc1WDiBhGiUEnMUDkoJL5XRu04683BFowXNuth7GSQXddwV45r-T) ' + imgLocation + ' 0';
    }, 100)
}

intervalMake();

var list = {
    rock: 1,
    scissor: 0,
    paper: -1
}

document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        clearInterval(interval); // clearinterval을 사용하면 interval이 멈춘다.
        setTimeout(function() {
            intervalMake();
        }, 1000);
        var mySelect = this.textContent;
        var myScore = list[mySelect];
        var comScore = list[comSelect(imgLocation)];
        var compare = myScore - comScore;
        if(compare === 0) {
            console.log('비겼습니다!');
        } else if([-1, 2].includes(compare)) {
            console.log('졌습니다!');
        } else {
            console.log('이겼습니다!');
        }
        console.log('나의 선택: ' + mySelect, '컴퓨터의 선택: ' + comSelect(imgLocation));
    });
});