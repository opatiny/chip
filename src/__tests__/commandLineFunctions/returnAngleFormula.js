var formula = require('../../commandLineFunctions/returnAngleFormula');

test('formula that returns the angle of the servos', function () {
    var xMassPosition = 0;
    var yMassPosition = 0;
    var bigRadius = 200;
    var radiusServo = 40;
    var distance = 200;
    expect(formula(xMassPosition, yMassPosition, bigRadius, radiusServo, distance)).toBeGreaterThanOrEqual(90);
    expect(formula(xMassPosition, -40, bigRadius, radiusServo, distance)).toBeGreaterThanOrEqual(90);
});