(function ($) {
	"use strict";
	
	var mapLoaded = false,
		map;
	/*---------------Google Maps Scripts-------------------------*/
  function createStyle(src, img) {
    return new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.96],
        crossOrigin: 'anonymous',
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined
      }))
    });
  }
	function initMap() {
    var iconFeature = new ol.Feature(new ol.geom.Point([116.305671,39.968926]));
    iconFeature.set('style', createStyle('https://openlayers.org/en/v4.6.4/examples/data/icon.png', undefined));
    map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
          style: function(feature) {
            return feature.get('style');
          },
          source: new ol.source.Vector({features: [iconFeature]})
        })
      ],
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      view: new ol.View({
        // center: ol.proj.fromLonLat([102.938152, 25.108923]),
        center: [116.338,39.948926],
        // 指定投影使用EPSG:4326一个等同于WGS84坐标系
        projection: 'EPSG:4326',
        zoom: 12,
        maxZoom:13,
        minZoom:11
      })
    });
	}
	
	function showPage(bt, pagename) {
		var btn = $(bt),
			pageContListID = $('.page-container li#' + pagename),
			pageContListSelected = $('.page-container li.selected'),
			pageTitleCont = pageContListID.find(".title-container"),
			pageDescription = pageContListID.find(".description");
		
		if (!pageContListID.hasClass('selected')) {
			pageContListSelected.find(".title-container h2").addClass('rotated');
			$(".nav-menu li.selected").removeClass('selected');
			btn.addClass('selected');
			if (window.innerWidth > 767) {
				$(".selected .description").jQueryTween({
					from: {
						height: 475
					},
					to: {
						height: 0
					},
					duration: 400,
					easing: TWEEN.Easing.Sinusoidal.Out
				}, function () { // callback when tween is finished
					pageContListSelected.addClass('hidden');
					pageContListSelected.find(".description").css('height', '475px');
					pageContListSelected.removeClass('selected');
					pageContListID.removeClass('hidden');
					pageContListID.addClass('selected');
				});
				$(".selected .title-container").jQueryTween({
					from: {
						translate: {
							y: 0
						}
					},
					to: {
						translate: {
							y: 140
						}
					},
					duration: 400,
					easing: TWEEN.Easing.Sinusoidal.Out
				});
				pageDescription.jQueryTween({
					from: {
						height: 0
					},
					to: {
						height: 475
					},
					duration: 700,
					delay: 350,
					easing: TWEEN.Easing.Sinusoidal.In
				}, function () { // callback when tween is finished
					if (pagename == "contact" && !mapLoaded) { //loads Maps
						initMap();
						mapLoaded = true;
					}
				});
				pageTitleCont.jQueryTween({
					from: {
						translate: {
							y: 150
						}
					},
					to: {
						translate: {
							y: 0
						}
					},
					duration: 700,
					delay: 350,
					easing: TWEEN.Easing.Sinusoidal.In
				}, function () {
					pageTitleCont.find("h2").removeClass('rotated');
				});
			} else {
				$(".selected .description").jQueryTween({
					from: {
						translate: {
							y: 0
						}
					},
					to: {
						translate: {
							y: 850
						}
					},
					duration: 400,
					easing: TWEEN.Easing.Sinusoidal.Out
				}, function () { // callback when tween is finished
					pageContListSelected.addClass('hidden');
					pageContListSelected.removeClass('selected');
					pageContListID.removeClass('hidden');
					pageContListID.addClass('selected');
				});
				$(".selected .title-container").jQueryTween({
					from: {
						translate: {
							x: 0
						}
					},
					to: {
						translate: {
							x: -800
						}
					},
					duration: 400,
					easing: TWEEN.Easing.Sinusoidal.Out
				});
				pageDescription.jQueryTween({
					from: {
						translate: {
							y: 850
						}
					},
					to: {
						translate: {
							y: 0
						}
					},
					duration: 700,
					delay: 350,
					easing: TWEEN.Easing.Sinusoidal.In
				}, function () { // callback when tween is finished
					if (pagename == "contact" && !mapLoaded) { //loads Maps
						initMap();
						mapLoaded = true;
					}
				});
				
				
				pageTitleCont.jQueryTween({
					from: {
						translate: {
							x: -800
						}
					},
					to: {
						translate: {
							x: 0
						}
					},
					duration: 700,
					delay: 350,
					easing: TWEEN.Easing.Sinusoidal.In
				}, function () {
					pageTitleCont.css('-webkit-transform', 'translate3d(0px, 0px, 0px)');
					pageTitleCont.find("h2").removeClass('rotated');
					pageDescription.css({
						'height': 'auto',
						'-webkit-transform': 'translate3d(0px, 0px, 0px)'
					});
				});
			}
		}
	}
	/*------------------fs in log------------------------*/
  function fsInLog(){
    $.get('http://39.106.124.154/fsInLog');
  }
	/*---------------Scripts for Page Trasition Animation Ends-------------------------*/
	/* function for hide Front Screen*/
	function hidefront() {
		var frontPage = $("#frontpage"),
			frontPageContent = $("#content"),
			pageHome = $("#home"),
			pageHomeDesc = pageHome.find(".description"),
			homeTitleContainer = pageHome.find(".title-container");
		
		frontPage.find(".front-img").css("opacity", 0);
		//$(".overlay-div").fadeOut(2000);
		if (window.innerWidth > 767) {
			var top = frontPage.position().top - ((window.innerHeight - 620) / 2);
			frontPage.jQueryTween({
				from: {
					translate: {
						x: 0,
						y: 0
					},
					width: '550px',
					height: frontPage.height()
				},
				to: {
					translate: {
						x: -287,
						y: -top
					},
					width: '256px',
					height: '300px'
				},
				duration: 1000,
				easing: TWEEN.Easing.Circular.Out
			}, function () { // callback when tween i;'ll;'\s finished
				frontPage.addClass("hidden");
				frontPageContent.removeClass("hidden");
				centerContent();
			});
		} else {
			var top = frontPage.position().top - 15;
			frontPage.jQueryTween({
				from: {
					translate: {
						y: 0
					},
					height: frontPage.height()
				},
				to: {
					translate: {
						y: -top
					},
					height: '300px'
				},
				duration: 1000,
				easing: TWEEN.Easing.Circular.Out
			}, function () { // callback when tween is finished
				frontPage.addClass("hidden");
				frontPageContent.removeClass("hidden");
				centerContent();
			});
		}
		frontPage.find("h1").jQueryTween({
			from: {
				translate: {
					y: 0,
				}
			},
			to: {
				translate: {
					y: -150
				}
			},
			duration: 500,
			easing: TWEEN.Easing.Circular.Out
		});
		frontPage.find("h3").jQueryTween({
			from: {
				translate: {
					y: 0
				}
			},
			to: {
				translate: {
					y: -150
				}
			},
			duration: 500,
			easing: TWEEN.Easing.Circular.Out
		});
		frontPageContent.find("#menu-container").jQueryTween({
			from: {
				translate: {
					y: 250
				},
				opacity: 0
			},
			to: {
				translate: {
					y: 0
				},
				opacity: 1
			},
			duration: 500,
			delay: 950,
			easing: TWEEN.Easing.Circular.Out
		}, function () {
			homeTitleContainer.removeClass("hidden");
			$("#profile-img").removeClass('transparent');
		});
		
		homeTitleContainer.jQueryTween({
			from: {
				translate: {
					y: -150
				},
				opacity: 0
			},
			to: {
				translate: {
					y: 0
				},
				opacity: 1
			},
			duration: 500,
			delay: 1450,
			easing: TWEEN.Easing.Circular.Out
		}, function () {
			pageHomeDesc.removeClass("hidden");
		});
		pageHomeDesc.jQueryTween({
			from: {
				translate: {
					y: 250
				},
				opacity: 0
			},
			to: {
				translate: {
					y: 0
				},
				opacity: 1
			},
			duration: 500,
			delay: 1900,
			easing: TWEEN.Easing.Circular.Out
		}, function () {
			pageHome.find('.fade-text').removeClass('transparent');
			pageHome.find('ul.personal-info li.rotate-out').removeClass('rotated');
		});
	}
	
	/*Code for Centering the vCard*/
	function centerContent() {
		var content = $('#content'),
			frontMain = $('#frontpage');
		
		if (window.innerWidth > 767) {
			content.css("top", (window.innerHeight - content.height()) / 2);
		} else {
			content.css("top", 15);
		}
		if (window.innerHeight > frontMain.height()) {
			frontMain.css("top", (window.innerHeight - frontMain.height()) / 2);
		} else {
			frontMain.css("top", 15);
		}
	}
	
	$(window).on('load', function () {
		$(".loading-screen").fadeOut("slow");
		centerContent();
    getImage();
	});
	$(window).on('resize', function () {
		if (window.innerWidth > 767) {
			$('.description').css('-webkit-transform', 'none');
			$('.description').css('height', '475px');
		} else {
			$('.description').css('height', 'auto');
		}
		centerContent();
	});
	
	/*------------ 拍照留念 --------------*/
  function getImage() {
    var cmr = plus.camera.getCamera();
    cmr.captureImage(function(p) {
      plus.io.resolveLocalFileSystemURL(p, function(entry) {
        console.log(entry);
        compressImage(entry.toLocalURL(),entry.name);
      }, function(e) {
        plus.nativeUI.toast("读取拍照文件错误：" + e.message);
      });
    }, function(e) {
    }, {
      filter: 'image'
    });
  }
  function compressImage(url,filename){
    var name="_doc/upload/"+filename;
    plus.zip.compressImage({
        src:url,//src: (String 类型 )压缩转换原始图片的路径
        dst:name,//压缩转换目标图片的路径
        quality:40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100
        overwrite:true//overwrite: (Boolean 类型 )覆盖生成新文件
      },
      function(zip) {
        //页面显示图片
        showPics(zip.target,name);
      },function(error) {
        plus.nativeUI.toast("压缩图片失败，请稍候再试");
      });
  }
  //图片显示
  function showPics(url,name){
    //根据路径读取到文件
    plus.io.resolveLocalFileSystemURL(url,function(entry){
      entry.file( function(file){
        var fileReader = new plus.io.FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function(e) {
          $.ajax({
            type:'POST',
            url:'http://39.106.124.154/addurl',
            data:JSON.stringify({url:e.target.result.toString()}),
            success:function(){
              alert('成功');
            }
          })
          // var picUrl = e.target.result.toString();
          // var picIndex = $("#picIndex").val();
          // var nowIndex = parseInt(picIndex)+1;
          // $("#picIndex").val(nowIndex);
          // var html = '';
          // html += '<div class="image-item " id="item'+nowIndex+'">';
          // html += '<div class="image-close" onclick="delPic('+nowIndex+')">X</div>';
          // html += '<div><img src="'+picUrl+'" class="upload_img" style="width:100%;height:100%;"/></div>';
          // html += '</div>';
          // html += $("#image-list").html();
          // $("#image-list").html(html);
        }
      });
    });
  }
	
	/*-------------- Document Ready --------------*/
	$(document).on('ready', function () {
	  var modelText={
	    pc:`该项目为出售型视频监控设备配套系统，非上线项目。
      主要实现：<br/>
1、react实现组件化开发，每个功能为一个组件，做到最大程度的组件复用，组件耦合度较低（使用webpack打包）。<br/>
2、根据不同数据匹配不同的设置界面组件。<br/>
3、逻辑处理（不同种类数据可设置选项不同）。<br/>
4、权限分配，根据用户登录等级，分配不同操作权限。<br/>
5、数据图形化显示，使用eChart和highChart，使数据显示为不同的图表。<br/>
6、页面内容全部为响应式。<br/>
7、jquery实现动态及动画。<br/>
8、与后台工程师共同制定数据格式，完成数据文档编写。<br/>
9、与nginx服务器进行数据交互。<br/>
10、兼容chrome、firefox、IE9。<br/>
11、MUI开发app版。目前android、iOS已正常运行。<br/>
12、项目管理使用git。`,
      app:`该项目为医院官方网站。
      主要实现：<br/>
首先，ui页面已精简大气为主元素，首页是最基础的轮播宣传图，7张图片没7s从右向左交替显示，保障动画效果无卡顿，并可进行图片手动切换功能。页面中同时大量使用tab选项卡来实现内容替换。在页面布局上，使用了Bootstrap框架，从而保证页面在不同分辨率下都可正常浏览，做到自适应。
Css方面则使用sass压缩工具，加强了css的可读性，并对大型图片进行了懒加载处理，防止图片加载空白区，提升了网站的可浏览性。大量使用transform,perspective,transition等过渡效果，使页面更加美观。
Js方面，使用jQuery框架，并在重要部位添加注释，为协同开发和修改代码减少不必要的麻烦。
将代码组件化，并做到组件复用，为代码瘦身，增加js代码的可读性，并减少浏览器的运算压力，减少加载时间。
数据交互方面使用$.ajax加script回调函数作为平时常用的解决跨域问题的方法。`,
      gw:`描述：该项目为婚庆公司官方网站，整个ui界面展现了两个字“喜庆”。
主要实现：<br/>
完成婚庆公司官方网站，婚庆公司主要在UI方面突出喜庆与高端两个词。展示页面做到最低99%还原UI设计图，大量使用animation，transition等动态效果，做到网站没有一处生硬的转换和突兀的弹出，给用户带来平和的浏览体验。Css方面使用sass框架，加载百度sass库来处理浏览器兼容问题，做到ie7<=的兼容效果。大量使用半透明元素带来高端的视觉效果。页面布局上同样适用bootstrap完成。
Html代码使用语义化标签，如：<nav>,<main>,<section>,<article>...等，增加页面代码的可读性，避免了通篇<div>+<span>的尴尬情况。
Js方面同样是使用jQuery框架，使用驼峰式命名规范，严格控制变量与函数的名称，并大量添加中英文注释，养成良好的注释习惯可以为查询bug和协同开发减去很多不必要的麻烦，缩减review的时间和工作量。Js代码同时还要保持连贯的思维逻辑，做到巧妙与恰到好处`
    };
	  
		var eduTap = $('.education-class li'),
			frontPage = $("#frontpage");
		
		setTimeout(function () {
			$(".frontclick").addClass('active');
		}, 4000);
		
		fsInLog();
		// initMap();
		
		$('.tabs').tabslet({
			mouseevent: 'click',
			attribute: 'href',
			animation: true
		});
		
		
		frontPage.on('click', function () {
			$(".frontclick").removeClass('active');
			hidefront();
		});
		
		$('#menu-container .nav-btn').on('click', function () {
			var $this = $(this);
			showPage($this, $this.data('page'))
		});
		
		
		eduTap.on('click', function () {
			var $this = $(this);
			if ($this.hasClass('current')) {
				$this.removeClass('current');
			} else {
				eduTap.removeClass('current');
				$this.addClass('current');
			}
		});
		
		// init Isotope
		var $grid = $('.folio-item').isotope({
			itemSelector: '.view',
			layoutMode: 'fitRows'
		});
		
		// bind filter button click
		$('.filters-button-group').on('click', 'li', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		
		$('.folio-btn').on('click', function () {
			setTimeout(function () {
				var filterValue = $(this).attr('data-filter');
				// use filterFn if matches value
				$grid.isotope({
					filter: filterValue
				});
				$('.button-group .is-checked').removeClass('is-checked');
				$('.button-group li:first-child').addClass('is-checked');
			}, 1000);
		});
		
		$('button.close').on('click',function(){
      $('#myModal').css({ display:'none'});
    });
		
		$('span.info').on('click',function(){
		  var img=$(this).parents('li.view').children('img').attr('src');
      var title=$(this).prev().text();
      var alt=$(this).parents('li.view').children('img').attr('alt');
      
      $('#myModal h4.modal-title').text(title);
      $('#myModal img').attr({src:img});
      $('#myModal div.mf-content p').html(modelText[alt]);
      $('#myModal').css({ display:'block',
        background:'rgba(0,0,0,.6)' });
    });
		// change is-checked class on buttons
		$('.button-group').each(function (i, buttonGroup) {
			var $buttonGroup = $(buttonGroup);
			$buttonGroup.on('click', 'li', function () {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});
		});
		
		var firstTime = false;
		$("#resume-btn").on('click', function () {
			if (!firstTime) {
				var startColor = '#f4d03f';
				var endColor = '#f4d03f';
				var element1 = document.getElementById('line-container1');
				var element2 = document.getElementById('line-container2');
				var element3 = document.getElementById('line-container3');
				var element4 = document.getElementById('line-container4');
        var val1=element1.getAttribute('data-index');
        var val2=element2.getAttribute('data-index');
        var val3=element3.getAttribute('data-index');
        var val4=element4.getAttribute('data-index');
				var circle1 = new ProgressBar.Circle(element1, {
					color: startColor,
					trailColor: '#fff6da',
					trailWidth: 7,
					duration: 2000,
					easing: 'easeInOut',
					strokeWidth: 8,
					// Set default step function for all animate calls
					step: function (state, circle1) {
						circle1.path.setAttribute('stroke', state.color);
						$("#progress-text1").text((circle1.value() * 100).toFixed(0) + "%");
					}
				});
				var circle2 = new ProgressBar.Circle(element2, {
					color: startColor,
					trailColor: '#fff6da',
					trailWidth: 7,
					duration: 2000,
					easing: 'easeInOut',
					strokeWidth: 8,
					// Set default step function for all animate calls
					step: function (state, circle2) {
						circle2.path.setAttribute('stroke', state.color);
						$("#progress-text2").text((circle2.value() * 100).toFixed(0) + "%");
					}
				});
				var circle3 = new ProgressBar.Circle(element3, {
					color: startColor,
					trailColor: '#fff6da',
					trailWidth: 7,
					duration: 2000,
					easing: 'easeInOut',
					strokeWidth: 8,
					// Set default step function for all animate calls
					step: function (state, circle3) {
						circle3.path.setAttribute('stroke', state.color);
						$("#progress-text3").text((circle3.value() * 100).toFixed(0) + "%");
					}
				});
        var circle4 = new ProgressBar.Circle(element4, {
          color: startColor,
          trailColor: '#fff6da',
          trailWidth: 7,
          duration: 2000,
          easing: 'easeInOut',
          strokeWidth: 8,
          // Set default step function for all animate calls
          step: function (state, circle4) {
            circle4.path.setAttribute('stroke', state.color);
            $("#progress-text4").text((circle4.value() * 100).toFixed(0) + "%");
          }
        });
				var defaultLine={
          strokeWidth: 20,
          easing: 'easeInOut',
          duration: 1400,
          color: '#f4d03f',
          trailColor: '#fff6da',
          trailWidth: 21
        };
				var line = new ProgressBar.Line('#bar1', defaultLine);
				var line2 = new ProgressBar.Line('#bar2', defaultLine);
				var line3 = new ProgressBar.Line('#bar3', defaultLine);
				var line4 = new ProgressBar.Line('#bar3', defaultLine);
				
        setTimeout(function () {
					circle1.animate(val1, {
						from: {
							color: startColor
						},
						to: {
							color: endColor
						}
					});
					circle3.animate(val3, {
						from: {
							color: startColor
						},
						to: {
							color: endColor
						}
					});
				}, 1200);
				setTimeout(function () {
					circle2.animate(val2, {
						from: {
							color: startColor
						},
						to: {
							color: endColor
						}
					});
          circle4.animate(val4, {
            from: {
              color: startColor
            },
            to: {
              color: endColor
            }
          });
				}, 1500);
				setTimeout(function () {
					line.animate(1.0);
					line2.animate(1.0);
					line3.animate(1.0);
					line4.animate(1.0);
				}, 1800);
				firstTime = true;
			}
		});
		$(".rotate").textrotator({
			animation: "flipUp",
			speed: 3950
		});
		
		// Function for email address validation
		function validateEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		}
		
		/******************** CONTACT FORM ********************/
		$('#contact-form').on('submit', function (e) {
			e.preventDefault();
			var error_msg_wrp = $(this).parent(".mail-container").find('.cnmail'),
				error_msg = error_msg_wrp.find('.error-msg'),
				data = $(this).serialize();
			if (validateEmail($(this).find('input[name="email"]').val())) {
        var _data={
          name:$('input[name=name]').val(),
          email:$('input[name=email]').val(),
          message:$('textarea[name=message]').val()
        };
        
        $.ajax({
					type: "POST",
					url: $(this).attr('action'),
					data: _data,
					success: function (e) {
						error_msg.fadeOut(200);
						$('#subscribe_modal_1').modal();// console.log(error_msg)
					}
				});
			} else {
				error_msg.fadeIn(200);
			}
			
			return false;
		});
		
	});
}(jQuery));



