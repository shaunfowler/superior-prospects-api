mongoimport --host sp_mongo:27017 --db sp --collection users      --type json --file /tmp/users.json      --jsonArray --drop
mongoimport --host sp_mongo:27017 --db sp --collection media      --type json --file /tmp/media.json      --jsonArray --drop
mongoimport --host sp_mongo:27017 --db sp --collection updates    --type json --file /tmp/updates.json    --jsonArray --drop
mongoimport --host sp_mongo:27017 --db sp --collection properties --type json --file /tmp/properties.json --jsonArray --drop
mongoimport --host sp_mongo:27017 --db sp --collection locations  --type json --file /tmp/locations.json  --jsonArray --drop