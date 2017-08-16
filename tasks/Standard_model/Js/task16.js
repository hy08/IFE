/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value.replace(/\s+/g,"");
	var num=document.getElementById("aqi-value-input").value.replace(/\s+/g,"");
	var cityReg=/^[a-zA-Z|\u4e00-\u9fa5]+$/;
	var numReg=/^\d+$/;
	
	if(!cityReg.test(city)){
		var classVal = document.getElementsByClassName("city errorMessage")[0].getAttribute("class");
		classVal = classVal.replace("hide","");
		document.getElementsByClassName("city errorMessage")[0].setAttribute("class",classVal );
		return;
	}

	if(!numReg.test(num)){
		var classVal = document.getElementsByClassName("num errorMessage")[0].getAttribute("class");
		classVal = classVal.replace("hide","");
		document.getElementsByClassName("num errorMessage")[0].setAttribute("class",classVal );
		return;
	}
	if(cityReg.test(city)&&numReg.test(num)){
		document.getElementsByClassName("city errorMessage")[0].setAttribute("class","city errorMessage hide");
		document.getElementsByClassName("num errorMessage")[0].setAttribute("class","num errorMessage hide");
		aqiData[city]=num;
	}
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tableStr="";
	var table=document.getElementById("aqi-table");
	for (var key in aqiData) {
		if(table.childElementCount==0){
			tableStr+= "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>";
		}
		tableStr +="<tr><td>"+key+"</td><td>"+aqiData[key]+"</td><td><button type='button' class='del'>删除</button></td></tr>";	
	}
	document.getElementById("aqi-table").innerHTML=tableStr;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
    var tr = target.parentElement.parentElement;
    var strCity = tr.children[0].innerHTML;
    delete aqiData[strCity];
    renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").addEventListener("click",addBtnHandle,false);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
//	var delBtn=document.getElementById("aqi-table").getElementsByClassName("del");
//	for(var i=0;i<delBtn.length;i++){
//	    delBtn[i].addEventListener("click",delBtnHandle,false);
//	}
    var table = document.getElementById("aqi-table");

    table.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    });
}

init();
