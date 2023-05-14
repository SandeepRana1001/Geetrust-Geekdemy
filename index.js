const fs = require('fs');
const path = require('path')
const COURSES_LIST = require('./courses')
const { isEnrollmentFeeRequired, calculatePrice, calculateMembershipDiscount, getCoupon } = require('./utility/utils')

const generateBill = require('./functions/generateBill')

console.clear()

const dir = path.join(__dirname, 'input.txt')


let total = 0
const courses = []
let couponData = {}
let qtyCounter = 0, coupon = '', hasProMembership = false, isenrollmentAdded = false, subtotal = 0, membershipDiscount = 0

fs.readFile(dir, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Process the data
    const arr = data.replaceAll('\r', '').split('\n')

    for (let val of arr) {
        val = val.split(' ')
        let type = val[0]
        if (type === 'ADD_PROGRAMME') {
            let qty = val[2]
            let certificate = val[1]
            courses.push(certificate + '-' + qty)
            qtyCounter += parseInt(qty)
            subtotal += calculatePrice(certificate, qty)
        } else if (type === 'APPLY_COUPON') {
            coupon = val[1]
        } else if (type === 'ADD_PRO_MEMBERSHIP') {
            hasProMembership = true
        }
    }

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