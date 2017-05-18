# Simply Managed Mobile

## Back-End Capstone Mobile Application: Inventory Session Scanner

## Links to Front End Repos:
  [API](https://github.com/lukeschuyler/inventory-mobile-API) 
  [Web](https://github.com/lukeschuyler/web-inventory)
  
## About
A simple mobile app that provides the ability to scan products without the esoteric use of a price gun. The progression of the sessions
is largely based on a real retail inventory (I have experience at Whole Foods)

1. User can enter the app and initiate one of four sessions: Inventory, Waste, Receiving, Sales.

2. This initiates a session, and then a user can start scanning barcodes that are on the product list. If a product is not in the list,
the user gets a toast saying 'Product Not Found'. On the Web application, the user can add he product via Amazon API. 
(In v2 I would like to add this ability to the mobile).

3. When the session is complete, user can press the review button. They can then edit any of the items. If they are satisfied, 
they can upload the session. This takes them back to the Home screen.


## Technologies

1. React-Native
2. Axios
3. React-Native QRCode-Scanner

