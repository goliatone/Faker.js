var faker = require('../index');

var internet = {
    email: function () {
        return faker.Helpers.slugify(faker.Internet.userName()) + "@" + faker.Helpers.slugify(faker.Internet.domainName());
    },

    userName: function (lowerCase) {

        var result;
        switch (faker.random.number(2)) {
        case 0:
            result = faker.random.first_name();
            break;
        case 1:
            result = faker.random.first_name() + faker.random.array_element([".", "_"]) + faker.random.last_name();
            break;
        }
        return lowerCase ? result.toLowerCase() : result;
    },

    domainName: function () {
        return faker.Internet.domainWord() + "." + faker.random.domain_suffix();
    },

    domainWord:  function () {
        return faker.random.first_name().toLowerCase();
    },

    ip: function () {
        var randNum = function () {
            return (Math.random() * 254 + 1).toFixed(0);
        };

        var result = [];
        for (var i = 0; i < 4; i++) {
            result[i] = randNum();
        }

        return result.join(".");
    },

    color: function (baseRed255, baseGreen255, baseBlue255) {

        // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
        var red = Math.floor((faker.random.number(256) + baseRed255) / 2);
        var green = Math.floor((faker.random.number(256) + baseRed255) / 2);
        var blue = Math.floor((faker.random.number(256) + baseRed255) / 2);

        return '#' + red.toString(16) + green.toString(16) + blue.toString(16);
    }
};

module.exports = internet;
