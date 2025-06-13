Feature: Ecommerce Validation

  Scenario: Placing the Order
    Given a login to the Ecommerce application with "rangataft08@gmail.com" and "@12345Ft"
    When Add "zara coat 3" to the cart
    Then Verify "zara coat 3" is displayed in the cart
    When Enter valid details and  Place the order
    Then Verify the order is presented in the order history

 

