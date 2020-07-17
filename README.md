# Phoenix application

Notes:

- The 'leviathan' api is PITA to contend with and would benefit from the following app design 

https://github.com/phongnguyend/Practical.CleanArchitecture/blob/master/docs/imgs/the-clean-architecture.png

- Doing a CQRS design is another approach, but with the data 'eventually' being in sync, could create more trouble than its worth with the customer and legalities.

- I would also design the front end to be a PWA, with offline mode available.

- Current api could also do event queuing as well and store the data in a offline sqlLite or mongoDB storage in the case of downtime or app scale or restart.

## Setup

Clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
