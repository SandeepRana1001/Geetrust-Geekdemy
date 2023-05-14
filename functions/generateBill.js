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
 * @param {Boolean} hasProMembership - Whether user has membership or no 
 * @param {Boolean} isenrollmentAdded - Whether enrollment fees is added or not
 * @param {Number} membershipDiscount - Discount given only to members
 * @param {Object} couponData - Contains Coupon name and total discount
 * @param {Number} total - Total Bill Generated
 */

const generateBill = (courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {


    pattern()
    console.log(' | \t\t\t\t\t |\t Qty\t|\tCost\t|\t Amount\t\t|')
    pattern()

    for (let string of courses) {
        const str = string.split('-')
        const course = str[0]
        const qty = str[1]
        const amount = COURSES_LIST[course.toUpperCase()]
        // console.log(`|\t ${course} @ Rs.${amount} \t\t\t|\t ${qty}\t|\t ${amount} \t|\t ${qty * amount} \t \t|`)
        if (course === 'DIPLOMA' || course === 'DEGREE') {
            console.log(` |\t ${course} @Rs.${amount}  \t\t |\t ${qty}\t|\t ${amount} \t|\t ${(qty * amount).toFixed(2)}  \t| `)
        } else {
            console.log(` |\t ${course} @Rs.${amount}  \t |\t ${qty}\t|\t ${amount} \t|\t ${(qty * amount).toFixed(2)}  \t| `)
        }

        pattern()
    }

    console.log(` | \t SUB_TOTAL\t\t\t |\t\t|\t\t|\t ${subtotal.toFixed(2)} \t|`)
    pattern()

    console.log(` | \t PRO MEMBERSHIP FEE \t\t |\t\t|\t\t|\t ${hasProMembership ? 200 : `0.00`} \t \t|`)
    pattern()

    console.log(` | \t ENROLLMENT FEE \t\t |\t\t|\t\t|\t ${isenrollmentAdded ? 6666 : `0.00`} \t \t|`)
    pattern()

    console.log(` | \t TOTAL_PRO_DISCOUNT \t\t |\t\t|\t\t|\t ${membershipDiscount.toFixed(2)} \t \t|`)
    pattern()

    if (couponData.couponName === 'B4G1') {
        console.log(` | \t COUPON_DISCOUNT(${couponData.couponName}) \t\t |\t\t|\t\t|\t ${couponData.discount.toFixed(2)} \t|`)

    } else {

        console.log(` | \t COUPON_DISCOUNT(${couponData.couponName}) \t |\t\t|\t\t|\t ${couponData.discount.toFixed(2)}\t|`)
    }
    pattern()

    console.log(` | \t Total \t\t\t\t |\t\t|\t\t|\t ${total.toFixed(2)}\t|`)
    pattern()

}

module.exports = generateBill