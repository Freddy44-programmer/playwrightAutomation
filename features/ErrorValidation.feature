Feature: Greeting

		Scenario Outline: Say hello
		Given a login to Ecommerce2 application with "<username>" and "<password>"
		Then Verify Error message is displayed

		 Examples:
          | username    	  | 	password  |
          | rangataft08@gmail.com | @12345Ft   |
       

