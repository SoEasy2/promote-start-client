const decline_codes = {
    key: 'decline_code',
    messages: {
        authentication_required: 'The card was declined as the transaction requires authentication',
        approve_with_id: 'The payment can’t be authorized',
        call_issuer: 'The card was declined for an unknown reason',
        card_not_supported: 'The card does not support this type of purchase',
        card_velocity_exceeded: 'The customer has exceeded the balance or credit limit available on their card',
        currency_not_supported: 'The card does not support the specified currency',
        do_not_honor: 'The card was declined for an unknown reason',
        do_not_try_again: 'The card was declined for an unknown reason',
        duplicate_transaction: 'A transaction with identical amount and credit card information was submitted very recently',
        expired_card: 'The card has expired',
        fraudulent: 'The payment was declined because Stripe suspects that it’s fraudulent',
        generic_decline: 'The card was declined for an unknown reason or possibly triggered by a blocked payment rule',
        incorrect_number: 'The card number is incorrect',
        incorrect_cvc: 'The CVC number is incorrect',
        incorrect_pin: 'The PIN entered is incorrect. This decline code only applies to payments made with a card reader',
        incorrect_zip: 'The postal code is incorrect',
        insufficient_funds: 'The customer’s account has insufficient funds to cover this payment',
        invalid_account: 'The card, or account the card is connected to, is invalid',
        invalid_amount: 'The payment amount is invalid, or exceeds the amount that’s allowed',
        invalid_cvc: 'The CVC number is incorrect',
        invalid_expiry_month: 'The expiration month is invalid',
        invalid_expiry_year: 'The expiration year is invalid',
        invalid_number: 'The card number is incorrect',
        invalid_pin: 'The PIN entered is incorrect. This decline code only applies to payments made with a card reader',
        issuer_not_available: 'The card issuer couldn’t be reached, so the payment couldn’t be authorized',
        lost_card: 'The payment was declined because the card is reported lost',
        merchant_blacklist: 'The payment was declined because it matches a value on the Stripe user’s block list',
        new_account_information_available: 'The card, or account the card is connected to, is invalid',
        no_action_taken: 'The card was declined for an unknown reason',
        not_permitted: 'The payment isn’t permitted',
        offline_pin_required: 'The card was declined because it requires a PIN',
        online_or_offline_pin_required: 'The card was declined as it requires a PIN',
        pickup_card: 'The customer can’t use this card to make this payment (it’s possible it was reported lost or stolen)',
        pin_try_exceeded: 'The allowable number of PIN tries was exceeded',
        processing_error: 'An error occurred while processing the card',
        reenter_transaction: 'The payment couldn’t be processed by the issuer for an unknown reason',
        restricted_card: 'The customer can’t use this card to make this payment (it’s possible it was reported lost or stolen)',
        revocation_of_all_authorizations: 'The card was declined for an unknown reason',
        revocation_of_authorization: 'The card was declined for an unknown reason',
        security_violation: 'The card was declined for an unknown reason',
        service_not_allowed: 'The card was declined for an unknown reason',
        stolen_card: 'The payment was declined because the card is reported stolen',
        stop_payment_order: 'The card was declined for an unknown reason',
        testmode_decline: 'A Stripe test card number was used',
        transaction_not_allowed: 'The card was declined for an unknown reason',
        try_again_later: 'The card was declined for an unknown reason',
        withdrawal_count_limit_exceeded: 'The customer has exceeded the balance or credit limit available on their card',
    },
}

export const CARD_ERROR_CODES = [
    decline_codes,
]
