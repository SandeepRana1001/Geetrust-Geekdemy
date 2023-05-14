/**
 * Generate Subtotal including course and applied discount
 * @param {Number} subtotal - Subtotal of all the courses in cart
 * @param {Boolean} hasProMembership - Whether user has membership or no 
 * @param {Boolean} isenrollmentAdded - Whether enrollment fees is added or not
 * @param {Number} membershipDiscount - Discount given only to members
 * @param {Object} couponData - Contains Coupon name and total discount
 * @param {Number} total - Total Bill Generated
 */

const geekTrustOutput = (subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {

    console.log(`SUB_TOTAL \t\t ${subtotal.toFixed(2)}`)
    console.log(`COUPON_DISCOUNT \t ${couponData.couponName} ${couponData.discount.toFixed(2)}`)
    console.log(`TOTAL_PRO_DISCOUNT \t ${membershipDiscount.toFixed(2)}`)
    console.log(`PRO MEMBERSHIP FEE \t ${hasProMembership ? 200 : `0.00`}`)
    console.log(`ENROLLMENT_FEE \t\t ${isenrollmentAdded ? 6666 : `0.00`}`)
    console.log(`TOTAL \t\t\t ${total.toFixed(2)}`)
}

module.exports = geekTrustOutput