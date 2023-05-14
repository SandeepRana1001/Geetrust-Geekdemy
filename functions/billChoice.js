const readline = require('readline');
const generateBill = require('./generateBill');
const geekTrustOutput = require('./geekTrustOutput')

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


const billChoice = (courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Welcome To The Billing System \n ')
    console.log('1. Geektrust Output Format')
    console.log('2. Proper Bill Format')


    rl.question('\nPlease select a bill format : ', (answer) => {

        console.clear()

        switch (answer) {
            case '1':
                geekTrustOutput(subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)
                break;

            case '2':
                generateBill(courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)
                break;

            default:
                break;
        }

        rl.close()

    });
}


module.exports = billChoice