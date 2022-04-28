@regression
Feature: manager hub home page

    Background:
      Given The User access the manager home page

      @EU @CA
      Scenario: The User can consult his renewal actions
        When The User clicks on his product renewal dropdown button
        Then The User sees the renewal management options links

      @EU @CA
      Scenario: confirm link to all orders list
        Then The User confirms the EU and CA available actions links are correct
