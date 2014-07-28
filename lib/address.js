var Helpers = require('./helpers');
var faker = require('../index');
var definitions = require('../lib/definitions');

var address = {
    zipCode: function() {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(["#####", '#####-####']));
    },

    zipCodeFormat: function(format) {
        return Helpers.replaceSymbolWithNumber(["#####", '#####-####'][format]);
    },

    city: function() {
        var result;
        switch (faker.random.number(4)) {
            case 0:
                result = faker.random.city_prefix() + " " + faker.random.first_name() + faker.random.city_suffix();
                break;
            case 1:
                result = faker.random.city_prefix() + " " + faker.random.first_name();
                break;
            case 2:
                result = faker.random.first_name() + faker.random.city_suffix();
                break;
            case 3:
                result = faker.random.last_name() + faker.random.city_suffix();
                break;
        }
        return result;
    },

    streetName: function() {
        var result;
        switch (faker.random.number(2)) {
            case 0:
                result = faker.random.last_name() + " " + faker.random.street_suffix();
                break;
            case 1:
                result = faker.random.first_name() + " " + faker.random.street_suffix();
                break;
        }
        return result;
    },

    //
    // TODO: change all these methods that accept a boolean to instead accept an options hash.
    //
    streetAddress: function(useFullAddress) {
        if (useFullAddress === undefined) {
            useFullAddress = false;
        }
        var address = "";
        switch (faker.random.number(3)) {
            case 0:
                address = Helpers.replaceSymbolWithNumber("#####") + " " + faker.Address.streetName();
                break;
            case 1:
                address = Helpers.replaceSymbolWithNumber("####") + " " + faker.Address.streetName();
                break;
            case 2:
                address = Helpers.replaceSymbolWithNumber("###") + " " + faker.Address.streetName();
                break;
        }
        return useFullAddress ? (address + " " + faker.Address.secondaryAddress()) : address;
    },

    secondaryAddress: function() {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(
            [
                'Apt. ###',
                'Suite ###'
            ]
        ));
    },

    brState: function(useAbbr) {
        return useAbbr ? Keypath.get(faker, 'random.br_state_abbr') : Keypath.get(faker, 'random.br_state');
    },

    ukCounty: function() {
        return Keypath.get(faker, 'random.uk_county');
    },

    ukCountry: function() {
        return Keypath.get(faker, 'random.uk_country');
    },

    usState: function(useAbbr) {
        return useAbbr ? Keypath.get(faker, 'random.us_state_abbr') : Keypath.get(faker, 'random.us_state');
        return useAbbr ? faker.random.us_state_abbr() : faker.random.us_state();
    },

    latitude: function() {
        return (faker.random.number(180 * 10000) / 10000.0 - 90.0).toFixed(4);
    },

    longitude: function() {
        return (faker.random.number(360 * 10000) / 10000.0 - 180.0).toFixed(4);
    }
};

module.exports = address;


var Keypath = {};

Keypath.VERSION = '0.1.5';

Keypath.set = function(target, path, value) {
    if (!target) return undefined;

    var _set = function(src, method, val) {
        if (typeof src[method] === 'function') return src[method].call(src, val);
        return src[method] = val;
    };

    var keys = path.split('.');
    path = keys.pop();
    keys.forEach(function(prop) {
        if (!target[prop]) target[prop] = {};
        target = target[prop];
    });

    _set(target, path, value); //target[path] = value;

    return target;
};

Keypath.get = function(target, path, defaultValue) {
    if (!target || !path) return false;

    var _get = function(value) {
        return typeof value === 'function' ? value() : value;
    };

    path = path.split('.');
    var l = path.length,
        i = 0,
        p = '';
    for (; i < l; ++i) {
        p = path[i];
        if (target.hasOwnProperty(p)) target = target[p];
        else return _get(defaultValue);
    }
    return _get(target);
};

Keypath.has = function(target, path) {
    return this.get(target, path, '#$#NFV#$#') !== '#$#NFV#$#';
};