/* eslint-disable */

var vrv = vrv || {};
vrv.android = {};
vrv.jssdk = {};
vrv.util = {};
vrv._init = {};
vrv._ready = {};
vrv.android = {
    callback: function (a, b, d) {
        try {
            vrv._init.debug && alert(a + ":" + d);
            var c = vrv.util.getSuccess(b);
            "function" == typeof c && c.call(this, JSON.parse(d))
        } catch (e) {
            alert(e.message)
        }
    },
    takePhoto: function (a) {
        android.takePhoto(vrv.util.pre(a))
    },
    getUnreadMessage: function (a) {
        android.getUnreadMessage(vrv.util.pre(a))
    },
    getAccountInfo: function (a) {
        android.getUserInfo(vrv.util.pre(a))
    },
    sendMessage: function (a) {
        android.sendMessage(vrv.util.pre(a))
    },
    portraitUrl: function (a) {
        android.portraitUrl(vrv.util.pre(a))
    },
    getUserName: function (a) {
        android.getUserName(vrv.util.pre(a))
    },
    getContactList: function (a) {
        android.getContacts(vrv.util.pre(a))
    },
    getLocalFiles: function (a) {
        a = vrv.util.addSize(a);
        android.getLocalFiles(vrv.util.pre(a))
    },
    getGroupList: function (a) {
        android.getGroupsInfo(vrv.util.pre(a))
    },
    getLocalPhotos: function (a) {
        a = vrv.util.addSize(a);
        android.getLocalPhotos(vrv.util.pre(a))
    },
    getPosition: function (a) {
        android.getPosition(vrv.util.pre(a))
    },
    showNavigationBar: function (a) {
        android.showNavigationBar(vrv.util.pre(a))
    },
    getInfoWithSweep: function (a) {
        android.getInfoWithSweep(vrv.util.pre(a))
    },
    getOrganization: function (a) {
        android.getOrganization(vrv.util.pre(a))
    },
    closeView: function (a) {
        android.closeView(vrv.util.pre(a))
    },
    getLanguage: function (a) {
        android.getLanguage(vrv.util.pre(a))
    },
    getVersionMark: function (a) {
        android.getVersionMark(vrv.util.pre(a))
    },
    copyTextToPaste: function (a) {
        android.copyTextToPaste(vrv.util.pre(a))
    }
};
vrv.ios = {
    callback: function (a, b, d) {
        vrv._init.debug && alert(a + ":" + d);
        a = vrv.util.getSuccess(b);
        "function" == typeof a && a.call(this, JSON.parse(d))
    },
    takePhoto: function (a) {
        vrv.util.callIOS("takePhoto", a)
    },
    getUnreadMessage: function (a) {
        vrv.util.callIOS("getUnreadMessage", a)
    },
    getAccountInfo: function (a) {
        vrv.util.callIOS("getUserInfo", a)
    },
    sendMessage: function (a) {
        vrv.util.callIOS("sendMessage", a)
    },
    portraitUrl: function (a) {
        vrv.util.callIOS("portraitUrl", a)
    },
    getUserName: function (a) {
        vrv.util.callIOS("getUserName", a)
    },
    getContactList: function (a) {
        vrv.util.callIOS("getContacts", a)
    },
    getLocalFiles: function (a) {
        a = vrv.util.addSize(a);
        vrv.util.callIOS("getLocalFiles", a)
    },
    getGroupList: function (a) {
        vrv.util.callIOS("getGroupsInfo", a)
    },
    getLocalPhotos: function (a) {
        a = vrv.util.addSize(a);
        vrv.util.callIOS("getLocalPhotos", a)
    },
    getPosition: function (a) {
        vrv.util.callIOS("getPosition", a)
    },
    showNavigationBar: function (a) {
        vrv.util.callIOS("showNavigationBar", a)
    },
    getInfoWithSweep: function (a) {
        vrv.util.callIOS("getInfoWithSweep", a)
    },
    getOrganization: function (a) {
        vrv.util.callIOS("getOrganization",
            a)
    },
    closeView: function (a) {
        vrv.util.callIOS("closeView", a)
    },
    getLanguage: function (a) {
        vrv.util.callIOS("getLanguage", a)
    },
    getVersionMark: function (a) {
        vrv.util.callIOS("getVersionMark", a)
    },
    copyTextToPaste: function (a) {
        vrv.util.callIOS("copyTextToPaste", a)
    }
};
vrv.util.addSize = function (a) {
    return vrv.util.setDefault(a, [{
        type: "number",
        key: "size",
        val: 10,
        min: 1,
        max: 15
    }])
};
vrv.util._success = {};
vrv.util.putSuccess = function (a, b) {
    b && "function" == typeof b && (vrv.util._success[a] = b)
};
vrv.util.getSuccess = function (a) {
    var b = vrv.util._success[a];
    delete vrv.util._success[a];
    return b
};
vrv.util.formatParams = function (a) {
    a || (a = {});
    a.constructor !== Object && (a = {});
    a.uuid = vrv.util.uuid();
    return {
        p: JSON.stringify(a),
        uuid: a.uuid
    }
};
vrv.util.setDefault = function (a, b) {
    a || (a = {});
    a.constructor !== Object && (a = {});
    for (var d in b) {
        var c = b[d];
        typeof a[c.key] != c.type && (a[c.key] = c.val);
        if (a[c.key] > c.max || a[c.key] < c.min) a[c.key] = c.val
    }
    return a
};
vrv.util.pre = function (a) {
    var b = vrv.util.formatParams(a);
    a && vrv.util.putSuccess(b.uuid, a.success);
    return b.p
};
vrv.util.callIOS = function (a, b) {
    vrv.util.formatParams(b);
    var d = b.success;
    delete b.success;
    vrv.ios.bridge.callHandler(a, b, function (b) {
        vrv._init.debug && alert(a + ":" + JSON.stringify(b));
        d(b)
    })
};
vrv.util.uuid = function () {
    for (var a = [], b = 0; 36 > b; b ++) a[b] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
    a[14] = "4";
    a[19] = "0123456789abcdef".substr(a[19] & 3 | 8, 1);
    a[8] = a[13] = a[18] = a[23] = "-";
    return a.join("")
};
vrv.init = function (a) {
    var b = navigator.userAgent.toLowerCase(); - 1 != b.indexOf("android") ? (vrv.jssdk = vrv.android, "function" == typeof vrv._ready.fn ? vrv._ready.fn.call(this) : vrv._ready.r = !0) : -1 != b.indexOf("iphone") && (function (a) {
        window.WebViewJavascriptBridge ? a(WebViewJavascriptBridge) : document.addEventListener("WebViewJavascriptBridgeReady", function () {
            a(WebViewJavascriptBridge)
        }, !1)
    }(function (a) {
        a.init(function (a, b) {
            b({
                "Javascript Responds": "Wee!"
            })
        });
        vrv.ios.bridge = a;
        "function" == typeof vrv._ready.fn ? vrv._ready.fn.call(this) :
            vrv._ready.r = !0
    }), vrv.jssdk = vrv.ios);
    a && a.constructor == Object && (vrv._init = a)
};
vrv.ready = function (a) {
    "function" == typeof a && (vrv._ready.r ? a.call(this) : vrv._ready.fn = a)
};

export default vrv