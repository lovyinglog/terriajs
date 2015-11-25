'use strict';

/*global require*/
var defined = require('terriajs-cesium/Source/Core/defined');
var loadView = require('../Core/loadView');

var LegendSectionViewModel = function(catalogMember) {
    this.catalogMember = catalogMember;
};

LegendSectionViewModel.createForCatalogMember = function(catalogMember) {
    if (!defined(catalogMember.legendUrls) || catalogMember.legendUrls.length === 0) {
        return undefined;
    }

    return new LegendSectionViewModel(catalogMember);
};

LegendSectionViewModel.prototype.show = function(container) {
    loadView(require('fs').readFileSync(__dirname + '/../Views/LegendSection.html', 'utf8'), container, this);
};

var imageUrlRegex = /[.\/](png|jpg|jpeg|gif)/i;

LegendSectionViewModel.prototype.urlIsImage = function(url) {
    if (!defined(url) || url.length === 0) {
        return false;
    }

    return url.match(imageUrlRegex);
};


module.exports = LegendSectionViewModel;