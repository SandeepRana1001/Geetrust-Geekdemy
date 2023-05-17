const COURSES_LIST = {
    'CERTIFICATION': 3000,
    'DEGREE': 5000,
    'DIPLOMA': 2500
}

const FIXED_DECIMAL_POSITION = 2

const MEMBERSHIP_FEE = 200
const ENROLLMENT_CHARGES = 6666
const DEFAULT_FEE = 0

/**
 * Checks whether membership plan is added or not
 * @param {Boolean} hasProMembership 
 * @returns {Integer} MEMBERSHIP_FEE if true and DEFAULT_FEE otherwise
 */

const isMembershipRequired = (hasProMembership) => {
    if (hasProMembership) {
        return MEMBERSHIP_FEE
    }
    return DEFAULT_FEE
}


/**
 * Checks whether enrollment plan is required or not
 * @param {Boolean} isenrollmentAdded 
 * @returns {Integer} ENROLLMENT_CHARGES if true and DEFAULT_FEE otherwise
 */

const isEnrollmentFeeRequired = (isenrollmentAdded) => {
    if (isenrollmentAdded) {
        return ENROLLMENT_CHARGES
    }
    return DEFAULT_FEE
}


module.exports = {
    COURSES_LIST,
    FIXED_DECIMAL_POSITION,
    isMembershipRequired,
    isEnrollmentFeeRequired,
    MEMBERSHIP_FEE,
    ENROLLMENT_CHARGES,
}