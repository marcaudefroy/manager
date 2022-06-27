@onboardingPci @regression @test3
Feature: public cloud project creation, voucher implementation


    Scenario: The User can add a voucher by clicking on the add button
      Given The User is on the second step of the pci project creation wizard
      When The User clicks on the button "voucher" 
      And The User types a valid voucher
      And The User clicks on the button "add"
      Then The User sees the success message with the voucher amount
      And The User can't add an other voucher
      And The User can see the button to delete the voucher

    Scenario: The User can add a voucher by clicking outside
      Given The User is on the second step of the pci project creation wizard
      When The User clicks on the button "voucher" 
      And The User types a valid voucher
      And The User clicks outside of the voucher field
      Then The User sees the success message with the voucher amount
      And The User can't add an other voucher
      And The User can see the button to delete the voucher

    Scenario: The User can't add an invalid voucher
      Given The User is on the second step of the pci project creation wizard
      When The User clicks on the button "voucher" 
      And The User types an invalid voucher
      And The User clicks outside of the voucher field
      Then The User sees the voucher error message
      And The User sees that the voucher isn't added

    Scenario: The user can access the second step with a preset voucher
      Given The User access the manager public cloud projects page with a voucher parameter
      When The User clicks on the button "create a project"
      Then The User sees the first step of the pci project creation wizard
      When The User accepts the contracts
      Then The User sees the continue button enabled
      When The User clicks on continue
      Then The User is redirected to the second step
      And The User sees the success message with the voucher amount