const { FIXED_DECIMAL_POSITION } = require('../globalVariables')
const Utility = require('../utility/utils')
const utils = new Utility()

/**
 * Generates Pattern for billing
 */


const pattern = () => {
    console.log(' ________________________________________________________________________________________________')
}
/**
 * Generate Subtotal including course and applied discount
 * @param {Array} courses - List of courses in cart
 * @param {Object} COURSES_LIST - Details of all the existing courses
 * @param {Number} subtotal - Subtotal of all the courses in cart
 * @param {Boolean} proMembershipFee - PRO MEMBERSHIP FEE 
 * @param {Boolean} enrollmentFee - ENROLLMENT FEE
 * @param {Number} membershipDiscount - Discount given only to members
 * @param {Object} couponData - Contains Coupon name and total discount
 * @param {Number} total - Total Bill Generated
 */

const generateBill = (courses, COURSES_LIST, subtotal, proMembershipFee, enrollmentFee, membershipDiscount, couponData, total) => {


    pattern()
    console.log(' | \t\t\t\t\t |\t Qty\t|\tCost\t|\t Amount\t\t|')
    pattern()

    for (let string of courses) {
        const str = string.split('-')
        const course = str[0]
        const qty = str[1]
        const amount = COURSES_LIST[course.toUpperCase()]
        const finalPrice = utils.calculatePrice(course, qty)


        if (course === 'DIPLOMA' || course === 'DEGREE') {
            console.log(` |\t ${course} @Rs.${amount}  \t\t |\t ${qty}\t|\t ${amount} \t|\t ${(finalPrice).toFixed(FIXED_DECIMAL_POSITION)}  \t| `)
        } else {
            console.log(` |\t ${course} @Rs.${amount}  \t |\t ${qty}\t|\t ${amount} \t|\t ${(finalPrice).toFixed(FIXED_DECIMAL_POSITION)}  \t| `)
        }

        pattern()
    }

    console.log(` | \t SUB_TOTAL\t\t\t |\t\t|\t\t|\t ${subtotal.toFixed(FIXED_DECIMAL_POSITION)} \t|`)
    pattern()

    console.log(` | \t PRO MEMBERSHIP FEE \t\t |\t\t|\t\t|\t ${proMembershipFee.toFixed(FIXED_DECIMAL_POSITION)} \t \t|`)
    pattern()

    console.log(` | \t ENROLLMENT FEE \t\t |\t\t|\t\t|\t ${enrollmentFee.toFixed(FIXED_DECIMAL_POSITION)} \t \t|`)
    pattern()

    console.log(` | \t TOTAL_PRO_DISCOUNT \t\t |\t\t|\t\t|\t ${membershipDiscount.toFixed(FIXED_DECIMAL_POSITION)} \t \t|`)
    pattern()

    if (couponData.couponName === 'B4G1') {
        console.log(` | \t COUPON_DISCOUNT(${couponData.couponName}) \t\t |\t\t|\t\t|\t ${couponData.discount.toFixed(FIXED_DECIMAL_POSITION)} \t|`)

    } else {

        console.log(` | \t COUPON_DISCOUNT(${couponData.couponName}) \t |\t\t|\t\t|\t ${couponData.discount.toFixed(FIXED_DECIMAL_POSITION)}\t|`)
    }
    pattern()

    console.log(` | \t Total \t\t\t\t |\t\t|\t\t|\t ${total.toFixed(FIXED_DECIMAL_POSITION)}\t|`)
    pattern()

}

module.exports = generateBill