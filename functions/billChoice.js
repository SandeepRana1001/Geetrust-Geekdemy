const { isMembershipRequired, isEnrollmentFeeRequired } = require('../globalVariables')

const geekTrustOutput = require('./geekTrustOutput')


/**
 * Generate Subtotal including course and applied discount
 * @param {Number} subtotal - Subtotal of all the courses in cart
 * @param {Boolean} hasProMembership - Whether user has membership or no 
 * @param {Boolean} isenrollmentAdded - Whether enrollment fees is added or not
 * @param {Number} membershipDiscount - Discount given only to members
 * @param {Object} couponData - Contains Coupon name and total discount
 * @param {Number} total - Total Bill Generated
 */


const billChoice = (subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {


    const PRO_MEMBERSHIP_FEE = isMembershipRequired(hasProMembership)
    const ENROLLMENT_FEE = isEnrollmentFeeRequired(isenrollmentAdded)


    geekTrustOutput(subtotal, PRO_MEMBERSHIP_FEE, ENROLLMENT_FEE, membershipDiscount, couponData, total)

}


module.exports = billChoice