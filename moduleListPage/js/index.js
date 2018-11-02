var Index = function () {
	var that = this;
	//各组件参数
	that.$container = $("#container");
	that.navTreeJson = [
		{
			id:1, menuNam:'navTree组件', hasIcon:false, iconClassName:'fa fa-gittip', hasAngle:true,
			 info: `./images/navTree.png`,
			 text: `
				 var JSON = [
					  {
					    id:'1',
					    menuNam:'中国',
					    url:'',
					    hasIcon:false,
					    iconClassName:'fa fa-gittip',
					    hasAngle:true,
					    children:[
					      {
					        id:'1-1',
					        menuNam:'河北',
					        url:'',
					        hasIcon:true,
					        iconClassName:'fa fa-github-alt',
					        hasAngle:true,
					        children:[
					          {
					            id:'1-1-1',
					            menuNam:'涿州',
					            url:'',
					            hasIcon:true,
					            iconClassName:'fa fa-first-order',
					            hasAngle:false,
					            onclick:function(id){
					              console.log(id);
					            }
					          }
					        ]
					      },
					      {
					        id:'1-2',
					        menuNam:'上海',
					        url:'',
					        hasIcon:true,
					        iconClassName:'fa fa-github-alt',
					        hasAngle:true,
					        onclick:function(id){
					          console.log(id);
					        }
					      }
					    ]
					  },
					  {
					    id:'2',
					    menuNam:'美国',
					    url:'',
					    hasIcon:true,
					    iconClassName:'fa fa-gittip',
					    hasAngle:false,
					    children:[
					      {
					        id:'2-1',
					        menuNam:'加利福利亚',
					        url:'',
					        hasIcon:true,
					        iconClassName:'fa fa-github-alt',
					        hasAngle:true,
					        children:[
					          {
					            id:'2-1-1',
					            menuNam:'谁知道呀',
					            url:'',
					            hasIcon:true,
					            iconClassName:'fa fa-first-order',
					            hasAngle:false,
					            onclick:function(id){
					              console.log(id);
					            }
					          }
					        ]
					      },
					      {
					        id:'2-2',
					        menuNam:'加利福利亚-隔壁',
					        url:'',
					        hasIcon:true,
					        iconClassName:'fa fa-github-alt',
					        hasAngle:true,
					        onclick:function(id){
					          console.log(id);
					        }
					      }
					    ]
					  },
					  {
					    id:'3',
					    menuNam:'我家',
					    url:'',
					    hasIcon:true,
					    iconClassName:'fa fa-gittip',
					    hasAngle:false,
					    onclick:function(idx){
				    		console.log(idx);
				        }
					  },
					  {
					    id:'4',
					    menuNam:'我家',
					    url:'',
					    hasIcon:true,
					    iconClassName:'fa fa-gittip',
					    hasAngle:false,
					    onclick:function(idx){
				    		console.log(idx);
				        }
					  },
					  {
					    id:'5',
					    menuNam:'你家',
					    url:'',
					    hasIcon:true,
					    iconClassName:'fa fa-gittip',
					    hasAngle:false,
					    onclick:function(idx){
				    		console.log(idx);
				        }
					  }
					];
					var NavTree = new NavTree();

					NavTree.init($('#navTree'),true,'active',true);
					NavTree.setData(JSON);
			`,
			 onclick:function(id){
				that.htmlModule(id, this, that);
			} 
		},
		{
			id:2, menuNam:'editBar组件', hasIcon:false, iconClassName:'fa fa-gittip', hasAngle:true,
			 info: `./images/editBar.png`,
			 text: `
			    var $div = document.getElementById('T-component');

			    (new EditBar()).init($div,'','高英豪','',[{
			        styleOrClass:'fa fa-remove',
			        onclick:function(idx){
			            alert('按钮编号：'+ idx);
			        }
			    },{
			        styleOrClass:'fa fa-remove',
			        onclick:function(idx){
			            alert('按钮编号：'+ idx);
			        }
			    }]);

			 `,
			 onclick:function(id){
				that.htmlModule(id, this, that);
			}
		},
		{
			id:3, menuNam:'mapView组件', hasIcon:false, iconClassName:'fa fa-gittip', hasAngle:true,
			 info: `./images/mapView.png`,
			 text: `
				var deAppearances = {
				// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
				dvAppearances : [{
			            name: "listItem",
			            styleOrClass: "list-item",
			            labelStyleOrClass: "label",
			        }, {
			            name: "itemEdit",
			            styleOrClass: "list-item",
			            labelStyleOrClass: "label",
			            valueAppearance: {
			                tagName: "input",
			                propOrAttr: {
			                    type: "text"
			                },
			                bind: "value"
			            }
			        }],
					// EditBar组件外观，数组中的每个对象结构请参考DetailEdit组件构造函数。
					ebAppearances : [
						{
				            styleOrClass: "title-bar",
				            highlight: "fa fa-pencil",
				            title: "编辑模式",
				            btnStyleOrClasses: ["fa fa-save", "fa fa-remove"]
				        }, {
				            styleOrClass: "title-bar",
				            title: "查看模式",
				            btnStyleOrClasses: ["fa fa-edit", "fa fa-trash"]
				        }
			        ],
					// 编辑内容的适配参数。
					adapters : {
						// 内部组件绑定参数，请参考DetailEdit::Attach方法的binders参数。
						binders : [{
			            editBarIdx: 0,
			            dataFilters: [{
			                propName: "name",
			                label: "姓名",
			                appearance: "itemEdit",
			                injectable: true
			            }, {
			                propName: "age",
			                label: "年龄",
			                appearance: "itemEdit",
			                injectable: true
			            }]
			        }, {
			            editBarIdx: 1,
			            dataFilters: [{
			                propName: "name",
			                label: "姓名",
			                appearance: "listItem"
			            }, {
			                propName: "age",
			                label: "年龄",
			                appearance: "listItem"
			            }]
			        }],
						// 需要被提交的数据原型名称，后台协议层模块使用。
						modelName : 'mapView'
					}
				},
					epAppearances = {
						// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
						dvAppearances : [{
				            name: "listItem",
				            styleOrClass: "list-item",
				            labelStyleOrClass: "label",
				        }, {
				            name: "itemEdit",
				            styleOrClass: "list-item",
				            labelStyleOrClass: "label",
				            valueAppearance: {
				                tagName: "input",
				                propOrAttr: {
				                    type: "text"
				                },
				                bind: "value"
				            }
				        }],
						// 按钮外观。
						btnAppearances : [{
					        styleOrClass: 'mv-btn mv-btn-plus',
					        text: '添加'
					    }]

				};

				var mapView = new MapView(deAppearances, epAppearances);

				mapView.attach('mapView','./module/mapView组件/images/background.jpg');
				mapView.refresh([
						{ name:'重庆', icon:'./module/mapView组件/images/icon.png', pos:[370,70] },
						{ name:'北京', icon:'./module/mapView组件/images/icon.png', pos:[300,300] },
						{ name:'加州', icon:'./module/mapView组件/images/icon.png', pos:[500,200] },
						{ name:'上海', icon:'./module/mapView组件/images/icon.png', pos:[600,300] },
						{ name:'我家', icon:'./module/mapView组件/images/icon.png', pos:[700,260] }
					]);
				mapView.onAdd = function(modelName,dataObj){
					console.log('onAdd',modelName,dataObj);
				}
				mapView.onMod = function(modelName,dataObj){
					console.log('onMol',modelName,dataObj);
				}
				mapView.onDel = function(modelName,dataObj){
					console.log('onDel',modelName,dataObj);
				}
			 `,
			 onclick:function(id){
				that.htmlModule(id, this, that);
			}
		},
		{
			id:4, menuNam:'orgTree组件', hasIcon:false, iconClassName:'fa fa-gittip', hasAngle:true,
			 info: `./images/orgTree.png`,
			 text: `
			var orgTreeJSON = {
			// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
			dvAppearances:[
			{
		            name: "listItem",
		            styleOrClass: "list-item",
		            labelStyleOrClass: "label",
		        }, {
		            name: "itemEdit",
		            styleOrClass: "list-item",
		            labelStyleOrClass: "label",
		            valueAppearance: {
		                tagName: "input",
		                propOrAttr: {
		                    type: "text"
		                },
		                bind: "value"
		            }
		        }
		        ],
				// EditBar组件外观，数组中的每个对象结构请参考DetailEdit组件构造函数。
				ebAppearances:[
					{
			            styleOrClass: "title-bar",
			            highlight: "fa fa-pencil",
			            title: "编辑模式",
			            btnStyleOrClasses: ["fa fa-save", "fa fa-remove"]
			        }, {
			            styleOrClass: "title-bar",
			            title: "查看模式",
			            btnStyleOrClasses: ["fa fa-edit", "fa fa-trash"]
			        }
		        ],
		        // 编辑内容的适配参数。
				adapters: {
					// 内部组件绑定参数，请参考DetailEdit::Attach方法的binders参数。
			        binders:[
			        	{
				            editBarIdx: 0,
				            dataFilters: [{
				                propName: "name",
				                label: "姓名",
				                appearance: "itemEdit",
				                injectable: true
				            }, {
				                propName: "age",
				                label: "年龄",
				                appearance: "itemEdit",
				                injectable: true
				            }]
				        }, 
				        {
				            editBarIdx: 1,
				            dataFilters: [{
				                propName: "name",
				                label: "姓名",
				                appearance: "listItem"
				            }, {
				                propName: "age",
				                label: "年龄",
				                appearance: "listItem"
				            }]
				        }
			        ],
			        // 需要被提交的数据对象，请参考DetailEdit::Attach方法的dataObj参数。
			        dataObj: {},
			        // 需要被提交的数据原型名称，后台协议层模块使用。
			        modelName: 'modelName'
			    }
			}

			var orgTree = new OrgTree(orgTreeJSON);

			orgTree.attach('orgTree');
			orgTree.refresh([
					{ id:'1', leaderChain:'/', name:'gao', age:18 },
					{ id:'2', leaderChain:'/1', name:'ying', age:17 },
					{ id:'3', leaderChain:'/1', name:'hao', age:16 },
					{ id:'4', leaderChain:'/1', name:'张三', age:19 },
					{ id:'5', leaderChain:'/1/2', name:'李四', age:20 },
					{ id:'6', leaderChain:'/1/2', name:'王五', age:23 }
				]);
			orgTree.onAdd = function(modelName,dataObj){
				console.log('onAdd',modelName,dataObj);
			}
			orgTree.onMod = function(modelName,dataObj){
				console.log('onMol',modelName,dataObj);
			}
			orgTree.onDel = function(modelName,dataObj){
				console.log('onDel',modelName,dataObj);
			}
			 `,
			 onclick:function(id){
				that.htmlModule(id, this, that);
			}
		},
		{
			id:5, menuNam:'pageBar组件', hasIcon:false, iconClassName:'fa fa-gittip', hasAngle:true,
			 info: `./images/pageBar.png`,
			 text: `
				(new PageBar()).init($('#PageBarDiv'),{
					prePage:true, preGroup:true, nextPage:true, nextGroup:true,
					lastPage:true, firstPage:true
				},48,10,function(idx){
					
				});
			 `,
			 onclick:function(id){
				that.htmlModule(id, this, that);
			}
		},
		{
			id: 6,
			menuNam: 'componet组件',
			hasIcon: false,
			iconClassName: 'fa fa-gittip',
			hasAngle: true,
			info: `./images/componet.png`,
			text: `var hContent = document.getElementById('content');

				var tpl1 = {
					span: {
						"$textContent": {
							"_": "span",
							"%": "data[*].age"
						}
					},
					"$className": {
						"_": "td"
					}
				};
				var tpl = {
					table: {
						thead: {
							tr: {
								td: [
									{
										"$textContent": {
											"_": "th",
											"%": "th[*].name"
										},
										"$className": {
											"_": "td"
										}
									}
								],
								"$td": "th"
							}
						},
						tbody: {
							tr: [
								{
									td: [
										{
											input: {
												"$value": {
													"_": "input",
													"%": "data[*].age",
													">>": function (val,tplArgs,i) {
														componet.refresh( 'data.'+i+'.age', val );
													}
												},
												"$name": {
													"_": "age"
												},
												"$type": {
													"_": "text"
												},
												":data-0": {
													"_": "4",
													"%": "data[*].age"
												}
											},
											"$className": {
												"_": "td"
											},
											":data-target": {
												"_": "年龄"
											},
											"#text": tpl1
										},
										{
											span: {
												"$textContent": {
													"_": "span",
													"%": "data[*].age",
													"<<": function (tplArgs,i) {
														console.log(tplArgs,i)
													}
												}
											},
											"$className": {
												"_": "td"
											}
										},
										{
											span: {
												"$textContent": {
													"_": "span",
													"%": "data[*].name"
												}
											},
											"$className": {
												"_": "td"
											}
										},
										{
											button: {
												"$textContent": {
													"_": "button",
													"%": "data[*].button"
												},
												"@click": {
													"_": function ( ele, i ) {
														console.log( this, ele, i );
													},
													"%": "data[*].buttonFun"
												}
											},
											"$className": {
												"_": "td"
											}
										},
										{
											"$textContent": {
												"_": "静态"
											},
											"$className": {
												"_": "td"
											}
										}
									]
								}
							],
							"$tr": "data"
						}
					},
					div: {
						"$textContent": {
							"_": "ceshi",
							"$": "a.a"
						}
					}
				};
				var dataObj = {
					th: [
						{ name: '输入年龄' }, { name: '姓名' }, { name: '年龄' }, { name: '按钮' }, { name: '静态' }
					],
					a: { a: 'ceshi' },
					data: [
						{
							name: '高英豪',
							age: 18,
							button: '变年轻',
							buttonFun: function ( ele, i ) {
								this.parentNode.parentNode.children[1].style.background = 'green';
								componet.refresh( 'data.'+i+'.age', 10 );
							},
							a: "a"
						},
						{
							name: '高山',
							age: 15,
							button: '解释',
							buttonFun: function ( ele, i ) {
								console.log(ele, i)
							}
						}
					]
				};
				var componet = new Componet(tpl);

				componet.attach(dataObj, hContent);`,
			onclick:function(id){
				that.htmlModule(id, this, that);
			}
		}
	];
	that.mapViewJson = {
		deAppearances:{
			// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
			dvAppearances : [{
	            name: "listItem",
	            styleOrClass: "list-item",
	            labelStyleOrClass: "label",
	        }, {
	            name: "itemEdit",
	            styleOrClass: "list-item",
	            labelStyleOrClass: "label",
	            valueAppearance: {
	                tagName: "input",
	                propOrAttr: {
	                    type: "text"
	                },
	                bind: "value"
	            }
	        }],
			// EditBar组件外观，数组中的每个对象结构请参考DetailEdit组件构造函数。
			ebAppearances : [
				{
		            styleOrClass: "title-bar",
		            highlight: "fa fa-pencil",
		            title: "编辑模式",
		            btnStyleOrClasses: ["fa fa-save", "fa fa-remove"]
		        }, {
		            styleOrClass: "title-bar",
		            title: "查看模式",
		            btnStyleOrClasses: ["fa fa-edit", "fa fa-trash"]
		        }
	        ],
			// 编辑内容的适配参数。
			adapters : {
				// 内部组件绑定参数，请参考DetailEdit::Attach方法的binders参数。
				binders : [{
	            editBarIdx: 0,
	            dataFilters: [{
	                propName: "name",
	                label: "姓名",
	                appearance: "itemEdit",
	                injectable: true
	            }, {
	                propName: "age",
	                label: "年龄",
	                appearance: "itemEdit",
	                injectable: true
	            }]
	        }, {
	            editBarIdx: 1,
	            dataFilters: [{
	                propName: "name",
	                label: "姓名",
	                appearance: "listItem"
	            }, {
	                propName: "age",
	                label: "年龄",
	                appearance: "listItem"
	            }]
	        }],
				// 需要被提交的数据原型名称，后台协议层模块使用。
				modelName : 'mapView'
			}
		},
		epAppearances:{
			// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
			dvAppearances : [{
	            name: "listItem",
	            styleOrClass: "list-item",
	            labelStyleOrClass: "label",
	        }, {
	            name: "itemEdit",
	            styleOrClass: "list-item",
	            labelStyleOrClass: "label",
	            valueAppearance: {
	                tagName: "input",
	                propOrAttr: {
	                    type: "text"
	                },
	                bind: "value"
	            }
	        }],
			// 按钮外观。
			btnAppearances : [{
		        styleOrClass: 'mv-btn mv-btn-plus',
		        text: '添加'
		    }]
		}
	};
	that.orgTreeJson = {
		// DetailView组件外观，参数对象结构请参考DetailView组件构造函数。
		dvAppearances:[
		{
            name: "listItem",
            styleOrClass: "list-item",
            labelStyleOrClass: "label",
        }, {
            name: "itemEdit",
            styleOrClass: "list-item",
            labelStyleOrClass: "label",
            valueAppearance: {
                tagName: "input",
                propOrAttr: {
                    type: "text"
                },
                bind: "value"
            }
        }
        ],
		// EditBar组件外观，数组中的每个对象结构请参考DetailEdit组件构造函数。
		ebAppearances:[
			{
	            styleOrClass: "title-bar",
	            highlight: "fa fa-pencil",
	            title: "编辑模式",
	            btnStyleOrClasses: ["fa fa-save", "fa fa-remove"]
	        }, {
	            styleOrClass: "title-bar",
	            title: "查看模式",
	            btnStyleOrClasses: ["fa fa-edit", "fa fa-trash"]
	        }
        ],
        // 编辑内容的适配参数。
		adapters: {
			// 内部组件绑定参数，请参考DetailEdit::Attach方法的binders参数。
	        binders:[
	        	{
		            editBarIdx: 0,
		            dataFilters: [{
		                propName: "name",
		                label: "姓名",
		                appearance: "itemEdit",
		                injectable: true
		            }, {
		                propName: "age",
		                label: "年龄",
		                appearance: "itemEdit",
		                injectable: true
		            }]
		        }, 
		        {
		            editBarIdx: 1,
		            dataFilters: [{
		                propName: "name",
		                label: "姓名",
		                appearance: "listItem"
		            }, {
		                propName: "age",
		                label: "年龄",
		                appearance: "listItem"
		            }]
		        }
	        ],
	        // 需要被提交的数据对象，请参考DetailEdit::Attach方法的dataObj参数。
	        dataObj: {},
	        // 需要被提交的数据原型名称，后台协议层模块使用。
	        modelName: 'modelName'
	    }
	};
};

