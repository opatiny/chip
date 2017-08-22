
test('preferences should contain cylinderPrototype', function () {
    var preferences = require('../preferences');
    expect(preferences.cylinderPrototype.radiusServo).toBeGreaterThanOrEqual(2);
});
