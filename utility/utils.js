const { COURSES_LIST } = require('../globalVariables')

class Utility {

    /**
     * Initialized the utility variables whenever the object is created.
    */
    constructor() {
        this.ENROLLMENT_FEE = 6666
        this.MEMBERSHIP_DISCOUNT = {
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

    calculateDiscount = (discount, hasMembership) => {
        let finalDiscount = discount
        if (hasMembership) {
            finalDiscount = this.MEMBERSHIP_DISCOUNT + discount
            return finalDiscount
        }
    }

    /**
     * 
     * @returns {Number} Price of The lowest priced programme
     */

    findMinPricedCourse = () => {
        let min = Infinity, name = ''
        for (let course of Object.keys(COURSES_LIST)) {
            const price = COURSES_LIST[course.toUpperCase()]
            if (price < min) {
                min = price
                name = course.toUpperCase()
            }
        }
        return name
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
     * @param {Boolean} hasMembership True is PRO Membership is applied and false otherwise
     * @param {String} course - Contains the name of the course added in cart
     * @param {Number} qty - Contains the qty of the course added in cart
     * @returns {Object} - Total Price and Total Membership discount
     */

    checkAndCalculateMembershipDiscount = (hasMembership, course, qty = 1) => {

        let totalPrice = COURSES_LIST[course.toUpperCase()] * qty
        let proDiscount = 0

        if (!hasMembership) {
            return { totalPrice, proDiscount }
        }

        proDiscount = totalPrice * this.MEMBERSHIP_DISCOUNT[course]
        totalPrice = totalPrice - proDiscount
        return { totalPrice, proDiscount }
    }



    /**
     * 
     * @param {Number} qtyCounter  - Total Count of Quantity in Cart
     * @param {String} coupon      - Coupon Name. (Will be blank in some cases)
     * @param {Number} subTotal    - Total price of courses
     * 
     * @returns 
     */


    getCoupon = (qtyCounter, coupon = '', subTotal, hasMembership = false) => {

        if (qtyCounter >= this.B4G1_MIN_QUANTITY) {
            // find course with min price
            let minimumPricedCourse = this.findMinPricedCourse()
            const result = this.checkAndCalculateMembershipDiscount(hasMembership, minimumPricedCourse)
            return {
                couponName: this.COUPONNAME.B4G1,
                discount: result.totalPrice
            }
        } else if (this.COUPONNAME.DEAL_G20 === coupon && subTotal >= this.DEAL_G20_MIN_SUBTOTAL) {

            const discount = (subTotal * this.DEAL_G20_DISCOUNT)
            return {
                couponName: this.COUPONNAME.DEAL_G20,
                discount
            }

        } else if (this.COUPONNAME.DEAL_G5 === coupon && qtyCounter >= this.DEAL_G5_MIN_QUANTITY) {

            const discount = (subTotal * this.DEAL_G5_DISCOUNT)
            return {
                couponName: this.COUPONNAME.DEAL_G5,
                discount
            }

        } else {

            return {
                couponName: 'NONE',
                discount: 0
            }
        }




    }
}





module.exports = Utility