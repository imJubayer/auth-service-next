/**
 * Password validator for login pages
 */

// has number
const hasNumber: any = number => new RegExp(/[0-9]/).test(number)

// has mix of small and capitals
const hasMixed: any = number =>
    new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number)

// has special chars
const hasSpecial: any = number => new RegExp(/[!#@$%^&*)(+=._-]/).test(number)

const value = {
    errorMain: 'red', // Replace with your desired color
    warningDark: 'yellow', // Replace with your desired color
    orangeMain: 'orange', // Replace with your desired color
    successMain: 'green', // Replace with your desired color
}
// set color based on password strength
export const strengthColor: any = count => {
    if (count < 2) return { label: 'Poor', color: value.errorMain }
    if (count < 3) return { label: 'Weak', color: value.warningDark }
    if (count < 4) return { label: 'Normal', color: value.orangeMain }
    if (count < 5) return { label: 'Good', color: value.successMain }
    if (count < 6) return { label: 'Strong', color: value.successMain }
    return { label: 'Poor', color: value.errorMain }
}

// password strength indicator
export const strengthIndicator: any = number => {
    let strengths = 0
    if (number.length > 5) strengths += 1
    if (number.length > 7) strengths += 1
    if (hasNumber(number)) strengths += 1
    if (hasSpecial(number)) strengths += 1
    if (hasMixed(number)) strengths += 1
    return strengths
}
