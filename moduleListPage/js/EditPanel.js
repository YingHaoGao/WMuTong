if (window.EditPanel == null) {
    window.EditPanel = function(dvAppearances, buttons) {
        if (dvAppearances)
            this.innerDetailView = new DetailView(dvAppearances);
        this._buttons = buttons;
    };

    window.EditPanel.prototype = {
        render: function(container, dvFilters, dvData) {
            this.container = TemplatedForm.getDomElement(container);
            this.container.innerHTML = "";

            if (this.innerDetailView && dvFilters && dvData)
                this.innerDetailView.render(container, dvFilters, dvData);

            this._buttons.map(function(item, idx) {
                var domBtn = document.createElement("input");
                domBtn.type = "button";
                if (item.styleOrClass)
                    TemplatedForm.setStyleOrClass(domBtn, item.styleOrClass);
                if (item.text)
                    domBtn.value = item.text;
                if (item.onclick) {
                    domBtn.onclick = function() {
                        item.onclick(idx);
                    };
                }
                container.appendChild(domBtn);
            });
        }
    };
}
