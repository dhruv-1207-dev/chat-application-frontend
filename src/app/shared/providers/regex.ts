export enum Regex {
    name = '^[a-zA-Z ]*$',
    phone = '^[0-9]*$',
    otp = '[0-9]\\d{5}',
    amount = '^([0-9]+(\.[0-9]+)?)',
    numeric = '^[0-9]*\.?[0-9]+$',
    alpha_spaces = '^[a-zA-Z ]+$',
    alpha_numeric = '^[A-Z0-9]+$',
    email = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
    mobile = '^[0-9]{10,10}$',
    url = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
    zipcode = '^[0-9]{6}(?:-[0-9]{4})?$',
    password_validation = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    countryCode = '+91',
    single = 'single',
    zero = 0,
    oneto100 = '^[1-9][0-9]?$|^100$',
    oneto10 = '^(?:[1-9]|0[1-9]|10)$'
  }
  