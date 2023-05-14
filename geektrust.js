const fs = require('fs');
const path = require('path')
const COURSES_LIST = require('./courses')
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

fs.readFile(filename, "utf8", (err, data) => {
    /*if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands
    */

    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const courses = []
    let total = 0, qtyCounter = 0, subtotal = 0, membershipDiscount = 0, hasProMembership = false, isenrollmentAdded = false, coupon = '', couponData = {}

    // Process the incoming data
    const arr = data.replaceAll('\r', '').split('\n')

    for (let val of arr) {
        val = val.split(' ')

        let type = val[0] // type of file

        if (type === 'ADD_PROGRAMME') {

            let qty = val[2] // quantity
            let courseName = val[1] // courseName
            courses.push(courseName + '-' + qty)

            qtyCounter += parseInt(qty)
            subtotal += utils.calculatePrice(courseName, qty)

        } else if (type === 'APPLY_COUPON') {

            coupon = val[1]

        } else if (type === 'ADD_PRO_MEMBERSHIP') {

            hasProMembership = true

        }
    }

    // check if proMembership is present

    if (hasProMembership) {
        const membership_data = utils.calculateMembershipDiscount(courses)
        total = membership_data.total
        membershipDiscount = membership_data.proDiscount
        total += 200
    }

    couponData = utils.getCoupon(qtyCounter, coupon, subtotal)
    const discount = couponData.discount

    total = subtotal - discount

    if (utils.isEnrollmentFeeRequired(total)) {
        total += 6666
    }

    billChoice(courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)



})
