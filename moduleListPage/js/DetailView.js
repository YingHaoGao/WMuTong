if (window.DetailView == null) {
    window.DetailView = function(appearances) {
        if (appearances == null) {
            appearances = [{
                // 外观名称，用于获取该外观。
                name: "DisplayView",
                // 整体样式，根据参数是否为style格式（包含':'或';'字符）自动判断是style还是class。
                styleOrClass: "list-item",
                // 可选，标签区域样式，如果不包含标签区域，可以为空（undefined||null||""）。
                labelStyleOrClass: "label",
                // 内容区域外观。
                valueAppearance: {
                    // 内容区域样式
                    styleOrClass: "margin-left: 200px;",
                    // 可选，输入数据绑定的DOM-property或DOM-attribute（加前缀'@'），默认为"textContent"。
                    bind: "textContent",
                    // 可选，内容区域的标签，默认为"span"。
                    tagName: "span",
                    // 可选，如果指定了tagName参数，则可以通过该参数设置标签属性，例如：
                    // {
                    //      'id': "xxxx",                   // 设置DOM-property
                    //      '@id': "xxxx",                  // 设置DOM-attribute
                    //      'onclick': function () {...},   // 通过DOM-property设置事件回调
                    // }
                    propOrAttr: {
                        "@class": "aa",
                        "onclick": function() {
                            alert(1);
                        }
                    }
                }
            }];
        }
        this._appearances = {};
        for (var i = 0; i < appearances.length; ++i)
            this._appearances[ appearances[i].name ] = appearances[i];
        this.defaultAppearance = appearances[0].name;
    };

    window.DetailView.prototype = {

        RENDEREDATTR: "detail-view-rendered",

        BOUNDPROP: "bound-prop",

        /**
         *
         * 数据渲染方法，无返回值。若重复调用此函数，则重新渲染整个区域
         *
         * @param dataObj {Object} 需要被渲染的输入数据。
         * @param filters {Array} 数据过滤器，数组中的每个对象结构如下：
         * {
            propName: String,           // 需要被渲染的输入数据property名称，可以是某个下级子对象的property名称（即"xxx.yyy"）。
            appearance: String,         // 外观名称。
            label: String,              // 可选，标签内容。
            display: String,            // 可选，渲染出的DOM-ELmenent的style.display属性。
            injectable: Boolean,        // 可选，当propName指定的property名称在dataObj中不存在时，如果该参数为true，会自动向dataObj中
                                        //      注入propName指定的property（值为""）；如果为false，则忽略并继续渲染其它数据。默认为false。
            format: String/function(    // 可选，对输入数据进行格式化的回调函数，如果为String类型，则依赖于实现提供的内置格式化函数。
                dataObj,                    // 需要被格式化的数据。
                propName                    // 需要被格式化的数据property名称。
            ) {...},
            deformat: function(         // 可选，从内容区域提取内容的函数，缺省时，取domVal.textContent。
                domVal                      // 内容区域的DOM-Element。
            ) {...}
           }
         * @param container {String/DOM Element}
         *
        **/
        render: function(container, filters, dataObj) {
            if (filters == null) {
                filters = [];
                for (var k in dataObj) {
                    filters.push({
                        propName: k,
                        appearance: this.defaultAppearance,
                    });
                }
            }

            container = TemplatedForm.getDomElement(container);
            container.innerHTML = "";
            for(var i = 0; i < filters.length; i++) {
                container.appendChild(
                    this._buildDOMString(filters[i], dataObj)
                );
            }
            container.setAttribute(this.RENDEREDATTR, "true");
        },

        /**
         *
         * 构建DOMElement, 返回DOMElement.
         * @param data {Object} 数据对象
         * @param filter {Object} 外观对象。
         * @return {DOMElement}
         *
        **/
        _buildDOMString: function(filter, dataObj) {
            var appearance = this._appearances[filter.appearance];
            var itemElement = document.createElement("div");
            if (appearance.styleOrClass) {
                TemplatedForm.setStyleOrClass(
                    itemElement, appearance.styleOrClass
                );
            }
            if (filter.display)
                itemElement.style.display = filter.display;

            // 构建label元素
            if (filter.label) {
                var labelElement = document.createElement("span");
                if (appearance.labelStyleOrClass) {
                    TemplatedForm.setStyleOrClass(
                        labelElement, appearance.labelStyleOrClass
                    );
                }

                if (labelElement.textContent == null)
                    labelElement.innerText = filter.label;
                else
                    labelElement.textContent = filter.label;

                itemElement.appendChild(labelElement);
            }

            // 构建数据元素
            if (appearance.valueAppearance == null)
                appearance.valueAppearance = {};
            if (appearance.valueAppearance.tagName == null)
                appearance.valueAppearance.tagName = "span";
            var dataElement = document.createElement(
                appearance.valueAppearance.tagName
            );
            if (appearance.valueAppearance.styleOrClass) {
                TemplatedForm.setStyleOrClass(
                    dataElement, appearance.valueAppearance.styleOrClass
                );
            }

            if (appearance.valueAppearance.propOrAttr) {
                for (var p in appearance.valueAppearance.propOrAttr) {
                    var propValue = appearance.valueAppearance.propOrAttr[p];
                    if (propValue.call) {
                        // TemplatedForm.addEvent(dataElement, p, propValue);
                        dataElement[p] = propValue;
                    } else {
                        TemplatedForm.refPropOrAttr(dataElement, p, propValue);
                    }
                }
            }

            var dataValue = TemplatedForm.refProp(dataObj, filter.propName);
            if (dataValue == null) {
                if (filter.injectable)
                    TemplatedForm.refProp(dataObj, filter.propName, "");
                dataValue = "";
            }

            if (filter.format) {
                if (filter.format.call)
                    dataValue = filter.format(dataObj, filter.propName);
                else
                    console.error("不支持指定的format");
            }

            if (appearance.valueAppearance.bind == null) {
                if (dataElement.textContent == null)
                    appearance.valueAppearance.bind = "innerText";
                else
                    appearance.valueAppearance.bind = "textContent";
            }
            TemplatedForm.refPropOrAttr(
                dataElement, appearance.valueAppearance.bind, dataValue
            );

            if (dataElement.disabled != null)
                dataElement.disabled = (filter.uneditable && dataValue);

            if (filter.deformat)
                dataElement.deformat = filter.deformat;

            dataElement.setAttribute(
                this.BOUNDPROP,
                filter.propName + ':' + appearance.valueAppearance.bind
            );

            itemElement.appendChild(dataElement);
            return itemElement;
        },

        _outData: {},
        _loopBoundProp: function(element, befSetProp) {
            if (element.childNodes) {
                for (var i = 0; i < element.childNodes.length; ++i) {
                    var childElement = element.childNodes[i];
                    if ( childElement.hasAttribute &&
                        childElement.hasAttribute(this.BOUNDPROP) )
                    {
                        var boundPair = childElement.getAttribute(
                            this.BOUNDPROP
                        ).split(':');
                        if ( befSetProp(boundPair[0]) ) {
                            if (childElement.deformat) {
                                boundPair[1] = childElement.deformat(
                                    childElement
                                );
                            } else {
                                boundPair[1] = TemplatedForm.refPropOrAttr(
                                    childElement, boundPair[1]
                                );
                            }

                            TemplatedForm.refProp(
                                this._outData, boundPair[0], boundPair[1]
                            );
                        }
                    } else {
                        this._loopBoundProp(childElement, befSetProp);
                    }
                }
            }
        },

        /**
         *
         * 提取container中的下级DOM-ELmenent的某个属性值，并以Object类型返回
         * @param container {String/DOM Element} 提取的目标容器，可以是id或DOM-Element对象。
         * @return {Object}
         *
        **/
        extract: function(container, propNames) {
            container = TemplatedForm.getDomElement(container);

            if (!container.hasAttribute(this.RENDEREDATTR)) {
                console.error("容器还未绑定数据");
                return null;
            }

            var befSetProp = function() {
                return true;
            };
            if (propNames) {
                propNames = TemplatedForm.obj2array(propNames);
                befSetProp = function(boundProp) {
                    for (var i = 0; i < propNames.length; ++i) {
                        if (boundProp == propNames[i])
                            return true;
                    }
                    return false;
                }
            }

            this._outData = {};
            this._loopBoundProp(container, befSetProp);

            return this._outData;
        }
    };
}
