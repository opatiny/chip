
/**
 *  PID Controller.
 */
class Controller {
    constructor(kP, kI, kD, dt) {
        let iMax;
        if (typeof kP === 'object') {
            let options = kP;
            kP = options.kP;
            kI = options.kI;
            kD = options.kD;
            dt = options.dt;
            iMax = options.iMax;
        }

        // PID constants
        this.kP = (typeof kP === 'number') ? kP : 1;
        this.kI = kI || 0;
        this.kD = kD || 0;

        // Interval of time between two updates
        // If not set, it will be automatically calculated
        this.dt = dt || 0;

        // Maximum absolute value of sumError
        this.iMax = iMax || 0;

        this.sumError = 0;
        this.lastError = 0;
        this.lastTime = 0;

        this.target = 0; // default value, can be modified with .setTarget
    }

    setTarget(target) {
        this.target = target;
    }

    update(currentValue) {
        this.currentValue = currentValue;

        // Calculate dt
        let dt = this.dt;
        if (!dt) {
            let currentTime = Date.now();
            if (this.lastTime === 0) { // First time update() is called
                dt = 0;
            } else {
                dt = (currentTime - this.lastTime) / 1000; // in seconds
            }
            this.lastTime = currentTime;
        }
        if (typeof dt !== 'number' || dt === 0) {
            dt = 1;
        }

        let error = (this.target - this.currentValue);
        this.sumError = this.sumError + error * dt;
        if (this.iMax > 0 && Math.abs(this.sumError) > this.iMax) {
            let sumSign = (this.sumError > 0) ? 1 : -1;
            this.sumError = sumSign * this.iMax;
        }

        let dError = (error - this.lastError) / dt;
        this.lastError = error;

        return (this.kP * error) + (this.kI * this.sumError) + (this.kD * dError);
    }

    reset() {
        this.sumError = 0;
        this.lastError = 0;
        this.lastTime = 0;
    }
}

module.exports = Controller;
