from flask import Flask, request, redirect, session, url_for, Response, json
from flask.json import jsonify
import json
from bit import PrivateKeyTestnet
import serial
import json
import os
import random
import time
import requests
from pymongo import MongoClient
from pprint import pprint

##wallet for device
userkey = PrivateKeyTestnet('REDACTED')
##wallet for sending
corpkey = PrivateKeyTestnet('REDACTED')


# The session object makes use of a secret key.
SECRET_KEY = 'a secret key'
app = Flask(__name__)
app.config.from_object(__name__)







client = MongoClient("REDACTED")
db = client["datax"]


lat = 29.486458
lon = -81.207935

def getReading(portname, baud):
    global lat
    global lon

    ##ser = serial.Serial('COM24', 115200)

    ser = serial.Serial(portname, baud)

    print ("connected to: " + ser.portstr)
    reading = {}
    ts1 = int(time.time())


    while True:
        line = ser.readline()
        print("read a line")
        line = line.decode('utf8')
        ##line = line [2:13]
        ##line = line.replace(" ", "")
        line=line.rstrip()
        print(line)
        print(len(line))
        if len(line)<25:
            continue
        line = line.replace("##", "")
        line = line.replace("??", "")
        print(line) 

        words = line.split(",")

        h = float(words[0])
        t = float(words[1])
        hr = int(words[2])
        o2 = int(words[3])
        mov = int(words[4])
        t2 = float(words[5])

        if h == 0.0 or t == 0.0:
            continue
        else:
            reading["humid"] = h
            reading["temp"] = t
            reading["fridgetemp"] = t2
            reading["heartrate"] = hr
            reading["o2"] = o2
            reading["ts"] = ts1
            reading["m"] = mov
            reading["o2"] = o2
            reading["deviceID"] = "D1"

            print (reading)
            return reading
        
        continue

        # if "#" in line:
        #     ts1 = int(time.time())
        #     print("object removed")
        
        # if "$" in line:
        #     ts2 = int(time.time())
        #     print("object replaced")
        #     diff = ts2-ts1
        #     if ts1 == 0:
        #         continue

        return ts1

def getIoTdata():
    reading = getReading('COM12', 115200)
    ts = int(time.time())

    payload = {}

    payload ["deviceid"] = "D1"
    payload ["time"] = str(ts)
    payload ["devicetype"] = "dataxsensor"
    payload ["reading"] = reading


    print ("payload ready")
    print (payload)

    outstring = str(reading["temp"])+":"+str(reading["humid"])+":"+str(reading["fridgetemp"])+":"+str(reading["o2"])+":"+str(reading["hr"])
    print(outstring)

    txid = userkey.send([('mmRjZNRwjz3GCBfknxQpUc8SHaPgtq3Hft',0.000001,'btc')],message=outstring)
    print(txid)


    tids1 = userkey.get_transactions()
    tids2 = corpkey.get_transactions()

    print (tids1)
    print (tids2)

    result=db.readings.insert_one(payload)
    return txid


@app.route("/dummyJson", methods=['GET', 'POST'])
def dummyJson():

    print(request)

    res = request.get_json()
    print (res)

    resraw = request.get_data()
    print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()
 

    status = {}
    status["server"] = "up"
    status["message"] = "some random message here"
    status["request"] = res 

    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp


@app.route("/dummy", methods=['GET', 'POST'])
def dummy():

    ##res = request.json

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(js, status=200, mimetype='text/html')
    ##resp.headers['Link'] = 'http://google.com'

    return resp


@app.route("/pay", methods=['GET', 'POST'])
def pay():

    outstring = "gimmeIoTdata!<My_Public_Key_Here>"
    print(outstring)

    txid = corpkey.send([('mkNdHY2qjNqrTG4vqvzYo7kfhqpq22jDeh',0.000001,'btc')],message=outstring)
    print(txid)

    txid2 = getIoTdata()



    ##res = request.json

    js = "<html> <body>Payment sent! <br>payment transaction id is "+str(txid) +"<br>data transaction id is  "+str(txid2)  +"<br></body></html>"

    resp = Response(js, status=200, mimetype='text/html')
    ##resp.headers['Link'] = 'http://google.com'



    return resp


@app.route("/getuserbalance", methods=['GET', 'POST'])
def getuserbalance():

    print(request)

    res = request.get_json()
    print (res)

    resraw = request.get_data()
    print (resraw)

##    args = request.args
##    form = request.form
##    values = request.values

##    print (args)
##    print (form)
##    print (values)

##    sres = request.form.to_dict()
 
    bal = userkey.get_balance()
    ubal = userkey.balance_as('usd')
    status = {}
    status["server"] = "up"
    status["message"] = "datax by teamzero at hackthenorth"
    status["balancesatoshi"] = bal
    status["balanceusd"] = ubal


    statusjson = json.dumps(status)

    print(statusjson)

    js = "<html> <body>OK THIS WoRKS</body></html>"

    resp = Response(statusjson, status=200, mimetype='application/json')
    ##resp.headers['Link'] = 'http://google.com'

    return resp




if __name__ == "__main__":
    app.run(debug=True, host = 'localhost', port = 8003)
    # app.run(debug=True, host = '52.116.36.178', port = 8001)
