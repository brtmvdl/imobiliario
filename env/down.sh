sudo echo test sudo OK
sudo rm -rf $(pwd)/data/*
sudo rm -rf $(pwd)/logs/*

docker-compose \
  -f $(pwd)/docker-compose.yaml \
  --env-file $(pwd)/env/.env down \
  --remove-orphans \
  --rmi all 
