"use strict";

var LibraryItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.key = obj.key;
        this.name = obj.name;
        this.date = obj.date;
        this.phone = obj.phone;
        this.remark=obj.remark;
    } else {
        this.key = "";
        this.name = "";
        this.date = "";
        this.phone = "";
        this.remark="";
    }
};


LibraryItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};
var Library = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new LibraryItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

Library.prototype = {
    init: function () {
    },
    save: function (key, name, phone, date,remark) {
        //var from = Blockchain.transaction.from;
        var libraryItem = this.repo.get(key);
        if (libraryItem) {
            libraryItem.key = JSON.parse(libraryItem).key;
            libraryItem.name = JSON.parse(libraryItem).name + '|-' + name;
            libraryItem.phone = JSON.parse(libraryItem).phone + '|-' + phone;
            libraryItem.date = JSON.parse(libraryItem).date + '|-' + date;
            libraryItem.remark = JSON.parse(libraryItem).remark + '|-' + remark;
            this.repo.put(key, libraryItem);

        } else {
            libraryItem = new LibraryItem();
            libraryItem.key = key;
            libraryItem.name = name;
            libraryItem.phone = phone;
            libraryItem.date = date;
            libraryItem.remark=remark;
            this.repo.put(key, libraryItem);
        }
    },
    get: function (key) {
        key = key.trim();
        if (key === "") {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = Library;