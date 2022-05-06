@regression @onboardingPci
Feature: public cloud project creation

    Background:
      Given The User access the manager public cloud projects page

      #existing customer with a registerd payement method
      @logout
      Scenario Outline: clean customer with a registered paiement method "<payment method>"
        When The user clicks on the button "create a project"
        Then The user sees the first step of the pci project creation wizard
        When The user accepts the contracts
        Then The user sees the continue button enabled
        When The user clicks on continue
        Then The user is redirected to the second step
        And The user sees his registered "<payment method>"
        When The user confirms the project creation
        Then The user sees the pending project creation loader
        Examples:
          | payment method |
          | credit card    |