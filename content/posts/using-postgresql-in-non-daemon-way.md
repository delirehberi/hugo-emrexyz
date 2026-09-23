---
title: Using postgresql in non daemon way
lang: en
categories:
  - Tech
description: null
date: '2021-12-11T19:00:00-05:00'
draft: false
tags: en
nostr_id: >-
  naddr1qvzqqqr4gupzq3hnc7an8npsryzfkaku38dmjm35cfrmmkngk6kcvvngy7fllzs6qy28wumn8ghj7un9d3shjtn9d4ex2tnc09aqz9nhwden5te0wfjkccte9ehx7um5wghxyctwvsq3gamnwvaz7tmjv4kxz7fwv3sk6atn9e5k7qgcwaehxw309aex2mrp0yh8xmn0wf6zuum0vd5kzmqpp4mhxue69uhkummn9ekx7mqpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgqg0waehxw309ahx7um5wghx6mmdqyt8wumn8ghj7un9d3shjtnwdaejuum0vd5kzmqprfmhxue69uhkzun5d93kcetn9ekxz7t9wgejumn9waesz8nhwden5te0d4k8xtnpddjx2mnf0ghx2er49e68ytmwdaehgusqyf6hx6twvukhqmmnw3nhyetnw9kz66tw94hx7m3dv3sk2mt0dckhwctek3fnh6
---


I have a preference against installing servers locally and running them as systemd services, which is why I'm a big fan of Docker.

However, there are times when I simply want to use servers as specific apps, without having to go through a system-wide installation, even with docker.

Take #postgresql as an example. A typical installation creates a user, installs files in your root directories, changes ownerships, creates service files, and so on.
<!--more-->
Today, I aimed to run PostgreSQL without turning it into a systemd service. It's actually simpler than you might think. Here are the steps:

1. Download the executable (I used nix for this).

2. Create a directory for PostgreSQL data.

3. Apply the appropriate permissions to the folders.

4. Run it!

```
adduser postgres #create user from ui in macos
su postgres
mkdir ./var/data
./psql/initdb ./var/data -U postgres -W
#write password
./bin/postgres -D var/pgsql/data -k .
./bin/psql -h 127.0.0.1
#its ok now, let create a db
./bin/createdb hedefim -h 127.0.0.1
#you can create another super user
./bin/createuser -s hedefim_user -W -h 127.0.0.1
#write new password

#you can now connect the database with your new user
./bin/psql -U hedefim_user -W hedefim -h 127.0.0.1
```

how its easy, right.

talk soon. 

