export const isValidFirstName = (stringFisrtName) => (/^[a-zA-Z]+[a-zA-Z]+$/.test(stringFisrtName))

export const isValidLastName = (stringLastName) => (/^[a-zA-Z]+[a-zA-Z]+$/.test(stringLastName))

export const isValidEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
                                       

// export const isValidPassword = (stringPassword) 
//     => stringPassword.length >= 3 
