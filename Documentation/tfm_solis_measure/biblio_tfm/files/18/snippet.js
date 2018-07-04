if (typeof Georiot == 'undefined') //The shield to avoid running the code twice
{
    var Georiot = Georiot || {};

    var Genius = Genius || {};

    Georiot.getLinkType = function (currentLinkHref) {
        var appleRegex = /search.itunes.apple.com|itunes.apple.com\/\S+id[0-9]+/i;
        var tradeDoublerRegex = /clk[uk]*\.tradedoubler\.com\S*\?\S*url=[https%3A%2F%2F|http%3A%2F%2F]*\itunes\.apple\.com/i;
        var linkshareRegex = /click\.linksynergy\.com\S*?\S*RD_PARM1=[https%3A%2F%2F|https%253A%252F%252F|http%253A%252F%252F|http%3A%2F%2F]*\itunes\.apple\.com/i;
        var dgmPerfRegex = /t.dgm-au.c\S+\?+\S*u=[https%3A%2F%2F|http%3A%2F%2F|https%253A%252F%252F|http%253A%252F%252F]*\itunes\.apple\.com/i;
        var amazonRegex = /^amazon\.|^amzn\.com|^amzn\.co\.uk|^amzn\.to|^smile.amazon\./;
        var amazonLocalRegex = /local\.amazon\./;
        var googleRegex = /^google\.prf\.hn|^play\.google\.com/;
        var microsoftStoreRegex = /clk.*\.tradedoubler\.com\S*\?\S*url=[https%3A%2F%2F|http%3A%2F%2F].*microsoftstore\.com/i;
        var microsoftStoreRegex2 = /microsoftstore.com/i;
        var microsoftOnlineRegex = /clk.*\.tradedoubler\.com\S*\?\S*url=[https%3A%2F%2F|http%3A%2F%2F].*microsoft\.com.*/i;
        var microsoftOnlineRegex2 = /microsoft.com\/.*\/store\/.*/i;

        if (currentLinkHref.indexOf("target.georiot.com") > 0 || currentLinkHref.indexOf("geni.us") > 0) {
            return "unknown";
        }

        var cleanprep = currentLinkHref.toLowerCase().replace("https://", "").replace("http://", "").replace("www.", "");
        if (appleRegex.test(currentLinkHref)) return "apple";
        else if (tradeDoublerRegex.test(currentLinkHref)) return "tradedoubler";
        else if (linkshareRegex.test(currentLinkHref)) return "linkshare";
        else if (dgmPerfRegex.test(currentLinkHref)) return "dgmperf";
        else if (amazonRegex.test(cleanprep) && !amazonLocalRegex.test(cleanprep)) return "amazon";
        else if (googleRegex.test(cleanprep)) return "google";
        else if (microsoftStoreRegex.test(cleanprep)) return "microsoft";
        else if (microsoftStoreRegex2.test(cleanprep)) return "microsoft";
        else if (microsoftOnlineRegex.test(cleanprep)) return "microsoft";
        else if (microsoftOnlineRegex2.test(cleanprep)) return "microsoft";
        else return "unknown";
    };

    Georiot.extractItunesLinkFromAffiliateUrl = function (currentLink, linkType) {
        if (currentLink.href.indexOf("?") > 0) {
            var arrParams = currentLink.href.split("?");
            var arrUrlParams = arrParams[1].split("&");
            var arrParamNames = new Array(arrUrlParams.length);
            var arrParamValues = new Array(arrUrlParams.length);

            for (var i = 0; i < arrUrlParams.length; i++) {
                var sParam = arrUrlParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] !== "") {
                    arrParamValues[i] = sParam[1];

                    if (linkType === "tradedoubler" && arrParamNames[i] === "url") {
                        return arrParamValues[i];
                    } else if (linkType === "linkshare" && arrParamNames[i] === "RD_PARM1") {
                        return arrParamValues[i];
                    } else if (linkType === "dgmperf" && arrParamNames[i] === "u") {
                        return arrParamValues[i];
                    }
                } else arrParamValues[i] = "";
            }
        }
        return "";
    };

    Georiot.baseDomain = "//buy.geni.us";

    Georiot.createOnClickFunction = function (destLink) {
        return function () {
            window.location.assign(destLink);
            return false;
        };
    };

    Georiot.baseConvertLinks = function (tsid, types,
        passDtb, domain, useOnClick, specialProcessingForLinkTypes) {
        if (Georiot.utility.isThrive()) {
            return;
        }
        //Optional params javascript
        if (typeof domain === 'undefined') {
            domain = Georiot.baseDomain;
        }
        if (passDtb === false || passDtb === true) {
        }
        else {
            passDtb = false;
        }

        if (useOnClick === false || useOnClick === true) {
        }
        else {
            useOnClick = false;
        }
        /**
         * Ends optional params
         */

        var numberOfLinks = document.links.length;
        for (var currentLinkIndex = 0; currentLinkIndex < numberOfLinks; currentLinkIndex++) {
            var currentLink = document.links[currentLinkIndex];
            if (currentLink.hasAttribute('georiot-ignore') && currentLink.getAttribute('georiot-ignore') === 'true') {

            } else {
                var linkType = Georiot.getLinkType(currentLink.href);

                if (types.indexOf(linkType) > -1) {
                    var linkToUse = currentLink.href;
                    if (typeof specialProcessingForLinkTypes !== 'undefined') {
                        linkToUse = specialProcessingForLinkTypes(linkToUse, linkType);
                    }
                    if (linkToUse !== "") {
                        var proxylink = domain +
                            "/Proxy.ashx?TSID=" +
                            tsid +
                            "&GR_URL=" +
                            encodeURIComponent(linkToUse);
                        if (passDtb) {
                            proxylink = proxylink + "&dtb=1";
                        }
                        if (useOnClick) {
                            //This is a bit tricky cuz we basically need 
                            //to generate one function for each link
                            currentLink.onclick = Georiot.createOnClickFunction(proxylink);
                        } else {
                            currentLink.href = proxylink;
                        }
                    }

                } else continue;
            }
        }
    }

    Georiot.utility = {
        scriptIncluded: function (src) {
            var scripts = document.getElementsByTagName("script");
            for (var i = 0; i < scripts.length; i++)
                if (scripts[i].getAttribute('src') === src) return true;
            return false;
        },

        isThrive: function () {
            return window.location.search.indexOf('tve=true') > -1;
        }
    };

    Georiot.amazon = {
        convertLinks: function (tsid, passDtb, domain) {
            Georiot.amazon.convertToGeoRiotLinks(tsid, passDtb, domain);
        },
        convertToGeoRiotLinks: function (tsid, passDtb, domain) {
            Georiot.baseConvertLinks(tsid, ["amazon"], passDtb, domain, false);
        },
        addOnClickRedirect: function (tsid, passDtb, domain) {
            Georiot.baseConvertLinks(tsid, ["amazon"], passDtb, domain, true);
        }
    };

    Georiot.snippet = {
        convertLinks: function (tsid, passDtb, domain) {
            Georiot.snippet.convertToGeoRiotLinks(tsid, passDtb, domain);
        },
        convertToGeoRiotLinks: function (tsid, passDtb, domain) {

            Georiot.baseConvertLinks(tsid,
                [
                    "apple", "amazon",
                    "linkshare", "tradedoubler", "dgmperf"
                ],
                passDtb,
                domain,
                false,
                function (currentLink, linkType) {
                    if (linkType === "linkshare" || linkType === "tradedoubler" || linkType === "dgmperf") {
                        return decodeURIComponent(Georiot.extractItunesLinkFromAffiliateUrl(currentLink, linkType));
                    }
                    return currentLink;
                }
            );
        }, addOnClickRedirect: function (tsid, passDtb, domain) {
            Georiot.baseConvertLinks(tsid,
                [
                    "apple", "amazon",
                    "linkshare", "tradedoubler", "dgmperf"
                ],
                passDtb,
                domain,
                true,
                function (currentLink, linkType) {
                    if (linkType === "linkshare" || linkType === "tradedoubler" || linkType === "dgmperf") {
                        return decodeURIComponent(Georiot.extractItunesLinkFromAffiliateUrl(currentLink, linkType));
                    }
                    return currentLink;
                }
            );
        }
    };


    Georiot.itunes = {
        convertLinks: function (tsid, passDtb, domain) {
            Georiot.itunes.convertToGeoRiotLinks(tsid, passDtb, domain);
        },
        convertToGeoRiotLinks: function (tsid, passDtb, domain) {
            //We only have passDtb for apple letting the parameter passed because we published it like that by mistake once.
            //That parameter does not do anything but don't wanna break people since param order matters.
            Georiot.baseConvertLinks(tsid, ["apple"], false, domain, false);
        },
        addOnClickRedirect: function (tsid, passDtb, domain) {
            Georiot.baseConvertLinks(tsid, ["apple"], false, domain, true);
        }
    };

    Georiot.google = {
        convertLinks: function (tsid, domain) {
            Georiot.google.convertToGeoRiotLinks(tsid, domain);
        },
        convertToGeoRiotLinks: function (tsid, domain) {
            Georiot.baseConvertLinks(tsid, ["google"], false, domain, false);
        },
        addOnClickRedirect: function (tsid, domain) {
            Georiot.baseConvertLinks(tsid, ["google"], false, domain, true);
        }
    };

    Georiot.microsoft = {
        convertLinks: function (tsid, domain, useOnClick) {
            Georiot.microsoft.convertToGeoRiotLinks(tsid, domain, useOnClick);
        },
        convertToGeoRiotLinks: function (tsid, domain) {

            Georiot.baseConvertLinks(tsid, ["microsoft"], false, domain, false);
        },
        addOnClickRedirect: function (tsid, domain) {
            Georiot.baseConvertLinks(tsid, ["microsoft"], false, domain, true);
        }

    };

    Genius.amazon = Georiot.amazon;

    Genius.snippet = Georiot.snippet;

    Genius.itunes = Georiot.itunes;

    Genius.google = Georiot.google;

    Genius.microsoft = Georiot.microsoft;

    /*******************Compatibility section *****************************/
    /*This functions are floating here 
    for compatability purposes with the amazon 
    link engine plugin Once a new version of the plugin is out kill them with fire*/

    function convertToGeoRiotLinks(tsid) {
        var numberOfLinks = document.links.length;
        var currentLinkIndex = 0;

        for (currentLinkIndex = 0; currentLinkIndex < numberOfLinks; currentLinkIndex++) {
            var currentLink = document.links[currentLinkIndex];
            var linkType = getLinkType(currentLink.href);

            if (linkType == "amazon") {
                currentLink.href = "http://target.georiot.com/Proxy.ashx?TSID=" + tsid + "&GR_URL=" + encodeURIComponent(currentLink.href) + "&oldendpoint=true";
            } else continue;
        }
    }

    function extractItunesLinkFromAffiliateUrl(currentLink, linkType) {
        if (currentLink.href.indexOf("?") > 0) {
            var arrParams = currentLink.href.split("?");
            var arrURLParams = arrParams[1].split("&");
            var arrParamNames = new Array(arrURLParams.length);
            var arrParamValues = new Array(arrURLParams.length);
            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];
                if (sParam[1] != "") {
                    arrParamValues[i] = sParam[1];
                } else arrParamValues[i] = "";
            }
        }
        return "";
    }

    /* Returns link type: unknown, amazon
     */
    function getLinkType(currentLinkHref) {
        var amazonRegex = /\.amazon\./;
        var amazonLocalRegex = /local\.amazon\./;

        if (currentLinkHref.indexOf("target.georiot.com") > 0 || currentLinkHref.indexOf("geni.us") > 0) {
            return "unknown";
        }


        if (amazonRegex.test(currentLinkHref) && !amazonLocalRegex.test(currentLinkHref)) return "amazon";
        else return "unknown";
    }



    /*******************Compatibility section *****************************/
    /*********************---END---*******************************/

    /* Example usage
    
    $(document).ready(function () {
         // READ THIS!!
    // START OF REQUIRED CHANGES
    // you MUST change this value to one for your georiot account TSIDs
    var tsid = 2053;
    // If you want to convert ONLY Amazon links, remove "//" from the line below:
    // Georiot.amazon.convertToGeoRiotLinks(tsid)
    
    // If you want to convert ONLY iTunes links, remove "//" from the line below:
    // Georiot.itunes.convertToGeoRiotLinks(tsid)
    
    // If you want to convert BOTH iTunes and Amazon links, remove "//" from the link below:
    // Georiot.snippet.convertToGeoRiotLinks(tsid)
    
    // If you want to convert ONLY Google Play links, remove "//" from the line below:
    // Georiot.google.convertToGeoRiotLinks(tsid)
    
    // If you want to convert ONLY Microsoft links, remove "//" from the line below:
    // Georiot.microsoft.convertToGeoRiotLinks(tsid)
    
    // If you DO NOT want to override the base country's affiliate parameter, remove "//" from the line below:
    // Georiot.snippet.convertToGeoRiotLinks(tsid, true);
    
    // If you are using a custom Domain you can pass and extra parameter with it
      // Georiot.amazon.convertToGeoRiotLinks(tsid, false, "http://customdomain.com")

      // If you  want to trigger on click can pass an additional parameter with it
      // Georiot.amazon.addOnClickRedirect(tsid);
    // END OF REQUIRED CHANGES
    // DO NOT MODIFY BELOW THIS LINE
    
     });*/

}