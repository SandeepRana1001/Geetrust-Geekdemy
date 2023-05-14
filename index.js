const fs = require('fs');
const path = require('path')
console.clear()

const dir = path.join(__dirname, 'input.txt')



let total = 0
const cart = [], courses = []
let qtyCounter = 0, coupon = '', hasProMembership = false, isenrollmentAdded = false
const COURSES = {
    'CERTIFICATION': 3000,
    'DEGREE': 5000,
    'DIPLOMA': 2500
}

const getPrice = (course, qty) => {

    return COURSES[course.toUpperCase()] * qty
}

const findMin = () => {
    let min = Infinity
    for (let val of courses) {
        min = Math.min(min, COURSES[val.toUpperCase()])
    }
    console.log(min)
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
            total += getPrice(certificate, qty)
        } else if (type === 'APPLY_COUPON') {
            coupon = val[1]
        } else if (type === 'ADD_PRO_MEMBERSHIP') {
            hasProMembership = true
        }
    }


    if (hasProMembership) {
        total = getMembershipDiscount(courses).total
        let discount = getMembershipDiscount(courses).proDiscount
        total += 200
        console.log('Membership Total = ' + total)
        console.log('Membership discount = ' + discount)
    }

    const { couponName, discount } = getCoupon(qtyCounter, coupon, total)
    console.log('Total = ' + total)
    console.log('Coupon Name = ' + couponName)
    console.log('Discount = ' + discount)
    total = total - discount
    console.log(isenrollmentAdded)
    if (getEnrollmentFees(total)) {
        total += 6666
    }
    console.log('Total After Discount = ' + total)

});