@monitoring @pciTermination
Feature: public cloud project termination

  @testPci
  Scenario: generate a termination request
    Given The User access the manager public cloud projects page
    When The User requests a project termination
    Then The User sees a confirmation message

  @validatePciTermination
  Scenario: Confirm the project termination throught the email link
    Given The User access the termination page
    When The User validates the termination form
    Then The User sees a confirmation message