
FROM golang:alpine

ENV DATA_PATH=/imobiliario/data/uploads

CMD go run /go/src/app.go 2>> /imobiliario/logs/${HOSTNAME}.error.log
