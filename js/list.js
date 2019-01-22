(function (){

    let rightList = document.getElementById('rightList');
    let nav = document.getElementById('nav');
    let sz = document.getElementById('sz');
    let xz = document.getElementById('xz');

    renderList('sh',1);
    rendera('sh');        //sh xy

    let hash = window.location.hash;
    if(!hash){
        window.location.hash = 'text=1&p=1';
    }else{
        ha();
    }

    window.onhashchange = function(){
        ha();
    }

    function ha(){
        let aa = window.location.hash.split('&');
        let val =[];

        aa.forEach(e=>{
            val.push(e.split("=")[1]);
        })
        if(val[0] == 1){
            renderList('sh',Number(val[1]));
        }else if(val[0] == 2){
            renderList('xy',Number(val[1]));
        }
    }

    sz.addEventListener('click',szz);
    xz.addEventListener('click',xzz);

    function szz(){
        window.location.hash = 'text=1&p=1';
        nav.innerHTML="";
        renderList('sh',1);
        rendera('sh');
        sz.className = 'active';
        xz.className = '';
    }
    
    function xzz(){
        window.location.hash = 'text=2&p=1';
        nav.innerHTML="";
        renderList('xy',1);
        rendera('xy');
        sz.className = '';
        xz.className = 'active';
    }
    
    function renderList(text,page){
        let arr = getPageData(text,page);
        
        for(let i = 0;i < arr.length ; i++){
            if(arr[i] == undefined){
                arr.splice(i,1);
                // break;
                i--;
            }
        }

        let temp = '';
        let nn = (page-1)*4 + 1;  
        arr.forEach(d=>{
            temp += `
                <li>
                    <span class="num">${nn}</span>
                    <div class="list">
                        <a href=""><span class="job">职位需求:${d.zw}</span><span>需求人数：2名</span><time>2014-04-10</time></a>
                        <p><span class="text">岗位要求：${d.info[0].l}</span><a href="javascript:;" class="getInfo" id="${nn}">查看详情>></a></p>
                    </div>
                </li>`;
            nn++;
        });
        rightList.innerHTML = temp;

        rightList.onclick = function (ev){
            if(ev.target.className == "getInfo"){

                let preHash = window.location.hash;
                localStorage.setItem('hash',preHash+"&id="+ev.target.id);
                
                let pp =  window.location.pathname.replace(/list/,"content");
                window.location.href = pp;   

            }
        }
    }

    function rendera (text){
        let tt = text == 'sh' ? 1 : 2;
        let data = getAllData(text);
        let page = getPages(data);
        // nav.innerHTML = "<a>&lt;</a>";
        for (let i = 1; i < page + 1; i++){
            let a = document.createElement('a');
            a.href = "javascript:;"
            a.innerHTML = i; 
            a.onclick = function(ev){
                console.log(window.location.hash)
                window.location.hash = '';
                window.location.hash ='text='+ tt +'&p='+ i;
                renderList(text,i);
            };
            nav.appendChild(a);
        }

    }
    
    function getAllData(text){ //得到所有社会的数据[{}{}]
        return text == 'sh' ? data.sh.text : data.xy.text;
    }

    function getPages(dd){     //得到对应数据的页数
        return Math.ceil(dd.length / 4);
    }

    function getPageData(text,num){//num =1得到对应页数的数据,text看是社招，还是校招，社招为0，校招为1
        let allData = getAllData(text);
        let pages = getPages(allData); 
        let dataArr = [];
        for (var i = 0; i < allData.length; i+=4){
            dataArr.push([allData[i],allData[i+1],allData[i+2],allData[i+3]]);
        } 
        return dataArr[num-1];
    }

})();
