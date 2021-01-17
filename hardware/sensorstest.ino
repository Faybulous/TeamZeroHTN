#include "DHT.h"

#define DHTPIN 7     // what digital pin we're connected to
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);
float h, t;

const int ldrPin = A0;
const int t2Pin = A2;
const int mPin = A4;
//const int pirPin = 8;
int d;
bool power = false;
bool water = false;
bool f = false;
//bool inhabited = false;


void setup() {

Serial.begin(115200);

//pinMode(pirPin, INPUT);
pinMode(ldrPin, INPUT);
pinMode(t2Pin, INPUT);
pinMode(mPin, INPUT);
  h = 0.0;
  t = 0.0;
  d = 0;
dht.begin();
}

void loop() {
d +=200;
  if (d==2000) {
    d = 0; //reset delay
  }
  
delay (1000);  
//int pirValue = digitalRead(pirPin);
int ldrStatus = analogRead(ldrPin);
int t2Status = analogRead(t2Pin);
int mStatus = analogRead(mPin);

  if (d%2000 == 0) {
  // Wait a few seconds between measurements.
  
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  h = dht.readHumidity();
  // Read temperature as Fahrenheit (isFahrenheit = true)
  t = dht.readTemperature(true);
  }

  Serial.print("##");
  Serial.print(h);
  Serial.print(",");
  Serial.print(t);
  Serial.print(",");
  Serial.print(ldrStatus);
  Serial.print(",");

/*
if (ldrStatus <= 400) {
power = false;
  Serial.print("False");

} else {
power = true;
Serial.print("True");
}
*/

  Serial.print(t2Status);
/*
if (floodStatus > 100) {
flood = true;
Serial.print("True");
} else {
flood = false;
Serial.print("False");
}
*/

  Serial.print(",");
  Serial.print(mStatus);
/*
if (waterStatus > 500) {
water = true;
Serial.print("True");
} else {
water = false;
Serial.print("False");
}
*/
//  Serial.print(",");

  Serial.println("??");

}
