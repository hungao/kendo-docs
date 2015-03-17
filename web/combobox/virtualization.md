---
title: Virtualization
page_title: Kendo UI ComboBox Virtualization
description: This document provides information how to configure virtualization in Kendo UI ComboBox, DropDownList, AutoComplete and MultiSelect
position: 3
---

# Virtualization

Kendo UI AutoComplete, ComboBox, DropDownList and MultiSelect support UI and data virtualization which may be used to display large amount of flat or grouped items.
The UI virtualization technique ensures that the widget creates only a fixed amount of list items which are shown in the widget's popup list.
When the list is scrolled the widget will reuse existing containers, instead of creating new ones. 

The DataSource component is responsible for data paging and pre-fetching on demand.

##How it works?

Here is an example:

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoComboBox({
                template: '#= OrderID # | #= ShipName #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
                height: 520,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### itemHeight

All items in the virtualized list **must** have the same height. If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

### Container height

The virtualized list container **must** have a `height`. If the developer does not specify one, the list will use default `height` of the widget which is `200`.

### pageSize

The `pageSize` should be equal to `height/itemHeight * 4`. For example if the `height` is 520 and `itemHeight` is 26 `pageSize` should be set to 80. Setting the correct page size is important for the functionality of the widget and will prevent the DataSource from making multiple requests for the same data.

> The widget will automatically control all data requests and may modify the `pageSize` if it is not correctly set by the developer in the DataSource configuration.

### valueMapper

The `valueMapper` function is **mandatory** for the functionality of the virtualized widget. This function will be called every time when the widget receives a value that is not fetched from the remote server yet.
The widget will pass selected value(s) in the `valueMapper` function and will expect from it to return the data item index.

    valueMapper: function(options) {
        $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
            type: "GET",
            data: convertValues(options.value), //send value to the server
            success: function (data) {
                options.success(data); //return the index number of the correspoding data item
            }
        })
    }
