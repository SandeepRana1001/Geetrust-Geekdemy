const fs = require('fs');
const { COURSES_LIST, MEMBERSHIP_FEE, ENROLLMENT_CHARGES } = require('./globalVariables')
const Utility = require('./utility/utils')

const utils = new Utility();

const billChoice = require('./functions/billChoice');

console.clear()

const filename = process.argv[2]

if (filename === undefined) {
    console.log('Cannot Locate The Input File. Please add complete file path with location.')
    console.log('For eg: inputFolder\\filename.fileExtension')
    return;
}

fs.readFile(filename, "utf8", (err, fileData) => {
    /*if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    */

    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const courses = [], ADD_PRO_MEMBERSHIP = 'ADD_PRO_MEMBERSHIP'
    let total = 0, quantityCounter = 0, subtotal = 0, membershipDiscount = 0, hasProMembership = false, isenrollmentAdded = false, coupon = '', couponData = {}


    // Process the incoming data
    const inputs = fileData.replaceAll('\r', '').split('\n')
    hasProMembership = inputs.includes(ADD_PRO_MEMBERSHIP)

    for (let input of inputs) {
        input = input.split(' ')

        let type = input[0] // type of file

        if (type === 'ADD_PROGRAMME') {

            let quantity = input[2] // quantity
            let courseName = input[1] // courseName
            courses.push(courseName + '-' + quantity)

            quantityCounter += parseInt(quantity)
            const membershipData = utils.checkAndCalculateMembershipDiscount(hasProMembership, courseName, quantity)

            subtotal += membershipData.totalPrice
            membershipDiscount += membershipData.proDiscount


        } else if (type === 'APPLY_COUPON') {

            if (coupon === 'DEAL_G20' && input[1] === 'DEAL_G5') {
                coupon = 'DEAL_G20'
            } else {
                coupon = input[1]
            }

        } else if (type === 'ADD_PRO_MEMBERSHIP') {

            hasProMembership = true

        }
    }


    // check if proMembership is present

    if (hasProMembership) {
        subtotal += MEMBERSHIP_FEE
    }



    couponData = utils.getCoupon(quantityCounter, coupon, subtotal, hasProMembership)
    const discount = couponData.discount

    total = subtotal - discount

    if (utils.isEnrollmentFeeRequired(total)) {
        total += ENROLLMENT_CHARGES
        isenrollmentAdded = true
    }

    billChoice(subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)



})
