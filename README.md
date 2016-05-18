# Bloodshare

[![Build Status](https://travis-ci.org/britishchicken/blood.svg?branch=master)](https://travis-ci.org/britishchicken/blood)

## Contributors:

  Vinitha S Raja

  John Boucherie

  Drake Wang

  Travis Baratacart

## Api Endpoints

### Donor Profiles

| Endpoint        | Action | Returns                             | Side Effect                                | Parameters/Req Body                  |
|-----------------|--------|-------------------------------------|--------------------------------------------|--------------------------------------|
|/api/profile     | GET    | Currently logged in donor's profile | -                                          | -                                    |
|/api/profile     | PUT    | Currently logged in donor's profile | Update currently logged in donor's profile | Profile fields to change             |
|/api/profile/:id | GET    | Donor profile by id                 | -                                          | -                                    |
|/api/geo         | GET    | Donors who live in a certain area   | -                                          | minLat: Minimum latitude to search   |
|                 |        |                                     |                                            | minLong: Minimum longitude to search |
|                 |        |                                     |                                            | maxLat: Maximum latitude to search   |
|                 |        |                                     |                                            | maxLong: Maximum longitude to search |

### Hospital Profiles
| Endpoint                 | Action | Returns                                | Side Effect                                   | Parameters/Req Body                  |
|--------------------------|--------|----------------------------------------|-----------------------------------------------|--------------------------------------|
|/api/hospital/profile     | GET    | Currently logged in hospital's profile | -                                             | -                                    |
|/api/hospital/profile     | PUT    | Currently logged in hospital's profile | Update currently logged in hospital's profile | Profile fields to change             |
|/api/hospital/profile/:id | GET    | Hospital profile by id                 | -                                             | -                                    |
|/api/hospital/geo         | GET    | Hospitals in a certain area            | -                                             | minLat: Minimum latitude to search   |
|                          |        |                                        |                                               | minLong: Minimum longitude to search |
|                          |        |                                        |                                               | maxLat: Maximum latitude to search   |
|                          |        |                                        |                                               | maxLong: Maximum longitude to search |
|/api/hospital/:id/reviews | GET    | Hospital reviews by id                 | -                                             | -                                    |
|/api/hospital/:id/reviews | POST   | Created review                         | Creates review for hospital by id             | Content: Review text                 |
|                          |        |                                        |                                               | Stars: Number of stars for review    |

### Events

### Appointments

### Feed Posts

### Calendar

### Blood Buddy Requests

## License:

MIT
