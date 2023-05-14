const fs = require('fs');
const path = require('path')
const readline = require('readline');

const COURSES_LIST = require('./courses')
const {
    isEnrollmentFeeRequired,
    calculatePrice,
    calculateMembershipDiscount,
    getCoupon
} = require('./utility/utils')

const generateBill = require('./functions/generateBill')

console.clear()


// get filename from CLI

const fileName = process.argv[2]

if (fileName === undefined) {
    console.log('Cannot Locate The Input File. Please add complete file path with location.')
    console.log('For eg: inputFolder\\filename.fileExtension')
    return;
}

// check if path is provided or not

let directory = __dirname
let dir;

if (!fileName.includes(directory)) {
    dir = path.join(__dirname, fileName)
} else {
    dir = fileName
}


let total = 0
const courses = []
let couponData = {}
let qtyCounter = 0, coupon = '', hasProMembership = false, isenrollmentAdded = false, subtotal = 0, membershipDiscount = 0

fs.readFile(dir, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

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
            subtotal += calculatePrice(courseName, qty)

        } else if (type === 'APPLY_COUPON') {

            coupon = val[1]

        } else if (type === 'ADD_PRO_MEMBERSHIP') {

            hasProMembership = true

        }
    }

    // check if proMembership is present

    if (hasProMembership) {
        const membership_data = calculateMembershipDiscount(courses)
        total = membership_data.total
        membershipDiscount = membership_data.proDiscount
        total += 200
    }

    couponData = getCoupon(qtyCounter, coupon, subtotal)
    const discount = couponData.discount

    total = subtotal - discount

    if (isEnrollmentFeeRequired(total)) {
        total += 6666
    }

    generateBill(courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total)

});