const COURSES_LIST = require('../courses')

class Utility {

    /**
     * 
     * @param {Number} subTotal  - Total sum of courses added
     * @returns {Boolean} true if less than 6666 and false otherwise
     */

    isEnrollmentFeeRequired = (subTotal) => {
        if (subTotal < 6666) {
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
            if (course === 'CERTIFICATION') {
                discount = 0.02
            } else if (course === 'DEGREE') {
                discount = 0.03
            } else if (course === 'DIPLOMA') {
                discount = 0.01
            }
            proDiscount = proDiscount + (prices * discount)
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

        if (qtyCounter >= 4) {
            // find course with min price
            let min = this.findMinPricedCourse()
            return {
                couponName: 'B4G1',
                discount: min
            }
        }

        if (coupon.trim().length > 0) {

            if (subTotal >= 10000) {
                const discount = (subTotal * 0.2)
                return {
                    couponName: 'DEAL_G20',
                    discount
                }
            } else if (qtyCounter >= 2) {
                const discount = (subTotal * 0.5)
                return {
                    couponName: 'DEAL_G5',
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