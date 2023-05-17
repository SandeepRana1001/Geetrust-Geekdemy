const readline = require('readline');
const { FIXED_DECIMAL_POSITION, isMembershipRequired, isEnrollmentFeeRequired } = require('../globalVariables')

const generateBill = require('./generateBill');
const geekTrustOutput = require('./geekTrustOutput')

const INVALID_INPUT = 'Invalid Input Provided'

const PROMPTS = ['Welcome To The Billing System \n ', '1. Geektrust Output Format', '2. Proper Bill Format']

const QUESTION = '\nPlease select a bill format : '
const OPTIONS = {
    'ONE': '1',
    'TWO': '2'
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


const billChoice = (courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    for (let prompt of PROMPTS) {
        console.log(prompt);
    }


    const PRO_MEMBERSHIP_FEE = isMembershipRequired(hasProMembership)
    const ENROLLMENT_FEE = isEnrollmentFeeRequired(isenrollmentAdded)



    rl.question(QUESTION, (answer) => {

        console.clear()

        switch (answer) {
            case OPTIONS.ONE:
                geekTrustOutput(subtotal, PRO_MEMBERSHIP_FEE, ENROLLMENT_FEE, membershipDiscount, couponData, total)
                break;

            case OPTIONS.TWO:
                generateBill(courses, COURSES_LIST, subtotal, PRO_MEMBERSHIP_FEE, ENROLLMENT_FEE, membershipDiscount, couponData, total)
                break;

            default:
                console.log(INVALID_INPUT)
                break;
        }

        rl.close()

    });
}


module.exports = billChoice