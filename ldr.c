/*

           PhotoR     10K
 +5    o---/\/\/--.--/\/\/---o GND
                  |
 Pin 0 o-----------
 
 */

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(A0);
  
  Serial.println(sensorValue);
  delay(100);
}
