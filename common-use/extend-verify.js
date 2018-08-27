'use strict';

var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

var ExtendVerifys = {
    errorDisplayed: function () {
        expect(browser.isElementPresent(element(by.css('.alert.alert-danger')))).toBeTruthy("error message exists");
    },
    SAPPaymentModeMessage: function(){
        expect(browser.isElementPresent(element(by.css('.advanced_payment_mode_no_sap')))).toBeTruthy("SAP INFO message exists");
    },

    noSAPPaymentModeMessage: function(){
        expect(browser.isElementPresent(element(by.css('.advanced_payment_mode_no_sap')))).toBeFalsy("SAP INFO message not exists");
    },
    isValid: function (element) {
        expect(hasClass(element, 'ng-invalid')).toBeFalsy("invalid value");
    },

    isFormValid: function (form) {
        hasClass(form, "ng-invalid").then(function (v) {
            if (v) {
                $('.alert-danger span').getText().then(console.error);
            }
            expect(v).toBeFalsy("form invalid");
        });

    },

    isValidClaimReference: function (ref, toFail) {
        var matcher = /^\d{2}[A-Z]{5}\d{5,6}$/;
        console.log("Perform check if Claim Reference [" + ref + "] is valid.");

        if (ref === undefined || ref === null) {
            expect(ref).toEqual("a valid ClaimReference", "Claim Reference is not defined.");
            if (toFail) {
                throw new Error("Claim Reference must be defined - cannot continue.");
            }
        }
        var matching = ref.match(matcher);

        if (matching === undefined || matching === null || matching.length !== 1) {
            expect(ref).toEqual("a valid ClaimReference", "A valid Claim Reference is required.");
            if (toFail) {
                throw new Error("A valid Claim Reference must be defined - cannot continue with invalid reference [" + ref + "].");
            }
        }
        else if (matching.length === 1) {
            console.log("Check Successful. Claim Reference is valid [" + ref +"]");
            return;
        }
    }
}

module.exports = ExtendVerifys;





