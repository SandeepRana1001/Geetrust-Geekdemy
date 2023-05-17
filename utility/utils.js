const { COURSES_LIST } = require('../globalVariables')

class Utility {

    /**
     * Initialized the utility variables whenever the object is created.
    */
    constructor() {
        this.ENROLLMENT_FEE = 6666
        this.DISCOUNT = {
            'CERTIFICATION': 0.02,
            'DEGREE': 0.03,
            'DIPLOMA': 0.01
        }
        this.COUPONNAME = {
            'B4G1': 'B4G1',
            'DEAL_G20': 'DEAL_G20',
            'DEAL_G5': 'DEAL_G5'
        }
        this.B4G1_MIN_QUANTITY = 4
        this.DEAL_G20_MIN_SUBTOTAL = 10000
        this.DEAL_G5_MIN_QUANTITY = 2
        this.DEAL_G20_DISCOUNT = 0.2
        this.DEAL_G5_DISCOUNT = 0.05
    }

    /**
     * 
     * @param {Number} subTotal  - Total sum of courses added
     * @returns {Boolean} true if less than 6666 and false otherwise
     */

    isEnrollmentFeeRequired = (subTotal) => {
        if (subTotal < this.ENROLLMENT_FEE) {
            return true
        }
        return false
    }

    /**
     * 
     * @returns {Number} Price of The lowest priced programme
     */

    findMinPricedCourse = () => {
        let min = Infinity
        for (let course of Object.keys(COURSES_LIST)) {
            min = Math.min(min, COURSES_LIST[course.toUpperCase()])
        }
        return min
    }


    /**
     * 
     * @param {String} course  - Contains the name of the course added in cart
     * @param {Number} qty  - Contains the qty of the course added in cart
     * @returns {Number} -  Course Price * Quantity
     */

    calculatePrice = (course, qty) => {

        return COURSES_LIST[course.toUpperCase()] * qty
    }

    /**
     * 
     * @param {Array} courses  - Contains the Array of the courses added in cart
     * @returns 
     */

    calculateMembershipDiscount = (courses) => {
        let total = 0, proDiscount = 0
        for (let string of courses) {
            let discount = 0
            const str = string.split('-')
            const course = str[0].toUpperCase()
            const qty = str[1]
            let prices = COURSES_LIST[course] * qty

            proDiscount = proDiscount + (prices * this.DISCOUNT[course])
            prices = prices - (prices * discount)
            total += prices
        }
        return { total, proDiscount }
    }



    /**
     * 
     * @param {Number} qtyCounter  - Total Count of Quantity in Cart
     * @param {String} coupon      - Coupon Name. (Will be blank in some cases)
     * @param {Number} subTotal    - Total price of courses
     * 
     * @returns 
     */


    getCoupon = (qtyCounter, coupon = '', subTotal) => {

        if (qtyCounter >= this.B4G1_MIN_QUANTITY) {
            // find course with min price
            let min = this.findMinPricedCourse()
            return {
                couponName: this.COUPONNAME.B4G1,
                discount: min
            }
        }

        if (coupon.trim().length > 0) {

            if (subTotal >= this.DEAL_G20_MIN_SUBTOTAL) {
                const discount = (subTotal * this.DEAL_G20_DISCOUNT)
                return {
                    couponName: this.COUPONNAME.DEAL_G20,
                    discount
                }
            } else if (qtyCounter >= this.DEAL_G5_MIN_QUANTITY) {
                const discount = (subTotal * this.DEAL_G5_DISCOUNT)
                return {
                    couponName: this.COUPONNAME.DEAL_G5,
                    discount
                }
            }


        }

        return {
            couponName: '',
            discount: 0
        }

    }
}





module.exports = Utility