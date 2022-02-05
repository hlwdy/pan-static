function refreshPath(){
	var tmp=decodeURIComponent(window.location.href).split('/');
	tmp=tmp.splice(3,tmp.length-4);
	var htmltext='';
	if(tmp.length==0)htmltext='<li class="breadcrumb-item"><a href="#">Home</a></li>';
	else htmltext='<li class="breadcrumb-item"><a href="./'+'../'.repeat(tmp.length)+'">Home</a></li>';
	for(i in tmp){
		htmltext+='<li class="breadcrumb-item"><a href="'+(i==tmp.length-1?'#':'./'+'../'.repeat(tmp.length-1-i))+'">'+tmp[i]+'</a></li>';
	}
	$('#navbar-href ol').html(htmltext);
	return htmltext;
}
function refreshData(){
	document.querySelectorAll("#op-list").forEach(t=>{t.querySelectorAll("tr>td:nth-child(2)").forEach(t=>t.textContent=formatDate(t.textContent)),t.querySelectorAll("tr>td:nth-child(3)").forEach(t=>t.textContent=formatSize(t.textContent))});
}
function showMask(){
	$(".mask").css("height",$(document).height());
	$(".mask").css("width",$(document).width());
	$(".mask").show();
}
function hideMask(){
	$(".mask").hide();
}
$(document).on('click','#op-list a,#navbar-href a[href!="#"]',function(){
	if(!$('#op-list').length)return true;
	var url=$(this).attr("href");
	if(!url.endsWith('?preview')){
		setTimeout(function(){$.pjax({url:url,container:"#op-list",fragment:"#op-list",timeout:8000});},10);
		return false;
	}
	return true;
});
$(document).on('pjax:start',function(){showMask();NProgress.start();});
$(document).on('pjax:end',function(){NProgress.done();refreshPath();refreshData();hideMask();});

$(document).on('click','#op-list tbody tr',function(){
	this.querySelector('td a').click();
});