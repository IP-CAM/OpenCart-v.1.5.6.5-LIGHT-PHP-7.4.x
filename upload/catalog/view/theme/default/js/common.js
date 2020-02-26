function getRoute(){return decodeURI((RegExp('route=(.+?)(&|$)').exec(location.search)||[,null])[1]);}
route=getRoute();if(!route){$('#nav-home').addClass('active');}else{parts=route.split('/');if(parts[0]=='account'&&parts[1]!='wishlist'){$('#nav-account').addClass('active');}else{obj=$('#nav-'+parts[1]);if(obj.length){$(obj).addClass('active');}}}
$(document).ready(function(){$('.list-group-item').filter(function(){return this.href===document.location.href;}).addClass('active');$('[data-toggle="tooltip"]').tooltip();$('.help-block.error').closest('.form-group').addClass('has-error');$('input[name="display"]').change(function(){$.cookie('display',$(this).val());location.reload();});if($.cookie('display')){$('#display-'+$.cookie('display')).addClass('active');}else{$('#display-list').addClass('active');}
$('#currency a').on('click',function(e){e.preventDefault();$('#currency input[name="currency_code"]').val($(this).attr('href'));$('#currency').submit();});$('form[id^="search-"]').submit(function(e){e.preventDefault();url=$('base').attr('href')+'index.php?route=product/search';$.each($(this).serializeArray(),function(i,field){if($.trim(field.value)!=0){url+='&'+field.name+'='+encodeURIComponent(field.value);}});location=url;});$('input[name="payment"]').change(function(){$('.payment').hide();$('#payment-'+this.value).show();});$('input[name="payment"]:checked').change();$('#review').load('index.php?route=product/product/review&product_id='+$('input[name="product_id"]').val());});$(document).on('click','#review .pagination a',function(e){e.preventDefault();$('#review').fadeOut('slow');$('#review').load(this.href);$('html,body').animate({scrollTop:$('#review').offset().top-100},'slow');$('#review').fadeIn('slow');});$(document).delegate('.colorbox','click',function(e){e.preventDefault();$('#modal').remove();var $this=$(this);$.ajax({url:$this.attr('href'),type:'get',dataType:'html',success:function(data){html='<div id="modal" class="modal">';html+='<div class="modal-dialog">';html+='<div class="modal-content">';html+='<div class="modal-header">';html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';html+='<h4 class="modal-title">'+$this.text()+'</h4>';html+='</div>';html+='<div class="modal-body">'+data+'</div>';html+='</div';html+='</div>';html+='</div>';$('body').append(html);$('#modal').modal();}});});var alertMessage=function(state,msg){var html='<div class="alert alert-'+state+' alert-dismissable" style="display:none;"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+msg+'</div>';$('#notification').html(html);$('#notification>.alert').fadeIn('slow').delay(15000).fadeTo(2000,0,function(){$(this).remove();});};$(document).on('click','button[id^="button-"],[data-cart]',function(e){var btn=$(this);btn.button({loadingText:btn.html()});$.ajax({beforeSend:function(){btn.button('loading');btn.append($('<i>',{class:'icon-loading'}));},complete:function(){btn.button('reset').blur();$('.icon-loading').remove();}});});$(document).on('click','#button-cart',function(){$.ajax({url:'index.php?route=checkout/cart/add',type:'post',data:$('#product-info').serialize(),dataType:'json',success:function(json){$('.help-block.error').remove();$('.has-error').removeClass('has-error');if(json['error']){if(json['error']['option']){for(i in json['error']['option']){$('#option-'+i).append($('<div>',{class:'help-block error'}).text(json['error']['option'][i])).closest('.form-group').addClass('has-error');}}}
if(json['success']){alertMessage('success',json['success']);$('#cart-total').html(json['total']);$('#cart').load('index.php?route=module/cart #cart>*');}}});});$('[data-cart]').click(function(){$.ajax({url:'index.php?route=checkout/cart/add',type:'post',data:'product_id='+$(this).data('cart')+'&quantity=1',dataType:'json',success:function(json){if(json['redirect']){location=json['redirect'];}
if(json['success']){alertMessage('success',json['success']);$('#cart-total').html(json['total']);$('#cart').load('index.php?route=module/cart #cart>*');}}});});function addToWishList(product_id){$.ajax({url:'index.php?route=account/wishlist/add',type:'post',data:'product_id='+product_id,dataType:'json',success:function(json){if(json['success']){alertMessage('info',json['success']);$('#wishlist-total').html(json['total']);}}});}
function addToCompare(product_id){$.ajax({url:'index.php?route=product/compare/add',type:'post',data:'product_id='+product_id,dataType:'json',success:function(json){if(json['success']){alertMessage('info',json['success']);$('#compare-total').html(json['total']);}}});}
function addReview(product_id,btn){$.ajax({url:'index.php?route=product/product/write&product_id='+product_id,type:'post',dataType:'json',data:$('#review-form').serialize(),success:function(json){if(json['error']){alertMessage('danger',json['error']);}
if(json['success']){alertMessage('success',json['success']);$('input[name="rating"]:checked').prop('checked',false);$('input[name="name"],textarea[name="text"],input[name="captcha"]').val('');}}});}
if($.isFunction($.fn.datetimepicker)){$('.date').datetimepicker({autoclose:1});}
if($.isFunction($.fn.imagesLoaded)){var $container=$('.product-masonry');$container.imagesLoaded(function(){$container.masonry({itemSelector:'.brick',isResizeBound:true});});}
$(document).on('change','select[name="customer_group_id"]',function(e){if(customer_group[this.value]){if(customer_group[this.value]['company_id_display']==1){$('#company-id-display').show();}else{$('#company-id-display').hide();}
if(customer_group[this.value]['company_id_required']==1){$('#company-id-required').show();}else{$('#company-id-required').hide();}
if(customer_group[this.value]['tax_id_display']==1){$('#tax-id-display').show();}else{$('#tax-id-display').hide();}
if(customer_group[this.value]['tax_id_required']==1){$('#tax-id-required').show();}else{$('#tax-id-required').hide();}}});$(document).on('change','select[name="country_id"]',function(e){var $this=$(this),param=$this.data('param');$.ajax({url:'index.php?route=account/register/country&country_id='+$this.val(),dataType:'json',beforeSend:function(){$this.after($('<i>',{class:'icon-loading'}));},complete:function(){$('.icon-loading').remove();},success:function(json){if(json['postcode_required']==1){$('#postcode-required').show();}else{$('#postcode-required').hide();}
if(json['zone']!=''){html='<option value="">'+param.select+'</option>';for(i=0;i<json['zone'].length;i++){html+='<option value="'+json['zone'][i]['zone_id']+'"';if(json['zone'][i]['zone_id']==param.zone_id){html+=' selected=""';}
html+='>'+json['zone'][i]['name']+'</option>';}}else{html='<option value="0" selected="">'+param.none+'</option>';}
$('select[name="zone_id"]').html(html);}});});$(document).ready(function(){$('select[name="customer_group_id"]').change();$('select[name="country_id"]').change();});$(document).on('keydown','#checkout-container input',function(e){if(e.keyCode==13){$(this).closest('form').find('button[id^="button-"]').click();}});$(document).on('click','#checkout-container .panel-heading a.close',function(){$('.panel-collapse').slideUp('slow');$(this).parent().parent().find('.panel-collapse').slideDown('slow');});$('.btn-social .btn').on('click',function(e){e.preventDefault();var w=580;var h=340;var left=(screen.width/2)-(w/2);var top=(screen.height/2)-(h/2);window.open($(this).attr('href'),'sharer','toolbar=0,status=0,width='+w+',height='+h+',top='+top+',left='+left);});$('[data-ride="carousel"]').each(function(){var $this=$(this);var $dist=Math.ceil(($this.width()/10)*2);$this.swipe({swipeStatus:function(event,phase,direction,distance,duration,fingers){if((distance>$dist)){if(direction=='left'||direction=='up'){$this.carousel('next');}else if(direction=='right'||direction=='down'){$this.carousel('prev');}
return false;}}});});$(document).on('click','button[id^="button-upload-"]',function(){var a=$(this);$('#form-upload').remove();$('body').prepend('<form enctype="multipart/form-data" id="form-upload" style="display:none;"><input type="file" name="file"></form>');$('#form-upload input[name="file"]').on('change',function(){$.ajax({url:'index.php?route=product/product/upload',type:'post',dataType:'json',data:new FormData($(this).parent()[0]),cache:false,contentType:false,processData:false,success:function(json){$('.alert,.help-block.error').remove();$('.has-error').removeClass('has-error');if(json['error']){a.after('<div class="help-block error">'+json['error']+'</div>').closest('.form-group').addClass('has-error');}
if(json['success']){alertMessage('success',json['success']);a.parent().find('input[name^="option"]').val(json['file']);}}});}).click();});