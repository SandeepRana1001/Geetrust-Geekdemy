const fs = require('fs');
const path = require('path')
const COURSES = require('./courses')

console.clear()

const dir = path.join(__dirname, 'input.txt')



let total = 0
const cart = [], courses = []
let couponData = {}
let qtyCounter = 0, coupon = '', hasProMembership = false, isenrollmentAdded = false, subtotal = 0, membershipDiscount = 0
// const COURSES = {
//     'CERTIFICATION': 3000,
//     'DEGREE': 5000,
//     'DIPLOMA': 2500
// }

const getPrice = (course, qty) => {

    return COURSES[course.toUpperCase()] * qty
}

const findMin = () => {
    let min = Infinity
    for (let val of courses) {
        min = Math.min(min, COURSES[val.toUpperCase()])
    }
    return min
}

const getCoupon = (qtyCounter, coupon = '', total) => {

    if (coupon.trim().length > 0) {

        if (total >= 10000) {
            const discount = (total * 20) / 100
            return {
                couponName: 'DEAL_G20',
                discount
            }
        } else if (qtyCounter >= 2) {
            const discount = (total * 5) / 100
            return {
                couponName: 'DEAL_G5',
                discount
            }
        }


    } else {
        if (qtyCounter >= 4) {
            // find course with min price
            let min = findMin()
            return {
                couponName: 'B4G1',
                discount: min
            }
        }
    }

    return {
        couponName: '',
        discount: 0
    }

}

const getEnrollmentFees = (total) => {
    if (total < 6666) {
        isenrollmentAdded = true
    }
    return isenrollmentAdded
}

const getMembershipDiscount = (courses) => {
    let total = 0, proDiscount = 0
    for (let string of courses) {
        let discount = 0
        const str = string.split('-')
        const course = str[0].toUpperCase()
        const qty = str[1]
        let prices = COURSES[course] * qty
        if (course === 'CERTIFICATION') {
            discount = 0.02
        } else if (course === 'DEGREE') {
            discount = 0.03
        } else if (course === 'DIPLOMA') {
            discount = 0.01
        }
        proDiscount = proDiscount + (prices * discount)
        prices = prices - (prices * discount)
        total += prices
    }
    return { total, proDiscount }
}


const generateBill = () => {

    /**
     * Generate Subtotal including course and applied discount
     *  */
    console.log(' ________________________________________________________________________________________________')
    console.log(' | \t\t\t\t\t |\t Qty\t|\tCost\t|\t Amount\t\t|')
    console.log(' ________________________________________________________________________________________________')
    for (let string of courses) {
        let discount = 0
        const str = string.split('-')
        const course = str[0]
        const qty = str[1]
        const amount = COURSES[course.toUpperCase()]
        // console.log(`|\t ${course} @ Rs.${amount} \t\t\t|\t ${qty}\t|\t ${amount} \t|\t ${qty * amount} \t \t|`)
        if (course === 'DIPLOMA' || course === 'DEGREE') {
            console.log(` |\t ${course} @Rs.${amount}  \t\t |\t ${qty}\t|\t ${amount} \t|\t ${qty * amount}  \t\t| `)
        } else {
            console.log(` |\t ${course} @Rs.${amount}  \t |\t ${qty}\t|\t ${amount} \t|\t ${qty * amount}  \t\t| `)
        }

        console.log(' ________________________________________________________________________________________________')
    }

    console.log(` | \t SUB_TOTAL\t\t\t |\t\t|\t\t|\t ${subtotal} \t \t|`)
    console.log(' ________________________________________________________________________________________________')

    console.log(` | \t PRO MEMBERSHIP FEE \t\t |\t\t|\t\t|\t ${hasProMembership ? 200 : 0.00} \t \t|`)
    console.log(' ________________________________________________________________________________________________')

    console.log(` | \t ENROLLMENT FEE \t\t |\t\t|\t\t|\t ${isenrollmentAdded ? 6666 : 0.00} \t \t|`)
    console.log(' ________________________________________________________________________________________________')

    console.log(` | \t TOTAL_PRO_DISCOUNT \t\t |\t\t|\t\t|\t ${membershipDiscount} \t \t|`)
    console.log(' ________________________________________________________________________________________________')

    console.log(` | \t COUPON_DISCOUNT(${couponData.couponName}) \t |\t\t|\t\t|\t ${couponData.discount} \t\t|`)
    console.log(' ________________________________________________________________________________________________')

    console.log(` | \t Total \t\t\t\t |\t\t|\t\t|\t ${total} \t\t|`)
    console.log(' ________________________________________________________________________________________________')


}


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
            subtotal += getPrice(certificate, qty)
        } else if (type === 'APPLY_COUPON') {
            coupon = val[1]
        } else if (type === 'ADD_PRO_MEMBERSHIP') {
            hasProMembership = true
        }
    }

    if (hasProMembership) {
        total = getMembershipDiscount(courses).total
        membershipDiscount = getMembershipDiscount(courses).proDiscount
        total += 200
    }

    couponData = getCoupon(qtyCounter, coupon, subtotal)
    const couponName = couponData.couponName
    const discount = couponData.discount

    total = subtotal - discount
    if (getEnrollmentFees(total)) {
        total += 6666
    }

    generateBill()

});