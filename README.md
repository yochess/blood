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

| Endpoint      | Action | Returns                                | Side Effect                                   | Parameters/Req Body                  |
|---------------|--------|----------------------------------------|-----------------------------------------------|--------------------------------------|
|/api/event     | GET    | Currently logged in hospital's events  | -                                             | -                                    |
|/api/event     | POST   | Created event                          | Adds event to hospital                        | time: event time                     |
|               |        |                                        |                                               | hospitalId: id of hosting hospital   |
|/api/event/:id | GET    | Event by id and participants           |                                               |                                      |
|/api/event/:id | POST   | Event by id and participants           | Logged in donor joins event                   | -                                    |
|/api/event/geo | GET    | Events in a certain area               | -                                             | minLat: Minimum latitude to search   |
|               |        |                                        |                                               | minLong: Minimum longitude to search |
|               |        |                                        |                                               | maxLat: Maximum latitude to search   |
|               |        |                                        |                                               | maxLong: Maximum longitude to search |

### Appointments

| Endpoint        | Action | Returns                                      | Side Effect                             | Parameters/Req Body                    |
|-----------------|--------|----------------------------------------------|-----------------------------------------|----------------------------------------|
|/api/appointment | GET    | Currently logged in hospital's appointments  | -                                       | -                                      |
|/api/appointment | POST   | Created appointment                          | Creates appointment for logged in donor | time: Appointment time                 |
|                 |        |                                              |                                         | hospitalId: Id of appointment hospital |
|                 |        |                                              |                                         | type: Appointment type <ul><li>1: Regular Appointment</li><li>2: Appointent with event</li><li>Appointment with bloodbuddy</li></ul> |

### Feed Posts

| Endpoint | Action | Returns                             | Side Effect                              | Parameters/Req Body                       |
|----------|--------|-------------------------------------|------------------------------------------|-------------------------------------------|
|/api/post | GET    | Currently logged in donor's profile | -                                        | minLat: Minimum latitude to search        |
|          |        |                                     |                                          | minLong: Minimum longitude to search      |
|          |        |                                     |                                          | maxLat: Maximum latitude to search        |
|          |        |                                     |                                          | maxLong: Maximum longitude to search      |
|/api/post | POST   | Currently logged in donor's profile | Post to feed as currently logged in user | content: Post Text                        |
|          |        |                                     |                                          | latitude: latitude associated with post   |
|          |        |                                     |                                          | longitude: longitude associated with post |

### Calendar

| Endpoint     | Action | Returns                   | Side Effect                                   | Parameters/Req Body                  |
|--------------|--------|---------------------------|-----------------------------------------------|--------------------------------------|
|/api/calendar | GET    | Google Appointments       | -                                             | title: appointment title             |
|              |        |                           |                                               | id: appointment id                   |
|              |        |                           |                                               | start: start date                    |
|              |        |                           |                                               | url: link to google appointment      |
|              |        |                           |                                               |                                      |
|/api/calendar | POST   | -                         | -                                             | summary: appointment title           |
|              |        |                           |                                               | start: start date                    |
|              |        |                           |                                               | end: end date                        |

### Blood Buddy Requests

| Endpoint           | Action | Returns                             | Side Effect                                            | Parameters/Req Body                    |
|--------------------|--------|-------------------------------------|--------------------------------------------------------|----------------------------------------|
|/api/bloodbuddy     | POST   | Blood buddy request info            | Creates new blood buddy request for logged in donor    | time: Desired appointment time         |
|                    |        |                                     |                                                        | hospitalId: id of appointment hospital |
|/api/bloodbuddy/:id | GET    | Blood buddy request info by id      | -                                                      | -                                      |
|/api/bloodbuddy/:id | PUT    | Blood buddy request info by id      | Creates appointments for requester and logged in donor | -                                      |

## License:

MIT
