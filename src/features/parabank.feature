@parabank @ui
Feature: ParaBank end-to-end user flows
  As a user of the ParaBank demo site
  I want to register, login, open accounts, transfer funds and pay bills
  So that the site behaves as expected for core banking flows

  Background: User opens ParaBank home page
    #Given User open the ParaBank home page


  #@happy-path @open-account
  #Scenario: Verify Login and Global navigation menu after user registration
   # Given User open the ParaBank home page
    #When User register a new unique user
    #And User login with the newly created user
    #Then User should be logged in successfully
    #Then Verify if the Global navigation menu in home page is working as expected


    @happy-path @open-account
    Scenario: Verify Open New Account functionality- Savings account
      Given User open the ParaBank home page
      When User register a new unique user
      And User login with the newly created user
      Then User should be logged in successfully
      When User navigates to Open New Account page with type as "Savings Account"
      And User creates a new Savings account from an existing account
      Then A new Savings account should be created successfully with a unique account number
    
   