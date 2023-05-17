const { FIXED_DECIMAL_POSITION } = require('../globalVariables')

/**
 * Generate Subtotal including course and applied discount
 * @param {Number} subtotal - Subtotal of all the courses in cart
 * @param {Boolean} hasProMembership - Whether user has membership or no 
 * @param {Boolean} isenrollmentAdded - Whether enrollment fees is added or not
 * @param {Number} membershipDiscount - Discount given only to members
 * @param {Object} couponData - Contains Coupon name and total discount
 * @param {Number} total - Total Bill Generated
 */

const geekTrustOutput = (subtotal, proMembershipFee, enrollmentAddedFee, membershipDiscount, couponData, total) => {

    console.log(`SUB_TOTAL \t\t ${subtotal.toFixed(FIXED_DECIMAL_POSITION)}`)
    console.log(`COUPON_DISCOUNT \t ${couponData.couponName} ${couponData.discount.toFixed(FIXED_DECIMAL_POSITION)}`)
    console.log(`TOTAL_PRO_DISCOUNT \t ${membershipDiscount.toFixed(FIXED_DECIMAL_POSITION)}`)
    console.log(`PRO MEMBERSHIP FEE \t ${proMembershipFee.toFixed(FIXED_DECIMAL_POSITION)}`)
    console.log(`ENROLLMENT_FEE \t\t ${enrollmentAddedFee.toFixed(FIXED_DECIMAL_POSITION)}`)
    console.log(`TOTAL \t\t\t ${total.toFixed(FIXED_DECIMAL_POSITION)}`)
}

module.exports = geekTrustOutput