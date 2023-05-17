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

    const courses = []
    let total = 0, quantityCounter = 0, subtotal = 0, membershipDiscount = 0, hasProMembership = false, isenrollmentAdded = false, coupon = '', couponData = {}

    // Process the incoming data
    const inputs = fileData.replaceAll('\r', '').split('\n')

    for (let input of inputs) {
        input = input.split(' ')

        let type = input[0] // type of file

        if (type === 'ADD_PROGRAMME') {

            let quantity = input[2] // quantity
            let courseName = input[1] // courseName
            courses.push(courseName + '-' + quantity)

            quantityCounter += parseInt(quantity)
            subtotal += utils.calculatePrice(courseName, quantity)

        } else if (type === 'APPLY_COUPON') {

            coupon = input[1]

        } else if (type === 'ADD_PRO_MEMBERSHIP') {

            hasProMembership = true

        }
    }

    // check if proMembership is present

    if (hasProMembership) {
        const membership_data = utils.calculateMembershipDiscount(courses)
        total = membership_data.total
        membershipDiscount = membership_data.proDiscount
        total += MEMBERSHIP_FEE
    }

    couponData = utils.getCoupon(quantityCounter, coupon, subtotal)
    const discount = couponData.discount

    total = subtotal - discount

    if (utils.isEnrollmentFeeRequired(total)) {
        total += ENROLLMENT_CHARGES
    }

    billChoice(courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)



})
