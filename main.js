$(document).on('click','#op-list a',function(){
	var url=$(this).attr("href");
	console.log(url);
	if(!url.endsWith('?preview')){
		setTimeout(function(){$.pjax({url:url,container:"#op-list",fragment:"#op-list",timeout:8000});},100);
		return false;
	}
	return true;
});
$(document).on('pjax:start',function(){NProgress.start();});
$(document).on('pjax:end',function(){NProgress.done();});