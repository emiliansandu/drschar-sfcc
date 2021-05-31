@Homepage

Feature: Homepage Product Grid

  Background:
    Given User goes to homepage
    And User closes tracking modal
    Then Verify logo is visible

  Scenario: Product Grid content
    And Verify product grid contains the following items
      | datejust         |
      | submariner       |
      | presisent        |
      | daytona          |
      | gmt              |
      | skydweller       |
      | yacht-master     |
      | explorer         |
      | seadweller       |
      | cellini          |
      | vintage          |
      | milgauss         |
      | airking          |
      | tudor            |
      | date             |
      | midsize          |
      | lady datejust    |
      | lady president   |
      | lady yachtmaster |
      | lady pearlmaster |
      | lady vintage     |

    Given User clicks on 3 item
    #Removing step because UVBOBS-478
    #Then Verify the PLP from selected grid item is displayed
    And Verify the PLP from selected grid matches quantity items

