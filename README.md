# Bloodshare

[![Build Status](https://travis-ci.org/britishchicken/blood.svg?branch=master)](https://travis-ci.org/britishchicken/blood)

## Contributors:

  [Vinitha S Raja](https://github.com/vinithasraja/)

  [John Boucherie](https://github.com/jboucherie/)

  [Drake Wang](https://github.com/yochess/)

  [Travis Baratacart](https://github.com/travisbaratcart/)

## Getting Started

1. Install [MySQL](https://dev.mysql.com/downloads/installer/)
2. Install [Node and NPM](https://nodejs.org/en/)
3. Install Bower
```
$ npm install -g bower
```
4. Install dependencies
```
$ npm install
$ bower install
```
5. Create serverconfig.js in root directory which exports the following:
- fbapikey: Facebook API key
- fbapisecret: Facebook API secret
- sqluid: MySQL login username
- sqlpw: MySQL login password
- calendarsecret: Google Calendar API secret
- calendarurl: Google Calendar callback url
- sessionsecret: Secret used for sessions
- sessionkey: Key used for sessions

## File Structure

```
bloodshare
  |
  + client
  | |
  | + assets
  | |
  | + [feature]
  | | |
  | | -- [feature].html
  | | |
  | | -- [feature]_controller.js
  | | |
  | | -- [feature]_service.js
  | |
  | + styles
  | | |
  | | -- styles.css
  | |
  | -- app.js
  | |
  | -- index.ejs
  |
  + server
  | |
  | + routes
  | | |
  | | -- [route].js
  | |
  | + controllers
  | | |
  | | -- [route].js
  | |
  | + test
  | | |
  | | -- [route].js
  | |
  | -- server.js
  |
  -- serverconfig.js

```

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
|/api/calendar | GET    | Google Appointments       | Updates calendar with google appointments     | title: appointment title             |
|              |        |                           |                                               | id: appointment id                   |
|              |        |                           |                                               | start: start date                    |
|              |        |                           |                                               | url: link to google appointment      |
|              |        |                           |                                               |                                      |
|/api/calendar | POST   | -                         | Create google appointment                     | summary: appointment title           |
|              |        |                           |                                               | start: start time                    |
|              |        |                           |                                               | end: end time                        |

### Blood Buddy Requests

| Endpoint           | Action | Returns                             | Side Effect                                            | Parameters/Req Body                    |
|--------------------|--------|-------------------------------------|--------------------------------------------------------|----------------------------------------|
|/api/bloodbuddy     | POST   | Blood buddy request info            | Creates new blood buddy request for logged in donor    | time: Desired appointment time         |
|                    |        |                                     |                                                        | hospitalId: id of appointment hospital |
|/api/bloodbuddy/:id | GET    | Blood buddy request info by id      | -                                                      | -                                      |
|/api/bloodbuddy/:id | PUT    | Blood buddy request info by id      | Creates appointments for requester and logged in donor | -                                      |

## License:

MIT
