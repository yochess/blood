use blood;

insert into hospitals
(username, password, name, address, email, phonenum, hospitalurl, createdat, updatedat)
values
('drake', 'password', 'drake hospital', '123 fake street', 'drake@hospital.com', '1111111111', 'www.drake.com', now(), now())
;

insert into schedules
(day, openhours, closehours, createdat, updatedat, hospitalid)
values
(1, 8, 17, now(), now(), 1),
(2, 8, 17, now(), now(), 1),
(3, 8, 17, now(), now(), 1),
(4, 8, 17, now(), now(), 1),
(5, 8, 14, now(), now(), 1),
(6, 11, 12, now(), now(), 1),
(7, null, null, now(), now(), 1)
;

-- insert into appointments
--   (time , createdAt, updatedAt, hospitalId, donorId )
--   values
--   (now(), now(), now(),32 , 19),
--   (now(), now(), now(),33 , 19),
--   (now(), now(), now(),32 , 19),
--   (now(), now(), now(),32 , 19),
--   (now(), now(), now(),32 , 19),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 20),
--   (now(), now(), now(),32 , 21),
--   (now(), now(), now(),32 , 21),
--   (now(), now(), now(),32 , 21),
--   (now(), now(), now(),32 , 23),
--   (now(), now(), now(),32 , 23),
--   (now(), now(), now(),32 , 22),
--   (now(), now(), now(),32 , 23),
--   (now(), now(), now(),32 , 23),
--   (now(), now(), now(),32 , 24),
--   (now(), now(), now(),32 , 24),
--   (now(), now(), now(),33 , 24);

  insert into appointments
  (time , createdAt, updatedAt, hospitalId, donorId )
  values
  (now(), now(), now(),32 , 25),
  (now(), now(), now(),33 , 25),
  (now(), now(), now(),32 , 25),
  (now(), now(), now(),32 , 25),
  (now(), now(), now(),32 , 25),
  (now(), now(), now(),32 , 26),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 28),
  (now(), now(), now(),32 , 28),
  (now(), now(), now(),32 , 28),
  (now(), now(), now(),32 , 26),
  (now(), now(), now(),32 , 26),
  (now(), now(), now(),32 , 22),
  (now(), now(), now(),32 , 26),
  (now(), now(), now(),32 , 26),
  (now(), now(), now(),32 , 19),
  (now(), now(), now(),32 , 19),
  (now(), now(), now(),33 , 19);



  insert into appointments
  (time , createdAt, updatedAt, hospitalId, donorId )
  values
  (now(), now(), now(),32 , 23),
  (now(), now(), now(),33 , 29),
  (now(), now(), now(),32 , 29),
  (now(), now(), now(),32 , 29),
  (now(), now(), now(),32 , 30),
  (now(), now(), now(),32 , 30),
  (now(), now(), now(),32 , 31),
  (now(), now(), now(),32 , 31),
  (now(), now(), now(),32 , 27),
  (now(), now(), now(),32 , 30),
  (now(), now(), now(),32 , 31),
  (now(), now(), now(),32 , 31),
  (now(), now(), now(),32 , 29),
  (now(), now(), now(),32 , 29);




  insert into appointments
  (time , createdAt, updatedAt, hospitalId, donorId )
  values
  (now(), now(), now(),32 , 33),
  (now(), now(), now(),33 , 34),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 36),
  (now(), now(), now(),32 , 33),
  (now(), now(), now(),32 , 34),
  (now(), now(), now(),32 , 34),
  (now(), now(), now(),32 , 34),
  (now(), now(), now(),32 , 33),
  (now(), now(), now(),32 , 33);


  insert into donors
    (username, password, name, email, address, latitude, longitude, bloodtype,createdAt, updatedAt)
    values
    ('User8', 'user8', 'User8', 'user8.mail.com', '375 11th St
San Francisco, CA 94103', 37.7837, -122.409, 'oneg',now(), now()),
    ('User9', 'user9', 'User9', 'user9.mail.com', '375 11th St
San Francisco, CA 94103', 37.7837, -122.409, 'oneg',now(), now()),
    ('User10', 'user10', 'User10', 'user10.mail.com', '375 11th St
San Francisco, CA 94103', 37.7837, -122.409, 'oneg',now(), now()),
    ('User11', 'user11', 'User11', 'user11.mail.com', '375 11th St
San Francisco, CA 94103', 37.7837, -122.409, 'oneg',now(), now());




 insert into donors
    (username, password, name, email, address, latitude, longitude, bloodtype,createdAt, updatedAt)
    values
    ('User15', 'user15', 'User15', 'user15.mail.com', '50 Hagiwara Tea Garden Dr
San Francisco, CA 94118', 37.771516, -122.468647, 'oneg',now(), now()),
    ('User16', 'user16', 'User16', 'user16.mail.com', '50 Hagiwara Tea Garden Dr
San Francisco, CA 94118', 37.771516, -122.468647, 'oneg',now(), now()),
    ('User17', 'user17', 'User17', 'user17.mail.com', '50 Hagiwara Tea Garden Dr
San Francisco, CA 94118', 37.771516, -122.468647, 'oneg',now(), now()),
    ('User18', 'user18', 'User18', 'user18.mail.com', '50 Hagiwara Tea Garden Dr
San Francisco, CA 94118', 37.771516, -122.468647, 'oneg',now(), now());




