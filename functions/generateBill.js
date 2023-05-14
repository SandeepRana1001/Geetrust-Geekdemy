const generateBill = (courses, COURSES_LIST, subtotal, hasProMembership, isenrollmentAdded, membershipDiscount, couponData, total) => {

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
        const amount = COURSES_LIST[course.toUpperCase()]
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

module.exports = generateBill