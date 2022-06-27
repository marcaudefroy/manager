@onboardingPci @logout
Feature: public cloud project creation

    #existing customer with a registerd payement method
    @monitoring
    Scenario: clean customer with a registered paiement method "credit card"
      Given The User access the manager public cloud projects page
      When The User clicks on the button "create a project"
      Then The User sees the first step of the pci project creation wizard
      When The User accepts the contracts
      Then The User sees the continue button enabled
      When The User clicks on continue
      Then The User is redirected to the second step
      And The User sees his registered "credit card"
      When The User confirms the project creation
      Then The User sees the pending project creation loader

  # hard to test, with paypal we leave the manager
  #  @regression
  #  Scenario: clean customer with a registered paiement method "paypal" 
  #    Given The User access the manager public cloud projects page
  #    When The User clicks on the button "create a project"
  #    Then The User sees the first step of the pci project creation wizard
  #    When The User accepts the contracts
  #    Then The User sees the continue button enabled
  #    When The User clicks on continue
  #    Then The User is redirected to the second step
  #    And The User sees his registered "paypal"
  #    When The User confirms the project creation
  #    Then The User sees the pending project creation loader

    @regression @test2
    Scenario: The user can go back to the projects list
      Given The User is on the first step of the pci project creation wizard
      When The User clicks on the button "back"
      Then The User is back to the projects list

    @regression @test3
    Scenario: The user can go back to the first step of the pci project creation wizard
      Given The User is on the second step of the pci project creation wizard
      When The User clicks on the button "back"
      Then The User is back to the first step of the pci project creation wizard