if (window.DetailEdit == null) {
    window.DetailEdit = function(dvAppearances, ebAppearances) {
        this.innerDetailView = new DetailView(dvAppearances);
        this.innerEditBar = new EditBar();
        this.onSave = null;
        this.onDel = null;

        for (var i = 0; i < ebAppearances.length; ++i) {
            var btnStyleOrClasses = ebAppearances[i].btnStyleOrClasses;
            if (btnStyleOrClasses) {
                var buttons = [];
                for (var j = 0; j < btnStyleOrClasses.length; ++j) {
                    buttons.push({
                        styleOrClass: btnStyleOrClasses[j]
                    });
                }
                ebAppearances[i].buttons = buttons;
            }
        }
        this._ebAppearances = ebAppearances;
    };

    window.DetailEdit.prototype = {
        attach: function(container, binders, dataObj) {
            this.container = TemplatedForm.getDomElement(container);
            this.container.innerHTML = "";

            this.domEditBars = [];
            this.domDetailViews = [];
            for (var i = 0; i < binders.length; ++i) {
                var domDetailView = document.createElement("div");
                if (binders[i].styleOrClass) {
                    TemplatedForm.setStyleOrClass(
                        domDetailView, binders[i].styleOrClass
                    );
                }
                this.domDetailViews.push(domDetailView);

                var editBarIdx = binders[i].editBarIdx;
                if (editBarIdx > -1 && editBarIdx < this._ebAppearances.length)
                {
                    domDetailView.domEditBar = this._createEditBar(
                        editBarIdx, (i == 0)
                    );
                }

                domDetailView.dataFilters = binders[i].dataFilters;
                this.innerDetailView.render(
                    domDetailView, domDetailView.dataFilters, dataObj
                );
                domDetailView.style.display = "none";
                this.container.appendChild(domDetailView);
            }

            this.dataObj = dataObj;
            this.domDisplayView = null;
        },

        show: function(val, editMode) {
            if (this.domDisplayView) {
                this.domDisplayView.domEditBar.style.display = "none";
                this.domDisplayView.style.display = "none";
                this.domDisplayView = null;
            }

            if (val) {
                this.domDisplayView = this.domDetailViews[editMode? 0: 1];
                this.domDisplayView.domEditBar.style.display = "block";
                this.domDisplayView.style.display = "block";
            }
        },

        _createEditBar: function(editBarIdx, editMode) {
            var ebAppearance = this._ebAppearances[editBarIdx];
            var domEditBar = document.createElement("div");
            if (ebAppearance.styleOrClass) {
                TemplatedForm.setStyleOrClass(
                    domEditBar, ebAppearance.styleOrClass
                );
            }
            this.domEditBars.push(domEditBar);

            if (ebAppearance.buttons) {
                if (editMode)
                    this._initButtonsInEditMode(ebAppearance.buttons);
                else
                    this._initButtonsInViewMode(ebAppearance.buttons);
            }

            this.innerEditBar.render(
                domEditBar,
                ebAppearance.title,
                ebAppearance.highlight,
                ebAppearance.buttons
            );
            domEditBar.style.display = "none";
            this.container.appendChild(domEditBar);
            return domEditBar;
        },

        _initButtonsInEditMode: function(buttons) {
            var that = this;

            if (buttons.length > 0) {
                // save button:
                buttons[0].onclick = function() {
                    var dataObj = that.innerDetailView.extract(
                        that.domDetailViews[0]
                    );
                    var saveResult = null;
                    if (that.onSave)
                        saveResult = that.onSave(dataObj, that.dataObj);
                    if ( saveResult && !TemplatedForm.isEmpty(saveResult) ) {
                        console.log(saveResult);
                        alert(saveResult.alertText);
                    } else {
                        that.dataObj = dataObj;

                        var showViewMode = that._showViewMode();
                        if (showViewMode) {
                            var domDetailView = that.domDetailViews[1];
                            that.innerDetailView.render(
                                domDetailView,
                                domDetailView.dataFilters,
                                dataObj
                            );
                        }
                        that.show(showViewMode);
                    }
                }
            }

            if (buttons.length > 1) {
                // cancel button:
                buttons[1].onclick = function() {
                    that.show( that._showViewMode() );
                }
            }
        },

        _initButtonsInViewMode: function(buttons) {
            var that = this;

            if (buttons.length > 0) {
                // edit button:
                buttons[0].onclick = function() {
                    that.show(true, "edit");
                }
            }

            if (buttons.length > 1) {
                // delete button:
                buttons[1].onclick = function() {
                    if (that.onDel) {
                        if ( confirm("确定要删除吗？") ) {
                            that.onDel(that.dataObj);
                            that.show(false);
                        }
                    } else {
                        that.show(false);
                    }
                }
            }
        },

        _showViewMode: function() {
            return (this.domDetailViews.length > 1);
        }
    };
}