Index.prototype.init = function () {
	var that = this;

	that.bindObj(that.$container.find('.T-navTree'), function($obj){
		var navTree = new NavTree();
		$obj.css('height',$(window).height());
		navTree.init($obj, true, 'active', true);
		navTree.setData(that.navTreeJson);
	})
};

/*******************************************方法*****************************************************/
Index.prototype.bindObj = function (classObj, fn) {
	if(typeof classObj == 'object'){
		$.each(classObj,function(key,item){
			fn($(item));
		})
	}
};

/*******************************************插入内容*****************************************************/
Index.prototype.htmlModule = function (id, _this, that) {
	var $scope = $('<div></div>');

	that.$container.find('.moduleShow').remove();
	that.$container.find('.moduleContant').removeClass('hidden');
	that.$container.find('.moduleContant .module_title').html(_this.menuNam);
	that.$container.find('.moduleContant .module_info').html('<img src="'+ _this.info +'" alt="需求展示"/>');
	that.$container.find('.moduleContant .module_text').html(_this.text);
	that.$container.find('.moduleContant .module_show').html($scope);

	switch(id){
		case 1:
			that.navTree($scope);
			break;
		case 2:
			that.editBar($scope);
			break;
		case 3:
			that.mapView($scope);
			break;
		case 4:
			that.orgTree($scope);
			break;
		case 5:
			that.pageBar($scope);
			break;
		case 6:
			that.componet($scope);
			break;
		default:
			break;
	}
};

