
(function (){
    
    let content = document.getElementById('content');
    let hash = window.location.hash;

    if(!hash){
        window.location.hash = localStorage.getItem('hash');
        aa();
    }else{
        aa();
    }

    function aa(){
        let aa = localStorage.getItem('hash').match(/\d/g);
        aa[0] == 1 ? aa[0] = 'sh' : aa[0] = 'xy';
        render(aa[0],aa[2]);
    }

    function getAllData(text){ 
        return text == 'sh' ? data.sh.text : data.xy.text;
    }

    function render(text,id){
        let arr = getAllData(text);
        let dd = arr[id-1];// id:1 -> index:0
        let temp = `
        <div id="title">
            <p>${dd.zw}</p>
            <div class="simple">18k-25k<span>/</span>${dd.dd}<span>/</span>${dd.jy}<span>/</span>${dd.xl}<span>/</span>${dd.rs} <time>${dd.sj}</time></div>
        </div>
        <div id="bottom">
            <dl>
                <dt>${dd.info[0].t}</dt>
                <dd>${dd.info[0].l[0]}</dd>
                <dd>${dd.info[0].l[1]}</dd>
                <dd>${dd.info[0].l[2]}</dd>
                <dd>${dd.info[0].l[3]}</dd>
                <dd>${dd.info[0].l[4]}</dd>
                <dd>${dd.info[0].l[5]}</dd>
            </dl>
        </div>`;
        content.innerHTML += temp;
    }

})();
