#include <VirtualWire.h>
#include <VirtualWire_Config.h>

const int RX = 11;
const int LEFT = 6;
const int RIGHT = 5;

void setup()   {
  pinMode(LEFT, OUTPUT);
  pinMode(RIGHT, OUTPUT);

    // test left
  delay(1000);
  left();
  delay(1000);
  stop();

    // test right
  delay(1000);
  right();
  delay(1000);
  stop();

     // test front
  delay(1000);
  front();
  delay(1000);
  stop();

    // setup rx pin
  vw_set_rx_pin(RX);
  vw_set_ptt_inverted(true);
  vw_setup(2000);
  vw_rx_start();
}

void stop(){
  digitalWrite(LEFT, LOW);
  digitalWrite(RIGHT, LOW);
}

void left(){
  digitalWrite(LEFT, HIGH);
  digitalWrite(RIGHT, LOW);
}

void right(){
  digitalWrite(LEFT, LOW);
  digitalWrite(RIGHT, HIGH);
}

void front(){
  digitalWrite(LEFT, HIGH);
  digitalWrite(RIGHT, HIGH);
}

void loop() {
  uint8_t message[1];    
  uint8_t msgLength = 1; 

  if (vw_get_message(message, &msgLength)){
    switch(message[0]){
      case 's':
      stop();
      break;
      case 'l':
      left();
      break;
      case 'r':
      right();
      break;
      case 'f':
      front();
      break;
    }
  }
}