/*******************************************模块*****************************************************/
Index.prototype.navTree = function ($scope) {
	var that = this;
	var JSON = [
	  {
	    id:'1',
	    menuNam:'中国',
	    url:'',
	    hasIcon:false,
	    iconClassName:'fa fa-gittip',
	    hasAngle:true,
	    children:[
	      {
	        id:'1-1',
	        menuNam:'河北',
	        url:'',
	        hasIcon:true,
	        iconClassName:'fa fa-github-alt',
	        hasAngle:true,
	        children:[
	          {
	            id:'1-1-1',
	            menuNam:'涿州',
	            url:'',
	            hasIcon:true,
	            iconClassName:'fa fa-first-order',
	            hasAngle:false,
	            onclick:function(id){
	              console.log(id);
	            }
	          }
	        ]
	      },
	      {
	        id:'1-2',
	        menuNam:'上海',
	        url:'',
	        hasIcon:true,
	        iconClassName:'fa fa-github-alt',
	        hasAngle:true,
	        onclick:function(id){
	          console.log(id);
	        }
	      }
	    ]
	  },
	  {
	    id:'2',
	    menuNam:'美国',
	    url:'',
	    hasIcon:true,
	    iconClassName:'fa fa-gittip',
	    hasAngle:false,
	    children:[
	      {
	        id:'2-1',
	        menuNam:'加利福利亚',
	        url:'',
	        hasIcon:true,
	        iconClassName:'fa fa-github-alt',
	        hasAngle:true,
	        children:[
	          {
	            id:'2-1-1',
	            menuNam:'谁知道呀',
	            url:'',
	            hasIcon:true,
	            iconClassName:'fa fa-first-order',
	            hasAngle:false,
	            onclick:function(id){
	              console.log(id);
	            }
	          }
	        ]
	      },
	      {
	        id:'2-2',
	        menuNam:'加利福利亚-隔壁',
	        url:'',
	        hasIcon:true,
	        iconClassName:'fa fa-github-alt',
	        hasAngle:true,
	        onclick:function(id){
	          console.log(id);
	        }
	      }
	    ]
	  },
	  {
	    id:'3',
	    menuNam:'我家',
	    url:'',
	    hasIcon:true,
	    iconClassName:'fa fa-gittip',
	    hasAngle:false,
	    onclick:function(idx){
    		console.log(idx);
        }
	  },
	  {
	    id:'4',
	    menuNam:'我家',
	    url:'',
	    hasIcon:true,
	    iconClassName:'fa fa-gittip',
	    hasAngle:false,
	    onclick:function(idx){
    		console.log(idx);
        }
	  },
	  {
	    id:'5',
	    menuNam:'你家',
	    url:'',
	    hasIcon:true,
	    iconClassName:'fa fa-gittip',
	    hasAngle:false,
	    onclick:function(idx){
    		console.log(idx);
        }
	  }
	];

	that.bindObj($scope, function($obj){
		var navTree = new NavTree();
		navTree.init($obj, true);
		navTree.setData(JSON);
	});
};
Index.prototype.editBar = function ($scope) {
	var that = this,
		$div = $('<div class="editBarClass"></div>');
	$scope.html($div);
	that.bindObj($div, function($obj){
		(new EditBar()).render($div,'高英豪','',[{
	        styleOrClass:'fa fa-remove',
	        onclick:function(idx){
	            alert('按钮编号：'+ idx);
	        }
	    },{
	        styleOrClass:'fa fa-remove',
	        onclick:function(idx){
	            alert('按钮编号：'+ idx);
	        }
	    }]);
	});
};
Index.prototype.mapView = function ($scope) {
	var that = this;
	that.bindObj($scope, function($obj){
		var mapView = new MapView(that.mapViewJson.deAppearances, that.mapViewJson.epAppearances);
		$obj.css({
		    width: "1000px",
		    height: "500px",
		    position: "relative",
		});
		mapView.attach($obj,'./images/background.jpg');
		mapView.refresh([
				{ name:'重庆', icon:'./images/icon.png', pos:[370,70] },
				{ name:'北京', icon:'./images/icon.png', pos:[300,300] },
				{ name:'加州', icon:'./images/icon.png', pos:[500,200] },
				{ name:'上海', icon:'./images/icon.png', pos:[600,300] },
				{ name:'我家', icon:'./images/icon.png', pos:[700,260] }
			]);
		mapView.onAdd = function(modelName,dataObj){
			console.log('onAdd',modelName,dataObj);
		}
		mapView.onMod = function(modelName,dataObj){
			console.log('onMol',modelName,dataObj);
		}
		mapView.onDel = function(modelName,dataObj){
			console.log('onDel',modelName,dataObj);
		}
	});
};
Index.prototype.orgTree = function ($scope) {
	var that = this;
	that.bindObj($scope, function($obj){
		var orgTree = new OrgTree(that.orgTreeJson);

		orgTree.attach($obj);
		orgTree.refresh([
				{ id:'1', leaderChain:'/', name:'gao', age:18 },
				{ id:'2', leaderChain:'/1', name:'ying', age:17 },
				{ id:'3', leaderChain:'/1', name:'hao', age:16 },
				{ id:'4', leaderChain:'/1', name:'张三', age:19 },
				{ id:'5', leaderChain:'/1/2', name:'李四', age:20 },
				{ id:'6', leaderChain:'/1/2', name:'王五', age:23 }
			]);
		orgTree.onAdd = function(modelName,dataObj){
			console.log('onAdd',modelName,dataObj);
		}
		orgTree.onMod = function(modelName,dataObj){
			console.log('onMol',modelName,dataObj);
		}
		orgTree.onDel = function(modelName,dataObj){
			console.log('onDel',modelName,dataObj);
		}
	});
};
Index.prototype.pageBar = function ($scope) {
	var that = this;
	that.bindObj($scope, function($obj){
		(new PageBar()).init($obj,{
			prePage:true, preGroup:true, nextPage:true, nextGroup:true,
			lastPage:true, firstPage:true
		},48,10,function(idx){
			
		});
	});
};
Index.prototype.componet = function ($scope) {
	var that = this;
	that.bindObj($scope, function($obj){
		var tpl1 = {
			span: {
				"$textContent": {
					"_": "span",
					"%": "data[*].age"
				}
			},
			"$className": {
				"_": "td"
			}
		};
		var tpl = {
			table: {
				thead: {
					tr: {
						td: [
							{
								"$textContent": {
									"_": "th",
									"%": "th[*].name"
								},
								"$className": {
									"_": "td"
								}
							}
						],
						"$td": "th"
					}
				},
				tbody: {
					tr: [
						{
							td: [
								{
									input: {
										"$value": {
											"_": "input",
											"%": "data[*].age",
											">>": function (val,tplArgs,i) {
												componet.refresh( 'data.'+i+'.age', val );
											}
										},
										"$name": {
											"_": "age"
										},
										"$type": {
											"_": "text"
										},
										":data-0": {
											"_": "4",
											"%": "data[*].age"
										}
									},
									"$className": {
										"_": "td"
									},
									":data-target": {
										"_": "年龄"
									},
									"#text": tpl1
								},
								{
									span: {
										"$textContent": {
											"_": "span",
											"%": "data[*].age",
											"<<": function (tplArgs,i) {
												console.log(tplArgs,i)
											}
										}
									},
									"$className": {
										"_": "td"
									}
								},
								{
									span: {
										"$textContent": {
											"_": "span",
											"%": "data[*].name"
										}
									},
									"$className": {
										"_": "td"
									}
								},
								{
									button: {
										"$textContent": {
											"_": "button",
											"%": "data[*].button"
										},
										"@click": {
											"_": function ( ele, i ) {
												console.log( this, ele, i );
											},
											"%": "data[*].buttonFun"
										}
									},
									"$className": {
										"_": "td"
									}
								},
								{
									"$textContent": {
										"_": "静态"
									},
									"$className": {
										"_": "td"
									}
								}
							]
						}
					],
					"$tr": "data"
				}
			},
			div: {
				"$textContent": {
					"_": "ceshi",
					"$": "a.a"
				}
			}
		};
		var dataObj = {
			th: [
				{ name: '输入年龄' }, { name: '姓名' }, { name: '年龄' }, { name: '按钮' }, { name: '静态' }
			],
			a: { a: 'ceshi' },
			data: [
				{
					name: '高英豪',
					age: 18,
					button: '变年轻',
					buttonFun: function ( ele, i ) {
						this.parentNode.parentNode.children[1].style.background = 'green';
						componet.refresh( 'data.'+i+'.age', 10 );
					},
					a: "a"
				},
				{
					name: '高山',
					age: 15,
					button: '解释',
					buttonFun: function ( ele, i ) {
						console.log(ele, i)
					}
				}
			]
		};
		var componet = new Componet(tpl);
		console.log($obj)
		componet.attach(dataObj, $obj[0]);
	});
};


var index = new Index();
index.init();